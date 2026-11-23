# Kontrak API Backend Google Apps Script (E-Voting & Login Portal)

Semua permintaan: `POST <URL /exec>` dengan header `Content-Type: text/plain;charset=utf-8`
dan badan JSON `{ "aksi": "...", ...parameter }`. Semua jawaban JSON.

Bentuk umum jawaban:
- Sukses: `{ "ok": true, ... }`
- Gagal : `{ "ok": false, "kode": "KODE_GALAT", "pesan": "Pesan bahasa Indonesia" }`

Waktu selalu dalam ISO 8601 UTC (`toISOString()`); klien menampilkan dalam WIB.

## Tab Google Sheet
| Tab | Kolom (baris 1) |
|---|---|
| DPT | `nama, nip, unit, jabatan, kategori, jenis_id, tahun_lahir, pin_awal, hash_sandi, salt, status_ganti_sandi, sudah_memilih, kode_bukti` |
| SUARA | `id_acak, kode_calon` (TANPA identitas, TANPA waktu; baris disisipkan di posisi acak) |
| LOG | `waktu, aksi, hasil` (tanpa pilihan) |
| AKUN_PANITIA | `username, nama, peran, sandi_awal, hash, salt` |

Peran panitia: `superadmin` (semua), `panitia` (kontrol e-voting & daftar pemilih), `pengurus` (login portal saja).
Aksi panitia e-voting (`daftar_pemilih`, `kontrol`) hanya untuk peran `superadmin` atau `panitia`.

## Script Properties
`WAKTU_BUKA` (default `2026-11-23T10:00:00+07:00`), `WAKTU_TUTUP` (default `2026-11-24T10:00:00+07:00`),
`STATUS_JEDA` (`true/false`), `GARAM_GLOBAL` (acak, dibuat setup), `PIN_ACAK` (`false` default),
`KODE_CALON` (default `cand-1,cand-2,cand-3,cand-abstain`).

## Kata sandi awal pegawai (kolom `hash_sandi` masih kosong)
- `PIN_ACAK=false`: sandi awal = nama depan + tahun_lahir. Nama depan = kata pertama nama setelah
  membuang gelar/singkatan di depan (kata yang diakhiri titik, mis. `Ns.`, `Bdn.`, `M.`, `H.`, `Hj.`),
  huruf kecil, hanya huruf a-z. Perbandingan: masukan dikecilkan & spasi dihapus. Contoh: `siti1985`.
- `PIN_ACAK=true`: sandi awal = isi kolom `pin_awal` (8 karakter, peka huruf besar/kecil).
- Setelah ganti sandi: `hash_sandi`, `salt` diisi, `status_ganti_sandi=TRUE`, `pin_awal` dikosongkan.
- Hash: salt acak per akun (UUID) + `GARAM_GLOBAL`, HMAC/SHA-256 berulang ≥ 1000 putaran.

## Aksi
### `status` (publik)
Masukan: `{}` → `{ ok, dpt, sudah_memilih, status: "BUKA"|"TUTUP"|"DIJEDA", fase: "BELUM_DIBUKA"|"BERLANGSUNG"|"SELESAI", waktuServer, buka, tutup, hasil_tersedia }`.
TIDAK ADA angka per calon. `status` BUKA hanya bila buka ≤ sekarang < tutup dan tidak dijeda.

### `login` (pegawai & panitia)
Masukan: `{ id, sandi }`. `id` = NIP/NIPPPK/NIK (dinormalkan: hapus spasi, titik, strip) **atau** username panitia (huruf kecil).
Urutan: jika `id` cocok username AKUN_PANITIA → login panitia; jika tidak, cari di DPT.
Pembatasan: 5 gagal per akun (id ternormal) per 15 menit → `kode: "TERKUNCI"`.
Galat sama untuk id tidak ada / sandi salah: `kode: "LOGIN_GAGAL"`, pesan `"NIP/username atau kata sandi salah."`.
Sukses: `{ ok, token, kedaluwarsa, wajib_ganti_sandi, pengguna }`
- pemilih: `pengguna = { tipe:"pemilih", nama, unit, jabatan, kategori, jenis_id, nip, nip_tersamar, sudah_memilih }` (nip = milik sendiri)
- panitia: `pengguna = { tipe:"panitia", username, nama, peran }` (`wajib_ganti_sandi` = false)
Token = `Utilities.getUuid()`, disimpan di CacheService 6 jam.

### `sesi` → `{ token }` → `{ ok, pengguna, kedaluwarsa }` (cek token masih berlaku; `pengguna.sudah_memilih` terbaru)
### `logout` → `{ token }` → `{ ok }` (hapus token dari cache)

### `ganti_sandi` (butuh token; pemilih maupun panitia)
Masukan: `{ token, sandi_lama, sandi_baru }`. Aturan: ≥ 8 karakter, huruf + angka, ≠ NIP/username, ≠ sandi awal, ≠ sandi lama.
Galat: `SESI_TIDAK_VALID`, `SANDI_LAMA_SALAH`, `SANDI_LEMAH`.

### `pilih` (butuh token pemilih)
Masukan: `{ token, kode_calon }`. Di dalam `LockService.getScriptLock()`: status harus BUKA (`kode: "TIDAK_BUKA"`),
wajib sudah ganti sandi (`kode: "WAJIB_GANTI_SANDI"`), belum memilih (`kode: "SUDAH_MEMILIH"`), kode calon valid (`kode: "CALON_TIDAK_VALID"`).
Tulis SUARA (id acak + kode calon) di posisi acak, tandai `sudah_memilih=TRUE`, buat `kode_bukti` acak.
Sukses: `{ ok, kode_bukti, waktu }`.

### `bukti` (butuh token pemilih) → `{ ok, nama, unit, nip_tersamar, kode_bukti }` hanya milik sendiri; `kode: "BELUM_MEMILIH"` bila belum.

### `daftar_pemilih` (token panitia/superadmin) → `{ ok, daftar: [{ nama, unit, nip_tersamar, status: "Sudah"|"Belum" }] }` — tanpa kode bukti, tanpa pilihan.

### `kontrol` (token panitia/superadmin)
Masukan: `{ token, perintah: "jeda"|"lanjut"|"reset", konfirmasi }`. Reset hanya sebelum TUTUP dan `konfirmasi === "RESET"`;
menghapus semua baris SUARA dan mengosongkan `sudah_memilih` & `kode_bukti` di DPT.

### `hasil` (publik, tetapi DITOLAK sebelum TUTUP — termasuk panitia)
Sebelum tutup: `{ ok:false, kode:"HASIL_BELUM_DIBUKA", pesan:"Hasil rekapitulasi dibuka setelah pemilihan ditutup pada Selasa, 24 November 2026 pukul 10.00 WIB." }`
Sesudah tutup: `{ ok, total_sah, dpt, sudah_memilih, rincian: [{ kode_calon, jumlah, persen }], tertinggi: [kode_calon, ...] }` (semua calon valid tampil walau 0 suara; `persen` 2 desimal).

