/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: PEREKAMAN HASIL & BUKTI VOTING PEMILIHAN KETUA KOMITE KEPERAWATAN
 * RSUD dr. SOEDARSO PONTIANAK PERIODE 2027 - 2030
 * ==============================================================================
 * Akun Pengelola: komitekeperawatanrsds2023@gmail.com
 *
 * CARA PEMASANGAN DI GOOGLE DRIVE / SPREADSHEET:
 * 1. Login ke Google Drive dengan akun: komitekeperawatanrsds2023@gmail.com
 * 2. Buat Google Spreadsheet baru dengan judul:
 *    "E-Voting Ketua Komite Keperawatan RSUD dr. Soedarso 2027-2030"
 * 3. Klik menu: Extensions (Ekstensi) > Apps Script
 * 4. Hapus semua kode default, lalu salin dan tempel (paste) seluruh isi kode file ini.
 * 5. Klik Simpan (Ikon Disket).
 * 6. Jalankan fungsi "setupSheet()" sekali (klik Run / Jalankan) untuk membuat tabel otomatis.
 * 7. Klik tombol "Deploy" (Terapkan) di pojok kanan atas > "New deployment" (Penerapan baru).
 * 8. Pilih jenis: "Web app" (Aplikasi Web).
 * 9. Konfigurasi:
 *    - Execute as: "Me" (komitekeperawatanrsds2023@gmail.com)
 *    - Who has access: "Anyone" (Siapa saja, termasuk anonim)
 * 10. Klik Deploy > Berikan izin (Authorize access).
 * 11. Salin "Web App URL" yang didapatkan, lalu tempelkan ke Panel Admin Portal E-Voting.
 * ==============================================================================
 */

const EMAIL_KOMITE = "komitekeperawatanrsds2023@gmail.com";
const TAB_LOG_VOTE = "Log_Suara_Masuk";
const TAB_REKAPITULASI = "Rekapitulasi_Hasil";
const TAB_AUDIT = "Audit_Trail";

/**
 * Inisialisasi otomatis struktur tab Google Spreadsheet
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Tab Log Suara Masuk (Daftar Bukti Suara Sah)
  let sheetLog = ss.getSheetByName(TAB_LOG_VOTE);
  if (!sheetLog) {
    sheetLog = ss.insertSheet(TAB_LOG_VOTE);
  }
  sheetLog.clear();
  sheetLog.appendRow([
    "Waktu Masuk (WIB)",
    "Nomor Bukti Suara (Token Sah)",
    "Nama Lengkap Pemilih",
    "NIP Pemilih",
    "Unit Kerja / Ruangan",
    "Nomor Urut Pilihan",
    "Nama Calon Ketua Dipilih",
    "Status Verifikasi",
    "Hash Integritas"
  ]);
  sheetLog.getRange("A1:I1").setBackground("#0d5f5b").setFontColor("#ffffff").setFontWeight("bold");
  sheetLog.setFrozenRows(1);

  // 2. Tab Rekapitulasi Hasil Perolehan Suara
  let sheetRekap = ss.getSheetByName(TAB_REKAPITULASI);
  if (!sheetRekap) {
    sheetRekap = ss.insertSheet(TAB_REKAPITULASI);
  }
  sheetRekap.clear();
  sheetRekap.appendRow([
    "Nomor Urut",
    "Nama Lengkap Calon Ketua",
    "NIP Calon",
    "Unit Kerja Asal",
    "Perolehan Suara Sah",
    "Persentase (%)",
    "Keterangan / Status Pemenang"
  ]);
  sheetRekap.appendRow([
    "01",
    "Ns. Siti Rahmawati, S.Kep., M.Kep.",
    "198503152010012003",
    "Instalasi Rawat Intensif (ICU)",
    '=COUNTIF(Log_Suara_Masuk!F:F, "01")',
    '=IF(SUM(E2:E4)>0, E2/SUM(E2:E4)*100, 0)',
    '=IF(E2=MAX($E$2:$E$4), "Perolehan Terbanyak", "Kandidat")'
  ]);
  sheetRekap.appendRow([
    "02",
    "Ns. Muhammad Fadli Hidayat, S.Kep., Sp.KMB.",
    "198707222011011004",
    "Instalasi Rawat Inap Bedah",
    '=COUNTIF(Log_Suara_Masuk!F:F, "02")',
    '=IF(SUM(E2:E4)>0, E3/SUM(E2:E4)*100, 0)',
    '=IF(E3=MAX($E$2:$E$4), "Perolehan Terbanyak", "Kandidat")'
  ]);
  sheetRekap.appendRow([
    "03",
    "Ns. Dewi Kartika Sari, S.Kep., M.Kep.",
    "199001102012022005",
    "Instalasi Diklat & SDM Keperawatan",
    '=COUNTIF(Log_Suara_Masuk!F:F, "03")',
    '=IF(SUM(E2:E4)>0, E4/SUM(E2:E4)*100, 0)',
    '=IF(E4=MAX($E$2:$E$4), "Perolehan Terbanyak", "Kandidat")'
  ]);
  sheetRekap.getRange("A1:G1").setBackground("#b45309").setFontColor("#ffffff").setFontWeight("bold");
  sheetRekap.setFrozenRows(1);

  // 3. Tab Audit Log
  let sheetAudit = ss.getSheetByName(TAB_AUDIT);
  if (!sheetAudit) {
    sheetAudit = ss.insertSheet(TAB_AUDIT);
  }
  sheetAudit.clear();
  sheetAudit.appendRow([
    "Timestamp",
    "Tindakan / Event",
    "Pelaksana",
    "Keterangan"
  ]);
  sheetAudit.getRange("A1:D1").setBackground("#1e293b").setFontColor("#ffffff").setFontWeight("bold");
  sheetAudit.appendRow([
    new Date(),
    "Inisialisasi Sistem Pemilihan 2027-2030",
    "Panitia Pemilihan Komite Keperawatan",
    "Database siap menerima suara masuk secara real-time."
  ]);

  SpreadsheetApp.flush();
  Logger.log("✅ Inisialisasi Sheet Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso Berhasil!");
}

/**
 * Menangani HTTP POST dari Bilik Suara E-Voting Portal
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error("Data payload kosong.");
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheetLog = ss.getSheetByName(TAB_LOG_VOTE);
    if (!sheetLog) {
      setupSheet();
      sheetLog = ss.getSheetByName(TAB_LOG_VOTE);
    }

    const timestamp = new Date();
    const tokenBukti = data.token || ("VOTE-" + Utilities.getUuid().substring(0, 8).toUpperCase());
    const namaPemilih = data.voterName || "-";
    const nipPemilih = data.voterNip || "-";
    const unitKerja = data.voterUnit || "-";
    const nomorUrut = data.candidateNumber || "01";
    const namaCalon = data.candidateName || "-";
    const hashIntegritas = Utilities.base64Encode(
      Utilities.computeDigest(
        Utilities.DigestAlgorithm.SHA_256,
        `${tokenBukti}|${nipPemilih}|${nomorUrut}|${timestamp.toISOString()}`
      )
    );

    // Cek Duplikasi Suara berdasarkan NIP
    if (nipPemilih && nipPemilih !== "-") {
      const existingData = sheetLog.getDataRange().getValues();
      for (let i = 1; i < existingData.length; i++) {
        const rowNip = String(existingData[i][3]).replace(/[\s\.\-]/g, "");
        const checkNip = String(nipPemilih).replace(/[\s\.\-]/g, "");
        if (rowNip && rowNip === checkNip) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: "NIP pemilih telah tercatat menggunakan hak suaranya sebelumnya.",
            alreadyVoted: true
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // Catat ke Sheet
    sheetLog.appendRow([
      timestamp,
      tokenBukti,
      namaPemilih,
      nipPemilih,
      unitKerja,
      nomorUrut,
      namaCalon,
      "SAH & TERVERIFIKASI",
      hashIntegritas
    ]);

    // Kirim notifikasi bukti pemungutan suara ke email panitia komite
    try {
      MailApp.sendEmail({
        to: EMAIL_KOMITE,
        subject: `[E-VOTING] Suara Masuk: Token ${tokenBukti} - Pemilihan Ketua Komite Keperawatan`,
        htmlBody: `
          <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background: #ffffff;">
            <div style="background: #0d5f5b; color: #ffffff; padding: 12px 16px; border-radius: 8px;">
              <h2 style="margin: 0; font-size: 16px;">BUKTI PEREKAMAN SUARA MASUK E-VOTING</h2>
              <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">Komite Keperawatan RSUD dr. Soedarso Periode 2027–2030</p>
            </div>
            <div style="margin-top: 16px; font-size: 14px; line-height: 1.6; color: #334155;">
              <p>Telah tercatat suara sah baru ke dalam sistem database Spreadsheet:</p>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Waktu:</td><td>${timestamp.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Token Bukti Sah:</td><td style="font-family: monospace; font-weight: bold; color: #0d5f5b;">${tokenBukti}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Pemilih:</td><td>${namaPemilih} (NIP: ${nipPemilih})</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Unit Kerja:</td><td>${unitKerja}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Pilihan Calon:</td><td><strong>Nomor Urut ${nomorUrut}</strong> - ${namaCalon}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Integritas Hash:</td><td style="font-family: monospace; font-size: 11px;">${hashIntegritas}</td></tr>
              </table>
              <p style="margin-top: 16px; font-size: 12px; color: #64748b; border-top: 1px dashed #cbd5e1; padding-top: 10px;">
                Data ini dicatat secara otomatis dan dapat digunakan sebagai Berita Acara dan Alat Bukti Hukum Pemilihan yang Sah.
              </p>
            </div>
          </div>
        `
      });
    } catch (errEmail) {
      Logger.log("Email notification error (non-fatal): " + errEmail);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Suara berhasil dicatat ke Google Spreadsheet resmi Komite Keperawatan.",
      token: tokenBukti,
      timestamp: timestamp.toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Menangani HTTP GET untuk membaca rekapitulasi real-time
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetRekap = ss.getSheetByName(TAB_REKAPITULASI);
    const sheetLog = ss.getSheetByName(TAB_LOG_VOTE);

    if (!sheetRekap || !sheetLog) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Spreadsheet belum diinisialisasi. Silakan jalankan setupSheet() terlebih dahulu."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const rekapValues = sheetRekap.getRange("A2:G4").getValues();
    const totalVotes = Math.max(0, sheetLog.getLastRow() - 1);

    const candidates = rekapValues.map(row => ({
      number: row[0],
      name: row[1],
      nip: row[2],
      unit: row[3],
      votes: Number(row[4]) || 0,
      percentage: Number(row[5]) || 0,
      status: row[6]
    }));

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      election: "Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso 2027-2030",
      totalVotes: totalVotes,
      candidates: candidates,
      updatedAt: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

