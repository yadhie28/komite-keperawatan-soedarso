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
    email: "rsud@kalbarprov.go.id",
    website: "https://rsuddrsoedarso.kalbarprov.go.id",
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

  // Master RKK Checklists per Jenjang Karir
  rkkCatalog: {
    "PK I": {
      title: "Perawat Klinis I (Novice / Pemula)",
      description: "Memiliki kompetensi memberikan asuhan keperawatan dasar pada klien dalam kondisi stabil tanpa penyulit, di bawah bimbingan / supervisi Perawat Klinis yang lebih tinggi.",
      competencies: [
        { id: "RKK-PK1-01", name: "Melakukan pengkajian keperawatan dasar (TTV, status nutrisi, eliminasi)", domain: "Asuhan Dasar", defaultMandiri: true },
        { id: "RKK-PK1-02", name: "Melakukan pemasangan dan monitoring terapi infus intravena perifer", domain: "Tindakan Invasif", defaultMandiri: true },
        { id: "RKK-PK1-03", name: "Pemberian obat rute oral, sublingual, topikal, inhalasi, dan rektal", domain: "Farmakoterapi", defaultMandiri: true },
        { id: "RKK-PK1-04", name: "Pemberian injeksi SC, IM, IV bolus sesuai order dokter", domain: "Farmakoterapi", defaultMandiri: true },
        { id: "RKK-PK1-05", name: "Melakukan perawatan luka bersih pasca operasi tanpa infeksi", domain: "Wound Care", defaultMandiri: true },
        { id: "RKK-PK1-06", name: "Pemasangan selang kateter urin (Folley Catheter) pada pasien dewasa", domain: "Eliminasi", defaultMandiri: false },
        { id: "RKK-PK1-07", name: "Pemasangan Nasogastric Tube (NGT) untuk dekompresi / nutrisi", domain: "Nutrisi", defaultMandiri: false },
        { id: "RKK-PK1-08", name: "Melakukan Bantuan Hidup Dasar (BHD / BLS) pada henti jantung", domain: "Kegawatdaruratan", defaultMandiri: true },
        { id: "RKK-PK1-09", name: "Pengambilan sampel darah vena dan kapiler untuk pemeriksaan lab", domain: "Diagnostik", defaultMandiri: true },
        { id: "RKK-PK1-10", name: "Dokumentasi asuhan keperawatan terintegrasi dengan format CPPT / SBAR", domain: "Dokumentasi", defaultMandiri: true }
      ]
    },
    "PK II": {
      title: "Perawat Klinis II (Advanced Beginner / Mandiri Dasar)",
      description: "Mampu memberikan asuhan keperawatan mandiri holistik pada pasien rawat inap / rawat jalan dengan kondisi akut sedang dan penyulit terantisipasi.",
      competencies: [
        { id: "RKK-PK2-01", name: "Pengkajian keperawatan komprehensif pada pasien penyakit dalam & bedah", domain: "Asuhan Holistik", defaultMandiri: true },
        { id: "RKK-PK2-02", name: "Perawatan luka infeksi, luka diabetes (gangren), luka bakar grade I-II", domain: "Wound Care", defaultMandiri: true },
        { id: "RKK-PK2-03", name: "Pengelolaan dan monitoring transfusi darah & produk darah (PRC, FFP, TC)", domain: "Transfusi", defaultMandiri: true },
        { id: "RKK-PK2-04", name: "Pemasangan infus pada pasien dengan akses vena sulit (vein finder)", domain: "Tindakan Invasif", defaultMandiri: true },
        { id: "RKK-PK2-05", name: "Pemberian obat kemoterapi / high-alert medications di bawah protokol", domain: "High Alert", defaultMandiri: false },
        { id: "RKK-PK2-06", name: "Perekaman dan interpretasi awal Elektrokardiografi (EKG 12 Sandapan)", domain: "Diagnostik", defaultMandiri: true },
        { id: "RKK-PK2-07", name: "Pengambilan darah arteri (Analisa Gas Darah / AGD)", domain: "Diagnostik", defaultMandiri: true },
        { id: "RKK-PK2-08", name: "Edukasi pasien terstruktur dan perencanaan pulang (Discharge Planning)", domain: "Edukasi", defaultMandiri: true },
        { id: "RKK-PK2-09", name: "Pemberian terapi titrasi inotropik/vasopresor via syringe pump", domain: "Intensif", defaultMandiri: false },
        { id: "RKK-PK2-10", name: "Pemberian nutrisi parenteral total (TPN) via akses sentral/perifer", domain: "Nutrisi", defaultMandiri: true }
      ]
    },
    "PK III": {
      title: "Perawat Klinis III (Competent / Spesifik Area)",
      description: "Memiliki kompetensi asuhan keperawatan spesifik pada area keperawatan tertentu (Medikal Bedah, Kritis ICU, Gawat Darurat, Kardiovaskular, Kemoterapi) dan mampu menjadi Preseptor / Pembimbing Klinis.",
      competencies: [
        { id: "RKK-PK3-01", name: "Penatalaksanaan dan monitoring pasien dengan ventilasi mekanik invasif (Ventilator)", domain: "Critical Care", defaultMandiri: true },
        { id: "RKK-PK3-02", name: "Perawatan dan sampling jalur CVC (Central Venous Catheter) & PICC", domain: "Critical Care", defaultMandiri: true },
        { id: "RKK-PK3-03", name: "Interpretasi EKG lethal arrhythmias & inisiasi defibrilasi / kardioversi", domain: "Kardiovaskular", defaultMandiri: true },
        { id: "RKK-PK3-04", name: "Pemberian kemoterapi sitostatika & penanganan ekstravasasi", domain: "Onkologi", defaultMandiri: true },
        { id: "RKK-PK3-05", name: "Asuhan keperawatan perioperatif instrumen mayor bedah digestif/onkologi", domain: "Kamar Bedah", defaultMandiri: true },
        { id: "RKK-PK3-06", name: "Perawatan luka modern (Modern Dressing, Negative Pressure Wound Therapy)", domain: "Wound Specialist", defaultMandiri: true },
        { id: "RKK-PK3-07", name: "Triase pasien gawat darurat (Emergency Severity Index / ATS)", domain: "Gawat Darurat", defaultMandiri: true },
        { id: "RKK-PK3-08", name: "Perawatan pasien post-PCI / Angiografi Koroner & pemantauan sheath", domain: "Kardiovaskular", defaultMandiri: true },
        { id: "RKK-PK3-09", name: "Clinical Preceptorship & bimbingan perawat baru / mahasiswa ners", domain: "Edukasi & Riset", defaultMandiri: true },
        { id: "RKK-PK3-10", name: "Pelaksanaan audit mutu keperawatan dan ronde keperawatan ruangan", domain: "Manajemen Mutu", defaultMandiri: true }
      ]
    },
    "PK IV": {
      title: "Perawat Klinis IV (Proficient / Mahir Konsultan Ruangan)",
      description: "Memiliki keahlian mendalam pada sub-spesialisasi, mampu mengelola kasus kompleks multidisplin, memimpin investigasi keselamatan, dan merumuskan inovasi asuhan.",
      competencies: [
        { id: "RKK-PK4-01", name: "Konsultasi kasus keperawatan medikal bedah / kritis dengan komplikasi multi-organ", domain: "Konsultasi Klinis", defaultMandiri: true },
        { id: "RKK-PK4-02", name: "Penatalaksanaan Continuous Renal Replacement Therapy (CRRT) di ICU", domain: "Critical Care", defaultMandiri: true },
        { id: "RKK-PK4-03", name: "Manajemen hemodinamik invasif (Arterial Line, PiCCO, Swan-Ganz)", domain: "Hemodinamik", defaultMandiri: true },
        { id: "RKK-PK4-04", name: "Penyusunan Clinical Pathway dan Panduan Praktik Klinis Keperawatan (PPK)", domain: "Kebijakan Mutu", defaultMandiri: true },
        { id: "RKK-PK4-05", name: "Investigasi Root Cause Analysis (RCA) pada Insiden Keselamatan Pasien", domain: "Patient Safety", defaultMandiri: true },
        { id: "RKK-PK4-06", name: "Penyelenggaraan Evidence-Based Nursing Practice (EBNP) & Riset Terapan", domain: "Riset Klinis", defaultMandiri: true }
      ]
    },
    "PK V": {
      title: "Perawat Klinis V (Expert / Pakar Rumah Sakit)",
      description: "Tingkat kepakaran tertinggi perawat spesialis/sub-spesialis di RSUD Dr. Soedarso. Berperan sebagai konsultan utama, penentu arah kebijakan klinis keperawatan rumah sakit dan regional.",
      competencies: [
        { id: "RKK-PK5-01", name: "Konsultan ahli klinis keperawatan tingkat provinsi Kalimantan Barat", domain: "Kepakaran", defaultMandiri: true },
        { id: "RKK-PK5-02", name: "Lead Assessor kredensialing Mitra Bestari tingkat nasional / KARS", domain: "Kredensialing", defaultMandiri: true },
        { id: "RKK-PK5-03", name: "Pengembangan model asuhan keperawatan profesional (MAKP) terintegrasi", domain: "Manajerial Klinis", defaultMandiri: true },
        { id: "RKK-PK5-04", name: "Publikasi riset inovasi keperawatan pada jurnal nasional / internasional", domain: "Publikasi", defaultMandiri: true }
      ]
    },
    "PMB": {
      title: "Bidan Praktisi (PMB I - PMB IV Kebidanan & Neonatal)",
      description: "Kewenangan klinis pelayanan kebidanan, antenatal care komprehensif, pertolongan persalinan fisiologis & patologis, kegawatdaruratan maternal dan neonatal.",
      competencies: [
        { id: "RKK-PMB-01", name: "Pemeriksaan Antenatal Care (ANC) terstandar 10T", domain: "Maternal", defaultMandiri: true },
        { id: "RKK-PMB-02", name: "Pertolongan persalinan normal dan episiotomi/penjahitan perineum grade II", domain: "Persalinan", defaultMandiri: true },
        { id: "RKK-PMB-03", name: "Penatalaksanaan kegawatdaruratan maternal (Preeklampsia, Perdarahan Postpartum)", domain: "Emergency Maternal", defaultMandiri: true },
        { id: "RKK-PMB-04", name: "Resusitasi neonatus dengan asfiksia pada bayi baru lahir (BBL)", domain: "Neonatal", defaultMandiri: true },
        { id: "RKK-PMB-05", name: "Pemasangan IUD dan Implan / Pelayanan KB Pascapersalinan", domain: "Keluarga Berencana", defaultMandiri: true },
        { id: "RKK-PMB-06", name: "Pelayanan perawatan intensif neonatal (CPAP & Fototerapi di NICU/Perinatologi)", domain: "Neonatal Intensif", defaultMandiri: false }
      ]
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

  // Unit Kerja Resmi RSUD Dokter Soedarso
  hospitalUnits: [
    "Instalasi Gawat Darurat (IGD)",
    "ICU Sentral (Intensive Care Unit)",
    "Instalasi Bedah Sentral (Kamar Operasi IBS)",
    "Ruang Enggang Gading 2 (Penyakit Dalam)",
    "Ruang Merak (Penyakit Dalam Non-Infeksi)",
    "Ruang Cendrawasih (Bedah Orthopedi & Umum)",
    "Ruang Bersalin (VK) & Maternal",
    "Ruang Perinatologi & NICU / PICU",
    "Ruang Hemodialisa (HD)",
    "Klinik Onkologi & Kemoterapi Terpadu",
    "Instalasi Rawat Jalan Terpadu",
    "Unit Stroke & Neurologi",
    "Unit Pelayanan Jantung & Vaskular"
  ],

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
  ]
};
