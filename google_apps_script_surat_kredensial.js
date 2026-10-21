/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: OTOMASI SURAT PERMOHONAN KREDENSIAL RSUD dr. SOEDARSO
 * ==============================================================================
 * Pasang skrip ini pada Google Spreadsheet / Google Form Komite Keperawatan.
 * Setiap kali perawat/bidan submit Google Form, skrip ini akan otomatis:
 * 1. Mengambil data isian respon Google Form.
 * 2. Meng-generate Formulir Surat Permohonan Kredensial 3 Halaman A4 fisik resmi.
 * 3. Mengonversi ke file PDF dan menyimpannya di Google Drive.
 * 4. (Opsional) Mengirimkan PDF surat ke email perawat dan Subkomite Kredensial.
 * ==============================================================================
 */

function onFormSubmit(e) {
  try {
    const responses = e ? e.namedValues : {};
    
    // Helper untuk mengambil nilai jawaban respon
    const getResp = (key, fallback = '') => {
      if (!responses[key]) return fallback;
      const val = responses[key];
      return Array.isArray(val) ? val[0].trim() : String(val).trim();
    };

    // 1. Ekstraksi Data dari Kolom Google Form
    const jenisPermohonan = getResp('Jenis Permohonan', 'Re-Kredensial Berkala');
    const nama = getResp('Nama Lengkap (beserta Gelar)', 'Ns. Hendra Kurniawan, S.Kep');
    const jenisNip = getResp('Jenis Nomor Pegawai', 'NIP');
    const rawNip = getResp('Nomor Induk Pegawai (NIP/NIPPPK/NIK)', '19920415 201903 1 004');
    const nipFull = rawNip ? `${jenisNip !== 'NIP' ? jenisNip + '. ' : ''}${rawNip}` : 'Ketik di sini';
    const ttl = getResp('Tempat / Tanggal Lahir', 'Pontianak, 15 April 1992');
    const kelamin = getResp('Jenis Kelamin', 'Laki-laki');
    const alamat = getResp('Alamat Rumah Tinggal', 'Jl. Danau Sentarum No. 42, Kota Pontianak');
    const hp = getResp('Nomor Telepon / HP WA Aktif', '0812-5678-9012');
    const email = getResp('Alamat Email', 'hendra.kurniawan@soedarso.kalbarprov.go.id');
    const unit = getResp('Unit Kerja / Ruang Rawat Saat Ini', 'Ruang Enggang Gading 2 (Penyakit Dalam)');
    const jabatan = getResp('Jabatan Fungsional Saat Ini', 'Perawat Ahli Pertama');
    const pkSaatIni = getResp('Level Perawat Klinis (PK) saat ini', 'PK II');
    const pkDiusulkan = getResp('Level PK yang Diusulkan', 'PK III');

    const pendidikan = getResp('Pendidikan Terakhir', 'S1+Profesi Ners');
    const institusi = getResp('Institusi Asal Lulusan', 'Universitas Tanjungpura');
    const tahunLulus = getResp('Tahun Kelulusan', '2018');
    const str = getResp('Nomor Surat Tanda Registrasi (STR)', '140152123-2893812');
    const strExp = getResp('Masa Berlaku STR', '17 Agustus 2028');
    const sipp = getResp('Nomor SIPP / SIPB', '503/412/Dinkes-PP/SIPP/2023');
    const sippExp = getResp('Masa Berlaku SIPP / SIPB', '17 Agustus 2028');

    // Checklist berkas
    const chk1 = getResp('Salinan Ijazah Terlegalisir', 'Ada').toLowerCase().includes('ada');
    const chk2 = getResp('Salinan STR Aktif', 'Ada').toLowerCase().includes('ada');
    const chk3 = getResp('Salinan SIPP/SIPB', 'Ada').toLowerCase().includes('ada');
    const chk4 = getResp('Salinan Sertifikat Pelatihan Khusus', 'Ada').toLowerCase().includes('ada');
    const chk5 = getResp('Bukti PDDikti', 'Ada').toLowerCase().includes('ada');
    const chk6 = getResp('Surat Keterangan Sehat Dokter', 'Ada').toLowerCase().includes('ada');
    const chk7 = getResp('Buku Logbook Kinerja Klinis', 'Ada').toLowerCase().includes('ada');
    const chk8 = getResp('Curriculum Vitae', 'Ada').toLowerCase().includes('ada');

    const tglSurat = Utilities.formatDate(new Date(), "Asia/Jakarta", "d MMMM yyyy");
    const pemeriksaNama = 'Ns. Yohanes Rindo Ari Wijoyo, S.Kep';
    const pemeriksaNip = '198212282003121005';

    // 2. Susun HTML 3 Halaman Presisi Sesuai Template Fisik RSUD dr. Soedarso
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Surat Permohonan Kredensial - ${nama}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm 15mm; }
          body { font-family: Arial, Helvetica, sans-serif; font-size: 9.5pt; line-height: 1.35; color: #000; margin: 0; padding: 0; }
          table { width: 100%; border-collapse: collapse; }
          .soedarso-page { page-break-after: always; width: 100%; background: #fff; }
          .page-3 { page-break-after: avoid; }
          .soedarso-form-box { border: 2px solid #000; padding: 6px 10px; font-weight: bold; font-size: 10.5pt; text-transform: uppercase; margin-bottom: -1px; }
          .soedarso-table td, .soedarso-table th { border: 1px solid #000; padding: 5px 8px; vertical-align: top; font-size: 9.5pt; }
          thead tr { background-color: #0e3860; color: #ffffff; }
        </style>
      </head>
      <body>
        <!-- HALAMAN 1 -->
        <div class="soedarso-page">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 2px;">
            <tr>
              <td style="width: 80px; text-align: center; vertical-align: middle;">
                <img src="https://regal-smakager-133704.netlify.app/logo_kalbar.png" style="width: 70px; height: auto;" />
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="font-size: 11pt; font-weight: bold;">PEMERINTAH PROVINSI KALIMANTAN BARAT</div>
                <div style="font-size: 12.5pt; font-weight: bold;">RUMAH SAKIT UMUM DAERAH DOKTER SOEDARSO</div>
                <div style="font-size: 11.5pt; font-weight: bold;">KOMITE KEPERAWATAN</div>
                <div style="font-size: 8.5pt; margin-top: 3px;">
                  Jalan Dokter Soedarso No.1 Pontianak Tenggara, Kota Pontianak, Kalimantan Barat 78124<br>
                  Telp. (0561) 737701, (0561) 746152, Fax. (0561) 736528<br>
                  Laman: https://rsuddrsoedarso.kalbarprov.go.id, Pos-el: rsud@kalbarprov.go.id
                </div>
              </td>
            </tr>
          </table>
          <div style="border-top: 2.5px solid #000; border-bottom: 0.8px solid #000; height: 2px; margin-top: 6px; margin-bottom: 18px;"></div>

          <div style="text-align: center; font-weight: bold; font-size: 11pt; margin-bottom: 18px;">
            FORMULIR APLIKASI PERMOHONAN KREDENSIAL / RE-KREDENSIAL<br>TENAGA KEPERAWATAN
          </div>

          <div style="font-size: 9.5pt; margin-bottom: 18px;">
            <em>Jenis Permohonan (Berikan tanda ceklis [✓] pada kotak pilihan):</em><br>
            <div style="margin-left: 4px; margin-top: 4px;">
              [ ${jenisPermohonan.toLowerCase().includes('baru') ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ] Kredensial (Perawat Baru / Bidan Baru)<br>
              [ ${jenisPermohonan.toLowerCase().includes('berkala') ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ] Re-Kredensial Berkala (Setiap 3 Tahun)<br>
              [ ${jenisPermohonan.toLowerCase().includes('kenaikan') ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ] Re-Kredensial Kenaikan Jenjang Klinis (Pindah Level PK)
            </div>
          </div>

          <div class="soedarso-form-box">I. IDENTITAS PERSONAL TENAGA KEPERAWATAN</div>
          <table class="soedarso-table">
            <tr><td style="width: 38%;">1. Nama Lengkap (beserta Gelar)</td><td style="width: 62%;">: ${nama}</td></tr>
            <tr><td>2. Nomor Induk Pegawai (NIP/NIPPPK/NIK)</td><td>: ${nipFull}</td></tr>
            <tr><td>3. Tempat / Tanggal Lahir</td><td>: ${ttl}</td></tr>
            <tr><td>4. Jenis Kelamin</td><td>: ${kelamin}</td></tr>
            <tr><td>5. Alamat Rumah Tinggal</td><td>: ${alamat}</td></tr>
            <tr><td>6. Nomor Telepon / HP WA Aktif</td><td>: ${hp}</td></tr>
            <tr><td>7. Alamat Email</td><td>: ${email}</td></tr>
            <tr><td>8. Unit Kerja / Ruang Rawat Saat Ini</td><td>: ${unit}</td></tr>
            <tr><td>9. Jabatan Fungsional Saat Ini</td><td>: ${jabatan}</td></tr>
            <tr><td>10. Level Perawat Klinis (PK) saat ini</td><td>: ${pkSaatIni}</td></tr>
            <tr><td>11. Level PK yang Diusulkan</td><td>: ${pkDiusulkan}</td></tr>
          </table>
        </div>

        <!-- HALAMAN 2 -->
        <div class="soedarso-page">
          <div style="text-align: right; font-size: 11pt; margin-bottom: 8px;">2</div>
          <div class="soedarso-form-box">II. DATA LEGALITAS FORMAL & KUALIFIKASI</div>
          <table class="soedarso-table" style="margin-bottom: 24px;">
            <tr><td style="width: 38%;">1. Pendidikan Terakhir (D3 / D4+Profesi / S1+Profesi / S2)</td><td style="width: 62%;">: ${pendidikan}</td></tr>
            <tr><td>2. Institusi Asal Lulusan</td><td>: ${institusi}</td></tr>
            <tr><td>3. Tahun Kelulusan</td><td>: ${tahunLulus}</td></tr>
            <tr><td>4. Nomor Surat Tanda Registrasi (STR)</td><td>: ${str}</td></tr>
            <tr><td>5. Masa Berlaku STR (Tanggal/Bulan/Tahun)</td><td>: ${strExp}</td></tr>
            <tr><td>6. Nomor Surat Izin Praktik Perawat (SIPP)/SIPB</td><td>: ${sipp}</td></tr>
            <tr><td>7. Masa Berlaku SIPP/SIPB (Tanggal/Bulan/Tahun)</td><td>: ${sippExp}</td></tr>
          </table>

          <div class="soedarso-form-box">III. KELENGKAPAN BERKAS PENDUKUNG (Checklist)</div>
          <table class="soedarso-table">
            <thead>
              <tr style="background-color: #0e3860; color: #fff;">
                <th style="width: 45px; text-align: center;">No</th>
                <th style="text-align: left;">Jenis Berkas Pendukung Dokumen</th>
                <th style="width: 75px; text-align: center;">Ada</th>
                <th style="width: 90px; text-align: center;">Tidak Ada</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="text-align: center;">1</td><td>Salinan Ijazah Keperawatan/Kebidanan Terakhir Terlegalisir</td><td style="text-align: center;">[ ${chk1 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td><td style="text-align: center;">[ ${!chk1 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td></tr>
              <tr><td style="text-align: center;">2</td><td>Salinan Surat Tanda Registrasi (STR) yang masih aktif secara hukum</td><td style="text-align: center;">[ ${chk2 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td><td style="text-align: center;">[ ${!chk2 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td></tr>
              <tr><td style="text-align: center;">3</td><td>Salinan SIPP/SIPB</td><td style="text-align: center;">[ ${chk3 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td><td style="text-align: center;">[ ${!chk3 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td></tr>
              <tr><td style="text-align: center;">4</td><td>Salinan Sertifikat Pelatihan Khusus Keperawatan/Kebidanan (ICU/OK/HD/dll.)</td><td style="text-align: center;">[ ${chk4 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td><td style="text-align: center;">[ ${!chk4 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td></tr>
              <tr><td style="text-align: center;">5</td><td>Tangkapan layar bukti pendidikan dari PDDikti (https://pisn.kemdiktisaintek.go.id/)</td><td style="text-align: center;">[ ${chk5 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td><td style="text-align: center;">[ ${!chk5 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td></tr>
            </tbody>
          </table>
        </div>

        <!-- HALAMAN 3 -->
        <div class="soedarso-page page-3">
          <div style="text-align: right; font-size: 11pt; margin-bottom: 8px;">3</div>
          <table class="soedarso-table" style="margin-bottom: 24px;">
            <tbody>
              <tr><td style="width: 45px; text-align: center;">6</td><td>Surat Keterangan Sehat dari Dokter Pemerintah</td><td style="width: 75px; text-align: center;">[ ${chk6 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td><td style="width: 90px; text-align: center;">[ ${!chk6 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td></tr>
              <tr><td style="text-align: center;">7</td><td>Asli Buku Logbook Kinerja Klinis Harian (Telah diverifikasi Kepala Ruangan)</td><td style="text-align: center;">[ ${chk7 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td><td style="text-align: center;">[ ${!chk7 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td></tr>
              <tr><td style="text-align: center;">8</td><td>Curriculum Vitae / Daftar Riwayat Hidup</td><td style="text-align: center;">[ ${chk8 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td><td style="text-align: center;">[ ${!chk8 ? '<strong>✓</strong>' : '&nbsp;&nbsp;'} ]</td></tr>
            </tbody>
          </table>

          <div class="soedarso-form-box" style="margin-bottom: 12px;">IV. PERNYATAAN DAN PERSETUJUAN PEMOHON</div>
          <div style="font-size: 9.5pt; line-height: 1.5; text-align: justify; margin-bottom: 30px;">
            Dengan ini saya menyatakan bahwa seluruh data administrasi, dokumen kompetensi, serta berkas portofolio yang saya lampirkan dalam Formulir Aplikasi Kredensial / Re-Kredensial ini adalah benar, valid, dan sah secara hukum. Apabila di kemudian hari ditemukan adanya pemalsuan data atau informasi yang tidak benar, maka saya bersedia menerima sanksi administrasi, pencabutan kewenangan klinis (Clinical Privilege), maupun sanksi hukum sesuai ketentuan yang berlaku di RSUD dr. Soedarso Provinsi Kalimantan Barat.
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 9.5pt; border: none;">
            <tr>
              <td style="width: 50%; border: none;"></td>
              <td style="width: 50%; text-align: center; border: none;">Pontianak, ${tglSurat}</td>
            </tr>
            <tr>
              <td style="width: 50%; text-align: center; padding-top: 10px; border: none;">
                Mengetahui / Memeriksa,<br>Subkomite Kredensial Keperawatan<br>
                <div style="height: 65px;"></div>
                ${pemeriksaNama}<br>NIP. ${pemeriksaNip}
              </td>
              <td style="width: 50%; text-align: center; padding-top: 10px; border: none;">
                Pemohon,<br>Personel Keperawatan<br>
                <div style="height: 65px;"></div>
                ${nama}<br>NIP / NIPPPK / NIK. ${rawNip}
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `;

    // 3. Konversi ke PDF & Simpan di Google Drive
    const blob = Utilities.newBlob(htmlBody, "text/html", `Surat_Permohonan_Kredensial_${nama.replace(/[^a-zA-Z0-9]/g, '_')}.html`);
    const pdfFile = DriveApp.createFile(blob.getAs("application/pdf"));
    pdfFile.setName(`Surat_Permohonan_Kredensial_${nama.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);

    // 4. Kirim PDF ke email pemohon jika email valid
    if (email && email.includes('@')) {
      MailApp.sendEmail({
        to: email,
        subject: `[RSUD dr. Soedarso] Surat Permohonan Kredensial Resmi - ${nama}`,
        body: `Yth. Sejawat ${nama},\n\nTerima kasih telah mengisi formulir pendaftaran kredensialing. Terlampir berkas Surat Permohonan Kredensial resmi 3 halaman format baku RSUD dr. Soedarso.\n\nSilakan cetak, tanda tangani bersama Kepala Ruangan, lalu unggah kembali ke sistem e-kredensialing pada Langkah 2.\n\nSalam,\nKomite Keperawatan RSUD dr. Soedarso Pontianak`,
        attachments: [pdfFile.getAs(MimeType.PDF)]
      });
    }

  } catch (err) {
    Logger.log("Error generating surat permohonan: " + err.toString());
  }
}
