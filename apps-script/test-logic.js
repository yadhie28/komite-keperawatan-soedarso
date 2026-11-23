/**
 * ============================================================================
 * PENGUJIAN OTOMATIS BACKEND GOOGLE APPS SCRIPT (test-logic.js)
 * Menguji seluruh logika murni & alur end-to-end dengan Sheet tiruan di memori.
 * Hanya menggunakan NIP palsu berawalan 00000000 dan NIP Direktur resmi.
 * ============================================================================
 */
'use strict';

const assert = require('assert');
const crypto = require('crypto');
const fs     = require('fs');
const path   = require('path');
const vm     = require('vm');

/* ═══════════════════════════════════════════════════════════
   STUB LAYANAN GOOGLE APPS SCRIPT DI MEMORI
   ═══════════════════════════════════════════════════════════ */

function createMockEnvironment(initialProps = {}) {
  const propsStore = { ...initialProps };
  const cacheStore = new Map();
  const sheets     = new Map();

  class MockRange {
    constructor(sheet, row, col, numRows = 1, numCols = 1) {
      this.sheet   = sheet;
      this.row     = row;     // 1-based
      this.col     = col;     // 1-based
      this.numRows = numRows;
      this.numCols = numCols;
    }
    _ensureSize() {
      const targetRow = this.row + this.numRows - 1;
      const targetCol = this.col + this.numCols - 1;
      while (this.sheet.rows.length < targetRow) {
        this.sheet.rows.push([]);
      }
      for (let r = 0; r < targetRow; r++) {
        while (this.sheet.rows[r].length < targetCol) {
          this.sheet.rows[r].push('');
        }
      }
    }
    getValue() {
      const r = this.sheet.rows[this.row - 1];
      if (!r) return '';
      return r[this.col - 1] !== undefined ? r[this.col - 1] : '';
    }
    setValue(val) {
      this._ensureSize();
      this.sheet.rows[this.row - 1][this.col - 1] = val;
      return this;
    }
    getValues() {
      const out = [];
      for (let r = 0; r < this.numRows; r++) {
        const srcRow = this.sheet.rows[this.row - 1 + r] || [];
        const rowArr = [];
        for (let c = 0; c < this.numCols; c++) {
          const v = srcRow[this.col - 1 + c];
          rowArr.push(v !== undefined ? v : '');
        }
        out.push(rowArr);
      }
      return out;
    }
    setValues(values) {
      this._ensureSize();
      for (let r = 0; r < this.numRows; r++) {
        for (let c = 0; c < this.numCols; c++) {
          this.sheet.rows[this.row - 1 + r][this.col - 1 + c] = values[r][c];
        }
      }
      return this;
    }
    setNumberFormat() {
      return this;
    }
  }

  class MockSheet {
    constructor(name, rows = []) {
      this.name = name;
      this.rows = rows.map(r => [...r]);
    }
    getLastRow() {
      return this.rows.length;
    }
    getMaxRows() {
      return Math.max(100, this.rows.length);
    }
    getLastColumn() {
      let max = 0;
      for (const r of this.rows) {
        if (r.length > max) max = r.length;
      }
      return max;
    }
    getDataRange() {
      const r = Math.max(1, this.getLastRow());
      const c = Math.max(1, this.getLastColumn());
      return new MockRange(this, 1, 1, r, c);
    }
    getRange(row, col, numRows = 1, numCols = 1) {
      return new MockRange(this, row, col, numRows, numCols);
    }
    appendRow(arr) {
      this.rows.push([...arr]);
      return this;
    }
    insertRowBefore(beforePosition) {
      const idx = Math.max(0, beforePosition - 1);
      const cols = this.getLastColumn();
      this.rows.splice(idx, 0, new Array(cols).fill(''));
      return this;
    }
    deleteRows(rowIndex, howMany = 1) {
      this.rows.splice(rowIndex - 1, howMany);
      return this;
    }
  }

  const spreadsheet = {
    getSheetByName(name) {
      return sheets.get(name) || null;
    },
    insertSheet(name) {
      const s = new MockSheet(name);
      sheets.set(name, s);
      return s;
    }
  };

  const sandbox = {
    Date,
    Math,
    JSON,
    String,
    Number,
    Boolean,
    Array,
    Object,
    RegExp,
    Error,
    parseInt,
    parseFloat,
    isNaN,
    console,
    SpreadsheetApp: {
      getActiveSpreadsheet: () => spreadsheet,
      flush: () => {},
      getUi: () => ({ alert: () => {} })
    },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (k) => (propsStore[k] !== undefined ? propsStore[k] : null),
        setProperty: (k, v) => { propsStore[k] = String(v); },
        deleteProperty: (k) => { delete propsStore[k]; }
      })
    },
    CacheService: {
      getScriptCache: () => ({
        get: (k) => (cacheStore.has(k) ? cacheStore.get(k) : null),
        put: (k, v) => { cacheStore.set(k, String(v)); },
        remove: (k) => { cacheStore.delete(k); }
      })
    },
    LockService: {
      getScriptLock: () => ({
        waitLock: () => true,
        releaseLock: () => {}
      })
    },
    Utilities: {
      getUuid: () => crypto.randomUUID(),
      computeHmacSha256Signature: (value, key) => {
        const buf = crypto.createHmac('sha256', Buffer.from(String(key), 'utf8'))
          .update(Buffer.from(String(value), 'utf8'))
          .digest();
        return Array.from(buf);
      },
      base64Encode: (bytes) => Buffer.from(bytes).toString('base64'),
      formatDate: (date) => date.toISOString()
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: (txt) => ({
        _text: txt,
        setMimeType() { return this; },
        getContent() { return this._text; }
      })
    }
  };

  const codePath = path.join(__dirname, 'Code.gs');
  const codeSrc  = fs.readFileSync(codePath, 'utf8');
  vm.createContext(sandbox);
  vm.runInContext(codeSrc, sandbox, { filename: 'Code.gs' });

  function post(payload) {
    const res = sandbox.doPost({ postData: { contents: JSON.stringify(payload) } });
    return JSON.parse(res.getContent());
  }

  return { sandbox, propsStore, cacheStore, sheets, spreadsheet, post };
}

/* ═══════════════════════════════════════════════════════════
   JALANKAN PENGUJIAN
   ═══════════════════════════════════════════════════════════ */

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('  ✓', name);
}

console.log('=== Menguji Backend Google Apps Script (Code.gs) ===');

const env = createMockEnvironment();
const s   = env.sandbox;

test('1. Logika Waktu & Zona +07:00 (Buka 23 Nov 10:00 WIB, Tutup 24 Nov 10:00 WIB)', () => {
  const buka  = new Date('2026-11-23T10:00:00+07:00');
  const tutup = new Date('2026-11-24T10:00:00+07:00');

  // 1 detik sebelum buka (09:59:59 WIB = 02:59:59 UTC)
  const sebelum = new Date('2026-11-23T09:59:59+07:00');
  assert.strictEqual(s.hitungStatus_(sebelum, buka, tutup, false), 'TUTUP');
  assert.strictEqual(s.hitungFase_(sebelum, buka, tutup), 'BELUM_DIBUKA');

  // Tepat saat buka (10:00:00 WIB)
  const saatBuka = new Date('2026-11-23T10:00:00+07:00');
  assert.strictEqual(s.hitungStatus_(saatBuka, buka, tutup, false), 'BUKA');
  assert.strictEqual(s.hitungFase_(saatBuka, buka, tutup), 'BERLANGSUNG');

  // Saat dijeda panitia di tengah waktu buka
  assert.strictEqual(s.hitungStatus_(saatBuka, buka, tutup, true), 'DIJEDA');

  // 1 detik sebelum tutup (24 Nov 09:59:59 WIB)
  const sebelumTutup = new Date('2026-11-24T09:59:59+07:00');
  assert.strictEqual(s.hitungStatus_(sebelumTutup, buka, tutup, false), 'BUKA');

  // Tepat saat tutup (24 Nov 10:00:00 WIB)
  const saatTutup = new Date('2026-11-24T10:00:00+07:00');
  assert.strictEqual(s.hitungStatus_(saatTutup, buka, tutup, false), 'TUTUP');
  assert.strictEqual(s.hitungFase_(saatTutup, buka, tutup), 'SELESAI');
});

test('2. Normalisasi NIP & Penyamaran NIP (Masking)', () => {
  assert.strictEqual(s.normalisasiId_(' 00000000 000000 1 001 '), '000000000000001001');
  assert.strictEqual(s.normalisasiId_('00000000.000000-1.002'), '000000000000001002');
  assert.strictEqual(s.normalisasiId_("'000000000000001003"), '000000000000001003');

  // NIP Direktur (18 digit -> 4 awal + 10 x + 4 akhir)
  assert.strictEqual(s.maskNip_('000000000000000000'), '1969xxxxxxxxxx1008');
  assert.strictEqual(s.maskNip_('000000000000001001'), '0000xxxxxxxxxx1001');
  // NIK 16 digit -> 4 awal + 8 x + 4 akhir
  assert.strictEqual(s.maskNip_('0000000000001009'), '0000xxxxxxxx1009');
});

test('3. Ekstraksi Nama Depan (Lewati Gelar Ns., Bdn., M., drg.) & Sandi Awal', () => {
  assert.strictEqual(s.namaDepan_('Ns. Contoh Perawat, S.Kep'), 'contoh');
  assert.strictEqual(s.namaDepan_('Bdn. Simulasi Bidan, S.Tr.Keb'), 'simulasi');
  assert.strictEqual(s.namaDepan_('M. Contoh Kedua, A.Md.Kep'), 'contoh');
  assert.strictEqual(s.namaDepan_('CONTOH HURUF BESAR, S.Kep., Ns'), 'contoh');

  const rowPegawai = {
    nama: 'Ns. Contoh Perawat, S.Kep',
    nip: '000000000000001001',
    jenis_id: 'NIP',
    tahun_lahir: 1990,
    pin_awal: 'Abcd2345'
  };
  assert.strictEqual(s.sandiAwalDiharapkan_(rowPegawai, false), 'contoh1990');
  assert.strictEqual(s.sandiAwalDiharapkan_(rowPegawai, true), 'Abcd2345');
  assert.strictEqual(s.cocokSandiAwal_('Contoh1990', 'contoh1990', false), true);
  assert.strictEqual(s.cocokSandiAwal_('salah1990', 'contoh1990', false), false);
});

test('4. Validasi Kekuatan Kata Sandi Baru', () => {
  const nip = '000000000000001001';
  assert.strictEqual(s.validasiSandi_('pendek1', nip, 'contoh1990', 'contoh1990').valid, false);
  assert.strictEqual(s.validasiSandi_(' hanyaHurufSaja ', nip, 'contoh1990', 'contoh1990').valid, false);
  assert.strictEqual(s.validasiSandi_('1234567890', nip, 'contoh1990', 'contoh1990').valid, false);
  assert.strictEqual(s.validasiSandi_(nip, nip, 'contoh1990', 'contoh1990').valid, false);
  assert.strictEqual(s.validasiSandi_('contoh1990', nip, 'contoh1990', 'contoh1990').valid, false);
  assert.strictEqual(s.validasiSandi_('REDACTED_PASSWORD', nip, 'contoh1990', 'contoh1990').valid, false);
  assert.strictEqual(s.validasiSandi_('SandiKuat2026', nip, 'contoh1990', 'contoh1990').valid, true);
});

test('5. Sanitasi Anti Formula Injection di Sheet', () => {
  assert.strictEqual(s.sanitize_('=IMPORTXML("http://evil")'), "'=IMPORTXML(\"http://evil\")");
  assert.strictEqual(s.sanitize_('+1+1'), "'+1+1");
  assert.strictEqual(s.sanitize_('-2+3'), "'-2+3");
  assert.strictEqual(s.sanitize_('@SUM(A1:A2)'), "'@SUM(A1:A2)");
  assert.strictEqual(s.sanitize_('cand-1'), 'cand-1');
});

test('6. Pembatasan Percobaan Login (Rate Limit 5x Gagal -> Kunci 15 Menit)', () => {
  const cache = s.CacheService.getScriptCache();
  const key = 'rl_uji';
  for (let i = 1; i <= 4; i++) {
    s.catatPercobaanLogin_(cache, key, false);
    assert.strictEqual(s.cekRateLimit_(cache, key).terkunci, false);
  }
  s.catatPercobaanLogin_(cache, key, false);
  assert.strictEqual(s.cekRateLimit_(cache, key).terkunci, true);
  // Reset saat sukses
  s.catatPercobaanLogin_(cache, key, true);
  assert.strictEqual(s.cekRateLimit_(cache, key).terkunci, false);
});

test('7. Alur End-to-End: Setup, Login, Ganti Sandi, Pilih 1x, Cegah Suara Ganda, Hasil & Kontrol', () => {
  const e2e = createMockEnvironment({
    // Buat jadwal sedang BUKA relatif terhadap saat pengujian dijalankan
    WAKTU_BUKA:  new Date(Date.now() - 3600 * 1000).toISOString(),
    WAKTU_TUTUP: new Date(Date.now() + 3600 * 1000).toISOString(),
    STATUS_JEDA: 'false',
    PIN_ACAK:    'false'
  });

  // Setup awal membuat 4 tab
  const setupRes = e2e.sandbox.setup();
  assert.strictEqual(setupRes.ok, true);

  // Masukkan 2 pemilih contoh palsu (NIP 00000000...) & 2 akun panitia
  const sheetDpt = e2e.spreadsheet.getSheetByName('DPT');
  sheetDpt.appendRow([
    'Ns. Contoh Satu, S.Kep', '000000000000001001', 'ICU', 'Perawat', 'Perawat',
    'NIP', 1991, 'PinSatu1', '', '', 'FALSE', '', ''
  ]);
  sheetDpt.appendRow([
    'Bdn. Contoh Dua, S.Tr.Keb', '000000000000002002', 'IGD', 'Bidan', 'Bidan',
    'NIP', 1992, 'PinDua22', '', '', 'FALSE', '', ''
  ]);

  const sheetPanitia = e2e.spreadsheet.getSheetByName('AKUN_PANITIA');
  sheetPanitia.appendRow(['panitia.uji', 'Panitia Uji', 'panitia', 'PanitiaUji99', '', '']);
  sheetPanitia.appendRow(['pengurus.uji', 'Pengurus Uji', 'pengurus', 'PengurusUji99', '', '']);

  // Jalankan setup() lagi untuk meng-hash sandi_awal panitia
  const setupRes2 = e2e.sandbox.setup();
  assert.strictEqual(setupRes2.dihash, 2);
  // Pastikan kolom sandi_awal sudah dikosongkan
  assert.strictEqual(sheetPanitia.getRange(2, 4).getValue(), '');

  // a) Status publik hanya mengembalikan DPT & sudah_memilih, TANPA angka per calon
  const st0 = e2e.post({ aksi: 'status' });
  assert.strictEqual(st0.ok, true);
  assert.strictEqual(st0.dpt, 2);
  assert.strictEqual(st0.sudah_memilih, 0);
  assert.strictEqual(st0.status, 'BUKA');
  assert.strictEqual(st0.rincian, undefined);

  // b) Pesan galat login sama untuk NIP tidak ada vs sandi salah
  const failNip = e2e.post({ aksi: 'login', id: '000000009999999999', sandi: 'apaSaja123' });
  const failPwd = e2e.post({ aksi: 'login', id: '00000000 000000 1 001', sandi: 'salahSandi' });
  assert.strictEqual(failNip.ok, false);
  assert.strictEqual(failPwd.ok, false);
  assert.strictEqual(failNip.pesan, failPwd.pesan);

  // c) Login pemilih 1 dengan spasi pada NIP & sandi awal (contoh1991)
  const login1 = e2e.post({ aksi: 'login', id: '00000000 000000 1 001', sandi: 'contoh1991' });
  assert.strictEqual(login1.ok, true);
  assert.strictEqual(login1.wajib_ganti_sandi, true);
  assert.ok(login1.token);

  // d) Coba memilih sebelum ganti sandi -> DITOLAK
  const pilihSebelumGanti = e2e.post({ aksi: 'pilih', token: login1.token, kode_calon: 'cand-2' });
  assert.strictEqual(pilihSebelumGanti.ok, false);
  assert.strictEqual(pilihSebelumGanti.kode, 'WAJIB_GANTI_SANDI');

  // e) Ganti sandi pemilih 1
  const ganti1 = e2e.post({
    aksi: 'ganti_sandi',
    token: login1.token,
    sandi_lama: 'contoh1991',
    sandi_baru: 'Merdeka2026'
  });
  assert.strictEqual(ganti1.ok, true);

  // f) Pilih calon 2 -> SUKSES
  const pilih1 = e2e.post({ aksi: 'pilih', token: login1.token, kode_calon: 'cand-2' });
  assert.strictEqual(pilih1.ok, true);
  assert.strictEqual(pilih1.kode_bukti.length, 10);

  // g) Pilih kedua kali oleh pemilih yang sama -> DITOLAK (Satu pemilih satu suara)
  const pilihGanda = e2e.post({ aksi: 'pilih', token: login1.token, kode_calon: 'cand-1' });
  assert.strictEqual(pilihGanda.ok, false);
  assert.strictEqual(pilihGanda.kode, 'SUDAH_MEMILIH');

  // h) Cek tab SUARA: hanya berisi id_acak & kode_calon, TIDAK memuat NIP atau nama
  const suaraRows = e2e.spreadsheet.getSheetByName('SUARA').getDataRange().getValues();
  assert.strictEqual(suaraRows.length, 2);
  assert.strictEqual(suaraRows[0].length, 2);
  const suaraDump = JSON.stringify(suaraRows);
  assert.strictEqual(suaraDump.includes('000000000000001001'), false);
  assert.strictEqual(suaraDump.includes('Contoh Satu'), false);

  // i) Cek bukti pemilih 1
  const bukti1 = e2e.post({ aksi: 'bukti', token: login1.token });
  assert.strictEqual(bukti1.ok, true);
  assert.strictEqual(bukti1.kode_bukti, pilih1.kode_bukti);
  assert.strictEqual(bukti1.nip_tersamar, '0000xxxxxxxxxx1001');

  // j) Hasil sebelum waktu tutup -> DITOLAK (bahkan jika diminta panitia)
  const hasilSebelumTutup = e2e.post({ aksi: 'hasil' });
  assert.strictEqual(hasilSebelumTutup.ok, false);
  assert.strictEqual(hasilSebelumTutup.kode, 'HASIL_BELUM_DIBUKA');

  // k) Daftar pemilih ditolak untuk token pemilih biasa & untuk peran 'pengurus' non-panitia
  assert.strictEqual(e2e.post({ aksi: 'daftar_pemilih', token: login1.token }).ok, false);
  const loginPengurus = e2e.post({ aksi: 'login', id: 'pengurus.uji', sandi: 'PengurusUji99' });
  assert.strictEqual(loginPengurus.ok, true);
  assert.strictEqual(e2e.post({ aksi: 'daftar_pemilih', token: loginPengurus.token }).ok, false);

  // l) Login panitia e-voting -> bisa melihat daftar_pemilih (NIP tersamar, tanpa kode bukti, tanpa pilihan)
  const loginPanitia = e2e.post({ aksi: 'login', id: 'panitia.uji', sandi: 'PanitiaUji99' });
  assert.strictEqual(loginPanitia.ok, true);
  const dp = e2e.post({ aksi: 'daftar_pemilih', token: loginPanitia.token });
  assert.strictEqual(dp.ok, true);
  assert.strictEqual(dp.daftar.length, 2);
  assert.strictEqual(dp.daftar[0].nip_tersamar, '0000xxxxxxxxxx1001');
  assert.strictEqual(dp.daftar[0].status, 'Sudah');
  assert.strictEqual(dp.daftar[0].kode_bukti, undefined);
  assert.strictEqual(dp.daftar[0].kode_calon, undefined);

  // m) Kontrol Jeda -> pemilih 2 tidak bisa memilih saat DIJEDA
  assert.strictEqual(e2e.post({ aksi: 'kontrol', token: loginPanitia.token, perintah: 'jeda' }).ok, true);
  const login2 = e2e.post({ aksi: 'login', id: '000000000000002002', sandi: 'contoh1992' });
  e2e.post({ aksi: 'ganti_sandi', token: login2.token, sandi_lama: 'contoh1992', sandi_baru: 'Merdeka2027' });
  const pilihSaatJeda = e2e.post({ aksi: 'pilih', token: login2.token, kode_calon: 'cand-3' });
  assert.strictEqual(pilihSaatJeda.ok, false);
  assert.strictEqual(pilihSaatJeda.kode, 'TIDAK_BUKA');

  // n) Lanjutkan -> pemilih 2 bisa memilih
  assert.strictEqual(e2e.post({ aksi: 'kontrol', token: loginPanitia.token, perintah: 'lanjut' }).ok, true);
  const pilih2 = e2e.post({ aksi: 'pilih', token: login2.token, kode_calon: 'cand-2' });
  assert.strictEqual(pilih2.ok, true);

  // o) Simulasikan waktu sudah melewati WAKTU_TUTUP -> hasil dibuka, reset ditolak
  e2e.propsStore.WAKTU_TUTUP = new Date(Date.now() - 1000).toISOString();
  const resetSetelahTutup = e2e.post({
    aksi: 'kontrol',
    token: loginPanitia.token,
    perintah: 'reset',
    konfirmasi: 'RESET'
  });
  assert.strictEqual(resetSetelahTutup.ok, false);
  assert.strictEqual(resetSetelahTutup.kode, 'SUDAH_TUTUP');

  const hasilAkhir = e2e.post({ aksi: 'hasil' });
  assert.strictEqual(hasilAkhir.ok, true);
  assert.strictEqual(hasilAkhir.total_sah, 2);
  assert.deepStrictEqual(hasilAkhir.tertinggi, ['cand-2']);
  const c2 = hasilAkhir.rincian.find(r => r.kode_calon === 'cand-2');
  assert.strictEqual(c2.jumlah, 2);
  assert.strictEqual(c2.persen, 100);

  // p) Kembalikan waktu tutup ke masa depan lalu uji Reset dengan konfirmasi "RESET"
  e2e.propsStore.WAKTU_TUTUP = new Date(Date.now() + 3600 * 1000).toISOString();
  const resetSalahKonf = e2e.post({ aksi: 'kontrol', token: loginPanitia.token, perintah: 'reset', konfirmasi: 'reset' });
  assert.strictEqual(resetSalahKonf.ok, false);
  const resetSukses = e2e.post({ aksi: 'kontrol', token: loginPanitia.token, perintah: 'reset', konfirmasi: 'RESET' });
  assert.strictEqual(resetSukses.ok, true);
  const stSetelahReset = e2e.post({ aksi: 'status' });
  assert.strictEqual(stSetelahReset.sudah_memilih, 0);
});

console.log(`\n✅ SEMUA PENGUJIAN LULUS (${passed}/${passed} skenario)`);
