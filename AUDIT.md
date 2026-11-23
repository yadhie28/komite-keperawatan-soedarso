# AUDIT.md — Audit Komprehensif Arsitektur, Keamanan, & Peta Fungsi
## Portal Terpadu Komite Keperawatan RSUD dr. Soedarso Pontianak
**Tanggal Audit:** 23 November 2026  
**Auditor:** Senior Full-Stack Engineer & QA Lead  
**Target:** Repositori Privat `yadhie28/komite-keperawatan-soedarso` (Hosting GitHub Pages)

---

## 1. PETA FUNGSI UTAMA (FUNCTION ARCHITECTURE MAP)

| Modul / File | Fungsi Utama | Peran & Akses | Keterangan & Ketergantungan |
| :--- | :--- | :--- | :--- |
| **`app.js`** | `switchTab(tabId)`, `setupNavigation()` | Publik / Semua | Router navigasi berbasis hash (`#beranda`, `#kredensial`, `#mutu`, `#etik`, `#analitik`, `#regulasi`, `#evoting`) |
| | `openLoginModal(tab)`, `handleUnifiedPortalLogin(e)` | Publik | Autentikasi terpadu NIP/NIK + Password, verifikasi peran |
| | `logoutUser()` | Terotentikasi | Pembersihan sesi, reset state memori & UI ke keadaan tamu |
| | `toggleGantiPasswordForm(isMandatory)`, `simpanGantiPassword(e)` | User / Wajib | Penegakan ganti kata sandi awal bagi akun baru / sandi bawaan |
| | `canAccess(role, resource)` | Sistem | Pengendalian otorisasi berbasis peran (Role-Based Access Control / RBAC) |
| | `startSessionInactivityTimer()`, `checkSessionLockout()` | Sistem | Auto-lock sesi 15 menit jika tidak ada aktivitas pengguna |
| | `renderNursesTable()`, `filterNurseTable()` | Publik / Subkomite | Tampilan tabel registri kredensial tenaga keperawatan |
| | `openNewKredensialModal()`, `goToWizardStep(step)` | Pengusul / Perawat | Alur 6 langkah pengajuan kredensialing mandiri |
| | `generateCurriculumVitaePDF()` | Pengusul | Cetak/Preview CV resmi format RSUD dr. Soedarso (Langkah 1) |
| | `generateLogbookKinerjaPDF()` | Pengusul | Cetak/Preview Logbook 10 tindakan diverifikasi Ka.Ru (Langkah 2) |
| | `generateSuratPermohonanPDF()` | Pengusul | Cetak/Preview Surat Permohonan Kredensial mandiri (Langkah 3) |
| | `generateRkkAsesmenPDF()` | Pengusul | Cetak/Preview Asesmen Mandiri RKK 9 rumpun (Langkah 4) |
| | `generateFormulirPsvPDF()` | Pengusul / Subkomite | Cetak/Preview Formulir Primary Source Verification (Langkah 5) |
| | `simpanUnggahanBerkasFinal()` | Pengusul | Penyelesaian akhir 8 berkas persyaratan wajib (Langkah 6) |
| | `recordAdminNotification()`, `openWorkflowNotifModal()` | Subkomite / Admin | Pusat notifikasi alur kerja antarsubkomite |
| **`pemilihan.js`** | `PemilihanKomkep.init()` | Terotentikasi | Inisialisasi tampilan bilik suara, status DPT, dan hasil |
| | `PemilihanKomkep.enterBooth()` | Pemilih Sah | Validasi hak pilih & penerbitan **Bukti Masuk Bilik Suara** |
| | `PemilihanKomkep.castVote(candidateId)` | Pemilih Sah | Transaksi pemilihan suara sah & penerbitan **Bukti Telah Memilih** |
| | `PemilihanKomkep.printVoteReceipt()` | Pemilih Sah | Cetak tanda terima resmi ber-token unik tanpa pilihan kandidat |
| | `PemilihanKomkep.toggleElection()` | Panitia / Admin | Pengaturan status jendela pemilihan (Buka, Jeda, Tutup) |
| | `PemilihanKomkep.resetVotes()` | Panitia / Admin | Reset data suara simulasi dengan konfirmasi 2 langkah |
| **`supabase_client.js`** | `SupabaseKomkep.hashPassword(pwd, salt)` | Sistem | Hashing kriptografis SHA-256 + garam (Web Crypto API) |
| | `SupabaseKomkep.login(nip, password)` | Publik | Verifikasi kredensial, proteksi brute-force (max 5x gagal) |
| | `SupabaseKomkep.checkElectionSchedule()` | Sistem | Sinkronisasi jadwal pemilihan dengan waktu server |
| | `SupabaseKomkep.recordBallotAnon()`, `recordReceipt()` | Pemilih Sah | Pemisahan mutlak tabel partisipasi vs tabel kotak suara |
| **`elogbook.js`** | `ELogbookKomkep.init()` | Perawat / Karu | Modul Catatan Kinerja Klinis Harian Subkomite Mutu |
| | `renderLogbookEntries()`, `simpanEntriLogbook()` | Perawat / Karu | Pencatatan tindakan asuhan berbasis 4 komponen SIKI (O, T, E, K) |
| **`data.js`** | Master Data Ruangan, SK, Pejabat, RKK | Global | Sumber data statis buku putih, regulasi, dan struktur organisasi |
| **`Code.gs`** | `doGet(e)`, `doPost(e)` | Backend GAS | API backend Google Apps Script untuk Google Sheets Komite |

---

## 2. PETA STATE & KUNCI LOCALSTORAGE

Berikut daftar seluruh kunci penyimpanan lokal (`localStorage`) yang digunakan di portal:

| Kunci LocalStorage | Tipe Data | Tujuan & Isi | Sensitivitas |
| :--- | :--- | :--- | :--- |
| `komite_auth_user` | JSON Object | Sesi pengguna aktif: NIP, Nama, Role, Unit, Status Sandi | **Tinggi** (Identitas Sesi) |
| `komite_theme` | String (`'light'`/`'dark'`) | Preferensi tema visual antarmuka | Rendah |
| `komite_cv_generated` | Boolean (`'true'`/`'false'`) | Penanda status penyelesaian Langkah 1 (CV) | Sedang |
| `komite_logbook_generated`| Boolean | Penanda status penyelesaian Langkah 2 (Logbook) | Sedang |
| `komite_surat_generated` | Boolean | Penanda status penyelesaian Langkah 3 (Surat) | Sedang |
| `komite_rkk_submitted` | Boolean | Penanda status penyelesaian Langkah 4 (RKK) | Sedang |
| `komite_psv_generated` | Boolean | Penanda status penyelesaian Langkah 5 (PSV) | Sedang |
| `komite_berkas_uploaded` | Boolean | Penanda status penyelesaian Langkah 6 (Upload Berkas) | Sedang |
| `komite_cv_data` | JSON Object | Draft data form Curriculum Vitae pemohon | Sedang |
| `komite_logbook_data` | JSON Object | Draft data form Logbook Kinerja Klinis | Sedang |
| `komite_applicant_data` | JSON Object | Profil pengusul aktif dalam sesi pengajuan kredensial | Sedang |
| `komite_registered_pengusul` | JSON Array | Cache profil pengusul untuk operasi luring | Sedang |
| `komite_custom_admin_profiles` | JSON Object | Cache pembaruan profil administrator lokal | Sedang |
| `komite_nurses` | JSON Array | Cache data perawat & bidan lokal | **Tinggi** (Data Pegawai) |
| `komite_audits` | JSON Array | Data laporan audit mutu asuhan keperawatan | Sedang |
| `komite_ethics_tickets` | JSON Array | Data tiket aduan etik dan disiplin profesi | **Tinggi** (Kerahasiaan Etik) |
| `komite_admin_notifications` | JSON Array | Riwayat notifikasi administrasi email | Sedang |
| `komite_workflow_notifications` | JSON Array | Riwayat notifikasi alur kerja antar-subkomite | Sedang |
| `komite_security_audit_logs` | JSON Array | Log peristiwa keamanan (login, lockout, ubah sandi) | **Tinggi** (Audit Trail) |
| `komkep_password_hashes` | JSON Object | Cache pembaruan hash sandi lokal | **Kritis** (Hash Kredensial) |
| `komkep_passwords_changed` | JSON Array | Daftar NIP yang telah mengganti kata sandi default | Sedang |
| `komkep_login_attempts` | JSON Object | Pelacak kegagalan login untuk rate limiting & lockout | Sedang |
| `komkep_booth_logs` | JSON Array | Log stempel waktu akses masuk bilik suara e-voting | Sedang |
| `komkep_sim_voters` | JSON Object | Tanda terima partisipasi pemilih (tanpa pilihan calon) | **Tinggi** (Daftar Hadir) |
| `komkep_sim_ballots` | JSON Array | Kotak suara anonim (pilihan kandidat tanpa ID pemilih)| **Kritis** (Kerahasiaan Suara) |

---

## 3. ANALISIS DATA TEREXPOS & CELAH KEAMANAN HOSTING STATIS

### a. Keterbatasan Keamanan Sisi Klien pada Hosting Statis (GitHub Pages)
Meskipun repositori Git bersifat **privat**, seluruh aset yang berada di cabang publikasi (`main` root) dapat diakses oleh siapa saja di internet melalui peramban web pada URL `https://yadhie28.github.io/komite-keperawatan-soedarso/`.
Oleh karena itu:
1. **Tidak Boleh Menyimpan File Data Pribadi Statis**: File seperti `data_pegawai_manifest.js` (memuat daftar 717 NIP/NIK/Nama), file CSV, SQL seed, atau hash password yang ditaruh di repositori dapat diunduh langsung oleh publik tanpa autentikasi.
2. **Tidak Ada Rahasia di Sisi Klien**: Kode JavaScript yang berjalan di peramban pengguna dapat dibaca secara transparan melalui *Developer Tools*. Seluruh verifikasi izin (authorization) di sisi klien hanya berfungsi sebagai panduan antarmuka (*UI Guard*); penegakan izin yang sesungguhnya harus berada di backend.

### b. Bagian yang Sebelumnya Terekspos / Masalah yang Ditemukan:
1. **Ekspos Data Pribadi Pegawai di Klien**:
   - `data_pegawai_manifest.js` memuat daftar lengkap 717 tenaga keperawatan dan kebidanan secara publik.
2. **Ekspos Alamat Email Pribadi di Antarmuka Publik**:
   - String `yadhie28@gmail.com` ditemukan di lebih dari **25 lokasi** (header, footer, meta tag, mailto, compose link, data notifikasi, dan skrip integrasi).
3. **Data Demo & Mock Berstatus Hardcoded**:
   - Nama demo: `Ns. Hendra Kurniawan, S.Kep` (pada CV, Logbook, Surat, PSV, Verifikasi Berkas).
   - Nama demo: `Ns. Desi Ratnasari, S.Kep` (pada SPK 2024 dan Karu Ruang Enggang Gading 2).
   - Nama demo: `Ns. Siti Rahmah, S.Kep` (pada entri default E-Logbook Mutu).
   - Statistik statis tidak nyata pada hero beranda: `485+`, `94,2%`, `100%`, dan `SKP 22/25`.
   - Tombol pengisian contoh: *"Muat Contoh Data Sah"* dan *"Isi File Contoh (Simulasi Demo)"*.
4. **Bypass Autentikasi / Preset Akun di UI**:
   - Tombol *"Login Preset"* dan *"Pilih Akun Cepat"* menampilkan pilihan login tanpa memasukkan sandi.
   - Banner atas menampilkan teks *"Mode Administrator Aktif: M. Separia Russanto, S.Kep., Ns (Ketua Komite)"* secara permanen kepada tamu yang belum login.
   - Placeholder kata sandi menampilkan teks plaintext: `REDACTED_PASSWORD`.
5. **Pelanggaran Kerahasiaan Suara pada Script Apps Script Lama**:
   - Pada `google_apps_script_pemilihan_komkep.js`, tabel log suara menyimpan `Nama Lengkap Pemilih`, `NIP Pemilih`, dan `Nama Calon Ketua Dipilih` dalam **satu baris yang sama**. Ini melanggar prinsip kerahasiaan suara (LUBER).
   - Tidak adanya `LockService` di Google Apps Script sehingga rentan *race condition* (suara ganda).
6. **Inkonsistensi Master Data Ruangan & Pejabat**:
   - Masih terdapat nama ruangan lama: *Ruai, Murai, Enggang Gading 1, Enggang Gading 2*.
   - Label *"Ruang Rawat Inap Bedah (Kakap)"* belum disesuaikan menjadi *"Kakap (Penyakit Dalam)"*.
   - Total tempat tidur di formulir PSV keliru (545/55/53/51).
   - Nama Direktur memiliki 3 variasi berbeda (*dr. Hary Agung Tjahyadi*, *Hary Agung Tjahyadi*, *drg. Harry Agung Tjahyadi, M.Kes.*) dengan NIP berbeda-beda.
   - Spasi nyasar pada penulisan nomor SK: `SK/ 280801 /RSUD/2026`.
   - Penomoran langkah kredensial di Pusat Notifikasi terbalik (Langkah 4 dan 5).
7. **Tautan Mati & Navigasi**:
   - Tautan canonical dan og:url menunjuk ke `#kredensial`, bukan ke beranda/root portal.
   - Navigasi default saat pertama kali dibuka adalah `#kredensial`, seharusnya `#beranda`.

---

## 4. REKOMENDASI ARSITEKTUR BACKEND (GOOGLE APPS SCRIPT + GOOGLE SHEETS)

Untuk mengatasi keterbatasan hosting statis, seluruh data sensitif dialihkan ke backend:
1. **Google Apps Script Terpusat (`Code.gs`)**:
   - Bertindak sebagai REST API terotentikasi via token sesi / API key internal.
   - Mengelola sheet database terpisah di Google Drive Komite Keperawatan:
     * `Users`: Pengelolaan kredensial (NIP/NIK, salted SHA-256 hash password, role, mustChangePassword).
     * `Profil_Perawat`: Master data 717 pegawai dengan validasi ketat.
     * `Voting_Partisipasi`: Log kehadiran/tanda terima bilik suara (NIP, Waktu, Token Unik Sah).
     * `Voting_Kotak_Suara`: Tabulasi pilihan suara calon ketua murni tanpa atribut pemilih.
     * `Audit_Trail`: Log pencatatan aktivitas penting dan perubahan sistem.
2. **Pencegahan Suara Ganda Server-Side**:
   - Memanfaatkan `LockService.getScriptLock()` dengan timeout 30 detik pada Google Apps Script untuk menjamin atomisitas transaksi pemilihan suara.
3. **Penyembunyian Data Pribadi dari Static Web Build**:
   - Menghapus pemuatan statis `data_pegawai_manifest.js` dari klien publik, atau menggantinya dengan pemanggilan API terotentikasi saat user berhasil login.
   - Menjamin 0 kemunculan email pribadi pengembang di seluruh file yang terpublikasi.

---

## 5. RENCANA KERJA TAHAP BERIKUTNYA

Dengan selesainya audit komprehensif pada **Fase 0**, pekerjaan dilanjutkan ke:
- **Fase 1**: Pembersihan data demo, standardisasi master ruangan 749 TT, nama resmi Direktur, dan sanitasi email.
- **Fase 2**: Pengetatan autentikasi, eliminasi preset akun, dan penegakan wajib ganti password.
- **Fase 3**: Penstabilan beranda, banner pemilihan dinamis, dan perbaikan routing hash.
- **Fase 4**: Pembaruan sistem e-voting (Apps Script dengan LockService, pemisahan tabel suara, dan berita acara dinamis).
- **Fase 5**: Penyelarasan UI tema teal `#074744`, perbaikan modal, dan aksesibilitas.
- **Fase 6**: Pengujian menyeluruh 12 skenario dan penyusunan `TEST_REPORT.md`.
