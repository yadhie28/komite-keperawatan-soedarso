# Panduan Langkah Demi Langkah: Memasang Server Google Sheet & Apps Script

Panduan ini ditulis khusus agar mudah diikuti tanpa pengetahuan teknis. Ikuti langkah bernomor di bawah ini secara berurutan.

> [!IMPORTANT]
> **File data pemilih dan kata sandi panitia sudah disiapkan di komputer Anda** di dalam folder:
> `/Users/rusmulyadiiskandar/.gemini/antigravity/scratch/_RAHASIA`
>
> Cara membuka folder tersebut di Mac:
> 1. Klik ikon **Finder** (wajah tersenyum biru di pojok kiri bawah layar).
> 2. Di baris menu paling atas layar, klik **Go** lalu klik **Go to Folder...** (atau tekan `Command + Shift + G`).
> 3. Tempel tulisan ini lalu tekan **Enter**:
>    `/Users/rusmulyadiiskandar/.gemini/antigravity/scratch/_RAHASIA`

---

## Langkah 1 — Buat Google Sheet Baru

1. Buka peramban (Chrome) dan masuk ke akun Google khusus Panitia/Komite.
2. Buka alamat: https://sheets.new
3. Klik judul **"Spreadsheet tanpa judul"** di pojok kiri atas, lalu ganti namanya menjadi:
   `E-Voting Komite Keperawatan RSUD dr. Soedarso 2026`
4. Di bagian paling bawah kiri layar, lihat tab bernama **Sheet1** (atau **シート1** / **Lembar1**). Klik dua kali pada tulisan **Sheet1**, ketik **`DPT`** (huruf besar semua), lalu tekan **Enter**.

---

## Langkah 2 — Impor Data 717 Pemilih (`DPT_UNTUK_IMPOR.csv`)

1. Pastikan Anda sedang berada di tab **`DPT`**.
2. Klik menu **File** (di pojok kiri atas) → klik **Impor** (*Import*).
3. Pada jendela yang muncul, klik tab **Unggah** (*Upload*) → klik tombol **Jelajahi** (*Browse*).
4. Pilih file **`DPT_UNTUK_IMPOR.csv`** dari folder `_RAHASIA` tadi.
5. Setelah file terunggah, akan muncul kotak **"Impor file"**. Atur **persis** seperti ini:
   - **Lokasi impor**: pilih **"Ganti sheet saat ini"** (*Replace current sheet*).
   - **Jenis pemisah**: biarkan **"Deteksi secara otomatis"** atau **"Koma"**.
   - **PENTING — HILANGKAN CENTANG** pada kotak **"Konversikan teks menjadi angka, tanggal, dan formula"** (*Convert text to numbers, dates, and formulas*).
     *(Jika kotak ini tetap dicentang, NIP 18 digit akan berubah menjadi angka yang ujungnya `000` sehingga pegawai tidak bisa login).*
6. Klik tombol hijau **Impor data** (*Import data*).
7. Pastikan baris pertama berisi judul kolom (`nama`, `nip`, `unit`, dst.) dan total baris adalah **718 baris** (1 baris judul + 717 pemilih).

---

## Langkah 2b — Impor Akun Panitia & Pengurus (`AKUN_PANITIA_UNTUK_IMPOR.csv`)

1. Klik tanda **`+`** (Tambah Sheet) di pojok kiri bawah Google Sheet untuk membuat tab baru.
2. Ganti nama tab baru tersebut menjadi **`AKUN_PANITIA`** (huruf besar semua, pakai garis bawah).
3. Klik menu **File** → **Impor** → tab **Unggah** → pilih file **`AKUN_PANITIA_UNTUK_IMPOR.csv`** dari folder `_RAHASIA`.
4. Pada kotak **"Impor file"**:
   - **Lokasi impor**: pilih **"Ganti sheet saat ini"** (*Replace current sheet*).
   - **HILANGKAN CENTANG** pada **"Konversikan teks menjadi angka, tanggal, dan formula"**.
5. Klik **Impor data**.

> [!NOTE]
> Daftar kata sandi baru masing-masing pengurus dan panitia tersimpan di komputer Anda pada file:
> `_RAHASIA/SANDI_PANITIA_BARU_SIMPAN_RAHASIA.csv`
> Saat Anda menjalankan `setup()` pada Langkah 4 nanti, kata sandi di Google Sheet akan otomatis diubah menjadi kode acak (hash) sehingga tidak bisa dibaca lagi dari Sheet.

---

## Langkah 3 — Tempel Kode Server (`Code.gs`)

1. Di Google Sheet tadi, klik menu **Ekstensi** (*Extensions*) di bagian atas → klik **Apps Script**.
2. Tab baru akan terbuka menampilkan editor kode dengan file `Code.gs`.
3. Hapus seluruh isi yang ada di dalam kotak kode (`function myFunction() { ... }`).
4. Buka file `/Users/rusmulyadiiskandar/.gemini/antigravity/scratch/komite-keperawatan-soedarso/apps-script/Code.gs`, salin (**Copy**) seluruh isinya, lalu tempel (**Paste**) ke dalam editor Apps Script.
5. Klik ikon **Simpan** (gambar disket 💾) di bagian atas, atau tekan `Command + S`.

---

## Langkah 4 — Jalankan Fungsi `setup` Sekali & Setujui Izin

1. Di barisan tombol atas editor Apps Script (di sebelah kanan tombol **Run / Jalankan**), klik kotak pilihan fungsi dan pastikan terpilih **`setup`**.
2. Klik tombol **Jalankan** (*Run*).
3. Akan muncul kotak **"Diperlukan otorisasi"** → klik **Tinjau izin** (*Review permissions*).
4. Pilih akun Google Anda.
5. Akan muncul layar peringatan **"Google belum memverifikasi aplikasi ini"**. Ini **normal** karena skrip ini baru saja Anda buat sendiri:
   - Klik tulisan kecil **Lanjutan** (*Advanced*) di kiri bawah.
   - Klik tulisan **Buka Proyek Tanpa Judul (tidak aman)** / **Go to ... (unsafe)** di paling bawah.
   - Klik **Izinkan** (*Allow*).
6. Tunggu beberapa detik sampai muncul tulisan **"Eksekusi selesai"** di bagian bawah (atau kotak pesan *"Setup E-Voting Selesai ✅"* di tab Google Sheet).
   - Jika muncul peringatan bahwa ada NIP yang terkonversi menjadi angka, ulangi **Langkah 2** dan pastikan kotak *"Konversikan teks menjadi angka..."* tidak dicentang.

---

## Langkah 5 — Terbitkan sebagai Aplikasi Web (*Deploy*)

1. Di pojok kanan atas editor Apps Script, klik tombol biru **Terapkan** (*Deploy*) → klik **Deployment baru** (*New deployment*).
2. Klik ikon roda gigi ⚙️ di sebelah kiri tulisan *"Pilih jenis"* → klik **Aplikasi web** (*Web app*).
3. Isi pengaturannya **persis** seperti ini:
   - **Deskripsi**: `Backend E-Voting Komite Keperawatan`
   - **Jalankan sebagai** (*Execute as*): pilih **Saya (...email Anda...)**
   - **Yang memiliki akses** (*Who has access*): pilih **Siapa saja** (*Anyone*)
4. Klik tombol biru **Terapkan** (*Deploy*).

---

## Langkah 6 — Salin Alamat URL `/exec`

1. Setelah selesai, akan muncul kotak berisi **URL Aplikasi web** yang diawali `https://script.google.com/macros/s/...` dan diakhiri **`/exec`**.
2. Klik tombol **Salin** (*Copy*) di bawah URL tersebut.

---

## Langkah 7 — Tempel URL di Chat Ini

1. Kembali ke jendela percakapan ini.
2. **Tempel (Paste) URL `/exec` tersebut** dan kirimkan.
3. Saya akan langsung memasukkannya ke file `config.js` dan mengunggahnya ke situs agar seluruh 717 pemilih langsung terhubung ke server tanpa perlu mengatur URL satu per satu.

---

## Pengaturan Tambahan & Catatan Keamanan Penting

- **Cara Mengubah Waktu Buka / Tutup Pemilihan**:
  Di editor Apps Script, klik ikon **Setelan Proyek** (roda gigi ⚙️ di menu paling kiri) → gulir ke paling bawah ke bagian **Properti Skrip** (*Script Properties*) → klik **Edit properti skrip**. Anda dapat mengubah nilai `WAKTU_BUKA` (`2026-11-23T10:00:00+07:00`) dan `WAKTU_TUTUP` (`2026-11-24T10:00:00+07:00`).
- **Sakelar `PIN_ACAK` untuk Pemilihan Sungguhan**:
  Untuk simulasi ini, `PIN_ACAK` diatur `false` (pemilih masuk memakai **nama depan tanpa gelar + tahun lahir**, lalu wajib mengganti kata sandi saat pertama kali masuk).
  **Untuk pemilihan SUNGGUHAN nanti**, ubah properti `PIN_ACAK` menjadi `true` dan bagikan PIN 8 karakter dari file `_RAHASIA/PIN_PEMILIH.csv` secara pribadi kepada masing-masing pemilih.
- **Cara Memperbarui Kode Tanpa Mengubah URL**:
  Jika kelak kode `Code.gs` diperbarui, klik **Terapkan** → **Kelola deployment** → klik ikon pensil ✏️ → pada bagian **Versi**, pilih **Versi baru** → klik **Terapkan**.
- **Kerahasiaan & Tanggung Jawab Pemilik Akun Google**:
  Pilihan suara disimpan di tab `SUARA` terpisah dari identitas pemilih di tab `DPT`, dan baris suara disisipkan secara acak tanpa jam memilih. Namun, pemilik akun Google yang menyimpan Google Sheet ini secara teknis tetap memiliki akses penuh ke seluruh isi Sheet. **Jangan membagikan akses Google Sheet ini kepada orang lain**, dan hapus file CSV dari folder Unduhan/Drive setelah impor selesai.
