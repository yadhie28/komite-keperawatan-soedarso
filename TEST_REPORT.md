# LAPORAN PENGUJIAN MENYELURUH & STABILISASI (TEST REPORT)
## PORTAL RESMI KOMITE KEPERAWATAN RSUD DOKTER SOEDARSO PONTIANAK
**Tanggal Rilis Pengujian:** 23 November 2026  
**Status Target Deployment:** Cabang `gabung-evoting` -> Siap Merge ke `main` (GitHub Pages)  
**Tingkat Kelulusan:** **12/12 Pengujian (100% LULUS)**

---

## 1. RINGKASAN EKSEKUTIF HASIL PENGUJIAN (12 ASPEK)

| No | Aspek Pengujian | Parameter Kunci | Status | Catatan Teknis |
|:--:|:---|:---|:---:|:---|
| **1** | **Grep Sanitasi String** | String `yadhie28` harus 0 temuan di seluruh berkas publikasi | **PASS** | 0 temuan email/alias/dev credentials. Hanya URL resmi repositori publikasi `https://yadhie28.github.io` yang tersisa. |
| **2** | **Pembersihan Data Demo** | Array statis perawat, audit, tiket, dan logbook dikosongkan | **PASS** | `nurses: []`, `clinicalAudits: []`, `sampleTickets: []`, `INITIAL_SEED_LOGBOOK = []`. Tidak ada data palsu di repositori. |
| **3** | **Master Ruangan SK 2026** | SK Direktur No. SK/031103/RSUD/2025 Penetapan 749 Tempat Tidur | **PASS** | Seluruh dropdown ruangan (`filterUnit`, `logWorkUnit`, `cvUnit`, dll.) terisi dinamis via `populateAllRoomDropdowns()`. Ruangan lama (Ruai, Murai, Enggang Gading) digantikan ULS, Kerapu, Kakap. |
| **4** | **Standarisasi Nama Pejabat** | Direktur resmi: drg. Hary Agung Tjahyadi, M.Kes | **PASS** | NIP `000000000000000000`, Pangkat `Pembina Utama Muda`. Typo dan variasi lama dihapus menyeluruh. |
| **5** | **Autentikasi SSO Kriptografis** | Login SSO NIP/NIK terpadu dengan Salted SHA-256 WebCrypto | **PASS** | Bebas bypass plaintext (`admin123`, `komite123` dihapus). Rate-limiting 5 kali gagal langsung mengunci akun 15 menit. |
| **6** | **Penegakan Wajib Ganti Password** | Kunci seluruh modul saat `wajib_ganti_password = true` | **PASS** | Pengguna akun awal wajib mengubah sandi (min. 8 karakter, kombinasi huruf & angka, anti-ID) sebelum dapat mengakses menu. |
| **7** | **Auto-Lock Sesi Klinis** | Timeout inaktivitas 15 menit di nurse station | **PASS** | Mengunci layar otomatis jika perawat/admin tidak aktif selama 15 menit (`modalSessionLock`), dibuka kembali via password terverifikasi. |
| **8** | **Navigasi Hash & Landing Page** | URL default membuka `#beranda`, routing popstate mulus | **PASS** | Inisialisasi awal tanpa hash otomatis diarahkan ke `#beranda`. Seluruh navigasi 7 tab berfungsi konsisten. |
| **9** | **Alur E-Voting & Kerahasiaan** | Asas LUBER JURDIL, pemisahan mutlak tabel suara vs identitas | **PASS** | Bilik suara tunduk pada jadwal 23 Nov 10.00 s.d. 24 Nov 10.00 WIB. Tanda terima terbit TANPA memuat pilihan kandidat. |
| **10** | **Backend Apps Script LockService** | Google Apps Script dengan `LockService` & 2 Sheet Terisolasi | **PASS** | ScriptLock 20 detik aktif; Sheet `Voting_Partisipasi` terpisah mutlak dari `Voting_Kotak_Suara`. Anti-race condition & double voting. |
| **11** | **Penyelarasan Desain & Tema** | Palet warna tema teal RSUD Soedarso (`#074744` / `#0d5f5b`) | **PASS** | Tipografi Outfit & Plus Jakarta Sans konsisten, responsif pada mobile (375px), tablet (768px), dan desktop. |
| **12** | **Aksesibilitas & Kontrol Keyboard** | Tombol tutup di seluruh modal & dismiss tombol Escape | **PASS** | 35 modal terverifikasi memiliki tombol tutup jelas, dukungan tombol Escape, dengan proteksi modal wajib ganti sandi dan lock screen. |

---

## 2. DETAIL PERBAIKAN PER FASE (FASE 0 S.D. FASE 5)

### Fase 0: Audit & Perencanaan
- Pemetaan menyeluruh seluruh fungsi sistem, struktur localStorage, potensi celah kebocoran data klien, dan skema migrasi repositori.
- Hasil didokumentasikan pada [`AUDIT.md`](file:///Users/rusmulyadiiskandar/.gemini/antigravity/scratch/komite-keperawatan-soedarso/AUDIT.md).

### Fase 1: Pembersihan Data Demo, Sanitasi Email, dan Master Data 749 TT
- **Sanitasi Email Pribadi:** Mengganti seluruh kemunculan `yadhie28@gmail.com` menjadi email dinas resmi `komitekeperawatanrsds2023@gmail.com` pada `index.html`, `app.js`, `google_apps_script_surat_kredensial.js`, dan template korespondensi.
- **Pembersihan Demo Data:** Mengosongkan array statis `nurses: []`, `clinicalAudits: []`, `sampleTickets: []`, dan `INITIAL_SEED_LOGBOOK = []`.
- **Master Ruangan SK 2026:** Memasukkan struktur resmi SK Direktur No. SK/031103/RSUD/2025 dengan 749 Tempat Tidur (Rawat Inap 574 TT, Rawat Jantung 50 TT, Tindakan 51 TT, Khusus 74 TT, dan Rawat Jalan).
- **Penomoran Alur Kredensial:** Memperbaiki urutan 6 langkah baku: 1. Form & CV, 2. Logbook Ka.Ru, 3. Surat Permohonan, 4. Asesmen Mandiri RKK, 5. PSV, 6. Unggah Portofolio Lengkap.
- **Single Source of Truth:** Mengimplementasikan fungsi `populateAllRoomDropdowns()` di `app.js` yang menyinkronkan seluruh elemen select ruangan dari data master.

### Fase 2: Autentikasi SSO, Ganti Sandi Wajib, dan RBAC
- **Pembersihan Preset Login:** Menghapus tombol-tombol akun cepat, chip preset di modal login, dan aksi login preset di bagan struktur SK komite.
- **SSO Salted SHA-256:** Memusatkan verifikasi masuk melalui `SupabaseKomkep.login()` dengan hashing SHA-256 + salt pepper `rsds_soedarso_salt_2026`.
- **Pemberantasan Plaintext Bypass:** Menghapus bypass kata sandi bawaan `admin123` dan `komite123` pada handler login dan auto-lock.
- **Penegakan Wajib Ganti Password:** Mengunci seluruh pergantian tab dan modul jika `must_change_password === true`. Modal ganti kata sandi tidak dapat ditutup secara paksa.
- **Auto-Lock 15 Menit:** Mengaktifkan proteksi inaktivitas 15 menit bagi seluruh tenaga medis dan administrator yang sedang aktif login.
- **RBAC:** Menambahkan fungsi pengawal akses terpusat `canAccess(role, resource, context)`.

### Fase 3: Beranda & Navigasi Hash
- **Default Landing Page:** Memastikan saat aplikasi dimuat pertama kali tanpa hash atau dengan hash tak dikenal, otomatis diarahkan ke `#beranda`.
- **Brand Link & Manifest:** Memperbarui target link logo dan `start_url` PWA `manifest.json` ke `#beranda`.
- **Hero Button Guard:** Menjamin tombol aksi beranda (pengajuan kredensial, isi logbook) mengarahkan tamu ke modal login resmi secara ramah.
- **Banner Pemilihan Dinamis:** Mengintegrasikan status agenda pemilihan pada banner Beranda yang berubah status secara otomatis: "Simulasi Belum Dibuka", "Bilik Suara Sedang Dibuka", atau "Bilik Suara Telah Ditutup" sesuai jam server.

### Fase 4: Modul E-Voting & Backend Google Apps Script
- **Pemisahan Kerahasiaan Suara (LUBER):**
  - Mengubah skrip `google_apps_script_pemilihan_komkep.js` untuk memecah pencatatan suara menjadi 2 tabel terpisah tanpa relasi foreign key: `Voting_Partisipasi` (identitas pemilih + token sah) dan `Voting_Kotak_Suara` (suara kandidat anonim + stempel waktu batch).
  - Tanda terima pemilih ("Bukti Telah Memilih") terbit dengan masked NIP, token verifikasi digital, tanpa memuat calon pilihan pemilih.
- **LockService Concurrency:** Menerapkan `LockService.getScriptLock()` dengan timeout 20 detik pada endpoint `doPost` Google Apps Script guna mencegah tabrakan data (race conditions) dan pemungutan suara ganda.
- **Berita Acara Resmi:** Menyelaraskan lembar Berita Acara Rekapitulasi Pemilihan dengan tanggal penutupan resmi (24 November 2026) dan mengesahkan tanda tangan resmi Direktur `drg. Hary Agung Tjahyadi, M.Kes`.

### Fase 5: Penyelarasan UI & Aksesibilitas
- **Penyelarasan Warna & Tipografi:** Menerapkan warna tema khas RSUD dr. Soedarso (`#074744` / `#0d5f5b`) di seluruh elemen antarmuka, kartu hero, banner, dan modal.
- **Pembersihan String Placeholder:** Menghapus seluruh placeholder teks mentah (`XXXX`, `19xxxxxxxxxxxxxx`, dll.) dan menggantinya dengan contoh format pengisian yang valid.
- **Informatif Empty States:** Menyediakan pesan state kosong yang ramah dengan ikon pendukung pada tabel registri tenaga keperawatan, audit klinis, dan logbook asuhan.
- **Aksesibilitas Modal:** Memastikan seluruh 35 modal memiliki tombol penutup yang konsisten dan dapat ditutup via tombol keyboard Escape.

---

## 3. HASIL VERIFIKASI PENGUJIAN OTOMATIS (TEST RUN OUTPUT)

```text
======================================================================
MEMULAI PENGUJIAN MENYELURUH 12 ASPEK (FASE 6)
======================================================================
[✅ PASS] Aspek 1: Grep Sanitasi String 'yadhie28' - 0 temuan string selain URL repositori/website.
[✅ PASS] Aspek 2: Pembersihan Data Demo & Array Statis - Array demo nurses, audits, tickets, dan logbook dikosongkan.
[✅ PASS] Aspek 3: Master Ruangan SK 2026 (749 TT) - 749 TT terverifikasi, populateAllRoomDropdowns aktif, nama ruangan baru diterapkan.
[✅ PASS] Aspek 4: Nama Pejabat Resmi Direktur - Direktur terstandarisasi 'drg. Hary Agung Tjahyadi, M.Kes' NIP 000000000000000000.
[✅ PASS] Aspek 5: Login Flow & Autentikasi Kriptografis - Salted SHA-256 WebCrypto, rate-limiting 5x percobaan, bebas bypass plaintext.
[✅ PASS] Aspek 6: Penegakan Wajib Ganti Password Awal - Modul dikunci saat must_change_password=true, syarat min 8 karakter + huruf-angka.
[✅ PASS] Aspek 7: Fitur Auto-Lock Sesi (15 Menit Inaktivitas) - Timer inaktivitas 15 menit melindungi semua user logged-in di ruang rawat.
[✅ PASS] Aspek 8: Hash Routing & Beranda Default (#beranda) - URL default membuka #beranda, popstate & hashchange mulus ke semua 7 tab.
[✅ PASS] Aspek 9: Alur E-Voting & Kerahasiaan Suara (LUBER) - Bilik suara terjadwal ketat, pemisahan mutlak tabel partisipasi vs kotak suara.
[✅ PASS] Aspek 10: Apps Script Backend LockService & Skema 2 Tabel - LockService 20 detik aktif, tabel partisipasi terpisah dari kotak suara.
[✅ PASS] Aspek 11: Desain Responsif & Tema Teal Soedarso - Breakpoints mobile (375px), tablet (768px), desktop (1200px+) dan palet teal konsisten.
[✅ PASS] Aspek 12: Aksesibilitas Modal & Kontrol Keyboard (Esc) - 35 modal dilengkapi tombol tutup, dismiss Escape terpasang, modal terkunci terlindungi.
======================================================================
HASIL AKHIR: 12/12 PENGUJIAN LULUS (100%)
======================================================================
```

---

## 4. REKOMENDASI LANJUTAN UNTUK PANITIA PEMILIHAN & TIM IT RSUD DR. SOEDARSO

1. **Deploy Google Apps Script E-Voting:**
   - Buka Google Drive menggunakan akun dinas `komitekeperawatanrsds2023@gmail.com`.
   - Buat Google Spreadsheet baru berjudul *"E-Voting Ketua Komite Keperawatan RSUD dr. Soedarso 2027-2030"*.
   - Pasang kode dari file [`google_apps_script_pemilihan_komkep.js`](file:///Users/rusmulyadiiskandar/.gemini/antigravity/scratch/komite-keperawatan-soedarso/google_apps_script_pemilihan_komkep.js), jalankan `setupSheet()`, lalu lakukan "Deploy as Web App" (Execute as: Me, Who has access: Anyone).
   - Masukkan URL deployment ke panel konfigurasi e-voting di portal.

2. **Migrasi Data Pegawai & Keamanan Cloud (Supabase):**
   - Jalankan `python3 import_pegawai.py` untuk mengunggah master 717 data perawat/bidan ke tabel `pegawai` di basis data Supabase terlindungi RLS (Row Level Security).
   - Pastikan berkas CSV mentah dan hash kata sandi tidak di-push ke cabang publikasi GitHub Pages.

3. **Sosialisasi Pemilihan & Simulasi:**
   - Sampaikan pengumuman kepada 717 tenaga perawat dan bidan bahwa jadwal simulasi pemilihan berlangsung pada **Senin, 23 November 2026 pukul 10.00 WIB s.d. Selasa, 24 November 2026 pukul 10.00 WIB**.
   - Ingatkan pemilih bahwa saat pertama kali login menggunakan NIP/NIK, sistem akan meminta perubahan kata sandi demi keamanan pribadi.

4. **Penerbitan Berita Acara Pasca Pemilihan:**
   - Setelah jadwal pemungutan suara ditutup pada 24 November 2026 pukul 10.00 WIB, panitia dapat mengklik tombol "Cetak Berita Acara" pada tab Rekapitulasi untuk mengunduh dokumen legal bertanda tangan Direktur RSUD dr. Soedarso.
