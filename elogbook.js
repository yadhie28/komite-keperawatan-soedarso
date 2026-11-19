/**
 * E-LOGBOOK HARIAN ASUHAN KEPERAWATAN (STANDAR 3S: SDKI - SLKI - SIKI PPNI)
 * Subkomite Mutu Profesi - Komite Keperawatan RSUD dr. Soedarso Pontianak
 * 
 * Standar Acuan:
 * 1. SDKI : Standar Diagnosis Keperawatan Indonesia (DPP PPNI)
 * 2. SLKI : Standar Luaran Keperawatan Indonesia (DPP PPNI)
 * 3. SIKI : Standar Intervensi Keperawatan Indonesia (DPP PPNI)
 * 4. Permenkes No. 49 Tahun 2013 tentang Komite Keperawatan RS
 * 5. Integrasi Portofolio SKP Kemenkes RI / Pelataran Sehat
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA PUSTAKA STANDAR 3S PPNI (SDKI, SLKI, SIKI)
  // =========================================================================
  const SDKI_LIBRARY = [
    {
      code: "D.0077",
      title: "Nyeri Akut",
      category: "Psikologis",
      subcategory: "Nyeri dan Kenyamanan",
      definition: "Pengalaman sensorik atau emosional yang berkaitan dengan kerusakan jaringan aktual atau fungsional, dengan onset mendadak atau lambat dan berintensitas ringan hingga berat yang berlangsung kurang dari 3 bulan.",
      slkiDefault: "L.08066",
      sikiDefault: ["I.08238", "I.08243"],
      commonMedis: "Post Operasi, Trauma Fisik, Kolik Abdomen, Fraktur, Infark Miokard"
    },
    {
      code: "D.0001",
      title: "Bersihan Jalan Napas Tidak Efektif",
      category: "Fisiologis",
      subcategory: "Respirasi",
      definition: "Ketidakmampuan membersihkan sekret atau obstruksi jalan napas untuk mempertahankan jalan napas tetap paten.",
      slkiDefault: "L.01001",
      sikiDefault: ["I.01011", "I.01014"],
      commonMedis: "Pneumonia, PPOK Eksaserbasi, Bronkiektasis, Asma Bronkial"
    },
    {
      code: "D.0005",
      title: "Pola Napas Tidak Efektif",
      category: "Fisiologis",
      subcategory: "Respirasi",
      definition: "Inspirasi dan/atau ekspirasi yang tidak memberikan ventilasi adekuat.",
      slkiDefault: "L.01004",
      sikiDefault: ["I.01011", "I.01014"],
      commonMedis: "Efusi Pleura, Pneumothorax, Asidosis Metabolik, Cedera Medula Spinalis"
    },
    {
      code: "D.0003",
      title: "Gangguan Pertukaran Gas",
      category: "Fisiologis",
      subcategory: "Respirasi",
      definition: "Kelebihan atau kekurangan oksigenasi dan/atau eliminasi karbondioksida pada membran alveolus-kapiler.",
      slkiDefault: "L.01003",
      sikiDefault: ["I.01014", "I.01026"],
      commonMedis: "ARDS, Edema Paru, Gagal Jantung Kongestif, Emboli Paru"
    },
    {
      code: "D.0008",
      title: "Penurunan Curah Jantung",
      category: "Fisiologis",
      subcategory: "Sirkulasi",
      definition: "Ketidakadekuatan jantung memompa darah untuk memenuhi kebutuhan metabolisme tubuh.",
      slkiDefault: "L.02008",
      sikiDefault: ["I.02075", "I.02076"],
      commonMedis: "Gagal Jantung Kongestif (CHF), Kardiomiopati, Aritmia Fatal"
    },
    {
      code: "D.0019",
      title: "Defisit Nutrisi",
      category: "Fisiologis",
      subcategory: "Nutrisi & Cairan",
      definition: "Asupan nutrisi tidak cukup untuk memenuhi kebutuhan metabolisme tubuh.",
      slkiDefault: "L.03030",
      sikiDefault: ["I.03119", "I.03120"],
      commonMedis: "Keganasan, Disfagia, Anoreksia Nervosa, Malnutrisi Berat, Sirosis Hepatis"
    },
    {
      code: "D.0022",
      title: "Hipervolemia",
      category: "Fisiologis",
      subcategory: "Nutrisi & Cairan",
      definition: "Peningkatan volume cairan intravaskular, interstisial, dan/atau intraselular.",
      slkiDefault: "L.03020",
      sikiDefault: ["I.03098", "I.03114"],
      commonMedis: "Gagal Ginjal Kronik (CKD on HD), Sirosis Hepatis, Gagal Jantung"
    },
    {
      code: "D.0023",
      title: "Hipovolemia",
      category: "Fisiologis",
      subcategory: "Nutrisi & Cairan",
      definition: "Penurunan volume cairan intravaskular, interstisial, dan/atau intraselular.",
      slkiDefault: "L.03020",
      sikiDefault: ["I.03098", "I.03116"],
      commonMedis: "Gastroenteritis Akut (GEA), Perdarahan Akut, Luka Bakar Luas, DHF"
    },
    {
      code: "D.0130",
      title: "Hipertermia",
      category: "Lingkungan",
      subcategory: "Keamanan & Proteksi",
      definition: "Suhu tubuh meningkat di atas rentang normal tubuh (> 37.8°C per aksila).",
      slkiDefault: "L.14134",
      sikiDefault: ["I.15506", "I.14578"],
      commonMedis: "Dengue Haemorrhagic Fever (DHF), Typhoid Fever, Sepsis, Meningitis"
    },
    {
      code: "D.0129",
      title: "Gangguan Integritas Kulit / Jaringan",
      category: "Lingkungan",
      subcategory: "Keamanan & Proteksi",
      definition: "Kerusakan kulit (dermis dan/atau epidermis) atau jaringan (membran mukosa, kornea, fasia, otot, tendon, tulang, kartilago, kapsul sendi dan/atau ligamen).",
      slkiDefault: "L.14125",
      sikiDefault: ["I.14564", "I.11353"],
      commonMedis: "Ulkus Diabetikum, Dekubitus (Pressure Ulcer), Luka Post Op Terbuka, Combustio"
    },
    {
      code: "D.0142",
      title: "Risiko Infeksi",
      category: "Lingkungan",
      subcategory: "Keamanan & Proteksi",
      definition: "Beresiko mengalami peningkatan terserang organisme patogenik akibat prosedur invasif atau imunosupresi.",
      slkiDefault: "L.14137",
      sikiDefault: ["I.14539", "I.14564"],
      commonMedis: "Terpasang Kateter Urin, CVC, IV Line >3 hari, Post Bedah Mayor"
    },
    {
      code: "D.0143",
      title: "Risiko Jatuh",
      category: "Lingkungan",
      subcategory: "Keamanan & Proteksi",
      definition: "Beresiko mengalami kerusakan fisik dan gangguan kesehatan akibat jatuh.",
      slkiDefault: "L.14138",
      sikiDefault: ["I.14540", "I.14537"],
      commonMedis: "Geriatri, Post Stroke Akut, Sedasi Pasca Anestesi, Gangguan Keseimbangan"
    },
    {
      code: "D.0056",
      title: "Intoleransi Aktivitas",
      category: "Fisiologis",
      subcategory: "Aktivitas & Istirahat",
      definition: "Ketidakcukupan energi untuk menyelesaikan aktivitas hidup sehari-hari.",
      slkiDefault: "L.05047",
      sikiDefault: ["I.05178", "I.05186"],
      commonMedis: "Anemia Berat, Penyakit Jantung Koroner, PPOK, Tirah Baring Lama"
    },
    {
      code: "D.0080",
      title: "Ansietas",
      category: "Psikologis",
      subcategory: "Integritas Ego",
      definition: "Kondisi emosi dan pengalaman subyektif individu terhadap objek yang tidak jelas dan spesifik akibat antisipasi bahaya.",
      slkiDefault: "L.09093",
      sikiDefault: ["I.09314", "I.08247"],
      commonMedis: "Pre-Operasi Mayor, Diagnosis Penyakit Terminal, Pertama Kali Masuk Rawat Inap"
    },
    {
      code: "D.0111",
      title: "Defisit Pengetahuan",
      category: "Perilaku",
      subcategory: "Penyuluhan & Pembelajaran",
      definition: "Ketiadaan atau kurangnya informasi kognitif yang berkaitan dengan topik tertentu.",
      slkiDefault: "L.12111",
      sikiDefault: ["I.12383", "I.12444"],
      commonMedis: "Penyakit Kronis Baru (DM, Hipertensi), Rencana Pulang (Discharge Planning)"
    }
  ];

  const SLKI_LIBRARY = {
    "L.08066": {
      code: "L.08066",
      title: "Tingkat Nyeri Menurun",
      targetExpectation: "Menurun",
      criteria: [
        "Keluhan nyeri menurun (Skor VAS/NRS 0-2)",
        "Meringis menurun",
        "Sikap protektif menurun",
        "Gelisah menurun",
        "Frekuensi nadi membaik (60-100 x/mnt)",
        "Pola napas membaik",
        "Tekanan darah membaik"
      ]
    },
    "L.01001": {
      code: "L.01001",
      title: "Bersihan Jalan Napas Meningkat",
      targetExpectation: "Meningkat",
      criteria: [
        "Batuk efektif meningkat",
        "Produksi sputum menurun",
        "Mengi/wheezing menurun",
        "Ronkhi menurun",
        "Frekuensi napas membaik (16-20 x/mnt)",
        "Pola napas teratur"
      ]
    },
    "L.01004": {
      code: "L.01004",
      title: "Pola Napas Membaik",
      targetExpectation: "Membaik",
      criteria: [
        "Dispnea menurun",
        "Penggunaan otot bantu napas menurun",
        "Pemanjangan fase ekspirasi menurun",
        "Frekuensi napas membaik (16-20 x/mnt)",
        "Kedalaman napas membaik"
      ]
    },
    "L.01003": {
      code: "L.01003",
      title: "Pertukaran Gas Meningkat",
      targetExpectation: "Meningkat",
      criteria: [
        "Tingkat kesadaran compos mentis",
        "Dispnea menurun",
        "PCO2 membaik (35-45 mmHg)",
        "PO2 membaik (80-100 mmHg)",
        "Takikardia menurun",
        "Sianosis menghilang"
      ]
    },
    "L.02008": {
      code: "L.02008",
      title: "Curah Jantung Meningkat",
      targetExpectation: "Meningkat",
      criteria: [
        "Kekuatan nadi perifer meningkat",
        "Ejection Fraction (EF) meningkat",
        "Edema ekstremitas menurun",
        "Distensi vena jugularis menurun",
        "Haluaran urin adekuat (> 0.5 cc/kgBB/jam)"
      ]
    },
    "L.03030": {
      code: "L.03030",
      title: "Status Nutrisi Membaik",
      targetExpectation: "Membaik",
      criteria: [
        "Porsi makan yang dihabiskan meningkat",
        "Kekuatan otot mengunyah meningkat",
        "Serum albumin membaik (> 3.5 g/dL)",
        "Indeks Massa Tubuh (IMT) membaik",
        "Nafsu makan membaik"
      ]
    },
    "L.03020": {
      code: "L.03020",
      title: "Keseimbangan Cairan Meningkat",
      targetExpectation: "Meningkat",
      criteria: [
        "Asupan cairan adekuat",
        "Haluaran urin seimbang",
        "Edema perifer menurun",
        "Turgor kulit membaik elastis",
        "Mata cekung menghilang"
      ]
    },
    "L.14134": {
      code: "L.14134",
      title: "Termoregulasi Membaik",
      targetExpectation: "Membaik",
      criteria: [
        "Suhu tubuh dalam rentang normal (36.5 - 37.5°C)",
        "Menggigil menurun",
        "Kulit merah menurun",
        "Takipnea menurun",
        "Akral hangat"
      ]
    },
    "L.14125": {
      code: "L.14125",
      title: "Integritas Kulit & Jaringan Meningkat",
      targetExpectation: "Meningkat",
      criteria: [
        "Kerusakan jaringan menurun",
        "Kemerahan/eritema menurun",
        "Jaringan granulasi luka meningkat",
        "Nyeri pada area luka menurun",
        "Sensasi membaik"
      ]
    },
    "L.14137": {
      code: "L.14137",
      title: "Tingkat Infeksi Menurun",
      targetExpectation: "Menurun",
      criteria: [
        "Demam menurun",
        "Kemerahan/bengkak area tusukan/luka menurun",
        "Drainase purulen tidak ada",
        "Kadar leukosit darah normal (4.000 - 10.000 /uL)",
        "Nyeri lokal berkurang"
      ]
    },
    "L.14138": {
      code: "L.14138",
      title: "Tingkat Jatuh Menurun",
      targetExpectation: "Menurun",
      criteria: [
        "Jatuh dari tempat tidur menurun (Nol insiden)",
        "Jatuh saat berdiri/berjalan nihil",
        "Kepatuhan pemasangan pagar bed 100%",
        "Kepatuhan penggunaan gelang kuning risiko jatuh"
      ]
    },
    "L.05047": {
      code: "L.05047",
      title: "Toleransi Aktivitas Meningkat",
      targetExpectation: "Meningkat",
      criteria: [
        "Kemudahan dalam melakukan aktivitas sehari-hari (ADL) meningkat",
        "Keluhan lelah menurun",
        "Dyspnea saat aktivitas menurun",
        "Saturasi O2 saat mobilisasi > 95%"
      ]
    },
    "L.09093": {
      code: "L.09093",
      title: "Tingkat Ansietas Menurun",
      targetExpectation: "Menurun",
      criteria: [
        "Perilaku gelisah menurun",
        "Ketegangan motorik menurun",
        "Keluhan khawatir menurun",
        "Pola tidur membaik",
        "Kontak mata rileks"
      ]
    },
    "L.12111": {
      code: "L.12111",
      title: "Tingkat Pengetahuan Meningkat",
      targetExpectation: "Meningkat",
      criteria: [
        "Kemampuan menjelaskan pengetahuan tentang masalah meningkat",
        "Perilaku sesuai anjuran meningkat",
        "Pertanyaan tentang masalah menurun",
        "Kepatuhan pengobatan meningkat"
      ]
    }
  };

  const SIKI_LIBRARY = {
    "I.08238": {
      code: "I.08238",
      title: "Manajemen Nyeri",
      domain: "Fisiologis",
      actions: {
        observasi: [
          "Identifikasi lokasi, karakteristik, durasi, frekuensi, kualitas, intensitas skala nyeri (VAS/NRS)",
          "Identifikasi respons nyeri non-verbal (meringis, gelisah)",
          "Identifikasi faktor yang memperberat dan memperingan nyeri",
          "Monitor efek samping penggunaan analgetik"
        ],
        terapeutik: [
          "Berikan teknik non-farmakologis untuk mengurangi nyeri (relaksasi napas dalam, kompres hangat/dingin)",
          "Kontrol lingkungan yang memperberat rasa nyeri (suhu ruangan, pencahayaan, kebisingan)",
          "Fasilitasi istirahat dan tidur yang adekuat"
        ],
        edukasi: [
          "Jelaskan penyebab, periode, dan pemicu nyeri kepada pasien/keluarga",
          "Jelaskan strategi meredakan nyeri secara mandiri",
          "Anjurkan memonitor nyeri secara mandiri"
        ],
        kolaborasi: [
          "Kolaborasi pemberian analgetik sesuai indikasi DPJP"
        ]
      }
    },
    "I.08243": {
      code: "I.08243",
      title: "Pemberian Analgesik",
      domain: "Fisiologis",
      actions: {
        observasi: [
          "Identifikasi riwayat alergi obat pasien",
          "Monitor tanda vital sebelum dan setelah pemberian analgesik",
          "Monitor efektivitas analgesik setelah 15-30 menit"
        ],
        terapeutik: [
          "Terapkan prinsip 7 Benar pemberian obat",
          "Dokumentasikan nama obat, dosis, rute, dan respons pasien"
        ],
        edukasi: [
          "Jelaskan efek samping obat analgesik yang mungkin timbul (mual, pusing, kantuk)"
        ],
        kolaborasi: [
          "Kolaborasi jenis dan dosis analgesik narkotik/NSAID dengan dokter spesialis"
        ]
      }
    },
    "I.01011": {
      code: "I.01011",
      title: "Manajemen Jalan Napas",
      domain: "Fisiologis",
      actions: {
        observasi: [
          "Monitor pola napas (frekuensi, kedalaman, usaha napas)",
          "Monitor bunyi napas tambahan (gurgling, mengi, wheezing, ronkhi)",
          "Monitor sputum (jumlah, warna, aroma)"
        ],
        terapeutik: [
          "Posisikan semi-fowler atau fowler (30-45 derajat)",
          "Lakukan fisioterapi dada jika tidak ada kontraindikasi",
          "Lakukan penghisapan lendir (suction) kurang dari 15 detik",
          "Berikan oksigenasi sesuai indikasi target SpO2 >95%"
        ],
        edukasi: [
          "Anjurkan asupan cairan 2000 ml/hari jika tidak ada kontraindikasi",
          "Ajarkan teknik batuk efektif secara benar"
        ],
        kolaborasi: [
          "Kolaborasi pemberian bronkodilator, ekspektoran, mukolitik melalui nebulizer"
        ]
      }
    },
    "I.01014": {
      code: "I.01014",
      title: "Pemantauan Respirasi",
      domain: "Fisiologis",
      actions: {
        observasi: [
          "Monitor frekuensi, irama, kedalaman dan upaya napas",
          "Monitor adanya sumbatan jalan napas dan retraksi dinding dada",
          "Monitor saturasi oksigen (SpO2) secara berkala"
        ],
        terapeutik: [
          "Atur interval pemantauan respirasi sesuai kondisi kegawatan",
          "Dokumentasikan hasil pemantauan pada lembar observasi TTV / CPPT"
        ],
        edukasi: [
          "Jelaskan tujuan dan prosedur pemantauan kepada pasien dan keluarga"
        ],
        kolaborasi: [
          "Kolaborasi pemeriksaan Analisa Gas Darah (AGD) jika SpO2 turun"
        ]
      }
    },
    "I.14539": {
      code: "I.14539",
      title: "Pencegahan Infeksi",
      domain: "Lingkungan",
      actions: {
        observasi: [
          "Monitor tanda dan gejala infeksi lokal dan sistemik (dolor, kalor, rubor, tumor, functio laesa)",
          "Monitor area insersi kateter infus, CVC, atau drain"
        ],
        terapeutik: [
          "Batasi jumlah pengunjung pasien",
          "Cuci tangan sebelum dan sesudah kontak dengan pasien dan lingkungan (5 Momen WHO)",
          "Pertahankan teknik aseptik pada prosedur invasif dan perawatan luka",
          "Ganti set infus dan balutan sesuai standar PPI RSUD dr. Soedarso"
        ],
        edukasi: [
          "Jelaskan tanda dan gejala infeksi kepada pasien dan keluarga",
          "Ajarkan cara mencuci tangan 6 langkah yang benar"
        ],
        kolaborasi: [
          "Kolaborasi pemberian terapi antibiotik rasional sesuai kultur mikrobilogi"
        ]
      }
    },
    "I.14564": {
      code: "I.14564",
      title: "Perawatan Luka",
      domain: "Lingkungan",
      actions: {
        observasi: [
          "Monitor karakteristik luka (drainase, warna dasar luka, ukuran, kedalaman, bau)",
          "Monitor tanda-tanda infeksi pada luka operasi / kronis"
        ],
        terapeutik: [
          "Lepaskan balutan dan plester secara perlahan dengan larutan pelembut",
          "Bersihkan luka dengan cairan steril NaCl 0.9%",
          "Lakukan nekrotomi / debridement autolitik jaringan mati bila perlu",
          "Pasang balutan modern dressing sesuai eksudat luka",
          "Fiksasi balutan secara rapi tanpa menekan sirkulasi perifer"
        ],
        edukasi: [
          "Jelaskan tanda infeksi luka kepada pasien dan keluarga",
          "Anjurkan mengonsumsi makanan tinggi protein untuk mempercepat penyembuhan luka"
        ],
        kolaborasi: [
          "Kolaborasi debridement bedah atau konsultasi tim perawatan luka (wound care specialist)"
        ]
      }
    },
    "I.15506": {
      code: "I.15506",
      title: "Manajemen Hipertermia",
      domain: "Lingkungan",
      actions: {
        observasi: [
          "Identifikasi penyebab hipertermia (dehidrasi, terpapar suhu lingkungan panas, infeksi)",
          "Monitor suhu tubuh setiap 2-4 jam",
          "Monitor kadar elektrolit serum dan haluaran urin"
        ],
        terapeutik: [
          "Sediakan lingkungan yang sejuk dan sirkulasi udara baik",
          "Longgarkan atau ganti pakaian pasien dengan bahan katun tipis",
          "Lakukan kompres hangat (tepid water sponge) pada lipat paha dan aksila",
          "Berikan cairan oral adekuat"
        ],
        edukasi: [
          "Anjurkan tirah baring optimal",
          "Anjurkan banyak minum air putih minimal 2 liter per hari"
        ],
        kolaborasi: [
          "Kolaborasi pemberian cairan dan elektrolit intravena",
          "Kolaborasi pemberian antipiretik (Paracetamol infus/oral) sesuai instruksi DPJP"
        ]
      }
    },
    "I.14540": {
      code: "I.14540",
      title: "Pencegahan Jatuh",
      domain: "Lingkungan",
      actions: {
        observasi: [
          "Identifikasi faktor risiko jatuh (usia >65, penurunan kesadaran, kelemahan fisik, obat sedasi)",
          "Hitung skor risiko jatuh menggunakan skala Morse / Humpty Dumpty",
          "Monitor kemampuan ambulasi dan gaya berjalan pasien"
        ],
        terapeutik: [
          "Pasang gelang identifikasi risiko jatuh warna kuning pada pasien",
          "Pasang segitiga risiko jatuh warna kuning di atas tempat tidur",
          "Pastikan roda tempat tidur dan kursi roda dalam posisi terkunci",
          "Pasang pengaman tempat tidur (side rails) di kedua sisi",
          "Dekatkan tombol bel panggilan dan barang-barang penting dalam jangkauan pasien",
          "Pastikan pencahayaan ruangan dan kamar mandi cukup terang"
        ],
        edukasi: [
          "Anjurkan memanggil perawat jika memerlukan bantuan untuk bergerak atau ke kamar mandi",
          "Edukasi keluarga untuk tidak meninggalkan pasien risiko tinggi sendirian"
        ],
        kolaborasi: [
          "Kolaborasi dengan dokter untuk penyesuaian dosis obat sedasi atau hipotensif"
        ]
      }
    },
    "I.02075": {
      code: "I.02075",
      title: "Perawatan Jantung",
      domain: "Fisiologis",
      actions: {
        observasi: [
          "Identifikasi tanda/gejala primer penurunan curah jantung (dispnea, kelelahan, edema, ortopnea)",
          "Monitor tekanan darah, nadi perifer, dan capillary refill time (CRT)",
          "Monitor intake dan output cairan serta balance cairan per 24 jam",
          "Monitor saturasi oksigen dan rekaman EKG 12 lead"
        ],
        terapeutik: [
          "Posisikan pasien semi-fowler atau fowler yang nyaman",
          "Berikan oksigen nasal kanul/masker untuk mempertahankan SpO2 >95%",
          "Batasi asupan garam dan cairan sesuai instruksi dokter spesialis jantung",
          "Fasilitasi istirahat fisik dan ketenangan lingkungan"
        ],
        edukasi: [
          "Anjurkan beraktivitas fisik bertahap sesuai toleransi",
          "Anjurkan kepatuhan diet jantung dan pembatasan cairan"
        ],
        kolaborasi: [
          "Kolaborasi pemberian terapi inotropik, diuretik, atau ACE-inhibitor",
          "Kolaborasi pemeriksaan enzim jantung (Troponin-I, CKMB) dan foto toraks"
        ]
      }
    },
    "I.03098": {
      code: "I.03098",
      title: "Manajemen Cairan",
      domain: "Fisiologis",
      actions: {
        observasi: [
          "Monitor status hidrasi (frekuensi nadi, turgor kulit, kelembapan mukosa, tekanan darah)",
          "Monitor hasil laboratorium terkait cairan (hematokrit, natrium, kalium, BUN, Cr)",
          "Catat intake dan output cairan secara ketat dan hitung balance cairan per shift"
        ],
        terapeutik: [
          "Atur tetesan infus cairan kristaloid/koloid dengan infusion pump / mikro drip",
          "Berikan cairan oral sesuai toleransi dan target hidrasi"
        ],
        edukasi: [
          "Jelaskan tanda-tanda dehidrasi atau kelebihan cairan kepada keluarga"
        ],
        kolaborasi: [
          "Kolaborasi pemberian cairan intravena dan koreksi elektrolit dengan dokter"
        ]
      }
    },
    "I.03119": {
      code: "I.03119",
      title: "Manajemen Nutrisi",
      domain: "Fisiologis",
      actions: {
        observasi: [
          "Identifikasi status nutrisi, riwayat diet, dan alergi makanan",
          "Identifikasi perlunya penggunaan selang nasogastrik (NGT)",
          "Monitor asupan makanan dan berat badan secara berkala"
        ],
        terapeutik: [
          "Lakukan oral hygiene sebelum makan untuk meningkatkan nafsu makan",
          "Sajikan makanan dalam kondisi hangat dan porsi kecil tapi sering",
          "Fasilitasi posisi duduk tegak saat makan"
        ],
        edukasi: [
          "Ajarkan diet yang diprogramkan bersama keluarga"
        ],
        kolaborasi: [
          "Kolaborasi dengan ahli gizi untuk menentukan jumlah kalori dan jenis nutrien yang dibutuhkan"
        ]
      }
    },
    "I.05178": {
      code: "I.05178",
      title: "Manajemen Energi",
      domain: "Fisiologis",
      actions: {
        observasi: [
          "Identifikasi gangguan fungsi tubuh yang mengakibatkan kelelahan",
          "Monitor kelelahan fisik dan emosional pasien"
        ],
        terapeutik: [
          "Sediakan lingkungan nyaman dan rendah stimulus (cahaya, suara)",
          "Lakukan rentang gerak pasif dan/atau aktif bertahap",
          "Bantu aktivitas perawatan diri jika pasien belum mandiri"
        ],
        edukasi: [
          "Anjurkan tirah baring dan mengatur jadwal istirahat",
          "Anjurkan menghubungi perawat jika tanda kelelahan meningkat"
        ],
        kolaborasi: [
          "Kolaborasi dengan fisioterapis tentang cara meningkatkan aktivitas fisik"
        ]
      }
    },
    "I.09314": {
      code: "I.09314",
      title: "Reduksi Ansietas",
      domain: "Psikologis",
      actions: {
        observasi: [
          "Identifikasi saat tingkat ansietas berubah (kondisi, waktu, stresor)",
          "Monitor tanda-tanda ansietas verbal dan non-verbal"
        ],
        terapeutik: [
          "Ciptakan suasana terapeutik untuk menumbuhkan kepercayaan",
          "Temani pasien untuk mengurangi kecemasan jika memungkinkan",
          "Dengarkan keluhan pasien dengan penuh perhatian",
          "Gunakan pendekatan yang tenang dan meyakinkan"
        ],
        edukasi: [
          "Jelaskan semua prosedur tindakan beserta sensasi yang mungkin dialami",
          "Latih teknik relaksasi distraksi dan napas dalam"
        ],
        kolaborasi: [
          "Kolaborasi pemberian obat antiansietas jika diindikasikan dokter"
        ]
      }
    },
    "I.12383": {
      code: "I.12383",
      title: "Edukasi Kesehatan",
      domain: "Perilaku",
      actions: {
        observasi: [
          "Identifikasi kesiapan dan kemampuan menerima informasi",
          "Identifikasi faktor-faktor yang dapat meningkatkan dan menurunkan motivasi perilaku hidup bersih dan sehat"
        ],
        terapeutik: [
          "Sediakan materi dan media pendidikan kesehatan (leaflet/lembar balik)",
          "Jadwalkan pendidikan kesehatan sesuai kesepakatan pasien/keluarga",
          "Berikan kesempatan untuk bertanya"
        ],
        edukasi: [
          "Jelaskan faktor risiko yang dapat mempengaruhi kesehatan",
          "Ajarkan perilaku hidup bersih dan sehat serta kepatuhan minum obat di rumah"
        ],
        kolaborasi: []
      }
    }
  };

  // =========================================================================
  // 2. SEED SAMPLE RECORDS UNTUK AWAL (RSUD DR. SOEDARSO)
  // =========================================================================
  const STORAGE_KEY = 'komite_elogbook_records';

  const INITIAL_SEED_RECORDS = [
    {
      id: "LOG-20261118-001",
      date: "2026-11-18",
      time: "08:30",
      shift: "Pagi",
      nurseName: "Ns. Rina Sartika, S.Kep",
      nurseNip: "000000000000000000",
      jenjangPk: "PK III",
      unit: "Ruang Enggang Gading 2 (Ranap Dewasa)",
      patientRm: "RM-784210",
      patientName: "Tn. S.W.",
      patientAge: "48 Thn",
      patientGender: "Laki-laki",
      bedNumber: "Bed 04-A",
      diagnosaMedis: "Post Op Laparatomi Appendisitis Perforasi H-1",
      sdkiCode: "D.0077",
      sdkiTitle: "Nyeri Akut",
      slkiCode: "L.08066",
      slkiTitle: "Tingkat Nyeri Menurun",
      sikiCode: "I.08238",
      sikiTitle: "Manajemen Nyeri",
      actionsSelected: [
        "Identifikasi lokasi, karakteristik, durasi, frekuensi, intensitas skala nyeri (VAS/NRS)",
        "Berikan teknik non-farmakologis untuk mengurangi nyeri (relaksasi napas dalam, kompres hangat/dingin)",
        "Fasilitasi istirahat dan tidur yang adekuat",
        "Kolaborasi pemberian analgetik sesuai indikasi DPJP"
      ],
      tindakanType: "Mandiri & Kolaborasi",
      soapS: "Pasien mengeluh nyeri pada luka operasi di perut kanan bawah, terasa seperti tertusuk perih, skala VAS 6/10 berkurang menjadi 3/10 pasca relaksasi & injeksi.",
      soapO: "TD 125/80 mmHg, Nadi 84 x/mnt, RR 18 x/mnt, SpO2 98%, Suhu 36.8°C. Tampak luka post-op tertutup kasa bersih dan kering, tidak ada rembesan darah aktif. Wajah pasien tampak lebih rileks.",
      soapA: "Nyeri Akut teratasi sebagian (Skala nyeri turun 6 -> 3). Target SLKI tercapai sebagian.",
      soapP: "Lanjutkan intervensi manajemen nyeri I.08238, berikan posisi semi-fowler, delegasikan evaluasi skala nyeri per 2 jam ke perawat shift sore.",
      isVerified: true,
      verifiedBy: "Ns. Hendra Wijaya, S.Kep (Karu)",
      verifiedAt: "2026-11-18 13:45"
    },
    {
      id: "LOG-20261118-002",
      date: "2026-11-18",
      time: "09:15",
      shift: "Pagi",
      nurseName: "Ns. Bambang Hariyanto, S.Kep",
      nurseNip: "000000000000000000",
      jenjangPk: "PK II",
      unit: "Ruang Kakap (Bedah)",
      patientRm: "RM-652190",
      patientName: "Ny. M.A.",
      patientAge: "54 Thn",
      patientGender: "Perempuan",
      bedNumber: "Bed 12-B",
      diagnosaMedis: "Ulkus Diabetikum Pedis Dextra Post Debridement H-3",
      sdkiCode: "D.0129",
      sdkiTitle: "Gangguan Integritas Kulit / Jaringan",
      slkiCode: "L.14125",
      slkiTitle: "Integritas Kulit & Jaringan Meningkat",
      sikiCode: "I.14564",
      sikiTitle: "Perawatan Luka",
      actionsSelected: [
        "Monitor karakteristik luka (drainase, warna dasar luka, ukuran, kedalaman, bau)",
        "Bersihkan luka dengan cairan steril NaCl 0.9%",
        "Pasang balutan modern dressing sesuai eksudat luka",
        "Anjurkan mengonsumsi makanan tinggi protein untuk mempercepat penyembuhan luka"
      ],
      tindakanType: "Mandiri",
      soapS: "Pasien mengatakan balutan luka terasa basah sebelum diganti, saat ini merasa nyaman dan tidak berbau.",
      soapO: "Ukuran luka 5x3 cm, dasar luka 70% granulasi merah, 30% slough kekuningan, eksudat serosanguinosa minimal. Telah dilakukan ganti balutan modern dressing alginate + foam, difiksasi rapi. TTV: TD 130/85 mmHg, Suhu 36.7°C.",
      soapA: "Gangguan integritas kulit teratasi sebagian, proses granulasi luka membaik.",
      soapP: "Rawat luka rutin 2 hari sekali, motivasi asupan putih telur dan nutrisi DM sesuai advis ahli gizi.",
      isVerified: true,
      verifiedBy: "Ns. Hendra Wijaya, S.Kep (Karu)",
      verifiedAt: "2026-11-18 13:50"
    },
    {
      id: "LOG-20261118-003",
      date: "2026-11-18",
      time: "10:00",
      shift: "Pagi",
      nurseName: "Ns. Nurul Fadillah, S.Kep",
      nurseNip: "000000000000000000",
      jenjangPk: "PK III",
      unit: "Instalasi Gawat Darurat (IGD)",
      patientRm: "RM-810923",
      patientName: "Tn. R.K.",
      patientAge: "62 Thn",
      patientGender: "Laki-laki",
      bedNumber: "Ruang Resusitasi IGD",
      diagnosaMedis: "PPOK Eksaserbasi Akut + Pneumonia Komunitas",
      sdkiCode: "D.0001",
      sdkiTitle: "Bersihan Jalan Napas Tidak Efektif",
      slkiCode: "L.01001",
      slkiTitle: "Bersihan Jalan Napas Meningkat",
      sikiCode: "I.01011",
      sikiTitle: "Manajemen Jalan Napas",
      actionsSelected: [
        "Monitor pola napas (frekuensi, kedalaman, usaha napas)",
        "Posisikan semi-fowler atau fowler (30-45 derajat)",
        "Berikan oksigenasi sesuai indikasi target SpO2 >95%",
        "Ajarkan teknik batuk efektif secara benar",
        "Kolaborasi pemberian bronkodilator, ekspektoran, mukolitik melalui nebulizer"
      ],
      tindakanType: "Mandiri & Kolaborasi",
      soapS: "Pasien mengeluh sesak napas berat dan dahak kental putih keabuan sulit dikeluarkan.",
      soapO: "Kesadaran Compos Mentis, RR 28 x/mnt dangkal dan cepat, terdengar ronkhi basah kasar di kedua basal paru, SpO2 88% room air -> naik 96% dengan O2 NRM 10 Lpm. Nebulisasi Combivent 1 resp + Pulmicort selesai diberikan.",
      soapA: "Bersihan jalan napas tidak efektif belum teratasi penuh, sputum mulai bisa dikeluarkan.",
      soapP: "Pertahankan O2 NRM 10 Lpm, ulangi nebulisasi 4 jam kemudian, siapkan transfer ke Ruang Rawat Enggang.",
      isVerified: true,
      verifiedBy: "Ns. Nurul Fadillah, S.Kep (PJ Shift)",
      verifiedAt: "2026-11-18 12:10"
    },
    {
      id: "LOG-20261118-004",
      date: "2026-11-18",
      time: "11:20",
      shift: "Pagi",
      nurseName: "Ns. Dian Kusuma, A.Md.Kep",
      nurseNip: "000000000000000000",
      jenjangPk: "PK I",
      unit: "Ruang Enggang Gading 2 (Ranap Dewasa)",
      patientRm: "RM-799105",
      patientName: "An. B.P.",
      patientAge: "9 Thn",
      patientGender: "Laki-laki",
      bedNumber: "Bed 08-C",
      diagnosaMedis: "Dengue Haemorrhagic Fever (DHF) Grade II Hari Ke-4",
      sdkiCode: "D.0130",
      sdkiTitle: "Hipertermia",
      slkiCode: "L.14134",
      slkiTitle: "Termoregulasi Membaik",
      sikiCode: "I.15506",
      sikiTitle: "Manajemen Hipertermia",
      actionsSelected: [
        "Monitor suhu tubuh setiap 2-4 jam",
        "Longgarkan atau ganti pakaian pasien dengan bahan katun tipis",
        "Lakukan kompres hangat (tepid water sponge) pada lipat paha dan aksila",
        "Anjurkan banyak minum air putih minimal 2 liter per hari",
        "Kolaborasi pemberian antipiretik (Paracetamol infus/oral) sesuai instruksi DPJP"
      ],
      tindakanType: "Mandiri & Kolaborasi",
      soapS: "Ibu pasien mengatakan anak badannya masih terasa panas, lemas, dan nafsu makan berkurang.",
      soapO: "Suhu aksila 38.6°C, Nadi 102 x/mnt reguler, akral hangat, kulit kemerahan, uji torniquet (+), trombosit pagi 76.000 /uL. Telah dilakukan tepid sponge hangat selama 20 menit dan Paracetamol drop 250 mg masuk.",
      soapA: "Hipertermia teratasi sebagian (suhu 30 menit pasca kompres & antipiretik: 37.6°C).",
      soapP: "Observasi tanda syok dengue (kebocoran plasma, tensi, CRT), cek trombosit ulang besok pagi jam 06.00.",
      isVerified: false,
      verifiedBy: null,
      verifiedAt: null
    },
    {
      id: "LOG-20261118-005",
      date: "2026-11-18",
      time: "12:45",
      shift: "Pagi",
      nurseName: "Ns. Hendra Wijaya, S.Kep",
      nurseNip: "000000000000000000",
      jenjangPk: "PK IV",
      unit: "Intensive Care Unit (ICU)",
      patientRm: "RM-712398",
      patientName: "Tn. K.M.",
      patientAge: "66 Thn",
      patientGender: "Laki-laki",
      bedNumber: "Bed ICU 02",
      diagnosaMedis: "Acute Decompensated Heart Failure (ADHF) + CAD 3VD",
      sdkiCode: "D.0008",
      sdkiTitle: "Penurunan Curah Jantung",
      slkiCode: "L.02008",
      slkiTitle: "Curah Jantung Meningkat",
      sikiCode: "I.02075",
      sikiTitle: "Perawatan Jantung",
      actionsSelected: [
        "Identifikasi tanda/gejala primer penurunan curah jantung (dispnea, kelelahan, edema, ortopnea)",
        "Monitor tekanan darah, nadi perifer, dan capillary refill time (CRT)",
        "Monitor intake dan output cairan serta balance cairan per 24 jam",
        "Posisikan pasien semi-fowler atau fowler yang nyaman",
        "Kolaborasi pemberian terapi inotropik, diuretik, atau ACE-inhibitor"
      ],
      tindakanType: "Mandiri & Delegasi",
      soapS: "Pasien sadar, komunikasi anggukan kepala, mengeluh sesak bila posisi kepala datar, kaki terasa berat.",
      soapO: "Terpasang ETT ventilasi mekanik mode SIMV + PS, FiO2 40%, PEEP 5, SpO2 97%. TD 100/65 mmHg (titrasi Dobutamin 5 mcg/kg/mnt), JVP 5+3 cmH2O, edema pitting pretibial +2/+2. Diuresis 70 cc/jam pasca Furosemid 40 mg IV.",
      soapA: "Penurunan curah jantung dalam observasi intensif, hemodinamik relatif stabil.",
      soapP: "Lanjutkan titrasi dobutamin, target balance cairan negatif 500 cc/24 jam, evaluasi foto toraks jam 14.00.",
      isVerified: true,
      verifiedBy: "Ns. Hendra Wijaya, S.Kep (Karu ICU)",
      verifiedAt: "2026-11-18 13:00"
    }
  ];

  // =========================================================================
  // 3. STATE & DATA ACCESS
  // =========================================================================
  function getRecords() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_RECORDS));
        return INITIAL_SEED_RECORDS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error("Gagal membaca records elogbook:", e);
      return INITIAL_SEED_RECORDS;
    }
  }

  function saveRecordsToStorage(records) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.error("Gagal menyimpan records elogbook:", e);
    }
  }

  function getActiveUser() {
    // Sync dengan session portal
    if (window.state && window.state.currentUser) {
      return window.state.currentUser;
    }
    try {
      const saved = localStorage.getItem('komite_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  function canVerifyRecord() {
    const user = getActiveUser();
    if (!user) return false;
    // Boleh verifikasi jika: Admin, Komite, Mutu, atau Karu (PK IV/V atau role admin)
    const role = (user.role || '').toLowerCase();
    const badge = (user.badge || '').toLowerCase();
    const access = user.access || [];
    return role === 'admin' || 
           role === 'mutu' || 
           role === 'komite' || 
           badge.includes('karu') || 
           badge.includes('pk iv') || 
           badge.includes('pk v') ||
           access.includes('mutu') || 
           access.includes('komite');
  }

  // =========================================================================
  // 4. RENDERING & UI CONTROLLER
  // =========================================================================
  function switchMutuSubtab(tabName) {
    const subtabs = ['elogbook', 'audit', 'katalog3s'];
    subtabs.forEach(t => {
      const btn = document.getElementById(`subtab-btn-${t}`);
      const pane = document.getElementById(`subpane-mutu-${t}`);
      if (btn) {
        if (t === tabName) {
          btn.classList.add('active');
          btn.style.background = 'var(--primary-600)';
          btn.style.color = '#ffffff';
          btn.style.borderColor = 'var(--primary-600)';
        } else {
          btn.classList.remove('active');
          btn.style.background = 'var(--card-bg)';
          btn.style.color = 'var(--text-muted)';
          btn.style.borderColor = 'var(--border-color)';
        }
      }
      if (pane) {
        pane.style.display = (t === tabName) ? 'block' : 'none';
      }
    });

    if (tabName === 'elogbook') {
      renderTable();
      renderMetrics();
    } else if (tabName === 'katalog3s') {
      renderKatalog3S();
    }
  }

  function renderMetrics() {
    const records = getRecords();
    const todayStr = new Date().toISOString().split('T')[0];
    const todayRecords = records.filter(r => r.date === todayStr);

    const totalEl = document.getElementById('metricLogbookTotalToday');
    const sdkiel = document.getElementById('metricLogbook3SCompliance');
    const mandiriel = document.getElementById('metricLogbookMandiriRatio');
    const verifEl = document.getElementById('metricLogbookVerifiedCount');
    const badgeCount = document.getElementById('badgeTotalLogbookCount');

    if (badgeCount) badgeCount.textContent = records.length;
    if (totalEl) totalEl.textContent = records.length; // atau todayRecords.length
    if (sdkiel) sdkiel.textContent = "100%";
    
    // Hitung ratio mandiri
    const mandiriCount = records.filter(r => (r.tindakanType || '').includes('Mandiri')).length;
    const ratio = records.length > 0 ? Math.round((mandiriCount / records.length) * 100) : 100;
    if (mandiriel) mandiriel.textContent = `${ratio}%`;

    // Hitung verified
    const verifiedCount = records.filter(r => r.isVerified).length;
    const pendingCount = records.length - verifiedCount;
    if (verifEl) verifEl.textContent = `${verifiedCount} Disahkan (${pendingCount} Menunggu)`;
  }

  function renderTable() {
    const tbody = document.getElementById('tableBodyElogbook');
    if (!tbody) return;

    const shiftFilter = document.getElementById('filterLogbookShift')?.value || 'all';
    const unitFilter = document.getElementById('filterLogbookUnit')?.value || 'all';
    const statusFilter = document.getElementById('filterLogbookStatus')?.value || 'all';
    const searchQuery = (document.getElementById('searchLogbookInput')?.value || '').toLowerCase().trim();

    let records = getRecords();

    // Filter
    if (shiftFilter !== 'all') {
      records = records.filter(r => r.shift.toLowerCase() === shiftFilter.toLowerCase());
    }
    if (unitFilter !== 'all') {
      records = records.filter(r => r.unit.toLowerCase().includes(unitFilter.toLowerCase()));
    }
    if (statusFilter !== 'all') {
      if (statusFilter === 'verified') records = records.filter(r => r.isVerified);
      if (statusFilter === 'pending') records = records.filter(r => !r.isVerified);
    }
    if (searchQuery) {
      records = records.filter(r => 
        (r.nurseName && r.nurseName.toLowerCase().includes(searchQuery)) ||
        (r.nurseNip && r.nurseNip.includes(searchQuery)) ||
        (r.patientRm && r.patientRm.toLowerCase().includes(searchQuery)) ||
        (r.patientName && r.patientName.toLowerCase().includes(searchQuery)) ||
        (r.sdkiCode && r.sdkiCode.toLowerCase().includes(searchQuery)) ||
        (r.sdkiTitle && r.sdkiTitle.toLowerCase().includes(searchQuery)) ||
        (r.diagnosaMedis && r.diagnosaMedis.toLowerCase().includes(searchQuery)) ||
        (r.unit && r.unit.toLowerCase().includes(searchQuery))
      );
    }

    if (records.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
            <i class="fa-solid fa-folder-open" style="font-size: 2.2rem; margin-bottom: 0.75rem; color: #94a3b8; display: block;"></i>
            <strong>Belum ada catatan E-Logbook yang sesuai dengan filter.</strong>
            <p style="font-size: 0.85rem; margin-top: 0.25rem;">Klik tombol "<strong>+ Catat E-Logbook Asuhan (3S)</strong>" untuk mendokumentasikan asuhan keperawatan hari ini.</p>
          </td>
        </tr>
      `;
      return;
    }

    const isVerifier = canVerifyRecord();
    const curUser = getActiveUser();

    tbody.innerHTML = records.map((item, idx) => {
      const badgeShift = item.shift === 'Pagi' ? 'background: #e0f2fe; color: #0369a1;' :
                         item.shift === 'Sore' ? 'background: #fef3c7; color: #b45309;' :
                         'background: #ede9fe; color: #6d28d9;';

      const statusBadge = item.isVerified ? `
        <span class="badge-status badge-status-approved" style="font-size: 0.72rem; display: inline-flex; align-items: center; gap: 4px;" title="Disahkan oleh ${item.verifiedBy || 'Kepala Ruangan'}">
          <i class="fa-solid fa-circle-check"></i> Terverifikasi Karu
        </span>
      ` : `
        <span class="badge-status badge-status-pending" style="font-size: 0.72rem; display: inline-flex; align-items: center; gap: 4px;">
          <i class="fa-solid fa-clock"></i> Menunggu Verifikasi
        </span>
      `;

      let actionBtns = `
        <button class="btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="ELogbookKomkep.viewDetail('${item.id}')" title="Lihat Detail 3S">
          <i class="fa-solid fa-eye"></i> Detail
        </button>
      `;

      if (isVerifier && !item.isVerified) {
        actionBtns += `
          <button class="btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; background: #10b981; border-color: #10b981; margin-left: 4px;" onclick="ELogbookKomkep.verifyRecord('${item.id}')" title="Sahkan Asuhan (Karu / Subkomite Mutu)">
            <i class="fa-solid fa-check-double"></i> Sahkan
          </button>
        `;
      }

      // Tombol hapus jika pembuat atau admin
      const isOwner = curUser && (curUser.nip === item.nurseNip || (curUser.role || '').toLowerCase() === 'admin');
      if (isOwner) {
        actionBtns += `
          <button class="btn-secondary" style="padding: 0.3rem 0.5rem; font-size: 0.75rem; color: #dc2626; border-color: #fecaca; margin-left: 4px;" onclick="ELogbookKomkep.deleteRecord('${item.id}')" title="Hapus Catatan">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        `;
      }

      return `
        <tr>
          <td>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.88rem;">${item.date}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px; margin-top: 2px;">
              <span style="display: inline-block; padding: 1px 6px; border-radius: 4px; font-weight: 700; font-size: 0.7rem; ${badgeShift}">${item.shift}</span>
              <span>${item.time} WIB</span>
            </div>
          </td>
          <td>
            <div style="font-weight: 700; color: var(--primary-700); font-size: 0.86rem;">${item.nurseName}</div>
            <div style="font-size: 0.74rem; color: var(--text-muted);">NIP: ${item.nurseNip}</div>
            <span style="display: inline-block; margin-top: 3px; font-size: 0.68rem; font-weight: 700; padding: 1px 5px; border-radius: 4px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;">${item.jenjangPk}</span>
          </td>
          <td>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.85rem;">${item.patientName} (${item.patientAge})</div>
            <div style="font-size: 0.75rem; color: #0284c7; font-weight: 600;">${item.patientRm} &bull; ${item.bedNumber}</div>
            <div style="font-size: 0.73rem; color: var(--text-muted); margin-top: 2px; line-height: 1.3;" title="${item.diagnosaMedis}">${item.diagnosaMedis.length > 32 ? item.diagnosaMedis.substring(0, 32) + '...' : item.diagnosaMedis}</div>
          </td>
          <td>
            <div style="display: inline-flex; align-items: center; gap: 4px;">
              <span style="background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 800;">${item.sdkiCode}</span>
            </div>
            <div style="font-weight: 600; color: var(--text-main); font-size: 0.82rem; margin-top: 3px;">${item.sdkiTitle}</div>
          </td>
          <td>
            <div style="display: inline-flex; align-items: center; gap: 4px;">
              <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 800;">${item.slkiCode}</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">${item.slkiTitle}</div>
          </td>
          <td>
            <div style="display: inline-flex; align-items: center; gap: 4px;">
              <span style="background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 800;">${item.sikiCode}</span>
            </div>
            <div style="font-size: 0.78rem; font-weight: 600; color: var(--text-main); margin-top: 2px;">${item.sikiTitle}</div>
            <div style="font-size: 0.72rem; color: #10b981; margin-top: 2px;"><i class="fa-solid fa-list-check"></i> ${item.actionsSelected ? item.actionsSelected.length : 0} Tindakan OTEK</div>
          </td>
          <td>
            ${statusBadge}
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">Sifat: <strong>${item.tindakanType || 'Mandiri'}</strong></div>
          </td>
          <td style="white-space: nowrap;">
            ${actionBtns}
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderKatalog3S() {
    const container = document.getElementById('containerKatalog3S');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem; background: var(--card-bg); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-book-medical" style="color: var(--primary-600);"></i>
          Daftar Diagnosis &amp; Linkage Standar 3S PPNI (SDKI &rarr; SLKI &rarr; SIKI)
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
          Buku Putih Standar 3S PPNI diadopsi resmi di RSUD dr. Soedarso untuk penyeragaman bahasa asuhan keperawatan, keselamatan pasien (Patient Safety), pengisian CPPT, serta pemenuhan angka kredit SKP Kemenkes.
        </p>
      </div>

      <div class="table-responsive" style="background: var(--card-bg); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 120px;">Kode SDKI</th>
              <th>Diagnosis Keperawatan (SDKI)</th>
              <th>Kategori / Subkategori</th>
              <th>Luaran Utama (SLKI)</th>
              <th>Intervensi Utama (SIKI)</th>
              <th>Contoh Kasus Medis</th>
            </tr>
          </thead>
          <tbody>
            ${SDKI_LIBRARY.map(item => {
              const slkiObj = SLKI_LIBRARY[item.slkiDefault] || { code: item.slkiDefault, title: '-' };
              const sikiList = item.sikiDefault.map(c => SIKI_LIBRARY[c] || { code: c, title: '-' });

              return `
                <tr>
                  <td>
                    <span style="background: #fee2e2; color: #991b1b; padding: 3px 8px; border-radius: 4px; font-size: 0.78rem; font-weight: 800;">
                      ${item.code}
                    </span>
                  </td>
                  <td>
                    <strong style="color: var(--primary-700); font-size: 0.92rem;">${item.title}</strong>
                    <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 3px; line-height: 1.4;">${item.definition}</div>
                  </td>
                  <td>
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-main);">${item.category}</span>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">${item.subcategory}</div>
                  </td>
                  <td>
                    <div style="font-size: 0.75rem; font-weight: 800; color: #166534;">${slkiObj.code}</div>
                    <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-main);">${slkiObj.title}</div>
                  </td>
                  <td>
                    ${sikiList.map(s => `
                      <div style="margin-bottom: 4px;">
                        <span style="font-size: 0.72rem; font-weight: 800; background: #e0e7ff; color: #3730a3; padding: 1px 5px; border-radius: 3px;">${s.code}</span>
                        <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-main);">${s.title}</span>
                      </div>
                    `).join('')}
                  </td>
                  <td>
                    <span style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4; display: inline-block;">${item.commonMedis}</span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // 5. INPUT MODAL LOGIC & AUTO LINKAGE 3S
  // =========================================================================
  function populateSdkiDropdown() {
    const select = document.getElementById('inputLogbookSdki');
    if (!select) return;

    select.innerHTML = '<option value="">-- Pilih Diagnosis Keperawatan (SDKI) --</option>' +
      SDKI_LIBRARY.map(item => `
        <option value="${item.code}">[${item.code}] ${item.title} (${item.category})</option>
      `).join('');
  }

  function onSdkiChange(code) {
    const slkiSelect = document.getElementById('inputLogbookSlki');
    const sikiSelect = document.getElementById('inputLogbookSiki');
    const otekContainer = document.getElementById('inputLogbookOtekChecklist');

    if (!code) {
      if (slkiSelect) slkiSelect.innerHTML = '<option value="">-- Pilih SLKI --</option>';
      if (sikiSelect) sikiSelect.innerHTML = '<option value="">-- Pilih SIKI --</option>';
      if (otekContainer) otekContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.82rem; font-style: italic;">Pilih Diagnosis SDKI terlebih dahulu untuk menampilkan tindakan OTEK.</div>';
      return;
    }

    const sdkiItem = SDKI_LIBRARY.find(s => s.code === code);
    if (!sdkiItem) return;

    // Auto-select SLKI
    if (slkiSelect) {
      slkiSelect.innerHTML = Object.keys(SLKI_LIBRARY).map(k => {
        const item = SLKI_LIBRARY[k];
        const isSelected = (k === sdkiItem.slkiDefault) ? 'selected' : '';
        return `<option value="${item.code}" ${isSelected}>[${item.code}] ${item.title}</option>`;
      }).join('');
    }

    // Auto-select SIKI
    if (sikiSelect) {
      sikiSelect.innerHTML = Object.keys(SIKI_LIBRARY).map(k => {
        const item = SIKI_LIBRARY[k];
        const isSelected = (sdkiItem.sikiDefault && sdkiItem.sikiDefault.includes(k)) ? 'selected' : '';
        return `<option value="${item.code}" ${isSelected}>[${item.code}] ${item.title}</option>`;
      }).join('');
    }

    // Update OTEK checklist
    const primarySiki = sdkiItem.sikiDefault[0] || "I.08238";
    renderOtekChecklist(primarySiki);
  }

  function onSikiChange(code) {
    renderOtekChecklist(code);
  }

  function renderOtekChecklist(sikiCode) {
    const container = document.getElementById('inputLogbookOtekChecklist');
    if (!container) return;

    const sikiObj = SIKI_LIBRARY[sikiCode];
    if (!sikiObj) {
      container.innerHTML = '<div style="color: var(--text-muted); font-size: 0.82rem;">Tidak ada rincian tindakan untuk intervensi ini.</div>';
      return;
    }

    let html = `
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--primary-700); margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
        <span><i class="fa-solid fa-list-check"></i> Rincian Tindakan SIKI: ${sikiObj.code} - ${sikiObj.title} (Centang yang Anda lakukan):</span>
        <button type="button" class="btn-link" style="font-size: 0.75rem;" onclick="ELogbookKomkep.checkAllOtek(true)">Pilih Semua</button>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
    `;

    // Observasi
    if (sikiObj.actions.observasi && sikiObj.actions.observasi.length > 0) {
      html += `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.65rem;">
          <div style="font-size: 0.75rem; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 4px;">
            <i class="fa-solid fa-eye"></i> Observasi
          </div>
          ${sikiObj.actions.observasi.map((act, i) => `
            <label style="display: flex; align-items: flex-start; gap: 6px; font-size: 0.78rem; color: #334155; margin-bottom: 4px; cursor: pointer;">
              <input type="checkbox" name="otekActions" value="${act}" checked style="margin-top: 2px;">
              <span>${act}</span>
            </label>
          `).join('')}
        </div>
      `;
    }

    // Terapeutik
    if (sikiObj.actions.terapeutik && sikiObj.actions.terapeutik.length > 0) {
      html += `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.65rem;">
          <div style="font-size: 0.75rem; font-weight: 800; color: #16a34a; text-transform: uppercase; margin-bottom: 4px;">
            <i class="fa-solid fa-hand-holding-medical"></i> Terapeutik
          </div>
          ${sikiObj.actions.terapeutik.map((act, i) => `
            <label style="display: flex; align-items: flex-start; gap: 6px; font-size: 0.78rem; color: #334155; margin-bottom: 4px; cursor: pointer;">
              <input type="checkbox" name="otekActions" value="${act}" checked style="margin-top: 2px;">
              <span>${act}</span>
            </label>
          `).join('')}
        </div>
      `;
    }

    // Edukasi
    if (sikiObj.actions.edukasi && sikiObj.actions.edukasi.length > 0) {
      html += `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.65rem;">
          <div style="font-size: 0.75rem; font-weight: 800; color: #d97706; text-transform: uppercase; margin-bottom: 4px;">
            <i class="fa-solid fa-chalkboard-user"></i> Edukasi
          </div>
          ${sikiObj.actions.edukasi.map((act, i) => `
            <label style="display: flex; align-items: flex-start; gap: 6px; font-size: 0.78rem; color: #334155; margin-bottom: 4px; cursor: pointer;">
              <input type="checkbox" name="otekActions" value="${act}" checked style="margin-top: 2px;">
              <span>${act}</span>
            </label>
          `).join('')}
        </div>
      `;
    }

    // Kolaborasi
    if (sikiObj.actions.kolaborasi && sikiObj.actions.kolaborasi.length > 0) {
      html += `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.65rem;">
          <div style="font-size: 0.75rem; font-weight: 800; color: #7c3aed; text-transform: uppercase; margin-bottom: 4px;">
            <i class="fa-solid fa-handshake-angle"></i> Kolaborasi
          </div>
          ${sikiObj.actions.kolaborasi.map((act, i) => `
            <label style="display: flex; align-items: flex-start; gap: 6px; font-size: 0.78rem; color: #334155; margin-bottom: 4px; cursor: pointer;">
              <input type="checkbox" name="otekActions" value="${act}" checked style="margin-top: 2px;">
              <span>${act}</span>
            </label>
          `).join('')}
        </div>
      `;
    }

    html += `</div>`;
    container.innerHTML = html;
  }

  function checkAllOtek(checked) {
    const checkboxes = document.querySelectorAll('input[name="otekActions"]');
    checkboxes.forEach(cb => cb.checked = checked);
  }

  function openInputModal() {
    const curUser = getActiveUser();
    populateSdkiDropdown();

    // Reset Form
    const form = document.getElementById('formInputELogbook');
    if (form) form.reset();

    // Default Date to Today, Time to now
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

    if (document.getElementById('inputLogbookDate')) document.getElementById('inputLogbookDate').value = todayStr;
    if (document.getElementById('inputLogbookTime')) document.getElementById('inputLogbookTime').value = timeStr;

    // Fill Perawat Info from login
    if (curUser) {
      if (document.getElementById('inputLogbookNurseName')) document.getElementById('inputLogbookNurseName').value = curUser.name || '';
      if (document.getElementById('inputLogbookNurseNip')) document.getElementById('inputLogbookNurseNip').value = curUser.nip || '';
      if (document.getElementById('inputLogbookJenjangPk')) document.getElementById('inputLogbookJenjangPk').value = curUser.jenjang || 'PK II';
      if (document.getElementById('inputLogbookUnit') && curUser.unit) {
        document.getElementById('inputLogbookUnit').value = curUser.unit;
      }
    }

    // Default select first SDKI (Nyeri Akut D.0077)
    if (document.getElementById('inputLogbookSdki')) {
      document.getElementById('inputLogbookSdki').value = "D.0077";
      onSdkiChange("D.0077");
    }

    if (typeof window.openModal === 'function') {
      window.openModal('modalInputELogbook');
    }
  }

  function saveRecord(e) {
    if (e) e.preventDefault();

    const date = document.getElementById('inputLogbookDate')?.value;
    const time = document.getElementById('inputLogbookTime')?.value;
    const shift = document.getElementById('inputLogbookShift')?.value;
    const nurseName = document.getElementById('inputLogbookNurseName')?.value;
    const nurseNip = document.getElementById('inputLogbookNurseNip')?.value;
    const jenjangPk = document.getElementById('inputLogbookJenjangPk')?.value;
    const unit = document.getElementById('inputLogbookUnit')?.value;

    const patientRm = document.getElementById('inputLogbookPatientRm')?.value;
    const patientName = document.getElementById('inputLogbookPatientName')?.value;
    const patientAge = document.getElementById('inputLogbookPatientAge')?.value;
    const patientGender = document.getElementById('inputLogbookPatientGender')?.value;
    const bedNumber = document.getElementById('inputLogbookBedNumber')?.value;
    const diagnosaMedis = document.getElementById('inputLogbookDiagnosaMedis')?.value;

    const sdkiCode = document.getElementById('inputLogbookSdki')?.value;
    const slkiCode = document.getElementById('inputLogbookSlki')?.value;
    const sikiCode = document.getElementById('inputLogbookSiki')?.value;
    const tindakanType = document.getElementById('inputLogbookTindakanType')?.value;

    const soapS = document.getElementById('inputLogbookSoapS')?.value;
    const soapO = document.getElementById('inputLogbookSoapO')?.value;
    const soapA = document.getElementById('inputLogbookSoapA')?.value;
    const soapP = document.getElementById('inputLogbookSoapP')?.value;

    if (!nurseName || !nurseNip || !patientRm || !patientName || !sdkiCode) {
      if (typeof window.showToast === 'function') {
        window.showToast('Harap lengkapi data perawat, identitas pasien, dan diagnosis SDKI.', 'warning');
      } else {
        alert('Harap lengkapi data perawat, identitas pasien, dan diagnosis SDKI.');
      }
      return;
    }

    // Ambil tindakan yang dicentang
    const selectedActions = [];
    document.querySelectorAll('input[name="otekActions"]:checked').forEach(cb => {
      selectedActions.push(cb.value);
    });

    const sdkiObj = SDKI_LIBRARY.find(s => s.code === sdkiCode) || { title: sdkiCode };
    const slkiObj = SLKI_LIBRARY[slkiCode] || { title: slkiCode };
    const sikiObj = SIKI_LIBRARY[sikiCode] || { title: sikiCode };

    const newRecord = {
      id: "LOG-" + Date.now().toString().slice(-8),
      date: date || new Date().toISOString().split('T')[0],
      time: time || "08:00",
      shift: shift || "Pagi",
      nurseName: nurseName,
      nurseNip: nurseNip,
      jenjangPk: jenjangPk || "PK II",
      unit: unit || "Ruang Rawat Inap",
      patientRm: patientRm,
      patientName: patientName,
      patientAge: patientAge,
      patientGender: patientGender,
      bedNumber: bedNumber,
      diagnosaMedis: diagnosaMedis || "-",
      sdkiCode: sdkiCode,
      sdkiTitle: sdkiObj.title,
      slkiCode: slkiCode,
      slkiTitle: slkiObj.title,
      sikiCode: sikiCode,
      sikiTitle: sikiObj.title,
      actionsSelected: selectedActions,
      tindakanType: tindakanType || "Mandiri",
      soapS: soapS || "-",
      soapO: soapO || "-",
      soapA: soapA || "-",
      soapP: soapP || "-",
      isVerified: false,
      verifiedBy: null,
      verifiedAt: null
    };

    const records = getRecords();
    records.unshift(newRecord);
    saveRecordsToStorage(records);

    if (typeof window.closeModal === 'function') {
      window.closeModal('modalInputELogbook');
    }

    renderTable();
    renderMetrics();

    if (typeof window.showToast === 'function') {
      window.showToast(`E-Logbook Asuhan Pasien ${patientName} (${sdkiCode}) berhasil disimpan!`, 'success');
    }
  }

  // =========================================================================
  // 6. DETAIL VIEW & ACTIONS
  // =========================================================================
  function viewDetail(id) {
    const records = getRecords();
    const item = records.find(r => r.id === id);
    if (!item) return;

    const modalBody = document.getElementById('bodyDetailELogbook');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Nomor E-Logbook: ${item.id}</span>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-top: 2px;">
              ${item.patientName} (${item.patientAge} / ${item.patientGender || 'Pasien'}) - <span style="color: var(--primary-600);">${item.patientRm}</span>
            </h3>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">
              <i class="fa-solid fa-bed"></i> ${item.bedNumber} &bull; <i class="fa-solid fa-hospital"></i> ${item.unit}
            </div>
            <div style="font-size: 0.82rem; font-weight: 600; color: #0369a1; margin-top: 3px;">
              Diagnosa Medis: ${item.diagnosaMedis}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-main);">${item.date} &bull; ${item.time} WIB</div>
            <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; background: #e0f2fe; color: #0369a1; margin-top: 2px;">
              Shift ${item.shift}
            </span>
          </div>
        </div>
      </div>

      <!-- Ringkasan Standar 3S PPNI -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
        <div style="font-size: 0.75rem; font-weight: 800; color: var(--primary-700); text-transform: uppercase; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-diagram-project"></i> Penerapan Standar 3S PPNI (SDKI &rarr; SLKI &rarr; SIKI)
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
          <div style="background: #ffffff; border: 1px solid #fecaca; border-radius: 6px; padding: 0.75rem;">
            <span style="font-size: 0.7rem; font-weight: 800; background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 3px;">SDKI (Diagnosis)</span>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.85rem; margin-top: 4px;">[${item.sdkiCode}] ${item.sdkiTitle}</div>
          </div>
          <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 6px; padding: 0.75rem;">
            <span style="font-size: 0.7rem; font-weight: 800; background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 3px;">SLKI (Luaran)</span>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.85rem; margin-top: 4px;">[${item.slkiCode}] ${item.slkiTitle}</div>
          </div>
          <div style="background: #ffffff; border: 1px solid #c7d2fe; border-radius: 6px; padding: 0.75rem;">
            <span style="font-size: 0.7rem; font-weight: 800; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 3px;">SIKI (Intervensi)</span>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.85rem; margin-top: 4px;">[${item.sikiCode}] ${item.sikiTitle}</div>
          </div>
        </div>
      </div>

      <!-- Checklist Tindakan yang dilakukan -->
      <div style="margin-bottom: 1.25rem;">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-list-check" style="color: var(--primary-600);"></i> Tindakan Asuhan Keperawatan Terlaksana (${item.actionsSelected ? item.actionsSelected.length : 0} Tindakan):
        </div>
        <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.82rem; color: #334155; line-height: 1.6;">
          ${(item.actionsSelected && item.actionsSelected.length > 0) ? 
            item.actionsSelected.map(act => `<li style="margin-bottom: 3px;">${act}</li>`).join('') :
            '<li style="color: var(--text-muted); font-style: italic;">Tidak ada rincian tindakan spesifik.</li>'
          }
        </ul>
      </div>

      <!-- Catatan SOAP -->
      <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
        <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.65rem;">
          <i class="fa-solid fa-notes-medical" style="color: var(--primary-600);"></i> Catatan Perkembangan Terintegrasi (CPPT / SOAP)
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.82rem;">
          <div style="background: #f8fafc; padding: 0.5rem 0.75rem; border-radius: 4px; border-left: 3px solid #0284c7;">
            <strong style="color: #0284c7;">S (Subjektif):</strong>
            <p style="margin: 3px 0 0; color: #334155;">${item.soapS}</p>
          </div>
          <div style="background: #f8fafc; padding: 0.5rem 0.75rem; border-radius: 4px; border-left: 3px solid #16a34a;">
            <strong style="color: #16a34a;">O (Objektif):</strong>
            <p style="margin: 3px 0 0; color: #334155;">${item.soapO}</p>
          </div>
          <div style="background: #f8fafc; padding: 0.5rem 0.75rem; border-radius: 4px; border-left: 3px solid #d97706;">
            <strong style="color: #d97706;">A (Analisis / Asesmen):</strong>
            <p style="margin: 3px 0 0; color: #334155;">${item.soapA}</p>
          </div>
          <div style="background: #f8fafc; padding: 0.5rem 0.75rem; border-radius: 4px; border-left: 3px solid #7c3aed;">
            <strong style="color: #7c3aed;">P (Planning / Rencana Lanjut):</strong>
            <p style="margin: 3px 0 0; color: #334155;">${item.soapP}</p>
          </div>
        </div>
      </div>

      <!-- Kolom Pengesahan -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: #f1f5f9; padding: 0.75rem 1rem; border-radius: 6px; font-size: 0.8rem;">
        <div>
          <span style="color: var(--text-muted);">Perawat Pelaksana:</span>
          <div style="font-weight: 700; color: var(--text-main);">${item.nurseName} (${item.jenjangPk})</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">NIP. ${item.nurseNip}</div>
        </div>
        <div style="text-align: right;">
          <span style="color: var(--text-muted);">Status Pengesahan Karu:</span>
          <div>
            ${item.isVerified ? 
              `<span style="color: #166534; font-weight: 700;"><i class="fa-solid fa-circle-check"></i> Disahkan oleh ${item.verifiedBy || 'Karu'} (${item.verifiedAt || '-'})</span>` :
              `<span style="color: #d97706; font-weight: 700;"><i class="fa-solid fa-clock"></i> Belum Disahkan</span>`
            }
          </div>
        </div>
      </div>
    `;

    if (typeof window.openModal === 'function') {
      window.openModal('modalDetailELogbook');
    }
  }

  function verifyRecord(id) {
    const curUser = getActiveUser();
    const verifierName = curUser ? `${curUser.name} (${curUser.badge || 'Karu'})` : "Kepala Ruangan";

    const records = getRecords();
    const item = records.find(r => r.id === id);
    if (!item) return;

    item.isVerified = true;
    item.verifiedBy = verifierName;
    item.verifiedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);

    saveRecordsToStorage(records);
    renderTable();
    renderMetrics();

    if (typeof window.showToast === 'function') {
      window.showToast(`Asuhan E-Logbook ${item.id} berhasil diverifikasi & disahkan oleh ${verifierName}!`, 'success');
    }
  }

  function verifyBatch() {
    if (!canVerifyRecord()) {
      if (typeof window.showToast === 'function') {
        window.showToast('Fitur verifikasi massal hanya dapat diakses oleh Kepala Ruangan / Admin / Subkomite Mutu.', 'warning');
      }
      return;
    }

    const curUser = getActiveUser();
    const verifierName = curUser ? `${curUser.name} (${curUser.badge || 'Karu'})` : "Kepala Ruangan";
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const records = getRecords();
    let count = 0;
    records.forEach(r => {
      if (!r.isVerified) {
        r.isVerified = true;
        r.verifiedBy = verifierName;
        r.verifiedAt = nowStr;
        count++;
      }
    });

    if (count === 0) {
      if (typeof window.showToast === 'function') {
        window.showToast('Seluruh catatan E-Logbook saat ini sudah terverifikasi.', 'info');
      }
      return;
    }

    saveRecordsToStorage(records);
    renderTable();
    renderMetrics();

    if (typeof window.showToast === 'function') {
      window.showToast(`Berhasil mengesahkan ${count} catatan E-Logbook secara serentak!`, 'success');
    }
  }

  function deleteRecord(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus catatan E-Logbook asuhan ini?')) return;

    let records = getRecords();
    records = records.filter(r => r.id !== id);
    saveRecordsToStorage(records);

    renderTable();
    renderMetrics();

    if (typeof window.showToast === 'function') {
      window.showToast('Catatan E-Logbook berhasil dihapus.', 'info');
    }
  }

  // =========================================================================
  // 7. PRINT OFFICIAL A4 DOCUMENT
  // =========================================================================
  function openPrintModal() {
    const records = getRecords();
    const curUser = getActiveUser();
    const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const printContainer = document.getElementById('bodyPrintELogbook');
    if (!printContainer) return;

    const unitName = (curUser && curUser.unit) ? curUser.unit : "Ruang Perawatan Rawat Inap & Khusus";
    const nurseName = (curUser && curUser.name) ? curUser.name : "Ns. Rina Sartika, S.Kep";
    const nurseNip = (curUser && curUser.nip) ? curUser.nip : "000000000000000000";
    const jenjangPk = (curUser && curUser.jenjang) ? curUser.jenjang : "PK III";

    printContainer.innerHTML = `
      <div style="font-family: 'Times New Roman', serif; color: #000; line-height: 1.4; padding: 1.5rem;">
        
        <!-- Kop Resmi -->
        <div style="display: flex; align-items: center; justify-content: center; border-bottom: 3px double #000; padding-bottom: 0.75rem; margin-bottom: 1.25rem; gap: 1.25rem;">
          <img src="logo_kalbar.png" alt="Logo Pemprov Kalbar" style="width: 70px; height: auto;" onerror="this.style.display='none'">
          <div style="text-align: center;">
            <div style="font-size: 13pt; font-weight: bold; text-transform: uppercase;">PEMERINTAH PROVINSI KALIMANTAN BARAT</div>
            <div style="font-size: 15pt; font-weight: bold; text-transform: uppercase; color: #0b4f8a;">RSUD DOKTER SOEDARSO</div>
            <div style="font-size: 10pt; font-style: italic;">Jalan Dr. Soedarso No. 1, Pontianak 78124, Kalimantan Barat &bull; Telp. (0561) 737701</div>
            <div style="font-size: 11pt; font-weight: bold; margin-top: 3px; letter-spacing: 0.5px;">KOMITE KEPERAWATAN &bull; SUBKOMITE MUTU PROFESI</div>
          </div>
          <img src="logo_soedarso.png" alt="Logo RSUD Soedarso" style="width: 70px; height: auto;" onerror="this.style.display='none'">
        </div>

        <div style="text-align: center; margin-bottom: 1rem;">
          <h3 style="font-size: 13pt; font-weight: bold; text-decoration: underline; text-transform: uppercase; margin: 0;">
            LEMBAR LOGBOOK HARIAN ASUHAN KEPERAWATAN
          </h3>
          <div style="font-size: 10.5pt; font-weight: bold; margin-top: 2px;">
            STANDAR 3S: SDKI &bull; SLKI &bull; SIKI (DPP PPNI)
          </div>
          <div style="font-size: 9.5pt; color: #333; margin-top: 2px;">
            Bukti Portofolio Pelayanan Asuhan, Validasi CPPT, dan Pemenuhan SKP Kemenkes RI
          </div>
        </div>

        <!-- Metadata Perawat -->
        <table style="width: 100%; font-size: 10pt; margin-bottom: 1rem; border-collapse: collapse;">
          <tr>
            <td style="width: 22%; padding: 3px 0;"><strong>Nama Tenaga Perawat</strong></td>
            <td style="width: 2%;">:</td>
            <td style="width: 40%;">${nurseName}</td>
            <td style="width: 16%; padding: 3px 0;"><strong>Unit / Ruangan</strong></td>
            <td style="width: 2%;">:</td>
            <td style="width: 18%;">${unitName}</td>
          </tr>
          <tr>
            <td style="padding: 3px 0;"><strong>NIP / No. STR</strong></td>
            <td>:</td>
            <td>${nurseNip}</td>
            <td style="padding: 3px 0;"><strong>Jenjang Klinis</strong></td>
            <td>:</td>
            <td><strong>${jenjangPk}</strong></td>
          </tr>
          <tr>
            <td style="padding: 3px 0;"><strong>Periode Pelaporan</strong></td>
            <td>:</td>
            <td>${todayStr}</td>
            <td style="padding: 3px 0;"><strong>Total Pasien Dikelola</strong></td>
            <td>:</td>
            <td>${records.length} Pasien</td>
          </tr>
        </table>

        <!-- Tabel Catatan Logbook -->
        <table style="width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-bottom: 1.5rem;" border="1">
          <thead>
            <tr style="background-color: #f1f5f9; text-align: center;">
              <th style="padding: 6px; width: 30px;">No</th>
              <th style="padding: 6px; width: 75px;">Waktu / Shift</th>
              <th style="padding: 6px; width: 110px;">Pasien & No. RM</th>
              <th style="padding: 6px; width: 130px;">Diagnosa Medis</th>
              <th style="padding: 6px; width: 130px;">Diagnosis Keperawatan (SDKI)</th>
              <th style="padding: 6px; width: 120px;">Luaran Diharapkan (SLKI)</th>
              <th style="padding: 6px;">Intervensi & Tindakan OTEK (SIKI)</th>
              <th style="padding: 6px; width: 80px;">Verifikasi Karu</th>
            </tr>
          </thead>
          <tbody>
            ${records.map((r, i) => `
              <tr>
                <td style="text-align: center; padding: 5px;">${i + 1}</td>
                <td style="padding: 5px; text-align: center;">
                  <strong>${r.time}</strong><br>
                  Shift ${r.shift}
                </td>
                <td style="padding: 5px;">
                  <strong>${r.patientName}</strong> (${r.patientAge})<br>
                  <span style="font-family: monospace;">${r.patientRm}</span> &bull; ${r.bedNumber}
                </td>
                <td style="padding: 5px;">${r.diagnosaMedis}</td>
                <td style="padding: 5px;">
                  <strong>[${r.sdkiCode}]</strong> ${r.sdkiTitle}
                </td>
                <td style="padding: 5px;">
                  <strong>[${r.slkiCode}]</strong> ${r.slkiTitle}
                </td>
                <td style="padding: 5px;">
                  <strong>[${r.sikiCode}] ${r.sikiTitle}</strong>
                  <ul style="margin: 2px 0 0 14px; padding: 0; font-size: 8pt; line-height: 1.3;">
                    ${(r.actionsSelected && r.actionsSelected.length > 0) ? 
                      r.actionsSelected.slice(0, 3).map(a => `<li>${a}</li>`).join('') + (r.actionsSelected.length > 3 ? `<li><em>+ ${r.actionsSelected.length - 3} tindakan lainnya...</em></li>` : '') : 
                      '<li>Tindakan sesuai SOP</li>'
                    }
                  </ul>
                  <div style="font-size: 7.5pt; font-style: italic; margin-top: 2px; color: #444;">
                    Evaluasi: ${r.soapA}
                  </div>
                </td>
                <td style="text-align: center; padding: 5px;">
                  ${r.isVerified ? 
                    '<strong style="color: green;">SAH &#10004;</strong><br><span style="font-size: 7pt;">' + (r.verifiedBy ? r.verifiedBy.split(' ')[0] : 'Karu') + '</span>' : 
                    '<span style="color: #666; font-size: 7.5pt;">Menunggu</span>'
                  }
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Kolom Tanda Tangan Resmi -->
        <table style="width: 100%; border: none; font-size: 10pt; margin-top: 1.5rem; page-break-inside: avoid;">
          <tr>
            <td style="width: 33%; text-align: center;">
              <div>Mengetahui,</div>
              <div style="font-weight: bold; margin-bottom: 50px;">Ketua Subkomite Mutu Profesi</div>
              <div style="font-weight: bold; text-decoration: underline;">Ns. Rahmat Hidayat, S.Kep., M.Kep</div>
              <div>NIP. 000000000000000000</div>
            </td>
            <td style="width: 33%; text-align: center;">
              <div>Memverifikasi,</div>
              <div style="font-weight: bold; margin-bottom: 50px;">Kepala Ruangan / CI Klinis</div>
              <div style="font-weight: bold; text-decoration: underline;">Ns. Hendra Wijaya, S.Kep</div>
              <div>NIP. 000000000000000000</div>
            </td>
            <td style="width: 33%; text-align: center;">
              <div>Pontianak, ${todayStr}</div>
              <div style="font-weight: bold; margin-bottom: 50px;">Perawat Pelaksana / Pengusul</div>
              <div style="font-weight: bold; text-decoration: underline;">${nurseName}</div>
              <div>NIP. ${nurseNip}</div>
            </td>
          </tr>
        </table>

      </div>
    `;

    if (typeof window.openModal === 'function') {
      window.openModal('modalPrintELogbook');
    }
  }

  function printLogbook() {
    window.print();
  }

  // =========================================================================
  // 8. EXPORT CSV UNTUK PORTOFOLIO SKP / EXCEL
  // =========================================================================
  function exportCsv() {
    const records = getRecords();
    if (records.length === 0) {
      if (typeof window.showToast === 'function') {
        window.showToast('Tidak ada data E-Logbook untuk diekspor.', 'warning');
      }
      return;
    }

    const headers = [
      "No",
      "ID Logbook",
      "Tanggal",
      "Waktu",
      "Shift",
      "Nama Perawat",
      "NIP Perawat",
      "Jenjang PK",
      "Unit Ruangan",
      "No RM Pasien",
      "Nama Pasien",
      "Usia",
      "Gender",
      "Bed",
      "Diagnosa Medis",
      "Kode SDKI",
      "Diagnosis Keperawatan (SDKI)",
      "Kode SLKI",
      "Luaran (SLKI)",
      "Kode SIKI",
      "Intervensi (SIKI)",
      "Jumlah Tindakan OTEK",
      "Tipe Kewenangan",
      "SOAP_S",
      "SOAP_O",
      "SOAP_A",
      "SOAP_P",
      "Status Verifikasi",
      "Diverifikasi Oleh",
      "Waktu Verifikasi"
    ];

    const rows = records.map((r, idx) => [
      idx + 1,
      r.id,
      r.date,
      r.time,
      r.shift,
      `"${(r.nurseName || '').replace(/"/g, '""')}"`,
      `'${r.nurseNip}`,
      r.jenjangPk,
      `"${(r.unit || '').replace(/"/g, '""')}"`,
      r.patientRm,
      `"${(r.patientName || '').replace(/"/g, '""')}"`,
      r.patientAge,
      r.patientGender || '',
      r.bedNumber,
      `"${(r.diagnosaMedis || '').replace(/"/g, '""')}"`,
      r.sdkiCode,
      `"${(r.sdkiTitle || '').replace(/"/g, '""')}"`,
      r.slkiCode,
      `"${(r.slkiTitle || '').replace(/"/g, '""')}"`,
      r.sikiCode,
      `"${(r.sikiTitle || '').replace(/"/g, '""')}"`,
      r.actionsSelected ? r.actionsSelected.length : 0,
      r.tindakanType || 'Mandiri',
      `"${(r.soapS || '').replace(/"/g, '""')}"`,
      `"${(r.soapO || '').replace(/"/g, '""')}"`,
      `"${(r.soapA || '').replace(/"/g, '""')}"`,
      `"${(r.soapP || '').replace(/"/g, '""')}"`,
      r.isVerified ? "TERVERIFIKASI" : "PENDING",
      `"${(r.verifiedBy || '').replace(/"/g, '""')}"`,
      r.verifiedAt || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + 
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `E-Logbook_Asuhan_3S_RSUD_Soedarso_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (typeof window.showToast === 'function') {
      window.showToast('File CSV E-Logbook Asuhan (3S) berhasil diunduh untuk portofolio SKP Kemenkes / Excel.', 'success');
    }
  }

  // =========================================================================
  // 9. EVENT LISTENERS & INITIALIZATION
  // =========================================================================
  function setupEvents() {
    const shiftFilter = document.getElementById('filterLogbookShift');
    const unitFilter = document.getElementById('filterLogbookUnit');
    const statusFilter = document.getElementById('filterLogbookStatus');
    const searchInput = document.getElementById('searchLogbookInput');

    [shiftFilter, unitFilter, statusFilter].forEach(el => {
      if (el) el.addEventListener('change', renderTable);
    });

    if (searchInput) {
      searchInput.addEventListener('input', renderTable);
    }

    const sdkiSelect = document.getElementById('inputLogbookSdki');
    if (sdkiSelect) {
      sdkiSelect.addEventListener('change', (e) => onSdkiChange(e.target.value));
    }

    const sikiSelect = document.getElementById('inputLogbookSiki');
    if (sikiSelect) {
      sikiSelect.addEventListener('change', (e) => onSikiChange(e.target.value));
    }

    const form = document.getElementById('formInputELogbook');
    if (form) {
      form.addEventListener('submit', saveRecord);
    }
  }

  function onAuthChange() {
    renderTable();
    renderMetrics();
  }

  function init() {
    setupEvents();
    renderMetrics();
    renderTable();
    renderKatalog3S();
  }

  // Ekspor ke window global
  window.ELogbookKomkep = {
    init,
    onAuthChange,
    switchMutuSubtab,
    renderTable,
    renderMetrics,
    renderKatalog3S,
    openInputModal,
    onSdkiChange,
    onSikiChange,
    checkAllOtek,
    saveRecord,
    viewDetail,
    verifyRecord,
    verifyBatch,
    deleteRecord,
    openPrintModal,
    printLogbook,
    exportCsv
  };

  // Jalankan init setelah DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }

})();

