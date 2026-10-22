# Portal E-Kredensialing & Asesmen Komite Keperawatan RSUD dr. Soedarso Pontianak

Aplikasi portal resmi Komite Keperawatan RSUD dr. Soedarso Provinsi Kalimantan Barat untuk memfasilitasi kredensialing, rekredensialing, pemetaan kewenangan klinis (White Book 2026), logbook kinerja asuhan, verifikasi dokumen sumber primer (PSV), dan pelacakan status penugasan klinis (SPK/RKK) secara real-time.

---

## 🌐 Akses Live (GitHub Pages)
- **URL Produksi:** [https://yadhie28.github.io/komite-keperawatan-soedarso/](https://yadhie28.github.io/komite-keperawatan-soedarso/)
- **Repository GitHub:** [git@github.com:yadhie28/komite-keperawatan-soedarso.git](git@github.com:yadhie28/komite-keperawatan-soedarso.git)
- **Git Checkpoint Tag:** `checkpoint-20261022` (Commit: `8b31b69`)

---

## 📌 Alur 6 Langkah Kredensialing Mandiri

1. **Langkah 1**: Form & Download Curriculum Vitae (CV) Resmi (PDF 3 Halaman A4 format RSUD dr. Soedarso).
2. **Langkah 2**: Form & Download Buku Catatan Kinerja Klinis Harian (Logbook) (PDF 2 Halaman A4 tervalidasi Kepala Ruangan).
3. **Langkah 3**: Form & Download Surat Permohonan Kredensial Resmi (PDF 3 Halaman A4 bertanda tangan mandiri pemohon).
4. **Langkah 4**: Pengisian & Cetak Asesmen Mandiri RKK Online (PDF 3 Halaman A4 sesuai White Book 2026, 9 Rumpun Keperawatan).
5. **Langkah 5**: Verifikasi Dokumen Sumber Primer (Primary Source Verification - PSV) Matriks 2 Halaman A4 standar KARS STARKES & PMK 49/2013.
6. **Langkah 6 (Final)**: Unggah Berkas Persyaratan Lengkap & Dokumen Permohonan Bertanda Tangan.

---

## 📋 8 Berkas Persyaratan Wajib Kredensialing (Langkah 6)

Sesuai standar akreditasi KARS STARKES (Bab KPS 10 & 11) dan regulasi RSUD dr. Soedarso:
1. **Salinan Ijazah Keperawatan/Kebidanan Terakhir Terlegalisir** (`uploadFileIjazah`)
2. **Salinan Surat Tanda Registrasi (STR) yang Masih Aktif Secara Hukum** (`uploadFileStr`)
3. **Salinan SIPP / SIPB** (`uploadFileSipp`)
4. **Salinan Sertifikat Pelatihan Khusus Keperawatan/Kebidanan (ICU/OK/HD/dll.)** (`uploadFileSertifikat`)
5. **Tangkapan Layar Bukti Pendidikan Keperawatan/Kebidanan Terakhir dari PDDikti** (`uploadFilePddikti`) - [https://pisn.kemdiktisaintek.go.id/](https://pisn.kemdiktisaintek.go.id/)
6. **Surat Keterangan Sehat dari Dokter Pemerintah** (`uploadFileKetSehat`)
7. **Asli Buku Logbook Kinerja Klinis Harian (Telah Diverifikasi Kepala Ruangan)** (`uploadFileLogbook`)
8. **Curriculum Vitae / Daftar Riwayat Hidup** (`uploadFileCv`)

*Disertai unggahan dokumen pengajuan sistem bertanda tangan:*
- **No. 9**: Scan Surat Permohonan Kredensial Bertanda Tangan (Langkah 3)
- **No. 10**: Scan Dokumen RKK Resmi Asesmen Mandiri Bertanda Tangan (Langkah 4)
- **No. 11**: Scan Formulir PSV (Langkah 5)

---

## 🛠️ Cara Menjalankan Secara Lokal

Buka terminal pada direktori proyek, lalu jalankan server web statis:
```bash
# Menggunakan Python 3:
python3 -m http.server 8080

# Lalu buka di browser:
# http://localhost:8080/
```

---

## 🔄 Cara Melanjutkan & Memperbarui Proyek di Kemudian Hari

1. **Buka Direktori Proyek**:
   ```bash
   cd /Users/rusmulyadiiskandar/.gemini/antigravity-ide/scratch/komite-keperawatan-soedarso
   ```
2. **Periksa Status Git**:
   ```bash
   git status
   ```
3. **Jika Ingin Mengembalikan ke Checkpoint Ini**:
   ```bash
   git checkout checkpoint-20261022
   ```
4. **Deploy Perubahan Baru ke GitHub Pages**:
   ```bash
   git add .
   git commit -m "update: keterangan perubahan"
   git push origin main
   ```
