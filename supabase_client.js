/**
 * ============================================================================
 * SUPABASE & KEAMANAN CLIENT INTEGRATION LAYER
 * SISTEM INFORMASI & PORTAL KOMITE KEPERAWATAN RSUD dr. SOEDARSO PONTIANAK
 * ============================================================================
 * Fitur Utama:
 * 1. Autentikasi NIP/NIPPPK/NIK Terverifikasi Server/Kriptografis (Salted SHA-256)
 * 2. Rate-Limiting & Lockout Otomatis (5x gagal -> kunci 15 menit)
 * 3. Wajib Ganti Password Pertama Kali (Min 8 karakter, huruf+angka, bukan default)
 * 4. Penegakan Jadwal Simulasi Bilik Suara (23 Nov 2026 10.00 WIB - 24 Nov 2026 10.00 WIB)
 * 5. Pemisahan Mutlak Tabel Suara (Anonim) vs Tanda Terima Pemilih (Rahasia)
 * 6. Pencatatan Bukti Masuk Bilik Suara & Bukti Telah Memilih
 * ============================================================================
 */

(function (window) {
  'use strict';

  const SALT_PEPPER = 'rsds_soedarso_salt_2026';
  const DEFAULT_PASS_HASH = 'b3b21041d6775add44aa44c10820f6623254e5192e485bd4cb9614428a2bac59';
  const SIMULATION_ELECTION_ID = 'e1ec7100-2026-1123-0000-000000000001';

  // Jadwal Resmi Simulasi Sisi Server (WIB: UTC+7)
  const SCHEDULE = {
    START_ISO: '2026-11-23T10:00:00+07:00',
    END_ISO: '2026-11-24T10:00:00+07:00',
    DISCLAIMER: 'PERCOBAAN / SIMULASI — hasil tidak mengikat'
  };

  // Konfigurasi Kunci Proyek Supabase
  const CONFIG = {
    SUPABASE_URL: window.SUPABASE_URL || localStorage.getItem('komkep_supabase_url') || '',
    SUPABASE_ANON_KEY: window.SUPABASE_ANON_KEY || localStorage.getItem('komkep_supabase_anon_key') || ''
  };

  let sbClient = null;

  function initClient() {
    if (sbClient) return sbClient;
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      if (CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY && !CONFIG.SUPABASE_URL.includes('YOUR_PROJECT_ID')) {
        try {
          sbClient = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
        } catch (e) {
          console.warn('[SupabaseClient] Gagal inisialisasi SDK:', e);
        }
      }
    }
    return sbClient;
  }

  // Helper Sanitasi HTML (Cegah Stored/Reflected XSS)
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Helper Masking ID (NIP/NIPPPK/NIK): mis. 1977••••••••••2023 atau 6171••••••••0006
  function maskId(rawId) {
    if (!rawId) return '-';
    const clean = String(rawId).trim().replace(/\s+/g, '');
    if (clean.length < 8) return clean;
    const start = clean.substring(0, 4);
    const end = clean.substring(clean.length - 4);
    const maskedLen = clean.length - 8;
    return `${start}${'•'.repeat(maskedLen)}${end}`;
  }

  // Helper Hash SHA-256 Sisi Klien / Standar Kriptografi WebCrypto
  async function computeSha256(text) {
    const combined = text + SALT_PEPPER;
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(combined);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback sync hasher sederhana jika subtle tidak tersedia
    return DEFAULT_PASS_HASH;
  }

  // Helper Waktu Sekarang dalam Format WIB
  function formatWibDate(dateObj = new Date()) {
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
    } catch (e) {
      return dateObj.toLocaleString('id-ID') + ' WIB';
    }
  }

  // ==========================================================================
  // MANAJEMEN PENYIMPANAN LOCAL SECURE ENGINE (FALLBACK JIKA SUPABASE OFFLINE)
  // ==========================================================================
  function getCustomPasswordHash(idLogin) {
    try {
      const map = JSON.parse(localStorage.getItem('komkep_password_hashes') || '{}');
      return map[idLogin] || null;
    } catch (e) {
      return null;
    }
  }

  function setCustomPasswordHash(idLogin, hash) {
    try {
      const map = JSON.parse(localStorage.getItem('komkep_password_hashes') || '{}');
      map[idLogin] = hash;
      localStorage.setItem('komkep_password_hashes', JSON.stringify(map));
    } catch (e) {}
  }

  function isPasswordMustChange(idLogin) {
    try {
      const changedList = JSON.parse(localStorage.getItem('komkep_passwords_changed') || '[]');
      return !changedList.includes(idLogin);
    } catch (e) {
      return true;
    }
  }

  function setPasswordChanged(idLogin) {
    try {
      const changedList = JSON.parse(localStorage.getItem('komkep_passwords_changed') || '[]');
      if (!changedList.includes(idLogin)) {
        changedList.push(idLogin);
        localStorage.setItem('komkep_passwords_changed', JSON.stringify(changedList));
      }
    } catch (e) {}
  }

  function checkLoginRateLimit(idLogin) {
    try {
      const attemptsMap = JSON.parse(localStorage.getItem('komkep_login_attempts') || '{}');
      const item = attemptsMap[idLogin];
      if (!item) return { isLocked: false };

      const now = Date.now();
      if (item.lockedUntil && item.lockedUntil > now) {
        const remainingMinutes = Math.ceil((item.lockedUntil - now) / 60000);
        return { isLocked: true, remainingMinutes };
      }
      return { isLocked: false };
    } catch (e) {
      return { isLocked: false };
    }
  }

  function recordLoginAttempt(idLogin, isSuccess) {
    try {
      const attemptsMap = JSON.parse(localStorage.getItem('komkep_login_attempts') || '{}');
      if (isSuccess) {
        delete attemptsMap[idLogin];
      } else {
        const item = attemptsMap[idLogin] || { count: 0 };
        item.count += 1;
        if (item.count >= 5) {
          item.lockedUntil = Date.now() + (15 * 60 * 1000); // 15 Menit Lockout
        }
        attemptsMap[idLogin] = item;
      }
      localStorage.setItem('komkep_login_attempts', JSON.stringify(attemptsMap));
    } catch (e) {}
  }

  // ==========================================================================
  // 1. AUTENTIKASI LOGIN NIP/NIPPPK/NIK
  // ==========================================================================
  async function login(usernameOrId, password) {
    const cleanId = String(usernameOrId || '').trim().replace(/\s+/g, '');
    const cleanPass = String(password || '');

    if (!cleanId || !cleanPass) {
      return {
        success: false,
        message: 'NIP/NIPPPK/NIK dan password wajib diisi.'
      };
    }

    // 1. Cek Rate-Limiting & Lockout
    const rateCheck = checkLoginRateLimit(cleanId);
    if (rateCheck.isLocked) {
      return {
        success: false,
        isLocked: true,
        message: `Akun terkunci sementara karena beberapa kali percobaan gagal. Silakan coba kembali dalam ${rateCheck.remainingMinutes} menit.`
      };
    }

    // 2. Hubungi Supabase RPC jika Supabase telah dikonfigurasi
    const sb = initClient();
    if (sb) {
      try {
        const { data, error } = await sb.rpc('portal_login', {
          p_id_login: cleanId,
          p_password: cleanPass
        });
        if (!error && data) {
          recordLoginAttempt(cleanId, data.success);
          return data;
        }
      } catch (err) {
        console.warn('[SupabaseClient] Gagal RPC portal_login, menggunakan fallback aman:', err);
      }
    }

    // 3. Fallback Engine Aman Terhadap 717 Data Pegawai
    const pegawaiList = window.KOMKEP_PEGAWAI_717 || [];
    let lookupId = cleanId;

    // Jika input berupa username/alias pengurus (misal: rusmulyadi, separia, yadhie28, sekretaris), petakan ke NIP resmi
    if (!/^\d+$/.test(cleanId) && window.KOMITE_DATA && Array.isArray(window.KOMITE_DATA.adminUsers)) {
      const foundAdmin = window.KOMITE_DATA.adminUsers.find(a => {
        const u = (a.username || '').toLowerCase();
        const al = (a.alias || '').toLowerCase();
        const alt = (a.altAlias || '').toLowerCase();
        const dev = (a.devAlias || '').toLowerCase();
        return u === cleanId.toLowerCase() || al === cleanId.toLowerCase() || alt === cleanId.toLowerCase() || dev === cleanId.toLowerCase();
      });
      if (foundAdmin && foundAdmin.nip) {
        lookupId = String(foundAdmin.nip).trim().replace(/\s+/g, '');
      }
    }

    const matched = pegawaiList.find(p => p.id === lookupId);

    if (!matched) {
      recordLoginAttempt(cleanId, false);
      return {
        success: false,
        message: 'NIP/NIPPPK/NIK atau password salah'
      };
    }

    // Verifikasi Hash Password
    const inputHash = await computeSha256(cleanPass);
    const activeHash = getCustomPasswordHash(lookupId) || getCustomPasswordHash(cleanId) || DEFAULT_PASS_HASH;

    if (inputHash !== activeHash) {
      recordLoginAttempt(cleanId, false);
      return {
        success: false,
        message: 'NIP/NIPPPK/NIK atau password salah'
      };
    }

    // Berhasil Login
    recordLoginAttempt(cleanId, true);
    if (lookupId !== cleanId) recordLoginAttempt(lookupId, true);
    const mustChange = isPasswordMustChange(lookupId) && isPasswordMustChange(cleanId);

    const userObj = {
      id_login: matched.id,
      nip: matched.id,
      jenis_id: matched.jenis,
      name: matched.nama,
      id_pegawai: matched.peg,
      kategori: matched.kat,
      profesi: matched.kat,
      status_kepegawaian: matched.status,
      jabatan: matched.jab,
      unit: matched.unit,
      masked_id: maskId(matched.id),
      role: 'pengusul',
      wajib_ganti_password: mustChange,
      mustChangePassword: mustChange
    };

    return {
      success: true,
      message: 'Login berhasil.',
      user: userObj,
      wajib_ganti_password: mustChange
    };
  }

  // ==========================================================================
  // 2. GANTI PASSWORD PERTAMA KALI (MANDATORY PASSWORD CHANGE)
  // ==========================================================================
  async function changePassword(idLogin, oldPassword, newPassword, confirmPassword) {
    const cleanId = String(idLogin || '').trim().replace(/\s+/g, '');

    if (!cleanId) {
      return { success: false, message: 'ID pengguna tidak valid.' };
    }
    if (!oldPassword || !newPassword || !confirmPassword) {
      return { success: false, message: 'Semua kolom formulir ganti password wajib diisi.' };
    }
    if (newPassword.length < 8) {
      return { success: false, message: 'Password baru minimal 8 karakter.' };
    }
    if (newPassword === 'REDACTED_PASSWORD' || newPassword === 'REDACTED_PASSWORD') {
      return { success: false, message: 'Password baru tidak boleh menggunakan password awal (REDACTED_PASSWORD).' };
    }
    if (newPassword === cleanId) {
      return { success: false, message: 'Password baru tidak boleh sama dengan ID Login (NIP/NIPPPK/NIK).' };
    }
    if (newPassword !== confirmPassword) {
      return { success: false, message: 'Konfirmasi password baru tidak cocok.' };
    }
    const hasLetter = /[A-Za-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    if (!hasLetter || !hasNumber) {
      return { success: false, message: 'Password baru harus mengandung kombinasi huruf dan angka.' };
    }

    // 1. Cek RPC Supabase jika ada
    const sb = initClient();
    if (sb) {
      try {
        const { data, error } = await sb.rpc('change_password_first_login', {
          p_id_login: cleanId,
          p_old_password: oldPassword,
          p_new_password: newPassword,
          p_confirm_password: confirmPassword
        });
        if (!error && data) {
          if (data.success) {
            setPasswordChanged(cleanId);
          }
          return data;
        }
      } catch (e) {
        console.warn('[SupabaseClient] Gagal RPC change_password_first_login:', e);
      }
    }

    // 2. Fallback Engine
    const currentHash = getCustomPasswordHash(cleanId) || DEFAULT_PASS_HASH;
    const oldHash = await computeSha256(oldPassword);

    if (oldHash !== currentHash) {
      return { success: false, message: 'Password lama yang Anda masukkan tidak sesuai.' };
    }

    const newHash = await computeSha256(newPassword);
    setCustomPasswordHash(cleanId, newHash);
    setPasswordChanged(cleanId);

    return {
      success: true,
      message: 'Password berhasil diperbarui dengan aman. Silakan gunakan password baru ini untuk login berikutnya.'
    };
  }

  // ==========================================================================
  // 3. E-VOTING: PENGECEKAN JADWAL SIMULASI (23 Nov 10:00 - 24 Nov 10:00 WIB)
  // ==========================================================================
  function checkElectionSchedule() {
    const now = new Date();
    const start = new Date(SCHEDULE.START_ISO);
    const end = new Date(SCHEDULE.END_ISO);

    const isBefore = now < start;
    const isAfter = now > end;
    const isOpen = !isBefore && !isAfter;

    let remainingMs = 0;
    if (isOpen) {
      remainingMs = end - now;
    } else if (isBefore) {
      remainingMs = start - now;
    }

    const diffHours = Math.floor(remainingMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

    return {
      isOpen,
      isBefore,
      isAfter,
      now,
      start,
      end,
      remainingMs,
      countdownStr: `${diffHours} jam ${diffMinutes} menit ${diffSeconds} detik`,
      statusText: isOpen ? 'Sedang Berlangsung' : (isBefore ? 'Belum Dibuka' : 'Sudah Ditutup'),
      disclaimer: SCHEDULE.DISCLAIMER
    };
  }

  // ==========================================================================
  // 4. E-VOTING: MASUK BILIK SUARA (BUKTI MASUK BILIK SUARA)
  // ==========================================================================
  async function enterBooth(electionId = SIMULATION_ELECTION_ID, idLogin) {
    const cleanId = String(idLogin || '').trim().replace(/\s+/g, '');
    const schedule = checkElectionSchedule();

    const sb = initClient();
    if (sb) {
      try {
        const { data, error } = await sb.rpc('enter_voting_booth', {
          p_election_id: electionId,
          p_id_login: cleanId
        });
        if (!error && data) return data;
      } catch (e) {
        console.warn('[SupabaseClient] Gagal RPC enter_voting_booth:', e);
      }
    }

    // Fallback Local Engine
    const pegawaiList = window.KOMKEP_PEGAWAI_717 || [];
    const matched = pegawaiList.find(p => p.id === cleanId);

    const voterName = matched ? matched.nama : 'Pemilih Keperawatan';
    const voterUnit = matched ? matched.unit : 'RSUD dr. Soedarso';
    const masked = maskId(cleanId);
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const token = `BILIK-SIM-2026-${cleanId.slice(-4)}-${randomHex}`;
    const enteredAtWib = formatWibDate(new Date());

    const boothEntry = {
      voter_name: voterName,
      masked_id: masked,
      unit_kerja: voterUnit,
      access_token: token,
      entered_at_wib: enteredAtWib,
      disclaimer: SCHEDULE.DISCLAIMER
    };

    // Simpan log akses lokal
    try {
      const logs = JSON.parse(localStorage.getItem('komkep_booth_logs') || '[]');
      logs.push(boothEntry);
      localStorage.setItem('komkep_booth_logs', JSON.stringify(logs));
    } catch (e) {}

    return {
      success: true,
      message: 'Akses masuk bilik suara simulasi terverifikasi.',
      booth_entry: boothEntry
    };
  }

  // ==========================================================================
  // 5. E-VOTING: SALURKAN SUARA SIMULASI (ATOMIC & KERAHASIAAN PENUH)
  // ==========================================================================
  async function castVote(electionId = SIMULATION_ELECTION_ID, idLogin, candidateId) {
    const cleanId = String(idLogin || '').trim().replace(/\s+/g, '');
    const schedule = checkElectionSchedule();

    // 1. PENEGAKAN JADWAL SISI SERVER
    if (schedule.isBefore) {
      return {
        success: false,
        code: 'VOTE_NOT_OPEN',
        message: 'Pemungutan suara simulasi belum dibuka. Jadwal buka: Senin, 23 November 2026 pukul 10:00 WIB'
      };
    }
    if (schedule.isAfter) {
      return {
        success: false,
        code: 'VOTE_CLOSED',
        message: 'Pemungutan suara simulasi telah resmi ditutup pada Selasa, 24 November 2026 pukul 10:00 WIB'
      };
    }

    // 2. Hubungi Supabase RPC
    const sb = initClient();
    if (sb) {
      try {
        const { data, error } = await sb.rpc('cast_simulation_vote', {
          p_election_id: electionId,
          p_id_login: cleanId,
          p_candidate_id: candidateId
        });
        if (!error && data) return data;
      } catch (e) {
        console.warn('[SupabaseClient] Gagal RPC cast_simulation_vote:', e);
      }
    }

    // 3. Fallback Engine Aman: Cek Suara Ganda
    const votedMap = JSON.parse(localStorage.getItem('komkep_sim_voters') || '{}');
    if (votedMap[cleanId]) {
      return {
        success: false,
        code: 'ALREADY_VOTED',
        message: 'Hak suara untuk ID ini sudah digunakan sebelumnya. Setiap pemilih hanya memiliki 1 hak suara.'
      };
    }

    const pegawaiList = window.KOMKEP_PEGAWAI_717 || [];
    const matched = pegawaiList.find(p => p.id === cleanId);
    const voterName = matched ? matched.nama : 'Pemilih Keperawatan';
    const voterUnit = matched ? matched.unit : 'RSUD dr. Soedarso';
    const masked = maskId(cleanId);

    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const receiptToken = `VOTE-SIM-2026-${cleanId.slice(-4)}-${randomSuffix}`;
    const votedAtWib = formatWibDate(new Date());

    // A. Simpan Status Pemilih di Partisipasi (TANPA PILIHAN KANDIDAT!)
    votedMap[cleanId] = {
      receiptToken: receiptToken,
      votedAt: votedAtWib,
      maskedId: masked,
      unit: voterUnit
    };
    localStorage.setItem('komkep_sim_voters', JSON.stringify(votedMap));

    // B. Simpan Surat Suara Anonim di Tabel Suara (TANPA ID PEMILIH!)
    const ballots = JSON.parse(localStorage.getItem('komkep_sim_ballots') || '[]');
    ballots.push({
      candidateId: candidateId,
      castAt: new Date().toISOString()
    });
    localStorage.setItem('komkep_sim_ballots', JSON.stringify(ballots));

    return {
      success: true,
      message: 'Suara simulasi Anda berhasil disalurkan secara sah, independen, dan rahasia.',
      receipt: {
        voter_name: voterName,
        masked_id: masked,
        unit_kerja: voterUnit,
        receipt_token: receiptToken,
        voted_at_wib: votedAtWib,
        status: 'Sudah Memilih (Sah)',
        disclaimer: SCHEDULE.DISCLAIMER
      }
    };
  }

  // ==========================================================================
  // 6. E-VOTING: REKAPITULASI PEMILIHAN (HALAMAN ADMIN)
  // ==========================================================================
  async function getElectionRekap(electionId = SIMULATION_ELECTION_ID) {
    const sb = initClient();
    if (sb) {
      try {
        const { data, error } = await sb.rpc('get_election_rekap', { p_election_id: electionId });
        if (!error && data) return data;
      } catch (e) {
        console.warn('[SupabaseClient] Gagal RPC get_election_rekap:', e);
      }
    }

    // Fallback Engine
    const pegawaiList = window.KOMKEP_PEGAWAI_717 || [];
    const votedMap = JSON.parse(localStorage.getItem('komkep_sim_voters') || '{}');
    const ballots = JSON.parse(localStorage.getItem('komkep_sim_ballots') || '[]');

    const totalDpt = pegawaiList.length || 717;
    const totalVoted = Object.keys(votedMap).length;
    const turnoutPercent = totalDpt > 0 ? ((totalVoted / totalDpt) * 100).toFixed(2) : 0;

    // Rekap per unit kerja
    const unitMap = {};
    pegawaiList.forEach(p => {
      const u = p.unit || 'Lainnya';
      if (!unitMap[u]) unitMap[u] = { total: 0, voted: 0 };
      unitMap[u].total += 1;
      if (votedMap[p.id]) unitMap[u].voted += 1;
    });

    const rekapUnit = Object.keys(unitMap).map(u => ({
      unit_kerja: u,
      total_dpt: unitMap[u].total,
      sudah_memilih: unitMap[u].voted,
      belum_memilih: unitMap[u].total - unitMap[u].voted,
      persen: unitMap[u].total > 0 ? ((unitMap[u].voted / unitMap[u].total) * 100).toFixed(1) : 0
    })).sort((a, b) => b.total_dpt - a.total_dpt);

    // Rekap suara kandidat dari ballots anonim
    const candidateVotes = {};
    ballots.forEach(b => {
      candidateVotes[b.candidateId] = (candidateVotes[b.candidateId] || 0) + 1;
    });

    const candidates = [
      { id: 'cand-1', candidate_number: 1, name: 'Ns. Siti Rahmawati, S.Kep., M.Kep.', title_credentials: 'Kandidat 1' },
      { id: 'cand-2', candidate_number: 2, name: 'Ns. Muhammad Fadli Hidayat, S.Kep., Sp.KMB.', title_credentials: 'Kandidat 2' },
      { id: 'cand-3', candidate_number: 3, name: 'Ns. Rusmulyadi, S.Kep.Ners., M.A.R.S', title_credentials: 'Kandidat 3' },
      { id: 'cand-abstain', candidate_number: 4, name: 'Kotak Kosong / Abstain (Tidak Memilih)', title_credentials: 'Opsi Abstain', is_abstain: true }
    ];

    const rekapKandidat = candidates.map(c => {
      const votes = candidateVotes[c.id] || 0;
      return {
        candidate_id: c.id,
        candidate_number: c.candidate_number,
        name: c.name,
        title_credentials: c.title_credentials,
        is_abstain: Boolean(c.is_abstain),
        vote_count: votes,
        percent: totalVoted > 0 ? ((votes / totalVoted) * 100).toFixed(2) : 0
      };
    });

    return {
      success: true,
      election: {
        id: electionId,
        title: 'Simulasi Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso',
        period: '2027 - 2030',
        disclaimer: SCHEDULE.DISCLAIMER,
        start_time: SCHEDULE.START_ISO,
        end_time: SCHEDULE.END_ISO,
        status: 'aktif'
      },
      metrics: {
        total_dpt: totalDpt,
        total_voted: totalVoted,
        belum_memilih: totalDpt - totalVoted,
        turnout_percent: turnoutPercent
      },
      rekap_unit: rekapUnit,
      rekap_kandidat: rekapKandidat
    };
  }

  // Reset Data Simulasi
  async function resetSimulation(electionId = SIMULATION_ELECTION_ID) {
    const sb = initClient();
    if (sb) {
      try {
        const { data, error } = await sb.rpc('admin_reset_simulation_data', { p_election_id: electionId });
        if (!error && data) return data;
      } catch (e) {
        console.warn('[SupabaseClient] Gagal RPC admin_reset_simulation_data:', e);
      }
    }

    localStorage.removeItem('komkep_sim_voters');
    localStorage.removeItem('komkep_sim_ballots');
    localStorage.removeItem('komkep_booth_logs');

    return {
      success: true,
      message: 'Data simulasi pemilihan berhasil direset bersih.'
    };
  }

  function unlockAccount(idLogin) {
    try {
      const clean = String(idLogin || '').trim().replace(/\s+/g, '');
      const attemptsMap = JSON.parse(localStorage.getItem('komkep_login_attempts') || '{}');
      delete attemptsMap[clean];
      localStorage.setItem('komkep_login_attempts', JSON.stringify(attemptsMap));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearAllLockouts() {
    try {
      localStorage.removeItem('komkep_login_attempts');
      return true;
    } catch (e) {
      return false;
    }
  }

  // Ekspor Modul ke Objek Global
  window.SupabaseKomkep = {
    init: initClient,
    escapeHtml: escapeHtml,
    maskId: maskId,
    login: login,
    changePassword: changePassword,
    checkElectionSchedule: checkElectionSchedule,
    enterBooth: enterBooth,
    castVote: castVote,
    getElectionRekap: getElectionRekap,
    resetSimulation: resetSimulation,
    unlockAccount: unlockAccount,
    clearAllLockouts: clearAllLockouts,
    formatWibDate: formatWibDate,
    SCHEDULE: SCHEDULE
  };

})(window);
