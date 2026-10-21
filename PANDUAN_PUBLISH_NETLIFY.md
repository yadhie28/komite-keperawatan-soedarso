# Panduan Lengkap Kelengkapan Publish Netlify
## Komite Keperawatan RSUD dr. Soedarso Pontianak

Dokumen ini berisi informasi mengenai seluruh berkas kelengkapan publikasi di Netlify beserta 3 metode publikasi yang dapat digunakan sewaktu-waktu.

---

### 🌐 Status Publikasi Saat Ini (Live & Online - Terkunci)
Aplikasi website telah resmi terpublikasi dan link permanen terkunci di:
- **URL Resmi Terkunci**: **[https://regal-smakager-133704.netlify.app/](https://regal-smakager-133704.netlify.app/)**
- **SSL / HTTPS**: Aktif (Aman dengan sertifikat SSL)
- **Aksesibilitas**: Publik tanpa login tambahan untuk staf perawat (*production ready*)
- **Fitur Khusus**: E-Kredensialing, SPK/RKK Generator, Audit Mutu, dan Sistem Login Admin Pengurus Komite
- **PWA (Progressive Web App)**: Mendukung *"Add to Home Screen"* pada Android & iPhone/iPad

---

### 📦 Berkas Paket Siap Upload (Deploy Package)
Berkas zip siap deploy yang berisi seluruh struktur web telah dibuat dan disalin ke:
1. **Direktori Proyek**: `komite-keperawatan-soedarso-netlify.zip`
2. **Folder Downloads Komputer Anda**: `~/Downloads/komite-keperawatan-soedarso-netlify.zip`

---

### 📋 Daftar Berkas Kelengkapan Publikasi

| Nama Berkas | Fungsi & Deskripsi |
| :--- | :--- |
| `index.html` | Berkas utama web (navigasi, formulir wizard, modal cetak SPK/RKK, modal login admin, metadata). |
| `index.css` | Sistem desain *Modern Hospital Executive*, dark mode, dan print layout. |
| `app.js` | Logika interaktif, kredensialing wizard, auth admin, manajemen status perawat, & audit. |
| `data.js` | Master data: staf keperawatan, katalog RKK PK I–PK V, audit mutu, regulasi, & akun admin. |
| `manifest.json` | Konfigurasi PWA agar perawat dapat menginstal website sebagai aplikasi di layar HP. |
| `netlify.toml` | Konfigurasi build Netlify, header keamanan HTTP, routing SPA, dan optimasi cache. |
| `_redirects` | Aturan fallback routing Netlify (`/* /index.html 200`). |
| `_headers` | Header keamanan CDN (*X-Frame-Options, X-XSS-Protection, Cache-Control*). |
| `hero_banner.jpg` | Foto latar belakang ruang pertemuan telaah klinis & kredensialing. |
| `logo_kalbar.png` | Lambang resmi Pemerintah Provinsi Kalimantan Barat. |
| `logo_komite.png` | Lambang resmi Komite Keperawatan RSUD dr. Soedarso Pontianak. |
| `deploy_netlify.sh` | Skrip otomatis untuk pengemasan dan publikasi ulang ke Netlify. |

---

### 🚀 Cara Memperbarui Website di Netlify (Link Tetap https://regal-smakager-133704.netlify.app/)

#### Metode Rekomendasi: Update Langsung di Netlify Dashboard
1. Buka dashboard situs Anda di Netlify: [https://app.netlify.com/sites/regal-smakager-133704/deploys](https://app.netlify.com/sites/regal-smakager-133704/deploys)
2. Scroll ke bagian bawah halaman di kotak: **"Need to update your site? Drag and drop your site output folder here"**.
3. Tarik (*drag and drop*) berkas `komite-keperawatan-soedarso-netlify.zip` dari folder **Downloads** Anda (`~/Downloads/komite-keperawatan-soedarso-netlify.zip`).
4. Dalam hitungan 5 detik, versi terbaru (termasuk fitur Admin Login & manajemen kredensial) akan langsung aktif di **[https://regal-smakager-133704.netlify.app/](https://regal-smakager-133704.netlify.app/)** tanpa mengubah alamat URL!

#### Cara 3: Melalui Netlify CLI
Jika Anda menginstal Netlify CLI pada sistem:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

---

### 🔑 Kredensial 24 Akun Pengurus Resmi (SK Direktur No. SK/ 280801 /RSUD/2026)

Default kata sandi seluruh akun pengurus: **`soedarso2026`**

#### 1. Pimpinan Komite Keperawatan (Super Admin - Akses Penuh Seluruh Modul)
| No. | Nama Pejabat & Gelar | Kedudukan | Username Utama | Username Alternatif | Status Hak Akses |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | **M. Separia Russanto, S.Kep., Ns** | **Ketua Komite** | `separia` | `admin.komite`, `ketua` | **Super Admin** |
| 2 | **Ns. Rusmulyadi, S.Kep., MARS** | **Sekretaris Komite** | `rusmulyadi` | `sekretaris`, `admin.sekretaris` | **Super Admin** |

#### 2. Sub Komite Kredensial (Admin Kredensial - Verifikasi Berkas & RKK/SPK)
| No. | Nama Pejabat & Gelar | Kedudukan | Username Login |
| :-: | :--- | :--- | :--- |
| 3 | **Ns. Yohanes Rindo Ari Wijoyo, S.Kep** | **Ketua Sub Komite Kredensial** | `yohanes` *(atau `kredensial`)* |
| 4 | Tri Herda Permana Sari, A.Md.Kep | Anggota | `tri.herda` |
| 5 | Ns. Dwinita Wulan Purnamasari, S.Kep | Anggota | `dwinita` |
| 6 | Ns. Ika Yusniarti, S.Kep | Anggota | `ika.yusniarti` |
| 7 | F. Surayniwaty, S.ST | Anggota | `surayniwaty` |
| 8 | Noveriansyah Akbar, S.Kep., Ns | Anggota | `noveriansyah` |
| 9 | Mushlihuddin, S.Kep., Ns | Anggota | `mushlihuddin` |
| 10 | Herkulanus Yunus, A.Md.Kep | Anggota | `herkulanus` |
| 11 | Bdn. Evilita Ratnawati, S.ST | Anggota | `evilita` |

#### 3. Sub Komite Etika dan Disiplin (Admin Etik - Penanganan Aduan & Sidang Etik)
| No. | Nama Pejabat & Gelar | Kedudukan | Username Login |
| :-: | :--- | :--- | :--- |
| 12 | **Alfonsus Agus Ainaro Simamora, S.Kep., Ns., MH** | **Ketua Sub Komite Etik & Disiplin** | `alfonsus` *(atau `etik`)* |
| 13 | Ns. Gunawan, S.Tr.Kep., SKM | Anggota | `gunawan` |
| 14 | Ns. Marianto, S.Kep | Anggota | `marianto` |
| 15 | Andri Muzayyin, S.Kep., Ns | Anggota | `andri.muzayyin` |
| 16 | Diana Rachmawati, S.ST | Anggota | `diana` |
| 17 | Nur'aini Ratnasari, S.T.Keb | Anggota | `nuraini` |

#### 4. Sub Komite Mutu Keperawatan (Admin Mutu - Input & Rekapitulasi Audit Klinis)
| No. | Nama Pejabat & Gelar | Kedudukan | Username Login |
| :-: | :--- | :--- | :--- |
| 18 | **Laila Istiqomah, S.Kep., Ns** | **Ketua Sub Komite Mutu Keperawatan** | `laila` *(atau `mutu`)* |
| 19 | Bdn. Ely Lidiawati, S.Tr.Keb | Anggota | `ely.lidiawati` |
| 20 | Rudy Hartono, S.Kep., Ns | Anggota | `rudy.hartono` |
| 21 | Stevanus Darmo, A.Md.Kep., SKM | Anggota | `stevanus` |
| 22 | Ernia Wati, S.Kep., Ns | Anggota | `ernia.wati` |
| 23 | Munazzil, A.Md.Kep | Anggota | `munazzil` |
| 24 | Odi Pratama Setiadi, S.Kep., Ns | Anggota | `odi.pratama` |


