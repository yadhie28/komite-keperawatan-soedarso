/**
 * ==========================================================
 *  E-Voting Komite Keperawatan RSUD dr. Soedarso Pontianak
 *  Google Apps Script Backend (Sumber Kebenaran Server)
 * ==========================================================
 *
 *  Tab Google Sheet : DPT, SUARA, LOG, AKUN_PANITIA
 *  Deployment       : Aplikasi Web (Jalankan sebagai: Saya, Akses: Siapa saja)
 *  Permintaan Klien : POST dengan Content-Type: text/plain;charset=utf-8
 *
 *  JANGAN simpan rahasia (hash, garam) di kode ini.
 *  Semua disimpan di Script Properties via fungsi setup().
 * ==========================================================
 */

var SHEET_DPT          = 'DPT';
var SHEET_SUARA        = 'SUARA';
var SHEET_LOG          = 'LOG';
var SHEET_AKUN_PANITIA = 'AKUN_PANITIA';

var HEADER_DPT = [
  'nama', 'nip', 'unit', 'jabatan', 'kategori',
  'jenis_id', 'tahun_lahir', 'pin_awal', 'hash_sandi', 'salt',
  'status_ganti_sandi', 'sudah_memilih', 'kode_bukti'
];
var HEADER_SUARA        = ['id_acak', 'kode_calon'];
var HEADER_LOG          = ['waktu', 'aksi', 'hasil'];
var HEADER_AKUN_PANITIA = ['username', 'nama', 'peran', 'sandi_awal', 'hash', 'salt'];

var SESSION_TTL_SECONDS = 6 * 60 * 60; // 6 jam (21600 detik)
var RATE_LIMIT_WINDOW   = 15 * 60;     // 15 menit (900 detik)
var RATE_LIMIT_MAX      = 5;           // maks 5 gagal per 15 menit
var HASH_ROUNDS         = 1000;        // min 1000 putaran SHA-256
var MIN_PASSWORD_LENGTH = 8;

var DEFAULT_WAKTU_BUKA  = '2026-11-23T10:00:00+07:00';
var DEFAULT_WAKTU_TUTUP = '2026-11-24T10:00:00+07:00';
var DEFAULT_KODE_CALON  = 'cand-1,cand-2,cand-3,cand-abstain';

var PESAN_LOGIN_GAGAL      = 'NIP/username atau kata sandi salah.';
var PESAN_HASIL_BELUM_BUKA = 'Hasil rekapitulasi dibuka setelah pemilihan ditutup pada Selasa, 24 November 2026 pukul 10.00 WIB.';

/* ═══════════════════════════════════════════════════════════
   1. LOGIKA MURNI (Dapat Diuji di Node.js Tanpa Layanan Google)
   ═══════════════════════════════════════════════════════════ */

function hitungStatus_(now, buka, tutup, jeda) {
  if (jeda) return 'DIJEDA';
  if (now.getTime() < buka.getTime()) return 'TUTUP';
  if (now.getTime() >= tutup.getTime()) return 'TUTUP';
  return 'BUKA';
}

function hitungFase_(now, buka, tutup) {
  if (now.getTime() < buka.getTime()) return 'BELUM_DIBUKA';
  if (now.getTime() >= tutup.getTime()) return 'SELESAI';
  return 'BERLANGSUNG';
}

function normalisasiId_(raw) {
  return String(raw === null || raw === undefined ? '' : raw)
    .replace(/^'+/, '')
    .replace(/[\s.\-'"]/g, '')
    .trim();
}

function normalisasiNip_(raw) {
  return normalisasiId_(raw);
}

function maskNip_(nip) {
  var n = normalisasiId_(nip);
  if (n.length <= 8) return n;
  var awal   = n.substring(0, 4);
  var akhir  = n.substring(n.length - 4);
  var tengah = '';
  for (var i = 0; i < n.length - 8; i++) tengah += 'x';
  return awal + tengah + akhir;
}

function namaDepan_(nama) {
  var s = String(nama || '').replace(/,/g, ' ');
  var tokens = s.split(/\s+/);
  for (var i = 0; i < tokens.length; i++) {
    var t = tokens[i].trim();
    if (!t) continue;
    if (t.charAt(t.length - 1) === '.') continue;
    var bersih = t.toLowerCase().replace(/[^a-z]/g, '');
    if (bersih.length > 0) return bersih;
  }
  return '';
}

var DEFAULT_INITIAL_PASSWORD = 'soedarso2026';

function sandiAwalDiharapkan_(rowObj, pinAcak) {
  if (pinAcak) {
    return String(rowObj.pin_awal || '').replace(/^'+/, '').trim();
  }
  return DEFAULT_INITIAL_PASSWORD;
}

function cocokSandiAwal_(masukan, diharapkan, pinAcak) {
  if (!diharapkan) return false;
  if (pinAcak) {
    return String(masukan || '').trim() === diharapkan;
  }
  return String(masukan || '').trim() === DEFAULT_INITIAL_PASSWORD;
}

function validasiSandi_(sandiBaru, idAkun, sandiAwal, sandiLama) {
  var s = String(sandiBaru || '');
  if (s.length < MIN_PASSWORD_LENGTH) {
    return { valid: false, pesan: 'Kata sandi baru minimal ' + MIN_PASSWORD_LENGTH + ' karakter.' };
  }
  if (!/[a-zA-Z]/.test(s) || !/[0-9]/.test(s)) {
    return { valid: false, pesan: 'Kata sandi baru harus mengandung kombinasi huruf dan angka.' };
  }
  var idNorm = normalisasiId_(idAkun).toLowerCase();
  var sNorm  = normalisasiId_(s).toLowerCase();
  if (idNorm && sNorm === idNorm) {
    return { valid: false, pesan: 'Kata sandi baru tidak boleh sama dengan NIP atau username.' };
  }
  if (sandiAwal && s.toLowerCase().replace(/\s+/g, '') === String(sandiAwal).toLowerCase().replace(/\s+/g, '')) {
    return { valid: false, pesan: 'Kata sandi baru tidak boleh sama dengan kata sandi awal.' };
  }
  if (sandiLama && s === String(sandiLama)) {
    return { valid: false, pesan: 'Kata sandi baru tidak boleh sama dengan kata sandi lama.' };
  }
  if (s.toLowerCase() === 'REDACTED_PASSWORD' || s.toLowerCase() === 'soedarso@2026' || s.toLowerCase() === 'admin1234') {
    return { valid: false, pesan: 'Kata sandi tersebut sudah tidak diizinkan. Gunakan kata sandi unik lainnya.' };
  }
  return { valid: true, pesan: '' };
}

function sanitize_(value) {
  var s = String(value === null || value === undefined ? '' : value);
  if (/^[=+\-@]/.test(s)) {
    return "'" + s;
  }
  return s;
}

function hitungHasil_(suaraList, kodeCalonValidList) {
  var validSet = {};
  var hitung   = {};
  for (var i = 0; i < kodeCalonValidList.length; i++) {
    var k = String(kodeCalonValidList[i]).trim();
    if (k) {
      validSet[k] = true;
      hitung[k]   = 0;
    }
  }
  var totalSah = 0;
  var tidakSah = 0;
  for (var j = 0; j < suaraList.length; j++) {
    var kode = String(suaraList[j] || '').replace(/^'+/, '').trim();
    if (validSet[kode]) {
      hitung[kode] = (hitung[kode] || 0) + 1;
      totalSah++;
    } else if (kode) {
      tidakSah++;
    }
  }
  var rincian  = [];
  var maxSuara = 0;
  for (var c = 0; c < kodeCalonValidList.length; c++) {
    var kc  = String(kodeCalonValidList[c]).trim();
    if (!kc) continue;
    var jml = hitung[kc] || 0;
    var pct = totalSah > 0 ? Math.round((jml / totalSah) * 10000) / 100 : 0;
    rincian.push({ kode_calon: kc, jumlah: jml, persen: pct });
    if (jml > maxSuara) maxSuara = jml;
  }
  var tertinggi = [];
  if (maxSuara > 0) {
    for (var r = 0; r < rincian.length; r++) {
      if (rincian[r].jumlah === maxSuara) {
        tertinggi.push(rincian[r].kode_calon);
      }
    }
  }
  return {
    total_sah: totalSah,
    tidak_sah: tidakSah,
    rincian: rincian,
    tertinggi: tertinggi
  };
}

function cekRateLimit_(cacheObj, key) {
  var count = parseInt(cacheObj.get(key) || '0', 10);
  if (isNaN(count)) count = 0;
  return {
    terkunci: count >= RATE_LIMIT_MAX,
    count: count
  };
}

function catatPercobaanLogin_(cacheObj, key, sukses) {
  if (sukses) {
    cacheObj.remove(key);
    return 0;
  }
  var count = parseInt(cacheObj.get(key) || '0', 10);
  if (isNaN(count)) count = 0;
  var baru = count + 1;
  cacheObj.put(key, String(baru), RATE_LIMIT_WINDOW);
  return baru;
}

function posisiAcak_(jumlahBarisSaatIni, nilaiAcak01) {
  // Baris 1 adalah header. Jika belum ada suara (lastRow=1), posisi sisip adalah baris 2.
  var jumlahSuara = Math.max(0, jumlahBarisSaatIni - 1);
  var offset = Math.floor(nilaiAcak01 * (jumlahSuara + 1));
  return 2 + offset;
}

/* ═══════════════════════════════════════════════════════════
   2. SETUP (Jalankan Sekali dari Editor Apps Script)
   ═══════════════════════════════════════════════════════════ */

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheetDpt     = ensureSheet_(ss, SHEET_DPT,          HEADER_DPT);
  var sheetSuara   = ensureSheet_(ss, SHEET_SUARA,        HEADER_SUARA);
  var sheetLog     = ensureSheet_(ss, SHEET_LOG,          HEADER_LOG);
  var sheetPanitia = ensureSheet_(ss, SHEET_AKUN_PANITIA, HEADER_AKUN_PANITIA);

  // Format kolom nip & pin_awal sebagai teks biasa ('@') agar 18 digit tidak dirusak
  try {
    var maxRowsDpt = Math.max(1000, sheetDpt.getMaxRows());
    sheetDpt.getRange(1, 2, maxRowsDpt, 1).setNumberFormat('@');
    sheetDpt.getRange(1, 8, maxRowsDpt, 1).setNumberFormat('@');
  } catch (_) {}

  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('WAKTU_BUKA')) {
    props.setProperty('WAKTU_BUKA', DEFAULT_WAKTU_BUKA);
  }
  if (!props.getProperty('WAKTU_TUTUP')) {
    props.setProperty('WAKTU_TUTUP', DEFAULT_WAKTU_TUTUP);
  }
  if (!props.getProperty('STATUS_JEDA')) {
    props.setProperty('STATUS_JEDA', 'false');
  }
  if (!props.getProperty('GARAM_GLOBAL')) {
    props.setProperty('GARAM_GLOBAL', Utilities.getUuid());
  }
  if (!props.getProperty('PIN_ACAK')) {
    props.setProperty('PIN_ACAK', 'false');
  }
  if (!props.getProperty('KODE_CALON')) {
    props.setProperty('KODE_CALON', DEFAULT_KODE_CALON);
  }

  // Hash sandi_awal pada tab AKUN_PANITIA lalu kosongkan kolom sandi_awal
  var dataPanitia = sheetPanitia.getDataRange().getValues();
  var hdrP        = dataPanitia[0] || [];
  var iUserP      = hdrP.indexOf('username');
  var iSandiAwalP = hdrP.indexOf('sandi_awal');
  var iHashP      = hdrP.indexOf('hash');
  var iSaltP      = hdrP.indexOf('salt');
  var dihashCount = 0;

  if (iUserP !== -1 && iSandiAwalP !== -1 && iHashP !== -1 && iSaltP !== -1) {
    for (var r = 1; r < dataPanitia.length; r++) {
      var sa = String(dataPanitia[r][iSandiAwalP] || '').trim();
      var hs = String(dataPanitia[r][iHashP] || '').trim();
      if (sa && !hs) {
        var saltBaru = Utilities.getUuid();
        var hashBaru = hashPassword_(sa, saltBaru);
        sheetPanitia.getRange(r + 1, iHashP + 1).setValue(hashBaru);
        sheetPanitia.getRange(r + 1, iSaltP + 1).setValue(saltBaru);
        sheetPanitia.getRange(r + 1, iSandiAwalP + 1).setValue('');
        dihashCount++;
      }
    }
  }

  // Periksa integritas DPT tanpa mencetak NIP/nama
  var dataDpt        = sheetDpt.getDataRange().getValues();
  var hdrD           = dataDpt[0] || [];
  var iNipD          = hdrD.indexOf('nip');
  var iTahunD        = hdrD.indexOf('tahun_lahir');
  var jumlahDpt      = Math.max(0, dataDpt.length - 1);
  var nipRusakCount  = 0;
  var tahunAnehCount = 0;

  if (iNipD !== -1) {
    for (var d = 1; d < dataDpt.length; d++) {
      var valNip = dataDpt[d][iNipD];
      var strNip = String(valNip === null || valNip === undefined ? '' : valNip).replace(/^'+/, '').trim();
      if (typeof valNip === 'number' || /[eE+]/.test(strNip) || !/^(\d{16}|\d{18})$/.test(normalisasiId_(strNip))) {
        nipRusakCount++;
      }
      if (iTahunD !== -1) {
        var th = parseInt(String(dataDpt[d][iTahunD] || ''), 10);
        if (isNaN(th) || th < 1950 || th > 2008) {
          tahunAnehCount++;
        }
      }
    }
  }

  SpreadsheetApp.flush();

  var ringkasan = 'Inisialisasi selesai. DPT=' + jumlahDpt
    + ' baris, AkunPanitia=' + Math.max(0, dataPanitia.length - 1)
    + ' (dihash baru=' + dihashCount + ')'
    + ', nip_perlu_dicek=' + nipRusakCount
    + ', tahun_luar_1950_2008=' + tahunAnehCount;

  tulis_log_('SETUP', ringkasan);

  try {
    var pesanAlert = 'Setup E-Voting Selesai ✅\n\n'
      + '• Jumlah baris DPT: ' + jumlahDpt + '\n'
      + '• Jumlah akun panitia: ' + Math.max(0, dataPanitia.length - 1) + ' (' + dihashCount + ' sandi awal di-hash)\n';
    if (nipRusakCount > 0) {
      pesanAlert += '\n⚠️ PERINGATAN: Ada ' + nipRusakCount + ' baris NIP yang bukan teks 16/18 digit (kemungkinan terkonversi menjadi angka oleh Google Sheets). '
        + 'Ulangi impor DPT_UNTUK_IMPOR.csv dan pastikan TIDAK mencentang "Konversikan teks menjadi angka, tanggal, dan formula".\n';
    }
    SpreadsheetApp.getUi().alert(pesanAlert);
  } catch (_) {}

  return {
    ok: true,
    dpt: jumlahDpt,
    akun_panitia: Math.max(0, dataPanitia.length - 1),
    dihash: dihashCount,
    nip_rusak: nipRusakCount,
    tahun_aneh: tahunAnehCount
  };
}

function ensureSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0 || String(sheet.getRange(1, 1).getValue() || '') === '') {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

/* ═══════════════════════════════════════════════════════════
   3. ENTRY POINT WEB APP (doPost & doGet)
   ═══════════════════════════════════════════════════════════ */

function doPost(e) {
  try {
    var raw     = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var payload = JSON.parse(raw);
    var aksi    = String(payload.aksi || '').toLowerCase().trim();

    switch (aksi) {
      case 'status':         return ok_(aksi_status_());
      case 'login':          return ok_(aksi_login_(payload));
      case 'sesi':           return ok_(aksi_sesi_(payload));
      case 'logout':         return ok_(aksi_logout_(payload));
      case 'ganti_sandi':    return ok_(aksi_ganti_sandi_(payload));
      case 'pilih':          return ok_(aksi_pilih_(payload));
      case 'bukti':          return ok_(aksi_bukti_(payload));
      case 'daftar_pemilih': return ok_(aksi_daftar_pemilih_(payload));
      case 'kontrol':        return ok_(aksi_kontrol_(payload));
      case 'hasil':          return ok_(aksi_hasil_(payload));
      default:
        return ok_({ ok: false, sukses: false, kode: 'AKSI_TIDAK_DIKENAL', pesan: 'Aksi tidak dikenali.' });
    }
  } catch (_) {
    return ok_({ ok: false, sukses: false, kode: 'GALAT_SERVER', pesan: 'Terjadi kesalahan server. Coba lagi.' });
  }
}

function doGet() {
  return ok_({
    ok: true,
    sukses: true,
    pesan: 'Backend E-Voting Komite Keperawatan RSUD dr. Soedarso aktif. Gunakan metode POST.'
  });
}

function ok_(obj) {
  if (obj && typeof obj === 'object') {
    if (obj.ok !== undefined && obj.sukses === undefined) obj.sukses = obj.ok;
    if (obj.sukses !== undefined && obj.ok === undefined) obj.ok = obj.sukses;
  }
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ═══════════════════════════════════════════════════════════
   4. AKSI: STATUS (Publik — Tanpa Angka Per Calon)
   ═══════════════════════════════════════════════════════════ */

function aksi_status_() {
  var cfg    = bacaKonfigurasiWaktu_();
  var now    = new Date();
  var status = hitungStatus_(now, cfg.buka, cfg.tutup, cfg.jeda);
  var fase   = hitungFase_(now, cfg.buka, cfg.tutup);

  var statDpt = hitungRingkasanDpt_();

  return {
    ok: true,
    dpt: statDpt.dpt,
    sudah_memilih: statDpt.sudah_memilih,
    status: status,
    fase: fase,
    waktuServer: now.toISOString(),
    buka: cfg.buka.toISOString(),
    tutup: cfg.tutup.toISOString(),
    hasil_tersedia: now.getTime() >= cfg.tutup.getTime()
  };
}

function bacaKonfigurasiWaktu_() {
  var props = PropertiesService.getScriptProperties();
  var buka  = new Date(props.getProperty('WAKTU_BUKA')  || DEFAULT_WAKTU_BUKA);
  var tutup = new Date(props.getProperty('WAKTU_TUTUP') || DEFAULT_WAKTU_TUTUP);
  var jeda  = props.getProperty('STATUS_JEDA') === 'true';
  return { buka: buka, tutup: tutup, jeda: jeda };
}

function hitungRingkasanDpt_() {
  var dpt       = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_DPT);
  var lastRow   = dpt ? dpt.getLastRow() : 0;
  var jumlahDpt = lastRow > 1 ? lastRow - 1 : 0;
  var sudah     = 0;

  if (jumlahDpt > 0) {
    var hdr      = dpt.getRange(1, 1, 1, dpt.getLastColumn()).getValues()[0];
    var colSudah = hdr.indexOf('sudah_memilih') + 1;
    if (colSudah > 0) {
      var values = dpt.getRange(2, colSudah, jumlahDpt, 1).getValues();
      for (var i = 0; i < values.length; i++) {
        if (String(values[i][0]).toUpperCase() === 'TRUE') sudah++;
      }
    }
  }
  return { dpt: jumlahDpt, sudah_memilih: sudah };
}

/* ═══════════════════════════════════════════════════════════
   5. AKSI: LOGIN (Gabungan Panitia/Pengurus & Pemilih DPT)
   ═══════════════════════════════════════════════════════════ */

function aksi_login_(p) {
  var rawId = String(p.id !== undefined ? p.id : (p.nip !== undefined ? p.nip : (p.username || ''))).trim();
  var sandi = String(p.sandi !== undefined ? p.sandi : (p.password || ''));
  var idNorm = normalisasiId_(rawId).toLowerCase();

  if (!idNorm || !sandi) {
    return { ok: false, kode: 'DATA_KURANG', pesan: 'NIP/username dan kata sandi wajib diisi.' };
  }

  var cache = CacheService.getScriptCache();
  var rlKey = 'rl_' + idNorm;
  var rl    = cekRateLimit_(cache, rlKey);
  if (rl.terkunci) {
    tulis_log_('LOGIN_TERKUNCI', 'Akun terkunci sementara: ' + maskNip_(idNorm));
    return {
      ok: false,
      kode: 'TERKUNCI',
      pesan: 'Akun dikunci sementara karena 5 kali percobaan gagal. Silakan coba lagi dalam 15 menit.'
    };
  }

  var tipePaksa = String(p.tipe || '').toLowerCase().trim();

  // 1. Cek di AKUN_PANITIA bila input cocok dengan username panitia
  if (tipePaksa !== 'pemilih') {
    var panitiaMatch = cariAkunPanitia_(rawId);
    if (panitiaMatch) {
      return prosesLoginPanitia_(panitiaMatch, sandi, cache, rlKey);
    }
    if (tipePaksa === 'panitia') {
      hashPassword_(sandi, 'dummy-salt-timing');
      catatPercobaanLogin_(cache, rlKey, false);
      tulis_log_('LOGIN_GAGAL', 'Akun panitia tidak ditemukan');
      return { ok: false, kode: 'LOGIN_GAGAL', pesan: PESAN_LOGIN_GAGAL };
    }
  }

  // 2. Cari di DPT berdasarkan NIP/NIPPPK/NIK ternormalisasi
  var nipCari  = normalisasiId_(rawId);
  var pemilih  = cariPemilihByNip_(nipCari);
  if (!pemilih) {
    hashPassword_(sandi, 'dummy-salt-timing');
    catatPercobaanLogin_(cache, rlKey, false);
    tulis_log_('LOGIN_GAGAL', 'ID tidak ditemukan');
    return { ok: false, kode: 'LOGIN_GAGAL', pesan: PESAN_LOGIN_GAGAL };
  }

  var props   = PropertiesService.getScriptProperties();
  var pinAcak = props.getProperty('PIN_ACAK') === 'true';

  var cocok = verifikasiSandiPemilih_(pemilih, sandi, pinAcak);
  if (!cocok) {
    catatPercobaanLogin_(cache, rlKey, false);
    tulis_log_('LOGIN_GAGAL', 'Sandi salah: ' + maskNip_(pemilih.nip));
    return { ok: false, kode: 'LOGIN_GAGAL', pesan: PESAN_LOGIN_GAGAL };
  }

  catatPercobaanLogin_(cache, rlKey, true);

  var wajibGanti  = (String(pemilih.status_ganti_sandi).toUpperCase() !== 'TRUE');
  var token       = Utilities.getUuid();
  var kedaluwarsa = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();

  cache.put('sess_' + token, JSON.stringify({
    tipe: 'pemilih',
    nip: pemilih.nip,
    peran: 'pemilih',
    kedaluwarsa: kedaluwarsa
  }), SESSION_TTL_SECONDS);

  tulis_log_('LOGIN', 'Pemilih berhasil masuk: ' + maskNip_(pemilih.nip));

  return {
    ok: true,
    token: token,
    kedaluwarsa: kedaluwarsa,
    wajib_ganti_sandi: wajibGanti,
    perlu_ganti_sandi: wajibGanti,
    pesan: wajibGanti ? 'Demi keamanan, silakan ganti kata sandi awal Anda terlebih dahulu.' : 'Login berhasil.',
    pengguna: bentukObjekPemilih_(pemilih)
  };
}

function prosesLoginPanitia_(akun, sandi, cache, rlKey) {
  var cocok = false;
  if (akun.hash && akun.salt) {
    cocok = (hashPassword_(sandi, akun.salt) === akun.hash);
  } else if (akun.sandi_awal) {
    hashPassword_(sandi, 'dummy-salt-panitia');
    cocok = (sandi === akun.sandi_awal);
    if (cocok) {
      // Otomatis hash sandi_awal dan hapus teks terangnya di Sheet
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_AKUN_PANITIA);
      var saltBaru = Utilities.getUuid();
      var hashBaru = hashPassword_(sandi, saltBaru);
      sheet.getRange(akun.baris, akun.colMap.hash + 1).setValue(hashBaru);
      sheet.getRange(akun.baris, akun.colMap.salt + 1).setValue(saltBaru);
      if (akun.colMap.sandi_awal !== -1) {
        sheet.getRange(akun.baris, akun.colMap.sandi_awal + 1).setValue('');
      }
    }
  } else {
    hashPassword_(sandi, 'dummy-salt-panitia');
  }

  if (!cocok) {
    catatPercobaanLogin_(cache, rlKey, false);
    tulis_log_('LOGIN_PANITIA_GAGAL', 'Sandi salah: ' + akun.username);
    return { ok: false, kode: 'LOGIN_GAGAL', pesan: PESAN_LOGIN_GAGAL };
  }

  catatPercobaanLogin_(cache, rlKey, true);

  var token       = Utilities.getUuid();
  var kedaluwarsa = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();

  cache.put('sess_' + token, JSON.stringify({
    tipe: 'panitia',
    username: akun.username,
    nama: akun.nama,
    peran: akun.peran,
    kedaluwarsa: kedaluwarsa
  }), SESSION_TTL_SECONDS);

  tulis_log_('LOGIN_PANITIA', 'Berhasil: ' + akun.username + ' (' + akun.peran + ')');

  return {
    ok: true,
    token: token,
    kedaluwarsa: kedaluwarsa,
    wajib_ganti_sandi: false,
    perlu_ganti_sandi: false,
    pesan: 'Login pengurus/panitia berhasil.',
    pengguna: {
      tipe: 'panitia',
      username: akun.username,
      nama: akun.nama,
      peran: akun.peran
    }
  };
}

function verifikasiSandiPemilih_(pemilih, sandiInput, pinAcak) {
  if (pemilih.hash_sandi && pemilih.salt) {
    var h = hashPassword_(sandiInput, pemilih.salt);
    return h === pemilih.hash_sandi;
  }
  // Belum punya hash: bandingkan dengan kata sandi awal di server
  hashPassword_(sandiInput, 'dummy-salt-initial');
  var diharapkan = sandiAwalDiharapkan_(pemilih, pinAcak);
  return cocokSandiAwal_(sandiInput, diharapkan, pinAcak);
}

function bentukObjekPemilih_(pemilih) {
  return {
    tipe: 'pemilih',
    nama: pemilih.nama,
    unit: pemilih.unit,
    jabatan: pemilih.jabatan,
    kategori: pemilih.kategori,
    jenis_id: pemilih.jenis_id,
    nip: pemilih.nip,
    nip_tersamar: maskNip_(pemilih.nip),
    sudah_memilih: String(pemilih.sudah_memilih).toUpperCase() === 'TRUE'
  };
}

/* ═══════════════════════════════════════════════════════════
   6. AKSI: SESI & LOGOUT
   ═══════════════════════════════════════════════════════════ */

function aksi_sesi_(p) {
  var sesi = ambilSesi_(p.token);
  if (!sesi) {
    return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Sesi tidak valid atau telah berakhir.' };
  }
  if (sesi.tipe === 'panitia') {
    var akun = cariAkunPanitia_(sesi.username);
    if (!akun) {
      return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Akun tidak ditemukan.' };
    }
    return {
      ok: true,
      kedaluwarsa: sesi.kedaluwarsa,
      wajib_ganti_sandi: false,
      pengguna: {
        tipe: 'panitia',
        username: akun.username,
        nama: akun.nama,
        peran: akun.peran
      }
    };
  }

  var pemilih = cariPemilihByNip_(sesi.nip);
  if (!pemilih) {
    return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Data pemilih tidak ditemukan.' };
  }
  var wajibGanti = (String(pemilih.status_ganti_sandi).toUpperCase() !== 'TRUE');
  return {
    ok: true,
    kedaluwarsa: sesi.kedaluwarsa,
    wajib_ganti_sandi: wajibGanti,
    pengguna: bentukObjekPemilih_(pemilih)
  };
}

function aksi_logout_(p) {
  var token = String(p.token || '').trim();
  if (token) {
    CacheService.getScriptCache().remove('sess_' + token);
  }
  return { ok: true, pesan: 'Berhasil keluar.' };
}

/* ═══════════════════════════════════════════════════════════
   7. AKSI: GANTI SANDI (Pemilih maupun Panitia)
   ═══════════════════════════════════════════════════════════ */

function aksi_ganti_sandi_(p) {
  var sesi = ambilSesi_(p.token);
  if (!sesi) {
    return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Sesi tidak valid atau telah kedaluwarsa. Silakan login kembali.' };
  }

  var sandiLama = String(p.sandi_lama !== undefined ? p.sandi_lama : '');
  var sandiBaru = String(p.sandi_baru !== undefined ? p.sandi_baru : '');

  if (sesi.tipe === 'panitia') {
    var akun = cariAkunPanitia_(sesi.username);
    if (!akun) return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Akun panitia tidak ditemukan.' };

    if (sandiLama) {
      var cocokP = akun.hash
        ? (hashPassword_(sandiLama, akun.salt) === akun.hash)
        : (sandiLama === akun.sandi_awal);
      if (!cocokP) {
        return { ok: false, kode: 'SANDI_LAMA_SALAH', pesan: 'Kata sandi lama yang Anda masukkan salah.' };
      }
    }

    var valP = validasiSandi_(sandiBaru, akun.username, akun.sandi_awal, sandiLama);
    if (!valP.valid) {
      return { ok: false, kode: 'SANDI_LEMAH', pesan: valP.pesan };
    }

    var sheetP   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_AKUN_PANITIA);
    var saltBaruP = Utilities.getUuid();
    var hashBaruP = hashPassword_(sandiBaru, saltBaruP);
    sheetP.getRange(akun.baris, akun.colMap.hash + 1).setValue(hashBaruP);
    sheetP.getRange(akun.baris, akun.colMap.salt + 1).setValue(saltBaruP);
    if (akun.colMap.sandi_awal !== -1) {
      sheetP.getRange(akun.baris, akun.colMap.sandi_awal + 1).setValue('');
    }
    SpreadsheetApp.flush();
    tulis_log_('GANTI_SANDI_PANITIA', 'Username: ' + akun.username);
    return { ok: true, pesan: 'Kata sandi berhasil diperbarui.' };
  }

  // Pemilih DPT
  var pemilih = cariPemilihByNip_(sesi.nip);
  if (!pemilih) {
    return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Data pemilih tidak ditemukan.' };
  }

  var props   = PropertiesService.getScriptProperties();
  var pinAcak = props.getProperty('PIN_ACAK') === 'true';
  var sandiAwal = sandiAwalDiharapkan_(pemilih, pinAcak);

  if (sandiLama) {
    var cocokLama = verifikasiSandiPemilih_(pemilih, sandiLama, pinAcak);
    if (!cocokLama) {
      return { ok: false, kode: 'SANDI_LAMA_SALAH', pesan: 'Kata sandi lama yang Anda masukkan tidak sesuai.' };
    }
  }

  var validasi = validasiSandi_(sandiBaru, pemilih.nip, sandiAwal, sandiLama);
  if (!validasi.valid) {
    return { ok: false, kode: 'SANDI_LEMAH', pesan: validasi.pesan };
  }

  var dpt      = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_DPT);
  var saltBaru = Utilities.getUuid();
  var hashBaru = hashPassword_(sandiBaru, saltBaru);

  dpt.getRange(pemilih.baris, pemilih.colMap.hash_sandi + 1).setValue(hashBaru);
  dpt.getRange(pemilih.baris, pemilih.colMap.salt + 1).setValue(saltBaru);
  dpt.getRange(pemilih.baris, pemilih.colMap.status_ganti_sandi + 1).setValue('TRUE');
  if (pemilih.colMap.pin_awal !== -1) {
    dpt.getRange(pemilih.baris, pemilih.colMap.pin_awal + 1).setValue('');
  }
  SpreadsheetApp.flush();

  tulis_log_('GANTI_SANDI', 'NIP: ' + maskNip_(pemilih.nip));
  return { ok: true, pesan: 'Kata sandi berhasil diubah.' };
}

/* ═══════════════════════════════════════════════════════════
   8. AKSI: PILIH (Satu Pemilih Satu Suara di Dalam LockService)
   ═══════════════════════════════════════════════════════════ */

function aksi_pilih_(p) {
  var sesi = validasiSesi_(p.token, 'pemilih');
  if (!sesi) {
    return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Sesi pemilih tidak valid atau telah kedaluwarsa. Silakan login sebagai pemilih.' };
  }

  var kodeCalon = String(p.kode_calon || '').trim();
  var daftarCalonValid = daftarKodeCalonValid_();
  if (!kodeCalon || daftarCalonValid.indexOf(kodeCalon) === -1) {
    return { ok: false, kode: 'CALON_TIDAK_VALID', pesan: 'Pilihan calon tidak valid.' };
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (_) {
    return { ok: false, kode: 'SERVER_SIBUK', pesan: 'Server sedang memproses suara lain. Silakan coba beberapa detik lagi.' };
  }

  try {
    var cfg    = bacaKonfigurasiWaktu_();
    var now    = new Date();
    var status = hitungStatus_(now, cfg.buka, cfg.tutup, cfg.jeda);

    if (status !== 'BUKA') {
      var alasan = status === 'DIJEDA'
        ? 'Pemungutan suara sedang dijeda sementara oleh panitia.'
        : (now.getTime() < cfg.buka.getTime()
            ? 'Pemungutan suara belum dibuka (jadwal buka: Senin, 23 Nov 2026 pukul 10.00 WIB).'
            : 'Pemungutan suara telah ditutup (jadwal tutup: Selasa, 24 Nov 2026 pukul 10.00 WIB).');
      return { ok: false, kode: 'TIDAK_BUKA', status: status, pesan: alasan };
    }

    var pemilih = cariPemilihByNip_(sesi.nip);
    if (!pemilih) {
      return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Data pemilih tidak ditemukan di DPT.' };
    }

    if (String(pemilih.status_ganti_sandi).toUpperCase() !== 'TRUE') {
      return { ok: false, kode: 'WAJIB_GANTI_SANDI', pesan: 'Anda wajib mengganti kata sandi awal sebelum memberikan suara.' };
    }

    if (String(pemilih.sudah_memilih).toUpperCase() === 'TRUE') {
      return { ok: false, kode: 'SUDAH_MEMILIH', pesan: 'Hak suara Anda sudah digunakan sebelumnya. Setiap pemilih hanya berhak memilih satu kali.' };
    }

    // 1. Catat suara di tab SUARA pada posisi baris ACAK tanpa identitas & tanpa waktu
    var suara   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SUARA);
    var idAcak  = Utilities.getUuid().replace(/-/g, '').substring(0, 12);
    var rowData = [sanitize_(idAcak), sanitize_(kodeCalon)];
    sisipkanSuaraAcak_(suara, rowData);

    // 2. Tandai pemilih sudah memilih & simpan kode bukti di DPT
    var dpt       = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_DPT);
    var kodeBukti = buatKodeBukti_();
    dpt.getRange(pemilih.baris, pemilih.colMap.sudah_memilih + 1).setValue('TRUE');
    dpt.getRange(pemilih.baris, pemilih.colMap.kode_bukti + 1).setValue(sanitize_(kodeBukti));

    SpreadsheetApp.flush();
    tulis_log_('PILIH', 'Suara sah tercatat');

    return {
      ok: true,
      kode_bukti: kodeBukti,
      waktu: now.toISOString(),
      pesan: 'Suara Anda berhasil dicatat secara sah. Simpan kode bukti Anda.'
    };
  } finally {
    lock.releaseLock();
  }
}

function sisipkanSuaraAcak_(sheetSuara, rowValues) {
  var lastRow = sheetSuara.getLastRow();
  if (lastRow <= 1) {
    sheetSuara.appendRow(rowValues);
    return;
  }
  var rand01 = nilaiAcakKriptografis01_();
  var targetRow = posisiAcak_(lastRow, rand01);
  if (targetRow > lastRow || typeof sheetSuara.insertRowBefore !== 'function') {
    sheetSuara.appendRow(rowValues);
  } else {
    sheetSuara.insertRowBefore(targetRow);
    sheetSuara.getRange(targetRow, 1, 1, rowValues.length).setValues([rowValues]);
  }
}

function daftarKodeCalonValid_() {
  var props = PropertiesService.getScriptProperties();
  var raw   = props.getProperty('KODE_CALON') || DEFAULT_KODE_CALON;
  var parts = raw.split(',');
  var out   = [];
  for (var i = 0; i < parts.length; i++) {
    var k = String(parts[i]).trim();
    if (k) out.push(k);
  }
  return out;
}

/* ═══════════════════════════════════════════════════════════
   9. AKSI: BUKTI (Hanya Milik Pemilih Sendiri)
   ═══════════════════════════════════════════════════════════ */

function aksi_bukti_(p) {
  var sesi = validasiSesi_(p.token, 'pemilih');
  if (!sesi) {
    return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Sesi tidak valid atau telah kedaluwarsa.' };
  }

  var pemilih = cariPemilihByNip_(sesi.nip);
  if (!pemilih) {
    return { ok: false, kode: 'SESI_TIDAK_VALID', pesan: 'Data pemilih tidak ditemukan.' };
  }

  if (String(pemilih.sudah_memilih).toUpperCase() !== 'TRUE') {
    return { ok: false, kode: 'BELUM_MEMILIH', pesan: 'Anda belum memberikan suara.' };
  }

  return {
    ok: true,
    nama: pemilih.nama,
    unit: pemilih.unit,
    nip_tersamar: maskNip_(pemilih.nip),
    kode_bukti: pemilih.kode_bukti,
    pesan: 'Kartu bukti pemilihan Anda.'
  };
}

/* ═══════════════════════════════════════════════════════════
   10. AKSI: DAFTAR PEMILIH (Khusus Panitia / Superadmin)
       TANPA Kode Bukti, TANPA Pilihan, NIP Disamarkan
   ═══════════════════════════════════════════════════════════ */

function aksi_daftar_pemilih_(p) {
  var sesi = validasiSesiPanitiaEvoting_(p.token);
  if (!sesi) {
    return { ok: false, kode: 'AKSES_DITOLAK', pesan: 'Hanya panitia pemilihan yang dapat mengakses daftar pemilih.' };
  }

  var dpt  = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_DPT);
  var data = dpt.getDataRange().getValues();
  if (data.length <= 1) {
    return { ok: true, daftar: [] };
  }

  var hdr    = data[0];
  var iNama  = hdr.indexOf('nama');
  var iNip   = hdr.indexOf('nip');
  var iUnit  = hdr.indexOf('unit');
  var iSudah = hdr.indexOf('sudah_memilih');

  var daftar = [];
  for (var r = 1; r < data.length; r++) {
    var nama = String(data[r][iNama] || '').trim();
    var nip  = String(data[r][iNip] || '').trim();
    if (!nama && !nip) continue;
    daftar.push({
      nama: nama,
      unit: String(data[r][iUnit] || '').trim(),
      nip_tersamar: maskNip_(nip),
      status: (String(data[r][iSudah]).toUpperCase() === 'TRUE') ? 'Sudah' : 'Belum'
    });
  }

  return { ok: true, daftar: daftar };
}

/* ═══════════════════════════════════════════════════════════
   11. AKSI: KONTROL (Jeda, Lanjut, Reset Sebelum Tutup)
   ═══════════════════════════════════════════════════════════ */

function aksi_kontrol_(p) {
  var sesi = validasiSesiPanitiaEvoting_(p.token);
  if (!sesi) {
    return { ok: false, kode: 'AKSES_DITOLAK', pesan: 'Hanya panitia pemilihan yang berwenang menjalankan kontrol ini.' };
  }

  var perintah = String(p.perintah || '').toLowerCase().trim();
  var props    = PropertiesService.getScriptProperties();

  if (perintah === 'jeda') {
    props.setProperty('STATUS_JEDA', 'true');
    tulis_log_('KONTROL_JEDA', 'Dijeda oleh ' + sesi.username);
    return { ok: true, status: 'DIJEDA', pesan: 'Pemungutan suara berhasil dijeda.' };
  }

  if (perintah === 'lanjut') {
    props.setProperty('STATUS_JEDA', 'false');
    var cfg = bacaKonfigurasiWaktu_();
    var st  = hitungStatus_(new Date(), cfg.buka, cfg.tutup, false);
    tulis_log_('KONTROL_LANJUT', 'Dilanjutkan oleh ' + sesi.username);
    return { ok: true, status: st, pesan: 'Pemungutan suara dilanjutkan.' };
  }

  if (perintah === 'reset') {
    var cfgReset = bacaKonfigurasiWaktu_();
    var now      = new Date();
    if (now.getTime() >= cfgReset.tutup.getTime()) {
      return { ok: false, kode: 'SUDAH_TUTUP', pesan: 'Reset suara tidak diizinkan setelah waktu penutupan pemilihan.' };
    }

    var konfirmasi = String(p.konfirmasi || '').trim();
    if (konfirmasi !== 'RESET') {
      return { ok: false, kode: 'KONFIRMASI_SALAH', pesan: 'Ketik kata "RESET" (huruf besar semua) untuk mengonfirmasi pengosongan suara.' };
    }

    var lock = LockService.getScriptLock();
    try {
      lock.waitLock(20000);
    } catch (_) {
      return { ok: false, kode: 'SERVER_SIBUK', pesan: 'Server sedang sibuk. Coba lagi.' };
    }

    try {
      var suara = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SUARA);
      if (suara && suara.getLastRow() > 1) {
        suara.deleteRows(2, suara.getLastRow() - 1);
      }

      var dpt  = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_DPT);
      var rows = dpt ? dpt.getLastRow() - 1 : 0;
      if (rows > 0) {
        var hdr    = dpt.getRange(1, 1, 1, dpt.getLastColumn()).getValues()[0];
        var iSudah = hdr.indexOf('sudah_memilih') + 1;
        var iKode  = hdr.indexOf('kode_bukti') + 1;
        var kosong = [];
        for (var i = 0; i < rows; i++) kosong.push(['']);
        if (iSudah > 0) dpt.getRange(2, iSudah, rows, 1).setValues(kosong);
        if (iKode > 0)  dpt.getRange(2, iKode,  rows, 1).setValues(kosong);
      }

      SpreadsheetApp.flush();
      tulis_log_('KONTROL_RESET', 'Semua suara direset oleh ' + sesi.username);
      return { ok: true, pesan: 'Semua suara dan status memilih berhasil direset menjadi 0.' };
    } finally {
      lock.releaseLock();
    }
  }

  return { ok: false, kode: 'PERINTAH_TIDAK_DIKENAL', pesan: 'Perintah tidak dikenali. Gunakan: jeda, lanjut, atau reset.' };
}

/* ═══════════════════════════════════════════════════════════
   12. AKSI: HASIL (DITOLAK Sebelum Waktu TUTUP untuk Siapa Pun)
   ═══════════════════════════════════════════════════════════ */

function aksi_hasil_() {
  var cfg = bacaKonfigurasiWaktu_();
  var now = new Date();

  if (now.getTime() < cfg.tutup.getTime()) {
    return {
      ok: false,
      kode: 'HASIL_BELUM_DIBUKA',
      tutup: cfg.tutup.toISOString(),
      waktuServer: now.toISOString(),
      pesan: PESAN_HASIL_BELUM_BUKA
    };
  }

  var statDpt     = hitungRingkasanDpt_();
  var suaraSheet  = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SUARA);
  var lastRow     = suaraSheet ? suaraSheet.getLastRow() : 0;
  var daftarSuara = [];

  if (lastRow > 1) {
    var colValues = suaraSheet.getRange(2, 2, lastRow - 1, 1).getValues();
    for (var i = 0; i < colValues.length; i++) {
      daftarSuara.push(colValues[i][0]);
    }
  }

  var rekap = hitungHasil_(daftarSuara, daftarKodeCalonValid_());

  return {
    ok: true,
    total_sah: rekap.total_sah,
    total: rekap.total_sah,
    tidak_sah: rekap.tidak_sah,
    dpt: statDpt.dpt,
    sudah_memilih: statDpt.sudah_memilih,
    rincian: rekap.rincian,
    tertinggi: rekap.tertinggi,
    waktuServer: now.toISOString(),
    tutup: cfg.tutup.toISOString(),
    pesan: 'Hasil rekapitulasi pemilihan.'
  };
}

/* ═══════════════════════════════════════════════════════════
   13. HELPER PENCARIAN SHEET, SESI, KRIPTOGRAFI & LOG
   ═══════════════════════════════════════════════════════════ */

function buatPetaKolom_(hdr) {
  var map = {};
  for (var i = 0; i < hdr.length; i++) {
    map[String(hdr[i]).trim().toLowerCase()] = i;
  }
  return map;
}

function cariPemilihByNip_(nipInput) {
  var target = normalisasiId_(nipInput);
  if (!target) return null;

  var dpt = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_DPT);
  if (!dpt || dpt.getLastRow() <= 1) return null;

  var data   = dpt.getDataRange().getValues();
  var colMap = buatPetaKolom_(data[0]);
  var iNip   = colMap.nip !== undefined ? colMap.nip : 1;

  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    if (normalisasiId_(row[iNip]) === target) {
      return {
        baris: r + 1,
        colMap: {
          nama: colMap.nama !== undefined ? colMap.nama : 0,
          nip: iNip,
          unit: colMap.unit !== undefined ? colMap.unit : 2,
          jabatan: colMap.jabatan !== undefined ? colMap.jabatan : -1,
          kategori: colMap.kategori !== undefined ? colMap.kategori : -1,
          jenis_id: colMap.jenis_id !== undefined ? colMap.jenis_id : -1,
          tahun_lahir: colMap.tahun_lahir !== undefined ? colMap.tahun_lahir : -1,
          pin_awal: colMap.pin_awal !== undefined ? colMap.pin_awal : -1,
          hash_sandi: colMap.hash_sandi !== undefined ? colMap.hash_sandi : -1,
          salt: colMap.salt !== undefined ? colMap.salt : -1,
          status_ganti_sandi: colMap.status_ganti_sandi !== undefined ? colMap.status_ganti_sandi : -1,
          sudah_memilih: colMap.sudah_memilih !== undefined ? colMap.sudah_memilih : -1,
          kode_bukti: colMap.kode_bukti !== undefined ? colMap.kode_bukti : -1
        },
        nama: String(row[colMap.nama] || '').trim(),
        nip: normalisasiId_(row[iNip]),
        unit: String(colMap.unit !== undefined ? row[colMap.unit] || '' : '').trim(),
        jabatan: String(colMap.jabatan !== undefined ? row[colMap.jabatan] || '' : '').trim(),
        kategori: String(colMap.kategori !== undefined ? row[colMap.kategori] || '' : '').trim(),
        jenis_id: String(colMap.jenis_id !== undefined ? row[colMap.jenis_id] || '' : '').trim(),
        tahun_lahir: colMap.tahun_lahir !== undefined ? row[colMap.tahun_lahir] : '',
        pin_awal: colMap.pin_awal !== undefined ? row[colMap.pin_awal] : '',
        hash_sandi: String(colMap.hash_sandi !== undefined ? row[colMap.hash_sandi] || '' : '').trim(),
        salt: String(colMap.salt !== undefined ? row[colMap.salt] || '' : '').trim(),
        status_ganti_sandi: colMap.status_ganti_sandi !== undefined ? row[colMap.status_ganti_sandi] : 'FALSE',
        sudah_memilih: colMap.sudah_memilih !== undefined ? row[colMap.sudah_memilih] : '',
        kode_bukti: String(colMap.kode_bukti !== undefined ? row[colMap.kode_bukti] || '' : '').replace(/^'+/, '').trim()
      };
    }
  }
  return null;
}

function cariAkunPanitia_(usernameInput) {
  var target = String(usernameInput || '').replace(/^'+/, '').trim().toLowerCase();
  if (!target) return null;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_AKUN_PANITIA);
  if (!sheet || sheet.getLastRow() <= 1) return null;

  var data   = sheet.getDataRange().getValues();
  var colMap = buatPetaKolom_(data[0]);
  var iUser  = colMap.username !== undefined ? colMap.username : 0;

  for (var r = 1; r < data.length; r++) {
    var row  = data[r];
    var user = String(row[iUser] || '').replace(/^'+/, '').trim().toLowerCase();
    if (user && user === target) {
      return {
        baris: r + 1,
        colMap: {
          username: iUser,
          nama: colMap.nama !== undefined ? colMap.nama : -1,
          peran: colMap.peran !== undefined ? colMap.peran : -1,
          sandi_awal: colMap.sandi_awal !== undefined ? colMap.sandi_awal : -1,
          hash: colMap.hash !== undefined ? colMap.hash : -1,
          salt: colMap.salt !== undefined ? colMap.salt : -1
        },
        username: user,
        nama: String(colMap.nama !== undefined ? row[colMap.nama] || user : user).replace(/^'+/, '').trim(),
        peran: String(colMap.peran !== undefined ? row[colMap.peran] || 'pengurus' : 'pengurus').replace(/^'+/, '').trim().toLowerCase(),
        sandi_awal: String(colMap.sandi_awal !== undefined ? row[colMap.sandi_awal] || '' : '').replace(/^'+/, '').trim(),
        hash: String(colMap.hash !== undefined ? row[colMap.hash] || '' : '').trim(),
        salt: String(colMap.salt !== undefined ? row[colMap.salt] || '' : '').trim()
      };
    }
  }
  return null;
}

function ambilSesi_(token) {
  var t = String(token || '').trim();
  if (!t) return null;
  var raw = CacheService.getScriptCache().get('sess_' + t);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function validasiSesi_(token, tipeYangDiharapkan) {
  var sesi = ambilSesi_(token);
  if (!sesi) return null;
  if (tipeYangDiharapkan && sesi.tipe !== tipeYangDiharapkan) return null;
  return sesi;
}

function validasiSesiPanitiaEvoting_(token) {
  var sesi = ambilSesi_(token);
  if (!sesi || sesi.tipe !== 'panitia') return null;
  var peran = String(sesi.peran || '').toLowerCase();
  if (peran === 'superadmin' || peran === 'panitia' || peran === 'admin') {
    return sesi;
  }
  return null;
}

function hashPassword_(password, salt) {
  var props       = PropertiesService.getScriptProperties();
  var garamGlobal = props.getProperty('GARAM_GLOBAL') || '';
  var s           = String(salt || 'default-salt');
  var combined    = s + ':' + String(password || '') + ':' + garamGlobal;

  var bytes = Utilities.computeHmacSha256Signature(combined, s);
  for (var i = 1; i < HASH_ROUNDS; i++) {
    bytes = Utilities.computeHmacSha256Signature(
      Utilities.base64Encode(bytes), s
    );
  }
  return Utilities.base64Encode(bytes);
}

function nilaiAcakKriptografis01_() {
  var uuid = Utilities.getUuid().replace(/-/g, '');
  var hex8 = uuid.substring(0, 8);
  var intVal = parseInt(hex8, 16);
  if (isNaN(intVal)) return 0.5;
  return intVal / 0x100000000;
}

function buatKodeBukti_() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var uuid1 = Utilities.getUuid().replace(/-/g, '');
  var uuid2 = Utilities.getUuid().replace(/-/g, '');
  var hex   = uuid1 + uuid2;
  var kode  = '';
  for (var i = 0; i < 10; i++) {
    var byteVal = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
    kode += chars.charAt(byteVal % chars.length);
  }
  return kode;
}

function tulis_log_(aksi, hasil) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_LOG);
    if (!sheet) return;
    var waktu = Utilities.formatDate(new Date(), 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ssXXX");
    sheet.appendRow([sanitize_(waktu), sanitize_(aksi), sanitize_(hasil)]);
  } catch (_) {}
}
