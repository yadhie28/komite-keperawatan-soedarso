# Portal Terpadu Komite Keperawatan RSUD dr. Soedarso Pontianak

Aplikasi portal web resmi Komite Keperawatan RSUD dr. Soedarso Provinsi Kalimantan Barat yang mengintegrasikan seluruh layanan tata kelola keperawatan: **E-Kredensialing & RKK**, **Mutu Profesi**, **Etik & Disiplin**, **Analitik Data**, **Pusat Regulasi**, serta **E-Voting Pemilihan Ketua Komite Keperawatan Periode 2027–2030** dalam satu sistem terpadu (Single Sign-On).

---

## 🌐 Akses Live (GitHub Pages)

- **URL Produksi Portal:** [https://yadhie28.github.io/komite-keperawatan-soedarso/](https://yadhie28.github.io/komite-keperawatan-soedarso/)
- **Menu Langsung E-Voting:** [https://yadhie28.github.io/komite-keperawatan-soedarso/#evoting](https://yadhie28.github.io/komite-keperawatan-soedarso/#evoting)
- **Repository GitHub:** [https://github.com/yadhie28/komite-keperawatan-soedarso](https://github.com/yadhie28/komite-keperawatan-soedarso)

---

## 📁 Struktur Repositori Terpadu

```text
komite-keperawatan-soedarso/
├── index.html                   # Antarmuka Single Page Application (SPA) utama
├── index.css                    # Desain & tema visual resmi RSUD dr. Soedarso
├── app.js                       # Controller alur kerja, router tab hash, dan state global
├── data.js                      # Master data kewenangan klinis (White Book 2026, 9 rumpun)
├── elogbook.js                  # Modul Buku Catatan Kinerja Klinis Harian (Subkomite Mutu)
├── pemilihan.js                 # Modul E-Voting, bilik suara, bukti memilih, & rekapitulasi
├── supabase_client.js           # Client SDK Supabase, hashing password, & rate limiting
├── supabase_schema.sql          # Skema database PostgreSQL & Security Row-Level Security (RLS)
├── data_pegawai_manifest.js     # Metadata publik 717 tenaga keperawatan & kebidanan (tanpa password)
├── Code.gs                      # Backend Google Apps Script (V8) untuk notifikasi & automasi
├── evoting/                     # Kode sumber aplikasi E-Voting (hasil penggabungan repo)
│   ├── src/                     # Source code Next.js 14 App Router, React 18, TypeScript
│   │   ├── app/                 # Routing Next.js (/voting, /hasil, /admin, /api/*)
│   │   ├── components/          # Komponen UI e-voting
│   │   └── lib/                 # Utilitas autentikasi dan database
│   ├── prisma/                  # Skema database Prisma (schema.prisma, seed.ts)
│   ├── public/                  # Aset publik & preview web interaktif (index.html)
│   ├── index.html               # Pengalihan otomatis ke ../#evoting pada GitHub Pages
│   ├── package.json             # Dependensi Next.js, Prisma, NextAuth, Tailwind
│   └── README.md                # Dokumentasi spesifik modul e-voting
├── .gitignore                   # Proteksi data rahasia (.env, *.csv data pegawai, database lokal)
└── README.md                    # Dokumentasi utama proyek
```

---

## 🔐 Sistem Autentikasi & Keamanan (Single Sign-On)

1. **Satu Login untuk Seluruh Layanan**:
   - Autentikasi hanya memerlukan **NIP / NIPPPK / NIK** dan **Password**.
   - Unit pelayanan dan hak akses dikenali secara otomatis oleh sistem tanpa perlu memilih ruangan secara manual.
2. **Kepatuhan Privasi & UU PDP No. 27/2022**:
   - Sandi diverifikasi menggunakan *cryptographic salt & SHA-256 hash*.
   - Pemisahan mutlak antara **Tabel Partisipasi Pemilih** (siapa yang sudah menggunakan hak suara) dengan **Tabel Kotak Suara** (calon mana yang dipilih) untuk menjamin prinsip **LUBER dan JURDIL** (Langsung, Umum, Bebas, Rahasia, Jujur, dan Adil).
   - Pengguna dengan kata sandi default diwajibkan melakukan penggantian kata sandi baru pada login perdana.
   - Perlindungan *rate-limiting* (penguncian akun sementara setelah 5 kali kesalahan beruntun).

---

## 🗳️ Modul E-Voting Ketua Komite Keperawatan 2027–2030

- **Navigasi Terintegrasi**: Dapat diakses melalui menu navigasi **"E-Voting"** atau hash URL `#evoting` (dengan alias transparan `#pemilihan`).
- **Alur Bilik Suara**:
  1. Identifikasi pemilih & validasi status hak pilih secara real-time.
  2. Masuk bilik suara dan konfirmasi pilihan calon ketua.
  3. Penerbitan **Bukti Telah Memilih** resmi bertanda tangan digital dan kode token unik (tanpa memuat pilihan kandidat untuk menjaga kerahasiaan).
  4. Unduh / cetak bukti suara format resmi.
- **Panel Rekapitulasi**: Quick count perolehan suara real-time, persentase partisipasi DPT, dan rincian partisipasi per unit kerja.

---

## 🛠️ Panduan Menjalankan Secara Lokal

### 1. Menjalankan Portal Terpadu (Static Web)
Gunakan server statis bawaan Python atau VS Code Live Server:
```bash
# Masuk ke direktori proyek
cd komite-keperawatan-soedarso

# Jalankan server lokal:
python3 -m http.server 8080

# Buka di browser:
# http://localhost:8080/
```

### 2. Menjalankan Modul E-Voting Fullstack Next.js (Opsional untuk Pengembangan)
```bash
# Masuk ke subdirektori evoting
cd evoting

# Instal dependensi:
npm install

# Inisialisasi database lokal (SQLite):
npx prisma db push
npx prisma db seed

# Jalankan server pengembangan Next.js:
npm run dev

# Buka di browser:
# http://localhost:3000/
```

---

## 🚀 Deployment ke GitHub Pages

Proyek ini ter-deploy secara otomatis melalui GitHub Pages:
- **Branch Sumber**: `main`
- **Folder**: `/ (root)`
- Setiap pembaruan yang di-push ke branch `main` akan memicu workflow GitHub Actions untuk mempublikasikan versi web terbaru ke `https://yadhie28.github.io/komite-keperawatan-soedarso/`.

---

## ⚖️ Lisensi & Hak Cipta
Hak Cipta © 2026 Komite Keperawatan RSUD dr. Soedarso Pontianak, Provinsi Kalimantan Barat. Dilindungi oleh Undang-Undang.
