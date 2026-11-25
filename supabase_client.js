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
    START_ISO: (window.KOMKEP_CONFIG && window.KOMKEP_CONFIG.WAKTU_BUKA_DEFAULT) || '2026-11-24T09:00:00+07:00',
    END_ISO: (window.KOMKEP_CONFIG && window.KOMKEP_CONFIG.WAKTU_TUTUP_DEFAULT) || '2026-11-26T23:59:59+07:00',
    STAGE_LABEL: 'SIMULASI PEMILIHAN TAHAP 2',
    DISCLAIMER: 'SIMULASI PEMILIHAN TAHAP 2 (24 Nov 2026 09.00 WIB s.d. 26 Nov 2026 23.59 WIB) — HASIL TIDAK MENGIKAT'
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

  // Normalisasi ID: hapus semua spasi (termasuk non-breaking/zero-width), titik, strip, tanda kutip
  function normalizeId(rawId) {
    return String(rawId === null || rawId === undefined ? '' : rawId)
      .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .trim();
  }

  function getCentralApiUrl() {
    const cfgUrl = (window.KOMKEP_CONFIG && window.KOMKEP_CONFIG.GAS_EXEC_URL) ? String(window.KOMKEP_CONFIG.GAS_EXEC_URL).trim() : '';
    const lsUrl = (localStorage.getItem('komkep_gas_exec_url') || '').trim();
    const url = cfgUrl || lsUrl;
    return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/i.test(url) ? url : '';
  }

  function isCentralBackendActive() {
    return Boolean(getCentralApiUrl());
  }

  async function callCentralApi(aksi, payload = {}) {
    const url = getCentralApiUrl();
    if (!url) return null;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ aksi, ...payload })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
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

  const KEY_PASS_HASHES = 'komkep_sim2_password_hashes';
  const KEY_PASS_CHANGED = 'komkep_sim2_passwords_changed';
  const KEY_LOGIN_ATTEMPTS = 'komkep_sim2_login_attempts';

  function getCustomPasswordHash(idLogin) {
    try {
      const map = JSON.parse(localStorage.getItem(KEY_PASS_HASHES) || '{}');
      return map[idLogin] || null;
    } catch (_) {
      return null;
    }
  }

  function clearCustomPasswordHash(idLogin) {
    try {
      const map = JSON.parse(localStorage.getItem(KEY_PASS_HASHES) || '{}');
      delete map[idLogin];
      localStorage.setItem(KEY_PASS_HASHES, JSON.stringify(map));
    } catch (_) {}
  }

  function clearGmail(idLogin) {
    try {
      const map = JSON.parse(localStorage.getItem('komkep_user_gmail') || '{}');
      delete map[normalizeId(idLogin)];
      localStorage.setItem('komkep_user_gmail', JSON.stringify(map));
    } catch (_) {}
  }

  function setCustomPasswordHash(idLogin, hash) {
    try {
      const map = JSON.parse(localStorage.getItem(KEY_PASS_HASHES) || '{}');
      map[idLogin] = hash;
      localStorage.setItem(KEY_PASS_HASHES, JSON.stringify(map));
    } catch (_) {}
  }

  function setPasswordChanged(idLogin) {
    try {
      const changedList = JSON.parse(localStorage.getItem(KEY_PASS_CHANGED) || '[]');
      if (!changedList.includes(idLogin)) {
        changedList.push(idLogin);
        localStorage.setItem(KEY_PASS_CHANGED, JSON.stringify(changedList));
      }
    } catch (_) {}
  }

  function checkLoginRateLimit(idLogin) {
    try {
      const attemptsMap = JSON.parse(localStorage.getItem(KEY_LOGIN_ATTEMPTS) || '{}');
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
      const attemptsMap = JSON.parse(localStorage.getItem(KEY_LOGIN_ATTEMPTS) || '{}');
      if (isSuccess) {
        delete attemptsMap[idLogin];
      } else {
        const item = attemptsMap[idLogin] || { count: 0 };
        item.count += 1;
        if (item.count >= 10) {
          item.lockedUntil = Date.now() + (5 * 60 * 1000);
        }
        attemptsMap[idLogin] = item;
      }
      localStorage.setItem(KEY_LOGIN_ATTEMPTS, JSON.stringify(attemptsMap));
    } catch (_) {}
  }

  /* ==========================================================================
     1. LOGIN DENGAN NIP/NIPPPK/NIK TANPA SPASI & PASSWORD AWAL 'soedarso2026'
     ========================================================================== */
  async function login(usernameOrId, password) {
    const cleanId = normalizeId(usernameOrId);
    const cleanPass = String(password || '').trim();

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

    let pegawaiList = Array.isArray(window.KOMKEP_PEGAWAI_717) ? window.KOMKEP_PEGAWAI_717 : [];
    // Jika data_pegawai_manifest.js belum selesai dimuat (misalnya jaringan HP lambat), muat otomatis
    if (pegawaiList.length === 0 && typeof fetch === 'function') {
      try {
        const resp = await fetch('data_pegawai_manifest.js?v=20261124f');
        if (resp.ok) {
          const txt = await resp.text();
          const sIdx = txt.indexOf('[');
          const eIdx = txt.lastIndexOf(']');
          if (sIdx !== -1 && eIdx > sIdx) {
            pegawaiList = JSON.parse(txt.slice(sIdx, eIdx + 1));
            window.KOMKEP_PEGAWAI_717 = pegawaiList;
          }
        }
      } catch (_) {}
    }

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
        message: `NIP/NIPPPK/NIK tidak ditemukan dalam daftar ${pegawaiList.length} pegawai (ID terbaca: "${cleanId}", ${cleanId.length} digit). Pastikan angka NIP/NIPPPK/NIK benar tanpa spasi.`
      };
    }

    // Cek sinkronisasi password & Gmail dari server pusat (agar password baru & reset akun berlaku di semua HP/laptop)
    let remoteHash = null;
    let remoteGmail = '';
    if (isCentralBackendActive()) {
      try {
        const accRes = await callCentralApi('cek_akun', { nip: lookupId });
        if (accRes && accRes.ok) {
          if (accRes.ditemukan && accRes.hash_sandi) {
            remoteHash = accRes.hash_sandi;
            setCustomPasswordHash(lookupId, remoteHash);
          } else {
            // Jika belum ada / sudah direset di server pusat, bersihkan sisa hash lokal agar kembali ke sandi awal
            clearCustomPasswordHash(lookupId);
          }
          if (accRes.ditemukan && accRes.gmail) {
            remoteGmail = accRes.gmail;
            setGmail(lookupId, remoteGmail, true);
          } else {
            clearGmail(lookupId);
          }
        }
      } catch (_) {}
    }

    // Verifikasi Password:
    // - Belum pernah ganti sandi  -> sandi awal 'soedarso2026' (toleran huruf besar/kecil akibat keyboard HP).
    // - Sudah ganti sandi         -> hanya sandi baru yang berlaku.
    const inputHash = await computeSha256(cleanPass);
    const customHash = remoteHash || getCustomPasswordHash(lookupId);
    const isDefaultPass = (cleanPass.toLowerCase() === 'soedarso2026' || inputHash === DEFAULT_PASS_HASH);
    const isValid = customHash ? (inputHash === customHash) : isDefaultPass;

    if (!isValid) {
      recordLoginAttempt(cleanId, false);
      return {
        success: false,
        message: customHash
          ? 'Kata sandi salah. Gunakan kata sandi baru yang sudah Anda buat sebelumnya.'
          : 'Kata sandi salah. Untuk login pertama di perangkat ini, gunakan password awal: soedarso2026'
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
    const panitiaList = (window.KOMITE_DATA && window.KOMITE_DATA.panitiaAdHocSK && Array.isArray(window.KOMITE_DATA.panitiaAdHocSK.anggota))
      ? window.KOMITE_DATA.panitiaAdHocSK.anggota
      : [];
    const matchedPanitia = panitiaList.find(p => normalizeId(p.nip) === finalNip) || null;

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
      isPanitiaAdHoc: Boolean(matchedPanitia),
      jabatanPanitia: matchedPanitia ? matchedPanitia.kedudukan : '',
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

  function setGmail(idLogin, email, skipRemoteSync = false) {
    const clean = String(email || '').trim().toLowerCase();
    if (!isValidGmail(clean)) {
      return { success: false, message: 'Alamat Gmail tidak valid. Gunakan alamat yang berakhiran @gmail.com.' };
    }
    const cleanId = normalizeId(idLogin);
    try {
      const map = JSON.parse(localStorage.getItem('komkep_user_gmail') || '{}');
      map[cleanId] = clean;
      localStorage.setItem('komkep_user_gmail', JSON.stringify(map));
    } catch (_) {}
    if (!skipRemoteSync && isCentralBackendActive()) {
      callCentralApi('simpan_akun', { nip: cleanId, gmail: clean }).catch(() => {});
    }
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
    const cleanOld = String(oldPassword || '').trim();
    const oldHash = await computeSha256(cleanOld);
    const oldValid = customHash
      ? (oldHash === customHash)
      : (cleanOld.toLowerCase() === 'soedarso2026' || oldHash === DEFAULT_PASS_HASH);
    if (!oldValid) {
      return { success: false, message: 'Password lama yang Anda masukkan tidak sesuai.' };
    }

    const newHash = await computeSha256(newPassword);
    setCustomPasswordHash(cleanId, newHash);
    setPasswordChanged(cleanId);
    if (isCentralBackendActive()) {
      try {
        await callCentralApi('simpan_akun', {
          nip: cleanId,
          hash_sandi: newHash,
          gmail: getGmail(cleanId) || ''
        });
      } catch (_) {}
    }

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
      statusText = 'Simulasi Tahap 2 Ditutup (Kamis, 26 Nov 2026 pukul 23.59 WIB)';
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

  async function getVoterRecordAsync(idLogin) {
    const clean = normalizeId(idLogin);
    if (!clean) return null;
    if (isCentralBackendActive()) {
      try {
        const res = await callCentralApi('cek_pemilih', { nip: clean });
        if (res && res.ok) {
          const voters = readJson(KEY_VOTERS, {});
          if (res.sudah_memilih && res.receipt) {
            voters[clean] = res.receipt;
            writeJson(KEY_VOTERS, voters);
            return res.receipt;
          }
          // Jika server pusat menyatakan belum memilih, hapus sisa catatan lokal agar bisa memilih kembali
          if (voters[clean]) {
            delete voters[clean];
            writeJson(KEY_VOTERS, voters);
          }
          return null;
        }
      } catch (err) {
        console.warn('[getVoterRecordAsync] Gagal cek server pusat:', err);
      }
    }
    return getVoterRecord(clean);
  }

  async function enterBooth(idLogin) {
    const sched = checkElectionSchedule();
    if (!sched.isOpen) {
      return {
        success: false,
        message: sched.isBefore
          ? 'Bilik suara Simulasi Tahap 2 baru dibuka pada Selasa, 24 November 2026 pukul 09.00 WIB.'
          : 'Waktu pemungutan suara Simulasi Tahap 2 telah ditutup pada Kamis, 26 November 2026 pukul 23.59 WIB.'
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
          : 'Simulasi Tahap 2 sudah ditutup pada 26 November 2026 pukul 23.59 WIB.'
      };
    }
    const clean = normalizeId(idLogin);
    if (!clean || !candidateId) {
      return { success: false, message: 'Data pemilih atau calon tidak lengkap.' };
    }

    // Jika Server Pusat (Google Apps Script) sudah dikonfigurasi, rekam suara di server pusat (lintas-perangkat)
    if (isCentralBackendActive()) {
      try {
        const waktuWib = formatWibDate(new Date());
        const res = await callCentralApi('pilih', {
          nip: clean,
          kode_calon: candidateId,
          waktu_wib: waktuWib
        });
        if (!res) {
          return { success: false, message: 'Server pusat tidak merespons. Coba lagi.' };
        }
        if (!res.ok) {
          if (res.receipt) {
            const voters = readJson(KEY_VOTERS, {});
            voters[clean] = res.receipt;
            writeJson(KEY_VOTERS, voters);
          }
          return {
            success: false,
            code: res.kode || 'VOTE_REJECTED',
            message: res.pesan || 'Gagal merekam suara di server pusat.',
            receipt: res.receipt || null
          };
        }
        const voters = readJson(KEY_VOTERS, {});
        voters[clean] = res.receipt;
        writeJson(KEY_VOTERS, voters);
        return {
          success: true,
          message: res.pesan || 'Suara rahasia Anda berhasil direkam di server pusat.',
          receipt: res.receipt
        };
      } catch (err) {
        return {
          success: false,
          message: 'Gagal terhubung ke server pusat (' + (err.message || 'cek koneksi internet') + '). Silakan coba kirim suara lagi.'
        };
      }
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
    const sched = checkElectionSchedule();

    if (isCentralBackendActive()) {
      try {
        const res = await callCentralApi('rekap', {});
        if (res && res.ok) {
          const totalVoted = res.total_voted || 0;
          return {
            success: true,
            isCentral: true,
            isCancelled: false,
            resultsAvailable: sched.isAfter,
            closedMessage: 'Hasil perolehan suara per calon dibuka resmi setelah penutupan pada Kamis, 26 November 2026 pukul 23.59 WIB.',
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
            voters_map: res.voters_map || {},
            rekap_kandidat: res.rekap_kandidat || []
          };
        }
      } catch (err) {
        console.warn('[getElectionRekap] Gagal memuat rekap server pusat:', err);
      }
    }

    const voters = readJson(KEY_VOTERS, {});
    const ballots = readJson(KEY_BALLOTS, []);

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
      closedMessage: 'Hasil perolehan suara per calon dibuka resmi setelah penutupan pada Kamis, 26 November 2026 pukul 23.59 WIB.',
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
    if (isCentralBackendActive()) {
      try {
        await callCentralApi('reset', { konfirmasi: 'RESET_SIM2' });
      } catch (err) {
        console.warn('[resetSimulation] Gagal reset server pusat:', err);
      }
    }
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
      localStorage.removeItem(KEY_LOGIN_ATTEMPTS);
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
    getVoterRecordAsync,
    isCentralBackendActive,
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
