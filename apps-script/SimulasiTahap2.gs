/**
 * ============================================================================
 * BACKEND SERVER PUSAT — SIMULASI PEMILIHAN TAHAP 2 (LINTAS PERANGKAT)
 * Komite Keperawatan RSUD dr. Soedarso Pontianak
 * ============================================================================
 * Cara pasang (2 menit, tanpa upload CSV):
 * 1. Buka https://sheets.new (buat Google Spreadsheet baru).
 * 2. Klik menu: Ekstensi -> Apps Script.
 * 3. Hapus semua isi Code.gs, lalu tempel SELURUH kode ini & tekan Ctrl+S / Cmd+S.
 * 4. Klik "Terapkan" (Deploy) -> "Deployment baru" -> Jenis: "Aplikasi web".
 *    - Jalankan sebagai: Saya (Me)
 *    - Yang memiliki akses: Siapa saja (Anyone)
 * 5. Klik "Terapkan", izinkan akses, lalu salin URL yang berakhiran "/exec".
 * 6. Tempel URL "/exec" tersebut ke file config.js pada GAS_EXEC_URL.
 * ============================================================================
 */

var TAB_PEMILIH = 'PEMILIH';
var TAB_SUARA   = 'SUARA';
var TAB_AKUN    = 'AKUN';
var WAKTU_BUKA  = '2026-11-24T09:00:00+07:00';
var WAKTU_TUTUP = '2026-11-25T09:00:00+07:00';
var CALON_SAH   = ['cand-1', 'cand-2', 'cand-3', 'cand-abstain'];

function getOrCreateSheets_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var shPemilih = ss.getSheetByName(TAB_PEMILIH);
  if (!shPemilih) {
    shPemilih = ss.insertSheet(TAB_PEMILIH);
    shPemilih.appendRow(['nip', 'kode_bukti', 'waktu_iso', 'waktu_wib']);
    shPemilih.getRange('A:A').setNumberFormat('@');
  }
  var shSuara = ss.getSheetByName(TAB_SUARA);
  if (!shSuara) {
    shSuara = ss.insertSheet(TAB_SUARA);
    shSuara.appendRow(['id_acak', 'kode_calon']);
  }
  var shAkun = ss.getSheetByName(TAB_AKUN);
  if (!shAkun) {
    shAkun = ss.insertSheet(TAB_AKUN);
    shAkun.appendRow(['nip', 'hash_sandi', 'gmail', 'waktu_update']);
    shAkun.getRange('A:A').setNumberFormat('@');
  }
  return { pemilih: shPemilih, suara: shSuara, akun: shAkun };
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function normalizeId_(v) {
  return String(v || '').replace(/[^a-zA-Z0-9]/g, '').trim();
}

function makeReceiptCode_() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var out = 'SIM2-';
  for (var i = 0; i < 8; i++) {
    if (i === 4) out += '-';
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

function doGet() {
  return jsonOut_({
    ok: true,
    layanan: 'E-Voting Simulasi Tahap 2 Komite Keperawatan RSUD dr. Soedarso',
    waktu_server: new Date().toISOString()
  });
}

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var aksi = String(body.aksi || '').trim();

    if (aksi === 'rekap') {
      return handleRekap_();
    }
    if (aksi === 'cek_pemilih') {
      return handleCekPemilih_(body);
    }
    if (aksi === 'pilih') {
      return handlePilih_(body);
    }
    if (aksi === 'cek_akun') {
      return handleCekAkun_(body);
    }
    if (aksi === 'simpan_akun') {
      return handleSimpanAkun_(body);
    }
    if (aksi === 'reset') {
      return handleReset_(body);
    }
    return jsonOut_({ ok: false, pesan: 'Aksi tidak dikenal: ' + aksi });
  } catch (err) {
    return jsonOut_({ ok: false, pesan: 'Galat server: ' + err.message });
  }
}

function handleCekPemilih_(body) {
  var nip = normalizeId_(body.nip);
  if (!nip) return jsonOut_({ ok: true, sudah_memilih: false, receipt: null });

  var sh = getOrCreateSheets_().pemilih;
  var rows = sh.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (normalizeId_(rows[i][0]) === nip) {
      return jsonOut_({
        ok: true,
        sudah_memilih: true,
        receipt: {
          kode_bukti: String(rows[i][1] || ''),
          waktu_iso: String(rows[i][2] || ''),
          waktu_wib: String(rows[i][3] || '')
        }
      });
    }
  }
  return jsonOut_({ ok: true, sudah_memilih: false, receipt: null });
}

function handlePilih_(body) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var now = new Date();
    var start = new Date(WAKTU_BUKA);
    var end = new Date(WAKTU_TUTUP);
    if (now < start) {
      return jsonOut_({ ok: false, kode: 'SCHEDULE_CLOSED', pesan: 'Bilik suara Simulasi Tahap 2 baru dibuka pukul 09.00 WIB.' });
    }
    if (now >= end) {
      return jsonOut_({ ok: false, kode: 'SCHEDULE_CLOSED', pesan: 'Simulasi Tahap 2 telah ditutup pada 25 November 2026 pukul 09.00 WIB.' });
    }

    var nip = normalizeId_(body.nip);
    var calon = String(body.kode_calon || '').trim();
    if (!nip || CALON_SAH.indexOf(calon) === -1) {
      return jsonOut_({ ok: false, kode: 'DATA_TIDAK_VALID', pesan: 'Data pemilih atau calon tidak valid.' });
    }

    var sheets = getOrCreateSheets_();
    var rows = sheets.pemilih.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (normalizeId_(rows[i][0]) === nip) {
        return jsonOut_({
          ok: false,
          kode: 'ALREADY_VOTED',
          pesan: 'Akun ini sudah menggunakan hak suara pada Simulasi Tahap 2.',
          receipt: {
            kode_bukti: String(rows[i][1] || ''),
            waktu_iso: String(rows[i][2] || ''),
            waktu_wib: String(rows[i][3] || '')
          }
        });
      }
    }

    var kodeBukti = makeReceiptCode_();
    var nowIso = now.toISOString();
    var waktuWib = String(body.waktu_wib || Utilities.formatDate(now, 'Asia/Jakarta', 'dd MMMM yyyy, HH:mm:ss') + ' WIB');

    // 1. Catat pemilih (TANPA pilihan calon)
    var nextRow = sheets.pemilih.getLastRow() + 1;
    sheets.pemilih.getRange(nextRow, 1, 1, 4).setNumberFormats([['@', '@', '@', '@']]);
    sheets.pemilih.getRange(nextRow, 1, 1, 4).setValues([[nip, kodeBukti, nowIso, waktuWib]]);

    // 2. Catat suara di posisi baris acak (TANPA NIP, TANPA waktu -> Asas Rahasia LUBER)
    var idAcak = 'B-' + Utilities.getUuid().slice(0, 8).toUpperCase();
    var lastSuaraRow = sheets.suara.getLastRow();
    var insertPos = lastSuaraRow <= 1 ? 2 : (Math.floor(Math.random() * lastSuaraRow) + 2);
    if (insertPos <= lastSuaraRow) {
      sheets.suara.insertRowBefore(insertPos);
      sheets.suara.getRange(insertPos, 1, 1, 2).setValues([[idAcak, calon]]);
    } else {
      sheets.suara.appendRow([idAcak, calon]);
    }

    return jsonOut_({
      ok: true,
      pesan: 'Suara rahasia Anda berhasil direkam di server pusat.',
      receipt: {
        kode_bukti: kodeBukti,
        waktu_iso: nowIso,
        waktu_wib: waktuWib
      }
    });
  } finally {
    lock.releaseLock();
  }
}

function handleRekap_() {
  var sheets = getOrCreateSheets_();
  var pRows = sheets.pemilih.getDataRange().getValues();
  var sRows = sheets.suara.getDataRange().getValues();

  var votersMap = {};
  for (var i = 1; i < pRows.length; i++) {
    var nip = normalizeId_(pRows[i][0]);
    if (nip) {
      votersMap[nip] = {
        kode_bukti: String(pRows[i][1] || ''),
        waktu_iso: String(pRows[i][2] || ''),
        waktu_wib: String(pRows[i][3] || '')
      };
    }
  }

  var counts = {};
  for (var j = 1; j < sRows.length; j++) {
    var cid = String(sRows[j][1] || '').trim();
    if (cid) counts[cid] = (counts[cid] || 0) + 1;
  }

  var totalVoted = Object.keys(votersMap).length;
  var rekap = CALON_SAH.map(function (cid) {
    var v = counts[cid] || 0;
    return {
      candidate_id: cid,
      votes: v,
      percentage: totalVoted > 0 ? ((v / totalVoted) * 100).toFixed(1) : '0.0'
    };
  });

  return jsonOut_({
    ok: true,
    total_voted: totalVoted,
    voters_map: votersMap,
    rekap_kandidat: rekap,
    waktu_server: new Date().toISOString()
  });
}

function handleCekAkun_(body) {
  var nip = normalizeId_(body.nip);
  if (!nip) return jsonOut_({ ok: true, ditemukan: false });
  var sh = getOrCreateSheets_().akun;
  var rows = sh.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    if (normalizeId_(rows[i][0]) === nip) {
      return jsonOut_({
        ok: true,
        ditemukan: true,
        hash_sandi: String(rows[i][1] || ''),
        gmail: String(rows[i][2] || '')
      });
    }
  }
  return jsonOut_({ ok: true, ditemukan: false, hash_sandi: '', gmail: '' });
}

function handleSimpanAkun_(body) {
  var nip = normalizeId_(body.nip);
  if (!nip) return jsonOut_({ ok: false, pesan: 'NIP tidak valid.' });
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var sh = getOrCreateSheets_().akun;
    var rows = sh.getDataRange().getValues();
    var nowIso = new Date().toISOString();
    var newHash = typeof body.hash_sandi === 'string' ? body.hash_sandi.trim() : '';
    var newGmail = typeof body.gmail === 'string' ? body.gmail.trim().toLowerCase() : '';

    for (var i = 1; i < rows.length; i++) {
      if (normalizeId_(rows[i][0]) === nip) {
        var finalHash = newHash || String(rows[i][1] || '');
        var finalGmail = newGmail || String(rows[i][2] || '');
        sh.getRange(i + 1, 1, 1, 4).setNumberFormats([['@', '@', '@', '@']]);
        sh.getRange(i + 1, 1, 1, 4).setValues([[nip, finalHash, finalGmail, nowIso]]);
        return jsonOut_({ ok: true, hash_sandi: finalHash, gmail: finalGmail });
      }
    }
    var nextRow = sh.getLastRow() + 1;
    sh.getRange(nextRow, 1, 1, 4).setNumberFormats([['@', '@', '@', '@']]);
    sh.getRange(nextRow, 1, 1, 4).setValues([[nip, newHash, newGmail, nowIso]]);
    return jsonOut_({ ok: true, hash_sandi: newHash, gmail: newGmail });
  } finally {
    lock.releaseLock();
  }
}

function handleReset_(body) {
  if (String(body.konfirmasi || '') !== 'RESET_SIM2') {
    return jsonOut_({ ok: false, pesan: 'Konfirmasi reset tidak valid.' });
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var sheets = getOrCreateSheets_();
    if (sheets.pemilih.getLastRow() > 1) {
      sheets.pemilih.deleteRows(2, sheets.pemilih.getLastRow() - 1);
    }
    if (sheets.suara.getLastRow() > 1) {
      sheets.suara.deleteRows(2, sheets.suara.getLastRow() - 1);
    }
    return jsonOut_({ ok: true, pesan: 'Seluruh data Simulasi Tahap 2 di server pusat telah direset.' });
  } finally {
    lock.releaseLock();
  }
}

