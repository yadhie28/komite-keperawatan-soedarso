/**
 * PORTAL SUBKOMITE MUTU PROFESI & E-LOGBOOK ASUHAN 3S (SDKI - SIKI - SLKI)
 * RSUD dr. Soedarso Pontianak
 * 
 * Diadopsi langsung dari desain & standar arsitektur:
 * https://komite-keperawatan-rsud-dr-soedarso.ai.studio/
 * 
 * Sub-Menu:
 * 3.1 Program CPD & Diklat Terpadu
 * 3.2 E-Logbook Asuhan 3S (Auto-Linkage Taksonomi PPNI)
 * 3.3 Dashboard OPPE & Audit Klinis (STARKES KKS 11)
 * 3.4 Katalog & Pencarian Database SDKI
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA PUSTAKA STANDAR RESMI 3S PPNI (30 SDKI DENGAN TAUTAN SIKI & SLKI)
  // =========================================================================
  const SDKI_CATALOG = [{code:"D.0001",name:"Bersihan Jalan Napas Tidak Efektif",category:"Fisiologis",subcategory:"Respirasi",definition:"Ketidakmampuan membersihkan sekret atau obstruksi jalan napas untuk mempertahankan jalan napas tetap paten.",commonEtiologies:["Spasme jalan napas & hipersekresi jalan napas","Disfungsi neuromuskular & sekresi tertahan","Benda asing dalam jalan napas","Adanya jalan napas buatan (ETT / Trakeostomi)"],recommendedSiki:{code:"I.01011",title:"Manajemen Jalan Napas",actionDetail:"Monitor pola napas, monitor sputum, posisikan semi-Fowler/Fowler, lakukan fisioterapi dada, lakukan penghisapan lendir (suction)"},alternativeSiki:[{code:"I.01014",title:"Penghisapan Jalan Napas (Suctioning)",actionDetail:"Auskultasi suara napas, gunakan teknik steril, hisap sekret < 15 detik, monitor saturasi O2"},{code:"I.01006",title:"Latihan Batuk Efektif",actionDetail:"Jelaskan tujuan dan prosedur, anjurkan tarik napas dalam 3 kali lalu batukkan dengan kuat"}],recommendedSlki:{code:"L.01001",title:"Bersihan Jalan Napas Meningkat",targetDetail:"Produksi sputum menurun, mengi/ronkhi menurun, frekuensi napas membaik (16-20x/m)"},alternativeSlki:[{code:"L.01004",title:"Pola Napas Membaik",targetDetail:"Dispnea menurun, penggunaan otot bantu napas menurun"}]},{code:"D.0003",name:"Gangguan Pertukaran Gas",category:"Fisiologis",subcategory:"Respirasi",definition:"Kelebihan atau kekurangan oksigenasi dan/atau eliminasi karbondioksida pada membran alveolus-kapiler.",commonEtiologies:["Ketidakseimbangan ventilasi-perfusi (PPOK, ARDS, Pneumonia)","Perubahan membran alveolus-kapiler"],recommendedSiki:{code:"I.01014",title:"Pemantauan Respirasi",actionDetail:"Monitor frekuensi, irama, kedalaman, saturasi oksigen SpO2 berkala, serta AGD (Analisa Gas Darah)"},alternativeSiki:[{code:"I.01026",title:"Terapi Oksigen",actionDetail:"Berikan oksigen tambahan via kanul nasal/NRM sesuai instruksi DPJP, periksa kepatenan alat"}],recommendedSlki:{code:"L.01003",title:"Pertukaran Gas Meningkat",targetDetail:"Tingkat kesadaran membaik, SpO2 ≥ 95%, AGD (pH, PaO2, PaCO2) dalam batas normal"}},{code:"D.0005",name:"Pola Napas Tidak Efektif",category:"Fisiologis",subcategory:"Respirasi",definition:"Inspirasi dan/atau ekspirasi yang tidak memberikan ventilasi adekuat.",commonEtiologies:["Hambatan upaya napas (nyeri saat bernapas, deformitas dinding dada)","Kecemasan / Hiperventilasi","Gangguan neurologis / Depresi pusat pernapasan"],recommendedSiki:{code:"I.01011",title:"Manajemen Jalan Napas & Pola Napas",actionDetail:"Posisikan semi-Fowler/Fowler, monitor status respirasi dan saturasi oksigen"},recommendedSlki:{code:"L.01004",title:"Pola Napas Membaik",targetDetail:"Frekuensi napas teratur (16-20x/menit), dispnea menurun, pernapasan cuping hidung tidak ada"}},{code:"D.0008",name:"Penurunan Curah Jantung",category:"Fisiologis",subcategory:"Sirkulasi",definition:"Ketidakadekuatan jantung memompa darah untuk memenuhi kebutuhan metabolisme tubuh.",commonEtiologies:["Perubahan irama jantung (aritmia)","Perubahan kontraktilitas miokard (Gagal Jantung Kongestif/CHF)","Perubahan afterload atau preload (hipertensi/hipovolemia)"],recommendedSiki:{code:"I.02075",title:"Perawatan Jantung",actionDetail:"Identifikasi tanda/gejala primer penurunan curah jantung, monitor EKG 12 lead, batasi asupan cairan dan garam"},alternativeSiki:[{code:"I.02076",title:"Perawatan Jantung Akut",actionDetail:"Pertahankan tirah baring posisi semi-Fowler, monitor saturasi O2, pasang akses IV"}],recommendedSlki:{code:"L.02008",title:"Curah Jantung Meningkat",targetDetail:"Kekuatan nadi perifer meningkat, edema menurun, dispnea menurun, tekanan darah stabil"}},{code:"D.0009",name:"Perfusi Perifer Tidak Efektif",category:"Fisiologis",subcategory:"Sirkulasi",definition:"Penurunan sirkulasi darah pada level kapiler yang dapat mengganggu metabolisme tubuh.",commonEtiologies:["Hiperglikemia / Diabetes Melitus","Penurunan konsentrasi hemoglobin (Anemia)","Hambatan aliran darah perifer (trombus, vasokonstriksi)"],recommendedSiki:{code:"I.02079",title:"Perawatan Sirkulasi Perifer",actionDetail:"Periksa sirkulasi perifer (nadi perifer, CRT, akral, warna kulit), hindari penekanan ekstremitas"},recommendedSlki:{code:"L.02011",title:"Perfusi Perifer Meningkat",targetDetail:"Denyut nadi perifer teraba kuat, warna kulit pucat menurun, CRT < 2 detik, akral hangat"}},{code:"D.0014",name:"Risiko Perdarahan",category:"Fisiologis",subcategory:"Sirkulasi",definition:"Beresiko mengalami kehilangan darah baik internal maupun eksternal.",commonEtiologies:["Aneurisma / Gangguan koagulasi (trombositopenia)","Tindakan pembedahan mayor / Trauma","Komplikasi pasca persalinan (atonia uteri / laserasi)"],recommendedSiki:{code:"I.02067",title:"Pencegahan Perdarahan",actionDetail:"Monitor tanda dan gejala perdarahan masif, monitor nilai hematokrit & hemoglobin, pertahankan akses IV"},recommendedSlki:{code:"L.02017",title:"Tingkat Perdarahan Menurun",targetDetail:"Tidak ada rembesan luka operasi, hemoglobin dan hematokrit stabil, tekanan darah normal"}},{code:"D.0019",name:"Defisit Nutrisi",category:"Fisiologis",subcategory:"Nutrisi dan Cairan",definition:"Asupan nutrisi tidak cukup untuk memenuhi kebutuhan metabolisme.",commonEtiologies:["Ketidakmampuan menelan / mencerna makanan (disfagia)","Peningkatan kebutuhan metabolisme (kanker, sepsis, luka bakar)","Faktor psikologis (keengganan untuk makan, mual muntah)"],recommendedSiki:{code:"I.03119",title:"Manajemen Nutrisi",actionDetail:"Identifikasi status nutrisi, monitor asupan makanan harian, berikan makanan tinggi kalori dan protein"},alternativeSiki:[{code:"I.03120",title:"Manajemen Gangguan Makan & Mual",actionDetail:"Identifikasi dampak mual terhadap nafsu makan, anjurkan porsi kecil tapi sering"}],recommendedSlki:{code:"L.03030",title:"Status Nutrisi Membaik",targetDetail:"Porsi makan yang dihabiskan meningkat, nafsu makan membaik, serum albumin dalam batas normal"}},{code:"D.0022",name:"Hipervolemia",category:"Fisiologis",subcategory:"Nutrisi dan Cairan",definition:"Peningkatan volume cairan intravaskular, interstisial, dan/atau intraselular.",commonEtiologies:["Gangguan mekanisme regulasi (gagal ginjal akut/kronis, sindrom nefrotik)","Kelebihan asupan cairan atau natrium","Gangguan aliran balik vena"],recommendedSiki:{code:"I.03114",title:"Manajemen Hipervolemia",actionDetail:"Periksa tanda/gejala hipervolemia (ortopnea, edema, JVP meningkat), timbang BB harian, batasi cairan"},recommendedSlki:{code:"L.03020",title:"Keseimbangan Cairan Meningkat",targetDetail:"Asupan dan haluaran cairan seimbang, edema perifer menurun, JVP dalam batas normal"}},{code:"D.0023",name:"Hipovolemia",category:"Fisiologis",subcategory:"Nutrisi dan Cairan",definition:"Penurunan volume cairan intravaskular, interstisial, dan/atau intraselular.",commonEtiologies:["Kehilangan cairan aktif (muntah masif, diare hebat, perdarahan)","Kegagalan mekanisme regulasi","Evaporasi meningkat (demam tinggi, luka bakar luas)"],recommendedSiki:{code:"I.03116",title:"Manajemen Hipovolemia",actionDetail:"Periksa tanda hipovolemia (frekuensi nadi meningkat, turgor kulit menurun, TD turun), berikan rehidrasi cairan IV isotonis"},recommendedSlki:{code:"L.03028",title:"Status Cairan Membaik",targetDetail:"Turgor kulit membaik, frekuensi nadi teratur dan kuat, produksi urin ≥ 0.5-1 cc/kgBB/jam, TD stabil"}},{code:"D.0027",name:"Ketidakstabilan Kadar Glukosa Darah",category:"Fisiologis",subcategory:"Nutrisi dan Cairan",definition:"Variasi kadar glukosa darah naik/turun dari rentang normal.",commonEtiologies:["Disfungsi pankreas / Diabetes Mellitus Tipe 1 & 2","Ketidakpatuhan manajemen diet dan obat antidiabetes/insulin","Stres fisiologis (infeksi, tindakan operatif)"],recommendedSiki:{code:"I.03115",title:"Manajemen Hiperglikemia / Hipoglikemia",actionDetail:"Monitor kadar glukosa darah berkala via POCT, identifikasi tanda klinis, kolaborasi pemberian insulin/Dextrose"},recommendedSlki:{code:"L.03022",title:"Kestabilan Kadar Glukosa Darah Meningkat",targetDetail:"Kadar glukosa darah puasa dan sewaktu dalam rentang target klinis (80-140 mg/dL), pusing menurun"}},{code:"D.0040",name:"Gangguan Eliminasi Urin",category:"Fisiologis",subcategory:"Eliminasi",definition:"Disfungsi eliminasi urin.",commonEtiologies:["Obstruksi saluran kemih (BPH, batu ginjal/vesika)","Penurunan tonus otot kandung kemih pasca anestesi"],recommendedSiki:{code:"I.04152",title:"Manajemen Eliminasi Urin",actionDetail:"Identifikasi tanda dan gejala retensi/inkontinensia, monitor frekuensi dan volume urine, pasang kateter foley jika diindikasikan"},recommendedSlki:{code:"L.04034",title:"Eliminasi Urin Membaik",targetDetail:"Sensasi berkemih membaik, desakan berkemih menurun, distensi kandung kemih menurun"}},{code:"D.0020",name:"Diare",category:"Fisiologis",subcategory:"Eliminasi",definition:"Pengeluaran feses yang sering, lunak dan tidak berbentuk.",commonEtiologies:["Proses infeksi gastrointestinal (bakteri/virus/parasit)","Efek samping obat (antibiotik)","Malabsorpsi makanan"],recommendedSiki:{code:"I.03101",title:"Manajemen Diare",actionDetail:"Identifikasi riwayat diare, monitor frekuensi dan konsistensi defekasi, berikan cairan oral/IV untuk cegah dehidrasi"},recommendedSlki:{code:"L.04033",title:"Eliminasi Fekal Membaik",targetDetail:"Konsistensi feses membaik, frekuensi defekasi normal (1-2x/hari), kram abdomen menurun"}},{code:"D.0049",name:"Konstipasi",category:"Fisiologis",subcategory:"Eliminasi",definition:"Penurunan frekuensi normal defekasi disertai kesulitan atau pengeluaran feses tidak tuntas.",commonEtiologies:["Penurunan motilitas gastrointestinal (tirah baring lama, pasca operasi)","Efek samping agen farmakologis (opioid/analgetik)","Kurang asupan serat dan cairan"],recommendedSiki:{code:"I.04155",title:"Manajemen Konstipasi",actionDetail:"Identifikasi faktor penyebab, anjurkan diet tinggi serat dan hidrasi cukup, anjurkan mobilisasi dini"},recommendedSlki:{code:"L.04033",title:"Eliminasi Fekal Membaik",targetDetail:"Defekasi lancar tanpa mengejan berlebih, konsistensi feses lunak"}},{code:"D.0054",name:"Gangguan Mobilitas Fisik",category:"Fisiologis",subcategory:"Aktivitas dan Istirahat",definition:"Keterbatasan dalam gerakan fisik dari satu atau lebih ekstremitas secara mandiri.",commonEtiologies:["Kerusakan integritas struktur tulang (fraktur, dislokasi)","Penurunan kekuatan otot (stroke/parese)","Nyeri pasca operasi / Terpasang gips atau traksi"],recommendedSiki:{code:"I.05173",title:"Dukungan Mobilisasi",actionDetail:"Identifikasi adanya nyeri, fasilitasi aktivitas mobilisasi dengan alat bantu, dampingi latihan rentang gerak (ROM)"},alternativeSiki:[{code:"I.05177",title:"Pengaturan Posisi",actionDetail:"Ubah posisi tidur miring kanan/kiri setiap 2 jam untuk mencegah luka tekan (dekubitus)"}],recommendedSlki:{code:"L.05042",title:"Mobilitas Fisik Meningkat",targetDetail:"Pergerakan ekstremitas meningkat, kekuatan otot meningkat, rentang gerak (ROM) meningkat"}},{code:"D.0055",name:"Gangguan Pola Tidur",category:"Fisiologis",subcategory:"Aktivitas dan Istirahat",definition:"Gangguan kualitas dan kuantitas waktu tidur akibat faktor eksternal.",commonEtiologies:["Hambatan lingkungan (kebisingan ruangan, pencahayaan, suhu)","Kurang kontrol tidur / Nyeri kronik atau akut","Kecemasan terkait rawat inap"],recommendedSiki:{code:"I.05174",title:"Dukungan Tidur",actionDetail:"Identifikasi pola aktivitas dan tidur, modifikasi lingkungan (redupkan lampu, batasi kebisingan ruang)"},recommendedSlki:{code:"L.05045",title:"Pola Tidur Membaik",targetDetail:"Keluhan sulit tidur menurun, keluhan sering terjaga menurun, istirahat cukup"}},{code:"D.0056",name:"Intoleransi Aktivitas",category:"Fisiologis",subcategory:"Aktivitas dan Istirahat",definition:"Ketidakcukupan energi untuk melakukan aktivitas sehari-hari.",commonEtiologies:["Ketidakseimbangan antara suplai dan kebutuhan oksigen","Kelemahan umum / Tirah baring lama"],recommendedSiki:{code:"I.05178",title:"Manajemen Energi",actionDetail:"Identifikasi gangguan fungsi tubuh yang mengakibatkan kelelahan, monitor kelelahan fisik, bantu aktivitas bertahap"},recommendedSlki:{code:"L.05047",title:"Toleransi Aktivitas Meningkat",targetDetail:"Kemudahan dalam melakukan aktivitas sehari-hari meningkat, keluhan lelah menurun, dispnea pasca aktivitas menurun"}},{code:"D.0079",name:"Nyeri Melahirkan",category:"Fisiologis",subcategory:"Reproduksi dan Seksualitas",definition:"Pengalaman sensorik atau emosional yang bervariasi dari menyenangkan sampai tidak menyenangkan yang berhubungan dengan persalinan.",commonEtiologies:["Dilatasi serviks dan iskemia uterus saat kontraksi kala I","Pengeluaran janin dan laserasi perineum kala II"],recommendedSiki:{code:"I.08242",title:"Manajemen Nyeri Persalinan",actionDetail:"Identifikasi tingkat nyeri dan kemajuan persalinan, ajarkan teknik relaksasi napas dalam dan pijat punggung (effleurage)"},recommendedSlki:{code:"L.08066",title:"Tingkat Nyeri Terkontrol",targetDetail:"Ibu mampu mengontrol nyeri saat his, ekspresi wajah tenang, koping persalinan positif"}},{code:"D.0029",name:"Menyusui Tidak Efektif",category:"Fisiologis",subcategory:"Reproduksi dan Seksualitas",definition:"Kondisi dimana ibu dan bayi mengalami ketidakpuasan atau kesulitan dalam proses menyusui.",commonEtiologies:["Ketidakadekuatan suplai ASI / Puting lecet atau terbenam","Kurang terpapar informasi teknik menyusui yang benar"],recommendedSiki:{code:"I.12393",title:"Edukasi Menyusui",actionDetail:"Ajarkan perlekatan mulut bayi ke payudara (latch-on), bimbing teknik pijat payudara dan laktasi"},recommendedSlki:{code:"L.03029",title:"Status Menyusui Membaik",targetDetail:"Perlekatan bayi pada payudara meningkat, kemampuan mengosongkan payudara membaik, kecemasan ibu menurun"}},{code:"D.0077",name:"Nyeri Akut",category:"Psikologis",subcategory:"Nyeri dan Kenyamanan",definition:"Pengalaman sensorik atau emosional yang berkaitan dengan kerusakan jaringan aktual atau fungsional, dengan onset mendadak atau lambat dan berintensitas ringan hingga berat yang berlangsung kurang dari 3 bulan.",commonEtiologies:["Agen pencedera fisik (prosedur operasi/trauma/luka bakar)","Agen pencedera fisiologis (inflamasi/iskemia/infark)","Agen pencedera kimiawi (bahan korosif/asam lambung)"],recommendedSiki:{code:"I.08238",title:"Manajemen Nyeri",actionDetail:"Identifikasi lokasi, karakteristik, durasi, frekuensi, kualitas, intensitas nyeri (PQRST), berikan teknik non-farmakologis (relaksasi napas dalam), kolaborasi analgetik"},alternativeSiki:[{code:"I.08243",title:"Pemberian Analgesik",actionDetail:"Identifikasi riwayat alergi obat, monitor tanda vital sebelum dan sesudah analgesik, dokumentasikan respon"},{code:"I.08247",title:"Terapi Relaksasi",actionDetail:"Ciptakan lingkungan tenang, demonstrasikan relaksasi otot progresif atau distraksi musik"}],recommendedSlki:{code:"L.08066",title:"Tingkat Nyeri Menurun",targetDetail:"Keluhan nyeri menurun (skor VAS ≤ 3), meringis menurun, sikap protektif menurun, gelisah menurun"},alternativeSlki:[{code:"L.08064",title:"Status Kenyamanan Meningkat",targetDetail:"Kesejahteraan fisik meningkat, pola eliminasi dan tidur rileks"}]},{code:"D.0078",name:"Nyeri Kronis",category:"Psikologis",subcategory:"Nyeri dan Kenyamanan",definition:"Pengalaman sensorik atau emosional yang berkaitan dengan kerusakan jaringan yang berlangsung lebih dari 3 bulan.",commonEtiologies:["Kondisi muskuloskeletal kronis (osteoarthritis, LBP kronis)","Infiltrasi tumor / Keganasan (Kanker stadium lanjut)"],recommendedSiki:{code:"I.08238",title:"Manajemen Nyeri Kronis",actionDetail:"Eksplorasi pengaruh nyeri pada kualitas hidup, fasilitasi teknik koping adaptif dan manajemen medikasi terjadwal"},recommendedSlki:{code:"L.08066",title:"Tingkat Nyeri Menurun",targetDetail:"Keluhan nyeri menurun, kemampuan menuntaskan aktivitas harian meningkat"}},{code:"D.0074",name:"Gangguan Rasa Nyaman",category:"Psikologis",subcategory:"Nyeri dan Kenyamanan",definition:"Perasaan kurang senang, lega, dan sempurna dalam dimensi fisik, psikosospiritual, lingkungan, serta sosial.",commonEtiologies:["Gejala penyakit (mual, gatal, spasme otot)","Ketidaksesuaian lingkungan rawat inap"],recommendedSiki:{code:"I.09326",title:"Manajemen Kenyamanan Lingkungan",actionDetail:"Ciptakan suasana ruangan yang nyaman, atur suhu ruangan dan kebersihan tempat tidur"},recommendedSlki:{code:"L.08064",title:"Status Kenyamanan Meningkat",targetDetail:"Keluhan tidak nyaman menurun, gelisah menurun, perasaan rileks meningkat"}},{code:"D.0080",name:"Ansietas",category:"Psikologis",subcategory:"Integritas Ego",definition:"Kondisi emosi dan pengalaman subyektif individu terhadap objek yang tidak jelas dan spesifik akibat antisipasi bahaya.",commonEtiologies:["Krisis situasional (akan menjalani tindakan operasi/kemoterapi)","Kekhawatiran mengalami kegagalan terapi atau prognosis buruk","Kurang terpapar informasi mengenai penyakit"],recommendedSiki:{code:"I.09314",title:"Reduksi Ansietas",actionDetail:"Identifikasi saat tingkat ansietas berubah, dengarkan dengan penuh perhatian, gunakan pendekatan yang tenang dan meyakinkan, jelaskan semua prosedur tindakan"},recommendedSlki:{code:"L.09093",title:"Tingkat Ansietas Menurun",targetDetail:"Verbalisasi khawatir akibat kondisi yang dihadapi menurun, perilaku gelisah menurun, tekanan darah dan nadi stabil"}},{code:"D.0109",name:"Defisit Perawatan Diri",category:"Psikologis",subcategory:"Kebersihan Diri",definition:"Tidak mampu melakukan atau menyelesaikan aktivitas perawatan diri (mandi, berpakaian, makan, toileting).",commonEtiologies:["Gangguan muskuloskeletal / Kelemahan ekstremitas","Penurunan motivasi / Nyeri berat","Kendala lingkungan / Terpasang alat invasif"],recommendedSiki:{code:"I.11348",title:"Dukungan Perawatan Diri: Mandi & Berpakaian",actionDetail:"Identifikasi tingkat kemandirian, sediakan lingkungan yang aman dan nyaman, bantu pemenuhan mandi di tempat tidur, jaga privasi pasien"},recommendedSlki:{code:"L.11103",title:"Perawatan Diri Meningkat",targetDetail:"Kemampuan mandi mandiri/terbantu meningkat, kebersihan diri terjaga, minat melakukan perawatan diri meningkat"}},{code:"D.0111",name:"Defisit Pengetahuan",category:"Perilaku",subcategory:"Penyuluhan dan Pembelajaran",definition:"Ketiadaan atau kurangnya informasi kognitif yang berkaitan dengan topik spesifik.",commonEtiologies:["Kurang terpapar informasi / Salah interpretasi informasi","Kurang minat dalam belajar / Keterbatasan kognitif"],recommendedSiki:{code:"I.12383",title:"Edukasi Kesehatan & Prosedur Tindakan",actionDetail:"Identifikasi kesiapan dan kemampuan menerima informasi, sediakan materi dan media pendidikan kesehatan, berikan kesempatan bertanya"},recommendedSlki:{code:"L.12111",title:"Tingkat Pengetahuan Meningkat",targetDetail:"Perilaku sesuai anjuran meningkat, verbalisasi minat dalam belajar meningkat, persepsi yang keliru menurun"}},{code:"D.0110",name:"Ketidakpatuhan",category:"Perilaku",subcategory:"Penyuluhan dan Pembelajaran",definition:"Perilaku individu dan/atau pemberi asuhan tidak mengikuti rencana perawatan/pengobatan yang disepakati.",commonEtiologies:["Ketidakadekuatan pemahaman rencana terapi","Hambatan finansial atau lingkungan","Kurang dukungan sistem pendukung (keluarga)"],recommendedSiki:{code:"I.12463",title:"Dukungan Kepatuhan Program Pengobatan",actionDetail:"Diskusikan alasan ketidakpatuhan, libatkan keluarga sebagai pengawas minum obat, buat jadwal minum obat yang praktis"},recommendedSlki:{code:"L.12110",title:"Tingkat Kepatuhan Meningkat",targetDetail:"Kepatuhan mengonsumsi obat sesuai instruksi meningkat, perilaku mengikuti program perawatan meningkat"}},{code:"D.0129",name:"Gangguan Integritas Kulit/Jaringan",category:"Lingkungan",subcategory:"Keamanan dan Proteksi",definition:"Kerusakan kulit (dermis dan/atau epidermis) atau jaringan (membran mukosa, kornea, fasia, otot, tendon, tulang, kartilago, kapsul sendi dan/atau ligamen).",commonEtiologies:["Tindakan pembedahan invasif (luka insisi operasi)","Penekanan pada tonjolan tulang (luka tekan/dekubitus)","Kelembaban berlebih (inkontinensia / maserasi)","Trauma fisik atau mekanik"],recommendedSiki:{code:"I.11353",title:"Perawatan Luka",actionDetail:"Monitor karakteristik luka (drainase, warna, ukuran, bau), bersihkan luka dengan cairan NaCl 0.9%, pasang balutan steril modern dressing, pertahankan teknik aseptik"},alternativeSiki:[{code:"I.11354",title:"Perawatan Integritas Kulit",actionDetail:"Ubah posisi tiap 2 jam, gunakan lotion pelembab pada area kering, jaga linen tetap kering dan bersih"}],recommendedSlki:{code:"L.14125",title:"Integritas Kulit dan Jaringan Meningkat",targetDetail:"Penyatuan jaringan luka membaik, kemerahan menurun, drainase/pus menurun, nekrosis menurun"}},{code:"D.0130",name:"Hipertermia",category:"Lingkungan",subcategory:"Keamanan dan Proteksi",definition:"Suhu tubuh meningkat di atas rentang normal tubuh.",commonEtiologies:["Proses infeksi sistemik atau lokal (sepsis, tifoid, pneumonia)","Dehidrasi","Terpapar lingkungan panas"],recommendedSiki:{code:"I.15506",title:"Manajemen Hipertermia",actionDetail:"Identifikasi penyebab hipertermia, monitor suhu tubuh tiap 2-4 jam, sediakan kompres hangat (tepid water sponge), kolaborasi pemberian antipiretik"},recommendedSlki:{code:"L.14134",title:"Termoregulasi Membaik",targetDetail:"Suhu tubuh kembali ke rentang normal (36.5 - 37.5°C), kulit merah menurun, takikardia menurun"}},{code:"D.0142",name:"Risiko Infeksi",category:"Lingkungan",subcategory:"Keamanan dan Proteksi",definition:"Beresiko mengalami peningkatan terserang organisme patogenik.",commonEtiologies:["Prosedur invasif (terpasang infus IV, kateter urin, CVC, drain bedah)","Kerusakan integritas kulit (luka operasi/trauma)","Penurunan imunitas tubuh (leukopenia/malnutrisi)"],recommendedSiki:{code:"I.14539",title:"Pencegahan Infeksi",actionDetail:"Terapkan kewaspadaan standar (kebersihan tangan 5 momen), rawat luka dengan teknik steril, batasi jumlah pengunjung, monitor tanda lokal infeksi (rubor, kalor, dolor, tumor, fungsiolesa)"},recommendedSlki:{code:"L.14137",title:"Tingkat Infeksi Menurun",targetDetail:"Tidak ada tanda kemerahan, demam, nanah/rembesan pada insisi atau tempat insersi kateter, leukosit darah normal"}},{code:"D.0143",name:"Risiko Jatuh",category:"Lingkungan",subcategory:"Keamanan dan Proteksi",definition:"Beresiko mengalami kerusakan fisik dan gangguan kesehatan akibat jatuh.",commonEtiologies:["Usia lanjut (≥ 65 tahun) atau anak-anak","Riwayat jatuh dalam 3 bulan terakhir","Penggunaan obat sedatif / anestesi / antihipertensi","Kondisi pasca operasi dengan penurunan kekuatan ekstremitas"],recommendedSiki:{code:"I.14540",title:"Pencegahan Jatuh",actionDetail:"Identifikasi faktor risiko jatuh (skala Morse / Humpty Dumpty), pasang gelang kuning penanda risiko jatuh, pasang pengaman tempat tidur (side rails), posisikan bed rendah terkunci"},recommendedSlki:{code:"L.14138",title:"Tingkat Jatuh Menurun",targetDetail:"Tidak terjadi insiden jatuh selama masa perawatan, kepatuhan pasien & keluarga terhadap rambu keselamatan 100%"}},{code:"D.0136",name:"Perlambatan Pemulihan Pascabedah",category:"Lingkungan",subcategory:"Keamanan dan Proteksi",definition:"Perpanjangan jumlah hari pascabedah yang dibutuhkan individu untuk memulai dan melakukan aktivitas mempertahankan hidup.",commonEtiologies:["Nyeri pascabedah tidak terkontrol","Imobilisasi lama","Infeksi luka operasi"],recommendedSiki:{code:"I.14558",title:"Perawatan Pasca Operasi (Post-Anesthesia Care)",actionDetail:"Monitor tanda vital, bimbing mobilisasi bertahap sesuai protokol ERAS, rawat luka operasi, kolaborasi nutrisi bertahap"},recommendedSlki:{code:"L.14129",title:"Pemulihan Pascabedah Meningkat",targetDetail:"Kemampuan mobilisasi dini meningkat, asupan makan oral membaik, toleransi aktivitas bertahap membaik"}}];

  
  // =========================================================================
  // 1.1 DATABASE MASTER STANDAR INTERVENSI KEPERAWATAN INDONESIA (SIKI - PPNI)
  // Taksonomi 5 Kategori & Subkategori DPP PPNI Edisi 1 Cetakan II
  // =========================================================================
  const SIKI_CATALOG = [
    // --- KAT 1: FISIOLOGIS (RESPIRASI) ---
    {
      code: "I.01011",
      title: "Manajemen Jalan Napas",
      category: "Fisiologis",
      subcategory: "Respirasi",
      actions: {
        observasi: "Monitor pola napas (frekuensi, kedalaman, usaha napas), monitor bunyi napas tambahan (mengi, wheezing, ronkhi), monitor sputum (jumlah, warna, aroma).",
        terapeutik: "Pertahankan kepatenan jalan napas, posisikan semi-Fowler atau Fowler, berikan minum hangat, lakukan fisioterapi dada jika perlu, lakukan penghisapan lendir < 15 detik, berikan oksigenasi.",
        edukasi: "Anjurkan asupan cairan 2000 ml/hari jika tidak ada kontraindikasi, ajarkan teknik batuk efektif.",
        kolaborasi: "Kolaborasi pemberian bronkodilator, ekspektoran, mukolitik jika diindikasikan."
      },
      actionDetail: "Monitor pola napas, posisikan semi-Fowler/Fowler, fisioterapi dada, suction steril < 15 detik, kolaborasi bronkodilator"
    },
    {
      code: "I.01014",
      title: "Pemantauan Respirasi",
      category: "Fisiologis",
      subcategory: "Respirasi",
      actions: {
        observasi: "Monitor frekuensi, irama, kedalaman dan upaya napas, monitor pola napas, monitor saturasi oksigen (SpO2), auskultasi bunyi napas, monitor AGD (Analisa Gas Darah).",
        terapeutik: "Atur interval pemantauan respirasi sesuai kondisi pasien, dokumentasikan hasil pemantauan.",
        edukasi: "Jelaskan tujuan dan prosedur pemantauan kepada pasien dan keluarga.",
        kolaborasi: "Laporkan hasil abnormal (SpO2 < 95%, takipnea > 24x/m) kepada DPJP."
      },
      actionDetail: "Monitor frekuensi, irama, kedalaman, saturasi oksigen SpO2 berkala, serta AGD (Analisa Gas Darah)"
    },
    {
      code: "I.01026",
      title: "Terapi Oksigen",
      category: "Fisiologis",
      subcategory: "Respirasi",
      actions: {
        observasi: "Monitor kecepatan aliran oksigen, monitor posisi alat terapi oksigen, monitor efektivitas terapi oksigen (SpO2, AGD).",
        terapeutik: "Bersihkan sekret pada mulut/hidung, pertahankan kepatenan jalan napas, siapkan peralatan dan berikan oksigen via nasal kanul/NRM.",
        edukasi: "Ajarkan pasien dan keluarga cara penggunaan oksigen yang aman dan hindari merokok/api.",
        kolaborasi: "Kolaborasi penentuan dosis dan fraksi oksigen (FiO2) bersama DPJP."
      },
      actionDetail: "Berikan oksigen tambahan via kanul nasal/NRM sesuai instruksi DPJP, periksa kepatenan alat"
    },
    {
      code: "I.01006",
      title: "Latihan Batuk Efektif",
      category: "Fisiologis",
      subcategory: "Respirasi",
      actions: {
        observasi: "Identifikasi kemampuan batuk, monitor adanya retensi sputum.",
        terapeutik: "Atur posisi semi-fowler atau fowler, pasang perlak dan bengkok di pangkuan pasien.",
        edukasi: "Jelaskan tujuan dan prosedur batuk efektif, anjurkan tarik napas dalam melalui hidung selama 4 detik lalu hembuskan, ulangi 3 kali lalu batukkan dengan kuat.",
        kolaborasi: "Kolaborasi pemberian mukolitik jika sputum kental."
      },
      actionDetail: "Jelaskan tujuan dan prosedur, anjurkan tarik napas dalam 3 kali lalu batukkan dengan kuat"
    },
    {
      code: "I.01020",
      title: "Penghisapan Jalan Napas (Suctioning)",
      category: "Fisiologis",
      subcategory: "Respirasi",
      actions: {
        observasi: "Identifikasi kebutuhan penghisapan jalan napas, auskultasi suara napas sebelum dan sesudah penghisapan, monitor status oksigenasi.",
        terapeutik: "Gunakan teknik steril, pasang kanul suction berdiameter sesuai, lakukan penghisapan tidak lebih dari 10-15 detik, berikan oksigenasi sebelum dan sesudah penghisapan.",
        edukasi: "Anjurkan bernapas dalam sebelum tindakan penghisapan dilakukan.",
        kolaborasi: "Kolaborasi pemeriksaan kultur sputum jika ada indikasi infeksi."
      },
      actionDetail: "Auskultasi suara napas, gunakan teknik steril, hisap sekret < 15 detik, monitor saturasi O2"
    },
    {
      code: "I.01004",
      title: "Fisioterapi Dada",
      category: "Fisiologis",
      subcategory: "Respirasi",
      actions: {
        observasi: "Identifikasi indikasi fisioterapi dada (retensi sputum luas), monitor status respirasi.",
        terapeutik: "Posisikan pasien postural drainage, lakukan perkusi (clapping) dengan telapak tangan menelungkup 3-5 menit, lakukan vibrasi dada saat fase ekspirasi.",
        edukasi: "Anjurkan batuk segera setelah prosedur selesai.",
        kolaborasi: "Kolaborasi nebulisasi sebelum fisioterapi dada."
      },
      actionDetail: "Lakukan postural drainage, perkusi dada 3-5 menit, dan vibrasi saat ekspirasi untuk mobilisasi sekret"
    },
    {
      code: "I.01013",
      title: "Manajemen Ventilasi Mekanik",
      category: "Fisiologis",
      subcategory: "Respirasi",
      actions: {
        observasi: "Monitor efek ventilator terhadap status kardiorespirasi, monitor ventilator setting (PEEP, FiO2, TV, RR, PIP) secara berkala, monitor kesesuaian ventilator dengan napas pasien.",
        terapeutik: "Atur posisi kepala 30-45 derajat untuk cegah VAP, lakukan oral hygiene dengan klorheksidin rutin, lakukan suctioning berkala.",
        edukasi: "Jelaskan pada keluarga mengenai fungsi dan tujuan ventilator.",
        kolaborasi: "Kolaborasi penyesuaian mode ventilator dan analisa gas darah (AGD)."
      },
      actionDetail: "Monitor setting ventilator, posisi kepala 30-45°, oral hygiene klorheksidin, pantau AGD dan cegah VAP"
    },
    {
      code: "I.01018",
      title: "Pencegahan Aspirasi",
      category: "Fisiologis",
      subcategory: "Respirasi",
      actions: {
        observasi: "Monitor tingkat kesadaran, status pernapasan, dan kemampuan menelan, periksa residu lambung sebelum pemberian nutrisi enteral.",
        terapeutik: "Pertahankan posisi semi-fowler atau fowler selama dan 30-60 menit setelah makan, pertahankan kepatenan jalan napas, siapkan alat suction di samping bed.",
        edukasi: "Anjurkan makan perlahan dan potong makanan dalam ukuran kecil.",
        kolaborasi: "Kolaborasi pemasangan NGT jika kemampuan menelan terganggu."
      },
      actionDetail: "Posisikan semi-Fowler saat makan, periksa residu lambung, siapkan suction, cegah aspirasi oral"
    },

    // --- KAT 1: FISIOLOGIS (SIRKULASI) ---
    {
      code: "I.02075",
      title: "Perawatan Jantung",
      category: "Fisiologis",
      subcategory: "Sirkulasi",
      actions: {
        observasi: "Identifikasi tanda/gejala primer penurunan curah jantung (dispnea, kelelahan, edema, ortopnea, PND, peningkatan CVP), monitor tekanan darah dan nadi, monitor intake-output cairan, monitor saturasi O2.",
        terapeutik: "Posisikan semi-Fowler/Fowler, berikan diet jantung bertahap, fasilitasi istirahat dan tidur, berikan oksigenasi untuk pertahankan saturasi > 94%.",
        edukasi: "Anjurkan beraktivitas fisik toleran secara bertahap, anjurkan berhenti merokok dan batasi garam.",
        kolaborasi: "Kolaborasi pemberian obat antiaritmia, inotropik, diuretik, nitrat sesuai instruksi DPJP."
      },
      actionDetail: "Identifikasi tanda penurunan curah jantung, monitor EKG 12 lead, batasi cairan/garam, berikan posisi semi-Fowler"
    },
    {
      code: "I.02076",
      title: "Perawatan Jantung Akut",
      category: "Fisiologis",
      subcategory: "Sirkulasi",
      actions: {
        observasi: "Identifikasi karakteristik nyeri dada (lokasi, radiasi, durasi, skala VAS), monitor EKG 12 sandapan untuk perubahan segmen ST dan gelombang T, monitor enzim jantung (Troponin I/T, CK-MB).",
        terapeutik: "Pertahankan tirah baring posisi semi-Fowler, pasang akses intravena, berikan terapi oksigen.",
        edukasi: "Anjurkan segera melapor jika nyeri dada bertambah berat atau menjalar ke lengan/leher.",
        kolaborasi: "Kolaborasi protokol MONA/FONA (Morfin, Oksigen, Nitrat, Aspirin/Clopidogrel)."
      },
      actionDetail: "Pertahankan tirah baring semi-Fowler, rekam EKG 12 lead, pasang IV line, pantau saturasi dan enzim jantung"
    },
    {
      code: "I.02079",
      title: "Perawatan Sirkulasi Perifer",
      category: "Fisiologis",
      subcategory: "Sirkulasi",
      actions: {
        observasi: "Periksa sirkulasi perifer (nadi perifer, capillary refill time / CRT, edema, warna kulit, suhu akral).",
        terapeutik: "Hindari pemasangan infus atau penekanan di area ekstremitas dengan keterbatasan perfusi, lakukan hidrasi cairan adekuat, jaga kehangatan kaki.",
        edukasi: "Anjurkan tidak menyilangkan kaki saat duduk, ajarkan senam kaki diabetik.",
        kolaborasi: "Kolaborasi pemberian vasodilator atau antikoagulan jika diindikasikan."
      },
      actionDetail: "Periksa sirkulasi perifer (nadi perifer, CRT, akral, warna kulit), hindari penekanan ekstremitas"
    },
    {
      code: "I.02067",
      title: "Pencegahan Perdarahan",
      category: "Fisiologis",
      subcategory: "Sirkulasi",
      actions: {
        observasi: "Monitor tanda dan gejala perdarahan masif, monitor nilai hematokrit dan hemoglobin berkala, monitor hasil koagulasi (PT, APTT, INR, trombosit).",
        terapeutik: "Pertahankan tirah baring selama perdarahan aktif, batasi tindakan invasif jika memungkinkan, hindari pengukuran suhu rektal.",
        edukasi: "Jelaskan tanda bahaya perdarahan (gusi berdarah, hematuria, melena, petekie), anjurkan gunakan sikat gigi lembut.",
        kolaborasi: "Kolaborasi pemberian produk darah (PRC/FFP/TC) atau asam traneksamat."
      },
      actionDetail: "Monitor tanda dan gejala perdarahan masif, monitor nilai hematokrit & hemoglobin, pertahankan akses IV"
    },
    {
      code: "I.02048",
      title: "Manajemen Syok",
      category: "Fisiologis",
      subcategory: "Sirkulasi",
      actions: {
        observasi: "Monitor status kardiopulmonal (frekuensi dan kekuatan nadi, frekuensi napas, TD, MAP), monitor tingkat kesadaran, monitor haluaran urin tiap jam.",
        terapeutik: "Pertahankan jalan napas paten, berikan terapi oksigen aliran tinggi, pasang 2 jalur IV kanul besar (16G/18G), posisikan shock position (kaki elevasi 20 derajat).",
        edukasi: "Beri penjelasan singkat dan tenangkan keluarga pasien.",
        kolaborasi: "Kolaborasi resusitasi cairan kristaloid cepat 20-30 ml/kgBB, titrasi vasopresor (Norepinefrin/Dopamin)."
      },
      actionDetail: "Pantau MAP dan perfusi, pasang IV line jarum besar, posisikan syok, resusitasi cairan kristaloid & vasopresor"
    },
    {
      code: "I.02083",
      title: "Resusitasi Jantung Paru (RJP / Code Blue)",
      category: "Fisiologis",
      subcategory: "Sirkulasi",
      actions: {
        observasi: "Identifikasi henti napas dan henti jantung, periksa respons dan cek pulsasi arteri karotis < 10 detik.",
        terapeutik: "Aktifkan Code Blue RS, lakukan kompresi dada kecepatan 100-120x/menit kedalaman 5-6 cm recoil penuh, minimalkan interupsi kompresi, siapkan defibrilator/AED.",
        edukasi: "Edukasi keluarga mengenai kondisi kegawatdaruratan.",
        kolaborasi: "Kolaborasi pemberian Epinefrin 1 mg IV tiap 3-5 menit, amiodaron pada refractory VF/pVT."
      },
      actionDetail: "Aktivasi Code Blue, kompresi dada berkualitas tinggi 100-120x/m, ventilasi bag-valve mask, defibrilasi dini"
    },
    {
      code: "I.02068",
      title: "Pemasangan Akses Intravena (Infus)",
      category: "Fisiologis",
      subcategory: "Sirkulasi",
      actions: {
        observasi: "Identifikasi vena yang tepat dan lurus, periksa kontraindikasi (fraktur, infeksi, fistula AV).",
        terapeutik: "Terapkan prinsip aseptik 'clean & safe', lakukan desinfeksi alkohol 70%/klorheksidin, insersi kanul IV sudut 15-30°, fiksasi dengan transparan dressing, catat tanggal insersi.",
        edukasi: "Jelaskan sensasi nyeri saat penusukan, anjurkan tidak membasahi area balutan.",
        kolaborasi: "Kolaborasi jenis dan kecepatan tetesan cairan infus bersama DPJP."
      },
      actionDetail: "Insersi kanul IV teknik aseptik, fiksasi transparan dressing steril, beri label tanggal pemasangan"
    },

    // --- KAT 1: FISIOLOGIS (NUTRISI DAN CAIRAN) ---
    {
      code: "I.03119",
      title: "Manajemen Nutrisi",
      category: "Fisiologis",
      subcategory: "Nutrisi dan Cairan",
      actions: {
        observasi: "Identifikasi status nutrisi, alergi makanan, preferensi makanan, asupan kalori dan zat gizi, monitor berat badan harian, monitor hasil lab (albumin, Hb).",
        terapeutik: "Lakukan kebersihan mulut sebelum makan, sajikan makanan menarik dan suhu sesuai, berikan makanan tinggi serat dan protein.",
        edukasi: "Anjurkan posisi duduk tegak saat makan, ajarkan diet yang diprogramkan.",
        kolaborasi: "Konsultasi ahli gizi mengenai kebutuhan kalori harian dan jenis diet khusus."
      },
      actionDetail: "Identifikasi status nutrisi, monitor asupan makanan harian, berikan makanan tinggi kalori dan protein"
    },
    {
      code: "I.03114",
      title: "Manajemen Hipervolemia",
      category: "Fisiologis",
      subcategory: "Nutrisi dan Cairan",
      actions: {
        observasi: "Periksa tanda dan gejala hipervolemia (ortopnea, edema, JVP meningkat, ronkhi basah basal), monitor intake dan output cairan, monitor berat badan harian.",
        terapeutik: "Timbang berat badan harian pada jam yang sama, batasi asupan cairan dan garam sesuai program, tinggikan kepala tempat tidur 30-40 derajat.",
        edukasi: "Ajarkan cara mengukur dan mencatat asupan cairan harian mandiri.",
        kolaborasi: "Kolaborasi pemberian diuretik (Furosemid) dan evaluasi kadar kalium serum."
      },
      actionDetail: "Periksa tanda/gejala hipervolemia (ortopnea, edema, JVP meningkat), timbang BB harian, batasi cairan"
    },
    {
      code: "I.03116",
      title: "Manajemen Hipovolemia",
      category: "Fisiologis",
      subcategory: "Nutrisi dan Cairan",
      actions: {
        observasi: "Periksa tanda hipovolemia (frekuensi nadi meningkat, denyut lemah, TD turun, turgor kulit menurun, bibir kering), monitor pengeluaran urin.",
        terapeutik: "Hitung kebutuhan cairan, berikan posisi nyaman, berikan asupan cairan oral jika memungkinkan.",
        edukasi: "Anjurkan memperbanyak asupan cairan oral sedikit demi sedikit tapi sering.",
        kolaborasi: "Kolaborasi pemberian cairan kristaloid isotonis IV (NaCl 0.9% atau Ringer Laktat)."
      },
      actionDetail: "Periksa tanda hipovolemia (frekuensi nadi meningkat, turgor kulit menurun, TD turun), berikan rehidrasi cairan IV isotonis"
    },
    {
      code: "I.03115",
      title: "Manajemen Hiperglikemia",
      category: "Fisiologis",
      subcategory: "Nutrisi dan Cairan",
      actions: {
        observasi: "Identifikasi kemungkinan penyebab hiperglikemia, monitor kadar glukosa darah berkala via POCT, monitor tanda gejala (poliuria, polidipsia, lemas).",
        terapeutik: "Berikan asupan cairan adekuat, hindari makanan manis/karbohidrat sederhana.",
        edukasi: "Ajarkan pengelolaan diet diabetes, edukasi pentingnya kepatuhan terapi insulin/OAD.",
        kolaborasi: "Kolaborasi pemberian insulin kerja cepat (Novorapid) atau basal sesuai sliding scale."
      },
      actionDetail: "Monitor kadar glukosa darah via POCT, periksa tanda ketoasidosis/hiperglikemia, kolaborasi titrasi insulin"
    },
    {
      code: "I.03115",
      title: "Manajemen Hipoglikemia",
      category: "Fisiologis",
      subcategory: "Nutrisi dan Cairan",
      actions: {
        observasi: "Identifikasi tanda dan gejala hipoglikemia (keringat dingin, tremor, pusing, takikardia, gelisah), cek kadar glukosa darah POCT segera.",
        terapeutik: "Berikan karbohidrat sederhana oral (air gula/teh manis) jika sadar, berikan posisi aman.",
        edukasi: "Ajarkan pasien mengenali gejala awal hipoglikemia dan selalu membawa permen/gula.",
        kolaborasi: "Kolaborasi pemberian Dextrose 40% (D40) 25-50 ml bolus IV jika pasien mengalami penurunan kesadaran."
      },
      actionDetail: "Identifikasi tremor & keringat dingin, cek GDS cito, berikan glukosa oral / D40 bolus IV bila tidak sadar"
    },
    {
      code: "I.03120",
      title: "Manajemen Gangguan Makan & Mual",
      category: "Fisiologis",
      subcategory: "Nutrisi dan Cairan",
      actions: {
        observasi: "Identifikasi dampak mual terhadap nafsu makan dan asupan nutrisi, monitor frekuensi dan volume muntah.",
        terapeutik: "Kendalikan faktor lingkungan penyebab mual (bau menyengat, pemandangan kotor), anjurkan makan porsi kecil tapi sering.",
        edukasi: "Anjurkan istirahat dan tidur yang cukup, anjurkan kumur air hangat setelah muntah.",
        kolaborasi: "Kolaborasi pemberian antiemetik (Ondansetron/Metoklopramid)."
      },
      actionDetail: "Identifikasi dampak mual terhadap nafsu makan, anjurkan porsi kecil tapi sering, kolaborasi antiemetik"
    },
    {
      code: "I.03098",
      title: "Manajemen Cairan & Elektrolit",
      category: "Fisiologis",
      subcategory: "Nutrisi dan Cairan",
      actions: {
        observasi: "Monitor status hidrasi (turgor, mukosa, nadi, CRT), catat intake dan output cairan, hitung balance cairan per 24 jam.",
        terapeutik: "Atur kecepatan tetesan infus sesuai instruksi DPJP, sediakan cairan yang disukai.",
        edukasi: "Jelaskan pentingnya menjaga keseimbangan cairan tubuh.",
        kolaborasi: "Kolaborasi pemeriksaan elektrolit serum (Natrium, Kalium, Klorida) berkala."
      },
      actionDetail: "Hitung balance cairan 24 jam, monitor turgor dan CRT, kolaborasi pemeriksaan elektrolit darah"
    },
    {
      code: "I.03138",
      title: "Terapi Hemodialisis",
      category: "Fisiologis",
      subcategory: "Nutrisi dan Cairan",
      actions: {
        observasi: "Monitor tanda vital pre, intra, dan post hemodialisis, monitor kepatenan akses vaskular (bruit & thrill AV Shunt / kateter double lumen).",
        terapeutik: "Lakukan kanulasi fistula atau desinfeksi exit site CDL dengan teknik steril ketat, atur ultrafiltrasi rate (UF) dan blood flow (Qb) sesuai resep HD.",
        edukasi: "Anjurkan pembatasan cairan interdialisis (kenaikan BB < 5% kering), edukasi perawatan akses vaskular di rumah.",
        kolaborasi: "Kolaborasi pemberian antikoagulan (Heparin), eritropoietin (EPO), dan suplemen zat besi."
      },
      actionDetail: "Pantau tanda vital peri-HD, periksa bruit & thrill AV Shunt, kanulasi steril, atur UF rate dan QB"
    },

    // --- KAT 1: FISIOLOGIS (ELIMINASI) ---
    {
      code: "I.04152",
      title: "Manajemen Eliminasi Urin",
      category: "Fisiologis",
      subcategory: "Eliminasi",
      actions: {
        observasi: "Identifikasi tanda dan gejala retensi atau inkontinensia urin, monitor frekuensi, konsistensi, aroma, volume, dan warna urin.",
        terapeutik: "Catat waktu dan haluaran berkemih, sediakan privasi saat berkemih, stimulasi refleks berkemih dengan kompres hangat suprapubik.",
        edukasi: "Ajarkan tanda dan gejala infeksi saluran kemih (ISK), anjurkan minum air putih cukup.",
        kolaborasi: "Kolaborasi pemasangan kateter urin jika terjadi distensi kandung kemih masif."
      },
      actionDetail: "Identifikasi tanda retensi/inkontinensia, monitor frekuensi dan volume urine, pasang kateter jika diindikasikan"
    },
    {
      code: "I.04148",
      title: "Kateterisasi Urine",
      category: "Fisiologis",
      subcategory: "Eliminasi",
      actions: {
        observasi: "Periksa indikasi pemasangan kateter urine (retensi urin, pemantauan output ketat, perioperatif).",
        terapeutik: "Siapkan peralatan steril, pasang sarung tangan steril, bersihkan meatus uretra dengan antiseptik, insersi foley catheter dengan jelly pelumas, isi balon fiksasi 10-20 ml akuades steril, fiksasi pada paha, gantung urine bag di bawah level kandung kemih.",
        edukasi: "Jelaskan prosedur pemasangan, anjurkan menarik napas dalam saat kateter dimasukkan, anjurkan tidak menarik selang kateter.",
        kolaborasi: "Kolaborasi pengosongan bertahap jika urin retensi > 750 ml untuk hindari hipotensi dekompresi."
      },
      actionDetail: "Pemasangan foley catheter teknik steril, fiksasi di paha, pastikan urine bag selalu di bawah bed"
    },
    {
      code: "I.04155",
      title: "Manajemen Konstipasi",
      category: "Fisiologis",
      subcategory: "Eliminasi",
      actions: {
        observasi: "Identifikasi faktor penyebab (imobilitas, asupan serat rendah, obat analgetik opioid), periksa bising usus dan konsistensi feses.",
        terapeutik: "Anjurkan diet tinggi serat dan hidrasi cukup (2-3 liter/hari), anjurkan mobilisasi aktif sesuai toleransi, fasilitasi posisi defekasi yang nyaman.",
        edukasi: "Jelaskan penyebab konstipasi dan pentingnya tidak menahan BAB.",
        kolaborasi: "Kolaborasi pemberian laksatif oral (Dulcolax/Lactulose) atau supositoria/klisma."
      },
      actionDetail: "Identifikasi faktor penyebab, anjurkan diet tinggi serat dan hidrasi cukup, anjurkan mobilisasi dini"
    },
    {
      code: "I.03101",
      title: "Manajemen Diare",
      category: "Fisiologis",
      subcategory: "Eliminasi",
      actions: {
        observasi: "Identifikasi riwayat diare, monitor frekuensi, konsistensi, warna, dan lendir/darah pada feses, monitor tanda dehidrasi.",
        terapeutik: "Berikan cairan rehidrasi oral (oralit), bersihkan area perianal dan berikan salep pelindung untuk cegah maserasi kulit.",
        edukasi: "Anjurkan makan makanan bertekstur lunak dan tidak berminyak, anjurkan menghindari susu dan kafein sementara.",
        kolaborasi: "Kolaborasi pemberian obat antidiare, zink, atau antimikroba sesuai indikasi."
      },
      actionDetail: "Identifikasi riwayat diare, monitor frekuensi dan konsistensi defekasi, berikan cairan oral/IV untuk cegah dehidrasi"
    },

    // --- KAT 1: FISIOLOGIS (AKTIVITAS DAN ISTIRAHAT) ---
    {
      code: "I.05173",
      title: "Dukungan Mobilisasi",
      category: "Fisiologis",
      subcategory: "Aktivitas dan Istirahat",
      actions: {
        observasi: "Identifikasi adanya nyeri atau keluhan fisik lainnya, identifikasi toleransi fisik melakukan pergerakan, monitor tanda vital sebelum memulai mobilisasi.",
        terapeutik: "Fasilitasi aktivitas mobilisasi dengan alat bantu, dampingi latihan rentang gerak (ROM), libatkan keluarga untuk membantu pasien dalam meningkatkan pergerakan.",
        edukasi: "Jelaskan tujuan dan prosedur mobilisasi, ajarkan mobilisasi bertahap (miring kanan-kiri, duduk bersandar, duduk menjuntai, berdiri, berjalan).",
        kolaborasi: "Konsultasi ke fisioterapis/rehabilitasi medik jika diperlukan penanganan khusus."
      },
      actionDetail: "Identifikasi adanya nyeri, fasilitasi aktivitas mobilisasi dengan alat bantu, dampingi latihan rentang gerak (ROM)"
    },
    {
      code: "I.05178",
      title: "Manajemen Energi",
      category: "Fisiologis",
      subcategory: "Aktivitas dan Istirahat",
      actions: {
        observasi: "Identifikasi gangguan fungsi tubuh yang mengakibatkan kelelahan, monitor kelelahan fisik dan emosional, monitor respon kardiovaskular terhadap aktivitas.",
        terapeutik: "Sediakan lingkungan yang tenang dan minim stimulus, lakukan aktivitas perawatan harian secara bertahap, fasilitasi istirahat di antara aktivitas.",
        edukasi: "Anjurkan tirah baring saat lelah, ajarkan teknik konservasi energi (duduk saat mandi/berpakaian).",
        kolaborasi: "Kolaborasi dengan ahli gizi untuk meningkatkan asupan makanan penghasil energi."
      },
      actionDetail: "Identifikasi gangguan fungsi tubuh yang mengakibatkan kelelahan, monitor kelelahan fisik, bantu aktivitas bertahap"
    },
    {
      code: "I.05174",
      title: "Dukungan Tidur",
      category: "Fisiologis",
      subcategory: "Aktivitas dan Istirahat",
      actions: {
        observasi: "Identifikasi pola aktivitas dan tidur, identifikasi faktor pengganggu tidur (nyeri, kebisingan bangsal, pencahayaan, cemas).",
        terapeutik: "Modifikasi lingkungan (redupkan lampu, batasi kebisingan ruang, atur suhu ruangan), tetapkan jadwal tidur rutin, fasilitasi tindakan relaksasi sebelum tidur.",
        edukasi: "Jelaskan pentingnya tidur cukup bagi pemulihan organ tubuh, anjurkan menghindari konsumsi kafein malam hari.",
        kolaborasi: "Kolaborasi pemberian sedatif ringan jika diinstruksikan oleh DPJP."
      },
      actionDetail: "Identifikasi pola aktivitas dan tidur, modifikasi lingkungan (redupkan lampu, batasi kebisingan ruang)"
    },
    {
      code: "I.05177",
      title: "Pengaturan Posisi",
      category: "Fisiologis",
      subcategory: "Aktivitas dan Istirahat",
      actions: {
        observasi: "Monitor status sirkulasi dan integritas kulit sebelum dan setelah perubahan posisi.",
        terapeutik: "Atur posisi tidur yang nyaman, atur posisi untuk mengurangi sesak napas (Fowler/semi-Fowler), ubah posisi tidur miring kanan/kiri setiap 2 jam untuk cegah decubitus, pasang bantal penopang.",
        edukasi: "Ajarkan pasien dan keluarga cara mengubah posisi tubuh di tempat tidur secara bertahap.",
        kolaborasi: "Gunakan kasur dekubitus (air mattress) pada pasien tirah baring lama."
      },
      actionDetail: "Ubah posisi tidur miring kanan/kiri setiap 2 jam untuk mencegah luka tekan (dekubitus)"
    },

    // --- KAT 1: FISIOLOGIS (NEUROSENSORI & REPRODUKSI) ---
    {
      code: "I.06198",
      title: "Manajemen Peningkatan Tekanan Intrakranial (TIK)",
      category: "Fisiologis",
      subcategory: "Neurosensori",
      actions: {
        observasi: "Identifikasi penyebab peningkatan TIK, monitor tanda trias Cushing (hipertensi bradikardia pernapasan ireguler), monitor GCS dan refleks pupil, monitor muntah proyektil.",
        terapeutik: "Pertahankan posisi kepala dan leher netral dengan elevasi kepala 30 derajat, hindari fleksi leher dan manuver Valsava, pertahankan PaCO2 35-40 mmHg.",
        edukasi: "Anjurkan tidak batuk mengejan berlebihan.",
        kolaborasi: "Kolaborasi pemberian diuretik osmotik (Manitol 20%) atau cairan hipertonis NaCl 3%."
      },
      actionDetail: "Elevasi kepala 30°, leher posisi netral, pantau GCS & refleks pupil, kolaborasi pemberian Manitol"
    },
    {
      code: "I.06197",
      title: "Pemantauan Neurologis",
      category: "Fisiologis",
      subcategory: "Neurosensori",
      actions: {
        observasi: "Monitor ukuran, bentuk, kesimetrisan, dan reaksi pupil terhadap cahaya, monitor tingkat kesadaran GCS (Eye, Verbal, Motorik), monitor kekuatan motorik 4 ekstremitas.",
        terapeutik: "Tingkatkan frekuensi pemantauan neurologis jika terdapat tanda perburukan kesadaran.",
        edukasi: "Jelaskan tujuan dan prosedur pemeriksaan kepada keluarga pasien.",
        kolaborasi: "Laporkan segera penurunan skor GCS ≥ 2 poin kepada dokter bedah saraf/neurolog."
      },
      actionDetail: "Pantau berkala tingkat kesadaran GCS, ukuran & refleks pupil, serta motorik ekstremitas bilateral"
    },
    {
      code: "I.07224",
      title: "Perawatan Intrapartum (Persalinan)",
      category: "Fisiologis",
      subcategory: "Reproduksi dan Seksualitas",
      actions: {
        observasi: "Monitor denyut jantung janin (DJJ) berkala via doppler/CTG, monitor kontraksi uterus (his: frekuensi, durasi, intensitas), periksa kemajuan persalinan (VT pembukaan & penurunan).",
        terapeutik: "Fasilitasi posisi bersalin yang nyaman, pimpin meneran saat pembukaan lengkap kala II, lakukan manajemen aktif kala III (injeksi Oksitosin 10 IU IM, PTT, masase fundus uteri).",
        edukasi: "Ajarkan teknik pernapasan tiup-tiup saat his berlangsung.",
        kolaborasi: "Kolaborasi penanganan laserasi perineum atau distosia persalinan."
      },
      actionDetail: "Monitor his & DJJ, dampingi meneran kala II, lakukan manajemen aktif kala III (Oksitosin 10 IU IM)"
    },
    {
      code: "I.08242",
      title: "Manajemen Nyeri Persalinan",
      category: "Fisiologis",
      subcategory: "Reproduksi dan Seksualitas",
      actions: {
        observasi: "Identifikasi tingkat nyeri dan kemajuan persalinan, monitor tanda vital ibu dan janin.",
        terapeutik: "Lakukan masase sakrum/effleurage punggung, dampingi relaksasi pernapasan saat his, fasilitasi pendampingan suami/keluarga.",
        edukasi: "Jelaskan fisiologi kontraksi persalinan sebagai proses alami pembukaan jalan lahir.",
        kolaborasi: "Kolaborasi pemberian analgetik epidural jika diindikasikan."
      },
      actionDetail: "Identifikasi tingkat nyeri dan kemajuan persalinan, ajarkan teknik relaksasi napas dalam dan pijat punggung (effleurage)"
    },
    {
      code: "I.12393",
      title: "Edukasi Menyusui & Konseling Laktasi",
      category: "Fisiologis",
      subcategory: "Reproduksi dan Seksualitas",
      actions: {
        observasi: "Identifikasi kesiapan dan kemampuan ibu menerima informasi, periksa bentuk puting dan kondisi payudara.",
        terapeutik: "Bimbing posisi dan perlekatan yang tepat (latch-on: mulut bayi terbuka lebar mencakup areola), lakukan pijat oksitosin.",
        edukasi: "Jelaskan manfaat ASI eksklusif 6 bulan, ajarkan teknik memerah dan menyimpan ASI perah yang higienis.",
        kolaborasi: "Rujuk ke konselor laktasi rumah sakit jika terdapat kesulitan menyusui."
      },
      actionDetail: "Ajarkan perlekatan mulut bayi ke payudara (latch-on), bimbing teknik pijat payudara dan laktasi"
    },

    // --- KAT 2: PSIKOLOGIS (NYERI & KENYAMANAN, INTEGRITAS EGO) ---
    {
      code: "I.08238",
      title: "Manajemen Nyeri",
      category: "Psikologis",
      subcategory: "Nyeri dan Kenyamanan",
      actions: {
        observasi: "Identifikasi lokasi, karakteristik, durasi, frekuensi, kualitas, intensitas nyeri (PQRST), identifikasi skala nyeri (VAS / NRS / Wong-Baker), monitor respons nyeri non-verbal.",
        terapeutik: "Berikan teknik non-farmakologis untuk mengurangi nyeri (relaksasi napas dalam, terapi musik, kompres hangat/dingin), kontrol lingkungan yang memperberat nyeri (suhu, pencahayaan, kebisingan), fasilitasi istirahat tidur.",
        edukasi: "Jelaskan penyebab dan periode nyeri, ajarkan teknik relaksasi napas dalam saat serangan nyeri timbul.",
        kolaborasi: "Kolaborasi pemberian analgesik (NSAID, Parasetamol, atau Opioid) sesuai instruksi DPJP."
      },
      actionDetail: "Identifikasi lokasi, karakteristik, durasi, frekuensi, kualitas, intensitas nyeri (PQRST), berikan teknik non-farmakologis (relaksasi napas dalam), kolaborasi analgetik"
    },
    {
      code: "I.08243",
      title: "Pemberian Analgesik",
      category: "Psikologis",
      subcategory: "Nyeri dan Kenyamanan",
      actions: {
        observasi: "Identifikasi riwayat alergi obat, identifikasi kesesuaian jenis analgesik dengan tingkat keparahan nyeri, monitor tanda vital sebelum dan sesudah analgesik, pantau efek samping (mual, depresi napas).",
        terapeutik: "Terapkan prinsip 7 Benar pemberian obat, dokumentasikan respons efektivitas terapi analgesik pada lembar CPPT/EWS.",
        edukasi: "Jelaskan efek terapi dan potensi rasa kantuk setelah pemberian analgesik.",
        kolaborasi: "Kolaborasi penyesuaian dosis atau rute pemberian analgesik dengan DPJP."
      },
      actionDetail: "Identifikasi riwayat alergi obat, monitor tanda vital sebelum dan sesudah analgesik, dokumentasikan respon"
    },
    {
      code: "I.08247",
      title: "Terapi Relaksasi",
      category: "Psikologis",
      subcategory: "Nyeri dan Kenyamanan",
      actions: {
        observasi: "Identifikasi tingkat ketegangan otot dan kemampuan berkonsentrasi, monitor respons terhadap terapi relaksasi.",
        terapeutik: "Ciptakan lingkungan tenang dan tanpa gangguan dengan pencahayaan redup, gunakan nada suara lembut, demonstrasikan dan latih teknik relaksasi napas dalam atau relaksasi otot progresif.",
        edukasi: "Anjurkan mengambil posisi nyaman, anjurkan sering mengulangi teknik relaksasi secara mandiri.",
        kolaborasi: "Kombinasikan dengan aromaterapi atau musik instrumental penenang."
      },
      actionDetail: "Ciptakan lingkungan tenang, demonstrasikan relaksasi otot progresif atau distraksi musik"
    },
    {
      code: "I.09326",
      title: "Manajemen Kenyamanan Lingkungan",
      category: "Psikologis",
      subcategory: "Nyeri dan Kenyamanan",
      actions: {
        observasi: "Identifikasi sumber ketidaknyamanan lingkungan seperti kebisingan, suhu yang terlalu panas/dingin, bau ruangan, atau kasur yang kotor.",
        terapeutik: "Atur suhu ruangan yang nyaman, rapikan tempat tidur dan ganti linen yang kotor/basah secara berkala, batasi kunjungan pasien saat jam istirahat.",
        edukasi: "Jelaskan pentingnya suasana tenang dan nyaman bagi proses penyembuhan pasien.",
        kolaborasi: "Koordinasi dengan petugas kebersihan dan logistik ruangan."
      },
      actionDetail: "Ciptakan suasana ruangan yang nyaman, atur suhu ruangan dan kebersihan tempat tidur"
    },
    {
      code: "I.09314",
      title: "Reduksi Ansietas",
      category: "Psikologis",
      subcategory: "Integritas Ego",
      actions: {
        observasi: "Identifikasi saat tingkat ansietas berubah (menjelang operasi/prosedur diagnostik), monitor tanda ansietas verbal dan nonverbal (gelisah, takikardia, tremor).",
        terapeutik: "Ciptakan suasana terapeutik untuk menumbuhkan kepercayaan, temani pasien untuk mengurangi kecemasan, dengarkan keluhan dengan penuh perhatian, gunakan pendekatan yang tenang dan meyakinkan.",
        edukasi: "Jelaskan semua prosedur tindakan termasuk sensasi yang mungkin dialami, dampingi keluarga untuk tetap bersama pasien.",
        kolaborasi: "Kolaborasi pemberian obat antiansietas jika kecemasan ekstrem mengganggu tindakan medis."
      },
      actionDetail: "Identifikasi saat tingkat ansietas berubah, dengarkan dengan penuh perhatian, gunakan pendekatan yang tenang dan meyakinkan, jelaskan semua prosedur tindakan"
    },
    {
      code: "I.09315",
      title: "Dukungan Emosional",
      category: "Psikologis",
      subcategory: "Integritas Ego",
      actions: {
        observasi: "Identifikasi fungsi marah, frustrasi, atau rasa bersalah bagi pasien, identifikasi pemicu emosi.",
        terapeutik: "Fasilitasi mengungkapkan perasaan cemas, takut, atau sedih, berikan kehadiran yang menenangkan, berikan pernyataan suportif tanpa menghakimi.",
        edukasi: "Anjurkan pasien dan keluarga saling mendukung dan berbagi perasaan.",
        kolaborasi: "Rujuk ke psikolog/psikiater rumah sakit jika terdapat depresi berat."
      },
      actionDetail: "Fasilitasi pengungkapan perasaan cemas/takut, dengarkan secara aktif, beri sentuhan suportif"
    },

    // --- KAT 3: PERILAKU (PERAWATAN DIRI & EDUKASI) ---
    {
      code: "I.11348",
      title: "Dukungan Perawatan Diri: Mandi & Berpakaian",
      category: "Perilaku",
      subcategory: "Kebersihan Diri",
      actions: {
        observasi: "Identifikasi tingkat kemandirian dalam perawatan diri (skor Indeks Barthel), monitor kebersihan tubuh (kulit, rambut, kuku, mulut).",
        terapeutik: "Sediakan lingkungan yang aman dan nyaman, bantu pemenuhan mandi di tempat tidur (seka) atau ke kamar mandi, jaga privasi pasien dengan menutup sampiran, bantu mengenakan pakaian bersih.",
        edukasi: "Ajarkan pasien melakukan kebersihan diri sesuai kemampuan fisik yang dimiliki.",
        kolaborasi: "Fasilitasi penyediaan alat bantu mandi di bangsal."
      },
      actionDetail: "Identifikasi tingkat kemandirian, sediakan lingkungan yang aman dan nyaman, bantu pemenuhan mandi di tempat tidur, jaga privasi pasien"
    },
    {
      code: "I.12383",
      title: "Edukasi Kesehatan & Prosedur Tindakan",
      category: "Perilaku",
      subcategory: "Penyuluhan dan Pembelajaran",
      actions: {
        observasi: "Identifikasi kesiapan dan kemampuan menerima informasi, identifikasi persepsi yang keliru mengenai penyakit atau rencana terapi.",
        terapeutik: "Sediakan materi dan media pendidikan kesehatan (leaflet/lembar balik), berikan kesempatan bertanya, dampingi saat dokter memberikan penjelasan informed consent.",
        edukasi: "Jelaskan faktor risiko penyakit, tanda bahaya yang memerlukan pertolongan segera, serta tahapan prosedur yang akan dijalani.",
        kolaborasi: "Koordinasikan program edukasi terintegrasi dengan tim multidisiplin (PKRS)."
      },
      actionDetail: "Identifikasi kesiapan dan kemampuan menerima informasi, sediakan materi dan media pendidikan kesehatan, berikan kesempatan bertanya"
    },
    {
      code: "I.12463",
      title: "Dukungan Kepatuhan Program Pengobatan",
      category: "Perilaku",
      subcategory: "Penyuluhan dan Pembelajaran",
      actions: {
        observasi: "Identifikasi kepatuhan menjalani program pengobatan, diskusikan alasan ketidakpatuhan (efek samping obat, lupa, biaya).",
        terapeutik: "Buat jadwal minum obat yang praktis disesuaikan dengan aktivitas harian pasien, libatkan keluarga sebagai pengawas minum obat (PMO).",
        edukasi: "Jelaskan manfaat obat dan risiko bahaya resistensi/kekambuhan jika menghentikan obat tanpa petunjuk dokter.",
        kolaborasi: "Konsultasi farmasi klinis untuk rekonsiliasi obat sebelum pasien pulang."
      },
      actionDetail: "Diskusikan alasan ketidakpatuhan, libatkan keluarga sebagai pengawas minum obat, buat jadwal minum obat yang praktis"
    },

    // --- KAT 4: LINGKUNGAN (KEAMANAN, PROTEKSI, PERAWATAN LUKA, TERMOREGULASI) ---
    {
      code: "I.14539",
      title: "Pencegahan Infeksi",
      category: "Lingkungan",
      subcategory: "Keamanan dan Proteksi",
      actions: {
        observasi: "Monitor tanda dan gejala infeksi lokal dan sistemik (rubor, kalor, dolor, tumor, fungsiolesa), monitor hitung leukosit dan suhu tubuh berkala.",
        terapeutik: "Terapkan kewaspadaan standar (kebersihan tangan 5 Momen WHO), rawat luka dengan teknik steril, batasi jumlah pengunjung ruangan, pertahankan teknik aseptik pada akses invasif (infus, kateter, drain).",
        edukasi: "Jelaskan tanda dan gejala infeksi, ajarkan teknik cuci tangan 6 langkah yang benar, ajarkan etika batuk.",
        kolaborasi: "Kolaborasi pemberian terapi antibiotik profilaksis/definitif sesuai hasil kultur mikrobiologi."
      },
      actionDetail: "Terapkan kewaspadaan standar (kebersihan tangan 5 momen), rawat luka dengan teknik steril, batasi jumlah pengunjung, monitor tanda lokal infeksi (rubor, kalor, dolor, tumor, fungsiolesa)"
    },
    {
      code: "I.14540",
      title: "Pencegahan Jatuh",
      category: "Lingkungan",
      subcategory: "Keamanan dan Proteksi",
      actions: {
        observasi: "Identifikasi faktor risiko jatuh (skala Morse Fall Scale untuk dewasa / Humpty Dumpty untuk anak / Ontario untuk geriatri), monitor kemampuan ambulasi dan keseimbangan.",
        terapeutik: "Pasang gelang kuning penanda risiko jatuh pada pergelangan tangan pasien, pasang tanda risiko jatuh segitiga kuning di bedhead, pasang pagar pengaman tempat tidur (side rails) di kedua sisi, posisikan bed pada level terendah dengan roda terkunci, pastikan bel panggilan perawat mudah dijangkau.",
        edukasi: "Anjurkan pasien selalu meminta bantuan perawat jika ingin berpindah atau ke kamar mandi, edukasi keluarga agar tidak meninggalkan pasien sendirian.",
        kolaborasi: "Kolaborasi peninjauan obat sedatif atau antihipertensi yang memicu hipotensi ortostatik."
      },
      actionDetail: "Identifikasi faktor risiko jatuh (skala Morse / Humpty Dumpty), pasang gelang kuning penanda risiko jatuh, pasang pengaman tempat tidur (side rails), posisikan bed rendah terkunci"
    },
    {
      code: "I.11353",
      title: "Perawatan Luka",
      category: "Lingkungan",
      subcategory: "Keamanan dan Proteksi",
      actions: {
        observasi: "Monitor karakteristik luka (drainase, warna dasar luka merah/kuning/hitam, ukuran, bau), monitor tanda-tanda infeksi pada luka.",
        terapeutik: "Buka balutan lama perlahan dengan teknik steril, bersihkan dasar luka dengan cairan fisiologis NaCl 0.9%, pasang balutan modern dressing steril sesuai derajat eksudat, pertahankan teknik steril selama prosedur.",
        edukasi: "Jelaskan tanda infeksi luka operasi kepada pasien dan keluarga, anjurkan menjaga balutan tetap kering dan bersih.",
        kolaborasi: "Kolaborasi tindakan debridemen nekrotomi atau pemberian salep antibiotik topikal."
      },
      actionDetail: "Monitor karakteristik luka (drainase, warna, ukuran, bau), bersihkan luka dengan cairan NaCl 0.9%, pasang balutan steril modern dressing, pertahankan teknik aseptik"
    },
    {
      code: "I.11354",
      title: "Perawatan Integritas Kulit",
      category: "Lingkungan",
      subcategory: "Keamanan dan Proteksi",
      actions: {
        observasi: "Identifikasi penyebab gangguan integritas kulit (perubahan sirkulasi, penurunan mobilitas, kelembapan inkontinensia), monitor area penonjolan tulang.",
        terapeutik: "Ubah posisi tidur miring kanan/kiri tiap 2 jam, oleskan lotion pelembab pada area kulit kering, jaga linen tempat tidur tetap kering, tegang, dan bebas lipatan.",
        edukasi: "Anjurkan minum air putih cukup, anjurkan meningkatkan asupan protein untuk regenerasi sel kulit.",
        kolaborasi: "Gunakan kasur dekubitus gel/angin pada pasien ketergantungan total."
      },
      actionDetail: "Ubah posisi tiap 2 jam, gunakan lotion pelembab pada area kering, jaga linen tetap kering dan bersih"
    },
    {
      code: "I.14558",
      title: "Perawatan Pasca Operasi (PACU / Post-Anesthesia Recovery)",
      category: "Lingkungan",
      subcategory: "Keamanan dan Proteksi",
      actions: {
        observasi: "Monitor tanda vital tiap 15 menit pada 1 jam pertama, monitor status kesadaran (skor Aldrete/Steward), monitor nyeri dan mual muntah pasca anestesi, periksa rembesan balutan luka operasi.",
        terapeutik: "Pertahankan kepatenan jalan napas, berikan selimut penghangat untuk cegah hipotermia pasca anestesi, bimbing mobilisasi bertahap sesuai protokol ERAS.",
        edukasi: "Jelaskan efek sisa pembiusan dan anjurkan tirah baring hingga instruksi pindah ruangan terpenuhi.",
        kolaborasi: "Kolaborasi pemberian analgetik intravena dan cairan infus pemeliharaan."
      },
      actionDetail: "Monitor tanda vital, bimbing mobilisasi bertahap sesuai protokol ERAS, rawat luka operasi, kolaborasi nutrisi bertahap"
    },
    {
      code: "I.15506",
      title: "Manajemen Hipertermia",
      category: "Lingkungan",
      subcategory: "Termoregulasi",
      actions: {
        observasi: "Identifikasi penyebab hipertermia (infeksi, dehidrasi), monitor suhu tubuh tiap 2-4 jam, monitor warna dan kelembapan kulit.",
        terapeutik: "Sediakan lingkungan yang sejuk dan berventilasi baik, longgarkan pakaian tebal, berikan cairan rehidrasi oral, lakukan kompres hangat (tepid water sponge) pada dahi, leher, ketiak, dan lipatan paha.",
        edukasi: "Anjurkan tirah baring, anjurkan banyak minum air putih.",
        kolaborasi: "Kolaborasi pemberian antipiretik (Parasetamol infus/oral) dan cairan intravena."
      },
      actionDetail: "Identifikasi penyebab hipertermia, monitor suhu tubuh tiap 2-4 jam, sediakan kompres hangat (tepid water sponge), kolaborasi pemberian antipiretik"
    },
    {
      code: "I.15507",
      title: "Manajemen Hipotermia",
      category: "Lingkungan",
      subcategory: "Termoregulasi",
      actions: {
        observasi: "Monitor suhu tubuh pasien (< 36.0°C), identifikasi tanda hipotermia (menggigil, akral dingin dan pucat, bradikardia).",
        terapeutik: "Sediakan lingkungan yang hangat, selimuti pasien dengan selimut tebal atau selimut penghangat aktif (warming blanket), gunakan radiant warmer pada bayi baru lahir.",
        edukasi: "Jelaskan bahaya hipotermia dan cara mempertahankan kehangatan tubuh.",
        kolaborasi: "Kolaborasi pemberian cairan intravena yang dihangatkan (warmed IV fluids)."
      },
      actionDetail: "Monitor suhu tubuh, selimuti dengan selimut tebal/penghangat, jaga suhu ruangan hangat, kolaborasi cairan hangat"
    }
  ];

  // Top 8 diagnosis paling sering di bangsal RSUD dr. Soedarso (Quick Access)
  const QUICK_DIAGNOSES = [
    { code: "D.0077", label: "D.0077 Nyeri Akut" },
    { code: "D.0001", label: "D.0001 Bersihan Jalan Napas" },
    { code: "D.0142", label: "D.0142 Risiko Infeksi" },
    { code: "D.0019", label: "D.0019 Defisit Nutrisi" },
    { code: "D.0054", label: "D.0054 Gangguan Mobilitas" },
    { code: "D.0143", label: "D.0143 Risiko Jatuh" },
    { code: "D.0130", label: "D.0130 Hipertermia" },
    { code: "D.0080", label: "D.0080 Ansietas" }
  ];

  // =========================================================================
  // 2. DATA PROGRAM CPD (3.1) & INDIKATOR OPPE (3.3)
  // =========================================================================
  const CPD_PROGRAMS = [
    {
      id: "CPD-01",
      title: "Pelatihan Basic Trauma Cardiac Life Support (BTCLS) & Code Blue Intervensi Cepat",
      category: "Pelatihan Bersertifikat",
      skpPoints: 4,
      organizer: "Diklat RSUD dr. Soedarso bekerjasama dengan HIPGABI Kalbar",
      dateRange: "24 - 27 Oktober 2026",
      quota: 40,
      registeredCount: 38,
      location: "Auditorium Gedung Diklat Lt. 2 RSUD dr. Soedarso",
      status: "Pendaftaran Dibuka"
    },
    {
      id: "CPD-02",
      title: "Workshop Implementasi Dokumentasi Asuhan Keperawatan 3S (SDKI, SIKI, SLKI) di SIMRS",
      category: "Workshop",
      skpPoints: 2,
      organizer: "Subkomite Mutu Profesi Komite Keperawatan",
      dateRange: "08 November 2026",
      quota: 100,
      registeredCount: 65,
      location: "Ruang Pertemuan Komite Medis & Keperawatan (Hybrid via Zoom)",
      status: "Pendaftaran Dibuka"
    },
    {
      id: "CPD-03",
      title: "Simposium & Hands-On Perawatan Luka Modern (Modern Wound Care Management)",
      category: "Seminar",
      skpPoints: 3,
      organizer: "InWCCA Kalimantan Barat & RSUD dr. Soedarso",
      dateRange: "20 - 21 November 2026",
      quota: 60,
      registeredCount: 42,
      location: "Ballroom RSUD dr. Soedarso Pontianak",
      status: "Pendaftaran Dibuka"
    },
    {
      id: "CPD-04",
      title: "In-House Training: Tatalaksana Resusitasi Neonatus & Stabilisasi Bayi Berat Lahir Rendah",
      category: "In-House Training",
      skpPoints: 2,
      organizer: "Instalasi Maternal Neonatal (NICU/Perina) & Subkomite Mutu",
      dateRange: "04 Desember 2026",
      quota: 35,
      registeredCount: 35,
      location: "Ruang Skill Lab Perinatologi Lt. 2",
      status: "Pendaftaran Dibuka"
    }
  ];

  const OPPE_INDICATORS = [
    {
      domain: "1. Asuhan Pasien (Patient Care)",
      indicator: "Kepatuhan Pelaksanaan Asuhan Keperawatan sesuai SPO & 3S (SDKI/SIKI/SLKI)",
      targetPercent: 95,
      achievedPercent: 96.8,
      period: "Kuartal II - 2026",
      status: "Tercapai"
    },
    {
      domain: "1. Asuhan Pasien (Patient Care)",
      indicator: "Kelengkapan Penilaian Risiko Jatuh & Implementasi Intervensi Pencegahan",
      targetPercent: 100,
      achievedPercent: 98.4,
      period: "Kuartal II - 2026",
      status: "Mendekati Target"
    },
    {
      domain: "2. Pengetahuan Klinis (Medical/Clinical Knowledge)",
      indicator: "Keikutsertaan Uji Kompetensi & Refreshment Prosedur Tindakan Emergensi Tahunan",
      targetPercent: 90,
      achievedPercent: 92.5,
      period: "Kuartal II - 2026",
      status: "Tercapai"
    },
    {
      domain: "3. Pembelajaran Berbasis Praktik (Practice-based Learning)",
      indicator: "Pemenuhan Jam Pelatihan CPD Mandiri (Minimal 20 SKP PPNI/IBI per siklus)",
      targetPercent: 85,
      achievedPercent: 88,
      period: "Kuartal II - 2026",
      status: "Tercapai"
    },
    {
      domain: "4. Keterampilan Interpersonal & Komunikasi",
      indicator: "Kepatuhan Teknik Komunikasi Efektif SBAR saat Timbang Terima (Handover)",
      targetPercent: 95,
      achievedPercent: 94.2,
      period: "Kuartal II - 2026",
      status: "Mendekati Target"
    },
    {
      domain: "5. Profesionalisme & Perilaku Etik",
      indicator: "Kepatuhan Disiplin Kehadiran & Tidak Ada Pelanggaran Kode Etik Kategori Sedang/Berat",
      targetPercent: 98,
      achievedPercent: 99.1,
      period: "Kuartal II - 2026",
      status: "Tercapai"
    },
    {
      domain: "6. Praktik Berbasis Sistem (System-based Practice)",
      indicator: "Kepatuhan Pelaporan Insiden Keselamatan Pasien (IKP) tepat waktu <2x24 jam",
      targetPercent: 90,
      achievedPercent: 86.5,
      period: "Kuartal II - 2026",
      status: "Perlu Perhatian"
    }
  ];

  const INITIAL_SEED_LOGBOOK = [
    {
      id: "LOG-001",
      date: "2026-09-16",
      shift: "Pagi",
      patientMrn: "RM-59281",
      workUnit: "Ruang Rawat Inap Bedah (Puring Lt. 3)",
      nurseName: "Ns. Siti Rahmah, S.Kep.",
      sdkiDiagnosis: "D.0077 - Nyeri Akut b.d Agen Pencedera Fisik (Post-Op Laparatomi)",
      sikiIntervention: "I.08238 - Manajemen Nyeri (Identifikasi PQRST, teknik relaksasi napas dalam, kolaborasi analgetik)",
      slkiOutcome: "L.08066 - Tingkat Nyeri Menurun (Skor VAS awal 6 turun menjadi 3)",
      actionCategory: "Mandiri",
      notes: "Pasien kooperatif, edukasi teknik non-farmakologis berjalan lancar.",
      verifiedByHeadNurse: true
    },
    {
      id: "LOG-002",
      date: "2026-09-16",
      shift: "Pagi",
      patientMrn: "RM-59304",
      workUnit: "Ruang Rawat Inap Bedah (Puring Lt. 3)",
      nurseName: "Ns. Siti Rahmah, S.Kep.",
      sdkiDiagnosis: "D.0142 - Risiko Infeksi d.d Efek Prosedur Invasif (Luka Operasi & CVC Line)",
      sikiIntervention: "I.14539 - Pencegahan Infeksi (Ganti balutan steril teknik aseptik, pemantauan tanda infeksi)",
      slkiOutcome: "L.14137 - Tingkat Infeksi Menurun (Tidak ada pus, kemerahan minimal, leukosit stabil)",
      actionCategory: "Kolaboratif",
      notes: "Kultur luka swab telah dikirim ke laboratorium mikrobiologi klinik.",
      verifiedByHeadNurse: true
    },
    {
      id: "LOG-003",
      date: "2026-09-15",
      shift: "Malam",
      patientMrn: "RM-59112",
      workUnit: "Ruang Rawat Inap Bedah (Puring Lt. 3)",
      nurseName: "Ns. Siti Rahmah, S.Kep.",
      sdkiDiagnosis: "D.0005 - Pola Napas Tidak Efektif b.d Hambatan Upaya Napas (Nyeri Insisi Subkostal)",
      sikiIntervention: "I.01011 - Manajemen Jalan Napas (Posisikan semi-fowler, observasi SpO2 & frekuensi napas)",
      slkiOutcome: "L.01004 - Pola Napas Membaik (RR 20x/menit reguler, SpO2 98% room air)",
      actionCategory: "Mandiri",
      notes: "EWS stabil pada skor 1 (kategori hijau).",
      verifiedByHeadNurse: true
    },
    {
      id: "LOG-004",
      date: "2026-09-14",
      shift: "Sore",
      patientMrn: "RM-58994",
      workUnit: "Ruang Rawat Inap Enggang Gading 2",
      nurseName: "Ns. Hendra Wijaya, S.Kep.",
      sdkiDiagnosis: "D.0019 - Defisit Nutrisi b.d Ketidakmampuan Menelan Makanan",
      sikiIntervention: "I.03119 - Manajemen Nutrisi (Identifikasi status nutrisi, kolaborasi dengan ahli gizi pemberian diet sonde tinggi protein)",
      slkiOutcome: "L.03030 - Status Nutrisi Membaik (Porsi makanan enteral habis 90%, IMT stabil)",
      actionCategory: "Kolaboratif",
      notes: "Toleransi sonde baik, residu lambung minimal (<20 cc).",
      verifiedByHeadNurse: true
    },
    {
      id: "LOG-005",
      date: "2026-09-14",
      shift: "Pagi",
      patientMrn: "RM-58721",
      workUnit: "Instalasi Gawat Darurat (IGD)",
      nurseName: "Ns. Bambang Sutrisno, S.Kep.",
      sdkiDiagnosis: "D.0001 - Bersihan Jalan Napas Tidak Efektif b.d Spasme jalan napas & hipersekresi jalan napas",
      sikiIntervention: "I.01011 - Manajemen Jalan Napas (Monitor pola napas, lakukan fisioterapi dada, lakukan penghisapan lendir/suction)",
      slkiOutcome: "L.01001 - Bersihan Jalan Napas Meningkat (Produksi sputum berkurang, ronki minimal, suara napas vesikuler)",
      actionCategory: "Mandiri",
      notes: "Suction dilakukan 2 siklus, sekret kental putih berkurang, SpO2 naik dari 93% ke 98%.",
      verifiedByHeadNurse: false
    }
  ];

  const STORAGE_KEY_LOGBOOK = 'komite_elogbook_records_3s';
  const STORAGE_KEY_CPD = 'komite_cpd_registered_ids';

  // =========================================================================
  // 3. STATE & DATA REPOSITORY
  // =========================================================================
  const state = {
    activeSubtab: 'logbook',
    isFormOpen: true,
    selectedSdkiCode: 'D.0077',
    selectedEtiology: '',
    catalogCategory: 'Semua',
    catalogSearch: '',
    catalogSelectedCode: 'D.0077',
    catalogSelectedEtiology: ''
  };

  function getRecords() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LOGBOOK);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_LOGBOOK, JSON.stringify(INITIAL_SEED_LOGBOOK));
        return INITIAL_SEED_LOGBOOK;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error("Gagal membaca logbook records:", e);
      return INITIAL_SEED_LOGBOOK;
    }
  }

  function saveRecords(records) {
    try {
      localStorage.setItem(STORAGE_KEY_LOGBOOK, JSON.stringify(records));
    } catch (e) {
      console.error("Gagal menyimpan logbook records:", e);
    }
  }

  function getRegisteredCpdIds() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CPD);
      return stored ? JSON.parse(stored) : ["CPD-02"];
    } catch (e) {
      return ["CPD-02"];
    }
  }

  function saveRegisteredCpdIds(ids) {
    try {
      localStorage.setItem(STORAGE_KEY_CPD, JSON.stringify(ids));
    } catch (e) {}
  }

  function getActiveUser() {
    if (window.state && window.state.currentUser) {
      return window.state.currentUser;
    }
    try {
      const saved = localStorage.getItem('komite_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: "Ns. Siti Rahmah, S.Kep.",
      nip: "000000000000000000",
      role: "perawat",
      badge: "Perawat Klinis II (PK II)",
      unit: "Ruang Rawat Inap Bedah (Puring Lt. 3)"
    };
  }

  function canVerifyRecord() {
    const user = getActiveUser();
    if (!user) return false;
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
  // 4. SUB-TAB CONTROLLER (3.1 CPD, 3.2 Logbook, 3.3 OPPE, 3.4 Katalog)
  // =========================================================================
  function switchMutuSubtab(tabName) {
    state.activeSubtab = tabName;
    const subtabs = ['cpd', 'logbook', 'oppe', 'katalog3s'];
    subtabs.forEach(t => {
      const btn = document.getElementById('subtab-btn-' + t);
      const pane = document.getElementById('subpane-mutu-' + t);
      if (btn) {
        if (t === tabName) {
          btn.classList.add('active');
          btn.style.background = '#0d9488';
          btn.style.color = '#ffffff';
          btn.style.borderColor = '#0d9488';
        } else {
          btn.classList.remove('active');
          btn.style.background = '#ffffff';
          btn.style.color = '#64748b';
          btn.style.borderColor = '#e2e8f0';
        }
      }
      if (pane) {
        pane.style.display = (t === tabName) ? 'block' : 'none';
      }
    });

    if (tabName === 'logbook') {
      renderLogbookTable();
      renderLogbookMetrics();
    } else if (tabName === 'cpd') {
      renderCpdSection();
    } else if (tabName === 'oppe') {
      renderOppeSection();
    } else if (tabName === 'katalog3s') {
      renderKatalog3STable();
    }
  }

  // =========================================================================
  // 5. E-LOGBOOK CONTROLLER (FORM, TAUTAN 3S, STATS, TABLE)
  // =========================================================================
  function toggleLogbookForm(forceState) {
    const container = document.getElementById('formContainerLogbook');
    const toggleBtn = document.getElementById('btnToggleLogbookForm');
    if (!container) return;

    state.isFormOpen = (typeof forceState === 'boolean') ? forceState : !state.isFormOpen;
    container.style.display = state.isFormOpen ? 'block' : 'none';

    if (toggleBtn) {
      if (state.isFormOpen) {
        toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Tutup Formulir';
        toggleBtn.style.background = '#64748b';
      } else {
        toggleBtn.innerHTML = '<i class="fa-solid fa-plus"></i> + Catat Kegiatan Logbook Baru';
        toggleBtn.style.background = '#0d9488';
      }
    }

    if (state.isFormOpen) {
      initFormFields();
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function initFormFields() {
    const user = getActiveUser();
    const dateInput = document.getElementById('logDate');
    const mrnInput = document.getElementById('logMrn');
    const unitInput = document.getElementById('logWorkUnit');
    const nurseLabel = document.getElementById('logNurseNameLabel');

    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().slice(0, 10);
    }
    if (mrnInput && !mrnInput.value) {
      mrnInput.value = "RM-" + Math.floor(50000 + Math.random() * 10000);
    }
    if (unitInput) {
      const targetUnit = user.unit || "Kakap";
      let matched = false;
      for (let i = 0; i < unitInput.options.length; i++) {
        const optVal = unitInput.options[i].value;
        if (optVal && (optVal.toLowerCase() === targetUnit.toLowerCase() ||
            targetUnit.toLowerCase().includes(optVal.toLowerCase()) ||
            optVal.toLowerCase().includes(targetUnit.toLowerCase()))) {
          unitInput.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched && unitInput.options.length > 1 && !unitInput.value) {
        unitInput.selectedIndex = 1;
      }
    }
    if (nurseLabel) {
      nurseLabel.textContent = "Oleh: " + (user.name || "Perawat Pelaksana");
    }

    populateSdkiDropdown();
    applySdkiSelection(state.selectedSdkiCode || 'D.0077');
  }

  function populateSdkiDropdown() {
    const select = document.getElementById('logSdkiSelect');
    if (!select) return;

    const grouped = {};
    SDKI_CATALOG.forEach(item => {
      const key = item.category + " • " + item.subcategory;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });

    let html = '';
    Object.keys(grouped).forEach(grpKey => {
      html += '<optgroup label="' + grpKey + '">';
      grouped[grpKey].forEach(item => {
        html += '<option value="' + item.code + '">[' + item.code + '] ' + item.name + '</option>';
      });
      html += '</optgroup>';
    });

    select.innerHTML = html;
    select.value = state.selectedSdkiCode;
  }

  function selectQuickDiagnosis(code) {
    state.selectedSdkiCode = code;
    const select = document.getElementById('logSdkiSelect');
    if (select) select.value = code;
    applySdkiSelection(code);
  }

  
  // =========================================================================
  // 1.2 HELPER POPULASI DROPDOWN & PREVIEW SIKI RESMI PPNI
  // =========================================================================
  function populateSikiDropdown(currentSdkiItem) {
    const sikiSelect = document.getElementById('logSikiSelect');
    if (!sikiSelect) return;

    let sikiHtml = '';

    // 1. Rekomendasi Utama & Alternatif Terkait Diagnosis SDKI Terpilih
    const recGroup = [];
    if (currentSdkiItem && currentSdkiItem.recommendedSiki) {
      const rec = currentSdkiItem.recommendedSiki;
      const recVal = rec.code + ' - ' + rec.title + ' (' + rec.actionDetail + ')';
      recGroup.push({
        val: recVal,
        label: '⭐ [Rekomendasi Utama] ' + rec.code + ' - ' + rec.title
      });
    }
    if (currentSdkiItem && currentSdkiItem.alternativeSiki && currentSdkiItem.alternativeSiki.length > 0) {
      currentSdkiItem.alternativeSiki.forEach(alt => {
        const altVal = alt.code + ' - ' + alt.title + ' (' + alt.actionDetail + ')';
        recGroup.push({
          val: altVal,
          label: '🔸 [Alternatif Terkait] ' + alt.code + ' - ' + alt.title
        });
      });
    }

    if (recGroup.length > 0) {
      sikiHtml += '<optgroup label="⭐ REKOMENDASI SIKI (DIAGNOSIS ' + (currentSdkiItem.code || '') + ')">';
      recGroup.forEach(item => {
        sikiHtml += '<option value="' + item.val + '">' + item.label + '</option>';
      });
      sikiHtml += '</optgroup>';
    }

    // 2. Katalog Lengkap Standar Intervensi Keperawatan Indonesia (SIKI PPNI)
    const sikiGrouped = {};
    SIKI_CATALOG.forEach(siki => {
      const groupKey = siki.category + ' • ' + siki.subcategory;
      if (!sikiGrouped[groupKey]) sikiGrouped[groupKey] = [];
      sikiGrouped[groupKey].push(siki);
    });

    Object.keys(sikiGrouped).forEach(grp => {
      sikiHtml += '<optgroup label="SIKI: ' + grp.toUpperCase() + '">';
      sikiGrouped[grp].forEach(s => {
        const val = s.code + ' - ' + s.title + ' (' + s.actionDetail + ')';
        sikiHtml += '<option value="' + val + '">[' + s.code + '] ' + s.title + '</option>';
      });
      sikiHtml += '</optgroup>';
    });

    sikiSelect.innerHTML = sikiHtml;

    if (recGroup.length > 0) {
      sikiSelect.value = recGroup[0].val;
    }
  }

  function renderSikiPreview(sikiVal) {
    const sikiPreview = document.getElementById('previewSikiDetail');
    if (!sikiPreview) return;
    if (!sikiVal) {
      sikiPreview.innerHTML = '<span style="color: #64748b;">Belum ada intervensi SIKI yang dipilih.</span>';
      return;
    }

    // Extract code
    const codeMatch = sikiVal.match(/I\.\d{5}/);
    const sikiCode = codeMatch ? codeMatch[0] : '';
    const sikiObj = sikiCode ? SIKI_CATALOG.find(s => s.code === sikiCode) : null;

    if (sikiObj && sikiObj.actions) {
      sikiPreview.innerHTML = 
        '<div style="font-weight: 700; color: #064e3b; margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px;">' +
          '<span><i class="fa-solid fa-stethoscope"></i> [' + sikiObj.code + '] ' + sikiObj.title + '</span>' +
          '<span style="font-size: 0.68rem; background: #a7f3d0; color: #065f46; padding: 2px 7px; border-radius: 4px; font-weight: 700;"><i class="fa-solid fa-book-medical"></i> SIKI PPNI (' + sikiObj.category + ' - ' + sikiObj.subcategory + ')</span>' +
        '</div>' +
        '<div style="display: grid; grid-template-columns: 1fr; gap: 4px; font-size: 0.74rem; color: #064e3b; line-height: 1.45; background: #ffffff; padding: 0.6rem 0.75rem; border-radius: 6px; border: 1px solid #a7f3d0;">' +
          '<div><strong style="color: #047857;"><i class="fa-solid fa-eye"></i> [O] Observasi:</strong> ' + sikiObj.actions.observasi + '</div>' +
          '<div><strong style="color: #047857;"><i class="fa-solid fa-hand-holding-medical"></i> [T] Terapeutik:</strong> ' + sikiObj.actions.terapeutik + '</div>' +
          '<div><strong style="color: #047857;"><i class="fa-solid fa-chalkboard-user"></i> [E] Edukasi:</strong> ' + sikiObj.actions.edukasi + '</div>' +
          '<div><strong style="color: #047857;"><i class="fa-solid fa-users-rectangle"></i> [K] Kolaborasi:</strong> ' + sikiObj.actions.kolaborasi + '</div>' +
        '</div>';
    } else {
      sikiPreview.innerHTML = '<div style="font-size: 0.75rem; color: #064e3b; line-height: 1.45;">' + sikiVal + '</div>';
    }
  }

  function applySdkiSelection(code, forcedEtiology) {
    const item = SDKI_CATALOG.find(d => d.code === code) || SDKI_CATALOG[0];
    state.selectedSdkiCode = item.code;

    // Quick Diagnosis pills styling
    const quickBtns = document.querySelectorAll('.btn-quick-sdki');
    quickBtns.forEach(btn => {
      if (btn.getAttribute('data-code') === item.code) {
        btn.style.background = '#0f766e';
        btn.style.color = '#ffffff';
      } else {
        btn.style.background = '#ffffff';
        btn.style.color = '#134e4a';
      }
    });

    // Etiology dropdown
    const etiologySelect = document.getElementById('logEtiologySelect');
    if (etiologySelect) {
      let etHtml = '<option value="">(Tanpa tambahan etiologi / Format dasar)</option>';
      if (item.commonEtiologies && item.commonEtiologies.length > 0) {
        item.commonEtiologies.forEach(et => {
          etHtml += '<option value="' + et + '">' + et + '</option>';
        });
      }
      etiologySelect.innerHTML = etHtml;
      const defaultEt = (forcedEtiology !== undefined) ? forcedEtiology : (item.commonEtiologies ? item.commonEtiologies[0] : '');
      etiologySelect.value = defaultEt;
      state.selectedEtiology = defaultEt;
    }

    // SIKI dropdown (Daftar Lengkap SIKI PPNI dengan Rekomendasi Teratas)
    populateSikiDropdown(item);

    // SLKI dropdown
    const slkiSelect = document.getElementById('logSlkiSelect');
    if (slkiSelect) {
      let slkiHtml = '';
      if (item.recommendedSlki) {
        const mainVal = item.recommendedSlki.code + ' - ' + item.recommendedSlki.title + ' (' + item.recommendedSlki.targetDetail + ')';
        slkiHtml += '<option value="' + mainVal + '">[Target Utama] ' + item.recommendedSlki.code + ' - ' + item.recommendedSlki.title + '</option>';
      }
      if (item.alternativeSlki && item.alternativeSlki.length > 0) {
        item.alternativeSlki.forEach(alt => {
          const altVal = alt.code + ' - ' + alt.title + ' (' + alt.targetDetail + ')';
          slkiHtml += '<option value="' + altVal + '">[Alternatif SLKI] ' + alt.code + ' - ' + alt.title + '</option>';
        });
      }
      slkiSelect.innerHTML = slkiHtml;
    }

    updateLivePreviews();
  }

  function updateLivePreviews() {
    const item = SDKI_CATALOG.find(d => d.code === state.selectedSdkiCode) || SDKI_CATALOG[0];
    const etiology = state.selectedEtiology;

    const fullDiag = etiology ? (item.code + ' - ' + item.name + ' b.d ' + etiology) : (item.code + ' - ' + item.name);
    const diagPreviewCode = document.getElementById('previewSdkiCode');
    const diagPreviewText = document.getElementById('previewSdkiText');
    const diagPreviewCategory = document.getElementById('previewSdkiCategory');

    if (diagPreviewCode) diagPreviewCode.textContent = item.code;
    if (diagPreviewText) diagPreviewText.textContent = fullDiag;
    if (diagPreviewCategory) diagPreviewCategory.textContent = item.category + ' • ' + item.subcategory;

    const sikiSelect = document.getElementById('logSikiSelect');
    if (sikiSelect) {
      renderSikiPreview(sikiSelect.value);
    }

    const slkiSelect = document.getElementById('logSlkiSelect');
    const slkiPreview = document.getElementById('previewSlkiDetail');
    if (slkiSelect && slkiPreview) {
      slkiPreview.textContent = slkiSelect.value || '-';
    }
  }

  function onEtiologyChange(newEt) {
    state.selectedEtiology = newEt;
    updateLivePreviews();
  }

  function onSikiChange() {
    const sikiSelect = document.getElementById('logSikiSelect');
    if (sikiSelect) {
      renderSikiPreview(sikiSelect.value);
    }
  }

  function onSlkiChange() {
    const slkiSelect = document.getElementById('logSlkiSelect');
    const slkiPreview = document.getElementById('previewSlkiDetail');
    if (slkiSelect && slkiPreview) {
      slkiPreview.textContent = slkiSelect.value;
    }
  }

  // =========================================================================
  // 6. SAVE LOGBOOK RECORD
  // =========================================================================
  function saveLogbookRecord(e) {
    if (e) e.preventDefault();

    const user = getActiveUser();
    const date = document.getElementById('logDate')?.value || new Date().toISOString().slice(0, 10);
    const shift = document.getElementById('logShift')?.value || 'Pagi';
    const mrn = document.getElementById('logMrn')?.value || 'RM-59821';
    const workUnit = document.getElementById('logWorkUnit')?.value || user.unit || 'Rawat Inap RSUD dr. Soedarso';
    const category = document.getElementById('logCategoryAction')?.value || 'Mandiri';

    const item = SDKI_CATALOG.find(d => d.code === state.selectedSdkiCode) || SDKI_CATALOG[0];
    const etiology = state.selectedEtiology;
    const sdkiDiagnosis = etiology ? (item.code + ' - ' + item.name + ' b.d ' + etiology) : (item.code + ' - ' + item.name);
    const sikiIntervention = document.getElementById('logSikiSelect')?.value || (item.recommendedSiki.code + ' - ' + item.recommendedSiki.title);
    const slkiOutcome = document.getElementById('logSlkiSelect')?.value || (item.recommendedSlki.code + ' - ' + item.recommendedSlki.title);
    const notes = document.getElementById('logNotes')?.value || 'Asuhan keperawatan dilaksanakan sesuai standar 3S.';

    const newRecord = {
      id: "LOG-" + Date.now().toString().slice(-6),
      date: date,
      shift: shift,
      patientMrn: mrn,
      workUnit: workUnit,
      nurseName: user.name || "Ns. Siti Rahmah, S.Kep.",
      sdkiDiagnosis: sdkiDiagnosis,
      sikiIntervention: sikiIntervention,
      slkiOutcome: slkiOutcome,
      actionCategory: category,
      notes: notes,
      verifiedByHeadNurse: false
    };

    const records = getRecords();
    records.unshift(newRecord);
    saveRecords(records);

    const alertBox = document.getElementById('logSubmitSuccessAlert');
    if (alertBox) {
      alertBox.style.display = 'flex';
      setTimeout(() => { alertBox.style.display = 'none'; }, 5000);
    }

    if (document.getElementById('logNotes')) {
      document.getElementById('logNotes').value = '';
    }
    if (document.getElementById('logMrn')) {
      document.getElementById('logMrn').value = "RM-" + Math.floor(50000 + Math.random() * 10000);
    }

    toggleLogbookForm(false);
    renderLogbookMetrics();
    renderLogbookTable();

    if (typeof window.showToast === 'function') {
      window.showToast('Entri logbook (' + mrn + ' - ' + item.code + ') berhasil dicatat!', 'success');
    }
  }

  // =========================================================================
  // 7. RENDERING METRICS & LOGBOOK TABLE
  // =========================================================================
  function renderLogbookMetrics() {
    const records = getRecords();
    const countTotal = records.length;
    const countMandiri = records.filter(r => r.actionCategory === 'Mandiri').length;
    const countKolaboratif = records.filter(r => r.actionCategory === 'Kolaboratif' || r.actionCategory === 'Edukasi').length;
    const countVerified = records.filter(r => r.verifiedByHeadNurse).length;

    const elTotal = document.getElementById('metricLogbookTotal');
    const elMandiri = document.getElementById('metricLogbookMandiri');
    const elKolaboratif = document.getElementById('metricLogbookKolaboratif');
    const elPreseptor = document.getElementById('metricLogbookPreseptor');
    const badgeCount = document.getElementById('badgeTotalLogbookCount');

    if (elTotal) elTotal.textContent = countTotal + " Tindakan";
    if (elMandiri) elMandiri.textContent = countMandiri + " Selesai";
    if (elKolaboratif) elKolaboratif.textContent = countKolaboratif + " Terverifikasi";
    if (elPreseptor) {
      const pct = countTotal > 0 ? Math.round((countVerified / countTotal) * 100) : 100;
      elPreseptor.textContent = pct + "% Valid (" + countVerified + " Disahkan)";
    }
    if (badgeCount) badgeCount.textContent = countTotal;
  }

  function renderLogbookTable() {
    const tbody = document.getElementById('tableBodyElogbook');
    if (!tbody) return;

    const unitFilter = document.getElementById('filterLogbookUnit')?.value || 'all';
    const shiftFilter = document.getElementById('filterLogbookShift')?.value || 'all';
    const catFilter = document.getElementById('filterLogbookCategory')?.value || 'all';
    const statusFilter = document.getElementById('filterLogbookStatus')?.value || 'all';
    const searchQuery = (document.getElementById('searchLogbookInput')?.value || '').toLowerCase().trim();

    let records = getRecords();

    if (unitFilter !== 'all') {
      records = records.filter(r => (r.workUnit || '').toLowerCase().includes(unitFilter.toLowerCase()));
    }
    if (shiftFilter !== 'all') {
      records = records.filter(r => r.shift.toLowerCase() === shiftFilter.toLowerCase());
    }
    if (catFilter !== 'all') {
      records = records.filter(r => (r.actionCategory || '').toLowerCase() === catFilter.toLowerCase());
    }
    if (statusFilter !== 'all') {
      if (statusFilter === 'verified') records = records.filter(r => r.verifiedByHeadNurse);
      if (statusFilter === 'pending') records = records.filter(r => !r.verifiedByHeadNurse);
    }
    if (searchQuery) {
      records = records.filter(r =>
        (r.nurseName && r.nurseName.toLowerCase().includes(searchQuery)) ||
        (r.patientMrn && r.patientMrn.toLowerCase().includes(searchQuery)) ||
        (r.sdkiDiagnosis && r.sdkiDiagnosis.toLowerCase().includes(searchQuery)) ||
        (r.sikiIntervention && r.sikiIntervention.toLowerCase().includes(searchQuery)) ||
        (r.slkiOutcome && r.slkiOutcome.toLowerCase().includes(searchQuery)) ||
        (r.workUnit && r.workUnit.toLowerCase().includes(searchQuery)) ||
        (r.notes && r.notes.toLowerCase().includes(searchQuery))
      );
    }

    if (records.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2.5rem 1rem; color: #64748b;"><i class="fa-solid fa-folder-open" style="font-size: 2rem; color: #94a3b8; display: block; margin-bottom: 0.5rem;"></i><strong>Belum ada catatan logbook yang sesuai dengan filter.</strong><p style="font-size: 0.8rem; margin-top: 0.25rem;">Klik tombol "<strong>+ Catat Kegiatan Logbook Baru</strong>" untuk menambah catatan asuhan 3S.</p></td></tr>';
      return;
    }

    const isVerifier = canVerifyRecord();

    tbody.innerHTML = records.map(item => {
      const catBadge = item.actionCategory === 'Mandiri'
        ? '<span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 0.72rem;">Mandiri</span>'
        : item.actionCategory === 'Kolaboratif'
        ? '<span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 0.72rem;">Kolaboratif</span>'
        : '<span style="background: #f3e8ff; color: #6b21a8; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 0.72rem;">Edukasi</span>';

      const verifBadge = item.verifiedByHeadNurse
        ? '<span style="display: inline-flex; align-items: center; gap: 4px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 700;" title="Disetujui oleh Kepala Ruangan / Preseptor Klinik"><i class="fa-solid fa-circle-check" style="color: #059669;"></i> Disetujui Ka.Ruang</span>'
        : '<span style="display: inline-flex; align-items: center; gap: 4px; background: #fffbeb; color: #92400e; border: 1px solid #fde68a; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 700;"><i class="fa-solid fa-clock" style="color: #d97706;"></i> Menunggu Review</span>';

      let actions = '<button class="btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.72rem;" onclick="ELogbookKomkep.viewDetail('' + item.id + '')" title="Lihat Detail SOAP & 3S"><i class="fa-solid fa-eye"></i> Detail</button>';

      if (isVerifier && !item.verifiedByHeadNurse) {
        actions += ' <button class="btn-primary" style="padding: 0.25rem 0.55rem; font-size: 0.72rem; background: #059669; border-color: #059669;" onclick="ELogbookKomkep.verifyRecord('' + item.id + '')" title="Sahkan Asuhan"><i class="fa-solid fa-check-double"></i> Sahkan</button>';
      }

      actions += ' <button class="btn-secondary" style="padding: 0.25rem 0.45rem; font-size: 0.72rem; color: #dc2626; border-color: #fecaca;" onclick="ELogbookKomkep.deleteRecord('' + item.id + '')" title="Hapus Catatan"><i class="fa-solid fa-trash-can"></i></button>';

      return '<tr style="border-bottom: 1px solid #f1f5f9;">' +
        '<td style="padding: 0.75rem 1rem; white-space: nowrap;"><div style="font-weight: 700; color: #1e293b; font-size: 0.85rem;">' + item.date + '</div><div style="font-size: 0.72rem; color: #64748b; margin-top: 2px;">Shift: <strong>' + item.shift + '</strong></div></td>' +
        '<td style="padding: 0.75rem 1rem; white-space: nowrap;"><div style="font-family: monospace; font-weight: 800; color: #0f766e; font-size: 0.88rem;">' + item.patientMrn + '</div><div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">' + (item.workUnit || 'Rawat Inap').slice(0, 22) + '</div></td>' +
        '<td style="padding: 0.75rem 1rem; max-width: 320px;"><div style="font-weight: 700; color: #042f2e; font-size: 0.82rem; line-height: 1.3;">' + item.sdkiDiagnosis + '</div><div style="font-size: 0.72rem; color: #475569; margin-top: 3px; line-height: 1.3;"><i class="fa-solid fa-arrow-turn-down" style="color: #0d9488; margin-right: 3px;"></i>' + (item.sikiIntervention.length > 85 ? item.sikiIntervention.slice(0, 85) + '...' : item.sikiIntervention) + '</div></td>' +
        '<td style="padding: 0.75rem 1rem; max-width: 250px;"><div style="font-size: 0.78rem; font-weight: 600; color: #334155; line-height: 1.3;">' + (item.slkiOutcome.length > 75 ? item.slkiOutcome.slice(0, 75) + '...' : item.slkiOutcome) + '</div></td>' +
        '<td style="padding: 0.75rem 1rem; white-space: nowrap;">' + catBadge + '</td>' +
        '<td style="padding: 0.75rem 1rem; text-align: center; white-space: nowrap;">' + verifBadge + '</td>' +
        '<td style="padding: 0.75rem 1rem; text-align: right; white-space: nowrap;">' + actions + '</td>' +
      '</tr>';
    }).join('');
  }

  // =========================================================================
  // 8. SDKI CATALOG PICKER & SEARCH MODAL (zR equivalent)
  // =========================================================================
  function openSdkiCatalog() {
    state.catalogSearch = '';
    state.catalogCategory = 'Semua';
    state.catalogSelectedCode = state.selectedSdkiCode || 'D.0077';

    const searchInput = document.getElementById('catalogModalSearch');
    if (searchInput) searchInput.value = '';

    renderCatalogCategoryPills();
    renderCatalogList();
    renderCatalogDetail();

    if (typeof window.openModal === 'function') {
      window.openModal('modalSdkiCatalog');
    }
  }

  function renderCatalogCategoryPills() {
    const categories = ["Semua", "Fisiologis", "Psikologis", "Perilaku", "Lingkungan"];
    const container = document.getElementById('catalogCategoryPills');
    if (!container) return;

    container.innerHTML = categories.map(cat => {
      const isActive = (state.catalogCategory === cat);
      return '<button type="button" onclick="ELogbookKomkep.setCatalogCategory('' + cat + '')" ' +
        'style="padding: 4px 10px; border-radius: 6px; font-size: 0.72rem; font-weight: 700; transition: all 0.2s; cursor: pointer; border: 1px solid ' + (isActive ? '#0d9488' : '#cbd5e1') + '; background: ' + (isActive ? '#0d9488' : '#ffffff') + '; color: ' + (isActive ? '#ffffff' : '#475569') + ';">' +
        cat +
      '</button>';
    }).join('');
  }

  function setCatalogCategory(cat) {
    state.catalogCategory = cat;
    renderCatalogCategoryPills();
    renderCatalogList();
  }

  function onCatalogSearch(query) {
    state.catalogSearch = query.toLowerCase().trim();
    renderCatalogList();
  }

  function renderCatalogList() {
    const container = document.getElementById('catalogListContainer');
    if (!container) return;

    const filtered = SDKI_CATALOG.filter(item => {
      if (state.catalogCategory !== 'Semua' && item.category !== state.catalogCategory) return false;
      if (!state.catalogSearch) return true;
      const q = state.catalogSearch;
      return item.code.toLowerCase().includes(q) ||
             item.name.toLowerCase().includes(q) ||
             item.subcategory.toLowerCase().includes(q) ||
             (item.definition && item.definition.toLowerCase().includes(q)) ||
             (item.commonEtiologies && item.commonEtiologies.some(et => et.toLowerCase().includes(q)));
    });

    const countLabel = document.getElementById('catalogResultsCount');
    if (countLabel) countLabel.textContent = filtered.length + " Diagnosis Ditemukan";

    if (filtered.length === 0) {
      container.innerHTML = '<div style="padding: 2rem 1rem; text-align: center; color: #64748b;"><i class="fa-solid fa-magnifying-glass" style="font-size: 1.5rem; color: #94a3b8; margin-bottom: 0.5rem; display: block;"></i>Tidak ditemukan diagnosis SDKI dengan kata kunci tersebut.</div>';
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isSelected = item.code === state.catalogSelectedCode;
      return '<div onclick="ELogbookKomkep.selectCatalogItem('' + item.code + '')" ' +
        'style="padding: 0.75rem; border-radius: 8px; border: 1px solid ' + (isSelected ? '#0d9488' : '#e2e8f0') + '; background: ' + (isSelected ? '#f0fdfa' : '#ffffff') + '; margin-bottom: 0.5rem; cursor: pointer; transition: all 0.2s;">' +
        '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">' +
          '<span style="background: ' + (isSelected ? '#0d9488' : '#e0f2fe') + '; color: ' + (isSelected ? '#ffffff' : '#0369a1') + '; padding: 2px 6px; border-radius: 4px; font-weight: 800; font-size: 0.7rem; font-family: monospace;">' + item.code + '</span>' +
          '<span style="font-size: 0.68rem; font-weight: 700; color: #64748b;">' + item.category + ' • ' + item.subcategory + '</span>' +
        '</div>' +
        '<div style="font-weight: 700; color: #0f172a; font-size: 0.85rem;">' + item.name + '</div>' +
        '<div style="font-size: 0.72rem; color: #64748b; margin-top: 3px; line-height: 1.3;" class="line-clamp-2">' + (item.definition || '') + '</div>' +
      '</div>';
    }).join('');
  }

  function selectCatalogItem(code) {
    state.catalogSelectedCode = code;
    renderCatalogList();
    renderCatalogDetail();
  }

  function renderCatalogDetail() {
    const container = document.getElementById('catalogDetailContainer');
    if (!container) return;

    const item = SDKI_CATALOG.find(d => d.code === state.catalogSelectedCode) || SDKI_CATALOG[0];
    if (!item) return;

    state.catalogSelectedEtiology = item.commonEtiologies ? item.commonEtiologies[0] : '';

    let etOptions = '';
    if (item.commonEtiologies && item.commonEtiologies.length > 0) {
      etOptions = item.commonEtiologies.map((et, i) =>
        '<label style="display: flex; align-items: flex-start; gap: 6px; font-size: 0.75rem; color: #334155; margin-bottom: 5px; cursor: pointer;">' +
          '<input type="radio" name="modalEtChoice" value="' + et + '" ' + (i === 0 ? 'checked' : '') + ' onchange="ELogbookKomkep.setCatalogSelectedEtiology('' + et + '')" style="margin-top: 2px;">' +
          '<span>' + et + '</span>' +
        '</label>'
      ).join('');
    } else {
      etOptions = '<div style="font-size: 0.75rem; color: #64748b; font-style: italic;">Format diagnosis mandiri tanpa etiologi khusus.</div>';
    }

    container.innerHTML =
      '<div style="padding: 1rem; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">' +
        '<div>' +
          '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">' +
            '<span style="background: #0f766e; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-weight: 800; font-size: 0.78rem; font-family: monospace;">' + item.code + '</span>' +
            '<span style="font-size: 0.72rem; font-weight: 700; color: #0d9488; background: #ccfbf1; padding: 2px 6px; border-radius: 4px;">' + item.category + ' • ' + item.subcategory + '</span>' +
          '</div>' +
          '<h4 style="font-size: 1.05rem; font-weight: 800; color: #042f2e; margin-bottom: 0.25rem;">' + item.name + '</h4>' +
          '<p style="font-size: 0.75rem; color: #475569; line-height: 1.4; margin-bottom: 0.75rem;">' + (item.definition || '') + '</p>' +

          '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.65rem; margin-bottom: 0.75rem;">' +
            '<div style="font-size: 0.72rem; font-weight: 800; color: #0f766e; text-transform: uppercase; margin-bottom: 4px;">' +
              '<i class="fa-solid fa-code-branch"></i> Pilih Etiologi / Faktor Penyebab (b.d):' +
            '</div>' +
            etOptions +
          '</div>' +

          '<div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 0.65rem; margin-bottom: 0.75rem;">' +
            '<div style="font-size: 0.72rem; font-weight: 800; color: #065f46; margin-bottom: 2px;">' +
              '<i class="fa-solid fa-hand-holding-medical"></i> Rekomendasi SIKI Utama:' +
            '</div>' +
            '<div style="font-size: 0.8rem; font-weight: 700; color: #042f2e;">' +
              (item.recommendedSiki ? (item.recommendedSiki.code + ' - ' + item.recommendedSiki.title) : '-') +
            '</div>' +
            '<div style="font-size: 0.7rem; color: #064e3b; margin-top: 2px; line-height: 1.3;">' +
              (item.recommendedSiki ? item.recommendedSiki.actionDetail : '') +
            '</div>' +
          '</div>' +

          '<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 0.65rem; margin-bottom: 0.75rem;">' +
            '<div style="font-size: 0.72rem; font-weight: 800; color: #1e40af; margin-bottom: 2px;">' +
              '<i class="fa-solid fa-bullseye"></i> Rekomendasi SLKI Utama:' +
            '</div>' +
            '<div style="font-size: 0.8rem; font-weight: 700; color: #1e3a8a;">' +
              (item.recommendedSlki ? (item.recommendedSlki.code + ' - ' + item.recommendedSlki.title) : '-') +
            '</div>' +
            '<div style="font-size: 0.7rem; color: #1e40af; margin-top: 2px; line-height: 1.3;">' +
              (item.recommendedSlki ? item.recommendedSlki.targetDetail : '') +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div style="margin-top: 1rem; border-top: 1px solid #e2e8f0; padding-top: 0.75rem; display: flex; justify-content: flex-end;">' +
          '<button type="button" class="btn-primary" onclick="ELogbookKomkep.confirmCatalogSelection()" style="width: 100%; justify-content: center; font-size: 0.88rem; padding: 0.6rem 1rem;">' +
            '<i class="fa-solid fa-check"></i> Gunakan Diagnosis Ini di Formulir' +
          '</button>' +
        '</div>' +
      '</div>';
  }

  function setCatalogSelectedEtiology(et) {
    state.catalogSelectedEtiology = et;
  }

  function confirmCatalogSelection() {
    const code = state.catalogSelectedCode;
    const et = state.catalogSelectedEtiology;

    state.selectedSdkiCode = code;
    const select = document.getElementById('logSdkiSelect');
    if (select) select.value = code;

    applySdkiSelection(code, et);
    toggleLogbookForm(true);

    if (typeof window.closeModal === 'function') {
      window.closeModal('modalSdkiCatalog');
    }

    if (typeof window.showToast === 'function') {
      window.showToast('Diagnosis [' + code + '] dan tautan 3S berhasil diterapkan ke formulir.', 'info');
    }
  }

  // =========================================================================
  // 9. DETAIL MODAL & VERIFIKASI / HAPUS
  // =========================================================================
  function viewDetail(id) {
    const records = getRecords();
    const item = records.find(r => r.id === id);
    if (!item) return;

    const modalBody = document.getElementById('bodyDetailELogbook');
    if (!modalBody) return;

    const isVerifier = canVerifyRecord();

    modalBody.innerHTML =
      '<div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 0.75rem; margin-bottom: 1rem;">' +
        '<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap;">' +
          '<div>' +
            '<span style="font-size: 0.7rem; font-weight: 800; color: #0d9488; text-transform: uppercase;">Nomor Dokumen: ' + item.id + '</span>' +
            '<h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-top: 2px;">' +
              item.patientMrn + ' &bull; ' + (item.workUnit || 'Ruang Perawatan') +
            '</h3>' +
          '</div>' +
          '<div>' +
            (item.verifiedByHeadNurse
              ? '<span style="background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 800;"><i class="fa-solid fa-circle-check"></i> Disetujui Kepala Ruangan</span>'
              : '<span style="background: #fffbeb; color: #92400e; border: 1px solid #fde68a; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 800;"><i class="fa-solid fa-clock"></i> Menunggu Verifikasi Preseptor</span>') +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.8rem;">' +
        '<div style="background: #f8fafc; padding: 0.6rem; border-radius: 6px; border: 1px solid #e2e8f0;">' +
          '<div style="color: #64748b; font-size: 0.7rem;">Perawat Pelaksana:</div>' +
          '<div style="font-weight: 700; color: #0f172a;">' + item.nurseName + '</div>' +
        '</div>' +
        '<div style="background: #f8fafc; padding: 0.6rem; border-radius: 6px; border: 1px solid #e2e8f0;">' +
          '<div style="color: #64748b; font-size: 0.7rem;">Tanggal & Shift:</div>' +
          '<div style="font-weight: 700; color: #0f172a;">' + item.date + ' &bull; Shift ' + item.shift + '</div>' +
        '</div>' +
        '<div style="background: #f8fafc; padding: 0.6rem; border-radius: 6px; border: 1px solid #e2e8f0;">' +
          '<div style="color: #64748b; font-size: 0.7rem;">Kategori Tindakan:</div>' +
          '<div style="font-weight: 700; color: #0f172a;">' + item.actionCategory + '</div>' +
        '</div>' +
        '<div style="background: #f8fafc; padding: 0.6rem; border-radius: 6px; border: 1px solid #e2e8f0;">' +
          '<div style="color: #64748b; font-size: 0.7rem;">Unit Pelayanan:</div>' +
          '<div style="font-weight: 700; color: #0f172a;">' + (item.workUnit || '-') + '</div>' +
        '</div>' +
      '</div>' +

      '<div style="margin-bottom: 1rem;">' +
        '<div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem; margin-bottom: 0.6rem;">' +
          '<div style="font-size: 0.72rem; font-weight: 800; color: #166534; text-transform: uppercase;">Diagnosis Keperawatan (SDKI)</div>' +
          '<div style="font-weight: 700; color: #14532d; font-size: 0.88rem; margin-top: 2px;">' + item.sdkiDiagnosis + '</div>' +
        '</div>' +
        '<div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 0.75rem; margin-bottom: 0.6rem;">' +
          '<div style="font-size: 0.72rem; font-weight: 800; color: #065f46; text-transform: uppercase;">Intervensi Keperawatan (SIKI)</div>' +
          '<div style="font-size: 0.82rem; color: #064e3b; margin-top: 2px; line-height: 1.4;">' + item.sikiIntervention + '</div>' +
        '</div>' +
        '<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 0.75rem; margin-bottom: 0.6rem;">' +
          '<div style="font-size: 0.72rem; font-weight: 800; color: #1e40af; text-transform: uppercase;">Target Luaran (SLKI)</div>' +
          '<div style="font-size: 0.82rem; color: #1e3a8a; margin-top: 2px; line-height: 1.4;">' + item.slkiOutcome + '</div>' +
        '</div>' +
      '</div>' +

      '<div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 0.75rem; margin-bottom: 1rem;">' +
        '<div style="font-size: 0.72rem; font-weight: 800; color: #92400e; text-transform: uppercase;">Catatan Evaluasi / SOAP Ringkas</div>' +
        '<div style="font-size: 0.82rem; color: #78350f; margin-top: 2px; line-height: 1.4;">' + (item.notes || '-') + '</div>' +
      '</div>' +

      '<div style="display: flex; justify-content: flex-end; gap: 0.5rem;">' +
        (isVerifier && !item.verifiedByHeadNurse
          ? '<button class="btn-primary" style="background: #059669; border-color: #059669;" onclick="ELogbookKomkep.verifyRecord('' + item.id + ''); closeModal('modalDetailELogbook');"><i class="fa-solid fa-check-double"></i> Sahkan Catatan Ini</button>'
          : '') +
        '<button class="btn-secondary" onclick="closeModal('modalDetailELogbook')">Tutup</button>' +
      '</div>';

    if (typeof window.openModal === 'function') {
      window.openModal('modalDetailELogbook');
    }
  }

  function verifyRecord(id) {
    const records = getRecords();
    const item = records.find(r => r.id === id);
    if (!item) return;

    item.verifiedByHeadNurse = true;
    saveRecords(records);
    renderLogbookMetrics();
    renderLogbookTable();

    if (typeof window.showToast === 'function') {
      window.showToast('Catatan asuhan ' + item.patientMrn + ' berhasil disahkan oleh Preseptor / Ka.Ruang!', 'success');
    }
  }

  function verifyBatch() {
    const records = getRecords();
    let count = 0;
    records.forEach(r => {
      if (!r.verifiedByHeadNurse) {
        r.verifiedByHeadNurse = true;
        count++;
      }
    });
    saveRecords(records);
    renderLogbookMetrics();
    renderLogbookTable();

    if (typeof window.showToast === 'function') {
      window.showToast(count + ' catatan asuhan berhasil disahkan secara batch.', 'success');
    }
  }

  function deleteRecord(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus catatan logbook ini?')) return;
    let records = getRecords();
    records = records.filter(r => r.id !== id);
    saveRecords(records);
    renderLogbookMetrics();
    renderLogbookTable();

    if (typeof window.showToast === 'function') {
      window.showToast('Catatan logbook berhasil dihapus.', 'info');
    }
  }

  // =========================================================================
  // 10. CETAK LAPORAN RESMI & UNDUH CSV
  // =========================================================================
  function openPrintModal() {
    const records = getRecords();
    const container = document.getElementById('bodyPrintELogbook');
    if (!container) return;

    const user = getActiveUser();
    const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    container.innerHTML =
      '<div id="printAreaElogbook" style="font-family: Arial, sans-serif; color: #000; padding: 1rem; line-height: 1.4;">' +
        '<div style="border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; text-align: center;">' +
          '<div style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">Pemerintah Provinsi Kalimantan Barat</div>' +
          '<div style="font-size: 14pt; font-weight: bold; text-transform: uppercase;">RSUD dr. Soedarso Pontianak</div>' +
          '<div style="font-size: 11pt; font-weight: bold; color: #047857;">Komite Keperawatan &mdash; Subkomite Mutu Profesi</div>' +
          '<div style="font-size: 8pt; color: #475569;">Jl. Dr. Soedarso No. 1, Pontianak 78124 | Telp: (0561) 737701 | Website: rsudsoedarso.kalbarprov.go.id</div>' +
        '</div>' +

        '<div style="text-align: center; margin-bottom: 14px;">' +
          '<h4 style="font-size: 12pt; font-weight: bold; margin: 0; text-transform: uppercase; text-decoration: underline;">' +
            'Rekapitulasi E-Logbook Kinerja Asuhan Keperawatan (Standar 3S)' +
          '</h4>' +
          '<div style="font-size: 9pt; color: #475569; margin-top: 2px;">Periode: Kuartal III &bull; Tanggal Cetak: ' + today + '</div>' +
        '</div>' +

        '<div style="margin-bottom: 12px; font-size: 9pt; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">' +
          '<div><strong>Nama Perawat:</strong> ' + (user.name || '-') + '</div>' +
          '<div><strong>NIP / ID:</strong> ' + (user.nip || '-') + '</div>' +
          '<div><strong>Jenjang Karir:</strong> ' + (user.badge || 'Perawat Klinis II (PK II)') + '</div>' +
          '<div><strong>Unit Kerja:</strong> ' + (user.unit || 'Rawat Inap RSUD dr. Soedarso') + '</div>' +
        '</div>' +

        '<table style="width: 100%; border-collapse: collapse; font-size: 8pt; margin-bottom: 16px;">' +
          '<thead>' +
            '<tr style="background: #f1f5f9; border: 1px solid #000;">' +
              '<th style="border: 1px solid #000; padding: 6px;">No</th>' +
              '<th style="border: 1px solid #000; padding: 6px;">Tanggal / Shift</th>' +
              '<th style="border: 1px solid #000; padding: 6px;">No. RM Pasien</th>' +
              '<th style="border: 1px solid #000; padding: 6px;">Diagnosis SDKI &amp; SIKI</th>' +
              '<th style="border: 1px solid #000; padding: 6px;">Target Luaran (SLKI)</th>' +
              '<th style="border: 1px solid #000; padding: 6px;">Kategori</th>' +
              '<th style="border: 1px solid #000; padding: 6px;">Verifikasi Karu</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            records.map((r, i) =>
              '<tr style="border: 1px solid #000;">' +
                '<td style="border: 1px solid #000; padding: 5px; text-align: center;">' + (i + 1) + '</td>' +
                '<td style="border: 1px solid #000; padding: 5px;">' + r.date + '<br><span style="font-size: 7pt; color: #555;">' + r.shift + '</span></td>' +
                '<td style="border: 1px solid #000; padding: 5px; font-family: monospace; font-weight: bold;">' + r.patientMrn + '</td>' +
                '<td style="border: 1px solid #000; padding: 5px;"><strong>' + r.sdkiDiagnosis + '</strong><br><span style="font-size: 7.5pt; color: #333;">' + r.sikiIntervention.slice(0, 90) + '...</span></td>' +
                '<td style="border: 1px solid #000; padding: 5px;">' + r.slkiOutcome.slice(0, 80) + '...</td>' +
                '<td style="border: 1px solid #000; padding: 5px; text-align: center;">' + r.actionCategory + '</td>' +
                '<td style="border: 1px solid #000; padding: 5px; text-align: center;">' + (r.verifiedByHeadNurse ? 'SAH / DISETUJUI' : 'Menunggu') + '</td>' +
              '</tr>'
            ).join('') +
          '</tbody>' +
        '</table>' +

        '<div style="display: flex; justify-content: space-between; margin-top: 24px; font-size: 9pt; page-break-inside: avoid;">' +
          '<div style="text-align: center; width: 45%;">' +
            '<div>Mengetahui,</div>' +
            '<div style="font-weight: bold;">Kepala Ruangan / Preseptor Klinik</div>' +
            '<div style="height: 55px;"></div>' +
            '<div style="font-weight: bold; text-decoration: underline;">Ns. Hendra Wijaya, S.Kep.</div>' +
            '<div>NIP. 000000000000000000</div>' +
          '</div>' +
          '<div style="text-align: center; width: 45%;">' +
            '<div>Pontianak, ' + today + '</div>' +
            '<div style="font-weight: bold;">Perawat Pelaksana</div>' +
            '<div style="height: 55px;"></div>' +
            '<div style="font-weight: bold; text-decoration: underline;">' + (user.name || 'Ns. Siti Rahmah, S.Kep.') + '</div>' +
            '<div>NIP. ' + (user.nip || '000000000000000000') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    if (typeof window.openModal === 'function') {
      window.openModal('modalPrintELogbook');
    }
  }

  function printLogbook() {
    const printArea = document.getElementById('printAreaElogbook');
    if (!printArea) return;

    const win = window.open('', '_blank');
    win.document.write(
      '<!DOCTYPE html><html><head><title>Rekapitulasi E-Logbook 3S - RSUD dr. Soedarso</title>' +
      '<style>@page { size: A4 portrait; margin: 15mm; } body { font-family: Arial, sans-serif; margin: 0; padding: 0; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #000; padding: 6px; font-size: 8pt; } th { background: #f1f5f9; }</style>' +
      '</head><body onload="window.print(); window.close();">' +
      printArea.innerHTML +
      '</body></html>'
    );
    win.document.close();
  }

  function exportCsv() {
    const records = getRecords();
    let csv = "ID,Tanggal,Shift,No.RM,Perawat,Unit,Diagnosis_SDKI,Intervensi_SIKI,Luaran_SLKI,Kategori,Status_Verifikasi,Catatan\n";
    records.forEach(r => {
      const sanitize = (str) => '"' + (str || '').replace(/"/g, '""') + '"';
      csv += [
        r.id,
        r.date,
        r.shift,
        r.patientMrn,
        sanitize(r.nurseName),
        sanitize(r.workUnit),
        sanitize(r.sdkiDiagnosis),
        sanitize(r.sikiIntervention),
        sanitize(r.slkiOutcome),
        r.actionCategory,
        r.verifiedByHeadNurse ? 'Disetujui' : 'Menunggu Review',
        sanitize(r.notes)
      ].join(',') + "\n";
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'E-Logbook_3S_Soedarso_' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // =========================================================================
  // 11. SUBPAGE 3.1: CPD & DIKLAT TERPADU
  // =========================================================================
  function renderCpdSection() {
    const container = document.getElementById('cpdCardsContainer');
    if (!container) return;

    const registeredIds = getRegisteredCpdIds();

    container.innerHTML = CPD_PROGRAMS.map(prog => {
      const isReg = registeredIds.includes(prog.id);
      return '<div style="background: #ffffff; border: 1px solid ' + (isReg ? '#0d9488' : '#e2e8f0') + '; border-radius: 14px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">' +
        '<div>' +
          '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">' +
            '<span style="background: #ccfbf1; color: #0f766e; font-size: 0.68rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">' + prog.category + '</span>' +
            '<span style="background: #ecfdf5; color: #065f46; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; border: 1px solid #a7f3d0;"><i class="fa-solid fa-award"></i> ' + prog.skpPoints + ' SKP PPNI</span>' +
          '</div>' +
          '<h4 style="font-size: 0.95rem; font-weight: 800; color: #0f172a; line-height: 1.4; margin-bottom: 0.5rem;">' + prog.title + '</h4>' +
          '<div style="font-size: 0.75rem; color: #64748b; line-height: 1.5;">' +
            '<div><i class="fa-solid fa-calendar-days" style="width: 14px; color: #0d9488;"></i> ' + prog.dateRange + '</div>' +
            '<div><i class="fa-solid fa-location-dot" style="width: 14px; color: #0d9488;"></i> ' + prog.location + '</div>' +
            '<div><i class="fa-solid fa-hospital-user" style="width: 14px; color: #0d9488;"></i> Penyelenggara: ' + prog.organizer + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between;">' +
          '<div style="font-size: 0.72rem; color: #64748b;">Kuota: <strong style="color: #0f172a;">' + (prog.registeredCount + (isReg ? 1 : 0)) + ' / ' + prog.quota + ' Peserta</strong></div>' +
          '<button type="button" onclick="ELogbookKomkep.toggleCpdRegistration('' + prog.id + '')" style="padding: 0.4rem 0.85rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; transition: all 0.2s; cursor: pointer; border: 1px solid ' + (isReg ? '#10b981' : '#0d9488') + '; background: ' + (isReg ? '#10b981' : '#0d9488') + '; color: #ffffff;">' +
            (isReg ? '<i class="fa-solid fa-circle-check"></i> Terdaftar (E-Tiket)' : '<i class="fa-solid fa-user-plus"></i> Daftar Pelatihan') +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function toggleCpdRegistration(progId) {
    let registered = getRegisteredCpdIds();
    const prog = CPD_PROGRAMS.find(p => p.id === progId);
    if (!prog) return;

    if (registered.includes(progId)) {
      registered = registered.filter(id => id !== progId);
      saveRegisteredCpdIds(registered);
      if (typeof window.showToast === 'function') {
        window.showToast('Pendaftaran untuk "' + prog.title.slice(0, 35) + '..." dibatalkan.', 'info');
      }
    } else {
      registered.push(progId);
      saveRegisteredCpdIds(registered);
      if (typeof window.showToast === 'function') {
        window.showToast('Berhasil mendaftar ke "' + prog.title.slice(0, 35) + '...". E-Tiket diterbitkan!', 'success');
      }
    }

    renderCpdSection();
  }

  // =========================================================================
  // 12. SUBPAGE 3.3: OPPE DASHBOARD (STARKES KKS 11)
  // =========================================================================
  function renderOppeSection() {
    const container = document.getElementById('oppeIndicatorsContainer');
    if (!container) return;

    container.innerHTML = OPPE_INDICATORS.map(item => {
      const pct = Math.min(item.achievedPercent, 100);
      const isTargetMet = item.achievedPercent >= item.targetPercent;
      const statusBadge = item.status === 'Tercapai'
        ? '<span style="background: #ecfdf5; color: #065f46; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; border: 1px solid #a7f3d0;">Tercapai</span>'
        : item.status === 'Mendekati Target'
        ? '<span style="background: #fefce8; color: #854d0e; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; border: 1px solid #fef08a;">Mendekati Target</span>'
        : '<span style="background: #fef2f2; color: #991b1b; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; border: 1px solid #fecaca;">Perlu Perhatian</span>';

      const barColor = isTargetMet ? '#10b981' : item.status === 'Mendekati Target' ? '#f59e0b' : '#ef4444';

      return '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem;">' +
        '<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.35rem;">' +
          '<div>' +
            '<span style="font-size: 0.68rem; font-weight: 800; color: #64748b; text-transform: uppercase;">' + item.domain + '</span>' +
            '<h5 style="font-size: 0.88rem; font-weight: 800; color: #0f172a; margin-top: 2px;">' + item.indicator + '</h5>' +
          '</div>' +
          '<div style="display: flex; align-items: center; gap: 0.5rem;">' +
            '<span style="font-family: monospace; font-weight: 800; font-size: 0.85rem; color: #0f172a;">' +
              item.achievedPercent + '% <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">/ Target ' + item.targetPercent + '%</span>' +
            '</span>' +
            statusBadge +
          '</div>' +
        '</div>' +
        '<div style="background: #e2e8f0; border-radius: 999px; height: 8px; overflow: hidden; margin-top: 6px;">' +
          '<div style="background: ' + barColor + '; width: ' + pct + '%; height: 100%; border-radius: 999px;"></div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // =========================================================================
  // 13. SUBPAGE 3.4: KATALOG STANDAR 3S PPNI
  // =========================================================================
  function renderKatalog3STable() {
    const container = document.getElementById('containerKatalog3S');
    if (!container) return;

    container.innerHTML =
      '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 1.25rem; margin-bottom: 1.25rem;">' +
        '<h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 0.5rem;">' +
          '<i class="fa-solid fa-book-medical" style="color: #0d9488;"></i>' +
          'Database Lengkap 30 Diagnosis Keperawatan (SDKI) & Tautan SIKI-SLKI RSUD dr. Soedarso' +
        '</h3>' +
        '<p style="font-size: 0.82rem; color: #64748b; margin-top: 0.25rem;">' +
          'Standar acuan Buku Putih PPNI untuk integrasi dokumentasi asuhan klinis, keselamatan pasien, dan pemenuhan SKP Kemenkes.' +
        '</p>' +
      '</div>' +

      '<div class="table-responsive" style="background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0;">' +
        '<table class="data-table" style="font-size: 0.8rem;">' +
          '<thead>' +
            '<tr>' +
              '<th style="width: 110px;">Kode SDKI</th>' +
              '<th>Diagnosis Keperawatan (SDKI)</th>' +
              '<th>Kategori / Subkategori</th>' +
              '<th>Luaran Utama (SLKI)</th>' +
              '<th>Intervensi Utama (SIKI)</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            SDKI_CATALOG.map(d =>
              '<tr>' +
                '<td><span style="background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; font-weight: 800; font-family: monospace;">' + d.code + '</span></td>' +
                '<td><strong style="color: #0f766e; font-size: 0.88rem;">' + d.name + '</strong><div style="font-size: 0.72rem; color: #64748b; margin-top: 2px;">' + (d.definition || '') + '</div></td>' +
                '<td><span style="font-weight: 700; color: #334155;">' + d.category + '</span><div style="font-size: 0.7rem; color: #64748b;">' + d.subcategory + '</div></td>' +
                '<td>' +
                  (d.recommendedSlki ? ('<div style="font-weight: 700; color: #1e40af;">' + d.recommendedSlki.code + ' - ' + d.recommendedSlki.title + '</div><div style="font-size: 0.7rem; color: #475569; margin-top: 2px;">' + d.recommendedSlki.targetDetail + '</div>') : '-') +
                '</td>' +
                '<td>' +
                  (d.recommendedSiki ? ('<div style="font-weight: 700; color: #065f46;">' + d.recommendedSiki.code + ' - ' + d.recommendedSiki.title + '</div><div style="font-size: 0.7rem; color: #475569; margin-top: 2px;">' + d.recommendedSiki.actionDetail + '</div>') : '-') +
                '</td>' +
              '</tr>'
            ).join('') +
          '</tbody>' +
        '</table>' +
      '</div>';
  }

  // =========================================================================
  // 14. INITIALIZATION & GLOBAL EXPORT
  // =========================================================================
  function init() {
    initFormFields();
    renderLogbookMetrics();
    renderLogbookTable();
    renderCpdSection();
    renderOppeSection();
    renderKatalog3STable();

    const searchInput = document.getElementById('searchLogbookInput');
    if (searchInput) {
      searchInput.addEventListener('input', renderLogbookTable);
    }

    ['filterLogbookUnit', 'filterLogbookShift', 'filterLogbookCategory', 'filterLogbookStatus'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', renderLogbookTable);
      }
    });

    const form = document.getElementById('formELogbook');
    if (form) {
      form.addEventListener('submit', saveLogbookRecord);
    }
  }

  window.ELogbookKomkep = {
    init: init,
    switchMutuSubtab: switchMutuSubtab,
    toggleLogbookForm: toggleLogbookForm,
    selectQuickDiagnosis: selectQuickDiagnosis,
    applySdkiSelection: applySdkiSelection,
    onEtiologyChange: onEtiologyChange,
    onSikiChange: onSikiChange,
    onSlkiChange: onSlkiChange,
    saveLogbookRecord: saveLogbookRecord,
    renderLogbookMetrics: renderLogbookMetrics,
    renderLogbookTable: renderLogbookTable,
    openSdkiCatalog: openSdkiCatalog,
    setCatalogCategory: setCatalogCategory,
    onCatalogSearch: onCatalogSearch,
    selectCatalogItem: selectCatalogItem,
    setCatalogSelectedEtiology: setCatalogSelectedEtiology,
    confirmCatalogSelection: confirmCatalogSelection,
    viewDetail: viewDetail,
    verifyRecord: verifyRecord,
    verifyBatch: verifyBatch,
    deleteRecord: deleteRecord,
    openPrintModal: openPrintModal,
    printLogbook: printLogbook,
    exportCsv: exportCsv,
    toggleCpdRegistration: toggleCpdRegistration,
    getSikiCatalog: function() { return SIKI_CATALOG; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 150);
  }

})();
