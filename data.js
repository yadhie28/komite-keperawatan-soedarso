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
    secretaryEmail: "yadhie28@gmail.com",
    adminNotificationEmails: ["komitekeperawatanrsds2023@gmail.com", "yadhie28@gmail.com"],
    website: "https://yadhie28.github.io/komite-keperawatan-soedarso/",
    director: "dr. Hary Agung Tjahyadi",
    directorNIP: "19710312 199903 1 005",
    nursingChief: "M. Separia Russanto, S.Kep., Ns",
    nursingSecretary: "Ns. Rusmulyadi, S.Kep., MARS",
    accreditation: "Paripurna (Bintang Lima) KARS 2023-2027"
  },

  // Metadata SK Resmi Direktur RSUD dr. Soedarso
  skInfo: {
    number: "SK/ 280801 /RSUD/2026",
    baseSK: "SK/020101/RSUD/2024",
    title: "Perubahan Kedua Lampiran Keputusan Direktur RSUD Dokter Soedarso Provinsi Kalimantan Barat Nomor SK/020101/RSUD/2024 tentang Pembentukan Komite Keperawatan Periode 2024 - 2027",
    date: "28 Agustus 2026",
    place: "Pontianak",
    director: "HARY AGUNG TJAHYADI",
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

  // Registry Tenaga Keperawatan & Kebidanan RSUD dr. Soedarso Pontianak
  nurses: [
    {
      id: "NURSE-001",
      name: "Ns. Desi Ratnasari, S.Kep",
      nip: "19880415 201001 2 005",
      strNumber: "140152123-3891021",
      strExpiry: "2028-04-15",
      unit: "Ruang Enggang Gading 2 (Penyakit Dalam)",
      pkLevel: "PK III",
      profession: "Perawat Klinis",
      spkNumber: "800/1422/RSUD-DS/KOM-KEP/2024",
      spkDate: "2024-02-10",
      spkExpiry: "2027-02-10",
      credentialStatus: "Disetujui",
      peerReviewer: "Ns. Hendra Wijaya, Sp.Kep.MB",
      approvedCompetencies: 10,
      totalCompetencies: 10,
      avatar: "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-002",
      name: "Ns. Bambang Prasetyo, S.Kep",
      nip: "19850920 200801 1 007",
      strNumber: "140151108-1928374",
      strExpiry: "2027-09-20",
      unit: "ICU Sentral (Intensive Care Unit)",
      pkLevel: "PK IV",
      profession: "Perawat Klinis",
      spkNumber: "800/0890/RSUD-DS/KOM-KEP/2023",
      spkDate: "2023-08-15",
      spkExpiry: "2026-08-15",
      credentialStatus: "Mendekati Kadaluarsa",
      peerReviewer: "Ns. Muhammad Ridwan, M.Kep",
      approvedCompetencies: 6,
      totalCompetencies: 6,
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-003",
      name: "Bdn. Siti Rahmawati, S.Tr.Keb",
      nip: "19910311 201402 2 003",
      strNumber: "140262114-4902183",
      strExpiry: "2029-03-11",
      unit: "Ruang Bersalin (VK) & Maternal",
      pkLevel: "PMB",
      profession: "Bidan Klinis",
      spkNumber: "800/2105/RSUD-DS/KOM-KEP/2024",
      spkDate: "2024-05-18",
      spkExpiry: "2027-05-18",
      credentialStatus: "Disetujui",
      peerReviewer: "Bdn. Hj. Maryati, S.ST, M.Kes",
      approvedCompetencies: 6,
      totalCompetencies: 6,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-004",
      name: "Ns. Kurniawan Saputra, S.Kep",
      nip: "19941103 201903 1 006",
      strNumber: "140151119-9281726",
      strExpiry: "2029-11-03",
      unit: "Instalasi Gawat Darurat (IGD Bedah)",
      pkLevel: "PK II",
      profession: "Perawat Klinis",
      spkNumber: "800/1802/RSUD-DS/KOM-KEP/2024",
      spkDate: "2024-04-12",
      spkExpiry: "2027-04-12",
      credentialStatus: "Disetujui",
      peerReviewer: "Ns. Agustinus Hendro, S.Kep",
      approvedCompetencies: 9,
      totalCompetencies: 10,
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-005",
      name: "Ns. Eka Yuliana, S.Kep, Sp.Kep.Onk",
      nip: "19830708 200604 2 002",
      strNumber: "140152106-1120934",
      strExpiry: "2028-07-08",
      unit: "Klinik Onkologi & Kemoterapi Terpadu",
      pkLevel: "PK IV",
      profession: "Perawat Spesialis",
      spkNumber: "800/0312/RSUD-DS/KOM-KEP/2025",
      spkDate: "2025-01-20",
      spkExpiry: "2028-01-20",
      credentialStatus: "Disetujui",
      peerReviewer: "Ns. Ratna Dewi Kartika, Sp.KMB",
      approvedCompetencies: 6,
      totalCompetencies: 6,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-006",
      name: "Ns. Rizki Firmansyah, S.Kep",
      nip: "19970622 202203 1 002",
      strNumber: "140151122-8374621",
      strExpiry: "2027-06-22",
      unit: "Ruang Enggang Gading 2 (Penyakit Dalam)",
      pkLevel: "PK I",
      profession: "Perawat Klinis",
      spkNumber: "800/3104/RSUD-DS/KOM-KEP/2025",
      spkDate: "2025-02-14",
      spkExpiry: "2028-02-14",
      credentialStatus: "Disetujui",
      peerReviewer: "Ns. Desi Ratnasari, S.Kep",
      approvedCompetencies: 10,
      totalCompetencies: 10,
      avatar: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-007",
      name: "Ns. Sri Wahyuni, S.Kep",
      nip: "19930218 201704 2 004",
      strNumber: "140152117-7382910",
      strExpiry: "2028-02-18",
      unit: "Kamar Bedah Sentral (OK / IBS)",
      pkLevel: "PK III",
      profession: "Perawat Klinis",
      spkNumber: "800/1904/RSUD-DS/KOM-KEP/2023",
      spkDate: "2023-10-05",
      spkExpiry: "2026-10-05",
      credentialStatus: "Proses Review",
      peerReviewer: "Ns. Muhammad Ridwan, M.Kep",
      approvedCompetencies: 8,
      totalCompetencies: 10,
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-008",
      name: "Ns. Agus Setiawan, A.Md.Kep",
      nip: "19901205 201212 1 001",
      strNumber: "140151112-6281934",
      strExpiry: "2026-12-05",
      unit: "Ruang Cendrawasih (Bedah Orthopedi)",
      pkLevel: "PK II",
      profession: "Perawat Vokasi",
      spkNumber: "800/1098/RSUD-DS/KOM-KEP/2023",
      spkDate: "2023-09-11",
      spkExpiry: "2026-09-11",
      credentialStatus: "Menunggu Mitra Bestari",
      peerReviewer: "Ns. Hendra Wijaya, Sp.Kep.MB",
      approvedCompetencies: 7,
      totalCompetencies: 10,
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-009",
      name: "Bdn. Nur Laila, S.Tr.Keb, Bd",
      nip: "19870814 200903 2 006",
      strNumber: "140262109-1827364",
      strExpiry: "2027-08-14",
      unit: "Ruang Perinatologi & NICU",
      pkLevel: "PMB",
      profession: "Bidan Praktisi",
      spkNumber: "800/0987/RSUD-DS/KOM-KEP/2024",
      spkDate: "2024-03-01",
      spkExpiry: "2027-03-01",
      credentialStatus: "Disetujui",
      peerReviewer: "Bdn. Siti Rahmawati, S.Tr.Keb",
      approvedCompetencies: 6,
      totalCompetencies: 6,
      avatar: "https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-010",
      name: "Ns. Fajar Triadi, S.Kep",
      nip: "19960517 202012 1 003",
      strNumber: "140151120-4729182",
      strExpiry: "2026-05-17",
      unit: "Ruang Hemodialisa (HD)",
      pkLevel: "PK II",
      profession: "Perawat Klinis",
      spkNumber: "800/0411/RSUD-DS/KOM-KEP/2023",
      spkDate: "2023-04-18",
      spkExpiry: "2026-04-18",
      credentialStatus: "Mendekati Kadaluarsa",
      peerReviewer: "Ns. Ratna Dewi Kartika, Sp.KMB",
      approvedCompetencies: 9,
      totalCompetencies: 10,
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-011",
      name: "Ns. Maya Indriani, S.Kep",
      nip: "19981029 202302 2 001",
      strNumber: "140152123-9382104",
      strExpiry: "2028-10-29",
      unit: "Ruang Merak (Penyakit Dalam Non-Infeksi)",
      pkLevel: "PK I",
      profession: "Perawat Klinis",
      spkNumber: "800/4012/RSUD-DS/KOM-KEP/2025",
      spkDate: "2025-03-01",
      spkExpiry: "2028-03-01",
      credentialStatus: "Disetujui",
      peerReviewer: "Ns. Desi Ratnasari, S.Kep",
      approvedCompetencies: 10,
      totalCompetencies: 10,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "NURSE-012",
      name: "Ns. H. Dedi Sukardi, M.Kep, Sp.Kep.An",
      nip: "19780124 200212 1 002",
      strNumber: "140151102-1029384",
      strExpiry: "2028-01-24",
      unit: "Instalasi Rawat Inap Anak (PICU & Kutilang)",
      pkLevel: "PK V",
      profession: "Perawat Spesialis Anak",
      spkNumber: "800/0101/RSUD-DS/KOM-KEP/2024",
      spkDate: "2024-01-10",
      spkExpiry: "2027-01-10",
      credentialStatus: "Disetujui",
      peerReviewer: "Ns. Hendra Wijaya, Sp.Kep.MB",
      approvedCompetencies: 4,
      totalCompetencies: 4,
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
    }
  ],

  // Data Audit Mutu Klinis Keperawatan per Ruangan
  clinicalAudits: [
    {
      unit: "Ruang Enggang Gading 2",
      headNurse: "Ns. Desi Ratnasari, S.Kep",
      cpptCompliance: 98.4,
      handHygiene: 99.1,
      phlebitisFree: 99.6,
      fallPrevention: 100.0,
      cpdScore: 94.5,
      overallGrade: "A (Sangat Baik)",
      lastAuditDate: "Oktober 2026"
    },
    {
      unit: "ICU Sentral",
      headNurse: "Ns. Bambang Prasetyo, S.Kep",
      cpptCompliance: 99.2,
      handHygiene: 98.8,
      phlebitisFree: 98.9,
      fallPrevention: 99.5,
      cpdScore: 96.0,
      overallGrade: "A (Sangat Baik)",
      lastAuditDate: "Oktober 2026"
    },
    {
      unit: "Instalasi Gawat Darurat (IGD)",
      headNurse: "Ns. Kurniawan Saputra, S.Kep",
      cpptCompliance: 96.5,
      handHygiene: 97.4,
      phlebitisFree: 99.0,
      fallPrevention: 98.8,
      cpdScore: 92.0,
      overallGrade: "A (Sangat Baik)",
      lastAuditDate: "September 2026"
    },
    {
      unit: "Ruang Cendrawasih (Bedah)",
      headNurse: "Ns. Agus Setiawan, A.Md.Kep",
      cpptCompliance: 95.8,
      handHygiene: 96.9,
      phlebitisFree: 98.5,
      fallPrevention: 99.0,
      cpdScore: 90.5,
      overallGrade: "B+ (Baik)",
      lastAuditDate: "Oktober 2026"
    },
    {
      unit: "Kamar Bedah Sentral (IBS)",
      headNurse: "Ns. Sri Wahyuni, S.Kep",
      cpptCompliance: 99.5,
      handHygiene: 100.0,
      phlebitisFree: 100.0,
      fallPrevention: 100.0,
      cpdScore: 95.0,
      overallGrade: "A (Sangat Baik)",
      lastAuditDate: "Oktober 2026"
    },
    {
      unit: "Ruang Bersalin & Kebidanan (VK)",
      headNurse: "Bdn. Siti Rahmawati, S.Tr.Keb",
      cpptCompliance: 97.8,
      handHygiene: 98.5,
      phlebitisFree: 99.4,
      fallPrevention: 100.0,
      cpdScore: 93.8,
      overallGrade: "A (Sangat Baik)",
      lastAuditDate: "Oktober 2026"
    }
  ],

  // Regulasi Resmi Komite Keperawatan RSUD Dr. Soedarso
  regulations: [
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

  // Sample Ticket Pengaduan / Konsultasi Etika & Disiplin
  sampleTickets: [
    {
      ticketCode: "ETIK-2026-0812",
      date: "12 Oktober 2026",
      category: "Konsultasi Dilema Etik Klinis",
      unit: "Ruang Rawat Inap",
      status: "Selesai Ditelaah",
      responseDate: "14 Oktober 2026",
      note: "Telah diberikan rekomendasi pendampingan keluarga terkait informed consent tindakan paliatif."
    },
    {
      ticketCode: "ETIK-2026-0904",
      date: "18 Oktober 2026",
      category: "Dugaan Ketidaksesuaian Asuhan",
      unit: "Pelayanan Rawat",
      status: "Proses Investigasi Subkomite",
      responseDate: "Dalam Penanganan",
      note: "Tim Panel Mitra Bestari sedang melakukan klarifikasi berkas CPPT dan rekam medis pasien."
    }
  ],

  // Unit Kerja & Penempatan Ruang Resmi RSUD Dokter Soedarso Sesuai SK Direktur No: SK/031103/RSUD/2025 (Total 704 Tempat Tidur)
  hospitalUnits: [
    // A. INSTALASI RAWAT INAP A
    "Singkut Buluh",
    "PPT",
    "A (Anak)",
    "B (Perinatologi)",
    "Ruai (Syaraf)",
    "Camar (Kemoterapi)",
    "Murai (Penyakit Dalam Pria dan Wanita)",
    "Meranti",
    "Mahoni",
    "Ramin",
    "ICU",
    "HCU Umum",
    "PICU",
    "HCU Anak",
    "NICU",
    "Rawat Inap Isolasi Paru",
    "Rawat Inap Isolasi ICU",
    "Enggang Gading 1",
    "Enggang Gading 2",

    // B. INSTALASI JANTUNG TERPADU
    "Instalasi Jantung Terpadu - ICVCU",
    "Instalasi Jantung Terpadu - HCU",
    "Instalasi Jantung Terpadu - VIP",
    "Instalasi Jantung Terpadu - Kelas 1",
    "Instalasi Jantung Terpadu - Non Kelas",

    // C. RUANG TINDAKAN
    "Cendana",
    "Instalasi Gawat Darurat (IGD)",
    "IGD Kebidanan",
    "OK Sentral",
    "OK IGD",

    // D. RUANG RAWAT KHUSUS
    "Thalassemia",
    "HD Rawat Jalan",
    "HD Rawat Inap",
    "Kemoterapi (ODC)"
  ],

  // Metadata Master Ruangan Resmi Berdasarkan SK Direktur No: SK/031103/RSUD/2025
  hospitalRoomsSK: {
    nomorSK: "SK/031103/RSUD/2025",
    perubahanAtas: "SK/020106/RSUD/2025",
    judul: "Penetapan Jumlah Tempat Tidur Pada RSUD Dokter Soedarso Provinsi Kalimantan Barat Tahun 2025",
    tanggalSK: "3 November 2025",
    direktur: "Hary Agung Tjahyadi",
    totalTempatTidur: 704,
    categories: [
      {
        kode: "A",
        nama: "INSTALASI RAWAT INAP A",
        totalTT: 545,
        rooms: [
          { nama: "Singkut Buluh", tt: 13, rincian: "Utama III (1), VIP Utama IV (12)" },
          { nama: "PPT", tt: 43, rincian: "Utama III (1), Kls I (34), Kls II (8)" },
          { nama: "A (Anak)", tt: 95, rincian: "VIP Utama IV (5), Kls I (14), Non Kls (76)" },
          { nama: "B (Perinatologi)", tt: 25, rincian: "Non Kls (25)" },
          { nama: "Ruai (Syaraf)", tt: 33, rincian: "Kls III (33)" },
          { nama: "Camar (Kemoterapi)", tt: 34, rincian: "Kls III (34)" },
          { nama: "Murai (Penyakit Dalam Pria dan Wanita)", tt: 37, rincian: "Kls III (37)" },
          { nama: "Meranti", tt: 40, rincian: "Kls III (40)" },
          { nama: "Mahoni", tt: 41, rincian: "Kls III (41)" },
          { nama: "Ramin", tt: 25, rincian: "Non Kls (25)" },
          { nama: "ICU", tt: 18, rincian: "Non Kls (18)" },
          { nama: "HCU Umum", tt: 19, rincian: "Non Kls (19)" },
          { nama: "PICU", tt: 7, rincian: "Non Kls (7)" },
          { nama: "HCU Anak", tt: 6, rincian: "Non Kls (6)" },
          { nama: "NICU", tt: 9, rincian: "Non Kls (9)" },
          { nama: "Rawat Inap Isolasi Paru", tt: 38, rincian: "Kls III (38)" },
          { nama: "Rawat Inap Isolasi ICU", tt: 4, rincian: "Non Kls (4)" },
          { nama: "Enggang Gading 1", tt: 10, rincian: "Non Kls (10)" },
          { nama: "Enggang Gading 2", tt: 48, rincian: "Non Kls (48)" }
        ]
      },
      {
        kode: "B",
        nama: "INSTALASI JANTUNG TERPADU",
        totalTT: 50,
        rooms: [
          { nama: "Instalasi Jantung Terpadu - ICVCU", tt: 14, rincian: "Non Kls (14)" },
          { nama: "Instalasi Jantung Terpadu - HCU", tt: 4, rincian: "Non Kls (4)" },
          { nama: "Instalasi Jantung Terpadu - VIP", tt: 4, rincian: "VIP Utama IV (4)" },
          { nama: "Instalasi Jantung Terpadu - Kelas 1", tt: 8, rincian: "Kls I (8)" },
          { nama: "Instalasi Jantung Terpadu - Non Kelas", tt: 20, rincian: "Kls III (20)" }
        ]
      },
      {
        kode: "C",
        nama: "RUANG TINDAKAN",
        totalTT: 43,
        rooms: [
          { nama: "Cendana", tt: 16, rincian: "Non Kls (16)" },
          { nama: "Instalasi Gawat Darurat (IGD)", tt: 15, rincian: "Non Kls (15)" },
          { nama: "IGD Kebidanan", tt: 2, rincian: "Non Kls (2)" },
          { nama: "OK Sentral", tt: 8, rincian: "Non Kls (8)" },
          { nama: "OK IGD", tt: 2, rincian: "Non Kls (2)" }
        ]
      },
      {
        kode: "D",
        nama: "RUANG RAWAT KHUSUS",
        totalTT: 66,
        rooms: [
          { nama: "Thalassemia", tt: 13, rincian: "Non Kls (13)" },
          { nama: "HD Rawat Jalan", tt: 27, rincian: "Non Kls (27)" },
          { nama: "HD Rawat Inap", tt: 6, rincian: "Non Kls (6)" },
          { nama: "Kemoterapi (ODC)", tt: 20, rincian: "Non Kls (20)" }
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
      nip: "19850920 200801 1 007",
      unit: "ICU Sentral",
      pkLevel: "PK IV",
      tglPengembalian: "16 Oktober 2026",
      alasan: "Logbook asuhan intensif belum ditandatangani Kepala Ruangan ICU & Surat STR perpanjangan terbaru belum terunggah."
    }
  ],

  // Susunan Lengkap Struktur Komite Keperawatan Berdasarkan SK Direktur No. SK/ 280801 /RSUD/2026
  structureSK: [
    { no: 1, name: "M. Separia Russanto, S.Kep., Ns", role: "Ketua", group: "Pimpinan Komite", badge: "Super Admin", username: "separia", alias: "admin.komite" },
    { no: 2, name: "Ns. Rusmulyadi, S.Kep., MARS", role: "Sekretaris", group: "Pimpinan Komite", badge: "Super Admin", username: "rusmulyadi", alias: "sekretaris" },
    
    // Sub Komite Kredensial
    { no: 3, name: "Ns. Yohanes Rindo Ari Wijoyo, S.Kep", role: "Ketua Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", username: "yohanes", alias: "kredensial" },
    { no: 4, name: "Tri Herda Permana Sari, A.Md.Kep", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", username: "tri.herda" },
    { no: 5, name: "Ns. Dwinita Wulan Purnamasari, S.Kep", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", username: "dwinita" },
    { no: 6, name: "Ns. Ika Yusniarti, S.Kep", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", username: "ika.yusniarti" },
    { no: 7, name: "F. Surayniwaty, S.ST", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", username: "surayniwaty" },
    { no: 8, name: "Noveriansyah Akbar, S.Kep., Ns", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", username: "noveriansyah" },
    { no: 9, name: "Mushlihuddin, S.Kep., Ns", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", username: "mushlihuddin" },
    { no: 10, name: "Herkulanus Yunus, A.Md.Kep", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", username: "herkulanus" },
    { no: 11, name: "Bdn. Evilita Ratnawati, S.ST", role: "Anggota Sub Komite Kredensial", group: "Sub Komite Kredensial", badge: "Admin Kredensial", username: "evilita" },

    // Sub Komite Etika dan Disiplin
    { no: 12, name: "Alfonsus Agus Ainaro Simamora, S.Kep., Ns., MH", role: "Ketua Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", username: "alfonsus", alias: "etik" },
    { no: 13, name: "Ns. Gunawan, S.Tr.Kep., SKM", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", username: "gunawan" },
    { no: 14, name: "Ns. Marianto, S.Kep", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", username: "marianto" },
    { no: 15, name: "Andri Muzayyin, S.Kep., Ns", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", username: "andri.muzayyin" },
    { no: 16, name: "Diana Rachmawati, S.ST", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", username: "diana" },
    { no: 17, name: "Nur'aini Ratnasari, S.T.Keb", role: "Anggota Sub Komite Etika dan Disiplin", group: "Sub Komite Etika dan Disiplin", badge: "Admin Etik", username: "nuraini" },

    // Sub Komite Mutu Keperawatan
    { no: 18, name: "Laila Istiqomah, S.Kep., Ns", role: "Ketua Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", username: "laila", alias: "mutu" },
    { no: 19, name: "Bdn. Ely Lidiawati, S.Tr.Keb", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", username: "ely.lidiawati" },
    { no: 20, name: "Rudy Hartono, S.Kep., Ns", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", username: "rudy.hartono" },
    { no: 21, name: "Stevanus Darmo, A.Md.Kep., SKM", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", username: "stevanus" },
    { no: 22, name: "Ernia Wati, S.Kep., Ns", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", username: "ernia.wati" },
    { no: 23, name: "Munazzil, A.Md.Kep", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", username: "munazzil" },
    { no: 24, name: "Odi Pratama Setiadi, S.Kep., Ns", role: "Anggota Sub Komite Mutu Keperawatan", group: "Sub Komite Mutu Keperawatan", badge: "Admin Mutu", username: "odi.pratama" }
  ],

  // 24 Akun Admin Pengurus Resmi Komite Keperawatan Sesuai SK Direktur
  adminUsers: [
    // 1. Pimpinan Komite (Super Admin)
    {
      username: "separia",
      alias: "admin.komite",
      altAlias: "ketua",
      password: "soedarso2026",
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
      password: "soedarso2026",
      name: "Ns. Rusmulyadi, S.Kep., MARS",
      role: "Sekretaris Komite Keperawatan",
      email: "yadhie28@gmail.com",
      badge: "Super Admin",
      group: "Pimpinan Komite",
      access: ["kredensial", "mutu", "etik", "regulasi", "approval", "administrasi"]
    },

    // 2. Sub Komite Kredensial
    {
      username: "yohanes",
      alias: "kredensial",
      password: "soedarso2026",
      name: "Ns. Yohanes Rindo Ari Wijoyo, S.Kep",
      role: "Ketua Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial", "approval"]
    },
    {
      username: "tri.herda",
      password: "soedarso2026",
      name: "Tri Herda Permana Sari, A.Md.Kep",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "dwinita",
      password: "soedarso2026",
      name: "Ns. Dwinita Wulan Purnamasari, S.Kep",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "ika.yusniarti",
      password: "soedarso2026",
      name: "Ns. Ika Yusniarti, S.Kep",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "surayniwaty",
      password: "soedarso2026",
      name: "F. Surayniwaty, S.ST",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "noveriansyah",
      password: "soedarso2026",
      name: "Noveriansyah Akbar, S.Kep., Ns",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "mushlihuddin",
      password: "soedarso2026",
      name: "Mushlihuddin, S.Kep., Ns",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "herkulanus",
      password: "soedarso2026",
      name: "Herkulanus Yunus, A.Md.Kep",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },
    {
      username: "evilita",
      password: "soedarso2026",
      name: "Bdn. Evilita Ratnawati, S.ST",
      role: "Anggota Sub Komite Kredensial",
      badge: "Admin Kredensial",
      group: "Sub Komite Kredensial",
      access: ["kredensial"]
    },

    // 3. Sub Komite Etika dan Disiplin
    {
      username: "alfonsus",
      alias: "etik",
      password: "soedarso2026",
      name: "Alfonsus Agus Ainaro Simamora, S.Kep., Ns., MH",
      role: "Ketua Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "gunawan",
      password: "soedarso2026",
      name: "Ns. Gunawan, S.Tr.Kep., SKM",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "marianto",
      password: "soedarso2026",
      name: "Ns. Marianto, S.Kep",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "andri.muzayyin",
      password: "soedarso2026",
      name: "Andri Muzayyin, S.Kep., Ns",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "diana",
      password: "soedarso2026",
      name: "Diana Rachmawati, S.ST",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },
    {
      username: "nuraini",
      password: "soedarso2026",
      name: "Nur'aini Ratnasari, S.T.Keb",
      role: "Anggota Sub Komite Etika dan Disiplin",
      badge: "Admin Etik",
      group: "Sub Komite Etika dan Disiplin",
      access: ["etik"]
    },

    // 4. Sub Komite Mutu Keperawatan
    {
      username: "laila",
      alias: "mutu",
      password: "soedarso2026",
      name: "Laila Istiqomah, S.Kep., Ns",
      role: "Ketua Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "ely.lidiawati",
      password: "soedarso2026",
      name: "Bdn. Ely Lidiawati, S.Tr.Keb",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "rudy.hartono",
      password: "soedarso2026",
      name: "Rudy Hartono, S.Kep., Ns",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "stevanus",
      password: "soedarso2026",
      name: "Stevanus Darmo, A.Md.Kep., SKM",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "ernia.wati",
      password: "soedarso2026",
      name: "Ernia Wati, S.Kep., Ns",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "munazzil",
      password: "soedarso2026",
      name: "Munazzil, A.Md.Kep",
      role: "Anggota Sub Komite Mutu Keperawatan",
      badge: "Admin Mutu",
      group: "Sub Komite Mutu Keperawatan",
      access: ["mutu"]
    },
    {
      username: "odi.pratama",
      password: "soedarso2026",
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
      nama: "Ns. Hendra Kurniawan, S.Kep",
      nip: "19920415 201903 1 004",
      ttl: "Pontianak, 15 April 1992",
      jabatan: "Perawat Pelaksana / Ketua Tim",
      unit: "Enggang Gading 2",
      pkSaatIni: "PK II",
      pkDiusulkan: "PK III",
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
        { instansi: "RSUD dr. Soedarso Pontianak", ruangan: "Ruang Bedah Pria (Enggang Gading)", periode: "04/2019 s.d 10/2022", durasi: "3 Tahun 6 Bulan" },
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
      nama: "Bdn. Siti Nurhaliza, S.Tr.Keb",
      nip: "19940822 202012 2 006",
      ttl: "Mempawah, 22 Agustus 1994",
      jabatan: "Bidan Pelaksana Lanjutan",
      unit: "IGD Kebidanan",
      pkSaatIni: "BK II",
      pkDiusulkan: "BK III",
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
      nama: "Ns. Hendra Kurniawan, S.Kep",
      nip: "19920415 201903 1 004",
      jenjang: "Perawat Klinis III (PK III)",
      unit: "Ruang Enggang Gading 2 (Bedah Terpadu)",
      periode: "Januari 2025 s.d Desember 2025 (1 Tahun Terakhir)",
      items: [
        { tgl: "12/01/2025", rm: "RM: 482910", tindakan: "Melakukan pengkajian awal keperawatan rawat inap", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "15/01/2025", rm: "RM: 482955", tindakan: "Memasang jalur intravena (infus) & pengambilan sampel darah", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "20/02/2025", rm: "RM: 483102", tindakan: "Melakukan perekaman dan interpretasi awal Elektrokardiogram (EKG)", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "04/03/2025", rm: "RM: 483520", tindakan: "Melakukan perawatan luka bedah/kotor tingkat sedang", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "18/04/2025", rm: "RM: 484012", tindakan: "Pemberian obat high-alert melalui syringer pump / infus pump", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "02/06/2025", rm: "RM: 484890", tindakan: "Melakukan resusitasi jantung paru (RJP) dasar / bantuan hidup dasar", mandiri: false, supervisi: true, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "14/07/2025", rm: "RM: 485412", tindakan: "Melakukan suctioning pada pasien dengan penurunan kesadaran", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "22/08/2025", rm: "RM: 486021", tindakan: "Memasang kateter urine menetap dengan prinsip steril", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "10/09/2025", rm: "RM: 486780", tindakan: "Melakukan dokumentasi asuhan keperawatan berbasis 3S (SDKI/SLKI/SIKI)", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "25/11/2025", rm: "Ref: Logbook Ruangan", tindakan: "Diskusi klinis / Preseptorship harian bersama mentor ruangan", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" }
      ],
      kaRuNama: "Ns. Yohanes Rindo Ari Wijoyo, S.Kep",
      kaRuNip: "19850612 201001 1 011",
      kaRuRuangan: "Ruang Enggang Gading 2",
      kota: "Pontianak",
      tanggal: "21 Oktober",
      tahun: "2026"
    },
    bidan: {
      nama: "Bdn. Siti Nurhaliza, S.Tr.Keb",
      nip: "19940822 202012 2 006",
      jenjang: "Bidan Klinis III (BK III)",
      unit: "Ruang Bersalin (VK Sentral) / Maternitas",
      periode: "Januari 2025 s.d Desember 2025 (1 Tahun Terakhir)",
      items: [
        { tgl: "08/01/2025", rm: "RM: 510201", tindakan: "Melakukan pengkajian awal kebidanan pada ibu inpartu kala I", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "14/02/2025", rm: "RM: 510255", tindakan: "Memantau kemajuan persalinan dengan lembar partograf WHO", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "20/03/2025", rm: "RM: 510312", tindakan: "Pertolongan persalinan fisiologis normal (APN) 60 langkah", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "05/04/2025", rm: "RM: 510340", tindakan: "Melakukan manajemen aktif kala III persalinan (MAK III)", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "19/05/2025", rm: "RM: 510410", tindakan: "Penjahitan luka robekan jalan lahir / perineum derajat I & II", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "12/06/2025", rm: "RM: 510488", tindakan: "Asuhan bayi baru lahir normal & inisiasi menyusu dini (IMD)", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "28/07/2025", rm: "RM: 510530", tindakan: "Tata laksana awal kegawatdaruratan perdarahan pasca salin (HPP)", mandiri: false, supervisi: true, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "15/08/2025", rm: "RM: 510599", tindakan: "Resusitasi asfiksia pada bayi baru lahir (ventilasi tekanan positif)", mandiri: false, supervisi: true, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "10/10/2025", rm: "RM: 510670", tindakan: "Pemberian konseling & pemasangan alat kontrasepsi pasca persalinan", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" },
        { tgl: "18/11/2025", rm: "Ref: VK Sentral", tindakan: "Dokumentasi asuhan kebidanan metode SOAP terintegrasi", mandiri: true, supervisi: false, paraf: "paraf", catatan: "Valid / Terverifikasi" }
      ],
      kaRuNama: "Bdn. Ely Lidiawati, S.Tr.Keb",
      kaRuNip: "19880420 201212 2 004",
      kaRuRuangan: "Kamar Bersalin (VK Sentral)",
      kota: "Pontianak",
      tanggal: "21 Oktober",
      tahun: "2026"
    }
  // Preset Format Baku Formulir Verifikasi Sumber Asli (Primary Source Verification - PSV) Dokumen Klinis (2 Halaman RSUD dr. Soedarso)
  samplePsv: {
    nama: "Ns. Hendra Kurniawan, S.Kep",
    nip: "19920415 201903 1 004",
    pendidikan: "S1 Keperawatan & Profesi Ners (Universitas Tanjungpura)",
    unit: "Enggang Gading 2",
    ijazahInstitusi: "Universitas Tanjungpura Pontianak",
    ijazahMetode: "online",
    ijazahHasil: "valid",
    ijazahNomor: "1401/UNTAN/NERS/2018",
    ijazahTahun: "2018",
    strInstitusi: "Majelis Tenaga Kesehatan / KTKI / KKI Kemenkes RI",
    strMetode: "qr_scan",
    strHasil: "valid",
    strNomor: "140152123-2893812",
    strBerlaku: "17 Agustus 2028",
    sippInstitusi: "Dinas Kesehatan / DPMPTSP Asal",
    sippMetode: "sicantik",
    sippHasil: "valid",
    sippNomor: "503/412/Dinkes-PP/SIPP/2023",
    sippBerlaku: "17 Agustus 2028",
    pelatihanInstitusi: "Pusdiklat Kemenkes / Organisasi Profesi (PPNI)",
    pelatihanMetode: "barcode",
    pelatihanHasil: "valid",
    pelatihanNama: "Basic Trauma Cardiac Life Support (BTCLS) & KMB Terpadu",
    pelatihanTanggal: "14 - 18 Mei 2024",
    buktiPddikti: true,
    buktiStr: true,
    buktiSipp: true,
    buktiPelatihan: true,
    kesimpulan: "disetujui_penuh",
    verifikatorNama: "Ns. Bambang Sugiarto, S.Kep",
    verifikatorNip: "19880315 201402 1 002",
    tanggalPsv: "18 Oktober 2026",
    ketuaSubkomiteNama: "Ns. Rusmulyadi, M.Kep., Sp.Kep.MB",
    ketuaSubkomiteNip: "19800728 200501 1 005"
  },

  // Konfigurasi Notifikasi Administrasi Resmi (Email Komite & Sekretaris)
  administrativeNotification: {
    enabled: true,
    recipients: [
      { name: "Komite Keperawatan RSUD dr. Soedarso", email: "komitekeperawatanrsds2023@gmail.com", role: "Pimpinan & Sekretariat" },
      { name: "Ns. Rusmulyadi, S.Kep., MARS", email: "yadhie28@gmail.com", role: "Sekretaris Komite Keperawatan" }
    ],
    primaryEmails: ["komitekeperawatanrsds2023@gmail.com", "yadhie28@gmail.com"],
    events: [
      "Pengajuan Formulir Surat Permohonan Kredensial",
      "Pendaftaran Asesmen Mandiri RKK",
      "Unggah Berkas Portofolio Kredensial",
      "Laporan & Konsultasi Etika / Disiplin Profesi",
      "Rekomendasi SPK & RKK Mitra Bestari"
    ]
  }
};

