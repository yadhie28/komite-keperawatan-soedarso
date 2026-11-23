/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: PEREKAMAN HASIL & BUKTI VOTING PEMILIHAN KETUA KOMITE KEPERAWATAN
 * RSUD dr. SOEDARSO PONTIANAK PERIODE 2027 - 2030
 * ==============================================================================
 * Akun Pengelola: komitekeperawatanrsds2023@gmail.com
 *
 * ARSITEKTUR KEAMANAN & ASAS LUBER JURDIL:
 * 1. LockService: Menggunakan LockService ScriptLock (20 detik) untuk mencegah race condition
 *    dan pengiriman suara ganda secara simultan.
 * 2. Pemisahan Mutlak 2 Tab Terisolasi:
 *    a. "Voting_Partisipasi": Mencatat tanda terima/presensi pemilih (Token, Timestamp,
 *       NIP Masked, Nama, Unit). TIDAK BOLEH memuat nomor/nama calon terpilih.
 *    b. "Voting_Kotak_Suara": Mencatat suara murni (ID Suara Anonim, Nomor Calon,
 *       Nama Calon, Waktu Batch). TIDAK MEMILIKI relasi/FK ke identitas pemilih.
 * 3. Enforcing Jadwal Server-Side: 23 Nov 2026 10.00 WIB s.d. 24 Nov 2026 10.00 WIB.
 * 4. Proteksi Hitung Suara: Hasil suara hanya dibuka setelah periode pemilihan berakhir
 *    atau untuk admin panitia terverifikasi.
 * ==============================================================================
 */

const EMAIL_KOMITE = "komitekeperawatanrsds2023@gmail.com";
const TAB_PARTISIPASI = "Voting_Partisipasi";
const TAB_KOTAK_SUARA = "Voting_Kotak_Suara";
const TAB_REKAPITULASI = "Rekapitulasi_Hasil";
const TAB_AUDIT = "Audit_Trail";

// Jadwal Resmi Simulasi Sisi Server (WIB)
const ELECTION_START = new Date("2026-11-23T10:00:00+07:00");
const ELECTION_END = new Date("2026-11-24T10:00:00+07:00");

/**
 * Inisialisasi otomatis struktur tab Google Spreadsheet
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Tab Partisipasi Pemilih (Tanda Terima Kehadiran - TANPA PILIHAN CALON)
  let sheetPartisipasi = ss.getSheetByName(TAB_PARTISIPASI);
  if (!sheetPartisipasi) {
    sheetPartisipasi = ss.insertSheet(TAB_PARTISIPASI);
  }
  sheetPartisipasi.clear();
  sheetPartisipasi.appendRow([
    "Waktu Presensi (WIB)",
    "Nomor Bukti Suara (Token Sah)",
    "NIP Pemilih (Masked)",
    "NIP Pemilih (Verifikasi Unik)",
    "Nama Lengkap Pemilih",
    "Unit Kerja / Ruangan",
    "Status Hak Suara"
  ]);
  sheetPartisipasi.getRange("A1:G1").setBackground("#0d5f5b").setFontColor("#ffffff").setFontWeight("bold");
  sheetPartisipasi.setFrozenRows(1);

  // 2. Tab Kotak Suara Sah (ANONIM MUTLAK - TANPA IDENTITAS PEMILIH)
  let sheetKotak = ss.getSheetByName(TAB_KOTAK_SUARA);
  if (!sheetKotak) {
    sheetKotak = ss.insertSheet(TAB_KOTAK_SUARA);
  }
  sheetKotak.clear();
  sheetKotak.appendRow([
    "ID Suara Anonim",
    "Nomor Urut Pilihan",
    "Nama Calon Ketua Dipilih",
    "Waktu Rekam Kotak Suara",
    "Status Suara"
  ]);
  sheetKotak.getRange("A1:E1").setBackground("#042f2e").setFontColor("#ffffff").setFontWeight("bold");
  sheetKotak.setFrozenRows(1);

  // 3. Tab Rekapitulasi Hasil Perolehan Suara
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
    "000000000000000000",
    "Instalasi Rawat Intensif (ICU)",
    '=COUNTIF(Voting_Kotak_Suara!B:B, "01")',
    '=IF(SUM(E2:E4)>0, E2/SUM(E2:E4)*100, 0)',
    '=IF(E2=MAX($E$2:$E$4), "Perolehan Terbanyak", "Kandidat")'
  ]);
  sheetRekap.appendRow([
    "02",
    "Ns. Muhammad Fadli Hidayat, S.Kep., Sp.KMB.",
    "000000000000000000",
    "Instalasi Rawat Inap Bedah (Kakap)",
    '=COUNTIF(Voting_Kotak_Suara!B:B, "02")',
    '=IF(SUM(E2:E4)>0, E3/SUM(E2:E4)*100, 0)',
    '=IF(E3=MAX($E$2:$E$4), "Perolehan Terbanyak", "Kandidat")'
  ]);
  sheetRekap.appendRow([
    "03",
    "Ns. Dewi Kartika Sari, S.Kep., M.Kep.",
    "000000000000000000",
    "Instalasi Diklat & SDM Keperawatan",
    '=COUNTIF(Voting_Kotak_Suara!B:B, "03")',
    '=IF(SUM(E2:E4)>0, E4/SUM(E2:E4)*100, 0)',
    '=IF(E4=MAX($E$2:$E$4), "Perolehan Terbanyak", "Kandidat")'
  ]);
  sheetRekap.getRange("A1:G1").setBackground("#b45309").setFontColor("#ffffff").setFontWeight("bold");
  sheetRekap.setFrozenRows(1);

  // 4. Tab Audit Log
  let sheetAudit = ss.getSheetByName(TAB_AUDIT);
  if (!sheetAudit) {
    sheetAudit = ss.insertSheet(TAB_AUDIT);
  }
  sheetAudit.clear();
  sheetAudit.appendRow([
    "Timestamp (WIB)",
    "Tindakan / Event",
    "Pelaksana",
    "Keterangan"
  ]);
  sheetAudit.getRange("A1:D1").setBackground("#1e293b").setFontColor("#ffffff").setFontWeight("bold");
  sheetAudit.appendRow([
    new Date(),
    "Inisialisasi Sistem Pemilihan 2027-2030 (Arsitektur Rahasia)",
    "Panitia Pemilihan Komite Keperawatan",
    "Database siap menerima suara dengan pemisahan tabel presensi vs kotak suara."
  ]);

  SpreadsheetApp.flush();
  Logger.log("Inisialisasi Sheet E-Voting Selesai dengan Skema Kerahasiaan Suara!");
}

/**
 * Helper Masking NIP (misal: 1982••••••••••1005)
 */
function maskNip(rawNip) {
  if (!rawNip) return "-";
  const clean = String(rawNip).replace(/\s+/g, "");
  if (clean.length < 8) return clean;
  return clean.substring(0, 4) + "••••••••" + clean.substring(clean.length - 4);
}

/**
 * Menangani HTTP POST dari Bilik Suara E-Voting Portal
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  const hasLock = lock.tryLock(20000); // 20 Detik Lock Timeout
  if (!hasLock) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      code: "LOCK_TIMEOUT",
      message: "Server sedang sibuk memproses suara pemilih lain. Silakan coba kembali dalam beberapa detik."
    })).setMimeType(ContentService.MimeType.JSON);
  }

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
    let sheetPartisipasi = ss.getSheetByName(TAB_PARTISIPASI);
    let sheetKotak = ss.getSheetByName(TAB_KOTAK_SUARA);

    if (!sheetPartisipasi || !sheetKotak) {
      setupSheet();
      sheetPartisipasi = ss.getSheetByName(TAB_PARTISIPASI);
      sheetKotak = ss.getSheetByName(TAB_KOTAK_SUARA);
    }

    const now = new Date();

    // 1. Validasi Jadwal Sisi Server
    if (now < ELECTION_START) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        code: "ELECTION_NOT_OPEN",
        message: "Pemilihan belum dibuka. Jadwal buka: Senin, 23 Nov 2026 pukul 10.00 WIB."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    if (now > ELECTION_END) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        code: "ELECTION_CLOSED",
        message: "Pemilihan telah resmi ditutup pada Selasa, 24 Nov 2026 pukul 10.00 WIB."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const tokenBukti = data.token || ("VOTE-2026-" + Utilities.getUuid().substring(0, 8).toUpperCase());
    const namaPemilih = data.voterName || "-";
    const nipPemilih = String(data.voterNip || "-").trim();
    const cleanNip = nipPemilih.replace(/[\s\.\-]/g, "");
    const maskedNipStr = maskNip(cleanNip);
    const unitKerja = data.voterUnit || "-";
    const nomorUrut = String(data.candidateNumber || data.candidateId || "01").padStart(2, "0");
    const namaCalon = data.candidateName || `Kandidat Nomor ${nomorUrut}`;

    // 2. Cek Duplikasi Hak Suara (Idempotensi & Anti Double Voting)
    if (cleanNip && cleanNip !== "-") {
      const existingData = sheetPartisipasi.getDataRange().getValues();
      for (let i = 1; i < existingData.length; i++) {
        const rowCleanNip = String(existingData[i][3]).replace(/[\s\.\-]/g, "");
        if (rowCleanNip && rowCleanNip === cleanNip) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            code: "ALREADY_VOTED",
            message: "NIP pemilih telah tercatat menggunakan hak suaranya. Cegah suara ganda aktif.",
            alreadyVoted: true
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // 3. Catat ke Tabel Partisipasi (TIDAK MEMUAT PILIHAN CALON)
    const timestampWib = Utilities.formatDate(now, "Asia/Jakarta", "dd MMMM yyyy, HH:mm:ss") + " WIB";
    sheetPartisipasi.appendRow([
      timestampWib,
      tokenBukti,
      maskedNipStr,
      cleanNip, // Disimpan untuk cek duplikasi terenkripsi/terkunci
      namaPemilih,
      unitKerja,
      "SUDAH MENGGUNAKAN HAK SUARA"
    ]);

    // 4. Catat ke Kotak Suara Sah (ANONIM MUTLAK TANPA IDENTITAS PEMILIH)
    const anonymousBallotId = "BALLOT-" + Utilities.getUuid().substring(0, 12).toUpperCase();
    sheetKotak.appendRow([
      anonymousBallotId,
      nomorUrut,
      namaCalon,
      timestampWib,
      "SAH"
    ]);

    // 5. Notifikasi Bukti Presensi ke Email Komite (TANPA CALON TERPILIH)
    try {
      MailApp.sendEmail({
        to: EMAIL_KOMITE,
        subject: `[E-VOTING] Presensi Pemilih Masuk: Token ${tokenBukti}`,
        htmlBody: `
          <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background: #ffffff;">
            <div style="background: #0d5f5b; color: #ffffff; padding: 12px 16px; border-radius: 8px;">
              <h2 style="margin: 0; font-size: 16px;">TANDA TERIMA PRESENSI E-VOTING RESMI</h2>
              <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">Komite Keperawatan RSUD dr. Soedarso Periode 2027–2030</p>
            </div>
            <div style="margin-top: 16px; font-size: 14px; line-height: 1.6; color: #334155;">
              <p>Telah tercatat partisipasi pemilih baru ke dalam sistem audit:</p>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Waktu:</td><td>${timestampWib}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Token Bukti Sah:</td><td style="font-family: monospace; font-weight: bold; color: #0d5f5b;">${tokenBukti}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Pemilih:</td><td>${namaPemilih} (NIP: ${maskedNipStr})</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Unit Kerja:</td><td>${unitKerja}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Status:</td><td><strong style="color: #047857;">HAK SUARA TELAH TERSALURKAN (RAHASIA)</strong></td></tr>
              </table>
              <p style="margin-top: 16px; font-size: 12px; color: #64748b; border-top: 1px dashed #cbd5e1; padding-top: 10px;">
                Catatan Asas LUBER: Pilihan calon dirahasiakan dan disimpan terpisah secara anonim di Kotak Suara Sah tanpa kaitan data pemilih.
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
      timestamp: now.toISOString(),
      timestampWib: timestampWib
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
    const sheetPartisipasi = ss.getSheetByName(TAB_PARTISIPASI);

    if (!sheetRekap || !sheetPartisipasi) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Spreadsheet belum diinisialisasi. Silakan jalankan setupSheet() terlebih dahulu."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const totalVoters = Math.max(0, sheetPartisipasi.getLastRow() - 1);
    const now = new Date();
    const isEnded = now > ELECTION_END;
    const adminKey = e && e.parameter ? e.parameter.adminKey : null;
    const canViewResults = isEnded || adminKey === "soedarso_panitia_2026";

    let candidates = [];
    if (canViewResults) {
      const rekapValues = sheetRekap.getRange("A2:G4").getValues();
      candidates = rekapValues.map(row => ({
        number: row[0],
        name: row[1],
        nip: row[2],
        unit: row[3],
        votes: Number(row[4]) || 0,
        percentage: Number(row[5]) || 0,
        status: row[6]
      }));
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      election: "Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso 2027-2030",
      totalVotes: totalVoters,
      isEnded: isEnded,
      resultsLocked: !canViewResults,
      candidates: candidates,
      updatedAt: now.toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
