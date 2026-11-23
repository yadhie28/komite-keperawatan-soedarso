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
  const SIMULATION_ELECTION_ID = 'e1ec7100-2026-1123-0000-000000000001';

  const SCHEDULE = {
    START_ISO: '2026-11-23T10:00:00+07:00',
    END_ISO: '2026-11-24T10:00:00+07:00',
    DISCLAIMER: 'SIMULASI PEMILIHAN DIBATALKAN SEMENTARA'
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

    let lookupId = cleanId;
    let matchedAdmin = adminList.find(a => {
      const anip = normalizeId(a.nip);
      const u = String(a.username || '').toLowerCase().replace(/\s+/g, '');
      const al = String(a.alias || '').toLowerCase().replace(/\s+/g, '');
      const alt = String(a.altAlias || '').toLowerCase().replace(/\s+/g, '');
      const dev = String(a.devAlias || '').toLowerCase().replace(/\s+/g, '');
      const cLow = cleanId.toLowerCase();
      return (anip && anip === cleanId) || u === cLow || al === cLow || alt === cLow || dev === cLow;
    });

    if (matchedAdmin && matchedAdmin.nip) {
      lookupId = normalizeId(matchedAdmin.nip);
    }

    const matchedPegawai = pegawaiList.find(p => normalizeId(p.id) === lookupId);

    if (!matchedPegawai && !matchedAdmin) {
      recordLoginAttempt(cleanId, false);
      return {
        success: false,
        message: 'NIP/NIPPPK/NIK atau password salah.'
      };
    }

    // Verifikasi Password:
    // Password awal semua akun adalah 'soedarso2026' (atau password custom bila sudah pernah diganti di browser ini)
    const inputHash = await computeSha256(cleanPass);
    const customHash = getCustomPasswordHash(lookupId) || getCustomPasswordHash(cleanId);
    const isDefaultPass = (cleanPass === 'soedarso2026' || inputHash === DEFAULT_PASS_HASH);
    const isCustomValid = Boolean(customHash && inputHash === customHash);

    if (!isDefaultPass && !isCustomValid) {
      recordLoginAttempt(cleanId, false);
      return {
        success: false,
        message: 'NIP/NIPPPK/NIK atau password salah.'
      };
    }

    recordLoginAttempt(cleanId, true);
    if (lookupId !== cleanId) recordLoginAttempt(lookupId, true);

    const finalNip = matchedPegawai ? normalizeId(matchedPegawai.id) : (matchedAdmin ? normalizeId(matchedAdmin.nip || matchedAdmin.username) : lookupId);
    const finalName = matchedAdmin ? matchedAdmin.name : (matchedPegawai ? matchedPegawai.nama : cleanId);
    const finalUnit = matchedPegawai ? matchedPegawai.unit : (matchedAdmin?.group || 'Komite Keperawatan');
    const finalKat  = matchedPegawai ? matchedPegawai.kat : 'Perawat';

    const userObj = {
      username: matchedAdmin ? matchedAdmin.username : finalNip,
      id_login: finalNip,
      nip: finalNip,
      jenis_id: matchedPegawai ? matchedPegawai.jenis : 'NIP',
      name: finalName,
      id_pegawai: matchedPegawai ? matchedPegawai.peg : '',
      kategori: finalKat,
      profesi: finalKat,
      status_kepegawaian: matchedPegawai ? matchedPegawai.status : 'ASN',
      jabatan: matchedAdmin ? matchedAdmin.role : (matchedPegawai ? matchedPegawai.jab : 'Tenaga Keperawatan'),
      unit: finalUnit,
      masked_id: maskId(finalNip),
      role: matchedAdmin ? matchedAdmin.role : 'pengusul',
      badge: matchedAdmin ? matchedAdmin.badge : `Tenaga ${finalKat} • ${finalUnit}`,
      access: matchedAdmin
        ? Array.from(new Set([...(matchedAdmin.access || []), 'pengusul', 'kredensial', 'pemilihan']))
        : ['pengusul', 'kredensial', 'pemilihan'],
      isAdmin: Boolean(matchedAdmin),
      isPengurus: Boolean(matchedAdmin),
      wajib_ganti_password: false,
      mustChangePassword: false
    };

    try {
      localStorage.setItem('komite_auth_user', JSON.stringify(userObj));
    } catch (_) {}

    return {
      success: true,
      message: 'Login berhasil.',
      user: userObj,
      wajib_ganti_password: false
    };
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

    const currentHash = getCustomPasswordHash(cleanId) || DEFAULT_PASS_HASH;
    const oldHash = await computeSha256(oldPassword);
    if (oldPassword !== 'soedarso2026' && oldHash !== currentHash) {
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
     3. E-VOTING: SIMULASI DIBATALKAN SEMENTARA
     ========================================================================== */
  function checkElectionSchedule() {
    const now = new Date();
    const start = new Date(SCHEDULE.START_ISO);
    const end = new Date(SCHEDULE.END_ISO);

    return {
      isOpen: false,
      isCancelled: true,
      isPaused: true,
      isMaintenance: true,
      isBefore: false,
      isAfter: false,
      now,
      start,
      end,
      remainingMs: 0,
      countdownStr: 'Simulasi Dibatalkan Sementara',
      statusText: 'Simulasi Pemilihan Dibatalkan Sementara',
      disclaimer: SCHEDULE.DISCLAIMER
    };
  }

  async function enterBooth() {
    return {
      success: false,
      message: 'Simulasi Pemilihan Ketua Komite Keperawatan sedang dibatalkan/dinonaktifkan sementara.'
    };
  }

  async function castVote() {
    return {
      success: false,
      code: 'SIMULATION_CANCELLED',
      message: 'Simulasi Pemilihan Ketua Komite Keperawatan sedang dibatalkan sementara.'
    };
  }

  async function getElectionRekap(electionId = SIMULATION_ELECTION_ID) {
    const pegawaiList = window.KOMKEP_PEGAWAI_717 || [];
    const totalDpt = pegawaiList.length || 717;
    return {
      success: true,
      isCancelled: true,
      resultsAvailable: false,
      closedMessage: 'Simulasi pemilihan Ketua Komite Keperawatan Periode 2027–2030 saat ini dibatalkan sementara.',
      election: {
        id: electionId,
        status: 'DIBATALKAN',
        disclaimer: SCHEDULE.DISCLAIMER
      },
      metrics: {
        total_dpt: totalDpt,
        total_voted: 0
      },
      rekap_kandidat: []
    };
  }

  async function resetSimulation() {
    localStorage.removeItem('komkep_sim_voters');
    localStorage.removeItem('komkep_sim_ballots');
    localStorage.removeItem('komkep_booth_logs');
    return {
      success: true,
      message: 'Data simulasi berhasil dibersihkan.'
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
    checkElectionSchedule,
    enterBooth,
    castVote,
    getElectionRekap,
    resetSimulation,
    clearAllLockouts,
    formatWibDate,
    SCHEDULE
  };

})(window);
