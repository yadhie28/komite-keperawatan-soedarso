# 🏥 E-Voting Ketua Komite Keperawatan RSUD dr. Soedarso (2027–2030)

Aplikasi web modern berbasis **Next.js (App Router)**, **Prisma ORM**, **SQLite**, dan **Tailwind CSS** untuk menyelenggarakan pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso Pontianak periode 2027–2030 secara langsung, rahasia, aman, dan transparan.

---

## 🌟 Fitur Utama

1. **Autentikasi & Otorisasi Berjenjang**
   - Login menggunakan **NIP (Nomor Induk Pegawai)** dan password.
   - Dua level pengguna: `ADMIN` (Panitia Pemilihan) dan `VOTER` (Anggota Komite Keperawatan).
   - Dilindungi proteksi rute (`middleware.ts`).

2. **Bilik Suara Digital (Voting)**
   - Menampilkan profil lengkap calon (Foto, Nama, Gelar, NIP, Unit Kerja, Visi & Misi, Riwayat Pengalaman).
   - Dialog konfirmasi sebelum submit suara untuk mencegah kesalahan klik.
   - Enforce aturan **1 voter = 1 suara** menggunakan Prisma Transaction & Unique DB Constraint.

3. **Dashboard Real-time & Hasil Perolehan Suara**
   - Grafik batang perolehan suara per kandidat (Recharts).
   - Diagram lingkaran (pie chart) distribusi persentase suara.
   - Indikator tingkat partisipasi pemilih.
   - Sorotan otomatis untuk kandidat dengan suara terbanyak.

4. **Panel Administrasi Lengkap (`/admin`)**
   - **Manajemen Jadwal Pemilihan:** Mengaktifkan/menonaktifkan voting dan mengatur tanggal mulai & selesai.
   - **Manajemen Kandidat:** Tambah, edit, hapus, dan toggle status keaktifan calon ketua.
   - **Manajemen Pemilih:** Tambah pemilih baru, pencarian pemilih, dan opsi reset suara jika diperlukan panitia.
   - **Monitoring Real-time:** Pantau statistik partisipasi berdasarkan unit instalasi/ruangan.

---

## 📂 Struktur Proyek

```
e-voting-komite-keperawatan/
├── prisma/
│   ├── schema.prisma       # Schema database (User, Candidate, Vote, Election)
│   └── seed.ts             # Data inisialisasi awal (Admin, 3 Calon, 5 Pemilih)
├── src/
│   ├── app/
│   │   ├── admin/          # Panel Admin (Dashboard, Kandidat, Pemilih, Hasil)
│   │   ├── api/            # REST API (auth, vote, candidates, election, voters, results)
│   │   ├── dashboard/      # Dashboard Voter
│   │   ├── hasil/          # Halaman Hasil Perolehan Suara Publik
│   │   ├── login/          # Halaman Login NIP
│   │   ├── voting/         # Bilik Suara Elektronik
│   │   ├── globals.css     # Tema warna RSUD (#1e3a5f) & utility styles
│   │   ├── layout.tsx      # Root Layout dengan SessionProvider
│   │   └── page.tsx        # Landing Page RSUD dr. Soedarso
│   ├── components/
│   │   ├── Navbar.tsx      # Navigasi responsif
│   │   └── SessionProvider.tsx
│   ├── lib/
│   │   ├── auth.ts         # Konfigurasi NextAuth.js (Credentials Provider)
│   │   └── prisma.ts       # Singleton Prisma Client
│   └── middleware.ts       # Proteksi route (voter & admin guards)
├── .env                    # Variabel environment & path SQLite
└── package.json
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Prasyarat
Pastikan komputer Anda sudah terpasang **Node.js** (versi 18.x atau lebih baru) dan `npm`.

### 2. Instalasi Dependensi
Buka terminal pada direktori proyek:
```bash
cd /Users/rusmulyadiiskandar/.gemini/antigravity/scratch/e-voting-komite-keperawatan
npm install
```

### 3. Setup Database & Seeding
Jalankan migrasi database SQLite dan isi data awal:
```bash
npx prisma db push
npx prisma db seed
```

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Akun Demo Bawaan (Hasil Seeding)

### 👑 Akun Administrator (Panitia)
- **NIP:** `ADMIN001`
- **Password:** `admin123`
- **Akses:** Akses penuh ke seluruh fitur dan panel `/admin`

### 👥 Contoh Akun Pemilih (Voter)
| Nama Pemilih | NIP | Password | Unit Kerja |
| :--- | :--- | :--- | :--- |
| Ns. Rina Marlina, S.Kep. | `000000000000000000` | `voter123` | Rawat Inap Penyakit Dalam |
| Ns. Bambang Irawan, S.Kep. | `000000000000000000` | `voter123` | IGD |
| Ns. Nurul Hidayati, S.Kep. | `000000000000000000` | `voter123` | Ruang Operasi (OK) |
| Ns. Hendra Gunawan, S.Kep. | `000000000000000000` | `voter123` | Rawat Inap Anak |
| Ns. Sri Wahyuni, A.Md.Kep. | `000000000000000000` | `voter123` | Rawat Jalan / Poliklinik |

---

## 🏛️ Calon Ketua Komite Keperawatan 2027–2030 (Data Demo)
1. **Ns. Siti Rahmawati, S.Kep., M.Kep.** (Mantan Ka. Ruang ICU & Waka Komite)
2. **Ns. Muhammad Fadli Hidayat, S.Kep., Sp.KMB.** (Ka. Instalasi Ranap Bedah & Spesialis KMB)
3. **Ns. Dewi Kartika Sari, S.Kep., M.Kep.** (Koordinator Diklat Keperawatan)

