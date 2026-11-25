/**
 * DATASET MASTER: KOMITE KEPERAWATAN RSUD DR. SOEDARSO PONTIANAK
 * Standar Permenkes No. 49 Tahun 2013 & KARS (Komisi Akreditasi Rumah Sakit)
 */

window.KOMITE_DATA = {
  hospitalInfo: {
    name: "RSUD DOKTER SOEDARSO",
    subName: "RUMAH SAKIT UMUM DAERAH KELAS A PENDIDIKAN & RUJUKAN UTAMA PROVINSI KALIMANTAN BARAT",
    address: "Jalan Dokter Soedarso Nomor 1 Pontianak, Kalimantan Barat 78124",
    phone: "(0561) 737701, Faksimile: (0561) 736528",
    email: "komitekeperawatanrsds2023@gmail.com",
    committeeEmail: "komitekeperawatanrsds2023@gmail.com",
    secretaryEmail: "komitekeperawatanrsds2023@gmail.com",
    adminNotificationEmails: ["komitekeperawatanrsds2023@gmail.com"],
    website: "https://yadhie28.github.io/komite-keperawatan-soedarso/",
    director: "drg. Hary Agung Tjahyadi, M.Kes",
    directorRank: "Pembina Utama Muda",
    directorNIP: "196905201998031008",
    nursingChief: "M. Separia Russanto, S.Kep., Ns",
    nursingSecretary: "Ns. Rusmulyadi, S.Kep., MARS",
    accreditation: "Paripurna (Bintang Lima) KARS 2023-2027"
  },

  // Metadata SK Resmi Direktur RSUD dr. Soedarso
  skInfo: {
    number: "SK/280801/RSUD/2026",
    baseSK: "SK/020101/RSUD/2024",
    title: "Perubahan Kedua Lampiran Keputusan Direktur RSUD Dokter Soedarso Provinsi Kalimantan Barat Nomor SK/020101/RSUD/2024 tentang Pembentukan Komite Keperawatan Periode 2024 - 2027",
    date: "28 Agustus 2026",
    place: "Pontianak",
    director: "drg. Hary Agung Tjahyadi, M.Kes",
    directorRank: "Pembina Utama Muda",
    directorNIP: "196905201998031008",
    period: "2024 - 2027",
    totalMembers: 24
  },

  subcommittees: [
    {
      id: "kredensial",
      name: "Sub Komite Kredensial",
      head: "Ns. Yohanes Rindo Ari Wijoyo, S.Kep",
      tagline: "Verifikasi Kompetensi & Rekomendasi Surat Penugasan Klinis (SPK/RKK)",
      icon: "fa-certificate",
      color: "teal",
      responsibilities: [
        "Menyusun proses rincian kewenangan klinis.",
        "Menyusun buku putih (white paper).",
        "Menerima hasil verifikasi persyaratan kredensial dari bagian aparatur.",
        "Merekomendasikan tahapan proses kredensial.",
        "Merekomendasikan pemulihan kewenangan klinis bagi setiap tenaga keperawatan dan kebidanan.",
        "Melakukan kredensial ulang secara berkala sesuai waktu yang ditetapkan.",
        "Membuat laporan seluruh proses kredensial kepada ketua komite keperawatan dan kebidanan untuk diteruskan kepada Direktur Rumah Sakit."
      ]
    },
    {
      id: "mutu",
      name: "Sub Komite Mutu Keperawatan dan Kebidanan",
      head: "Laila Istiqomah, S.Kep., Ns",
      tagline: "Audit Klinis Asuhan Keperawatan & Kebidanan serta Pengembangan Profesional Berkelanjutan",
      icon: "fa-shield-halved",
      color: "green",
      responsibilities: [
        "Menyusun data dasar profil tenaga keperawatan dan kebidanan sesuai area praktik.",
        "Merekomendasikan perencanaan pengembangan profesional berkelanjutan tenaga keperawatan dan kebidanan.",
        "Melakukan audit asuhan keperawatan dan asuhan kebidanan.",
        "Memfasilitasi proses pendampingan sesuai kebutuhan.",
        "Melakukan analisa jabatan.",
        "Melakukan penilaian kinerja keperawatan dan kebidanan."
      ]
    },
    {
      id: "etik",
      name: "Sub Komite Etika dan Disiplin",
      head: "Alfonsus Agus Ainaro Simamora, S.Kep., Ns., MH",
      tagline: "Sosialisasi Kode Etik, Pembinaan & Penegakan Disiplin Profesi Keperawatan dan Kebidanan",
      icon: "fa-scale-balanced",
      color: "amber",
      responsibilities: [
        "Melakukan sosialisasi kode etik profesi keperawatan dan kebidanan.",
        "Melakukan pembinaan etik dan disiplin profesi tenaga keperawatan serta kebidanan.",
        "Melakukan penegakan disiplin profesi keperawatan dan kebidanan."
      ]
    }
  ],

  // Mandatory Basic Actions (Bagian A pada Template Resmi RKK RSUD dr. Soedarso)
  mandatoryBaseActions: [
    { id: "RKK-BASE-01", no: 1, name: "Melakukan asesmen keperawatan komprehensif (anamnesa dan pemeriksaan fisik head-to-toe)", kategori: "A. ASUHAN KEPERAWATAN UMUM & DASAR (MANDATORY PK I / II)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asuhan Umum & Dasar" },
    { id: "RKK-BASE-02", no: 2, name: "Melakukan pemasangan kateter urine menetap dengan teknik aseptik steril", kategori: "A. ASUHAN KEPERAWATAN UMUM & DASAR (MANDATORY PK I / II)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Asuhan Umum & Dasar" },
    { id: "RKK-BASE-03", no: 3, name: "Melakukan pemasangan IV Catheter periferal untuk akses terapi cairan intravena", kategori: "A. ASUHAN KEPERAWATAN UMUM & DASAR (MANDATORY PK I / II)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Asuhan Umum & Dasar" },
    { id: "RKK-BASE-04", no: 4, name: "Melakukan penghitungan balance cairan ketat dan observasi tetesan infus", kategori: "A. ASUHAN KEPERAWATAN UMUM & DASAR (MANDATORY PK I / II)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asuhan Umum & Dasar" },
    { id: "RKK-BASE-05", no: 5, name: "Melakukan pemberian obat via 12 Benar Pemberian (Oral, IV, IM, SC, Topikal)", kategori: "A. ASUHAN KEPERAWATAN UMUM & DASAR (MANDATORY PK I / II)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Asuhan Umum & Dasar" },
    { id: "RKK-BASE-06", no: 6, name: "Melakukan perawatan luka bedah bersih tanpa penyulit (luka debridement dasar)", kategori: "A. ASUHAN KEPERAWATAN UMUM & DASAR (MANDATORY PK I / II)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asuhan Umum & Dasar" }
  ],

  // Rumpun / Area Kekhususan Klinis Sesuai Buku Pedoman (White Book 2026) RSUD dr. Soedarso
  whiteBookAreas: {
    "PK I": [
      { key: "generalis", name: "Pelayanan Keperawatan Generalis (19 Elemen Asuhan Dasar)" },
      { key: "generalis_kmb", name: "Generalis - Keperawatan Medikal Bedah (KMB Dasar)" },
      { key: "generalis_ibs", name: "Generalis - Kamar Bedah Sentral (Perioperatif Dasar)" },
      { key: "generalis_igd", name: "Generalis - Gawat Darurat (Emergensi Dasar)" },
      { key: "generalis_icu", name: "Generalis - Intensive Care (Kritis Dasar)" },
      { key: "generalis_kardio", name: "Generalis - Kardiovaskuler (PJT Dasar)" },
      { key: "generalis_anak", name: "Generalis - Keperawatan Anak (Pediatrik Dasar)" },
      { key: "generalis_maternitas", name: "Generalis - Keperawatan Maternitas (Kebidanan Dasar)" },
      { key: "generalis_jiwa", name: "Generalis - Keperawatan Jiwa Dasar" },
      { key: "generalis_dialisis", name: "Generalis - Nefrologi & Hemodialisis Dasar" },
      { key: "generalis_onkologi", name: "Generalis - Onkologi & Kemoterapi Dasar" },
      { key: "generalis_anestesi", name: "Generalis - Keperawatan Anestesi Dasar" }
    ],
    "PK II": [
      { key: "kmb_dewasa_pk2", name: "Keperawatan Medikal Bedah Dewasa (KMB Dewasa)" },
      { key: "perioperatif_pk2", name: "Keperawatan Perioperatif (Kamar Bedah Sentral / IBS)" },
      { key: "emergensi_pk2", name: "Keperawatan Gawat Darurat / Emergensi (IGD)" },
      { key: "intensif_pk2", name: "Keperawatan Intensive Care (ICU / ICCU / HCU)" },
      { key: "kardiovaskuler_pk2", name: "Keperawatan Kardiovaskuler (Pusat Jantung Terpadu)" },
      { key: "anak_pk2", name: "Rumpun Keperawatan Anak (Pediatrik & Neonatus)" },
      { key: "maternitas_pk2", name: "Rumpun Keperawatan Maternitas & Kebidanan" },
      { key: "jiwa_pk2", name: "Rumpun Keperawatan Jiwa" },
      { key: "nefrologi_pk2", name: "Keperawatan Nefrologi & Dialisis (Hemodialisis)" },
      { key: "onkologi_pk2", name: "Keperawatan Onkologi (Kemoterapi & Paliatif)" },
      { key: "neurosains_pk2", name: "Keperawatan Neurosains (Neurologi & Bedah Saraf)" },
      { key: "geriatri_pk2", name: "Keperawatan Geriatri (Lanjut Usia)" },
      { key: "anestesi_pk2", name: "Keperawatan Anestesi" }
    ],
    "PK III": [
      { key: "kmb_medikal_pk3", name: "KMB - Medikal (Penyakit Dalam Dewasa)" },
      { key: "kmb_bedah_pk3", name: "KMB - Bedah (Kasus Bedah Dewasa & Transplantasi)" },
      { key: "perioperatif_pk3", name: "Perioperatif (Kamar Bedah Sentral / IBS)" },
      { key: "emergensi_pk3", name: "Gawat Darurat / Emergensi (IGD & Trauma)" },
      { key: "intensif_pk3", name: "Intensive Care (ICU / ICCU / HCU / Luka Bakar)" },
      { key: "kardiovaskuler_rawat_pk3", name: "Kardiovaskuler (Rawat Inap & Jalan PJT)" },
      { key: "kardiovaskuler_cathlab_pk3", name: "Kardiovaskuler (Ruang Kateterisasi / Cathlab)" },
      { key: "kardiovaskuler_perfusi_pk3", name: "Kardiovaskuler (Perfusionist Mesin CPB)" },
      { key: "neurosains_pk3", name: "Neurosains (Neurologi & Bedah Saraf)" },
      { key: "geriatri_pk3", name: "Keperawatan Geriatri (Lanjut Usia)" },
      { key: "onkologi_pk3", name: "Keperawatan Onkologi (Kemoterapi & Radiasi)" },
      { key: "anestesi_pk3", name: "Keperawatan Anestesi" },
      { key: "nefrologi_pk3", name: "Nefrologi (Hemodialisis & CAPD)" },
      { key: "gastro_hepato_pk3", name: "Gastro-Hepato (Endoskopi & Hepatobilier)" },
      { key: "respirologi_pk3", name: "Respirologi (Paru & Bronkoskopi)" },
      { key: "mata_pk3", name: "Keperawatan Mata (Oftalmologi)" },
      { key: "radiologi_pk3", name: "Radiologi & Kedokteran Nuklir" },
      { key: "anak_medikal_pk3", name: "Rumpun Anak - Medikal Anak" },
      { key: "anak_hemato_pk3", name: "Rumpun Anak - Hemato-Onkologi Anak" },
      { key: "anak_bedah_pk3", name: "Rumpun Anak - Bedah Anak" },
      { key: "anak_nefrologi_pk3", name: "Rumpun Anak - Nefrologi Anak" },
      { key: "anak_picu_pk3", name: "Rumpun Anak - Intensive Anak (PICU)" },
      { key: "anak_nicu_pk3", name: "Rumpun Anak - Neonatologi (NICU)" },
      { key: "maternitas_obgyn_pk3", name: "Rumpun Maternitas - Obstetri & Ginekologi (Obgyn)" },
      { key: "maternitas_onkologi_pk3", name: "Rumpun Maternitas - Onkologi Kebidanan" },
      { key: "maternitas_fertilitas_pk3", name: "Rumpun Maternitas - Fertilitas & Bayi Tabung (IVF)" },
      { key: "jiwa_pk3", name: "Rumpun Keperawatan Jiwa" }
    ],
    "PK IV": [
      { key: "kmb_medikal_pk4", name: "KMB Medikal Bedah (Proficient / Konsultan Ruangan)" },
      { key: "perioperatif_pk4", name: "Perioperatif (Kamar Bedah Sentral)" },
      { key: "emergensi_pk4", name: "Gawat Darurat / Emergensi" },
      { key: "intensif_pk4", name: "Intensive Care (ICU / ICCU)" },
      { key: "kardiovaskuler_pk4", name: "Kardiovaskuler (PJT / Cathlab)" },
      { key: "neurosains_pk4", name: "Neurosains (Neurologi & Bedah Saraf)" },
      { key: "geriatri_pk4", name: "Geriatri" },
      { key: "onkologi_pk4", name: "Onkologi" },
      { key: "anestesi_pk4", name: "Anestesi" },
      { key: "nefrologi_pk4", name: "Nefrologi (Dialisis & CAPD)" },
      { key: "gastro_hepato_pk4", name: "Gastro-Hepato (Endoskopi)" },
      { key: "respirologi_pk4", name: "Respirologi (Paru)" },
      { key: "radiologi_pk4", name: "Radiologi & Nuklir" },
      { key: "anak_pk4", name: "Rumpun Keperawatan Anak" },
      { key: "maternitas_pk4", name: "Rumpun Keperawatan Maternitas" },
      { key: "jiwa_pk4", name: "Rumpun Keperawatan Jiwa" }
    ],
    "PK V": [
      { key: "kmb_medikal_pk5", name: "KMB Medikal Bedah (Expert / Konsultan Utama RS & Provinsi)" },
      { key: "perioperatif_pk5", name: "Perioperatif Konsultan Utama" },
      { key: "emergensi_pk5", name: "Emergensi Konsultan Utama" },
      { key: "intensif_pk5", name: "Intensive Care Konsultan Utama" },
      { key: "kardiovaskuler_pk5", name: "Kardiovaskuler Konsultan Utama" },
      { key: "neurosains_pk5", name: "Neurosains Konsultan Utama" },
      { key: "geriatri_pk5", name: "Geriatri Konsultan Utama" },
      { key: "onkologi_pk5", name: "Onkologi Konsultan Utama" },
      { key: "anestesi_pk5", name: "Anestesi Konsultan Utama" },
      { key: "nefrologi_pk5", name: "Nefrologi Konsultan Utama" },
      { key: "gastro_hepato_pk5", name: "Gastro-Hepato Konsultan Utama" },
      { key: "respirologi_pk5", name: "Respirologi Konsultan Utama" },
      { key: "radiologi_pk5", name: "Radiologi Konsultan Utama" },
      { key: "anak_pk5", name: "Rumpun Keperawatan Anak Konsultan Utama" },
      { key: "maternitas_pk5", name: "Rumpun Keperawatan Maternitas Konsultan Utama" },
      { key: "jiwa_pk5", name: "Rumpun Keperawatan Jiwa Konsultan Utama" }
    ],
    "PMB": [
      { key: "pmb_kebidanan", name: "Pelayanan Praktik Bidan Klinis (PMB I - PMB IV Maternal & Neonatal)" }
    ]
  },

  // Daftar Tindakan Spesifik Sesuai Buku Putih 2026 (Bagian B pada Template RKK)
  whiteBookActions: {
    "generalis": [
      { id: "RKK-GEN-01", no: 1, name: "Melakukan interpretasi hasil EKG normal dan lapor nilai kritis", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Diagnostik" },
      { id: "RKK-GEN-02", no: 2, name: "Melakukan skrining paliatif, psikologis, spiritual, dan kultural", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen" },
      { id: "RKK-GEN-03", no: 3, name: "Melakukan komunikasi verbal teknik SBAR dalam pelaporan kondisi pasien dengan TBAK", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Komunikasi" },
      { id: "RKK-GEN-04", no: 4, name: "Menerapkan prinsip etika keperawatan (autonomy, beneficience, justice, non-maleficience, fidelity)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Etik" },
      { id: "RKK-GEN-05", no: 5, name: "Melaksanakan bundles HAIs (ISK, HAP, IDO) dan hand hygiene sesuai standar", defaultKode: 1, jenisTindakan: "Mandiri", domain: "PPI" },
      { id: "RKK-GEN-06", no: 6, name: "Mengukur TTV, skor EWSS, aktivasi Code Blue, dan Bantuan Hidup Dasar (BHD)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Emergensi" },
      { id: "RKK-GEN-07", no: 7, name: "Pemberian terapi oksigen via nasal kanul dan simple mask serta suction OPA/oral", defaultKode: 1, jenisTindakan: "Mandat", domain: "Oksigenasi" },
      { id: "RKK-GEN-08", no: 8, name: "Pemasangan dan pencabutan NGT pasien dewasa tanpa penyulit serta cek kepatenan", defaultKode: 1, jenisTindakan: "Mandat", domain: "Nutrisi" },
      { id: "RKK-GEN-09", no: 9, name: "Pengelolaan pemberian transfusi darah dan produk darah secara aman", defaultKode: 1, jenisTindakan: "Mandat", domain: "Transfusi" },
      { id: "RKK-GEN-10", no: 10, name: "Pengambilan sampel darah vena dan kapiler (GDS), sputum, feses, dan urin", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Diagnostik" },
      { id: "RKK-GEN-11", no: 11, name: "Dokumentasi asuhan keperawatan terintegrasi CPPT dan catatan operan perawat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Dokumentasi" },
      { id: "RKK-GEN-12", no: 12, name: "Memberikan transfer pasien dengan kategori NEWSS hijau", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Transfer Pasien" }
    ],

    "kmb_dewasa_pk2": [
      { id: "RKK-KMB2-01", no: 1, name: "Validasi pengkajian awal, penilaian kesadaran GCS, dan deteksi peningkatan TIK", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen" },
      { id: "RKK-KMB2-02", no: 2, name: "Pemeriksaan Ankle Brachial Index (ABI) dan analisa hasil EKG (ST elevasi / disritmia)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Diagnostik" },
      { id: "RKK-KMB2-03", no: 3, name: "Serah terima pasien SBAR dan keselamatan prosedur invasif (Sign In, Time Out, Sign Out)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Keselamatan Pasien" },
      { id: "RKK-KMB2-04", no: 4, name: "Melaksanakan bundles HAIs terkait Infeksi Aliran Darah Primer (IADP) & rawat pasien HIV/AIDS", defaultKode: 1, jenisTindakan: "Mandiri", domain: "PPI" },
      { id: "RKK-KMB2-05", no: 5, name: "Memonitor hemodinamik dengan monitor non-invasif & embolus precautions", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Monitoring Kritis" },
      { id: "RKK-KMB2-06", no: 6, name: "Pemberian terapi O2 masker rebreathing/NRM, OPA/NPA, dan suction via trakeostomi", defaultKode: 1, jenisTindakan: "Mandat", domain: "Respirasi" },
      { id: "RKK-KMB2-07", no: 7, name: "Melakukan pencabutan vena central line & monitoring balans cairan elektrolit", defaultKode: 1, jenisTindakan: "Mandat", domain: "Tindakan Invasif" },
      { id: "RKK-KMB2-08", no: 8, name: "Perawatan cedera tekan grade 2-3, luka bakar, graft/donor site, dan ulkus Wagner I-II", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Perawatan Luka" },
      { id: "RKK-KMB2-09", no: 9, name: "Pemberian obat kemoterapi terverifikasi PK 3 & monitoring efek samping kemoterapi", defaultKode: 1, jenisTindakan: "Mandat", domain: "High Alert" },
      { id: "RKK-KMB2-10", no: 10, name: "Pemberian insulin drip IV & pemantauan respon obat anti-aritmia serta irigasi mata/hidung", defaultKode: 1, jenisTindakan: "Mandat", domain: "Farmakoterapi" },
      { id: "RKK-KMB2-11", no: 11, name: "Double checking transfusi darah & obat yang diberikan oleh perawat pemula (PK I)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Patient Safety" },
      { id: "RKK-KMB2-12", no: 12, name: "Kumbah lambung, bladder training, bowel training, dan evakuasi feses manual", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Eliminasi & Nutrisi" },
      { id: "RKK-KMB2-13", no: 13, name: "Analisa hasil pemeriksaan analisa gas darah arteri (AGD) & glukosa darah kapiler", defaultKode: 1, jenisTindakan: "Mandat", domain: "Diagnostik" },
      { id: "RKK-KMB2-14", no: 14, name: "Penyusunan Discharge Planning dan transfer pasien kategori NEWSS kuning", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Discharge & Transfer" }
    ],

    "kmb_medikal_pk3": [
      { id: "RKK-MED3-01", no: 1, name: "Meninjau kriteria pembiusan parsial, riwayat obat, dan kontraindikasi tindakan medikal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pra-Tindakan" },
      { id: "RKK-MED3-02", no: 2, name: "Menganalisa kepatenan jalan napas kompleks dan merumuskan diagnosis keperawatan komprehensif", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Diagnosis Klinis" },
      { id: "RKK-MED3-03", no: 3, name: "Konferensi asuhan multidisiplin (Multidisciplinary Care Conference) & Discharge Planning kompleks", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kolaborasi" },
      { id: "RKK-MED3-04", no: 4, name: "Koordinasi ruang isolasi bertekanan negatif (Magna Helix) dan bundle HAIs airborne disease", defaultKode: 1, jenisTindakan: "Mandiri", domain: "PPI" },
      { id: "RKK-MED3-05", no: 5, name: "Perawatan pasien gambaran EKG letal dan tatalaksana henti jantung algoritma ACLS/BHL", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Resusitasi" },
      { id: "RKK-MED3-06", no: 6, name: "Pemasangan alat bantu napas Laryngeal Mask Airway (LMA) & intubasi ETT darurat", defaultKode: 1, jenisTindakan: "Mandat", domain: "Airway Management" },
      { id: "RKK-MED3-07", no: 7, name: "Perawatan inner cannule trakeostomi & perawatan jalur akses vena sentral (CVC)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "CVC Care" },
      { id: "RKK-MED3-08", no: 8, name: "Perawatan cedera tekan stadium III-IV & luka diabetik Wagner stadium III-IV", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Luka Kompleks" },
      { id: "RKK-MED3-09", no: 9, name: "Evaluasi terapi Patient Controlled Analgesia (PCA) opioid (morfin, fentanil, petidin)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Manajemen Nyeri" },
      { id: "RKK-MED3-10", no: 10, name: "Monitoring efek samping dan kepatuhan terapi antiretroviral (ARV) dan MTX/NSAID", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Farmakoterapi" },
      { id: "RKK-MED3-11", no: 11, name: "Analisa hasil analisa gas darah (AGD), elektrolit, CD4, dan ABI pada kasus kompleks", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Diagnostik" },
      { id: "RKK-MED3-12", no: 12, name: "Transfer pasien kategori NEWSS orange dan merah serta edukasi pra/pasca ring jantung", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kardiovaskuler" }
    ],

    "kmb_bedah_pk3": [
      { id: "RKK-BDH3-01", no: 1, name: "Pengkajian kasus bedah kompleks dan persiapan transplantasi hepar/ginjal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Bedah Kompleks" },
      { id: "RKK-BDH3-02", no: 2, name: "Deteksi dini reaksi rejeksi dan infeksi pasien pasca transplantasi hepar/ginjal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Transplantasi" },
      { id: "RKK-BDH3-03", no: 3, name: "Perawatan stoma dengan komplikasi peristomal, fistel, dan perawatan luka dehiscence", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Stoma & Wound" },
      { id: "RKK-BDH3-04", no: 4, name: "Manajemen keperawatan pasien bedah dengan ekstravasasi kemoterapi bedah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Onkologi Bedah" },
      { id: "RKK-BDH3-05", no: 5, name: "Pelaksanaan dan edukasi protokol ERAS (Enhanced Recovery After Surgery)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Protokol ERAS" },
      { id: "RKK-BDH3-06", no: 6, name: "Pendampingan pasien tindakan Self-Insertion Catheter intermitten berkemih mandiri", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Edukasi Mandiri" },
      { id: "RKK-BDH3-07", no: 7, name: "Pemberian obat pasca transplantasi hepar/ginjal & pemeriksaan kadar takrolimus", defaultKode: 1, jenisTindakan: "Mandat", domain: "Imunosupresan" },
      { id: "RKK-BDH3-08", no: 8, name: "Edukasi perawatan stoma, ileostomi, urostomi, gastrostomi, dan nefrostomi di rumah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Edukasi Pasien" }
    ],

    "perioperatif_pk3": [
      { id: "RKK-OK3-01", no: 1, name: "Pengkajian praoperasi, intraoperasi, pascaoperasi, dan serah terima tim bedah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Bedah" },
      { id: "RKK-OK3-02", no: 2, name: "Penerapan keselamatan operasi: Sign In, Time Out, dan Sign Out sesuai standar WHO", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Surgical Safety" },
      { id: "RKK-OK3-03", no: 3, name: "Bundle pencegahan Infeksi Daerah Operasi (IDO), draping steril, dan uji kultur ruangan", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Sterilitas OK" },
      { id: "RKK-OK3-04", no: 4, name: "Peran Scrub Nurse (penyiapan instrumen bedah khusus, BMHP khusus, dressing luka operasi)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Scrub Nurse" },
      { id: "RKK-OK3-05", no: 5, name: "Peran Circulating Nurse (fasilitasi tim bedah, penanganan spesimen/jaringan patologi anatomi)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Circulating" },
      { id: "RKK-OK3-06", no: 6, name: "Operasional Electro Surgical Unit (ESU), laparoskopi, endoskopi, cusa, dan cauter bipolar", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Alat Canggih OK" },
      { id: "RKK-OK3-07", no: 7, name: "Operasional mesin bor bedah saraf/orthopedi, laser bedah, dan mesin pemecah batu urologi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Alat Spesialistik" },
      { id: "RKK-OK3-08", no: 8, name: "Operasional mesin phacoemulsifikasi dan vitreo-retina di Kamar Operasi Mata", defaultKode: 1, jenisTindakan: "Mandiri", domain: "OK Mata" },
      { id: "RKK-OK3-09", no: 9, name: "Pencegahan cedera posisi operasi, luka bakar diathermy, dan transfer NEWSS merah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Patient Safety" }
    ],

    "emergensi_pk3": [
      { id: "RKK-IGD3-01", no: 1, name: "Validasi tingkat kesadaran GCS, Triage IGD cepat (ATS/ESI), dan Breaking Bad News", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Triage & Komunikasi" },
      { id: "RKK-IGD3-02", no: 2, name: "Tatalaksana perawatan pasien PINERE, isolasi kontak langsung, dan airborne disease", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Isolasi Darurat" },
      { id: "RKK-IGD3-03", no: 3, name: "Manajemen gawat darurat infark miokard akut jalur cepat (Code STEMI)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Code STEMI" },
      { id: "RKK-IGD3-04", no: 4, name: "Manajemen gawat darurat serangan stroke akut jalur trombolisis (Code STROKE)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Code STROKE" },
      { id: "RKK-IGD3-05", no: 5, name: "Manajemen gawat darurat trauma multipel / bencana massal (Code Trauma)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Code Trauma" },
      { id: "RKK-IGD3-06", no: 6, name: "Manajemen kegawatdaruratan sepsis berat dan syok septik di IGD", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Resusitasi Syok" },
      { id: "RKK-IGD3-07", no: 7, name: "Tindakan intubasi endotrakeal darurat (Rapid Sequence Intubation) & dekontaminasi radiasi/kimia", defaultKode: 1, jenisTindakan: "Mandat", domain: "Airway Darurat" },
      { id: "RKK-IGD3-08", no: 8, name: "Continuous Positive Airway Pressure (CPAP) & asistensi ventilator invasif", defaultKode: 1, jenisTindakan: "Mandat", domain: "Ventilasi Darurat" },
      { id: "RKK-IGD3-09", no: 9, name: "Pemasangan surcane pada venaport (cellsite) & manajemen syok kardiogenik", defaultKode: 1, jenisTindakan: "Mandat", domain: "Akses Vaskuler" },
      { id: "RKK-IGD3-10", no: 10, name: "Tatalaksana awal dan perlindungan pada kasus kekerasan terhadap anak dan wanita", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Medikolegal IGD" }
    ],

    "intensif_pk3": [
      { id: "RKK-ICU3-01", no: 1, name: "Pengkajian Pre-Arrival, Quick Assessment, dan Comprehensive Assessment pasien ICU", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Kritis" },
      { id: "RKK-ICU3-02", no: 2, name: "Manajemen alarm fatigue di ICU, cooling/warming system, dan personal hygiene multidevice", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Lingkungan Kritis" },
      { id: "RKK-ICU3-03", no: 3, name: "Pencegahan MARSI (Medical Adhesive Related Skin Injury) dan pencegahan self-extubation", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Patient Safety" },
      { id: "RKK-ICU3-04", no: 4, name: "Interpretasi EKG aritmia letal dan tatalaksana lanjut kegawatdaruratan cardiac arrest ICU", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Aritmia Letal" },
      { id: "RKK-ICU3-05", no: 5, name: "Setting, kalibrasi, troubleshooting, penyapihan (weaning), dan ekstubasi ventilator mekanik", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Ventilator Mekanik" },
      { id: "RKK-ICU3-06", no: 6, name: "Suctioning pasien terpasang ventilator ETT/trakeostomi dengan teknik 3A (asianotik, atraumatik, aseptik)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Airway Clearance" },
      { id: "RKK-ICU3-07", no: 7, name: "Manajemen Continuous Renal Replacement Therapy (CRRT) dan Therapeutic Plasma Exchange (TPE)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Renal Support" },
      { id: "RKK-ICU3-08", no: 8, name: "Perawatan luka bakar >30%, flap, STSG/FTSG, luka bakar kimia & listrik (Unit Luka Bakar)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Unit Luka Bakar" },
      { id: "RKK-ICU3-09", no: 9, name: "Pemasangan EKG 18 lead, interpretasi STEMI/NSTEMI, dan perawatan pasca PCI/TPM/PPM (ICCU)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "ICCU Jantung" },
      { id: "RKK-ICU3-10", no: 10, name: "Perawatan pasien terpasang Intra Aortic Balloon Pump (IABP) dan Nitric Oxide (NO)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Advanced Cardiac" }
    ],

    "kardiovaskuler_rawat_pk3": [
      { id: "RKK-KRD3-01", no: 1, name: "Pemeriksaan fisik kardiovaskuler komprehensif & interpretasi EKG abnormal (iskemia/infark/blok)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Diagnostik Kardio" },
      { id: "RKK-KRD3-02", no: 2, name: "Advance Cardiac Life Support (ACLS) & manajemen kegawatan cyanotic spell", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Resusitasi Kardio" },
      { id: "RKK-KRD3-03", no: 3, name: "Persiapan dan pemantauan Holter monitoring, treadmill test, TEE, dan Dobutamin Stress Echo", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pemeriksaan Non-Invasif" },
      { id: "RKK-KRD3-04", no: 4, name: "Perawatan luka operasi jantung pasca CABG (pengambilan luka vena safena/SVG)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Luka Kardiovaskuler" },
      { id: "RKK-KRD3-05", no: 5, name: "Merawat pasien terpasang pacemaker permanen dan temporer", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pacemaker" },
      { id: "RKK-KRD3-06", no: 6, name: "Pencabutan mini drain perikardium, perawatan drain WSD dada, dan pencabutan pacing wire", defaultKode: 1, jenisTindakan: "Mandat", domain: "Tindakan Khusus" },
      { id: "RKK-KRD3-07", no: 7, name: "Perawatan pasca tindakan diagnostik/intervensi puncture radial dan femoral serta cabut sheath", defaultKode: 1, jenisTindakan: "Mandat", domain: "Puncture Care" },
      { id: "RKK-KRD3-08", no: 8, name: "Pemeriksaan Activating Clotting Time (ACT) dan edukasi Activity Daily Living (ADL) pacemaker", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Laboratorium & Edukasi" }
    ],

    "kardiovaskuler_cathlab_pk3": [
      { id: "RKK-CTL3-01", no: 1, name: "Persiapan ruangan cathlab, BMHP khusus, mesin penunjang, dan mesin hemodinamik", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Persiapan Cathlab" },
      { id: "RKK-CTL3-02", no: 2, name: "Fasilitasi tindakan venografi, arteriografi, dan corangiografi femoral/radial", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Angiografi" },
      { id: "RKK-CTL3-03", no: 3, name: "Fasilitasi tindakan kateterisasi jantung kanan dan kiri", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kateterisasi" },
      { id: "RKK-CTL3-04", no: 4, name: "Fasilitasi tindakan PTCA (Percutaneous Transluminal Coronary Angioplasty) stent & CTO", defaultKode: 1, jenisTindakan: "Mandiri", domain: "PTCA Stent" },
      { id: "RKK-CTL3-05", no: 5, name: "Fasilitasi penutupan defek bawaan: ASD transkateter & VSD transkateter dengan vascular plug", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Penutupan ASD/VSD" },
      { id: "RKK-CTL3-06", no: 6, name: "Fasilitasi tindakan PTBV balon valvuloplasti, rotablator, dan embolisasi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Intervensi Khusus" },
      { id: "RKK-CTL3-07", no: 7, name: "Fasilitasi tindakan EVAR (Endo Vascular Aneurysm Repair) & TEVAR", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Aneurisma Aorta" },
      { id: "RKK-CTL3-08", no: 8, name: "Fasilitasi tindakan gawat darurat Primary PTCA pada serangan infark miokard akut", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Primary PTCA" },
      { id: "RKK-CTL3-09", no: 9, name: "Pengoperasian mesin programmer pacemaker dan mesin elektrofisiologi ablasi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Elektrofisiologi" }
    ],

    "kardiovaskuler_perfusi_pk3": [
      { id: "RKK-PRF3-01", no: 1, name: "Pengkajian berat/tinggi badan untuk kalkulasi BSA (Body Surface Area) dan Cardiac Index (CI)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kalkulasi Perfusi" },
      { id: "RKK-PRF3-02", no: 2, name: "Persiapan, kalibrasi, dan pengecekan mesin CPB (Cardiopulmonary Bypass) dan hemoterm", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Mesin CPB" },
      { id: "RKK-PRF3-03", no: 3, name: "Pembuatan cairan kristaloid kardioplegia dan pendinginan kardioplegia darah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kardioplegia" },
      { id: "RKK-PRF3-04", no: 4, name: "Merangkai sirkuit CPB, pemasangan oksigenator, dan priming dengan kristaloid/darah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Sirkuit & Priming" },
      { id: "RKK-PRF3-05", no: 5, name: "Pengelolaan mesin Cardiopulmonary Bypass (CPB) pada operasi jantung dewasa dan anak", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pengelolaan CPB" },
      { id: "RKK-PRF3-06", no: 6, name: "Pengelolaan mesin CPB pada kasus emergency bypass dan pengelolaan mesin Cell Saver", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Emergency & Cell Saver" },
      { id: "RKK-PRF3-07", no: 7, name: "Pengelolaan mesin Extracorporeal Membrane Oxygenation (ECMO) dan Nitric Oxide (NO)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "ECMO" },
      { id: "RKK-PRF3-08", no: 8, name: "Pengelolaan hemofiltrasi CPB: Continuous Ultra Filtrations (CUF) & Modified Ultra Filtrations (MUF)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Ultrafiltrasi" }
    ],

    "neurosains_pk3": [
      { id: "RKK-NEU3-01", no: 1, name: "Memverifikasi tingkat kesadaran GCS, skrining menelan stroke, skor NIHSS, dan MMSE", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Neuro" },
      { id: "RKK-NEU3-02", no: 2, name: "Memonitor hemodinamik pada pasien post Code Stroke dan peningkatan tekanan intrakranial", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Stroke Akut" },
      { id: "RKK-NEU3-03", no: 3, name: "Perawatan luka operasi kraniotomi, kranioplasti MESH, dan laminektomi dekompresi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Luka Bedah Saraf" },
      { id: "RKK-NEU3-04", no: 4, name: "Perawatan drain ventrikulostomi (EVD), VP Shunt, dan luka bedah saraf anak (spina bifida/hidrosefalus)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Drain & Shunt" },
      { id: "RKK-NEU3-05", no: 5, name: "Fasilitasi dan pendampingan pemeriksaan lumbal pungsi, neuro-otologi, EEG, dan EMG", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Diagnostik Neuro" },
      { id: "RKK-NEU3-06", no: 6, name: "Menganalisa hasil diagnostik CT Scan kepala, MRI, CT Myelografi, DSA, dan cairan CSF", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Neuro-Radiologi" },
      { id: "RKK-NEU3-07", no: 7, name: "Monitoring respon terapi obat antikonvulsan, osmoterapi, dan metabolisme otak", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Farmakoterapi Neuro" }
    ],

    "geriatri_pk3": [
      { id: "RKK-GER3-01", no: 1, name: "Validasi pengkajian komprehensif geriatri (malnutrisi, imobilisasi, inkontinensia, demensia, jatuh)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Geriatri" },
      { id: "RKK-GER3-02", no: 2, name: "Komunikasi terapeutik pasien geriatri dengan gangguan pendengaran, penglihatan, dan demensia", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Komunikasi Lansia" },
      { id: "RKK-GER3-03", no: 3, name: "Manajemen delirium akut lansia dan penyediaan lingkungan fisik bebas bahaya jatuh", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Delirium & Safety" },
      { id: "RKK-GER3-04", no: 4, name: "Perawatan luka tekan (Pressure Ulcer) grade III-IV dan ulkus diabetik kronik pada lansia", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Luka Geriatri" },
      { id: "RKK-GER3-05", no: 5, name: "Rekonsiliasi obat-obatan geriatri, pemantauan polifarmasi, dan efek samping obat pada lansia", defaultKode: 1, jenisTindakan: "Mandat", domain: "Farmakoterapi Lansia" },
      { id: "RKK-GER3-06", no: 6, name: "Manajemen inkontinensia urin & alvi serta program latihan kebiasaan berkemih lansia", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Eliminasi Lansia" },
      { id: "RKK-GER3-07", no: 7, name: "Terapi latihan fisik ambulasi, gerak sendi (ROM), positioning, dan Progressive Muscle Relaxation", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Rehabilitasi Fisik" },
      { id: "RKK-GER3-08", no: 8, name: "Dukungan pengasuhan (Caregiver Support) dan perlindungan terhadap kekerasan pada lansia", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Caregiver Support" }
    ],

    "onkologi_pk3": [
      { id: "RKK-ONK3-01", no: 1, name: "Menganalisis hasil pengkajian asuhan keperawatan pasien kanker (kemoterapi, radiasi, bedah, target)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Kanker" },
      { id: "RKK-ONK3-02", no: 2, name: "Penerapan prinsip proteksi radiasi dan pendampingan radiasi eksternal serta brakiterapi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Radioterapi" },
      { id: "RKK-ONK3-03", no: 3, name: "Penanganan tumpahan obat kemoterapi sitotoksik (spill kit) dan limbah sitotoksik", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Sitotoksik Safety" },
      { id: "RKK-ONK3-04", no: 4, name: "Tatalaksana ekstravasasi obat kemoterapi & pencegahan cedera pansitopenia", defaultKode: 1, jenisTindakan: "Mandat", domain: "Ekstravasasi" },
      { id: "RKK-ONK3-05", no: 5, name: "Tatalaksana kegawatdaruratan onkologi: tumor lisis sindrom, hiperleukositosis, limfedema", defaultKode: 1, jenisTindakan: "Mandat", domain: "Kedaruratan Onkologi" },
      { id: "RKK-ONK3-06", no: 6, name: "Pemasangan dan pelepasan jarum Huber pada vena port (cellsite) & rawat luka kanker", defaultKode: 1, jenisTindakan: "Mandat", domain: "Vena Port" },
      { id: "RKK-ONK3-07", no: 7, name: "Serah terima sitotoksik dan dokumentasi formulir OAK (Obat Anti Kanker)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Formulir OAK" },
      { id: "RKK-ONK3-08", no: 8, name: "Asuhan keperawatan paliatif end of life dan pendampingan keluarga pasien dying", defaultKode: 1, jenisTindakan: "Mandat", domain: "Paliatif Care" }
    ],

    "anestesi_pk3": [
      { id: "RKK-ANS3-01", no: 1, name: "Evaluasi status fisik ASA, penyulit intubasi, dan skor Mallampati pasien pra anestesi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pra-Anestesi" },
      { id: "RKK-ANS3-02", no: 2, name: "Persiapan alat STATICS (Scope, Tape, Airway, Tube, Introducer, Connector, Suction) & mesin anestesi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Persiapan Anestesi" },
      { id: "RKK-ANS3-03", no: 3, name: "Pemantauan skor Aldrete (rawat inap) dan skor PADSS (rawat jalan) pasca anestesi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pasca-Anestesi" },
      { id: "RKK-ANS3-04", no: 4, name: "Manajemen jalan napas (BMV, OPA, face mask) & induksi anestesi elektif bersama dokter anestesi", defaultKode: 1, jenisTindakan: "Mandat", domain: "Induksi Anestesi" },
      { id: "RKK-ANS3-05", no: 5, name: "Tindakan intubasi endotrakeal tube elektif & ekstubasi pipa endotrakeal bersama dokter anestesi", defaultKode: 1, jenisTindakan: "Mandat", domain: "Intubasi & Ekstubasi" },
      { id: "RKK-ANS3-06", no: 6, name: "Induksi Total Intra Venous Anesthesia (TIVA), intraspinal, dan pemberian antidotum reverse", defaultKode: 1, jenisTindakan: "Mandat", domain: "TIVA Anestesi" },
      { id: "RKK-ANS3-07", no: 7, name: "Verifikasi dokumen Surat Izin Tindakan Anestesi (SITA) dan pengisian form Status Anestesi", defaultKode: 1, jenisTindakan: "Mandat", domain: "Dokumentasi Anestesi" },
      { id: "RKK-ANS3-08", no: 8, name: "Asistensi pelaksanaan anestesi regional (spinal/epidural) dan evaluasi kateter epidural", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Anestesi Regional" }
    ],

    "nefrologi_pk3": [
      { id: "RKK-NEF3-01", no: 1, name: "Anamnesis pasien dialisis dan pengkajian fisik integritas kulit area akses vaskuler", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Dialisis" },
      { id: "RKK-NEF3-02", no: 2, name: "Inisiasi Hemodialisis (HD inisiasi), profiling natrium, dan penentuan berat badan kering (dry weight)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Inisiasi HD" },
      { id: "RKK-NEF3-03", no: 3, name: "Kanulasi cimino, puncture femoral, dan akses Catheter Double Lumen (CDL/tunnel HD)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kanulasi Vaskuler" },
      { id: "RKK-NEF3-04", no: 4, name: "Tatalaksana komplikasi HD: hipotensi, kram, jarum tercabut, dialiser bocor, kloting, disequilibrium", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Komplikasi HD" },
      { id: "RKK-NEF3-05", no: 5, name: "Pemeriksaan Peritoneal Equilibrium Test (PET), adekuasi CAPD, dan penggantian transfer set", defaultKode: 1, jenisTindakan: "Mandiri", domain: "CAPD Dialisis" },
      { id: "RKK-NEF3-06", no: 6, name: "Tatalaksana infeksi peritonitis CAPD, kultur cairan dianeal, dan antibiotik intraperitoneal", defaultKode: 1, jenisTindakan: "Mandat", domain: "Infeksi CAPD" },
      { id: "RKK-NEF3-07", no: 7, name: "Operasional Sustained Low Efficiency Dialysis (SLED) dan Continuous Renal Replacement Therapy (CRRT)", defaultKode: 1, jenisTindakan: "Mandat", domain: "SLED & CRRT" },
      { id: "RKK-NEF3-08", no: 8, name: "Monitoring kualitas air Reverse Osmosis (RO) dialisis (fisika, kimia, mikrobiologi, endotoksin)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kualitas Air RO" }
    ],

    "gastro_hepato_pk3": [
      { id: "RKK-GST3-01", no: 1, name: "Pengkajian pasien prosedur gastroenterologi dan hepatobilier di ruang endoskopi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Gastro" },
      { id: "RKK-GST3-02", no: 2, name: "Fasilitasi tindakan EGD diagnostik dan pengambilan spesimen biopsi jaringan", defaultKode: 1, jenisTindakan: "Mandiri", domain: "EGD Biopsi" },
      { id: "RKK-GST3-03", no: 3, name: "Fasilitasi kolonoskopi diagnostik, biopsi, ligasi varises esofagus (VE), dan polipektomi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kolonoskopi & Polipektomi" },
      { id: "RKK-GST3-04", no: 4, name: "Fasilitasi endoskopi hemostatik perdarahan, pemasangan hemoklip, dan ekstraksi benda asing", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Hemostatik Endoskopi" },
      { id: "RKK-GST3-05", no: 5, name: "Fasilitasi tindakan ERCP, enteroskopi double balloon, injeksi histoacryl, dan dilatasi esofagus", defaultKode: 1, jenisTindakan: "Mandat", domain: "ERCP Lanjut" },
      { id: "RKK-GST3-06", no: 6, name: "Fasilitasi USG abdomen, Fibroscan, punksi asites, biopsi hepar, dan aspirasi abses hepar", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Hepatobilier Intervensi" },
      { id: "RKK-GST3-07", no: 7, name: "Perawatan drainase pasca PTBD, pigtail asites/abses dengan komplikasi, dan edukasi PEG", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Drainase & PEG" }
    ],

    "respirologi_pk3": [
      { id: "RKK-RSP3-01", no: 1, name: "Pengkajian komprehensif penyakit pernapasan akut/kronis dan interpretasi analisa gas darah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Paru" },
      { id: "RKK-RSP3-02", no: 2, name: "Tatalaksana komplikasi akut respirologi (obstruksi jalan napas, pneumothorax, hemoptisis masif)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kedaruratan Paru" },
      { id: "RKK-RSP3-03", no: 3, name: "Fasilitasi tindakan bronkoskopi, torakoskopi, biopsi paru, dan pengambilan spesimen", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Bronkoskopi" },
      { id: "RKK-RSP3-04", no: 4, name: "Fasilitasi Trans Bronchial Aspiration Needle (TBNA) dan Trans Bronchial Lung Biopsy (TBLB)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Biopsi Paru Invasif" },
      { id: "RKK-RSP3-05", no: 5, name: "Fasilitasi Endo Bronchial Ultrasound (EBUS) radial dan linier", defaultKode: 1, jenisTindakan: "Mandat", domain: "EBUS" },
      { id: "RKK-RSP3-06", no: 6, name: "Fasilitasi cryo biopsy, cryo therapy, dan Argon Plasma Coagulation (APC) perdarahan napas", defaultKode: 1, jenisTindakan: "Mandat", domain: "Krioterapi Paru" },
      { id: "RKK-RSP3-07", no: 7, name: "Perawatan Water Seal Drainage (WSD) besar, mini pleural drain, pleurodesis, dan fibrinolitik", defaultKode: 1, jenisTindakan: "Mandiri", domain: "WSD Drain" },
      { id: "RKK-RSP3-08", no: 8, name: "Perawatan CVC, PICC (peripherally inserted central catheter), dan IPC (indwelling pleural catheter)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kateter Pleura" }
    ],

    "mata_pk3": [
      { id: "RKK-MTA3-01", no: 1, name: "Pemeriksaan visus kasar, evaluasi tajam penglihatan refraksionis, dan lapor TIO kritis", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Tajam Penglihatan" },
      { id: "RKK-MTA3-02", no: 2, name: "Perawatan mata infeksi (blenore, endoftalmitis), irigasi mata, dan perawatan trauma mata", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Perawatan Mata" },
      { id: "RKK-MTA3-03", no: 3, name: "Observasi tanda penolakan pasca transplantasi kornea dan penyerapan hifema", defaultKode: 1, jenisTindakan: "Mandat", domain: "Bedah Kornea" },
      { id: "RKK-MTA3-04", no: 4, name: "Observasi lepasnya lensa pasca operasi katarak dan pengukuran TIO post operasi retina", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pasca Bedah Mata" },
      { id: "RKK-MTA3-05", no: 5, name: "Pemeriksaan diagnostik Optical Coherence Tomography (OCT), Humphrey, dan Foto Fundus", defaultKode: 1, jenisTindakan: "Mandat", domain: "OCT & Fundus" },
      { id: "RKK-MTA3-06", no: 6, name: "Pemeriksaan IOL Master, ERG, Visual Evoked Potential (VEP), dan Ret Cam pada anak/dewasa", defaultKode: 1, jenisTindakan: "Mandat", domain: "Diagnostik Lanjut" },
      { id: "RKK-MTA3-07", no: 7, name: "Asistensi pemeriksaan USG mata, laser mata, uji Anel, dan terapi injeksi intra-vitreal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Injeksi Intravitreal" }
    ],

    "radiologi_pk3": [
      { id: "RKK-RAD3-01", no: 1, name: "Pengkajian kontras media, perhitungan eGFR, dan edukasi pasien terapi ablasi tiroid", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Radiologi" },
      { id: "RKK-RAD3-02", no: 2, name: "Skrining logam dalam tubuh pasien sebelum pemeriksaan Magnetic Resonance Imaging (MRI)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "MRI Safety" },
      { id: "RKK-RAD3-03", no: 3, name: "Penerapan APD proteksi radiasi dan supervisi penanganan tumpahan medis/radiasi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Proteksi Radiasi" },
      { id: "RKK-RAD3-04", no: 4, name: "Tatalaksana ekstravasasi kontras media dan reaksi alergi kontras radiologi", defaultKode: 1, jenisTindakan: "Mandat", domain: "Alergi Kontras" },
      { id: "RKK-RAD3-05", no: 5, name: "Pengoperasian mesin injektor kontras CT Scan dan MRI serta observasi pasca kontras", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Injektor Kontras" },
      { id: "RKK-RAD3-06", no: 6, name: "Pemberian radiofarmaka injeksi shielding syringe pada pemeriksaan Kedokteran Nuklir", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kedokteran Nuklir" },
      { id: "RKK-RAD3-07", no: 7, name: "Fasilitasi tindakan biopsi dengan tuntunan CT-Scan atau USG (Guiding Biopsy)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Biopsi CT Guided" },
      { id: "RKK-RAD3-08", no: 8, name: "Pencabutan sheath radial dan femoral di ruang Radiologi Intervensional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Intervensional" }
    ],

    "anak_pk2": [
      { id: "RKK-ANK2-01", no: 1, name: "Anamnesis pasien anak & skrining perkembangan dengan Kuesioner Pra Skrining Perkembangan (KPSP)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Tumbuh Kembang" },
      { id: "RKK-ANK2-02", no: 2, name: "Komunikasi terapeutik perkembangan anak: distraksi, story telling, dan terapi sentuhan", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Komunikasi Anak" },
      { id: "RKK-ANK2-03", no: 3, name: "Deteksi dini perburukan kondisi anak dengan Pediatric Early Warning Score (PEWS)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "PEWS Anak" },
      { id: "RKK-ANK2-04", no: 4, name: "Pemasangan IV kateter perifer tanpa penyulit & hitung kebutuhan cairan anak", defaultKode: 1, jenisTindakan: "Mandat", domain: "Cairan Anak" },
      { id: "RKK-ANK2-05", no: 5, name: "Pemberian imunisasi sesuai usia & pemberian nutrisi enteral via Oro Gastro Tube (OGT)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Imunisasi & Nutrisi" },
      { id: "RKK-ANK2-06", no: 6, name: "Penerapan prinsip Atraumatic Care dan Family Centered Care (FCC) di rumah sakit", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Atraumatic Care" }
    ],

    "anak_medikal_pk3": [
      { id: "RKK-ANKM3-01", no: 1, name: "Interpretasi data skrining infeksi/non-infeksi & pencegahan perdarahan anak infeksi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Infeksi Anak" },
      { id: "RKK-ANKM3-02", no: 2, name: "Pencegahan dan penatalaksanaan flebitis/ekstravasasi pada pembuluh darah anak", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Vaskuler Anak" },
      { id: "RKK-ANKM3-03", no: 3, name: "Manajemen ventilasi mekanik (voltrain) & suctioning anak baging manual", defaultKode: 1, jenisTindakan: "Mandat", domain: "Respirasi Anak" },
      { id: "RKK-ANKM3-04", no: 4, name: "Manajemen cairan, elektrolit, dan syok pada anak dengan penyakit infeksi berat", defaultKode: 1, jenisTindakan: "Mandat", domain: "Kedaruratan Anak" }
    ],

    "anak_hemato_pk3": [
      { id: "RKK-ANKH3-01", no: 1, name: "Dokumentasi asuhan keperawatan anak hemato-onkologi & pengkajian 4 ranah paliatif", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Hemato-Onkologi" },
      { id: "RKK-ANKH3-02", no: 2, name: "Pencegahan dan tatalaksana perdarahan pada anak leukemia dan hemofilia", defaultKode: 1, jenisTindakan: "Mandat", domain: "Perdarahan Anak" },
      { id: "RKK-ANKH3-03", no: 3, name: "Tatalaksana kegawatdaruratan tumor lisis sindrom, hiperleukositosis, dan febril neutropenia anak", defaultKode: 1, jenisTindakan: "Mandat", domain: "Onkologi Kritis" },
      { id: "RKK-ANKH3-04", no: 4, name: "Pemasangan dan pelepasan jarum Huber vena port cellsite & kemoterapi anak", defaultKode: 1, jenisTindakan: "Mandat", domain: "Kemoterapi Anak" }
    ],

    "anak_bedah_pk3": [
      { id: "RKK-ANKB3-01", no: 1, name: "Pengkajian pra/pasca operasi kelainan kongenital anak dan transplantasi hati/ginjal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Bedah Anak" },
      { id: "RKK-ANKB3-02", no: 2, name: "Perawatan luka kelainan kongenital anak: omphalocele, gastroschisis, dan ekstrofi buli", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kongenital Wound" },
      { id: "RKK-ANKB3-03", no: 3, name: "Perawatan luka stoma komplikasi peristomal pada anak dan pemberian imunosupresan", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Stoma Anak" }
    ],

    "anak_nefrologi_pk3": [
      { id: "RKK-ANKN3-01", no: 1, name: "Pengkajian anak dialisis (CKD Stage V) dan kontrol perlindungan infeksi kateter dialisis", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Nefrologi Anak" },
      { id: "RKK-ANKN3-02", no: 2, name: "Pelaksanaan terapi hemodialisis anak dan terapi Continuous Ambulatory Peritoneal Dialysis (CAPD)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Dialisis Anak" },
      { id: "RKK-ANKN3-03", no: 3, name: "Penatalaksanaan Continuous Renal Replacement Therapy (CRRT) dan plasmaferesis anak", defaultKode: 1, jenisTindakan: "Mandat", domain: "CRRT Anak" }
    ],

    "anak_picu_pk3": [
      { id: "RKK-PICU3-01", no: 1, name: "Pengkajian Pediatric Assessment Triangle (PAT) dan analisis indikasi intubasi anak", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen PICU" },
      { id: "RKK-PICU3-02", no: 2, name: "Penyapihan ventilasi mekanik invasif/non-invasif & suction teknik 3A pada anak", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Ventilator PICU" },
      { id: "RKK-PICU3-03", no: 3, name: "Persiapan arteri line, kateter ganda CDL, CRRT, dan monitoring perfusi jaringan kritis", defaultKode: 1, jenisTindakan: "Mandat", domain: "Invasif PICU" }
    ],

    "anak_nicu_pk3": [
      { id: "RKK-NICU3-01", no: 1, name: "Asuhan perkembangan neonatus kritis, deteksi BBLR/BBLASR, dan pencegahan MARSI bayi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asuhan Neonatus" },
      { id: "RKK-NICU3-02", no: 2, name: "Pemantauan neonatus cooling therapy dan Near Infra Red Spectroscopy (NIRS)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Monitoring NICU" },
      { id: "RKK-NICU3-03", no: 3, name: "Resusitasi neonatus, stabilisasi, penyapihan ventilator mekanik, dan terapi surfaktan", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Resusitasi Bayi" },
      { id: "RKK-NICU3-04", no: 4, name: "Pemasangan dan perawatan jalur PICC (Peripherally Inserted Central Catheter) & kateter umbilikal", defaultKode: 1, jenisTindakan: "Mandat", domain: "PICC Bayi" },
      { id: "RKK-NICU3-05", no: 5, name: "Asistensi pelaksanaan transfusi tukar pada neonatus hiperbilirubinemia berat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Transfusi Tukar" }
    ],

    "maternitas_pk2": [
      { id: "RKK-MAT2-01", no: 1, name: "Pengkajian obstetri, ginekologi, ibu bersalin Kala I-IV, dan perawatan bayi baru lahir", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Maternitas" },
      { id: "RKK-MAT2-02", no: 2, name: "Deteksi dini perburukan dengan Modified Early Obstetric Warning Score (MEOWS)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "MEOWS" },
      { id: "RKK-MAT2-03", no: 3, name: "Pemantauan kesejahteraan janin (denyut jantung janin/DJJ dan gerakan janin)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "DJJ Janin" },
      { id: "RKK-MAT2-04", no: 4, name: "Perawatan payudara/SADARI/SADARNIS, rawat tali pusat, dan konseling ASI eksklusif", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Laktasi & Bayi" },
      { id: "RKK-MAT2-05", no: 5, name: "Perawatan luka operasi sectio caesarea (SC), laparatomi, dan luka episiotomi", defaultKode: 1, jenisTindakan: "Mandat", domain: "Luka SC" },
      { id: "RKK-MAT2-06", no: 6, name: "Bladder training dan latihan otot panggul (pelvic muscle exercise / senam kegel)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Rehabilitasi Panggul" }
    ],

    "maternitas_obgyn_pk3": [
      { id: "RKK-OBG3-01", no: 1, name: "Pengkajian obstetri penyulit: PEB/Eklampsia, HAP/HPP, perdarahan ante/post-partum", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Obstetri Kritis" },
      { id: "RKK-OBG3-02", no: 2, name: "Pemantauan kesejahteraan janin dengan Cardio Tocography (CTG) dan tatalaksana MEOWS", defaultKode: 1, jenisTindakan: "Mandat", domain: "Kardiotokografi (CTG)" },
      { id: "RKK-OBG3-03", no: 3, name: "Manajemen dan monitoring pemberian terapi MgSO4 pada pasien preeklampsia berat (PEB)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Terapi MgSO4" },
      { id: "RKK-OBG3-04", no: 4, name: "Resusitasi bayi baru lahir asfiksia di ruang bersalin (VK) & Perawatan Metode Kanguru (PMK)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Resusitasi VK" },
      { id: "RKK-OBG3-05", no: 5, name: "Perawatan pessarium, prolaps uteri, dan luka perineum dengan ruptur grade III-IV", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Luka Perineum" }
    ],

    "maternitas_onkologi_pk3": [
      { id: "RKK-MATO3-01", no: 1, name: "Pengkajian kanker ginekologi (serviks, ovarium, endometrium, trofoblas ganas)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kanker Ginekologi" },
      { id: "RKK-MATO3-02", no: 2, name: "Protokol kemoterapi ginekologi, pencegahan ekstravasasi, dan penanganan luka kanker", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kemoterapi Obgyn" },
      { id: "RKK-MATO3-03", no: 3, name: "Bladder training dan edukasi seksual pasien post histerektomi radikal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Histerektomi Radikal" }
    ],

    "maternitas_fertilitas_pk3": [
      { id: "RKK-MATF3-01", no: 1, name: "Pengkajian infertilitas (PCOS, endometriosis) & analisa hasil hormon reproduksi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Infertilitas" },
      { id: "RKK-MATF3-02", no: 2, name: "Pendampingan pasien program Bayi Tabung (In Vitro Fertilization / IVF)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Bayi Tabung (IVF)" },
      { id: "RKK-MATF3-03", no: 3, name: "Monitoring komplikasi Ovarian Hyperstimulation Syndrome (OHSS) & terapi hormonal", defaultKode: 1, jenisTindakan: "Mandat", domain: "Komplikasi OHSS" },
      { id: "RKK-MATF3-04", no: 4, name: "Pendampingan tindakan inseminasi, ovum pick up (OPU), dan embrio transfer (ET)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Tindakan Reproduksi" }
    ],

    "jiwa_pk2": [
      { id: "RKK-JWA2-01", no: 1, name: "Pengkajian risiko perilaku kekerasan (RPK), halusinasi, isolasi sosial, defisit perawatan diri, waham", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Jiwa" },
      { id: "RKK-JWA2-02", no: 2, name: "Terapi Aktivitas Kelompok (TAK) sosialisasi dan stimulasi persepsi halusinasi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "TAK Jiwa" },
      { id: "RKK-JWA2-03", no: 3, name: "Monitoring pasien RPK dengan restraint fisik & skala SASBA (St. Andrew Sexual Behaviour)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Restraint & Safety" },
      { id: "RKK-JWA2-04", no: 4, name: "Pemberian obat pasien gaduh gelisah sesuai SOP & monitoring efek samping obat antipsikotik", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Farmakoterapi Jiwa" }
    ],

    "jiwa_pk3": [
      { id: "RKK-JWA3-01", no: 1, name: "Pengkajian harga diri rendah, risiko bunuh diri, waham, dan keperawatan jiwa anak/geriatri", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Jiwa Spesifik" },
      { id: "RKK-JWA3-02", no: 2, name: "Komunikasi terapeutik anak berkebutuhan khusus (ADHD, Autism, mental retardasi)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Tumbuh Kembang Jiwa" },
      { id: "RKK-JWA3-03", no: 3, name: "Komunikasi terapeutik pasien ketergantungan NAPZA dan sindrom putus zat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "NAPZA" },
      { id: "RKK-JWA3-04", no: 4, name: "Asuhan keperawatan pra, intra, dan pasca tindakan Electro Convulsive Therapy (ECT)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Tindakan ECT" }
    ],

    // PK IV (Proficient / Mahir Konsultan Ruangan Sesuai Buku Putih)
    "kmb_medikal_pk4": [
      { id: "RKK-PK4-01", no: 1, name: "Memvalidasi Nursing Care Plan (NCP) dan menyusun rencana asuhan kasus kompleks", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Validasi NCP" },
      { id: "RKK-PK4-02", no: 2, name: "Memberikan advokasi pasien dan menjawab konsultasi perawatan luka spesifik", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultasi Klinis" },
      { id: "RKK-PK4-03", no: 3, name: "Melakukan journal reading dalam diskusi ilmiah keperawatan & menjadi anggota riset", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Riset Klinis" },
      { id: "RKK-PK4-04", no: 4, name: "Melakukan audit mutu klinis keperawatan & penyusunan siklus PDSA (Plan-Do-Study-Act)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Mutu" },
      { id: "RKK-PK4-05", no: 5, name: "Terlibat dalam revisi Standar Prosedur Operasional (SPO) berbasis Evidence-Based Nursing (EBN)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Revisi SPO EBN" }
    ],

    // PK V (Expert / Pakar Rumah Sakit & Provinsi Sesuai Buku Putih)
    "kmb_medikal_pk5": [
      { id: "RKK-PK5-01", no: 1, name: "Berperan sebagai konsultan utama asuhan keperawatan rumah sakit dan regional Kalimantan Barat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Utama" },
      { id: "RKK-PK5-02", no: 2, name: "Melakukan journal appraisal untuk rekomendasi praktik klinis berbasis bukti (EBN)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "EBN Appraisal" },
      { id: "RKK-PK5-03", no: 3, name: "Melakukan penelitian klinis terapan keperawatan & publikasi ilmiah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Riset Terapan" },
      { id: "RKK-PK5-04", no: 4, name: "Memimpin proyek inovasi pelayanan dan perumusan kebijakan asuhan keperawatan rumah sakit", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Mutu" }
    ],

    
    "perioperatif_pk2": [
      { id: "RKK-OK2-01", no: 1, name: "Pengkajian pra-operasi dasar dan verifikasi identitas pasien (Sign In WHO)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Surgical Safety" },
      { id: "RKK-OK2-02", no: 2, name: "Persiapan instrumen dasar operasi minor & mayor serta BMHP steril", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Sterilitas OK" },
      { id: "RKK-OK2-03", no: 3, name: "Cuci tangan bedah (surgical scrub) dan pemakaian jas & sarung tangan steril", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Aseptik Bedah" },
      { id: "RKK-OK2-04", no: 4, name: "Penataan meja instrumen steril Mayo dan meja linen bedah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Meja Steril" },
      { id: "RKK-OK2-05", no: 5, name: "Peran instrumentator (Scrub Nurse) pada operasi bedah minor", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Scrub Nurse" },
      { id: "RKK-OK2-06", no: 6, name: "Peran sirkulator (Circulating Nurse) pada operasi elektif dasar", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Circulating" },
      { id: "RKK-OK2-07", no: 7, name: "Penghitungan kassa, jarum, dan instrumen sebelum dan sesudah insisi (Surgical Count)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Patient Safety" },
      { id: "RKK-OK2-08", no: 8, name: "Serah terima pasien pasca bedah di Recovery Room (RR) dengan SBAR", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Handover RR" }
    ],

    "emergensi_pk2": [
      { id: "RKK-IGD2-01", no: 1, name: "Melakukan triage awal kegawatdaruratan dasar (skala triase ATS/ESI)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Triage IGD" },
      { id: "RKK-IGD2-02", no: 2, name: "Melakukan Bantuan Hidup Dasar (BHD) resusitasi jantung paru dan penggunaan AED", defaultKode: 1, jenisTindakan: "Mandiri", domain: "BHD Darurat" },
      { id: "RKK-IGD2-03", no: 3, name: "Imobilisasi servikal dengan collar neck, log roll, dan pembidaian fraktur ekstremitas", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Trauma Care" },
      { id: "RKK-IGD2-04", no: 4, name: "Pemberian terapi oksigen darurat (nasal kanul, NRM) dan nebulisasi bronkodilator", defaultKode: 1, jenisTindakan: "Mandat", domain: "Oksigen Darurat" },
      { id: "RKK-IGD2-05", no: 5, name: "Bilas lambung darurat pada kasus keracunan atau hematemesis tanpa penyulit", defaultKode: 1, jenisTindakan: "Mandat", domain: "Gastric Lavage" },
      { id: "RKK-IGD2-06", no: 6, name: "Penjahitan luka robek sederhana (hecting) dan perawatan luka laserasi/ekskoriasi", defaultKode: 1, jenisTindakan: "Mandat", domain: "Luka Trauma" },
      { id: "RKK-IGD2-07", no: 7, name: "Perekaman EKG darurat 12 lead dan lapor temuan nilai kritis aritmia/ST-elevasi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Diagnostik IGD" },
      { id: "RKK-IGD2-08", no: 8, name: "Transfer pasien gawat darurat terkontrol ke unit rawat inap atau intensif", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Transfer Pasien" }
    ],

    "intensif_pk2": [
      { id: "RKK-ICU2-01", no: 1, name: "Pengkajian tanda vital pasien kritis via bedside monitor multifungsi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Monitoring ICU" },
      { id: "RKK-ICU2-02", no: 2, name: "Pengukuran dan pencatatan Central Venous Pressure (CVP) non-invasif/manometer", defaultKode: 1, jenisTindakan: "Mandiri", domain: "CVP Care" },
      { id: "RKK-ICU2-03", no: 3, name: "Suctioning jalan napas steril via pipa endotrakeal (ETT) / trakeostomi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Airway Care" },
      { id: "RKK-ICU2-04", no: 4, name: "Pemeliharaan fiksasi ETT dan perawatan mulut (oral hygiene chlorhexidine 0.2%)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "VAP Bundle" },
      { id: "RKK-ICU2-05", no: 5, name: "Pemberian dan titrasi obat vasoaktif/inotropik dasar via syringe pump terkalibrasi", defaultKode: 1, jenisTindakan: "Mandat", domain: "Titrasi Obat" },
      { id: "RKK-ICU2-06", no: 6, name: "Pemantauan balans cairan ketat per jam dan perhitungan diuresis urine", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Balans Cairan" },
      { id: "RKK-ICU2-07", no: 7, name: "Pencegahan cedera tekan imobilisasi kritis dengan kasur dekubitus dan reposisi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pencegahan HAIs" },
      { id: "RKK-ICU2-08", no: 8, name: "Perawatan kateter urin menetap terintegrasi bundle pencegahan ISK/CAUTI", defaultKode: 1, jenisTindakan: "Mandiri", domain: "CAUTI Bundle" }
    ],

    "kardiovaskuler_pk2": [
      { id: "RKK-KRD2-01", no: 1, name: "Pemeriksaan fisik kardiovaskuler dasar dan pemantauan tanda gagal jantung", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Jantung" },
      { id: "RKK-KRD2-02", no: 2, name: "Perekaman EKG 12 lead presisi tinggi dan deteksi dini aritmia letal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "EKG Diagnostik" },
      { id: "RKK-KRD2-03", no: 3, name: "Pemberian terapi obat anti-angina (nitrat sublingual/drip) dan antiplatelet", defaultKode: 1, jenisTindakan: "Mandat", domain: "Farmakoterapi Jantung" },
      { id: "RKK-KRD2-04", no: 4, name: "Pengukuran ankle-brachial index (ABI) dan pulsasi perifer ekstremitas", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Vaskuler Perifer" },
      { id: "RKK-KRD2-05", no: 5, name: "Pemantauan intake-output ketat dan edukasi diet rendah garam pasien gagal jantung", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Edukasi Jantung" },
      { id: "RKK-KRD2-06", no: 6, name: "Perawatan luka tusukan femoral / radial pasca kateterisasi jantung elektif", defaultKode: 1, jenisTindakan: "Mandat", domain: "Pasca Kateterisasi" },
      { id: "RKK-KRD2-07", no: 7, name: "Resusitasi jantung paru dan aktivasi Code Blue pada henti jantung rawat jalan/inap", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Emergensi Kardio" }
    ],

    "nefrologi_pk2": [
      { id: "RKK-NEF2-01", no: 1, name: "Pengkajian pre-dialisis (tanda overload cairan, edema perifer, ronkhi paru)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen HD" },
      { id: "RKK-NEF2-02", no: 2, name: "Setting, priming, dan uji kelayakan sirkuit mesin hemodialisis", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Mesin HD" },
      { id: "RKK-NEF2-03", no: 3, name: "Kanulasi AV fistula (Cimino) matur tanpa penyulit", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kanulasi AVF" },
      { id: "RKK-NEF2-04", no: 4, name: "Monitoring hemodinamik, blood flow (QB), dan dialysate flow (QD) selama HD", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Monitoring HD" },
      { id: "RKK-NEF2-05", no: 5, name: "Penanganan komplikasi intradialitik ringan (kram otot, hipotensi ringan)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Komplikasi HD" },
      { id: "RKK-NEF2-06", no: 6, name: "Terminasi dialisis, pengembalian darah (rinseback), dan hemostasis area punksi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Terminasi HD" },
      { id: "RKK-NEF2-07", no: 7, name: "Perawatan exit site kateter double lumen (CDL) non-infeksi", defaultKode: 1, jenisTindakan: "Mandat", domain: "Rawat CDL" }
    ],

    "onkologi_pk2": [
      { id: "RKK-ONK2-01", no: 1, name: "Pengkajian performa fisik (skor ECOG / Karnofsky) dan derajat nyeri kanker", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Onkologi" },
      { id: "RKK-ONK2-02", no: 2, name: "Pemberian premedikasi kemoterapi (antiemetik, antihistamin, kortikosteroid)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Premedikasi Kemo" },
      { id: "RKK-ONK2-03", no: 3, name: "Monitoring hidrasi sebelum dan sesudah kemoterapi intravena", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Hidrasi Kemo" },
      { id: "RKK-ONK2-04", no: 4, name: "Penerapan keselamatan sitostatika dan penggunaan APD kemoterapi terstandar", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Sitotoksik Safety" },
      { id: "RKK-ONK2-05", no: 5, name: "Perawatan luka kanker dengan eksudat minimal-sedang dan pengendalian bau", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Luka Kanker" },
      { id: "RKK-ONK2-06", no: 6, name: "Edukasi manajemen efek samping alopesia, stomatitis, dan mual pasca kemoterapi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Edukasi Onkologi" }
    ],

    "neurosains_pk2": [
      { id: "RKK-NEU2-01", no: 1, name: "Penilaian tingkat kesadaran GCS dan evaluasi refleks pupil berkala", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Neuro" },
      { id: "RKK-NEU2-02", no: 2, name: "Skrining fungsi menelan awal (water swallow test) pada pasien stroke akut", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Skrining Disfagia" },
      { id: "RKK-NEU2-03", no: 3, name: "Pemantauan tanda peningkatan tekanan intrakranial (TIK) dan posisi head-up 30°", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Manajemen TIK" },
      { id: "RKK-NEU2-04", no: 4, name: "Pencegahan komplikasi imobilisasi stroke (latihan ROM pasif & reposisi miring)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Mobilisasi Neuro" },
      { id: "RKK-NEU2-05", no: 5, name: "Perawatan kateter urin dan bowel training pasca stroke / trauma saraf", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Eliminasi Neuro" },
      { id: "RKK-NEU2-06", no: 6, name: "Edukasi keluarga mengenai pencegahan kekambuhan stroke dan rehabilitasi dasar", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Edukasi Stroke" }
    ],

    "geriatri_pk2": [
      { id: "RKK-GER2-01", no: 1, name: "Pengkajian komprehensif geriatri dasar (risiko jatuh Morse, inkontinensia, dekubitus)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Asesmen Geriatri" },
      { id: "RKK-GER2-02", no: 2, name: "Komunikasi efektif pada lansia dengan penurunan daya dengar atau gangguan kognitif", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Komunikasi Lansia" },
      { id: "RKK-GER2-03", no: 3, name: "Pencegahan jatuh lansia dengan penataan lingkungan kamar dan alas anti-selip", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Safety Lansia" },
      { id: "RKK-GER2-04", no: 4, name: "Pemantauan intake nutrisi dan deteksi dini dehidrasi tersembunyi pada lansia", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Nutrisi Lansia" },
      { id: "RKK-GER2-05", no: 5, name: "Perawatan kulit lansia yang kering dan pencegahan luka robek (skin tears)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kulit Geriatri" },
      { id: "RKK-GER2-06", no: 6, name: "Pendampingan mobilisasi bertahap dan latihan aktivitas harian mandiri lansia", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Rehabilitasi Lansia" }
    ],

    "anestesi_pk2": [
      { id: "RKK-ANS2-01", no: 1, name: "Pemeriksaan pra-anestesi dasar (tanda vital, riwayat alergi, status puasa)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pra-Anestesi" },
      { id: "RKK-ANS2-02", no: 2, name: "Penyiapan mesin anestesi, sirkuit napas, dan suction unit berfungsi baik", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Mesin Anestesi" },
      { id: "RKK-ANS2-03", no: 3, name: "Pemasangan monitor hemodinamik elektif pra-induksi (EKG, NIBP, SpO2)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Monitoring Anestesi" },
      { id: "RKK-ANS2-04", no: 4, name: "Asistensi dokter anestesi pada induksi anestesi umum dan intubasi elektif", defaultKode: 1, jenisTindakan: "Mandat", domain: "Asistensi Induksi" },
      { id: "RKK-ANS2-05", no: 5, name: "Pemantauan pemulihan kesadaran di Recovery Room dengan skor Aldrete", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Skor Aldrete" },
      { id: "RKK-ANS2-06", no: 6, name: "Pemeliharaan kepatenan jalan napas pasca ekstubasi dan pemberian oksigen", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Jalan Napas RR" }
    ],

    // PK IV (Proficient / Konsultan Ruangan Semua Area)
    "perioperatif_pk4": [
      { id: "RKK-OK4-01", no: 1, name: "Memvalidasi kelengkapan instrumen khusus operasi kompleks (bedah saraf, jantung, onkologi)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan IBS" },
      { id: "RKK-OK4-02", no: 2, name: "Konsultan sterilitas kamar bedah dan investigasi kejadian insiden keselamatan bedah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Mutu OK" },
      { id: "RKK-OK4-03", no: 3, name: "Supervisi dan mentoring perawat scrub & circulating pemula dalam tim bedah", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Preseptor Bedah" },
      { id: "RKK-OK4-04", no: 4, name: "Penyusunan dan revisi SPO pencegahan Infeksi Daerah Operasi (IDO) berbasis EBN", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Revisi SPO IBS" }
    ],

    "emergensi_pk4": [
      { id: "RKK-IGD4-01", no: 1, name: "Memimpin koordinasi triase IGD pada situasi Disaster Mass Casualty Incident (MCI)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Disaster Triage" },
      { id: "RKK-IGD4-02", no: 2, name: "Konsultan resusitasi trauma multipel dan audit response time pelayanan gawat darurat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Mutu IGD" },
      { id: "RKK-IGD4-03", no: 3, name: "Evaluasi penerapan clinical pathway henti jantung dan stroke darurat di IGD", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Resusitasi" },
      { id: "RKK-IGD4-04", no: 4, name: "Penyusunan panduan keselamatan transfer pasien antar rumah sakit dan rujukan", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Panduan Transfer" }
    ],

    "intensif_pk4": [
      { id: "RKK-ICU4-01", no: 1, name: "Konsultan setting lanjutan dan troubleshooting ventilator mekanik mode kompleks", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Ventilator Expert" },
      { id: "RKK-ICU4-02", no: 2, name: "Memvalidasi weaning protocol dan ekstubasi terencana pasien sulit lepas ventilator", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Weaning Protocol" },
      { id: "RKK-ICU4-03", no: 3, name: "Supervisi operasional Continuous Renal Replacement Therapy (CRRT) di ICU", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Supervisi CRRT" },
      { id: "RKK-ICU4-04", no: 4, name: "Audit kepatuhan bundle pencegahan VAP & CLABSI serta investigasi RCA insiden kritis", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Mutu ICU" }
    ],

    "kardiovaskuler_pk4": [
      { id: "RKK-KRD4-01", no: 1, name: "Konsultan interpretasi aritmia kompleks dan pemantauan hemodinamik invasif PJT", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Kardio" },
      { id: "RKK-KRD4-02", no: 2, name: "Audit mutu keselamatan tindakan intervensional di laboratorium kateterisasi (Cathlab)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Mutu Cathlab" },
      { id: "RKK-KRD4-03", no: 3, name: "Pengembangan protokol rehabilitasi jantung fase I dan fase II rawat inap", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Rehabilitasi Kardio" },
      { id: "RKK-KRD4-04", no: 4, name: "Riset keperawatan kardiovaskuler terapan dan publikasi ilmiah berkala", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Riset Kardio" }
    ],

    "neurosains_pk4": [
      { id: "RKK-NEU4-01", no: 1, name: "Konsultan asuhan keperawatan pasien pasca bedah saraf mayor dan cedera kepala berat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Neuro" },
      { id: "RKK-NEU4-02", no: 2, name: "Audit waktu respon trombolisis intravena (Door to Needle) pada Code Stroke", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Stroke" },
      { id: "RKK-NEU4-03", no: 3, name: "Pengembangan clinical pathway rehabilitasi neuro-vaskuler komprehensif", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pathway Neuro" }
    ],

    "geriatri_pk4": [
      { id: "RKK-GER4-01", no: 1, name: "Konsultan sindrom geriatri multipel dan polifarmasi kompleks pada lanjut usia", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Geriatri" },
      { id: "RKK-GER4-02", no: 2, name: "Memimpin konferensi multidisiplin tim terpadu pelayanan geriatri rumah sakit", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Tim Geriatri Terpadu" },
      { id: "RKK-GER4-03", no: 3, name: "Audit mutu program bebas jatuh dan pencegahan luka tekan geriatri", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Mutu Geriatri" }
    ],

    "onkologi_pk4": [
      { id: "RKK-ONK4-01", no: 1, name: "Konsultan manajemen ekstravasasi kemoterapi vesicant dan komplikasi onkologi berat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Kanker" },
      { id: "RKK-ONK4-02", no: 2, name: "Audit kepatuhan SOP penanganan tumpahan sitotoksik dan keselamatan petugas", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Sitostatika" },
      { id: "RKK-ONK4-03", no: 3, name: "Pengembangan panduan asuhan keperawatan paliatif end-of-life terintegrasi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Panduan Paliatif" }
    ],

    "anestesi_pk4": [
      { id: "RKK-ANS4-01", no: 1, name: "Konsultan manajemen jalan napas sulit (Difficult Airway) dan krisis pra-anestesi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Difficult Airway" },
      { id: "RKK-ANS4-02", no: 2, name: "Audit keselamatan sedasi moderat/dalam di luar kamar bedah (Endoskopi, Cathlab)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Sedasi" },
      { id: "RKK-ANS4-03", no: 3, name: "Revisi SPO penanganan hipertermia maligna dan toksisitas obat anestesi lokal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "SPO Krisis Anestesi" }
    ],

    "nefrologi_pk4": [
      { id: "RKK-NEF4-01", no: 1, name: "Konsultan penanganan akses vaskuler bermasalah dan adekuasi dialisis sub-optimal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Dialisis" },
      { id: "RKK-NEF4-02", no: 2, name: "Audit mutu mikrobiologi air Reverse Osmosis (RO) dan keselamatan pasien HD", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Mutu RO" },
      { id: "RKK-NEF4-03", no: 3, name: "Pengembangan panduan pencegahan infeksi kateter vena sentral dan exit site CAPD", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Panduan Infeksi HD" }
    ],

    "gastro_hepato_pk4": [
      { id: "RKK-GST4-01", no: 1, name: "Konsultan penanganan perdarahan saluran cerna masif dan ligasi varises kompleks", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Gastro" },
      { id: "RKK-GST4-02", no: 2, name: "Audit sterilisasi instrumen endoskopi fleksibel dan pencegahan transmisi HAIs", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Sterilisasi Endoskopi" }
    ],

    "respirologi_pk4": [
      { id: "RKK-RSP4-01", no: 1, name: "Konsultan asuhan keperawatan pasien bronkoskopi intervensi dan krisis pernapasan", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Paru" },
      { id: "RKK-RSP4-02", no: 2, name: "Audit kepatuhan bundle ruang isolasi infeksi airborne disease bertekanan negatif", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Isolasi Paru" }
    ],

    "radiologi_pk4": [
      { id: "RKK-RAD4-01", no: 1, name: "Konsultan keselamatan radiasi klinis dan manajemen reaksi anafilaktik kontras berat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Radiologi" },
      { id: "RKK-RAD4-02", no: 2, name: "Audit keselamatan MRI dan kepatuhan skrining logam ferro-magnetik", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit MRI Safety" }
    ],

    "anak_pk4": [
      { id: "RKK-ANK4-01", no: 1, name: "Konsultan asuhan keperawatan anak kritis kompleks (PICU/NICU) dan kasus kongenital", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Anak" },
      { id: "RKK-ANK4-02", no: 2, name: "Audit mutu penerapan Pediatric Early Warning Score (PEWS) rumah sakit", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit PEWS" },
      { id: "RKK-ANK4-03", no: 3, name: "Penyusunan standar asuhan keperawatan Atraumatic Care terintegrasi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Atraumatic Care" }
    ],

    "maternitas_pk4": [
      { id: "RKK-MAT4-01", no: 1, name: "Konsultan kegawatdaruratan maternal kompleks (PEB/Eklampsia berat & HPP masif)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Maternal" },
      { id: "RKK-MAT4-02", no: 2, name: "Audit mutu respon emergency obstetri dan penerapan MEOWS rumah sakit", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit MEOWS" },
      { id: "RKK-MAT4-03", no: 3, name: "Pengembangan panduan asuhan sayang ibu dan inisiasi menyusu dini komprehensif", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Panduan Maternitas" }
    ],

    "jiwa_pk4": [
      { id: "RKK-JWA4-01", no: 1, name: "Konsultan de-eskalasi verbal dan tatalaksana pasien krisis kekerasan/bunuh diri", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Konsultan Jiwa" },
      { id: "RKK-JWA4-02", no: 2, name: "Audit etika dan keselamatan tindakan fiksasi fisik (restraint) pasien jiwa", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Audit Restraint" },
      { id: "RKK-JWA4-03", no: 3, name: "Pengembangan program rehabilitasi psikososial dan terapi aktivitas kelompok lanjut", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Rehabilitasi Jiwa" }
    ],

    // PK V (Expert / Pakar Rumah Sakit & Konsultan Utama Regional)
    "perioperatif_pk5": [
      { id: "RKK-OK5-01", no: 1, name: "Konsultan utama teknologi bedah maju rumah sakit dan regional Kalimantan Barat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Bedah" },
      { id: "RKK-OK5-02", no: 2, name: "Memimpin perumusan kebijakan mutu dan standar akreditasi kamar bedah sentral", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan IBS" },
      { id: "RKK-OK5-03", no: 3, name: "Riset terapan perioperatif dan publikasi ilmiah nasional / internasional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Riset Bedah" }
    ],

    "emergensi_pk5": [
      { id: "RKK-IGD5-01", no: 1, name: "Pakar penanggulangan bencana dan sistem komando kegawatdaruratan regional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Disaster" },
      { id: "RKK-IGD5-02", no: 2, name: "Perumusan kebijakan keselamatan gawat darurat dan jejaring rujukan provinsi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan IGD" },
      { id: "RKK-IGD5-03", no: 3, name: "Penelitian klinis kegawatdaruratan dan publikasi inovasi pelayanan resusitasi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Riset Emergensi" }
    ],

    "intensif_pk5": [
      { id: "RKK-ICU5-01", no: 1, name: "Konsultan utama tata kelola pelayanan intensive care rumah sakit & rujukan provinsi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar ICU" },
      { id: "RKK-ICU5-02", no: 2, name: "Menetapkan standar protokol respiratory failure dan multi-organ dysfunction syndrome", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Kritis" },
      { id: "RKK-ICU5-03", no: 3, name: "Penelitian terapan sepsis dan disfungsi hemodinamik di intensive care", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Riset Kritis" }
    ],

    "kardiovaskuler_pk5": [
      { id: "RKK-KRD5-01", no: 1, name: "Pakar asuhan keperawatan kardiovaskuler lanjut Pusat Jantung Terpadu Kalimantan Barat", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Kardiovaskuler" },
      { id: "RKK-KRD5-02", no: 2, name: "Merumuskan kebijakan jejaring pelayanan intervensi koroner perkutan (Primary PCI)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Kardio" },
      { id: "RKK-KRD5-03", no: 3, name: "Penelitian klinis penyakit jantung koroner dan inovasi asuhan kardiovaskuler", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Riset Kardiovaskuler" }
    ],

    "neurosains_pk5": [
      { id: "RKK-NEU5-01", no: 1, name: "Pakar keperawatan neuro-vaskuler dan konsultan jejaring stroke komprehensif regional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Neurosains" },
      { id: "RKK-NEU5-02", no: 2, name: "Perumusan kebijakan penanganan stroke akut dan pemantauan neuromonitoring canggih", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Neuro" }
    ],

    "geriatri_pk5": [
      { id: "RKK-GER5-01", no: 1, name: "Pakar keperawatan gerontologi dan advokasi kebijakan pelayanan ramah lansia regional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Geriatri" },
      { id: "RKK-GER5-02", no: 2, name: "Penelitian terapan pencegahan frailty syndrome dan rehabilitasi demensia lansia", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Riset Geriatri" }
    ],

    "onkologi_pk5": [
      { id: "RKK-ONK5-01", no: 1, name: "Konsultan utama jejaring penanggulangan kanker terpadu rumah sakit dan regional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Onkologi" },
      { id: "RKK-ONK5-02", no: 2, name: "Perumusan kebijakan keselamatan farmakoterapi onkologi dan asuhan paliatif terpadu", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Onkologi" }
    ],

    "anestesi_pk5": [
      { id: "RKK-ANS5-01", no: 1, name: "Pakar keperawatan anestesi dan konsultan keselamatan anestesiologi rumah sakit", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Anestesi" },
      { id: "RKK-ANS5-02", no: 2, name: "Perumusan panduan manajemen krisis intra-operatif dan protokol sedasi provinsi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Anestesi" }
    ],

    "nefrologi_pk5": [
      { id: "RKK-NEF5-01", no: 1, name: "Pakar keperawatan nefrologi & konsultan utama pelayanan terapi pengganti ginjal regional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Dialisis" },
      { id: "RKK-NEF5-02", no: 2, name: "Perumusan kebijakan mutu dialisis dan audit kelayakan instalasi hemodialisis", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Dialisis" }
    ],

    "gastro_hepato_pk5": [
      { id: "RKK-GST5-01", no: 1, name: "Pakar keperawatan endoskopi gastro-hepatobilier dan konsultan ruang tindakan canggih", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Gastro" }
    ],

    "respirologi_pk5": [
      { id: "RKK-RSP5-01", no: 1, name: "Pakar asuhan keperawatan respirasi dan konsultan pusat rujukan penyakit paru menular", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Respirologi" }
    ],

    "radiologi_pk5": [
      { id: "RKK-RAD5-01", no: 1, name: "Pakar keselamatan radiasi keperawatan dan konsultan kedokteran nuklir regional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Radiologi" }
    ],

    "anak_pk5": [
      { id: "RKK-ANK5-01", no: 1, name: "Pakar asuhan keperawatan pediatrik dan konsultan utama jejaring perawatan anak regional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Anak" },
      { id: "RKK-ANK5-02", no: 2, name: "Perumusan kebijakan keselamatan neonatus kritis dan rujukan perinatal provinsi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Anak" }
    ],

    "maternitas_pk5": [
      { id: "RKK-MAT5-01", no: 1, name: "Pakar keperawatan maternitas dan konsultan utama penurunan AKI/AKB regional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Maternitas" },
      { id: "RKK-MAT5-02", no: 2, name: "Perumusan kebijakan asuhan obstetri berkesinambungan (Continuity of Care) provinsi", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Maternitas" }
    ],

    "jiwa_pk5": [
      { id: "RKK-JWA5-01", no: 1, name: "Pakar keperawatan jiwa masyarakat dan konsultan utama sistem kesehatan mental regional", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Pakar Jiwa" },
      { id: "RKK-JWA5-02", no: 2, name: "Perumusan kebijakan pencegahan stigma dan advokasi hak-hak pasien gangguan jiwa", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Kebijakan Jiwa" }
    ],

    "pmb_kebidanan": [
      { id: "RKK-PMB-01", no: 1, name: "Pemeriksaan Antenatal Care (ANC) terstandar 10T & skrining faktor risiko maternal", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Antenatal Care" },
      { id: "RKK-PMB-02", no: 2, name: "Pertolongan persalinan normal fisiologis dan penjahitan perineum grade II", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Persalinan" },
      { id: "RKK-PMB-03", no: 3, name: "Penatalaksanaan kegawatdaruratan maternal (PEB, perdarahan postpartum/HPP, atonia uteri)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Emergency Maternal" },
      { id: "RKK-PMB-04", no: 4, name: "Resusitasi neonatus dengan asfiksia pada bayi baru lahir (BBL)", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Neonatal Resusitasi" },
      { id: "RKK-PMB-05", no: 5, name: "Pemasangan alat kontrasepsi dalam rahim (IUD) dan implan pascapersalinan", defaultKode: 1, jenisTindakan: "Mandiri", domain: "Keluarga Berencana" },
      { id: "RKK-PMB-06", no: 6, name: "Pelayanan perawatan intensif neonatal (CPAP & fototerapi di NICU/Perinatologi)", defaultKode: 1, jenisTindakan: "Mandat", domain: "Neonatal Kritis" }
    ]
  },

  // Fallback / Default Catalog untuk kompatibilitas fungsi lama
  rkkCatalog: {
    "PK I": {
      title: "Perawat Klinis I (Novice / Generalis)",
      description: "Memiliki kompetensi memberikan asuhan keperawatan dasar pada klien dalam kondisi stabil tanpa penyulit.",
      defaultArea: "generalis"
    },
    "PK II": {
      title: "Perawat Klinis II (Advanced Beginner / Mandiri Dasar)",
      description: "Mampu memberikan asuhan keperawatan mandiri holistik pada pasien rawat inap/jalan dengan kondisi akut sedang.",
      defaultArea: "kmb_dewasa_pk2"
    },
    "PK III": {
      title: "Perawat Klinis III (Competent / Spesifik Area)",
      description: "Memiliki kompetensi asuhan keperawatan spesifik pada area keperawatan tertentu sesuai Buku Putih RSUD dr. Soedarso.",
      defaultArea: "kmb_medikal_pk3"
    },
    "PK IV": {
      title: "Perawat Klinis IV (Proficient / Mahir Konsultan Ruangan)",
      description: "Memiliki keahlian mendalam pada sub-spesialisasi, memvalidasi NCP, memimpin investigasi keselamatan, dan audit mutu.",
      defaultArea: "kmb_medikal_pk4"
    },
    "PK V": {
      title: "Perawat Klinis V (Expert / Pakar Rumah Sakit & Provinsi)",
      description: "Tingkat kepakaran tertinggi perawat konsultan utama penentu kebijakan asuhan klinis di RSUD Dr. Soedarso.",
      defaultArea: "kmb_medikal_pk5"
    },
    "PMB": {
      title: "Praktisi Bidan Klinis (PMB I - PMB IV Maternal & Neonatal)",
      description: "Kewenangan klinis pelayanan kebidanan, antenatal care 10T, persalinan, kegawatdaruratan maternal dan neonatal.",
      defaultArea: "pmb_kebidanan"
    }
  },

  // Registry Tenaga Keperawatan & Kebidanan RSUD dr. Soedarso Pontianak (Dikelola dinamis dari backend)
  // Metadata Resmi Berita Acara Serah Terima SPK & RKK Terakhir
  baSpkRkkTerakhir: {
    nomorBA: "041/K.Kep.RSDS/BA/XI/2026",
    tanggalBA: "2026-11-20",
    tanggalBAText: "Jumat, 20 November 2026",
    tanggalKredensial: "2026-11-09",
    tanggalKredensialText: "Senin, 9 November 2026",
    notaDinasRekomendasi: "040/K.Kep.RSDS/ND/XI/2026",
    tanggalNotaDinas: "9 November 2026",
    masaBerlakuTahun: 3,
    berlakuSampai: "2029-11-09",
    jumlahSet: 25,
    pihakPertama: {
      name: "M. Separia Russanto, S.Kep., Ns.",
      nip: "197009101998031007",
      jabatan: "Ketua Komite Keperawatan RSUD dr. Soedarso"
    },
    pihakKedua: {
      name: "Ns. Masjanifah, S.Kep",
      nip: "196706061987032003",
      jabatan: "Katim Rawat Inap (a.n. Kepala Bidang Keperawatan dan Kebidanan)"
    }
  },

  // Riwayat Berita Acara Serah Terima SPK & RKK Resmi (2026)
  baSpkRkkRiwayat: [
    {
      nomorBA: "041/K.Kep.RSDS/BA/XI/2026",
      tanggalBA: "2026-11-20",
      tanggalBAText: "Jumat, 20 November 2026",
      tanggalKredensial: "2026-11-09",
      tanggalKredensialText: "Senin, 9 November 2026",
      notaDinasRekomendasi: "040/K.Kep.RSDS/ND/XI/2026",
      berlakuSampai: "2029-11-09",
      jumlahSet: 25,
      pihakPertama: { name: "M. Separia Russanto, S.Kep., Ns.", nip: "197009101998031007", jabatan: "Ketua Komite Keperawatan RSUD dr. Soedarso" },
      pihakKedua: { name: "Ns. Masjanifah, S.Kep", nip: "196706061987032003", jabatan: "Katim Rawat Inap (a.n. Kepala Bidang Keperawatan dan Kebidanan)" }
    },
    {
      nomorBA: "022/K.Kep.RSDS/BA/X/2026",
      tanggalBA: "2026-10-15",
      tanggalBAText: "Kamis, 15 Oktober 2026",
      tanggalKredensial: "2026-08-20",
      tanggalKredensialText: "Kamis, 20 Agustus 2026",
      notaDinasRekomendasi: "Hasil Kredensial 20 Agustus 2026",
      berlakuSampai: "2029-08-20",
      jumlahSet: 22,
      pihakPertama: { name: "M. Separia Russanto, S.Kep., Ns.", nip: "197009101998031007", jabatan: "Ketua Komite Keperawatan RSUD dr. Soedarso" },
      pihakKedua: { name: "Yuspina, SKM", nip: "197201161992032005", jabatan: "Kepala Bidang Keperawatan dan Kebidanan" }
    },
    {
      nomorBA: "KRED-PPPK-2024",
      tanggalBA: "2024-06-01",
      tanggalBAText: "Tahun 2024 (Grading PK PPPK 2024)",
      tanggalKredensial: "2024-06-01",
      tanggalKredensialText: "Tahun 2024",
      notaDinasRekomendasi: "PK Grading PPPK Tahun 2024",
      berlakuSampai: "2027-06-01",
      jumlahSet: 20,
      pihakPertama: { name: "M. Separia Russanto, S.Kep., Ns.", nip: "197009101998031007", jabatan: "Ketua Komite Keperawatan RSUD dr. Soedarso" },
      pihakKedua: { name: "Bidang Keperawatan dan Kebidanan", nip: "197201161992032005", jabatan: "Bidang Keperawatan dan Kebidanan RSUD dr. Soedarso" }
    }
,
    {
      nomorBA: "BA-KRED-ONLINE-2024",
      tanggalBA: "2024-05-30",
      tanggalBAText: "1 April s.d. 30 Mei 2024 (Kredensial Online 2024)",
      tanggalKredensial: "2024-05-30",
      tanggalKredensialText: "1 April – 30 Mei 2024",
      notaDinasRekomendasi: "Berita Acara Kredensial Online Tahun 2024 (Metode Portofolio)",
      berlakuSampai: "2027-05-30",
      jumlahSet: 403,
      pihakPertama: { name: "Ns. Dwinita Wulan Purnamasari, S.Kep", nip: "198309232010012015", jabatan: "Ketua Sub Komite Kredensial" },
      pihakKedua: { name: "M. Separia Russanto, S.Kep., Ns.", nip: "197009101998031007", jabatan: "Ketua Komite Keperawatan RSUD dr. Soedarso" }
    }
  ],

  // Database Resmi 458 Tenaga Keperawatan & Kebidanan Penerima SPK & RKK (2024 & 2026)
  nurses: [
    { id: "SPK-2026-001", name: "Ferawati, S.Kep., Ners", nip: "198509262011012003", jenisId: "NIP", unit: "PJT", pkLevel: "PK III", jenjangKlinis: "PK 3 Cathlab", profession: "Perawat Klinis (PK 3 Cathlab)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 01)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-002", name: "Munazzil, A.Md.Kep", nip: "199704212022041001", jenisId: "NIP", unit: "Cathlab", pkLevel: "PK II", jenjangKlinis: "PK 2 Cathlab", profession: "Perawat Klinis (PK 2 Cathlab)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 02)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-003", name: "Rudi Hartono, S.Kep, Ners", nip: "198502102009031001", jenisId: "NIP", unit: "Cathlab", pkLevel: "PK III", jenjangKlinis: "PK 3 Cathlab", profession: "Perawat Klinis (PK 3 Cathlab)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 03)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-004", name: "Ns. Misyadi, S.Tr.Kep", nip: "197907272003121007", jenisId: "NIP", unit: "Cathlab", pkLevel: "PK III", jenjangKlinis: "PK 3 Cathlab", profession: "Perawat Klinis (PK 3 Cathlab)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 04)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-005", name: "Iwan Setiawan, A.Md.Kep", nip: "197603111995021001", jenisId: "NIP", unit: "Cathlab", pkLevel: "PK III", jenjangKlinis: "PK 3 Cathlab", profession: "Perawat Klinis (PK 3 Cathlab)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 05)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-006", name: "Dony Mesias, S.Kep, Ners", nip: "199005242015021001", jenisId: "NIP", unit: "Cathlab", pkLevel: "PK III", jenjangKlinis: "PK 3 Cathlab", profession: "Perawat Klinis (PK 3 Cathlab)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 06)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-007", name: "Ns. U. Nely Variety, S.Kep", nip: "198005132009032002", jenisId: "NIP", unit: "Cathlab", pkLevel: "PK III", jenjangKlinis: "PK 3 Cathlab", profession: "Perawat Klinis (PK 3 Cathlab)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 07)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-008", name: "Ns. Agus Supriyadi, S.Kep", nip: "198408192008031001", jenisId: "NIP", unit: "Cathlab", pkLevel: "PK III", jenjangKlinis: "PK 3 Cathlab", profession: "Perawat Klinis (PK 3 Cathlab)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 08)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-009", name: "Tri Wahyudiono, A.Md.Kep", nip: "198907302014021001", jenisId: "NIP", unit: "Cathlab", pkLevel: "PK III", jenjangKlinis: "PK 3 Cathlab", profession: "Perawat Klinis (PK 3 Cathlab)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 09)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-010", name: "U. Sinta Kartini, A.Md.Kep", nip: "198604212023212007", jenisId: "NIPPPK", unit: "PJT", pkLevel: "PK III", jenjangKlinis: "PK 3 KMB", profession: "Perawat Klinis (PK 3 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 10)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-011", name: "Erna Wagiarti, A.Md.Kep", nip: "198801062010012008", jenisId: "NIP", unit: "PJT", pkLevel: "PK III", jenjangKlinis: "PK 3 KMB", profession: "Perawat Klinis (PK 3 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 11)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-012", name: "Maisunah, A.Md.Kep", nip: "199305102020122033", jenisId: "NIP", unit: "PJT", pkLevel: "PK II", jenjangKlinis: "PK 2 KMB", profession: "Perawat Klinis (PK 2 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 12)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-013", name: "Sulastri, S.Kep., Ners", nip: "6112024502890003", jenisId: "NIK", unit: "PJT", pkLevel: "PK III", jenjangKlinis: "PK 3 KMB", profession: "Perawat Klinis (PK 3 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 13)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-014", name: "Endah Kusuma Wardhani, S.Kep, Ners", nip: "6112066612930003", jenisId: "NIK", unit: "PJT", pkLevel: "PK II", jenjangKlinis: "PK 2 KMB", profession: "Perawat Klinis (PK 2 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 14)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-015", name: "Restu Amalia, S.Kep, Ners", nip: "6102184902000001", jenisId: "NIK", unit: "PJT", pkLevel: "PK II", jenjangKlinis: "PK 2 KMB", profession: "Perawat Klinis (PK 2 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 15)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-016", name: "Shelly Meirisa Rindy, A.Md.Kep", nip: "6171026505010009", jenisId: "NIK", unit: "PJT", pkLevel: "PK I", jenjangKlinis: "PK 1 KMB", profession: "Perawat Klinis (PK 1 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 16)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-017", name: "Muhammad Ilham, A.Md.Kep", nip: "6171020502000006", jenisId: "NIK", unit: "PJT", pkLevel: "PK I", jenjangKlinis: "PK 1 KMB", profession: "Perawat Klinis (PK 1 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 17)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-018", name: "Susi Lestari, S.Kep., Ners", nip: "197204101992032011", jenisId: "NIP", unit: "ULS", pkLevel: "PK III", jenjangKlinis: "PK 3", profession: "Perawat Klinis (PK 3)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 18)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-019", name: "Minah, A.Md.Kep", nip: "197002012000122002", jenisId: "NIP", unit: "ULS", pkLevel: "PK III", jenjangKlinis: "PK 3", profession: "Perawat Klinis (PK 3)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 19)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-020", name: "Kesia Hutapea, A.Md.Kep", nip: "197101161993032009", jenisId: "NIP", unit: "ULS", pkLevel: "PK III", jenjangKlinis: "PK 3", profession: "Perawat Klinis (PK 3)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 20)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-021", name: "Ns. Febri Anugrah, S.Kep", nip: "199207192020121013", jenisId: "NIP", unit: "Hemodialisa (HD)", pkLevel: "PK II", jenjangKlinis: "PK 2", profession: "Perawat Klinis (PK 2)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 21)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-022", name: "Mirdawati, A.Md.Kep", nip: "198010192006042030", jenisId: "NIP", unit: "Singkut Buluh (SB)", pkLevel: "PK III", jenjangKlinis: "PK 3 KMB", profession: "Perawat Klinis (PK 3 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 22)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-023", name: "Herliza, A.Md.Kep", nip: "198501222023212003", jenisId: "NIPPPK", unit: "Singkut Buluh (SB)", pkLevel: "PK III", jenjangKlinis: "PK 3 KMB", profession: "Perawat Klinis (PK 3 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 23)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-024", name: "Ns. Devi Novianti, S.Kep", nip: "198412062010012019", jenisId: "NIP", unit: "Isolasi", pkLevel: "PK II", jenjangKlinis: "PK 2 KMB", profession: "Perawat Klinis (PK 2 KMB)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 24)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-025", name: "Jamalluddin, A.Md.Kep", nip: "199110042014021001", jenisId: "NIP", unit: "Isolasi", pkLevel: "PK III", jenjangKlinis: "PK 3 KMB (hiperbarik)", profession: "Perawat Klinis (PK 3 KMB Hiperbarik)", strNumber: "Terverifikasi PSV", strExpiry: "2029-11-09", spkNumber: "BA 041/K.Kep.RSDS/BA/XI/2026 (Set 25)", spkDate: "2026-11-09", spkExpiry: "2029-11-09", baNumber: "041/K.Kep.RSDS/BA/XI/2026", baDate: "2026-11-20", notaDinas: "040/K.Kep.RSDS/ND/XI/2026", credentialStatus: "Disetujui", peerReviewer: "Rapat Pleno Mitra Bestari (9 Nov 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    // BA No. 022/K.Kep.RSDS/BA/X/2026 (Penyerahan 15 Oktober 2026 — Hasil Kredensial 20 Agustus 2026, 22 Berkas)
    { id: "SPK-2026-026", name: "Diana Paula, A.Md.Kep", nip: "199507152025212002", jenisId: "NIPPPK", unit: "R. Meranti", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PK II)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 01)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-027", name: "Ns. Desi Marisna, S.Kep", nip: "6171026012950008", jenisId: "NIK", unit: "R. Anak", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PK I)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 02)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-028", name: "Ns. Luthfy Anshari, S.Kep.", nip: "6101130611960002", jenisId: "NIK", unit: "R. PJT", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PK I)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 03)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-029", name: "Asep Diyaferiendi, S.Tr.Kep", nip: "198508032009031001", jenisId: "NIP", unit: "R. Unit Stroke", pkLevel: "PK III", jenjangKlinis: "PK III Stroke", profession: "Perawat Klinis (SPK & RKK PK III Stroke)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 04)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-030", name: "Ns. Hana Manasye, S.Kep.", nip: "6109075801970002", jenisId: "NIK", unit: "R. PJT", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PK I)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 05)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-031", name: "Ns. Anggri Muliawati, S.Kep", nip: "199205072025212033", jenisId: "NIPPPK", unit: "R. PPT", pkLevel: "PK I", jenjangKlinis: "PK I (Supervisi)", profession: "Perawat Klinis (SPK & RKK PK I Supervisi)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 06)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-032", name: "Rina, A.Md.Kep", nip: "198303202025212010", jenisId: "NIPPPK", unit: "R. EG 2", pkLevel: "PK I", jenjangKlinis: "PK I (Supervisi)", profession: "Perawat Klinis (SPK & RKK PK I Supervisi)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 07)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-033", name: "Ns. Luluk Nur Wakhidah, S.Kep", nip: "3309036507959004", jenisId: "NIK", unit: "R. PJT", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PK I)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 08)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-034", name: "Bdn. Zera Qurrota A'Yuni, S.Keb.", nip: "199610302019022003", jenisId: "NIP", unit: "R. Ramin", pkLevel: "BP II", jenjangKlinis: "Bidan Penyelia (BP II)", profession: "Bidan Penyelia (SPK & RKK Bidan Penyelia)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 09)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-035", name: "Ruqayyah, A.Md.Kep", nip: "198610072025212001", jenisId: "NIPPPK", unit: "R. EG", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PK II)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 10)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-036", name: "Agus Sariyanti, A.Md.Kep", nip: "198608242025212012", jenisId: "NIPPPK", unit: "R. Isolasi", pkLevel: "PK II", jenjangKlinis: "PK II Isolasi", profession: "Perawat Klinis (SPK & RKK PK II Isolasi)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 11)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-037", name: "Ns. Siska Putri Utami, S.Kep.", nip: "6102085803960001", jenisId: "NIK", unit: "R. Singkut Buluh", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PK I)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 12)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-038", name: "Ns. Rurinda Puswita, S.Tr.Kep", nip: "198806152011012004", jenisId: "NIP", unit: "R. Singkut Buluh", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PK I)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 13)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-039", name: "Ns. Sinta Masita Oktaviaty, S.Kep.", nip: "199010192025212019", jenisId: "NIPPPK", unit: "R. Mahoni", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PK II)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 14)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-040", name: "Marselina, A.Md.Kep", nip: "198804172025212012", jenisId: "NIPPPK", unit: "R. Mahoni", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PK II)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 15)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-041", name: "Ns. Teti Sudaryati, S.Kep.", nip: "199007192023212020", jenisId: "NIPPPK", unit: "R. Unit Stroke", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PK I)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 16)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-042", name: "Paula Novayanti, A.Md.Kep", nip: "199811042025212026", jenisId: "NIPPPK", unit: "R. Unit Stroke", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PK I)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 17)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-043", name: "Yoviana Vigiantanti, A.Md.Kep", nip: "199411242025212043", jenisId: "NIPPPK", unit: "R. Unit Stroke", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PK I)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 18)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-044", name: "Yulia, A.Md.Kep.", nip: "197707172006042029", jenisId: "NIP", unit: "R. Unit Stroke", pkLevel: "PK III", jenjangKlinis: "PK III Stroke", profession: "Perawat Klinis (SPK & RKK PK III Stroke)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 19)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-045", name: "Yuliana, A.Md.Kep.", nip: "198204162025212014", jenisId: "NIPPPK", unit: "R. Isolasi", pkLevel: "PK II", jenjangKlinis: "PK II Isolasi", profession: "Perawat Klinis (SPK & RKK PK II Isolasi)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 20)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-046", name: "Ns. Nurwahyudi, S.Kep", nip: "198209182010011014", jenisId: "NIP", unit: "R. Unit Stroke", pkLevel: "PK III", jenjangKlinis: "PK III Stroke", profession: "Perawat Klinis (SPK & RKK PK III Stroke)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 21)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2026-047", name: "Ns. Agung Prabowo, S.Kep", nip: "198603172014021002", jenisId: "NIP", unit: "R. Unit Stroke", pkLevel: "PK III", jenjangKlinis: "PK III Stroke", profession: "Perawat Klinis (SPK & RKK PK III Stroke)", strNumber: "Terverifikasi PSV", strExpiry: "2029-08-20", spkNumber: "BA 022/K.Kep.RSDS/BA/X/2026 (Berkas 22)", spkDate: "2026-08-20", spkExpiry: "2029-08-20", baNumber: "022/K.Kep.RSDS/BA/X/2026", baDate: "2026-10-15", notaDinas: "Kredensial 20 Agustus 2026", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (20 Agt 2026)", approvedCompetencies: 40, totalCompetencies: 40 },
    // SPK & RKK Tahun 2024 (PK Grading PPPK 2024, 20 Perawat — Unit diselaraskan SK 2026)
    { id: "SPK-2024-001", name: "Mi'raj Jatendra, A.Md.Kep", nip: "198604062024211003", jenisId: "NIPPPK", unit: "Meranti", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 01)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-002", name: "Oktryan Pramanda, S.Kep., Ns.", nip: "198910022024211012", jenisId: "NIPPPK", unit: "ULS", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 02)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-003", name: "Norlinda Kartika, A.Md.Kep.", nip: "199001242024212027", jenisId: "NIPPPK", unit: "ULS", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 03)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-004", name: "Ade Marianingsih, A.Md.Kep", nip: "199403042024212030", jenisId: "NIPPPK", unit: "PJT", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 04)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-005", name: "Fitri Nastiti, A.Md.Kep", nip: "199005012024212037", jenisId: "NIPPPK", unit: "ULS", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 05)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-006", name: "Triadi Sisbintara, A.Md.Kep", nip: "199112072024211014", jenisId: "NIPPPK", unit: "Meranti", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 06)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-007", name: "Silverius Alvian Gunawan, A.Md.Kep", nip: "199106202024211015", jenisId: "NIPPPK", unit: "Singkut Buluh", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 07)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-008", name: "Azmi Yuni Rahman, S.Kep., Ns.", nip: "198806012024212020", jenisId: "NIPPPK", unit: "Hemodialisa (HD)", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 08)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-009", name: "Diny Sefviyanti, A.Md.Kep", nip: "198909132024212019", jenisId: "NIPPPK", unit: "PPT", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 09)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-010", name: "Vinsensius Karunial, A.Md.Kep", nip: "199009202024211011", jenisId: "NIPPPK", unit: "PJT", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 10)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-011", name: "Johanes Kristian Ferici, A.Md.Kep", nip: "199006242024211014", jenisId: "NIPPPK", unit: "PJT", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 11)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-012", name: "Ns. Gunawan, S.Kep.", nip: "198903212024211009", jenisId: "NIPPPK", unit: "Kerapu", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 12)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-013", name: "Pratiwi Nur Rachimah, A.Md.Kep", nip: "199205242024212036", jenisId: "NIPPPK", unit: "PPT", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 13)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-014", name: "Aris Darmawan, A.Md.Kep", nip: "199002092024211004", jenisId: "NIPPPK", unit: "Kerapu", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 14)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-015", name: "Ns. Vidia Amanda Indah Sari, S.Kep.", nip: "199603172024212021", jenisId: "NIPPPK", unit: "Kerapu", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 15)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-016", name: "Nur Insan, A.Md.Kep", nip: "198703202024212010", jenisId: "NIPPPK", unit: "Meranti", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 16)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-017", name: "Ika Safutri, A.Md.Kep", nip: "199405202024212046", jenisId: "NIPPPK", unit: "PPT", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 17)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-018", name: "Dodi Cahyadi, A.Md.Kep", nip: "199109032024211017", jenisId: "NIPPPK", unit: "ICU", pkLevel: "PK I", jenjangKlinis: "PK I", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 18)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-019", name: "Albertus Harkel, A.Md.Kep", nip: "199007102024211018", jenisId: "NIPPPK", unit: "Enggang Gading", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 19)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    { id: "SPK-2024-020", name: "Hero Januariansyah, A.Md.Kep", nip: "198901132024211010", jenisId: "NIPPPK", unit: "Kerapu", pkLevel: "PK II", jenjangKlinis: "PK II", profession: "Perawat Klinis (SPK & RKK PPPK 2024)", strNumber: "Terverifikasi PSV", strExpiry: "2027-06-01", spkNumber: "SPK & RKK PPPK 2024 (No. 20)", spkDate: "2024-06-01", spkExpiry: "2027-06-01", baNumber: "KRED-PPPK-2024", baDate: "2024-06-01", notaDinas: "PK Grading PPPK 2024", credentialStatus: "Disetujui", peerReviewer: "Tim Mitra Bestari (PPPK 2024)", approvedCompetencies: 40, totalCompetencies: 40 },
    // BA Kredensial Online Tahun 2024 (1 April – 30 Mei 2024, Metode Portofolio)
    {"id": "SPK-2024-ONL-001", "name": "Abang Iman S, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 1)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-002", "name": "Abdul Haqiqi, A.Md.Kep", "nip": "6112081106900002", "jenisId": "NIK", "unit": "OK IGD", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 2)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-003", "name": "Adhitya Nurcahya Dimas Putra, A.Md. Kep", "nip": "199205032015021001", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 3)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-004", "name": "Adianto, A.Md.Kep", "nip": "197911102009041001", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 4)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-005", "name": "Agung Nurrizal, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 5)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-006", "name": "Agus Zenol Muttakin, S.Kep., Ners", "nip": "197811112006041019", "jenisId": "NIP", "unit": "Instalasi Kedokteran Nuklir dan Terapi Molekuler", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 6)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-007", "name": "Ahmad Munir, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 7)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-008", "name": "Ahmad Ramdhani, S.Kep,Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 8)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-009", "name": "Akhmad Syarifudin, A.Md.Kep", "nip": "199010032020121011", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 9)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-010", "name": "Akwila Rian Suni, A.Md.Kep", "nip": "198808012022212002", "jenisId": "NIPPPK", "unit": "A (ANAK)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 10)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-011", "name": "Alam Mastar Harahap, S.Kep., Ners", "nip": "197410191998031002", "jenisId": "NIP", "unit": "POLI PERAWATAN LUKA DAN STOMA", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 11)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-012", "name": "Alfiyyah Nur Rizqi, A.Md.Kep", "nip": "6171044511990007", "jenisId": "NIK", "unit": "ICU", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 12)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-013", "name": "Alfonsus Agus Ainaro S, S.Kep., Ners", "nip": "199308012020121021", "jenisId": "NIP", "unit": "HCU UMUM", "pkLevel": "PK II", "jenjangKlinis": "PK II Intensif", "profession": "Perawat Klinis (PK II Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 13)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-014", "name": "Aliet Safitri, A.Md.Kep", "nip": "197811142003122012", "jenisId": "NIP", "unit": "POLI ANESTESI", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Anak Medikal", "profession": "Perawat Klinis (PK III Keperawatan Anak Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 14)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-015", "name": "Amelia Sushanti, A.Md.Kep", "nip": "198902192010012004", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 15)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-016", "name": "Andi Putra, A.Md.Kep", "nip": "198512252008031001", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 16)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-017", "name": "Andre Ramadan, S.Kep, Ners", "nip": "6101171801980003", "jenisId": "NIK", "unit": "A (ANAK)", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 17)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-018", "name": "Andri Muzayyin, A.Md.Kep", "nip": "198602112011011004", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 18)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-019", "name": "Anisah, A.Md.Kep", "nip": "198202082009032003", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 19)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-020", "name": "Apriani, A.Md.Kep", "nip": "198204292003122005", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 20)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-021", "name": "Ardian Wanto Hady, A.Md.Kep", "nip": "199106152014021001", "jenisId": "NIP", "unit": "IBS", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 21)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-022", "name": "Ardiles, A. Md.Kep", "nip": "198304232006041010", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 22)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-023", "name": "Ariandi, S.Kep., Ners", "nip": "198002282003011001", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 23)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-024", "name": "Arini Chasanati, S.Kep., Ners", "nip": "199311222023212015", "jenisId": "NIPPPK", "unit": "A (ANAK)", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 24)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-025", "name": "Arista Sari, A.Md.Kep", "nip": "198410062023212005", "jenisId": "NIPPPK", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 25)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-026", "name": "Arsenius, A.Md.Kep", "nip": "198708132010011005", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 26)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-028", "name": "Asqoha Nasbhara, A.Md.Kep", "nip": "199102232015022002", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 28)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-029", "name": "Asriani, A.Md.Kep", "nip": "198308062010012017", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 29)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-030", "name": "Astri Dwi Utami, A.Md.Kep", "nip": "199304192015022002", "jenisId": "NIP", "unit": "ENGGANG GADING", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 30)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-031", "name": "Astuti, A.Md.Kep", "nip": "198306212023212005", "jenisId": "NIPPPK", "unit": "KERAPU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 31)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-032", "name": "Auselia Fadila, A.Md.Kep", "nip": "198809262023212026", "jenisId": "NIPPPK", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 32)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-033", "name": "Aziz Mathori, A.Md.Kep", "nip": "198401172009031002", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 33)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-034", "name": "Bakar, A.Md. Kep", "nip": "198112222011011001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 34)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-035", "name": "Bambang Kurniawan, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 35)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-036", "name": "Bernardo, A.Md.Kep", "nip": "199503122023211003", "jenisId": "NIPPPK", "unit": "ENGGANG GADING", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 36)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-037", "name": "Bibiana Oktavia, A.Md.Kep", "nip": "6103025612950001", "jenisId": "NIK", "unit": "ICU", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 37)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-038", "name": "Chandrawaty, A.Md.Kep", "nip": "198601012022212014", "jenisId": "NIPPPK", "unit": "ULS", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 38)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-039", "name": "Cheria, Amd.Kep", "nip": "198309232022212001", "jenisId": "NIPPPK", "unit": "ICVCU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 39)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-040", "name": "Christoper Sinambela, A.Md.Kep", "nip": "199112192015021001", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 40)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-041", "name": "Dahliana, A.Md.Kep", "nip": "197503022000032005", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 41)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-042", "name": "Darmansyah, S.Kep", "nip": "197507181995031002", "jenisId": "NIP", "unit": "POLI BEDAH ONKOLOGI", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 42)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-043", "name": "Darmiana, A.Md.Kep", "nip": "198502032022212003", "jenisId": "NIPPPK", "unit": "IBS", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 43)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-044", "name": "Dasih Minarni, S.Kep., Ners", "nip": "197302141998032002", "jenisId": "NIP", "unit": "KERAPU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 44)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-045", "name": "Dasriwati, A.Md.Kep", "nip": "198301232010012007", "jenisId": "NIP", "unit": "POLI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 45)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-046", "name": "Deby Junarsih, A.Md.Kep", "nip": "198506162014022001", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 46)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-047", "name": "Dedy Abdurrahman, S.Kep., Ners", "nip": "198203302014021002", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 47)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-048", "name": "Deliana Ismar, A.Md.Kep", "nip": "198709212014022002", "jenisId": "NIP", "unit": "MAHONI", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 48)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-049", "name": "Delvi Afrianti, A.Md.Kep", "nip": "198910172015022004", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Intensif", "profession": "Perawat Klinis (PK II Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 49)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-050", "name": "Deni Kardani, A.Md.Kep", "nip": "198210272009031002", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 50)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-051", "name": "Denissa Muliawati Wijya, S.Kep., Ners", "nip": "6103205912900002", "jenisId": "NIK", "unit": "HCU UMUM", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 51)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-052", "name": "Desi Fitriani, A.Md.Kep", "nip": "6108044612020002", "jenisId": "NIK", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 52)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-053", "name": "Desi Kurniasari, A.Md.Kep", "nip": "198612052011012005", "jenisId": "NIP", "unit": "B (PERINATOLOGI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Neonatalogi", "profession": "Perawat Klinis (PK III Neonatalogi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 53)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-054", "name": "Dessy Berlian, A.Md.Kep", "nip": "197712042008032001", "jenisId": "NIP", "unit": "POLI Ortopedi", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 54)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-055", "name": "Dewi Masitah, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 55)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-056", "name": "Diah Puspitasari, S.Kep., Ners", "nip": "199507272023212010", "jenisId": "NIPPPK", "unit": "PPT", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 56)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-057", "name": "Dian Saputi, S.Kep., Ners", "nip": "198709042014022001", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 57)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-058", "name": "Dian Utami, A.Md.Kep", "nip": "198901152014022001", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 58)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-059", "name": "Diana, A.Md.Kep", "nip": "197501211998032003", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 59)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-060", "name": "Didi Purnomo, A.Md.Kep", "nip": "199210092015021001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 60)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-061", "name": "Dila Aprilia Saraswaty, A.Md.Kep", "nip": "6171034204960011", "jenisId": "NIK", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 61)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-062", "name": "Dilla Marsela, S.Kep., Ners", "nip": "198701312009042003", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 62)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-063", "name": "Dimas Setiawan, A.Md.Kep", "nip": "6171030702960010", "jenisId": "NIK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 63)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-064", "name": "Dimas Yosua Hasibuan, S.Kep., Ners", "nip": "198912072014021001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 64)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-065", "name": "Dina Adhila, S.Kep., Ners", "nip": "199604242020122023", "jenisId": "NIP", "unit": "B (PERINATOLOGI)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 65)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-066", "name": "Dina Ratia Ningsih, A.Md.Kep", "nip": "198404042022212008", "jenisId": "NIPPPK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 66)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-067", "name": "Doni Saputra, A.Md.Kep", "nip": "6112011909960008", "jenisId": "NIK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 67)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-068", "name": "Dwi Sri Astuti, A.Md.Kep", "nip": "197805202009032001", "jenisId": "NIP", "unit": "KERAPU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 68)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-069", "name": "Dwinanda Hurip Gatra, A.Md.Kep", "nip": "198605312011011002", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 69)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-070", "name": "Dwiyana Lestari, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 70)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-072", "name": "Dzakiyya, A.Md.Kep", "nip": "6171034411010006", "jenisId": "NIK", "unit": "A (ANAK)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 72)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-073", "name": "Efi Nuriyanti, S.Kep., Ners", "nip": "3305166510950002", "jenisId": "NIK", "unit": "ICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Intensif", "profession": "Perawat Klinis (PK II Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 73)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-074", "name": "Efifana Caturachmy, S.Kep., Ners", "nip": "198712122014022001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 74)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-075", "name": "Eka Efrianti, S.Kep., Ners", "nip": "199002252011012002", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 75)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-076", "name": "Eka Purwaningsih, A.Md.Kep", "nip": "198805022014022002", "jenisId": "NIP", "unit": "PJT", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 76)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-077", "name": "Eko Saptudin, A.Md.Kep", "nip": "199306122015021002", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 77)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-078", "name": "Elfira, S.Kep., Ners", "nip": "199209212020122020", "jenisId": "NIP", "unit": "B (PERINATOLOGI)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 78)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-079", "name": "Elisabet Angela, A.Md.Kep", "nip": "198508142011012004", "jenisId": "NIP", "unit": "SINGKUT BULUH", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 79)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-080", "name": "Eliza Kurniasih, S.Kep., Ners", "nip": "6106176806960001", "jenisId": "NIK", "unit": "A (ANAK)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 80)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-081", "name": "Ella Angareini, AMK", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 81)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-082", "name": "Elly Kartawati, A.Md.Kep", "nip": "196911041990122001", "jenisId": "NIP", "unit": "A (ANAK)", "pkLevel": "PK III", "jenjangKlinis": "PK III Anak Medikal Bedah", "profession": "Perawat Klinis (PK III Anak Medikal Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 82)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-083", "name": "Elly Yulianti Karnita, S.Kep., Ners", "nip": "198107102003122007", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 83)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-084", "name": "Elsih Apriani, A.Md.Kep", "nip": "198604132009032002", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 84)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-085", "name": "Elyarti, S.Kep., Ners", "nip": "197405282000122003", "jenisId": "NIP", "unit": "POLI THT", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 85)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-086", "name": "Eni Suryani, A.Md.Kep", "nip": "198309112022212003", "jenisId": "NIPPPK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 86)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-087", "name": "Eprina Utami, Str.Kep", "nip": "6112016310980001", "jenisId": "NIK", "unit": "HCU UMUM", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 87)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-088", "name": "Erianty Dewi Hustra, Str. Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 88)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-089", "name": "Eric Z, Amd.Kep", "nip": "199301272025211099", "jenisId": "NIPPPK", "unit": "MAHONI", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 89)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-090", "name": "Erni Susanti, A.Md.Kep", "nip": "198004172005022005", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 90)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-091", "name": "Erniawati, S.Kep., Ners", "nip": "198807152023212012", "jenisId": "NIPPPK", "unit": "PICU", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 91)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-092", "name": "Erwin Disantoso, S.Kep., Ners", "nip": "198410222008031002", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 92)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-093", "name": "Euis Detiya Rahma Hastuti, A.Md.Kep", "nip": "199702032020122020", "jenisId": "NIP", "unit": "MAHONI", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 93)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-094", "name": "Eva Hesty Lestari, A.Md.Kep", "nip": "198408032023212007", "jenisId": "NIPPPK", "unit": "POLI BEDAH DIGESTIF", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 94)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-095", "name": "Eva Zulyana, A.Md.Kep", "nip": "198203292005022002", "jenisId": "NIP", "unit": "POLI ESWL", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 95)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-096", "name": "Evi Syafariah, A.Md.Kep", "nip": "197005051989112001", "jenisId": "NIP", "unit": "POLI TB MDR", "pkLevel": "PK III", "jenjangKlinis": "PK III Respirologi", "profession": "Perawat Klinis (PK III Respirologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 96)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-097", "name": "Evi Yuliana, AMK", "nip": "197307161996032006", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 97)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-098", "name": "Evie Christina Boru Simanjuntak, AMK", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 98)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-099", "name": "Ezra Prabella. P, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 99)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-100", "name": "Fadiyah, S.Kep., Ners", "nip": "6171035806920004", "jenisId": "NIK", "unit": "PICU", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 100)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-101", "name": "Fahrunisah, A.Md.Kep", "nip": "199303132023212021", "jenisId": "NIPPPK", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 101)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-102", "name": "Fajriani Annur, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Hemato-Onkologi Anak", "profession": "Perawat Klinis (PK III Hemato-Onkologi Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 102)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-103", "name": "Fakhrur Razi, A.Md.Kep", "nip": "199201022015021001", "jenisId": "NIP", "unit": "HCU UMUM", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 103)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-104", "name": "Farid Frisyantama, S.Kep., Ners", "nip": "6172010703970004", "jenisId": "NIK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 104)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-105", "name": "Fasliyadi, A.Md.Kep", "nip": "198903202020121011", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 105)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-106", "name": "Fatmawati, A.Md.Kep", "nip": "197908072003122013", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 106)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-107", "name": "Febianti Dwi Kozati, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 107)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-108", "name": "Feranema. W, SE, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 108)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-110", "name": "Fitra Hasti, A.Md.Kep", "nip": "198706012014022001", "jenisId": "NIP", "unit": "B (PERINATOLOGI)", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 110)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-111", "name": "Fitri Retno Widihastuti, A.Md.Kep", "nip": "6108035302960001", "jenisId": "NIK", "unit": "A (ANAK)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 111)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-112", "name": "Fitria Senorita, A.Md.Kep", "nip": "198706052011012010", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 112)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-113", "name": "GALUH FONAM PUSPITA DEWI, Amd. Kep", "nip": "198206032023212004", "jenisId": "NIPPPK", "unit": "HCU UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 113)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-114", "name": "Gunawan, SKM", "nip": "197403012000121004", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 114)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-115", "name": "Hapisah, A.Md.Kep", "nip": "197711202009032002", "jenisId": "NIP", "unit": "UNIT MEDIK SENTRAL (UMS)", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 115)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-116", "name": "Hapsariani, S.Kep, Ners", "nip": "197805172006042015", "jenisId": "NIP", "unit": "A (ANAK)", "pkLevel": "PK III", "jenjangKlinis": "PK III Anak Medikal Bedah", "profession": "Perawat Klinis (PK III Anak Medikal Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 116)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-117", "name": "Hartati, S.Kep., Ners", "nip": "197511112000122002", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 117)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-118", "name": "Hasanatun Nisa, A.Md.Kep", "nip": "199010072014022001", "jenisId": "NIP", "unit": "A (ANAK)", "pkLevel": "PK III", "jenjangKlinis": "PK III Anak Medikal Bedah", "profession": "Perawat Klinis (PK III Anak Medikal Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 118)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-119", "name": "Heni Aristiany, S.Kep, Ners", "nip": "198507022011012004", "jenisId": "NIP", "unit": "POLI GASTROENTERO HEPATOLOGI", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 119)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-120", "name": "Herkulanus Yunus, A.Md.Kep", "nip": "198606052022211002", "jenisId": "NIPPPK", "unit": "SINGKUT BULUH", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 120)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-121", "name": "Herlinawati, S.Kep., Ners", "nip": "197709022000032002", "jenisId": "NIP", "unit": "A (ANAK)", "pkLevel": "PK III", "jenjangKlinis": "PK III Anak Medikal Bedah", "profession": "Perawat Klinis (PK III Anak Medikal Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 121)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-122", "name": "Hermaniar Purbasari, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 122)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-123", "name": "Heru Supriyono, A.Md.Kep", "nip": "198404142022211003", "jenisId": "NIPPPK", "unit": "HCU UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 123)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-124", "name": "Herwin, A.Md.Kep", "nip": "197912242006041018", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 124)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-125", "name": "Hobir, A.Md.Kep", "nip": "198103172009031001", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 125)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-126", "name": "Ibnu Darmawan, S.Kep", "nip": "196904291995031007", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 126)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-127", "name": "Ibnu Hadi Nugroho, A.Md.Kep", "nip": "6103200710900009", "jenisId": "NIK", "unit": "OK IGD", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 127)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-128", "name": "Ida Herawati Hutagalung, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 128)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-129", "name": "Ida Royani, A.Md. Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III", "profession": "Perawat Klinis (PK III)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 129)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-130", "name": "Ignasius, S.Kep., Ners", "nip": "6110080901880001", "jenisId": "NIK", "unit": "ENGGANG GADING", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 130)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-131", "name": "Ika Ariani Widianingrom, A.Md.Kep", "nip": "198601102014022001", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 131)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-132", "name": "Ika Yusniarti, A.Md. Kep", "nip": "198102122005022006", "jenisId": "NIP", "unit": "POLI SYARAF", "pkLevel": "PK III", "jenjangKlinis": "PK III Neurosains", "profession": "Perawat Klinis (PK III Neurosains)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 132)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-133", "name": "Imam Mukhlis Alfatoni, A.Md.Kep", "nip": "199205142014021001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 133)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-134", "name": "Imran, S.Kep., Ners", "nip": "199107222014021003", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 134)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-135", "name": "Ina Rosdiana, A.Md. Kep", "nip": "197911062006042013", "jenisId": "NIP", "unit": "KERAPU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 135)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-136", "name": "Inawati, A.Md.Kep", "nip": "199007272014022002", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 136)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-137", "name": "Indriani Balinda N, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 137)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-138", "name": "Irene Ratna Sari, A.Md.Kep", "nip": "198904162011012003", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 138)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-139", "name": "Irfan Khamil, A.Md.Kep", "nip": "198607062009031001", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 139)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-140", "name": "Iriana Hariyati, A.Md.Kep", "nip": "199302092014022002", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 140)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-141", "name": "Irvan Fazlin, S.Kep., Ners", "nip": "199103092015021003", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 141)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-142", "name": "Irwana, A.Md.Kep", "nip": "198408232008032001", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 142)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-143", "name": "Isidorus Maro, A.Md.Kep", "nip": "6108060704920009", "jenisId": "NIK", "unit": "ICU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 143)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-144", "name": "Istiqomah, S.Kep,Ners", "nip": "199307312023212015", "jenisId": "NIPPPK", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 144)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-145", "name": "Iwan Kurniawan, A.Md. Kep", "nip": "198205122003121006", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 145)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-147", "name": "Jamhariah Syofia, S.Kep., Ners", "nip": "198303052003122002", "jenisId": "NIP", "unit": "B (PERINATOLOGI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Neonatalogi", "profession": "Perawat Klinis (PK III Neonatalogi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 147)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-148", "name": "Jamilah, A.Md.Kep", "nip": "198712092010012009", "jenisId": "NIP", "unit": "HCU UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 148)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-149", "name": "Januardi, A.Md.Kep", "nip": "198501032010011013", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 149)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-150", "name": "Juliana, S.Kep.,Ners", "nip": "198109192011012006", "jenisId": "NIP", "unit": "MAHONI", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 150)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-151", "name": "Juliandri, A.Md.Kep", "nip": "197307191998031004", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 151)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-152", "name": "Juliawati, A.Md.Kep", "nip": "199107212022042001", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 152)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-153", "name": "Juniarti, S.Kep., Ners", "nip": "198606282009032001", "jenisId": "NIP", "unit": "POLI JANTUNG", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 153)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-154", "name": "Juniratri, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Respirologi", "profession": "Perawat Klinis (PK III Respirologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 154)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-155", "name": "K. Asdaka, A.Md.Kep", "nip": "198603112014021001", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 155)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-156", "name": "Karina Dhian Utami, A.Md.Kep", "nip": "198801312011012001", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 156)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-157", "name": "Karmila Apriyani, A.Md.Kep", "nip": "198704012010012007", "jenisId": "NIP", "unit": "PPT", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 157)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-158", "name": "Khairun Nisa, A.Md.Kep", "nip": "198508212008032002", "jenisId": "NIP", "unit": "Instalasi Kedokteran Nuklir dan Terapi Molekuler", "pkLevel": "PK III", "jenjangKlinis": "PK III Anak Medikal Bedah", "profession": "Perawat Klinis (PK III Anak Medikal Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 158)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-159", "name": "Kristina Simbolon, AMK", "nip": "197202122000032008", "jenisId": "NIP", "unit": "POLI PENYAKIT DALAM", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 159)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-160", "name": "Kurnia Eka Sari, S.Kep., Ners", "nip": "199101082020122012", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 160)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-161", "name": "Laila Istiqomah, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 161)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-162", "name": "Lenny Nababan, A.Md. Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 162)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-163", "name": "Lia Andriani, S.Kep, Ners", "nip": "198509202022212009", "jenisId": "NIPPPK", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 163)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-164", "name": "Lidia Mardiana, A.Md. Kep", "nip": "6108024812840002", "jenisId": "NIK", "unit": "A (ANAK)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 164)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-165", "name": "Linda Ayu Paronimasta, S.Kep,Ners", "nip": "198202092005022006", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 165)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-166", "name": "Linda Herlina Purba, A.Md.Kep", "nip": "197012021995032006", "jenisId": "NIP", "unit": "PPT", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 166)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-167", "name": "Lita Sahara, A.Md.Kep", "nip": "6112094501960003", "jenisId": "NIK", "unit": "ENGGANG GADING", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 167)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-168", "name": "Lola Priyanti, S.Kep., Ners", "nip": "6171024710970002", "jenisId": "NIK", "unit": "ICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Intensif", "profession": "Perawat Klinis (PK II Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 168)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-169", "name": "Lolyta Loviani, S.Kep., Ners", "nip": "199003162014022002", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 169)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-170", "name": "M. Amir, A.Md.Kep", "nip": "197904081999031002", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 170)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-171", "name": "M. Separiya Rusanto, S.Kep., Ners", "nip": "197009101998031007", "jenisId": "NIP", "unit": "POLI KEDOKTERAN JIWA", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 171)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-173", "name": "Majadanlipah, A.Md. Kep", "nip": "198508102022212008", "jenisId": "NIPPPK", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 173)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-174", "name": "Marcelina Berlianti, A.Md.Kep", "nip": "198602222011012005", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 174)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-175", "name": "Maryati, A.Md.Kep", "nip": "198902122023212014", "jenisId": "NIPPPK", "unit": "PICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 175)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-176", "name": "Maulidin Purnama, A.Md.Kep", "nip": "199309022020121010", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 176)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-177", "name": "Maurus Bill Heyden, A.Md.Kep", "nip": "6103102001930001", "jenisId": "NIK", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 177)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-178", "name": "Maylan Azimah, A.Md.Kep", "nip": "6171015801010001", "jenisId": "NIK", "unit": "ICU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 178)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-179", "name": "Mega Elyska, A.Md.Kep", "nip": "199208152014022001", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 179)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-180", "name": "Meli Novianti, A.Md.Kep", "nip": "6112064807960002", "jenisId": "NIK", "unit": "HCU UMUM", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 180)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-181", "name": "Melia Jayanti, S.Kep., Ners", "nip": "198902172020122010", "jenisId": "NIP", "unit": "A (ANAK)", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 181)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-182", "name": "Milasari, S.Kep., Ners", "nip": "197812122006042015", "jenisId": "NIP", "unit": "MERANTI", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 182)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-183", "name": "Muhammad Kurniawan, S.Kep., Ners", "nip": "199006022022211001", "jenisId": "NIPPPK", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 183)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-184", "name": "Muhammad Mushlihuddin, S.Kep., Ners", "nip": "198911022014021002", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 184)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-186", "name": "Mumammad Maulidin, A.Md.Kep", "nip": "199308192015021001", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 186)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-187", "name": "Mummad Sutan Ramdhannur Harahap, S.Kep., Ners", "nip": "198705172023211006", "jenisId": "NIPPPK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 187)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-189", "name": "Nadya Ima M, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 190)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-190", "name": "Nauly Annisa Dalimunthe, S.Kep., Ners", "nip": "6171054307980001", "jenisId": "NIK", "unit": "MERANTI", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 191)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-191", "name": "Nenny Octaria Artidarma, S.Kep., Ners", "nip": "198708072009032002", "jenisId": "NIP", "unit": "POLI JANTUNG", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 192)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-192", "name": "Nenny Sriwahyuni, A.Md.Kep", "nip": "198109262006042020", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 193)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-193", "name": "Ngatini, A.Md.Kep", "nip": "197401282006042006", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 194)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-194", "name": "Nicolas Bruno, A.Md.Kep", "nip": "198810122014021001", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 195)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-195", "name": "Nika Fariyanti, A.Md.Kep", "nip": "199007072014022001", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 196)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-196", "name": "Nova Susanti, A.Md.Kep", "nip": "197503112005022002", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 197)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-197", "name": "Noveriansyah Akbar, S.Kep., Ners", "nip": "199311132020121012", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 198)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-198", "name": "Novi Prastiyani, A.Md.Kep", "nip": "198411302008032001", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 199)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-199", "name": "Noviyanti, A.Md.Kep", "nip": "198503312008032001", "jenisId": "NIP", "unit": "THALASEMIA", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 200)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-201", "name": "Ns. Anas Sepyadi, S.Kep", "nip": "197909172005021004", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 202)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-202", "name": "Ns. Andre., S.Kep", "nip": "199408082022041001", "jenisId": "NIP", "unit": "HCU UMUM", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 203)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-203", "name": "Ns. Annas Masykur, Str.Kep., M.Kep", "nip": "6112073101960001", "jenisId": "NIK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 204)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-204", "name": "Ns. Ari Restu Prasetiyo Redi, S.Kep", "nip": "6105010404960002", "jenisId": "NIK", "unit": "A (ANAK)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 205)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-205", "name": "Ns. Ari Triono, Str.Kep", "nip": "6112011001950008", "jenisId": "NIK", "unit": "ICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Intensif", "profession": "Perawat Klinis (PK II Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 206)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-206", "name": "Ns. Dedi Iskandar, Str.Kep", "nip": "197404051996031002", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 207)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-207", "name": "Ns. Dipo Wibisono, S.Kep", "nip": "199007022023211003", "jenisId": "NIPPPK", "unit": "ENGGANG GADING", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 208)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-208", "name": "Ns. Dwinita Wulan Purnamasari, S.Kep", "nip": "198309232010012015", "jenisId": "NIP", "unit": "PPT", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 209)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-209", "name": "Ns. Dwita Azani Haristy, S.Kep", "nip": "198105182005022004", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 210)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-210", "name": "Ns. Endang Fiqhi Arkananda, Str.Kep", "nip": "6171010605990014", "jenisId": "NIK", "unit": "ENGGANG GADING", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 211)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-211", "name": "Ns. Fatimah, S.Kep", "nip": "6171045208930016", "jenisId": "NIK", "unit": "ENGGANG GADING", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 212)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-212", "name": "Ns. Fransiska Oybur, Str.Kep", "nip": "198906302010012003", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 213)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-213", "name": "Ns. Gusti Ayu Putu Suartini, Str. Kep", "nip": "197911251999032002", "jenisId": "NIP", "unit": "POLI JANTUNG", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 214)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-214", "name": "Ns. Hendrikus, Str.Kep", "nip": "197705121998031005", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 215)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-216", "name": "Ns. Ismi Rahayani, S.Kep", "nip": "198412292009032001", "jenisId": "NIP", "unit": "POLI PENYAKIT DALAM", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 217)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-217", "name": "Ns. Jul Pandi, S.Kep", "nip": "199204072023211007", "jenisId": "NIPPPK", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 218)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-218", "name": "Ns. Khairunnisa, S.Kep", "nip": "199503282023212014", "jenisId": "NIPPPK", "unit": "ENGGANG GADING", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 219)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-219", "name": "Ns. Luthfi Fadhlurrohman, Str.Kep", "nip": "6171033008000001", "jenisId": "NIK", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 220)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-220", "name": "Ns. Maria Olivia S, S.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 221)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-221", "name": "Ns. Marianto, S.Kep", "nip": "198504302011011004", "jenisId": "NIP", "unit": "POLI ESWL", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 222)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-222", "name": "Ns. Meyditia Ayu Ferdina, S.Kep, MKM", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 223)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-223", "name": "Ns. Mitha Ayuningtia, S.Kep", "nip": "199105262020122017", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 224)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-224", "name": "Ns. Monika Octaviani, S.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 225)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-225", "name": "Ns. Monika Triana, Str.Kep", "nip": "6171035205980003", "jenisId": "NIK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 226)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-226", "name": "Ns. Muhammad Azifa Reza, Str.Kep", "nip": "6171011407970010", "jenisId": "NIK", "unit": "ENGGANG GADING", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 227)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-227", "name": "Ns. Muhammad Firdaus S.Tr.Kep", "nip": "6171041301980009", "jenisId": "NIK", "unit": "KERAPU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 228)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-228", "name": "Ns. Mutiara Aprianingsih, Str.Kep", "nip": "6171054704990002", "jenisId": "NIK", "unit": "PICU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 229)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-229", "name": "Ns. Nadillah, Str.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 231)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-230", "name": "Ns. Nopida Riza Miniarti, S.Kep", "nip": "199211212023212014", "jenisId": "NIPPPK", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 232)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-231", "name": "Ns. Nur Sintia Dewi, Str.Kep", "nip": "197206021996032002", "jenisId": "NIP", "unit": "POLI BEDAH UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III Respirologi", "profession": "Perawat Klinis (PK III Respirologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 233)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-232", "name": "Ns. Nur’Aina Surya, S.Kep", "nip": "6105075302960003", "jenisId": "NIK", "unit": "A (ANAK)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 234)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-233", "name": "Ns. Nurmila Sari, S.Kep", "nip": "198004012006042025", "jenisId": "NIP", "unit": "POLI PERAWATAN LUKA DAN STOMA", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 235)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-234", "name": "Ns. Petrus Kanisius Tri Putra Mulya, S.Kep", "nip": "199512212023211002", "jenisId": "NIPPPK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 236)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-235", "name": "Ns. Rahmayani, S.Kep, M.Kep", "nip": "198306192006042014", "jenisId": "NIP", "unit": "MERANTI", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 237)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-236", "name": "Ns. Ratna Yuniawati, S.Kep", "nip": "198906242023212009", "jenisId": "NIPPPK", "unit": "ENGGANG GADING", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 238)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-237", "name": "Ns. Reindi Wiranata, S.Kep", "nip": "198903122014021003", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 239)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-238", "name": "Ns. Rendi Syahputra, S.Kep", "nip": "199204202023211004", "jenisId": "NIPPPK", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 240)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-239", "name": "Ns. Restituta Bonifasia Yanasari, S.Kep", "nip": "198412172010012017", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 241)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-241", "name": "Ns. Retno Citro, S.Kep", "nip": "199003082014021001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 243)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-242", "name": "Ns. Rillis Arumy Susanto, S.Kep", "nip": "199107162023212012", "jenisId": "NIPPPK", "unit": "ENGGANG GADING", "pkLevel": "PK II", "jenjangKlinis": "Ns. Mitha Ayuningtia, S.Kep", "profession": "Perawat Klinis (Ns. Mitha Ayuningtia, S.Kep)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 244)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-243", "name": "Ns. Rizki Utari Maulidiya, Str.Kep", "nip": "6171034406980010", "jenisId": "NIK", "unit": "HCU UMUM", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 245)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-244", "name": "Ns. Rizza Suryo Negoro., Str.Kep", "nip": "6171042103970001", "jenisId": "NIK", "unit": "MERANTI", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 246)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-245", "name": "Ns. Rusmulyadi, S.Kep, MARS", "nip": "198212282003121005", "jenisId": "NIP", "unit": "ENGGANG GADING", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 247)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-246", "name": "Ns. Sindi Astia Lestari, S.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 248)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-247", "name": "Ns. Sindi Muthiah Utami, S.Kep", "nip": "6171056802950004", "jenisId": "NIK", "unit": "NICU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 249)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-248", "name": "Ns. Suci Muslika Angitari, Str.Kep", "nip": "6171016112980009", "jenisId": "NIK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 250)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-249", "name": "Ns. Sugeng Rahmad Rani, S.Kep", "nip": "198703162023211003", "jenisId": "NIPPPK", "unit": "HCU UMUM", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 251)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-250", "name": "Ns. Sugianto Aryanto, S.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 252)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-251", "name": "Ns. Sulastri, S.Kep", "nip": "198307022010012020", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 253)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-252", "name": "Ns. Sulastri, Str. Kep", "nip": "197407062005022001", "jenisId": "NIP", "unit": "POLI BEDAH ANAK", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 254)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-253", "name": "Ns. Suryanti, Str. Kep", "nip": "197502231998032005", "jenisId": "NIP", "unit": "POLI SYARAF", "pkLevel": "PK III", "jenjangKlinis": "PK III Neurosains", "profession": "Perawat Klinis (PK III Neurosains)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 255)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-254", "name": "Ns. Tengku Roby Aswirandy, Str.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 256)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-255", "name": "Ns. Tio Aldino, S.Kep", "nip": "199112172023211004", "jenisId": "NIPPPK", "unit": "MERANTI", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 257)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-256", "name": "Ns. Uray Rani Irfiana, Str.Kep", "nip": "6171055408980002", "jenisId": "NIK", "unit": "HCU UMUM", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 258)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-257", "name": "Ns. Warisa Mifta Amanda, S.Kep", "nip": "199608282023212013", "jenisId": "NIPPPK", "unit": "ENGGANG GADING", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 259)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-258", "name": "Ns. Widiyanto, S.Kep", "nip": "199601052023211006", "jenisId": "NIPPPK", "unit": "ICU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 260)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-259", "name": "Ns. Wisnu Prabowo, S.Kep", "nip": "199403252023211003", "jenisId": "NIPPPK", "unit": "MAHONI", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 261)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-260", "name": "Ns. Witri Septia M, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 262)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-261", "name": "Ns. Yohanes Rindo Ari Wijoyo, S.Kep", "nip": "199305272022041001", "jenisId": "NIP", "unit": "PPT", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 263)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-262", "name": "Ns. Yuliana Juraidi, S.Kep", "nip": "197606251998032005", "jenisId": "NIP", "unit": "KEMOTERAPI (ODC)", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 264)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-263", "name": "Ns.Suma Nurbianti., Kep", "nip": "198111012008032001", "jenisId": "NIP", "unit": "KERAPU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 265)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-264", "name": "Nunung Cahya Sari, A.Md.Kep", "nip": "198211102023212003", "jenisId": "NIPPPK", "unit": "SINGKUT BULUH", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 266)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-265", "name": "Nur Azizah, A.Md.Kep", "nip": "198005152000032002", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 267)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-266", "name": "Nur Rahmah Tianawati, A.Md.Kep", "nip": "6112034605980004", "jenisId": "NIK", "unit": "ENGGANG GADING", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 268)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-267", "name": "Nur Tutin Handayani, Str. Kep., Ners", "nip": "198609262010012020", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 269)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-268", "name": "Nurhalifah, A.Md. Kep", "nip": "197306111994032001", "jenisId": "NIP", "unit": "THALASEMIA", "pkLevel": "PK III", "jenjangKlinis": "PK III Hemato-Onkologi Anak", "profession": "Perawat Klinis (PK III Hemato-Onkologi Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 270)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-269", "name": "Nurhidayati, S.Kep., Ners", "nip": "198201292014022001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 271)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-270", "name": "Nuri Safarini, AMK", "nip": "197303291996032004", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 272)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-271", "name": "Nurida, Str.Kep., Ners", "nip": "197602152009032001", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 273)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-272", "name": "Nurkayati, S.Kep., Ners", "nip": "197609302009032002", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 274)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-273", "name": "Nurmawati, A.Md.Kep", "nip": "197911112011012001", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 275)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-275", "name": "Nurninasari, A.Md.Kep", "nip": "198603292008032002", "jenisId": "NIP", "unit": "SINGKUT BULUH", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 277)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-276", "name": "Nyemas Jumiati, A.Md.Kep", "nip": "198003232000122002", "jenisId": "NIP", "unit": "POLI TB DOTS", "pkLevel": "PK III", "jenjangKlinis": "PK III", "profession": "Perawat Klinis (PK III)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 278)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-277", "name": "Nyemas Rika Kartika, A.Md.Kep", "nip": "197909192009032001", "jenisId": "NIP", "unit": "MERANTI", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 279)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-278", "name": "Odi Pratama Setiadi, A.Md.Kep", "nip": "199310022015021001", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 280)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-279", "name": "Ogi Novianto, A.Md.Kep", "nip": "198911162011011001", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 281)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-280", "name": "Oki Suparto, A.Md.Kep", "nip": "198810202014021001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 282)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-281", "name": "Oktavianus Memo, A.Md.Kep", "nip": "6103200803950001", "jenisId": "NIK", "unit": "SINGKUT BULUH", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 283)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-282", "name": "Paskah Rolimayanti, A.Md.Kep", "nip": "198204102005022005", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 284)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-283", "name": "Paskalia Ferdianti, A.Md.Kep", "nip": "198902072010012005", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 285)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-284", "name": "Petrus Timabng, S.Kep., Ners", "nip": "199301112023211006", "jenisId": "NIPPPK", "unit": "ICU", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 286)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-285", "name": "Pitri Aprianai, A.Md.Kep", "nip": "198805252010012007", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 287)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-286", "name": "Popon Pontiarsih, S.Kep., Ners", "nip": "198001212006042012", "jenisId": "NIP", "unit": "SINGKUT BULUH", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 288)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-287", "name": "Pria Adinda Runti, A.Md.Kep", "nip": "6171010209940004", "jenisId": "NIK", "unit": "PPT", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 289)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-288", "name": "Puji Lestari,Amd.Kep", "nip": "197910111998032002", "jenisId": "NIP", "unit": "PJT", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 290)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-289", "name": "Puspita Ari Yunita, A.Md.Kep", "nip": "198506102009032005", "jenisId": "NIP", "unit": "HCU UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 291)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-290", "name": "Qatrunada, A.Md.Kep", "nip": "199401232023212012", "jenisId": "NIPPPK", "unit": "PPT", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 292)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-291", "name": "Rahayu, S.Kep., Ners", "nip": "198501032008032001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 293)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-292", "name": "Rahmah, A.Md.Kep", "nip": "197707152009032001", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Neuro", "profession": "Perawat Klinis (PK III Neuro)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 294)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-294", "name": "Rahmatul Hadi, A.Md. Kep", "nip": "198502272008031002", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 296)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-295", "name": "Rakhmawaty, A.Md.Kep", "nip": "198410282023212021", "jenisId": "NIPPPK", "unit": "PJT", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 297)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-296", "name": "Randy Pratama, S.Kep., Ners", "nip": "199301292023211007", "jenisId": "NIPPPK", "unit": "HCU UMUM", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 298)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-297", "name": "Ratna Fitriani, A.Md.Kep", "nip": "198705292014022006", "jenisId": "NIP", "unit": "PPT", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 299)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-298", "name": "Raudha, S.Kep, Ners", "nip": "197908182006042033", "jenisId": "NIP", "unit": "PPT", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 300)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-299", "name": "Renni Pramita, A.Md.Kep", "nip": "198706162010012010", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 301)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-300", "name": "Renny Octavia. N, A.Md. Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 302)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-301", "name": "Retno Septinawati, AMK", "nip": "198409222014022001", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 303)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-302", "name": "Rexsi, A.Md.Kep", "nip": "6108022407960008", "jenisId": "NIK", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 304)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-303", "name": "Ria Nurmalasari, A.Md.Kep", "nip": "198506122010012025", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 305)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-304", "name": "Rika Aprianti Thabrani, A.Md.Kep", "nip": "199104262014022001", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 306)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-305", "name": "Rika Indranila, S.Kep", "nip": "197903182006042020", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 307)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-306", "name": "Rika Kurniasari, S.Kep., Ners", "nip": "6102064905980001", "jenisId": "NIK", "unit": "PICU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 308)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-307", "name": "Rina Ruwaida, A.Md.Kep", "nip": "198611132009032001", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 309)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-308", "name": "Rini Meilani, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 310)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-309", "name": "Rita Susanti, Str.Kep.,Ners", "nip": "197904152009032001", "jenisId": "NIP", "unit": "Instalasi Kedokteran Nuklir dan Terapi Molekuler", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 311)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-310", "name": "Rivan, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 312)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-311", "name": "Riza Edwin, A.Md.Kep", "nip": "197207081992031005", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 313)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-312", "name": "Rizki Anistya Putri, A.Md.Kep", "nip": "198810252014022002", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 314)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-313", "name": "Rosma Sitohang, Amd.Kep", "nip": "197702122006042015", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 315)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-314", "name": "Rosmiaty, A.Md.Kep", "nip": "197802102003122005", "jenisId": "NIP", "unit": "B (PERINATOLOGI)", "pkLevel": "PK III", "jenjangKlinis": "PK III Neonatalogi", "profession": "Perawat Klinis (PK III Neonatalogi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 316)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-315", "name": "Rosperida Sianipar, A.Md.Kep", "nip": "197309061993032007", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 317)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-316", "name": "Rospita Rohani Pangaribuan, A.Md.Kep", "nip": "197712242009032001", "jenisId": "NIP", "unit": "MERANTI", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 318)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-317", "name": "Rosyulinda, A.Md.Kep", "nip": "199101052014022001", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 319)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-318", "name": "Rubiah, A.Md.Kep", "nip": "198212232005022005", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 320)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-319", "name": "Rudianto, A.Md.Kep", "nip": "199306012023211004", "jenisId": "NIPPPK", "unit": "ICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Intensif", "profession": "Perawat Klinis (PK II Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 321)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-320", "name": "Rut Farida Simanjuntak, A.Md. Kep", "nip": "199304032014032001", "jenisId": "NIP", "unit": "KERAPU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 322)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-321", "name": "Sagala Kumala, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK II", "jenjangKlinis": "PK II Intensif", "profession": "Perawat Klinis (PK II Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 323)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-322", "name": "Samiah, A.Md.Kep", "nip": "198107282006042015", "jenisId": "NIP", "unit": "B (PERINATOLOGI)", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 324)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-323", "name": "Sanima, A.Md. Kep", "nip": "196901151994031005", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 325)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-324", "name": "Santhi, A. Md. Kep", "nip": "198605042009032001", "jenisId": "NIP", "unit": "HCU UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 326)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-325", "name": "Santi Muzdalifah, A.Md.Kep", "nip": "198201012009032002", "jenisId": "NIP", "unit": "HCU UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 327)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-326", "name": "Sapril, A.Md.Kep", "nip": "198904012015021002", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 328)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-327", "name": "Scolastica Bethasa Angelia, A.Md.Kep", "nip": "6171055002940005", "jenisId": "NIK", "unit": "MERANTI", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 329)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-328", "name": "Seliana Susilawati, S.Kep,Ners", "nip": "6103104912910001", "jenisId": "NIK", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 330)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-329", "name": "Sendy Wais Mumisnaty, A.Md.Kep", "nip": "199212152014022001", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 331)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-330", "name": "Shiren Beatrice, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 332)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-331", "name": "Siska Nila Sari, S.Kep,Ners", "nip": "197704042009032001", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 333)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-332", "name": "Siska Nurmenasari, S.Kep., Ners", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 334)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-333", "name": "Siska Vinatarin, A.Md.Kep", "nip": "198003162005022004", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 335)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-334", "name": "Siti Khadijah, A.Md.Kep", "nip": "197907142003122008", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 336)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-335", "name": "Siti Khotijah, S.Kep., Ners", "nip": "198812182025212112", "jenisId": "NIPPPK", "unit": "A (ANAK)", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 337)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-336", "name": "Siti Rahmah, S.Kep, Ners", "nip": "197712082003122009", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 338)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-337", "name": "Sofia, A.Md.Kep", "nip": "198202192006042014", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 339)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-338", "name": "Sondang. D Manalu, A.Md.Kep", "nip": "198303232009032005", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 340)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-339", "name": "Sri Bungarea Nur, S.Kep., Ners", "nip": "197806152010012013", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 341)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-340", "name": "Sri Hardini, A.Md.Kep", "nip": "199112312014022001", "jenisId": "NIP", "unit": "PJT", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 342)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-341", "name": "Sri Hartiningsih, A.Md.Kep", "nip": "197701012006042043", "jenisId": "NIP", "unit": "POLI ANAK", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 343)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-342", "name": "Sri Meutia, A.Md. Kep", "nip": "198709222008032001", "jenisId": "NIP", "unit": "THALASEMIA", "pkLevel": "PK III", "jenjangKlinis": "PK III Hemato-Onkologi Anak", "profession": "Perawat Klinis (PK III Hemato-Onkologi Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 344)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-343", "name": "Sri Murtini, A.Md.Kep", "nip": "198109182006042014", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 345)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-344", "name": "Sri Wahyuni, S.Kep., Ners", "nip": "199004112023212015", "jenisId": "NIPPPK", "unit": "PICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 346)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-345", "name": "Sri Yuli Muniarti, A.Md.Kep", "nip": "198507222011012002", "jenisId": "NIP", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Emergensi", "profession": "Perawat Klinis (PK III Emergensi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 347)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-346", "name": "Stevanus Darmo, Amd.Kep,SKM", "nip": "198806092023211004", "jenisId": "NIPPPK", "unit": "KERAPU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 348)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-347", "name": "Suci Amalia, S.Kep., Ners", "nip": "198902152014022002", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 349)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-348", "name": "Suci Ayu Dwi Cahyanti, A.Md. Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 350)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-349", "name": "Sudiati, A.Md.Kep", "nip": "198611132014022001", "jenisId": "NIP", "unit": "A (ANAK)", "pkLevel": "PK III", "jenjangKlinis": "PK III Anak Medikal Bedah", "profession": "Perawat Klinis (PK III Anak Medikal Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 351)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-350", "name": "Sugiati, A.Md.Kep", "nip": "198006062006042032", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 352)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-351", "name": "Sujiati, A.Md.Kep", "nip": "197506242006042020", "jenisId": "NIP", "unit": "ICVCU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 353)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-352", "name": "Sukapti, A.Md.Kep", "nip": "198809262014022002", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 354)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-353", "name": "Sulastri, A.Md.Kep", "nip": "198402072009032003", "jenisId": "NIP", "unit": "RADIOTERAPI", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 355)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-354", "name": "Sunandar Syahlewangi, Str.Kep., Ners", "nip": "198505082014021001", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 356)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-355", "name": "Sunarti, S.Kep Ners", "nip": "198502072009032001", "jenisId": "NIP", "unit": "MAHONI", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 357)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-356", "name": "Supriyono, A.Md.Kep", "nip": "198202092003121004", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 358)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-357", "name": "Susilawati, A.Md.Kep", "nip": "199501212023212012", "jenisId": "NIPPPK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 359)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-358", "name": "Syarif Abdurrakhim, A.Md.Kep, S. Sos, M.A.P", "nip": "197309071994031004", "jenisId": "NIP", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 360)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-359", "name": "Syf. Halijah Anisa, S.Kep.,Ners", "nip": "198205032006042015", "jenisId": "NIP", "unit": "MAHONI", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 361)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-360", "name": "Tanti Darma Yanti, A.Md.Kep", "nip": "198401152006042007", "jenisId": "NIP", "unit": "SINGKUT BULUH", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 362)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-361", "name": "Teguh Prmono, A.Md.Kep", "nip": "198602202009031001", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 363)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-362", "name": "Theodora Ira, S.Kep", "nip": "198403192008032002", "jenisId": "NIP", "unit": "HEMODIALISA (HD)", "pkLevel": "PK III", "jenjangKlinis": "PK III Nefrologi", "profession": "Perawat Klinis (PK III Nefrologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 364)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-363", "name": "Theresia Legima Ananta, A.Md. Kep", "nip": "198602282009032002", "jenisId": "NIP", "unit": "POLI PENYAKIT DALAM", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 365)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-364", "name": "Tika Wulandari, S.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 366)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-365", "name": "Titin Agustina, A.Md.Kep", "nip": "199008052014022001", "jenisId": "NIP", "unit": "A (ANAK)", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 367)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-366", "name": "Topan Iman Sanjaya, S.Kep., Ners", "nip": "199010222014021001", "jenisId": "NIP", "unit": "OK BEDAH SENTRAL", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 368)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-367", "name": "Tri Andari, A.Md.Kep", "nip": "198506282011012004", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 369)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-368", "name": "Tri Astuti, A.Md.Kep", "nip": "197901031998032001", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 370)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-369", "name": "Tri Herda Permana Sari, A.Md.Kep", "nip": "198502152010012013", "jenisId": "NIP", "unit": "ENGGANG GADING", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 371)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-370", "name": "Tri Wahyu Darsih, S.Kep., Ners", "nip": "197402032000122002", "jenisId": "NIP", "unit": "HCU UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 372)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-371", "name": "Trisna Kurniawan, S.Kep,Ners", "nip": "6171052710970006", "jenisId": "NIK", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 373)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-372", "name": "Trisno., A.Md.Kep", "nip": "198708162023211004", "jenisId": "NIPPPK", "unit": "INSTALASI GAWAT DARURAT (IGD)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 374)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-373", "name": "Turmi Kumalasari, A.Md. Kep", "nip": "198207272006042014", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 375)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-374", "name": "Tuti Awaliyah, S.Kep", "nip": "197804182003122007", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 376)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-375", "name": "Tuty Maghfirah, S.Kep., Ners", "nip": "198509052022212008", "jenisId": "NIPPPK", "unit": "OK IGD", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 377)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-376", "name": "Tya Juniarsi, A.Md.Kep", "nip": "198606212008032001", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 378)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-377", "name": "Uli Artha Utami, A.Md.Kep", "nip": "198508252023212006", "jenisId": "NIPPPK", "unit": "RADIOTERAPI", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 379)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-378", "name": "Uray Cerly Oktaviana, A.Md.Kep", "nip": "198310162023212006", "jenisId": "NIPPPK", "unit": "HCU UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 380)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-379", "name": "Utin Fatmawati, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Bedah", "profession": "Perawat Klinis (PK III Keperawatan Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 381)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-380", "name": "Utin Heni Kuswita, A.Md.Kep", "nip": "198004042009032002", "jenisId": "NIP", "unit": "MERANTI", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 382)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-381", "name": "Valentina Dwi Tina H, S.Kep., Ners", "nip": "6171035901890007", "jenisId": "NIK", "unit": "PICU", "pkLevel": "PK I", "jenjangKlinis": "PK I", "profession": "Perawat Klinis (PK I)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 383)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-382", "name": "Verawati, A.Md.Kep", "nip": "198603252010012011", "jenisId": "NIP", "unit": "PPT", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 384)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-383", "name": "Vuri Hartati, A.Md.Kep", "nip": "198103122005022002", "jenisId": "NIP", "unit": "PICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 385)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-384", "name": "Warsiti, AMK", "nip": "196909071996032005", "jenisId": "NIP", "unit": "A (ANAK)", "pkLevel": "PK III", "jenjangKlinis": "PK III Anak Medikal Bedah", "profession": "Perawat Klinis (PK III Anak Medikal Bedah)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 386)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-385", "name": "Weni Irene Rinicaputri,S.Kep.,Ners", "nip": "198707192010012012", "jenisId": "NIP", "unit": "KERAPU", "pkLevel": "PK II", "jenjangKlinis": "PK II KMB", "profession": "Perawat Klinis (PK II KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 387)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-386", "name": "Weni Wardati, A.Md.Kep", "nip": "198212162011012003", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 388)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-387", "name": "Winarni, A.Md.Kep", "nip": "198103252000032001", "jenisId": "NIP", "unit": "POLI JANTUNG", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 389)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-388", "name": "Winarsih, A.Md.Kep", "nip": "197805102008032001", "jenisId": "NIP", "unit": "HCU UMUM", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 390)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-389", "name": "Windi Safitri Nur, S.Kep., Ners", "nip": "199603162023212014", "jenisId": "NIPPPK", "unit": "PICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 391)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-390", "name": "Wisnu Kartika Sari, S.Kep., Ners", "nip": "198206282015022001", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 392)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-391", "name": "Wiwin Setyo H, A.Md.Kep", "nip": "-", "jenisId": "Arsip", "unit": "RSUD dr. Soedarso (Arsip 2024)", "pkLevel": "PK III", "jenjangKlinis": "PK III Onkologi", "profession": "Perawat Klinis (PK III Onkologi)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 393)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-392", "name": "Wiwit Fitriyanie, A.Md.Kep", "nip": "198207182005022003", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 394)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-393", "name": "Yosi Riskawati, A.Md.Kep", "nip": "197901262006042014", "jenisId": "NIP", "unit": "POLI THT", "pkLevel": "PK III", "jenjangKlinis": "PK III Keperawatan Medikal", "profession": "Perawat Klinis (PK III Keperawatan Medikal)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 395)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-394", "name": "Yuli Hartati, S.Kep., Ners", "nip": "197607032000032004", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif Anak", "profession": "Perawat Klinis (PK III Intensif Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 396)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-395", "name": "Yulia Fera, S.Kep., Ners", "nip": "198107182006042022", "jenisId": "NIP", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 397)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-396", "name": "Yuliana, A.Md.Kep", "nip": "198707282014022001", "jenisId": "NIP", "unit": "A (ANAK)", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 398)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-397", "name": "Yulianti, A.Md.Kep", "nip": "6112035007950005", "jenisId": "NIK", "unit": "A (ANAK)", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 399)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-398", "name": "Yulita Evi, A.Md.Kep", "nip": "198804072010012008", "jenisId": "NIP", "unit": "NICU", "pkLevel": "PK II", "jenjangKlinis": "PK II Anak", "profession": "Perawat Klinis (PK II Anak)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 400)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-399", "name": "Yusni Umar, A.Md.Kep", "nip": "198106072006041017", "jenisId": "NIP", "unit": "ICU", "pkLevel": "PK III", "jenjangKlinis": "PK III Intensif", "profession": "Perawat Klinis (PK III Intensif)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 401)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-400", "name": "Yusri Hasan, A.Md.Kep", "nip": "197402162005021001", "jenisId": "NIP", "unit": "RAWAT INAP ISOLASI PARU", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 402)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-401", "name": "Zainal Hamid, A.Md.Kep", "nip": "6112082102940002", "jenisId": "NIK", "unit": "SINGKUT BULUH", "pkLevel": "PK I", "jenjangKlinis": "PK I KMB", "profession": "Perawat Klinis (PK I KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 403)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-402", "name": "Zakaria, S.Kep., Ners", "nip": "6112010604890014", "jenisId": "NIK", "unit": "CAMAR (KEMOTERAPI)", "pkLevel": "PK II", "jenjangKlinis": "PK II", "profession": "Perawat Klinis (PK II)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 404)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40},
    {"id": "SPK-2024-ONL-403", "name": "Zakiah, A.Md.Kep", "nip": "197204101993032004", "jenisId": "NIP", "unit": "POLI Ortopedi", "pkLevel": "PK III", "jenjangKlinis": "PK III KMB", "profession": "Perawat Klinis (PK III KMB)", "strNumber": "Terverifikasi PSV", "strExpiry": "2027-05-30", "spkNumber": "BA Kredensial Online 2024 (No. 405)", "spkDate": "2024-05-30", "spkExpiry": "2027-05-30", "baNumber": "BA-KRED-ONLINE-2024", "baDate": "2024-05-30", "notaDinas": "BA Kredensial Online 1 Apr–30 Mei 2024", "credentialStatus": "Disetujui", "peerReviewer": "Mitra Bestari / Sub Komite Kredensial (2024)", "approvedCompetencies": 40, "totalCompetencies": 40}
  ],

  // Data Audit Mutu Klinis Keperawatan per Ruangan (Dikelola dinamis)
  clinicalAudits: [],

  // Regulasi Resmi Komite Keperawatan RSUD Dr. Soedarso
  regulations: [
    {
      id: "REG-00C",
      category: "Kebijakan Direktur",
      title: "SK Direktur RSUD dr. Soedarso tentang Komite Keperawatan (250505_SK_KomKep)",
      number: "SK-KOMKEP/2025",
      year: "2025",
      format: "PDF",
      size: "Google Drive",
      desc: "Surat Keputusan Direktur RSUD dr. Soedarso Pontianak terkait penetapan dan susunan Komite Keperawatan (berkas resmi 250505_SK_KomKep.pdf).",
      viewUrl: "https://drive.google.com/file/d/1EXOR4c-y5Ue_Z6JAO4z-v8hNAvKs7Boq/view?usp=sharing",
      url: "https://drive.google.com/uc?export=download&id=1EXOR4c-y5Ue_Z6JAO4z-v8hNAvKs7Boq"
    },
    {
      id: "REG-00B",
      category: "Laporan & Arsip Komite",
      title: "Program Kerja Komite Keperawatan RSUD dr. Soedarso Tahun 2026",
      number: "PROKER-KOMKEP/2026",
      year: "2026",
      format: "PDF",
      size: "Google Drive",
      desc: "Dokumen resmi rencana dan program kerja Komite Keperawatan RSUD dr. Soedarso Tahun 2026 meliputi Subkomite Kredensial, Mutu Profesi, dan Etik & Disiplin.",
      viewUrl: "https://drive.google.com/file/d/1knpnAzne5pVOAKnznKH72wZt9Vk5-Ghy/view?usp=sharing",
      url: "https://drive.google.com/uc?export=download&id=1knpnAzne5pVOAKnznKH72wZt9Vk5-Ghy"
    },
    {
      id: "REG-00",
      category: "Laporan & Arsip Komite",
      title: "Laporan Komite Keperawatan RSUD dr. Soedarso Tahun 2025",
      number: "LAP-KOMKEP/2025",
      year: "2025",
      format: "PDF",
      size: "Google Drive",
      desc: "Laporan resmi pelaksanaan program kerja, kredensialing, peningkatan mutu profesi, serta pembinaan etik & disiplin Komite Keperawatan RSUD dr. Soedarso Tahun 2025.",
      viewUrl: "https://drive.google.com/file/d/1vBEEr4Tosm5yYaQe1PmPY8kP5zIu5-Gu/view?usp=sharing",
      url: "https://drive.google.com/uc?export=download&id=1vBEEr4Tosm5yYaQe1PmPY8kP5zIu5-Gu"
    },
    {
      id: "REG-01",
      category: "Regulasi Nasional",
      title: "Permenkes RI No. 49 Tahun 2013 tentang Komite Keperawatan Rumah Sakit",
      number: "PMK No. 49 / 2013",
      year: "2013",
      format: "PDF",
      size: "2.4 MB",
      desc: "Landasan hukum pembentukan, fungsi, tugas wewenang Komite Keperawatan dan 3 Subkomite di seluruh RS Indonesia."
    },
    {
      id: "REG-02",
      category: "Kebijakan Direktur",
      title: "SK Direktur RSUD Dr. Soedarso tentang Penetapan Clinical Privilege & Kredensialing Tenaga Keperawatan",
      number: "SK.DIR/445/102/2024",
      year: "2024",
      format: "PDF",
      size: "3.8 MB",
      desc: "Pedoman baku tata laksana penerbitan SPK dan RKK tenaga perawat & bidan di lingkungan RSUD Dr. Soedarso Pontianak."
    },
    {
      id: "REG-03",
      category: "Buku Putih (White Paper)",
      title: "Buku Putih Jenjang Karir & Standar Rincian Kewenangan Klinis (RKK) Keperawatan RSUD Dr. Soedarso",
      number: "BP-KOMKEP/2025/REV-3",
      year: "2025",
      format: "PDF",
      size: "5.1 MB",
      desc: "Katalog standar kompetensi klinis PK I s/d PK V serta PMB I s/d PMB IV beserta batas kewenangan mandiri vs supervisi."
    },
    {
      id: "REG-04",
      category: "Panduan Klinis & Audit",
      title: "Panduan Pelaksanaan Audit Mutu Asuhan Keperawatan & Ronde Keperawatan Klinis",
      number: "PND/MUTU-KEP/014/2024",
      year: "2024",
      format: "DOCX",
      size: "1.2 MB",
      desc: "Instrumen penilaian CPPT, monitoring indikator infeksi nosokomial, dan lembar kerja evaluasi keselamatan pasien."
    },
    {
      id: "REG-05",
      category: "Formulir & Template",
      title: "Formulir Permohonan Kredensial / Rekredensialing & Self Assessment Portofolio",
      number: "FORM-KRED-001/2025",
      year: "2025",
      format: "DOCX",
      size: "850 KB",
      desc: "Template resmi berkas pengajuan kredensialing mandiri dilengkapi daftar cek dokumen STR, SIP, ijazah, sertifikat pelatihan."
    },
    {
      id: "REG-06",
      category: "Etika & Disiplin",
      title: "Pedoman Tata Tertib Sidang Etik & Perlindungan Whistleblower Tenaga Keperawatan RSUD Dr. Soedarso",
      number: "PED-ETIK/003/2024",
      year: "2024",
      format: "PDF",
      size: "1.9 MB",
      desc: "Mekanisme pengaduan rahasia, hak pembelaan tenaga kesehatan, prosedur investigasi netral tanpa intimidasi."
    }
  ],

  // Sample Ticket Pengaduan / Konsultasi Etika & Disiplin (Dikelola dinamis)
  sampleTickets: [],

  // Unit Kerja & Penempatan Ruang Resmi RSUD Dokter Soedarso Sesuai SK Direktur No: SK/031103/RSUD/2025 (Total 749 Tempat Tidur Tahun 2026)
  hospitalUnits: [
    // A. RAWAT INAP (574 TT)
    "Singkut Buluh", "PPT", "A (Anak)", "B (Perinatologi)", "ULS (Syaraf)", "Camar (Kemoterapi)",
    "Kerapu (Penyakit Dalam Pria & Wanita)", "Meranti", "Mahoni", "Ramin Dewasa", "Ramin Bayi",
    "ICU", "HCU Umum", "PICU", "HCU Anak", "NICU", "Isolasi Paru", "Isolasi ICU",
    "Kakap (Penyakit Dalam)", "Arwana",

    // B. RAWAT INAP JANTUNG TERPADU (50 TT)
    "ICVCU", "HCU", "VIP", "Kelas 1", "Non Kelas",

    // C. RUANG TINDAKAN (51 TT)
    "Cendana (RI Dewasa)", "Cendana (Tindakan)", "Cendana (Bed Bayi Rawat Gabung)",
    "IGD", "IGD Kebidanan", "IGD Transit", "OK Sentral", "OK IGD",

    // D. RUANG RAWAT KHUSUS (74 TT)
    "Thalasemia", "Hemodialisa", "Kemoterapi (ODC)",

    // E. RAWAT JALAN & PENUNJANG
    "Poliklinik Rawat Jalan"
  ],

  // Metadata Master Ruangan Resmi Berdasarkan SK Direktur No: SK/031103/RSUD/2025 (Total 749 Tempat Tidur)
  hospitalRoomsSK: {
    nomorSK: "SK/031103/RSUD/2025",
    perubahanAtas: "SK/020106/RSUD/2025",
    judul: "Penetapan Jumlah Tempat Tidur Pada RSUD Dokter Soedarso Provinsi Kalimantan Barat Tahun 2026",
    tanggalSK: "3 November 2025",
    direktur: "drg. Hary Agung Tjahyadi, M.Kes",
    direkturPangkat: "Pembina Utama Muda",
    direkturNIP: "196905201998031008",
    wadirMedikDanKeperawatan: "dr. Batara Hendra Putra Sianipar",
    totalTempatTidur: 749,
    categories: [
      {
        kode: "A",
        nama: "RAWAT INAP",
        totalTT: 574,
        rooms: [
          { nama: "Singkut Buluh", tt: 13, rincian: "Utama III (1), VIP Utama IV (12)" },
          { nama: "PPT", tt: 43, rincian: "Utama III (1), Kls I (34), Kls II (8)" },
          { nama: "A (Anak)", tt: 99, rincian: "VIP Utama IV (5), Kls I (18), Non Kls (76)" },
          { nama: "B (Perinatologi)", tt: 25, rincian: "Non Kls (25)" },
          { nama: "ULS (Syaraf)", tt: 38, rincian: "Kls III (38)" },
          { nama: "Camar (Kemoterapi)", tt: 35, rincian: "Kls III (35)" },
          { nama: "Kerapu (Penyakit Dalam Pria & Wanita)", tt: 41, rincian: "Kls III (41)" },
          { nama: "Meranti", tt: 40, rincian: "Kls III (40)" },
          { nama: "Mahoni", tt: 41, rincian: "Kls III (41)" },
          { nama: "Ramin Dewasa", tt: 28, rincian: "Non Kls (28)" },
          { nama: "Ramin Bayi", tt: 5, rincian: "Non Kls (5)" },
          { nama: "ICU", tt: 18, rincian: "Non Kls (18)" },
          { nama: "HCU Umum", tt: 19, rincian: "Non Kls (19)" },
          { nama: "PICU", tt: 7, rincian: "Non Kls (7)" },
          { nama: "HCU Anak", tt: 6, rincian: "Non Kls (6)" },
          { nama: "NICU", tt: 9, rincian: "Non Kls (9)" },
          { nama: "Isolasi Paru", tt: 42, rincian: "Kls III (42)" },
          { nama: "Isolasi ICU", tt: 4, rincian: "Non Kls (4)" },
          { nama: "Kakap (Penyakit Dalam)", tt: 41, rincian: "Non Kls (41)" },
          { nama: "Arwana", tt: 20, rincian: "Non Kls (20)" }
        ]
      },
      {
        kode: "B",
        nama: "RAWAT INAP JANTUNG TERPADU",
        totalTT: 50,
        rooms: [
          { nama: "ICVCU", tt: 14, rincian: "Non Kls (14)" },
          { nama: "HCU", tt: 4, rincian: "Non Kls (4)" },
          { nama: "VIP", tt: 4, rincian: "VIP Utama IV (4)" },
          { nama: "Kelas 1", tt: 8, rincian: "Kls I (8)" },
          { nama: "Non Kelas", tt: 20, rincian: "Kls III (20)" }
        ]
      },
      {
        kode: "C",
        nama: "RUANG TINDAKAN",
        totalTT: 51,
        rooms: [
          { nama: "Cendana (RI Dewasa)", tt: 6, rincian: "Non Kls (6)" },
          { nama: "Cendana (Tindakan)", tt: 5, rincian: "Non Kls (5)" },
          { nama: "Cendana (Bed Bayi Rawat Gabung)", tt: 5, rincian: "Non Kls (5)" },
          { nama: "IGD", tt: 16, rincian: "Non Kls (16)" },
          { nama: "IGD Kebidanan", tt: 2, rincian: "Non Kls (2)" },
          { nama: "IGD Transit", tt: 12, rincian: "Non Kls (12)" },
          { nama: "OK Sentral", tt: 8, rincian: "Non Kls (8)" },
          { nama: "OK IGD", tt: 2, rincian: "Non Kls (2)" }
        ]
      },
      {
        kode: "D",
        nama: "RUANG RAWAT KHUSUS",
        totalTT: 74,
        rooms: [
          { nama: "Thalasemia", tt: 20, rincian: "Non Kls (20)" },
          { nama: "Hemodialisa", tt: 34, rincian: "Non Kls (34)" },
          { nama: "Kemoterapi (ODC)", tt: 20, rincian: "Non Kls (20)" }
        ]
      },
      {
        kode: "E",
        nama: "RAWAT JALAN & PENUNJANG",
        totalTT: 0,
        rooms: [
          { nama: "Poliklinik Rawat Jalan", tt: 0, rincian: "Pelayanan Rawat Jalan Non-TT" }
        ]
      }
    ]
  },

  // Jenjang Pendidikan Formal Keperawatan & Kebidanan
  educationDegrees: [
    "D3 Keperawatan",
    "D3 Kebidanan",
    "D4 / S.Tr.Keb Kebidanan",
    "S1 Keperawatan",
    "Profesi Ners (Ns.)",
    "Magister Keperawatan (M.Kep / Sp.Kep)",
    "Spesialis Keperawatan Medikal Bedah (Sp.KMB)",
    "Spesialis Keperawatan Anak (Sp.Kep.A)",
    "Spesialis Keperawatan Maternitas (Sp.Kep.Mat)"
  ],

  // Sample RKK Dikembalikan / Perlu Perbaikan (Sesuai Komkep BARI)
  returnedRkk: [
    {
      id: "RET-01",
      nurseName: "Ns. Bambang Prasetyo, S.Kep",
      nip: "198509202008011007",
      unit: "ICU Sentral",
      pkLevel: "PK IV",
      tglPengembalian: "16 Oktober 2026",
      alasan: "Logbook asuhan intensif belum ditandatangani Kepala Ruangan ICU & Surat STR perpanjangan terbaru belum terunggah."
    }
  ],

  // Susunan Lengkap Struktur Komite Keperawatan Berdasarkan SK Direktur No. SK/ 280801 /RSUD/2026
  structureSK: [
    { no: 1, name: "M. Separia Russanto, S.Kep., Ns", role: "Ketua", group: "Pimpinan Komite", badge: "Super Admin", nip: "197009101998031007", username: "separia", alias: "admin.komite" },
    { no: 2, name: "Ns. Rusmulyadi, S.Kep., MARS", role: "Sekretaris", group: "Pimpinan Komite", badge: "Super Admin", nip: "198212282003121005", username: "rusmulyadi", alias: "sekretaris" },
    
    // Sub Komite Kredensial
    { no: 3, name: "Ns. Yohanes Rindo Ari Wijoyo, S.Kep", role: "Ketua Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", nip: "199305272022041001", username: "yohanes", alias: "kredensial" },
    { no: 4, name: "Tri Herda Permana Sari, A.Md.Kep", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", nip: "198502152010012013", username: "tri.herda" },
    { no: 5, name: "Ns. Dwinita Wulan Purnamasari, S.Kep", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", nip: "198309232010012015", username: "dwinita" },
    { no: 6, name: "Ns. Ika Yusniarti, S.Kep", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", nip: "198102122005022006", username: "ika.yusniarti" },
    { no: 7, name: "F. Surayniwaty, S.ST", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", nip: "197805052003122011", username: "surayniwaty" },
    { no: 8, name: "Noveriansyah Akbar, S.Kep., Ns", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", nip: "199311132020121012", username: "noveriansyah" },
    { no: 9, name: "Mushlihuddin, S.Kep., Ns", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", nip: "198911022014021002", username: "mushlihuddin" },
    { no: 10, name: "Herkulanus Yunus, A.Md.Kep", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", nip: "198606052022211002", username: "herkulanus" },
    { no: 11, name: "Bdn. Evilita Ratnawati, S.ST", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", nip: "197005021989112001", username: "evilita" },

    // Sub Komite Etika dan Disiplin
    { no: 12, name: "Alfonsus Agus Ainaro Simamora, S.Kep., Ns., MH", role: "Ketua Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", nip: "199308012020121021", username: "alfonsus", alias: "etik" },
    { no: 13, name: "Ns. Gunawan, S.Tr.Kep., SKM", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", nip: "197403012000121004", username: "gunawan" },
    { no: 14, name: "Ns. Marianto, S.Kep", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", nip: "198504302011011004", username: "marianto" },
    { no: 15, name: "Andri Muzayyin, S.Kep., Ns", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", nip: "198602112011011004", username: "andri.muzayyin" },
    { no: 16, name: "Diana Rachmawati, S.ST", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", nip: "198205292006042012", username: "diana" },
    { no: 17, name: "Nur'aini Ratnasari, S.T.Keb", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", nip: "198303012005022001", username: "nuraini" },

    // Sub Komite Mutu Keperawatan
    { no: 18, name: "Laila Istiqomah, S.Kep., Ns", role: "Ketua Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", nip: "199203082014022001", username: "laila", alias: "mutu" },
    { no: 19, name: "Bdn. Ely Lidiawati, S.Tr.Keb", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", nip: "197410182000122005", username: "ely.lidiawati" },
    { no: 20, name: "Rudy Hartono, S.Kep., Ns", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", nip: "198502102009031001", username: "rudy.hartono" },
    { no: 21, name: "Stevanus Darmo, A.Md.Kep., SKM", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", nip: "198806092023211004", username: "stevanus" },
    { no: 22, name: "Ernia Wati, S.Kep., Ns", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", nip: "198807152023212012", username: "ernia.wati" },
    { no: 23, name: "Munazzil, A.Md.Kep", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", nip: "199704212022041001", username: "munazzil" },
    { no: 24, name: "Odi Pratama Setiadi, S.Kep., Ns", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", nip: "199310022015021001", username: "odi.pratama" }
  ],

  // Susunan Resmi Panitia Ad Hoc Pemilihan Ketua Komite Keperawatan Periode 2027–2030
  // Keputusan Direktur RSUD dr. Soedarso Provinsi Kalimantan Barat Nomor SK/[ ]/RSUD/2026
  panitiaAdHocSK: {
    judul: "Pembentukan Panitia Ad Hoc Pemilihan Ketua Komite Keperawatan Periode 2027–2030",
    nomorSK: "SK/[ ]/RSUD/2026",
    notaDinas: "044/K.Kep.RSDS/ND/XI/2026",
    peraturanDirektur: "Peraturan Direktur Nomor 01/II/05 Tahun 2026 tentang Peraturan Internal Staf Keperawatan (Nursing Staff By Laws)",
    akhirMasaJabatanSebelumnya: "02 Januari 2027",
    masaKerjaBulan: 4,
    direktur: {
      name: "drg. Hary Agung Tjahyadi, M.Kes",
      pangkat: "Pembina Utama Muda",
      nip: "196905201998031008"
    },
    anggota: [
      { no: 1, kedudukan: "Ketua merangkap anggota", bidang: "Pimpinan Panitia", name: "M. Mushlihuddin, S.Kep., Ners", nip: "198911022014021002", unit: "Unit ICVCU", unsur: "Staf Keperawatan Rumah Sakit" },
      { no: 2, kedudukan: "Sekretaris merangkap anggota", bidang: "Administrasi & Kesekretariatan", name: "Ns. Rusmulyadi, S.Kep., MARS", nip: "198212282003121005", unit: "Ruang Kakap", unsur: "Staf Keperawatan Rumah Sakit" },
      { no: 3, kedudukan: "Anggota (verifikasi persyaratan calon)", bidang: "Verifikasi Persyaratan Calon", name: "Ns. Noveriansyah Akbar, S.Kep.", nip: "199311132020121012", unit: "Ruang Camar", unsur: "Staf Keperawatan Rumah Sakit" },
      { no: 4, kedudukan: "Anggota (verifikasi persyaratan calon)", bidang: "Verifikasi Persyaratan Calon", name: "Herkulanus Yunus, A.Md.Kep", nip: "198606052022211002", unit: "Ruang Singkut Buluh", unsur: "Staf Keperawatan Rumah Sakit" },
      { no: 5, kedudukan: "Anggota (pemungutan dan penghitungan suara)", bidang: "Pemungutan dan Penghitungan Suara", name: "Stevanus Darmo, A.Md.Kep., SKM", nip: "198806092023211004", unit: "Ruang Kerapu", unsur: "Staf Keperawatan Rumah Sakit" },
      { no: 6, kedudukan: "Anggota (pemungutan dan penghitungan suara)", bidang: "Pemungutan dan Penghitungan Suara", name: "Diana Rachmawati, S.ST", nip: "198205292006042012", unit: "Ruang Cendana", unsur: "Staf Keperawatan Rumah Sakit" },
      { no: 7, kedudukan: "Anggota (data pemilih dan sistem informasi)", bidang: "Data Pemilih dan Sistem Informasi", name: "Munazzil, A.Md.Kep.", nip: "199704212022041001", unit: "Cathlab", unsur: "Staf Keperawatan Rumah Sakit" }
    ],
    tugasWewenang: [
      "Ketua: memimpin dan bertanggung jawab atas seluruh tahapan Pemilihan, serta mewakili Panitia kepada Direktur dan Komite Keperawatan.",
      "Sekretaris: mengelola administrasi, risalah rapat, pengumuman, dan arsip.",
      "Anggota verifikasi persyaratan calon: menerima dan memeriksa berkas Calon, termasuk keabsahan STR, SIP/SIB, dan surat penugasan klinis.",
      "Anggota pemungutan dan penghitungan suara: menyiapkan tempat pemungutan suara atau sistem elektronik, surat suara, saksi, dan berita acara penghitungan.",
      "Anggota data pemilih dan sistem informasi: menyusun DPT dan menjaga keamanan data.",
      "Seluruh anggota: menjaga kerahasiaan dan netralitas, serta tidak menerima pemberian dalam bentuk apa pun dari Calon atau pihak yang berkepentingan."
    ]
  },

  // 24 Akun Admin Pengurus Resmi Komite Keperawatan Sesuai SK Direktur
  adminUsers: [
    // 1. Pimpinan Komite (Super Admin)
    {
      username: "separia",
      alias: "admin.komite",
      altAlias: "ketua",
      nip: "197009101998031007",
      name: "M. Separia Russanto, S.Kep., Ns",
      role: "Ketua Komite Keperawatan",
      email: "komitekeperawatanrsds2023@gmail.com",
      badge: "Super Admin",
      group: "Pimpinan Komite",
      access: ["kredensial", "mutu", "etik", "regulasi", "approval", "administrasi"]
    },
    {
      username: "rusmulyadi",
      alias: "sekretaris",
      altAlias: "admin.sekretaris",
      nip: "198212282003121005",
      name: "Ns. Rusmulyadi, S.Kep., MARS",
      role: "Sekretaris Komite Keperawatan & Developer Website",
      email: "komitekeperawatanrsds2023@gmail.com",
      badge: "Super Admin",
      group: "Pimpinan Komite",
      access: ["superadmin", "kredensial", "mutu", "etik", "regulasi", "approval", "administrasi", "developer"]
    },

    // 2. Sub Komite Kredensial
    {
      username: "yohanes",
      nip: "199305272022041001",
      alias: "kredensial",
      name: "Ns. Yohanes Rindo Ari Wijoyo, S.Kep",
      role: "Ketua Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial", "approval"]
    },
    {
      username: "tri.herda",
      nip: "198502152010012013",
      name: "Tri Herda Permana Sari, A.Md.Kep",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "dwinita",
      nip: "198309232010012015",
      name: "Ns. Dwinita Wulan Purnamasari, S.Kep",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "ika.yusniarti",
      nip: "198102122005022006",
      name: "Ns. Ika Yusniarti, S.Kep",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "surayniwaty",
      nip: "197805052003122011",
      name: "F. Surayniwaty, S.ST",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "noveriansyah",
      nip: "199311132020121012",
      name: "Noveriansyah Akbar, S.Kep., Ns",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "mushlihuddin",
      nip: "198911022014021002",
      name: "Mushlihuddin, S.Kep., Ns",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "herkulanus",
      nip: "198606052022211002",
      name: "Herkulanus Yunus, A.Md.Kep",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "evilita",
      nip: "197005021989112001",
      name: "Bdn. Evilita Ratnawati, S.ST",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },

    // 3. Sub Komite Etika dan Disiplin
    {
      username: "alfonsus",
      nip: "199308012020121021",
      alias: "etik",
      name: "Alfonsus Agus Ainaro Simamora, S.Kep., Ns., MH",
      role: "Ketua Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "gunawan",
      nip: "197403012000121004",
      name: "Ns. Gunawan, S.Tr.Kep., SKM",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "marianto",
      nip: "198504302011011004",
      name: "Ns. Marianto, S.Kep",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "andri.muzayyin",
      nip: "198602112011011004",
      name: "Andri Muzayyin, S.Kep., Ns",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "diana",
      nip: "198205292006042012",
      name: "Diana Rachmawati, S.ST",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "nuraini",
      nip: "198303012005022001",
      name: "Nur'aini Ratnasari, S.T.Keb",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },

    // 4. Sub Komite Mutu Keperawatan
    {
      username: "laila",
      nip: "199203082014022001",
      alias: "mutu",
      name: "Laila Istiqomah, S.Kep., Ns",
      role: "Ketua Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "ely.lidiawati",
      nip: "197410182000122005",
      name: "Bdn. Ely Lidiawati, S.Tr.Keb",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "rudy.hartono",
      nip: "198502102009031001",
      name: "Rudy Hartono, S.Kep., Ns",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "stevanus",
      nip: "198806092023211004",
      name: "Stevanus Darmo, A.Md.Kep., SKM",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "ernia.wati",
      nip: "198807152023212012",
      name: "Ernia Wati, S.Kep., Ns",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "munazzil",
      nip: "199704212022041001",
      name: "Munazzil, A.Md.Kep",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "odi.pratama",
      nip: "199310022015021001",
      name: "Odi Pratama Setiadi, S.Kep., Ns",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    }
  ],

  // Preset Format Baku CV Portofolio Klinis Staf Keperawatan (3 Halaman RSUD dr. Soedarso)
  sampleCv: {
    perawat: {
      nama: "",
      nip: "199204152019031004",
      ttl: "Pontianak, 15 April 1992",
      jabatan: "Perawat Pelaksana / Ketua Tim",
      unit: "Ruang Rawat Inap",
      pkSaatIni: "PK II",
      pkDiusulkan: "PK III",
      areaKlinis: "kmb_bedah_pk3",
      str: "140152119-2849103",
      strBerlaku: "15 April 2028 (Wajib Aktif)",
      sipp: "503/0842/SIPP/DPMPTSP-C/2022",
      sippBerlaku: "15 April 2027",
      pendidikan: [
        { jenjang: "D3 Keperawatan", institusi: "Poltekkes Kemenkes Pontianak", tahun: "2013", noIjazah: "14201/POLTEK-PTK/D3/2013" },
        { jenjang: "S1 Keperawatan", institusi: "STIKes Yarsi Pontianak", tahun: "2017", noIjazah: "08412/YARSI/S1-KEP/2017" },
        { jenjang: "Profesi Ners", institusi: "Fakultas Kedokteran Universitas Tanjungpura", tahun: "2018", noIjazah: "180901/NERS-UNTAN/2018" },
        { jenjang: "S2 / Spesialis", institusi: "Peminatan KMB Universitas Indonesia", tahun: "2024", noIjazah: "0912/UI-FIK/S2-KMB/2024" }
      ],
      pengalamanKerja: [
        { instansi: "RSUD dr. Soedarso Pontianak", ruangan: "Ruang Bedah Pria (Kakap)", periode: "04/2019 s.d 10/2022", durasi: "3 Tahun 6 Bulan" },
        { instansi: "RSUD dr. Soedarso Pontianak", ruangan: "Ruang Intensive Care Unit (ICU)", periode: "11/2022 s.d Sekarang", durasi: "3 Tahun 11 Bulan" },
        { instansi: "RS Antonius Pontianak", ruangan: "Instalasi Gawat Darurat (IGD)", periode: "01/2014 s.d 02/2019", durasi: "5 Tahun 1 Bulan" }
      ],
      pelatihan: [
        { jenis: "Basic Trauma Cardiac Life Support (BTCLS)", penyelenggara: "Ambulance Gawat Darurat 118 / PPNI", tahun: "2023", masaBerlaku: "Aktif s.d 20/08/2027" },
        { jenis: "Pelatihan Intensive Care Unit (ICU) Komprehensif", penyelenggara: "Bapelkes / RS Rujukan Pusat Tipe A", tahun: "2022", masaBerlaku: "Seumur Hidup / Re-sertifikasi" },
        { jenis: "Pelatihan Asisten Kateterisasi Jantung (Cath Lab)", penyelenggara: "RS Jantung & Pembuluh Darah Harapan Kita", tahun: "2021", masaBerlaku: "Valid / Berlaku" },
        { jenis: "Workshop Asesmen Keperawatan Lanjutan", penyelenggara: "Komite Keperawatan RSUD dr. Soedarso", tahun: "2024", masaBerlaku: "Internal RS" }
      ],
      pernyataanKota: "Pontianak",
      pernyataanTahun: "2026"
    },
    bidan: {
      nama: "",
      nip: "199408222020122006",
      ttl: "Mempawah, 22 Agustus 1994",
      jabatan: "Bidan Pelaksana Lanjutan",
      unit: "IGD Kebidanan",
      pkSaatIni: "BK II",
      pkDiusulkan: "BK III",
      areaKlinis: "pmb_kebidanan",
      str: "140252220-3918204",
      strBerlaku: "22 Agustus 2028 (Wajib Aktif)",
      sipp: "503/1209/SIPB/DPMPTSP-C/2021",
      sippBerlaku: "22 Agustus 2026",
      pendidikan: [
        { jenjang: "D3 Keperawatan / Kebidanan", institusi: "Poltekkes Kemenkes Pontianak", tahun: "2015", noIjazah: "15201/POLTEK-PTK/D3-KEB/2015" },
        { jenjang: "S1 Keperawatan / D4 Kebidanan", institusi: "Poltekkes Kemenkes Semarang (D4 Kebidanan)", tahun: "2018", noIjazah: "0912/POLTEK-SMG/D4/2018" },
        { jenjang: "Profesi Ners / Bidan", institusi: "Universitas Aisyiyah Yogyakarta (Profesi Bidan)", tahun: "2020", noIjazah: "20092/UNISA/PROF-BDN/2020" },
        { jenjang: "S2 / Spesialis", institusi: "Magister Kebidanan Terapan Poltekkes Semarang", tahun: "2023", noIjazah: "M.Keb/POLTEK-SMG/2023" }
      ],
      pengalamanKerja: [
        { instansi: "RSUD dr. Soedarso Pontianak", ruangan: "Ruang Nifas & Perinatologi", periode: "12/2020 s.d 06/2023", durasi: "2 Tahun 6 Bulan" },
        { instansi: "RSUD dr. Soedarso Pontianak", ruangan: "Kamar Bersalin (VK Sentral)", periode: "07/2023 s.d Sekarang", durasi: "3 Tahun 3 Bulan" },
        { instansi: "Puskesmas Siantan Hilir", ruangan: "Pelayanan KIA / KB", periode: "01/2016 s.d 11/2020", durasi: "4 Tahun 11 Bulan" }
      ],
      pelatihan: [
        { jenis: "Pelatihan Asuhan Persalinan Normal (APN) & Resusitasi Neonatus", penyelenggara: "JNPK-KR / P2KS Kalbar", tahun: "2022", masaBerlaku: "Aktif s.d 15/10/2026" },
        { jenis: "Midwifery Update (MU) Standar IBI", penyelenggara: "Pengurus Daerah IBI Kalimantan Barat", tahun: "2024", masaBerlaku: "Aktif s.d 2029" },
        { jenis: "Pelatihan Penanganan Kegawatdaruratan Maternal & Neonatal (PONEK)", penyelenggara: "RSUP Dr. Sardjito / Kemenkes", tahun: "2023", masaBerlaku: "Seumur Hidup / Re-sertifikasi" },
        { jenis: "Workshop USG Dasar Obstetri Terbatas Bidan", penyelenggara: "Komite Keperawatan & POGI Kalbar", tahun: "2024", masaBerlaku: "Internal RS" }
      ],
      pernyataanKota: "Pontianak",
      pernyataanTahun: "2026"
    }
  },

  // Preset Format Baku Buku Catatan Kinerja Klinis Harian (Logbook) (2 Halaman RSUD dr. Soedarso)
  sampleLogbook: {
    perawat: {
      nama: "",
      nip: "199204152019031004",
      jenjang: "Perawat Klinis III (PK III)",
      unit: "Ruang Rawat Inap",
      periode: "Januari 2025 s.d Desember 2025 (1 Tahun Terakhir)",
      items: [
        { tgl: "12/01/2025", rm: "RM: 482910", tindakan: "Melakukan pengkajian awal keperawatan rawat inap", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "15/01/2025", rm: "RM: 482955", tindakan: "Memasang jalur intravena (infus) & pengambilan sampel darah", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "20/02/2025", rm: "RM: 483102", tindakan: "Melakukan perekaman dan interpretasi awal Elektrokardiogram (EKG)", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "04/03/2025", rm: "RM: 483520", tindakan: "Melakukan perawatan luka bedah/kotor tingkat sedang", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "18/04/2025", rm: "RM: 484012", tindakan: "Pemberian obat high-alert melalui syringer pump / infus pump", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "02/06/2025", rm: "RM: 484890", tindakan: "Melakukan resusitasi jantung paru (RJP) dasar / bantuan hidup dasar", mandiri: false, supervisi: true, paraf: "", catatan: "" },
        { tgl: "14/07/2025", rm: "RM: 485412", tindakan: "Melakukan suctioning pada pasien dengan penurunan kesadaran", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "22/08/2025", rm: "RM: 486021", tindakan: "Memasang kateter urine menetap dengan prinsip steril", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "10/09/2025", rm: "RM: 486780", tindakan: "Melakukan dokumentasi asuhan keperawatan berbasis 3S (SDKI/SLKI/SIKI)", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "25/11/2025", rm: "Ref: Logbook Ruangan", tindakan: "Diskusi klinis / Preseptorship harian bersama mentor ruangan", mandiri: true, supervisi: false, paraf: "", catatan: "" }
      ],
      kaRuNama: "Ns. Yohanes Rindo Ari Wijoyo, S.Kep",
      kaRuNip: "198506122010011011",
      kaRuRuangan: "Ruang Rawat Inap",
      kota: "Pontianak",
      tanggal: "21 Oktober",
      tahun: "2026"
    },
    bidan: {
      nama: "",
      nip: "199408222020122006",
      jenjang: "Bidan Klinis III (BK III)",
      unit: "Ruang Bersalin (VK Sentral) / Maternitas",
      periode: "Januari 2025 s.d Desember 2025 (1 Tahun Terakhir)",
      items: [
        { tgl: "08/01/2025", rm: "RM: 510201", tindakan: "Melakukan pengkajian awal kebidanan pada ibu inpartu kala I", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "14/02/2025", rm: "RM: 510255", tindakan: "Memantau kemajuan persalinan dengan lembar partograf WHO", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "20/03/2025", rm: "RM: 510312", tindakan: "Pertolongan persalinan fisiologis normal (APN) 60 langkah", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "05/04/2025", rm: "RM: 510340", tindakan: "Melakukan manajemen aktif kala III persalinan (MAK III)", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "19/05/2025", rm: "RM: 510410", tindakan: "Penjahitan luka robekan jalan lahir / perineum derajat I & II", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "12/06/2025", rm: "RM: 510488", tindakan: "Asuhan bayi baru lahir normal & inisiasi menyusu dini (IMD)", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "28/07/2025", rm: "RM: 510530", tindakan: "Tata laksana awal kegawatdaruratan perdarahan pasca salin (HPP)", mandiri: false, supervisi: true, paraf: "", catatan: "" },
        { tgl: "15/08/2025", rm: "RM: 510599", tindakan: "Resusitasi asfiksia pada bayi baru lahir (ventilasi tekanan positif)", mandiri: false, supervisi: true, paraf: "", catatan: "" },
        { tgl: "10/10/2025", rm: "RM: 510670", tindakan: "Pemberian konseling & pemasangan alat kontrasepsi pasca persalinan", mandiri: true, supervisi: false, paraf: "", catatan: "" },
        { tgl: "18/11/2025", rm: "Ref: VK Sentral", tindakan: "Dokumentasi asuhan kebidanan metode SOAP terintegrasi", mandiri: true, supervisi: false, paraf: "", catatan: "" }
      ],
      kaRuNama: "Bdn. Ely Lidiawati, S.Tr.Keb",
      kaRuNip: "198804202012122004",
      kaRuRuangan: "Kamar Bersalin (VK Sentral)",
      kota: "Pontianak",
      tanggal: "21 Oktober",
      tahun: "2026"
    }
  },

  // Preset Format Baku Formulir Verifikasi Sumber Asli (Primary Source Verification - PSV) Dokumen Klinis (2 Halaman RSUD dr. Soedarso)
  samplePsv: {
    nama: "",
    nip: "199204152019031004",
    pendidikan: "S1 Keperawatan & Profesi Ners (Universitas Tanjungpura)",
    unit: "Ruang Rawat Inap",
    ijazahInstitusi: "Universitas Tanjungpura Pontianak",
    ijazahMetode: "online",
    ijazahHasil: "",
    ijazahNomor: "1401/UNTAN/NERS/2018",
    ijazahTahun: "2018",
    strInstitusi: "Majelis Tenaga Kesehatan / KTKI / KKI Kemenkes RI",
    strMetode: "qr_scan",
    strHasil: "",
    strNomor: "140152123-2893812",
    strBerlaku: "17 Agustus 2028",
    sippInstitusi: "Dinas Kesehatan / DPMPTSP Asal",
    sippMetode: "sicantik",
    sippHasil: "",
    sippNomor: "503/412/Dinkes-PP/SIPP/2023",
    sippBerlaku: "17 Agustus 2028",
    pelatihanInstitusi: "Pusdiklat Kemenkes / Organisasi Profesi (PPNI)",
    pelatihanMetode: "barcode",
    pelatihanHasil: "",
    pelatihanNama: "Basic Trauma Cardiac Life Support (BTCLS) & KMB Terpadu",
    pelatihanTanggal: "14 - 18 Mei 2024",
    buktiPddikti: false,
    buktiStr: false,
    buktiSipp: false,
    buktiPelatihan: false,
    kesimpulan: "",
    verifikatorNama: "",
    verifikatorNip: "",
    tanggalPsv: "__________________ 2026",
    ketuaSubkomiteNama: "Ns. Yohanes Rindo Ari Wijoyo, S.Kep",
    ketuaSubkomiteNip: "198506122010011012"
  },

  // Data Master Usulan Permohonan Kredensialing (Riwayat Usulan & Pengawasan Pimpinan)
  credentialApplications: [
    {
      id: "KRED-2026-001",
      nomorRegistrasi: "KRED/RSUD-DS/2026/0104",
      tanggalPengajuan: "21 Oktober 2026, 09:15 WIB",
      nama: "",
      nip: "199204152019031004",
      unit: "Ruang Rawat Inap",
      jenjang: "PK III",
      jenisPermohonan: "Re-Kredensial Berkala",
      areaKlinis: "kmb_bedah_pk3",
      areaName: "Keperawatan Bedah Dewasa Lanjut (PK III)",
      strNumber: "140152123-2893812",
      strExpiry: "2028-08-17",
      sippNumber: "503/412/Dinkes-PP/SIPP/2023",
      pendidikan: "S1 Keperawatan & Profesi Ners (Universitas Tanjungpura)",
      status: "Menunggu Verifikasi Subkomite",
      totalTindakan: 40,
      dokumen: { cv: true, logbook: true, surat: true, rkk: true, psv: true, berkas8: true },
      psvChecklist: { pddikti: false, strBsre: false, sipp: false, pelatihan: false },
      verifikator: {
        nama: "",
        nip: "",
        tanggal: "",
        catatan: "",
        status: "Belum Diverifikasi"
      },
      mitraBestari: {
        nama: "Tim Mitra Bestari Subkomite Kredensial",
        tanggal: "",
        rekomendasi: "Belum Ditelaah",
        catatan: ""
      },
      pengawasanPimpinan: {
        statusReview: "Dalam Pemantauan",
        catatanKetua: "",
        catatanSekretaris: "Berkas lengkap terunggah di Langkah 6. Disposisikan ke Tim Subkomite Kredensial untuk verifikasi sumber primer (PSV).",
        waktuMonitoring: "21 Oktober 2026, 09:30 WIB"
      },
      timeline: [
        { waktu: "21 Oktober 2026, 09:15 WIB", user: " (Pengusul)", aksi: "Mengajukan Permohonan Kredensialing & Mengunggah 8 Berkas Persyaratan Lengkap (Tahap 6 Selesai)" },
        { waktu: "21 Oktober 2026, 09:30 WIB", user: "Ns. Rusmulyadi, S.Kep., MARS (Sekretaris Komite)", aksi: "Monitoring Pengawasan Pimpinan: Berkas masuk tercatat di sistem (Notifikasi terkirim ke email komite & sekretaris)" }
      ]
    },
    {
      id: "KRED-2026-002",
      nomorRegistrasi: "KRED/RSUD-DS/2026/0098",
      tanggalPengajuan: "20 Oktober 2026, 14:00 WIB",
      nama: "Bdn. Siti Rahmawati, S.Tr.Keb",
      nip: "199103112014022003",
      unit: "Ruang Bersalin (VK) & Maternal",
      jenjang: "PMB",
      jenisPermohonan: "Rekredensialing / Kenaikan Jenjang",
      areaKlinis: "pmb_kebidanan",
      areaName: "Pelayanan Kebidanan Komprehensif (Bidan Klinis)",
      strNumber: "140262114-4902183",
      strExpiry: "2029-03-11",
      sippNumber: "503/218/Dinkes-PP/SIPB/2024",
      pendidikan: "D-IV Kebidanan & Profesi Bidan (Poltekkes Pontianak)",
      status: "Proses Telaah Mitra Bestari",
      totalTindakan: 25,
      dokumen: { cv: true, logbook: true, surat: true, rkk: true, psv: true, berkas8: true },
      psvChecklist: { pddikti: true, strBsre: true, sipp: true, pelatihan: true },
      verifikator: {
        nama: "Ns. Yohanes Rindo Ari Wijoyo, S.Kep",
        nip: "198506122010011012",
        tanggal: "20 Oktober 2026",
        catatan: "Seluruh berkas persyaratan dan dokumen sumber primer (PSV) telah terverifikasi sah. STR aktif BSrE sahih, SIPP SiCantik berlaku, logbook 10 tindakan telah disahkan Ka.Ru. Berkas siap ditelaah Mitra Bestari Kebidanan.",
        status: "Terverifikasi Memenuhi Syarat"
      },
      mitraBestari: {
        nama: "Bdn. Hj. Maryati, S.ST, M.Kes",
        tanggal: "20 Oktober 2026",
        rekomendasi: "Disetujui Penuh",
        catatan: "Seluruh kewenangan klinis PMB yang diajukan sesuai dengan Buku Putih Kebidanan 2026 dan portofolio kompetensi asuhan maternal."
      },
      pengawasanPimpinan: {
        statusReview: "Proses Asesmen Klinis",
        catatanKetua: "Telaah berjalan sesuai prosedur akreditasi KARS STARKES.",
        catatanSekretaris: "Mitra Bestari telah menerima disposisi dan sedang menyelesaikan penilaian rincian kewenangan klinis.",
        waktuMonitoring: "20 Oktober 2026, 16:15 WIB"
      },
      timeline: [
        { waktu: "20 Oktober 2026, 14:00 WIB", user: "Bdn. Siti Rahmawati (Pengusul)", aksi: "Mengajukan Permohonan Kenaikan Jenjang Klinis" },
        { waktu: "20 Oktober 2026, 15:30 WIB", user: "Ns. Yohanes Rindo Ari Wijoyo (Ketua Subkomite Kredensial)", aksi: "Melakukan Verifikasi Berkas & Pemeriksaan Sumber Asli (PSV) - Status Sahih" },
        { waktu: "20 Oktober 2026, 16:15 WIB", user: "Ns. Rusmulyadi (Sekretaris Komite)", aksi: "Monitoring Pengawasan: Menyetujui Disposisi Penelaahan ke Mitra Bestari" }
      ]
    },
    {
      id: "KRED-2026-003",
      nomorRegistrasi: "KRED/RSUD-DS/2026/0087",
      tanggalPengajuan: "19 Oktober 2026, 10:30 WIB",
      nama: "Ns. Bambang Prasetyo, S.Kep",
      nip: "198509202008011007",
      unit: "ICU Sentral (Intensive Care Unit)",
      jenjang: "PK IV",
      jenisPermohonan: "Re-Kredensial Berkala",
      areaKlinis: "kmb_intensif_pk4",
      areaName: "Keperawatan Intensif Care / ICU Lanjut (PK IV)",
      strNumber: "140151108-1928374",
      strExpiry: "2027-09-20",
      sippNumber: "503/890/Dinkes-PP/SIPP/2023",
      pendidikan: "S1 Keperawatan & Ners Spesialis (Universitas Indonesia)",
      status: "Menunggu Pengesahan Pimpinan",
      totalTindakan: 40,
      dokumen: { cv: true, logbook: true, surat: true, rkk: true, psv: true, berkas8: true },
      psvChecklist: { pddikti: true, strBsre: true, sipp: true, pelatihan: true },
      verifikator: {
        nama: "Tri Herda Permana Sari, A.Md.Kep",
        nip: "198801122011012004",
        tanggal: "19 Oktober 2026",
        catatan: "Dokumen administrasi dan sertifikat ICU KARS lengkap dan terakreditasi.",
        status: "Terverifikasi Memenuhi Syarat"
      },
      mitraBestari: {
        nama: "Ns. Muhammad Ridwan, M.Kep",
        tanggal: "19 Oktober 2026",
        rekomendasi: "Disetujui Penuh",
        catatan: "Rekomendasi Kewenangan Klinis PK IV Intensive Care: 38 Mandiri, 2 Supervisi tindakan advance."
      },
      pengawasanPimpinan: {
        statusReview: "Menunggu Tanda Tangan Rekomendasi Ketua Komite",
        catatanKetua: "Telah ditelaah. Rekomendasi penerbitan SPK/RKK memenuhi standar PMK 49/2013.",
        catatanSekretaris: "Draf berkas rekomendasi penugasan klinis telah disiapkan untuk diteruskan ke Direktur Rumah Sakit.",
        waktuMonitoring: "19 Oktober 2026, 17:00 WIB"
      },
      timeline: [
        { waktu: "19 Oktober 2026, 10:30 WIB", user: "Ns. Bambang Prasetyo (Pengusul)", aksi: "Mengajukan Permohonan Re-Kredensialing ICU PK IV" },
        { waktu: "19 Oktober 2026, 13:45 WIB", user: "Tri Herda Permana Sari (Anggota Subkomite Kredensial)", aksi: "Verifikasi Berkas & Checklist PSV - Lengkap Sahih" },
        { waktu: "19 Oktober 2026, 15:30 WIB", user: "Ns. Yohanes Rindo Ari Wijoyo (Ketua Subkomite Kredensial)", aksi: "Menerbitkan Hasil Rekomendasi Subkomite ke Pimpinan Komite" },
        { waktu: "19 Oktober 2026, 17:00 WIB", user: "M. Separia Russanto (Ketua Komite Keperawatan)", aksi: "Pemantauan & Review Akhir Berkas: Siap Diteruskan ke Direktur" }
      ]
    }
  ],

  // Konfigurasi Notifikasi Administrasi Resmi (Email Komite & Sekretaris)
  administrativeNotification: {
    enabled: true,
    recipients: [
      { name: "Komite Keperawatan RSUD dr. Soedarso", email: "komitekeperawatanrsds2023@gmail.com", role: "Pimpinan & Sekretariat" },
      { name: "Ns. Rusmulyadi, S.Kep., MARS", email: "komitekeperawatanrsds2023@gmail.com", role: "Sekretaris Komite Keperawatan" }
    ],
    primaryEmails: ["komitekeperawatanrsds2023@gmail.com"],
    events: [
      "Pengajuan Formulir Surat Permohonan Kredensial",
      "Pendaftaran Asesmen Mandiri RKK",
      "Unggah Berkas Portofolio Kredensial",
      "Laporan & Konsultasi Etika / Disiplin Profesi",
      "Rekomendasi SPK & RKK Mitra Bestari"
    ]
  },

  // Data Akun Pengusul Mandiri (Tenaga Keperawatan & Kebidanan) yang Terdaftar di Sistem Kredensialing
  // Format: NIP sebagai username, namaSandi = nama depan + tahun lahir (misal: hendra1992) → dapat diganti mandiri
  // badgeType: "Pengusul" untuk akses pengajuan + tracking berkas sendiri

  // Metadata & Master Staf Ruang Kakap (Ruang Rawat Inap Penyakit Dalam - Operasional November 2026)
  // Sesuai Dokumen Jadwal Dinas Resmi Disahkan Kepala Ruang & Ketua Tim Kerja Rawat Inap
  ruangKakapMeta: {
    namaRuangan: "Ruang Kakap",
    subName: "Ruang Rawat Inap Penyakit Dalam (Operasional November 2026)",
    totalStaff: 25,
    kaRu: {
      name: "Ns. RUSMULYADI, S.Kep.,MARS",
      nip: "198212282003121005",
      gol: "III/d",
      jabatan: "Kepala Ruangan (KaRu)"
    },
    kaTim1: {
      name: "TRI HERDA PERMANASARI, A.Md.Kep",
      nip: "198502152010012013",
      gol: "III/d",
      jabatan: "KaTim I"
    },
    kaTim2: {
      name: "WARISYA MIFTA AMANDA, S.Kep.,Ns",
      nip: "199608282023212013",
      gol: "X",
      jabatan: "KaTim II"
    },
    mengetahui: {
      name: "Hj. Ns. MASJANIFAH, S.Kep.",
      nip: "196706061987032003",
      jabatan: "Ketua Tim Kerja Rawat Inap Bidang Keperawatan dan Kebidanan"
    },
    periodeJadwal: "November 2026",
    lokasi: "Gedung Rawat Inap Penyakit Dalam RSUD dr. Soedarso Pontianak"
  },

  ruangKakapStaff: [
    {
        "no": 1,
        "name": "Ns. RUSMULYADI, S.Kep.,MARS",
        "nip": "198212282003121005",
        "cleanNip": "198212282003121005",
        "gol": "III/d",
        "jabatan": "Kepala Ruangan (KaRu)",
        "kategori": "KaRu",
        "jenjang": "PK IV",
        "username": "rusmulyadi.kakap",
        "profesi": "Perawat",
        "strNumber": "140152103-1982122",
        "strExpiry": "2029-12-28",
        "spkNumber": "800/1001/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-01-10",
        "spkExpiry": "2027-01-10",
        "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 2,
        "name": "TRI HERDA PERMANASARI, A.Md.Kep",
        "nip": "198502152010012013",
        "cleanNip": "198502152010012013",
        "gol": "III/d",
        "jabatan": "KaTim I",
        "kategori": "KaTim",
        "jenjang": "PK III",
        "username": "tri.herda.kakap",
        "profesi": "Perawat",
        "strNumber": "140152110-1985021",
        "strExpiry": "2028-02-15",
        "spkNumber": "800/1002/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-01-10",
        "spkExpiry": "2027-01-10",
        "avatar": "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 3,
        "name": "WARISYA MIFTA AMANDA, S.Kep.,Ns",
        "nip": "199608282023212013",
        "cleanNip": "199608282023212013",
        "gol": "X",
        "jabatan": "KaTim II",
        "kategori": "KaTim",
        "jenjang": "PK II",
        "username": "warisya.mifta",
        "profesi": "Perawat",
        "strNumber": "140152123-1996082",
        "strExpiry": "2028-08-28",
        "spkNumber": "800/1003/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-02-15",
        "spkExpiry": "2027-02-15",
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 4,
        "name": "RESTU UTAMI ,A.Md,Kep",
        "nip": "199210102014022001",
        "cleanNip": "199210102014022001",
        "gol": "III/b",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK II",
        "username": "restu.utami",
        "profesi": "Perawat",
        "strNumber": "140152114-1992101",
        "strExpiry": "2027-10-10",
        "spkNumber": "800/1004/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-03-01",
        "spkExpiry": "2027-03-01",
        "avatar": "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 5,
        "name": "AHMAD MUNIR ZUBAIRI, S.Kep.,Ns",
        "nip": "199208292023211005",
        "cleanNip": "199208292023211005",
        "gol": "X",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK II",
        "username": "ahmad.munir",
        "profesi": "Perawat",
        "strNumber": "140151123-1992082",
        "strExpiry": "2028-08-29",
        "spkNumber": "800/1005/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-03-01",
        "spkExpiry": "2027-03-01",
        "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 6,
        "name": "DIPO WIBISONO, S.Kep.,Ns",
        "nip": "199007022023211003",
        "cleanNip": "199007022023211003",
        "gol": "X",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK II",
        "username": "dipo.wibisono",
        "profesi": "Perawat",
        "strNumber": "140151123-1990070",
        "strExpiry": "2028-07-02",
        "spkNumber": "800/1006/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-03-01",
        "spkExpiry": "2027-03-01",
        "avatar": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 7,
        "name": "KHAIRUNNISA, S.Kep.,Ns",
        "nip": "199503282023212014",
        "cleanNip": "199503282023212014",
        "gol": "X",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK II",
        "username": "khairunnisa",
        "profesi": "Perawat",
        "strNumber": "140152123-1995032",
        "strExpiry": "2028-03-28",
        "spkNumber": "800/1007/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-03-01",
        "spkExpiry": "2027-03-01",
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 8,
        "name": "RILLIS ARUMY SUSANTO, S.Kep.,Ns",
        "nip": "199107162023212012",
        "cleanNip": "199107162023212012",
        "gol": "X",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK II",
        "username": "rillis.arumy",
        "profesi": "Perawat",
        "strNumber": "140152123-1991071",
        "strExpiry": "2028-07-16",
        "spkNumber": "800/1008/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-03-01",
        "spkExpiry": "2027-03-01",
        "avatar": "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 9,
        "name": "A. HARKEL, A.Md.Kep",
        "nip": "199007102024211018",
        "cleanNip": "199007102024211018",
        "gol": "VII",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "a.harkel",
        "profesi": "Perawat",
        "strNumber": "140151124-1990071",
        "strExpiry": "2029-07-10",
        "spkNumber": "800/1009/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-04-10",
        "spkExpiry": "2027-04-10",
        "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 10,
        "name": "BERNADO, A.Md.Kep",
        "nip": "199503122023211003",
        "cleanNip": "199503122023211003",
        "gol": "VII",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "bernado",
        "profesi": "Perawat",
        "strNumber": "140151123-1995031",
        "strExpiry": "2028-03-12",
        "spkNumber": "800/1010/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-04-10",
        "spkExpiry": "2027-04-10",
        "avatar": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 11,
        "name": "RUQAYYAH, A.Md.Kep",
        "nip": "198610072025212001",
        "cleanNip": "198610072025212001",
        "gol": "VII",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "ruqayyah",
        "profesi": "Perawat",
        "strNumber": "140152125-1986100",
        "strExpiry": "2030-10-07",
        "spkNumber": "800/1011/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-04-10",
        "spkExpiry": "2027-04-10",
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 12,
        "name": "AIRIE ESTU PRASETIYO, S.Kep.,Ns",
        "nip": "BLUD-KK-012",
        "cleanNip": "BLUDKK012",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "airie.estu",
        "profesi": "Perawat",
        "strNumber": "140151122-9901012",
        "strExpiry": "2028-11-20",
        "spkNumber": "800/1012/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 13,
        "name": "BELLA ADHITYA, S.Tr.Kep.,Ns",
        "nip": "BLUD-KK-013",
        "cleanNip": "BLUDKK013",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "bella.adhitya",
        "profesi": "Perawat",
        "strNumber": "140152123-9901013",
        "strExpiry": "2029-05-15",
        "spkNumber": "800/1013/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 14,
        "name": "DZAKIYAH, A.Md.Kep.",
        "nip": "BLUD-KK-014",
        "cleanNip": "BLUDKK014",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "dzakiyah",
        "profesi": "Perawat",
        "strNumber": "140152123-9901014",
        "strExpiry": "2028-08-10",
        "spkNumber": "800/1014/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 15,
        "name": "FATIMAH, S.Kep.,Ns",
        "nip": "BLUD-KK-015",
        "cleanNip": "BLUDKK015",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "fatimah",
        "profesi": "Perawat",
        "strNumber": "140152122-9901015",
        "strExpiry": "2027-12-05",
        "spkNumber": "800/1015/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 16,
        "name": "FITRI RETNO WIDIHASTUTI, A.Md.Kep.",
        "nip": "BLUD-KK-016",
        "cleanNip": "BLUDKK016",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "fitri.retno",
        "profesi": "Perawat",
        "strNumber": "140152123-9901016",
        "strExpiry": "2028-09-18",
        "spkNumber": "800/1016/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 17,
        "name": "IGNASIUS, S.Kep.,Ns",
        "nip": "BLUD-KK-017",
        "cleanNip": "BLUDKK017",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "ignasius",
        "profesi": "Perawat",
        "strNumber": "140151122-9901017",
        "strExpiry": "2028-06-25",
        "spkNumber": "800/1017/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 18,
        "name": "LITA SAHARA, A.Md.Kep",
        "nip": "BLUD-KK-018",
        "cleanNip": "BLUDKK018",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "lita.sahara",
        "profesi": "Perawat",
        "strNumber": "140152123-9901018",
        "strExpiry": "2029-01-20",
        "spkNumber": "800/1018/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 19,
        "name": "MEGA MARDHATILLAH, A.Md.Kep",
        "nip": "BLUD-KK-019",
        "cleanNip": "BLUDKK019",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "mega.mardhatillah",
        "profesi": "Perawat",
        "strNumber": "140152123-9901019",
        "strExpiry": "2028-10-12",
        "spkNumber": "800/1019/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 20,
        "name": "MONIKA OKTAVIANI, S.Kep.,Ns",
        "nip": "BLUD-KK-020",
        "cleanNip": "BLUDKK020",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "monika.oktaviani",
        "profesi": "Perawat",
        "strNumber": "140152123-9901020",
        "strExpiry": "2029-02-14",
        "spkNumber": "800/1020/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 21,
        "name": "NENI KURNIA, S.Kep.,Ns",
        "nip": "BLUD-KK-021",
        "cleanNip": "BLUDKK021",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "neni.kurnia",
        "profesi": "Perawat",
        "strNumber": "140152122-9901021",
        "strExpiry": "2028-04-18",
        "spkNumber": "800/1021/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 22,
        "name": "NENSI ASTARINA, S.Tr.Kep.,Ns",
        "nip": "BLUD-KK-022",
        "cleanNip": "BLUDKK022",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "nensi.astarina",
        "profesi": "Perawat",
        "strNumber": "140152123-9901022",
        "strExpiry": "2029-03-30",
        "spkNumber": "800/1022/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 23,
        "name": "NUR RAHMAH TIANAWATI, A.Md.Kep",
        "nip": "BLUD-KK-023",
        "cleanNip": "BLUDKK023",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "nur.rahmah",
        "profesi": "Perawat",
        "strNumber": "140152124-9901023",
        "strExpiry": "2029-07-08",
        "spkNumber": "800/1023/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 24,
        "name": "STEPANNY RENO P., A.Md.Kep",
        "nip": "BLUD-KK-024",
        "cleanNip": "BLUDKK024",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "stepanny.reno",
        "profesi": "Perawat",
        "strNumber": "140152123-9901024",
        "strExpiry": "2028-12-01",
        "spkNumber": "800/1024/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
        "no": 25,
        "name": "YUNI HARDIYANTI, S.Kep.,Ns",
        "nip": "BLUD-KK-025",
        "cleanNip": "BLUDKK025",
        "gol": "BLUD",
        "jabatan": "Pelaksana",
        "kategori": "Pelaksana",
        "jenjang": "PK I",
        "username": "yuni.hardiyanti",
        "profesi": "Perawat",
        "strNumber": "140152123-9901025",
        "strExpiry": "2029-04-22",
        "spkNumber": "800/1025/RSUD-DS/KOM-KEP/2024",
        "spkDate": "2024-05-01",
        "spkExpiry": "2027-05-01",
        "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    }
],

  pengusulAccounts: []
};

