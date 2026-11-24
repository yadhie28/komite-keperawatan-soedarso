/**
 * ============================================================================
 * SISTEM AUTENTIKASI & KEAMANAN PORTAL KOMITE KEPERAWATAN RSUD dr. SOEDARSO
 * ============================================================================
 * Aturan Login:
 * 1. Portal login hanya tampil di awal pertama kali akses web (Portal Gateway).
 * 2. Username berupa NIP / NIPPPK / NIK tanpa spasi.
 * 3. Password awal yang sama untuk semua akun: 'soedarso2026'.
 * 4. Simulasi E-Voting saat ini dibatalkan/dinonaktifkan sementara.
 * ============================================================================
 */

(function (window) {
  'use strict';

  const SALT_PEPPER = 'rsds_soedarso_salt_2026';
  // SHA-256('soedarso2026' + 'rsds_soedarso_salt_2026')
  const DEFAULT_PASS_HASH = 'b3b21041d6775add44aa44c10820f6623254e5192e485bd4cb9614428a2bac59';
  const SIMULATION_ELECTION_ID = 'e1ec7100-2026-1124-0000-000000000002';

  const SCHEDULE = {
    START_ISO: '2026-11-24T09:00:00+07:00',
    END_ISO: '2026-11-25T09:00:00+07:00',
    STAGE_LABEL: 'SIMULASI PEMILIHAN TAHAP 2',
    DISCLAIMER: 'SIMULASI PEMILIHAN TAHAP 2 (24 Nov 2026 09.00 WIB s.d. 25 Nov 2026 09.00 WIB) — HASIL TIDAK MENGIKAT'
  };

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Normalisasi ID: hapus semua spasi, titik, strip
  function normalizeId(rawId) {
    return String(rawId === null || rawId === undefined ? '' : rawId)
      .replace(/^'+/, '')
      .replace(/[\s.\-'"]/g, '')
      .trim();
  }

  // Penyamaran ID tanpa spasi
  function maskId(rawId) {
    if (!rawId) return '-';
    const clean = normalizeId(rawId);
    if (clean.length <= 8) return clean || '-';
    const start = clean.substring(0, 4);
    const end = clean.substring(clean.length - 4);
    return `${start}${'•'.repeat(clean.length - 8)}${end}`;
  }

  async function computeSha256(text) {
    const combined = text + SALT_PEPPER;
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(combined);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    return text === 'soedarso2026' ? DEFAULT_PASS_HASH : '';
  }

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

  function getCustomPasswordHash(idLogin) {
    try {
      const map = JSON.parse(localStorage.getItem('komkep_password_hashes') || '{}');
      return map[idLogin] || null;
    } catch (_) {
      return null;
    }
  }

  function setCustomPasswordHash(idLogin, hash) {
    try {
      const map = JSON.parse(localStorage.getItem('komkep_password_hashes') || '{}');
      map[idLogin] = hash;
      localStorage.setItem('komkep_password_hashes', JSON.stringify(map));
    } catch (_) {}
  }

  function setPasswordChanged(idLogin) {
    try {
      const changedList = JSON.parse(localStorage.getItem('komkep_passwords_changed') || '[]');
      if (!changedList.includes(idLogin)) {
        changedList.push(idLogin);
        localStorage.setItem('komkep_passwords_changed', JSON.stringify(changedList));
      }
    } catch (_) {}
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
    } catch (_) {
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
          item.lockedUntil = Date.now() + (15 * 60 * 1000);
        }
        attemptsMap[idLogin] = item;
      }
      localStorage.setItem('komkep_login_attempts', JSON.stringify(attemptsMap));
    } catch (_) {}
  }

  /* ==========================================================================
     1. LOGIN DENGAN NIP/NIPPPK/NIK TANPA SPASI & PASSWORD AWAL 'soedarso2026'
     ========================================================================== */
  async function login(usernameOrId, password) {
    const cleanId = normalizeId(usernameOrId);
    const cleanPass = String(password || '');

    if (!cleanId || !cleanPass) {
      return {
        success: false,
        message: 'NIP/NIPPPK/NIK (tanpa spasi) dan password wajib diisi.'
      };
    }

    const rateCheck = checkLoginRateLimit(cleanId);
    if (rateCheck.isLocked) {
      return {
        success: false,
        isLocked: true,
        message: `Akun terkunci sementara karena beberapa kali percobaan gagal. Silakan coba kembali dalam ${rateCheck.remainingMinutes} menit.`
      };
    }

    const pegawaiList = window.KOMKEP_PEGAWAI_717 || [];
    const adminList = (window.KOMITE_DATA && Array.isArray(window.KOMITE_DATA.adminUsers))
      ? window.KOMITE_DATA.adminUsers
      : [];

    // Username HANYA berupa NIP / NIPPPK / NIK (tanpa spasi).
    // Pengurus Komite dikenali dari NIP yang tercantum di SK Komite Keperawatan.
    const lookupId = cleanId;
    const matchedAdmin = adminList.find(a => a.nip && normalizeId(a.nip) === cleanId) || null;
    const matchedPegawai = pegawaiList.find(p => normalizeId(p.id) === lookupId);

    if (!matchedPegawai && !matchedAdmin) {
      recordLoginAttempt(cleanId, false);
      return {
        success: false,
        message: 'NIP/NIPPPK/NIK atau password salah.'
      };
    }

    // Verifikasi Password:
    // - Belum pernah ganti sandi  -> hanya sandi awal 'soedarso2026' yang berlaku.
    // - Sudah ganti sandi         -> hanya sandi baru yang berlaku (sandi awal tidak bisa dipakai lagi).
    const inputHash = await computeSha256(cleanPass);
    const customHash = getCustomPasswordHash(lookupId);
    const isDefaultPass = (cleanPass === 'soedarso2026' || inputHash === DEFAULT_PASS_HASH);
    const isValid = customHash ? (inputHash === customHash) : isDefaultPass;

    if (!isValid) {
      recordLoginAttempt(cleanId, false);
      return {
        success: false,
        message: 'NIP/NIPPPK/NIK atau password salah.'
      };
    }

    recordLoginAttempt(cleanId, true);

    const finalNip = lookupId;
    const finalName = matchedAdmin ? matchedAdmin.name : matchedPegawai.nama;
    const finalUnit = matchedPegawai ? matchedPegawai.unit : (matchedAdmin.group || 'Komite Keperawatan');
    const finalKat  = matchedPegawai ? matchedPegawai.kat : 'Perawat';
    const gmail = getGmail(finalNip);
    const mustChange = !customHash;      // masih memakai sandi awal
    const mustGmail = !gmail;            // belum mengisi Gmail pribadi
    const skNo = (window.KOMITE_DATA && window.KOMITE_DATA.skKomiteNo) || 'SK/ 280801 /RSUD/2026';

    const userObj = {
      username: finalNip,
      id_login: finalNip,
      nip: finalNip,
      jenis_id: matchedPegawai ? matchedPegawai.jenis : 'NIP',
      name: finalName,
      id_pegawai: matchedPegawai ? matchedPegawai.peg : '',
      kategori: finalKat,
      profesi: finalKat,
      status_kepegawaian: matchedPegawai ? matchedPegawai.status : 'ASN',
      jabatan: matchedAdmin ? matchedAdmin.role : (matchedPegawai.jab || 'Tenaga Keperawatan'),
      unit: finalUnit,
      masked_id: maskId(finalNip),
      role: matchedAdmin ? matchedAdmin.role : 'pengusul',
      badge: matchedAdmin ? matchedAdmin.badge : `Tenaga ${finalKat} • ${finalUnit}`,
      group: matchedAdmin ? matchedAdmin.group : '',
      sk_komite: matchedAdmin ? skNo : '',
      access: matchedAdmin
        ? Array.from(new Set([...(matchedAdmin.access || []), 'pengusul', 'kredensial', 'pemilihan']))
        : ['pengusul', 'kredensial', 'pemilihan'],
      isAdmin: Boolean(matchedAdmin),
      isPengurus: Boolean(matchedAdmin),
      email: gmail || '',
      gmail: gmail || '',
      wajib_ganti_password: mustChange,
      mustChangePassword: mustChange,
      wajib_isi_gmail: mustGmail
    };

    try {
      localStorage.setItem('komite_auth_user', JSON.stringify(userObj));
    } catch (_) {}

    return {
      success: true,
      message: 'Login berhasil.',
      user: userObj,
      wajib_ganti_password: mustChange || mustGmail
    };
  }

  /* Gmail pribadi per NIP (media komunikasi pengurus <-> perawat/bidan) */
  function isValidGmail(email) {
    return /^[a-z0-9](?:[a-z0-9.+_-]*[a-z0-9])?@(gmail|googlemail)\.com$/i.test(String(email || '').trim());
  }

  function getGmail(idLogin) {
    try {
      const map = JSON.parse(localStorage.getItem('komkep_user_gmail') || '{}');
      return map[normalizeId(idLogin)] || '';
    } catch (_) {
      return '';
    }
  }

  function setGmail(idLogin, email) {
    const clean = String(email || '').trim().toLowerCase();
    if (!isValidGmail(clean)) {
      return { success: false, message: 'Alamat Gmail tidak valid. Gunakan alamat yang berakhiran @gmail.com.' };
    }
    try {
      const map = JSON.parse(localStorage.getItem('komkep_user_gmail') || '{}');
      map[normalizeId(idLogin)] = clean;
      localStorage.setItem('komkep_user_gmail', JSON.stringify(map));
    } catch (_) {}
    return { success: true, email: clean };
  }

  async function logout() {
    try {
      localStorage.removeItem('komite_auth_user');
      sessionStorage.removeItem('komkep_sesi_aktif_v1');
    } catch (_) {}
    return { success: true };
  }

  /* ==========================================================================
     2. GANTI PASSWORD (OPSIONAL MELALUI PENGATURAN AKUN)
     ========================================================================== */
  async function changePassword(idLogin, oldPassword, newPassword, confirmPassword) {
    const cleanId = normalizeId(idLogin);
    if (!cleanId) {
      return { success: false, message: 'ID pengguna tidak valid.' };
    }
    if (!oldPassword || !newPassword || !confirmPassword) {
      return { success: false, message: 'Semua kolom formulir ganti password wajib diisi.' };
    }
    if (newPassword.length < 8) {
      return { success: false, message: 'Password baru minimal 8 karakter.' };
    }
    if (newPassword !== confirmPassword) {
      return { success: false, message: 'Konfirmasi password baru tidak cocok.' };
    }
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return { success: false, message: 'Password baru harus mengandung huruf dan angka.' };
    }
    if (newPassword === 'soedarso2026') {
      return { success: false, message: 'Password baru tidak boleh sama dengan password awal.' };
    }
    if (normalizeId(newPassword) === cleanId) {
      return { success: false, message: 'Password baru tidak boleh sama dengan NIP/NIPPPK/NIK.' };
    }

    const customHash = getCustomPasswordHash(cleanId);
    const oldHash = await computeSha256(oldPassword);
    const oldValid = customHash
      ? (oldHash === customHash)
      : (oldPassword === 'soedarso2026' || oldHash === DEFAULT_PASS_HASH);
    if (!oldValid) {
      return { success: false, message: 'Password lama yang Anda masukkan tidak sesuai.' };
    }

    const newHash = await computeSha256(newPassword);
    setCustomPasswordHash(cleanId, newHash);
    setPasswordChanged(cleanId);

    return {
      success: true,
      message: 'Password berhasil diperbarui.'
    };
  }

  /* ==========================================================================
     3. E-VOTING: SIMULASI PEMILIHAN TAHAP 2 (24–25 NOV 2026, 09.00–09.00 WIB)
     ========================================================================== */
  const KEY_VOTERS = 'komkep_sim2_voters';
  const KEY_BALLOTS = 'komkep_sim2_ballots';
  const KEY_BOOTH_LOGS = 'komkep_sim2_booth_logs';
  const KEY_OVERRIDE = 'komkep_sim2_manual_state';

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (_) {}
  }

  function formatCountdown(ms) {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = n => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }

  function generateReceiptCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'SIM2-';
    for (let i = 0; i < 8; i++) {
      if (i === 4) code += '-';
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  function checkElectionSchedule() {
    const now = new Date();
    const start = new Date(SCHEDULE.START_ISO);
    const end = new Date(SCHEDULE.END_ISO);
    const override = localStorage.getItem(KEY_OVERRIDE) || '';

    const isBefore = now < start && override !== 'OPEN';
    const isAfter = (now >= end && override !== 'OPEN') || override === 'CLOSED';
    const isOpen = !isBefore && !isAfter;

    let countdownStr = '00:00:00';
    let statusText = 'Simulasi Tahap 2 Sedang Berlangsung';
    let remainingMs = 0;

    if (isBefore) {
      remainingMs = Math.max(0, start.getTime() - now.getTime());
      countdownStr = formatCountdown(remainingMs);
      statusText = 'Segera Dibuka (Selasa, 24 Nov 2026 pukul 09.00 WIB)';
    } else if (isOpen) {
      remainingMs = Math.max(0, end.getTime() - now.getTime());
      countdownStr = formatCountdown(remainingMs);
      statusText = 'Bilik Suara Simulasi Tahap 2 AKTIF';
    } else {
      remainingMs = 0;
      countdownStr = 'Selesai';
      statusText = 'Simulasi Tahap 2 Ditutup (Rabu, 25 Nov 2026 pukul 09.00 WIB)';
    }

    return {
      isOpen,
      isCancelled: false,
      isPaused: false,
      isMaintenance: false,
      isBefore,
      isAfter,
      now,
      start,
      end,
      remainingMs,
      countdownStr,
      statusText,
      disclaimer: SCHEDULE.DISCLAIMER
    };
  }

  function getVoterRecord(idLogin) {
    const clean = normalizeId(idLogin);
    const voters = readJson(KEY_VOTERS, {});
    return voters[clean] || null;
  }

  async function enterBooth(idLogin) {
    const sched = checkElectionSchedule();
    if (!sched.isOpen) {
      return {
        success: false,
        message: sched.isBefore
          ? 'Bilik suara Simulasi Tahap 2 baru dibuka pada Selasa, 24 November 2026 pukul 09.00 WIB.'
          : 'Waktu pemungutan suara Simulasi Tahap 2 telah ditutup pada Rabu, 25 November 2026 pukul 09.00 WIB.'
      };
    }
    const clean = normalizeId(idLogin);
    const logs = readJson(KEY_BOOTH_LOGS, []);
    const entry = {
      id_login: clean,
      waktu: new Date().toISOString(),
      waktu_wib: formatWibDate(new Date())
    };
    logs.push(entry);
    writeJson(KEY_BOOTH_LOGS, logs);
    return { success: true, entry };
  }

  async function castVote(electionId, idLogin, candidateId) {
    const sched = checkElectionSchedule();
    if (!sched.isOpen) {
      return {
        success: false,
        code: 'SCHEDULE_CLOSED',
        message: sched.isBefore
          ? 'Simulasi Tahap 2 belum dimulai. Bilik suara dibuka pukul 09.00 WIB.'
          : 'Simulasi Tahap 2 sudah ditutup pada 25 November 2026 pukul 09.00 WIB.'
      };
    }
    const clean = normalizeId(idLogin);
    if (!clean || !candidateId) {
      return { success: false, message: 'Data pemilih atau calon tidak lengkap.' };
    }
    const voters = readJson(KEY_VOTERS, {});
    if (voters[clean]) {
      return {
        success: false,
        code: 'ALREADY_VOTED',
        message: 'Akun ini sudah menggunakan hak suara pada Simulasi Tahap 2.',
        receipt: voters[clean]
      };
    }

    const nowIso = new Date().toISOString();
    const receipt = {
      kode_bukti: generateReceiptCode(),
      waktu_iso: nowIso,
      waktu_wib: formatWibDate(nowIso),
      election_id: electionId || SIMULATION_ELECTION_ID
    };

    // Asas LUBER & JURDIL: daftar pemilih hanya menyimpan kode bukti (TANPA pilihan calon)
    voters[clean] = receipt;
    writeJson(KEY_VOTERS, voters);

    // Kotak suara hanya menyimpan ID acak & kode calon (TANPA NIP pemilih)
    const ballots = readJson(KEY_BALLOTS, []);
    ballots.push({
      ballot_id: 'B-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
      candidate_id: candidateId,
      waktu_iso: nowIso
    });
    writeJson(KEY_BALLOTS, ballots);

    return {
      success: true,
      message: 'Suara rahasia Anda berhasil direkam pada Simulasi Tahap 2.',
      receipt
    };
  }

  async function getElectionRekap(electionId = SIMULATION_ELECTION_ID) {
    const pegawaiList = window.KOMKEP_PEGAWAI_717 || [];
    const totalDpt = pegawaiList.length || 717;
    const voters = readJson(KEY_VOTERS, {});
    const ballots = readJson(KEY_BALLOTS, []);
    const sched = checkElectionSchedule();

    const counts = {};
    ballots.forEach(b => {
      counts[b.candidate_id] = (counts[b.candidate_id] || 0) + 1;
    });

    const totalVoted = Object.keys(voters).length;
    const rekap = Object.keys(counts).map(cid => ({
      candidate_id: cid,
      votes: counts[cid],
      percentage: totalVoted > 0 ? ((counts[cid] / totalVoted) * 100).toFixed(1) : '0.0'
    }));

    return {
      success: true,
      isCancelled: false,
      resultsAvailable: sched.isAfter,
      closedMessage: 'Hasil perolehan suara per calon dibuka resmi setelah penutupan pada Rabu, 25 November 2026 pukul 09.00 WIB.',
      election: {
        id: electionId,
        status: sched.isOpen ? 'BERLANGSUNG' : (sched.isBefore ? 'BELUM_DIMULAI' : 'SELESAI'),
        disclaimer: SCHEDULE.DISCLAIMER
      },
      metrics: {
        total_dpt: totalDpt,
        total_voted: totalVoted,
        participation_pct: totalDpt > 0 ? ((totalVoted / totalDpt) * 100).toFixed(1) : '0.0'
      },
      voters_map: voters,
      rekap_kandidat: rekap
    };
  }

  function setManualScheduleOverride(mode) {
    if (!mode) localStorage.removeItem(KEY_OVERRIDE);
    else localStorage.setItem(KEY_OVERRIDE, mode);
    return checkElectionSchedule();
  }

  async function resetSimulation() {
    localStorage.removeItem(KEY_VOTERS);
    localStorage.removeItem(KEY_BALLOTS);
    localStorage.removeItem(KEY_BOOTH_LOGS);
    localStorage.removeItem(KEY_OVERRIDE);
    return {
      success: true,
      message: 'Data Simulasi Pemilihan Tahap 2 berhasil direset.'
    };
  }

  function clearAllLockouts() {
    try {
      localStorage.removeItem('komkep_login_attempts');
      return true;
    } catch (_) {
      return false;
    }
  }

  window.SupabaseKomkep = {
    init: function () {},
    escapeHtml,
    normalizeId,
    maskId,
    login,
    logout,
    changePassword,
    isValidGmail,
    getGmail,
    setGmail,
    checkElectionSchedule,
    getVoterRecord,
    setManualScheduleOverride,
    enterBooth,
    castVote,
    getElectionRekap,
    resetSimulation,
    clearAllLockouts,
    formatWibDate,
    SCHEDULE
  };

})(window);
