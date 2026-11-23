/**
 * ============================================================================
 * KLIEN INTEGRASI BACKEND GOOGLE APPS SCRIPT (SUMBER KEBENARAN: SERVER)
 * PORTAL & E-VOTING KOMITE KEPERAWATAN RSUD dr. SOEDARSO PONTIANAK
 * ============================================================================
 * Prinsip Keamanan:
 * 1. Tidak ada kata sandi, hash kata sandi, garam, atau daftar DPT 717 pegawai
 *    di dalam kode klien maupun localStorage.
 * 2. Seluruh autentikasi, penggantian kata sandi, pemungutan suara, jadwal
 *    buka/tutup, daftar pemilih tersamar, dan hasil rekapitulasi diputuskan
 *    oleh server Google Apps Script.
 * 3. Klien hanya menghitung mundur tampilan waktu berdasarkan selisih
 *    (offset) waktuServer dari server, dan tidak pernah memutuskan buka/tutup.
 * 4. Sesi disimpan di sessionStorage (token + kedaluwarsa + profil dasar),
 *    bukan kata sandi.
 * ============================================================================
 */

(function (window) {
  'use strict';

  const SESSION_STORAGE_KEY = 'komkep_sesi_aktif_v1';
  const SIMULATION_ELECTION_ID = 'e1ec7100-2026-1123-0000-000000000001';

  const SCHEDULE = {
    START_ISO: (window.KOMKEP_CONFIG && window.KOMKEP_CONFIG.WAKTU_BUKA_DEFAULT) || '2026-11-23T10:00:00+07:00',
    END_ISO:   (window.KOMKEP_CONFIG && window.KOMKEP_CONFIG.WAKTU_TUTUP_DEFAULT) || '2026-11-24T10:00:00+07:00',
    DISCLAIMER: (window.KOMKEP_CONFIG && window.KOMKEP_CONFIG.LABEL_SIMULASI) || 'PERCOBAAN / SIMULASI - HASIL TIDAK MENGIKAT'
  };

  // Status terakhir dari server + selisih waktu server terhadap jam perangkat
  const serverSync = {
    configured: false,
    reachable: false,
    offsetMs: 0,
    dpt: 717,
    sudah_memilih: 0,
    status: 'PEMELIHARAAN', // 'BUKA' | 'TUTUP' | 'DIJEDA' | 'PEMELIHARAAN'
    fase: 'BELUM_DIBUKA',   // 'BELUM_DIBUKA' | 'BERLANGSUNG' | 'SELESAI'
    bukaIso: SCHEDULE.START_ISO,
    tutupIso: SCHEDULE.END_ISO,
    hasilTersedia: false,
    lastFetchedAt: 0
  };

  function getEndpointUrl() {
    const cfgUrl = (window.KOMKEP_CONFIG && window.KOMKEP_CONFIG.GAS_EXEC_URL)
      ? String(window.KOMKEP_CONFIG.GAS_EXEC_URL).trim()
      : '';
    return cfgUrl;
  }

  function isBackendConfigured() {
    const url = getEndpointUrl();
    return Boolean(url && /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec/.test(url));
  }

  // Sanitasi HTML (cegah XSS)
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Normalisasi NIP / ID: hapus spasi, titik, strip, petik
  function normalizeId(rawId) {
    return String(rawId === null || rawId === undefined ? '' : rawId)
      .replace(/^'+/, '')
      .replace(/[\s.\-'"]/g, '')
      .trim();
  }

  // Penyamaran NIP: 4 digit awal + xxxx + 4 digit akhir (mis. 1969xxxxxxxxxx1008)
  function maskId(rawId) {
    if (!rawId) return '-';
    const clean = normalizeId(rawId);
    if (clean.length <= 8) return clean || '-';
    const start = clean.substring(0, 4);
    const end   = clean.substring(clean.length - 4);
    return start + 'x'.repeat(clean.length - 8) + end;
  }

  // Format tanggal dalam WIB (Asia/Jakarta)
  function formatWibDate(dateInput = new Date()) {
    const dateObj = (dateInput instanceof Date) ? dateInput : new Date(dateInput);
    if (isNaN(dateObj.getTime())) return '-';
    try {
      const options = {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      return new Intl.DateTimeFormat('id-ID', options).format(dateObj) + ' WIB';
    } catch (_) {
      return dateObj.toLocaleString('id-ID') + ' WIB';
    }
  }

  /* ==========================================================================
     MANAJEMEN SESI DI sessionStorage (HANYA TOKEN + KEDALUWARSA + PROFIL)
     ========================================================================== */

  function getActiveSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.token) return null;
      if (parsed.kedaluwarsa && Date.now() >= new Date(parsed.kedaluwarsa).getTime()) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function saveActiveSession(sessionObj) {
    try {
      if (!sessionObj || !sessionObj.token) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        return;
      }
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        token: sessionObj.token,
        kedaluwarsa: sessionObj.kedaluwarsa || new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
        wajib_ganti_sandi: Boolean(sessionObj.wajib_ganti_sandi),
        user: sessionObj.user || null
      }));
    } catch (_) {}
  }

  function clearActiveSession() {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem('komite_auth_user');
      localStorage.removeItem('komkep_password_hashes');
      localStorage.removeItem('komkep_passwords_changed');
      localStorage.removeItem('komkep_sim_voters');
      localStorage.removeItem('komkep_sim_ballots');
    } catch (_) {}
  }

  function getSessionToken() {
    const s = getActiveSession();
    return s ? s.token : '';
  }

  /* ==========================================================================
     PEMANGGILAN API SERVER GOOGLE APPS SCRIPT (TANPA PREFLIGHT CORS)
     ========================================================================== */

  async function callApi(aksi, payload = {}) {
    const url = getEndpointUrl();
    serverSync.configured = isBackendConfigured();

    if (!serverSync.configured) {
      return {
        ok: false,
        sukses: false,
        kode: 'PEMELIHARAAN',
        pesan: 'Pemilihan sedang dalam pemeliharaan (server backend belum dihubungkan).'
      };
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({ aksi, ...payload }),
        redirect: 'follow'
      });

      const data = await res.json();
      serverSync.reachable = true;
      return data;
    } catch (err) {
      console.warn('[GasClient] Gagal menghubungi server Apps Script:', err);
      return {
        ok: false,
        sukses: false,
        kode: 'JARINGAN_GAGAL',
        pesan: 'Tidak dapat terhubung ke server pemilihan. Periksa koneksi internet Anda dan coba lagi.'
      };
    }
  }

  /* ==========================================================================
     1. SINKRONISASI STATUS PUBLIK & WAKTU SERVER
     ========================================================================== */

  async function fetchServerStatus() {
    serverSync.configured = isBackendConfigured();
    if (!serverSync.configured) {
      serverSync.reachable = false;
      serverSync.status = 'PEMELIHARAAN';
      return {
        ok: false,
        maintenance: true,
        dpt: serverSync.dpt,
        sudah_memilih: 0,
        status: 'PEMELIHARAAN',
        pesan: 'Pemilihan sedang dalam pemeliharaan'
      };
    }

    const clientSentAt = Date.now();
    const res = await callApi('status');
    const clientReceivedAt = Date.now();

    if (res && (res.ok || res.sukses)) {
      const serverTimeMs = new Date(res.waktuServer).getTime();
      if (!isNaN(serverTimeMs)) {
        const midpoint = Math.round((clientSentAt + clientReceivedAt) / 2);
        serverSync.offsetMs = serverTimeMs - midpoint;
      }
      serverSync.dpt           = typeof res.dpt === 'number' ? res.dpt : 717;
      serverSync.sudah_memilih = typeof res.sudah_memilih === 'number' ? res.sudah_memilih : 0;
      serverSync.status        = res.status || 'TUTUP';
      serverSync.fase          = res.fase || 'BERLANGSUNG';
      serverSync.bukaIso       = res.buka || SCHEDULE.START_ISO;
      serverSync.tutupIso      = res.tutup || SCHEDULE.END_ISO;
      serverSync.hasilTersedia = Boolean(res.hasil_tersedia);
      serverSync.lastFetchedAt = Date.now();
      serverSync.reachable     = true;
    }

    return res;
  }

  function getEstimatedServerNow() {
    return new Date(Date.now() + (serverSync.offsetMs || 0));
  }

  function checkElectionSchedule() {
    serverSync.configured = isBackendConfigured();
    const now   = getEstimatedServerNow();
    const start = new Date(serverSync.bukaIso  || SCHEDULE.START_ISO);
    const end   = new Date(serverSync.tutupIso || SCHEDULE.END_ISO);

    if (!serverSync.configured) {
      return {
        isOpen: false,
        isPaused: false,
        isMaintenance: true,
        isBefore: false,
        isAfter: false,
        serverStatus: 'PEMELIHARAAN',
        now,
        start,
        end,
        remainingMs: 0,
        countdownStr: 'Pemilihan sedang dalam pemeliharaan',
        statusText: 'Pemilihan sedang dalam pemeliharaan',
        disclaimer: SCHEDULE.DISCLAIMER
      };
    }

    const isBefore = now.getTime() < start.getTime();
    const isAfter  = now.getTime() >= end.getTime();
    const isPaused = serverSync.status === 'DIJEDA';
    const isOpen   = (serverSync.status === 'BUKA') && !isBefore && !isAfter && !isPaused;

    const targetDate = isBefore ? start : end;
    const remainingMs = Math.max(0, targetDate.getTime() - now.getTime());
    const diffHours   = Math.floor(remainingMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
    const timeParts   = `${diffHours} jam ${diffMinutes} menit ${diffSeconds} detik`;

    let statusText = 'Sedang Berlangsung (BUKA)';
    let countdownStr = timeParts;

    if (isPaused) {
      statusText = 'Dijeda Sementara oleh Panitia';
      countdownStr = 'Pemungutan Suara Dijeda';
    } else if (isBefore) {
      statusText = 'Belum Dibuka';
      countdownStr = `Dibuka dalam ${timeParts}`;
    } else if (isAfter || serverSync.status === 'TUTUP') {
      statusText = 'Pemungutan Suara Telah Ditutup';
      countdownStr = 'Pemilihan Telah Ditutup';
    }

    return {
      isOpen,
      isPaused,
      isMaintenance: false,
      isBefore,
      isAfter,
      serverStatus: serverSync.status,
      now,
      start,
      end,
      remainingMs,
      countdownStr,
      statusText,
      disclaimer: SCHEDULE.DISCLAIMER
    };
  }

  /* ==========================================================================
     2. LOGIN & VERIFIKASI SESI KE SERVER
     ========================================================================== */

  function mapServerUserToPortalUser(pengguna, wajibGanti) {
    if (!pengguna) return null;

    if (pengguna.tipe === 'panitia') {
      const uLower = String(pengguna.username || '').toLowerCase();
      const adminList = (window.KOMITE_DATA && Array.isArray(window.KOMITE_DATA.adminUsers))
        ? window.KOMITE_DATA.adminUsers
        : [];
      const matched = adminList.find(a => String(a.username || '').toLowerCase() === uLower);
      const peran   = String(pengguna.peran || 'pengurus').toLowerCase();
      const isSuper = peran === 'superadmin' || (matched && String(matched.badge || '').toLowerCase().includes('super'));
      const isPanitiaEvoting = peran === 'superadmin' || peran === 'panitia';

      return {
        tipe: 'panitia',
        peran_server: peran,
        username: pengguna.username,
        id_login: pengguna.username,
        name: pengguna.nama || (matched ? matched.name : pengguna.username),
        nip: matched ? matched.nip : '-',
        masked_id: matched && matched.nip ? maskId(matched.nip) : pengguna.username,
        role: matched ? matched.role : (peran === 'panitia' ? 'Panitia Pemilihan E-Voting' : 'Pengurus Komite Keperawatan'),
        badge: matched ? matched.badge : (isSuper ? 'Super Admin' : (peran === 'panitia' ? 'Panitia Pemilihan' : 'Pengurus Komite')),
        unit: (matched && matched.group) ? matched.group : 'Komite Keperawatan',
        access: Array.from(new Set([
          ...((matched && matched.access) || ['kredensial', 'mutu', 'etik', 'regulasi']),
          'pemilihan',
          ...(isSuper ? ['superadmin', 'approval', 'administrasi'] : [])
        ])),
        isAdmin: true,
        isPengurus: true,
        isPanitiaEvoting: isPanitiaEvoting,
        wajib_ganti_password: Boolean(wajibGanti),
        mustChangePassword: Boolean(wajibGanti)
      };
    }

    // Pemilih DPT (717 Pegawai)
    const nipClean = normalizeId(pengguna.nip);
    return {
      tipe: 'pemilih',
      peran_server: 'pemilih',
      username: nipClean,
      id_login: nipClean,
      name: pengguna.nama || 'Tenaga Keperawatan',
      nip: nipClean,
      masked_id: pengguna.nip_tersamar || maskId(nipClean),
      jenis_id: pengguna.jenis_id || 'NIP',
      kategori: pengguna.kategori || 'Perawat',
      profesi: pengguna.kategori || 'Perawat',
      jabatan: pengguna.jabatan || 'Tenaga Keperawatan',
      unit: pengguna.unit || 'RSUD dr. Soedarso',
      role: 'pengusul',
      badge: `Tenaga ${pengguna.kategori || 'Keperawatan'}`,
      access: ['pengusul', 'kredensial', 'pemilihan'],
      isAdmin: false,
      isPengurus: false,
      isPanitiaEvoting: false,
      sudah_memilih: Boolean(pengguna.sudah_memilih),
      wajib_ganti_password: Boolean(wajibGanti),
      mustChangePassword: Boolean(wajibGanti)
    };
  }

  async function login(usernameOrId, password) {
    const rawId   = String(usernameOrId || '').trim();
    const rawPass = String(password || '');

    if (!rawId || !rawPass) {
      return {
        success: false,
        message: 'NIP/username dan kata sandi wajib diisi.'
      };
    }

    // Jika pengguna memasukkan alias pengurus (mis. ketua / sekretaris), petakan ke username resmi
    let loginId = rawId;
    const cleanLower = rawId.toLowerCase().replace(/\s+/g, '');
    if (!/^\d+$/.test(normalizeId(rawId)) && window.KOMITE_DATA && Array.isArray(window.KOMITE_DATA.adminUsers)) {
      const foundAdmin = window.KOMITE_DATA.adminUsers.find(a => {
        const u   = String(a.username || '').toLowerCase();
        const al  = String(a.alias || '').toLowerCase();
        const alt = String(a.altAlias || '').toLowerCase();
        return u === cleanLower || al === cleanLower || alt === cleanLower;
      });
      if (foundAdmin && foundAdmin.username) {
        loginId = foundAdmin.username;
      }
    }

    const res = await callApi('login', {
      id: loginId,
      sandi: rawPass
    });

    if (!res || !(res.ok || res.sukses)) {
      return {
        success: false,
        isLocked: res && res.kode === 'TERKUNCI',
        code: (res && res.kode) || 'LOGIN_GAGAL',
        message: (res && res.pesan) || 'NIP/username atau kata sandi salah.'
      };
    }

    const wajibGanti = Boolean(res.wajib_ganti_sandi ?? res.perlu_ganti_sandi);
    const userObj    = mapServerUserToPortalUser(res.pengguna, wajibGanti);

    saveActiveSession({
      token: res.token,
      kedaluwarsa: res.kedaluwarsa,
      wajib_ganti_sandi: wajibGanti,
      user: userObj
    });

    return {
      success: true,
      token: res.token,
      kedaluwarsa: res.kedaluwarsa,
      wajib_ganti_password: wajibGanti,
      user: userObj,
      message: res.pesan || 'Login berhasil.'
    };
  }

  async function verifySession() {
    const sess = getActiveSession();
    if (!sess || !sess.token) return null;
    if (!isBackendConfigured()) return sess.user || null;

    const res = await callApi('sesi', { token: sess.token });
    if (!res || !(res.ok || res.sukses) || !res.pengguna) {
      clearActiveSession();
      return null;
    }

    const wajibGanti = Boolean(res.wajib_ganti_sandi);
    const userObj    = mapServerUserToPortalUser(res.pengguna, wajibGanti);
    saveActiveSession({
      token: sess.token,
      kedaluwarsa: res.kedaluwarsa || sess.kedaluwarsa,
      wajib_ganti_sandi: wajibGanti,
      user: userObj
    });
    return userObj;
  }

  async function logout() {
    const token = getSessionToken();
    clearActiveSession();
    if (token && isBackendConfigured()) {
      await callApi('logout', { token });
    }
    return { success: true };
  }

  /* ==========================================================================
     3. GANTI KATA SANDI (WAJIB DI LOGIN PERTAMA & PENGATURAN AKUN)
     ========================================================================== */

  async function changePassword(idLogin, oldPassword, newPassword, confirmPassword) {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return { success: false, message: 'Semua kolom kata sandi wajib diisi.' };
    }
    if (newPassword.length < 8) {
      return { success: false, message: 'Kata sandi baru minimal 8 karakter.' };
    }
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return { success: false, message: 'Kata sandi baru wajib mengandung kombinasi huruf dan angka.' };
    }
    if (newPassword !== confirmPassword) {
      return { success: false, message: 'Konfirmasi kata sandi baru tidak cocok.' };
    }
    const cleanId = normalizeId(idLogin);
    if (cleanId && normalizeId(newPassword).toLowerCase() === cleanId.toLowerCase()) {
      return { success: false, message: 'Kata sandi baru tidak boleh sama dengan NIP atau username.' };
    }
    if (newPassword === oldPassword) {
      return { success: false, message: 'Kata sandi baru tidak boleh sama dengan kata sandi awal/lama.' };
    }

    const token = getSessionToken();
    if (!token) {
      return { success: false, message: 'Sesi Anda telah berakhir. Silakan login kembali.' };
    }

    const res = await callApi('ganti_sandi', {
      token: token,
      sandi_lama: oldPassword,
      sandi_baru: newPassword
    });

    if (!res || !(res.ok || res.sukses)) {
      return {
        success: false,
        message: (res && res.pesan) || 'Gagal memperbarui kata sandi.'
      };
    }

    const sess = getActiveSession();
    if (sess) {
      sess.wajib_ganti_sandi = false;
      if (sess.user) {
        sess.user.wajib_ganti_password = false;
        sess.user.mustChangePassword   = false;
      }
      saveActiveSession(sess);
    }

    return {
      success: true,
      message: res.pesan || 'Kata sandi berhasil diperbarui.'
    };
  }

  /* ==========================================================================
     4. E-VOTING: MASUK BILIK, PILIH, BUKTI, STATUS, HASIL, DAFTAR PEMILIH, KONTROL
     ========================================================================== */

  async function enterBooth() {
    await fetchServerStatus();
    const sess = getActiveSession();
    if (!sess || !sess.user) {
      return {
        success: false,
        message: 'Silakan login dengan NIP/NIPPPK/NIK Anda terlebih dahulu.'
      };
    }

    const u = sess.user;
    return {
      success: true,
      message: 'Akses bilik suara terverifikasi.',
      booth_entry: {
        voter_name: u.name,
        masked_id: u.masked_id || maskId(u.nip),
        unit_kerja: u.unit || 'RSUD dr. Soedarso',
        entered_at_wib: formatWibDate(getEstimatedServerNow()),
        disclaimer: SCHEDULE.DISCLAIMER
      }
    };
  }

  async function castVote(electionId, idLogin, candidateId) {
    const token = getSessionToken();
    if (!token) {
      return {
        success: false,
        code: 'NO_SESSION',
        message: 'Sesi login tidak ditemukan. Silakan login kembali dengan NIP/NIPPPK/NIK Anda.'
      };
    }

    const res = await callApi('pilih', {
      token: token,
      kode_calon: candidateId
    });

    if (!res || !(res.ok || res.sukses)) {
      return {
        success: false,
        code: (res && res.kode) || 'VOTE_REJECTED',
        message: (res && res.pesan) || 'Penyaluran suara ditolak oleh server.'
      };
    }

    const sess = getActiveSession();
    const u    = (sess && sess.user) ? sess.user : {};
    if (sess && sess.user) {
      sess.user.sudah_memilih = true;
      sess.user.kode_bukti    = res.kode_bukti;
      sess.user.waktu_memilih = formatWibDate(res.waktu || getEstimatedServerNow());
      saveActiveSession(sess);
    }

    await fetchServerStatus();

    return {
      success: true,
      message: res.pesan || 'Suara Anda berhasil dicatat.',
      receipt: {
        voter_name: u.name || 'Pemilih',
        masked_id: u.masked_id || maskId(u.nip || idLogin),
        unit_kerja: u.unit || 'RSUD dr. Soedarso',
        receipt_token: res.kode_bukti,
        voted_at_wib: formatWibDate(res.waktu || getEstimatedServerNow()),
        status: 'Sudah Memilih (Sah)',
        disclaimer: SCHEDULE.DISCLAIMER
      }
    };
  }

  async function getVoterReceipt() {
    const token = getSessionToken();
    if (!token) {
      return { success: false, message: 'Sesi tidak valid.' };
    }
    const res = await callApi('bukti', { token });
    if (!res || !(res.ok || res.sukses)) {
      return {
        success: false,
        code: (res && res.kode) || 'BELUM_MEMILIH',
        message: (res && res.pesan) || 'Bukti suara tidak ditemukan.'
      };
    }
    const sess = getActiveSession();
    return {
      success: true,
      receipt: {
        voter_name: res.nama,
        masked_id: res.nip_tersamar,
        unit_kerja: res.unit || (sess?.user?.unit) || 'RSUD dr. Soedarso',
        receipt_token: res.kode_bukti,
        voted_at_wib: (sess?.user?.waktu_memilih) || 'Tercatat di Server',
        status: 'Sudah Memilih (Sah)',
        disclaimer: SCHEDULE.DISCLAIMER
      }
    };
  }

  async function getElectionRekap(electionId = SIMULATION_ELECTION_ID) {
    const statusRes = await fetchServerStatus();

    if (!isBackendConfigured()) {
      return {
        success: false,
        maintenance: true,
        resultsAvailable: false,
        message: 'Pemilihan sedang dalam pemeliharaan',
        metrics: {
          total_dpt: 717,
          total_voted: 0
        },
        rekap_kandidat: []
      };
    }

    const totalDpt   = serverSync.dpt || 717;
    const totalVoted = serverSync.sudah_memilih || 0;

    // Sebelum WAKTU_TUTUP: JANGAN meminta atau menyimpan angka per calon
    if (!serverSync.hasilTersedia) {
      return {
        success: true,
        resultsAvailable: false,
        closedMessage: 'Hasil rekapitulasi dibuka setelah pemilihan ditutup pada Selasa, 24 November 2026 pukul 10.00 WIB.',
        election: {
          id: electionId,
          status: serverSync.status,
          fase: serverSync.fase,
          start_time: serverSync.bukaIso,
          end_time: serverSync.tutupIso,
          disclaimer: SCHEDULE.DISCLAIMER
        },
        metrics: {
          total_dpt: totalDpt,
          total_voted: totalVoted
        },
        rekap_kandidat: []
      };
    }

    // Setelah WAKTU_TUTUP: Ambil perolehan suara per calon dari server
    const hasilRes = await callApi('hasil');
    if (!hasilRes || !(hasilRes.ok || hasilRes.sukses)) {
      return {
        success: true,
        resultsAvailable: false,
        closedMessage: (hasilRes && hasilRes.pesan) || 'Hasil rekapitulasi dibuka setelah pemilihan ditutup pada Selasa, 24 November 2026 pukul 10.00 WIB.',
        election: {
          id: electionId,
          status: serverSync.status,
          fase: serverSync.fase,
          start_time: serverSync.bukaIso,
          end_time: serverSync.tutupIso,
          disclaimer: SCHEDULE.DISCLAIMER
        },
        metrics: {
          total_dpt: totalDpt,
          total_voted: totalVoted
        },
        rekap_kandidat: []
      };
    }

    const candidatesMeta = [
      { id: 'cand-1', candidate_number: 1, name: 'Ns. Siti Rahmawati, S.Kep., M.Kep. (SIMULASI)', unit: 'Instalasi Rawat Intensif (ICU)' },
      { id: 'cand-2', candidate_number: 2, name: 'Ns. Muhammad Fadli Hidayat, S.Kep., Sp.KMB. (SIMULASI)', unit: 'Instalasi Rawat Inap Bedah' },
      { id: 'cand-3', candidate_number: 3, name: 'Ns. Rusmulyadi, S.Kep.Ners., M.A.R.S (SIMULASI)', unit: 'Enggang Gading' },
      { id: 'cand-abstain', candidate_number: 4, name: 'Kotak Kosong / Abstain (Tidak Memilih)', unit: 'Seluruh Unit Kerja', is_abstain: true }
    ];

    const rincianMap = {};
    (hasilRes.rincian || []).forEach(r => {
      rincianMap[r.kode_calon] = r;
    });

    const rekapKandidat = candidatesMeta.map(c => {
      const r = rincianMap[c.id] || { jumlah: 0, persen: 0 };
      return {
        candidate_id: c.id,
        candidate_number: c.candidate_number,
        name: c.name,
        unit: c.unit,
        is_abstain: Boolean(c.is_abstain),
        vote_count: r.jumlah || 0,
        percent: typeof r.persen === 'number' ? r.persen.toFixed(2) : '0.00'
      };
    });

    return {
      success: true,
      resultsAvailable: true,
      election: {
        id: electionId,
        status: serverSync.status,
        fase: serverSync.fase,
        start_time: serverSync.bukaIso,
        end_time: serverSync.tutupIso,
        disclaimer: SCHEDULE.DISCLAIMER
      },
      metrics: {
        total_dpt: hasilRes.dpt || totalDpt,
        total_voted: hasilRes.sudah_memilih ?? totalVoted,
        total_sah: hasilRes.total_sah ?? totalVoted
      },
      tertinggi: hasilRes.tertinggi || [],
      rekap_kandidat: rekapKandidat
    };
  }

  async function getVoterListForAdmin() {
    const token = getSessionToken();
    if (!token) {
      return { success: false, daftar: [], message: 'Silakan login sebagai Panitia Pemilihan.' };
    }
    const res = await callApi('daftar_pemilih', { token });
    if (!res || !(res.ok || res.sukses)) {
      return {
        success: false,
        daftar: [],
        message: (res && res.pesan) || 'Hanya panitia pemilihan yang dapat melihat daftar pemilih.'
      };
    }
    return {
      success: true,
      daftar: Array.isArray(res.daftar) ? res.daftar : []
    };
  }

  async function controlElection(perintah, konfirmasi = '') {
    const token = getSessionToken();
    if (!token) {
      return { success: false, message: 'Silakan login sebagai Panitia Pemilihan.' };
    }
    const res = await callApi('kontrol', {
      token,
      perintah,
      konfirmasi
    });
    await fetchServerStatus();
    return {
      success: Boolean(res && (res.ok || res.sukses)),
      status: res && res.status,
      message: (res && res.pesan) || 'Perintah kontrol selesai.'
    };
  }

  async function resetSimulation(konfirmasi = '') {
    return controlElection('reset', konfirmasi);
  }

  window.SupabaseKomkep = {
    init: fetchServerStatus,
    fetchServerStatus,
    isBackendConfigured,
    getEndpointUrl,
    escapeHtml,
    normalizeId,
    maskId,
    formatWibDate,
    getActiveSession,
    verifySession,
    login,
    logout,
    changePassword,
    checkElectionSchedule,
    enterBooth,
    castVote,
    getVoterReceipt,
    getElectionRekap,
    getVoterListForAdmin,
    controlElection,
    resetSimulation,
    SCHEDULE,
    serverSync
  };

})(window);
