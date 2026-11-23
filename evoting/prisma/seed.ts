import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Memulai proses seeding database...\n");

  // Bersihkan data yang ada
  await prisma.vote.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.election.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Data lama telah dibersihkan.\n");

  // ============================================================
  // 1. Buat Akun Admin
  // ============================================================
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.create({
    data: {
      nip: "ADMIN001",
      name: "Administrator",
      email: "admin@rsud-soedarso.go.id",
      password: adminPassword,
      unit: "Bidang Keperawatan",
      role: "ADMIN",
      hasVoted: false,
    },
  });
  console.log(`✅ Admin dibuat: ${admin.name} (NIP: ${admin.nip})`);

  // ============================================================
  // 2. Buat Kandidat
  // ============================================================
  const candidates = await Promise.all([
    prisma.candidate.create({
      data: {
        name: "Ns. Siti Rahmawati, S.Kep., M.Kep.",
        nip: "000000000000000000",
        photo: null,
        visiMisi:
          "VISI:\nMewujudkan Komite Keperawatan RSUD dr. Soedarso sebagai organisasi profesional yang unggul dalam mendorong mutu pelayanan keperawatan berstandar internasional.\n\nMISI:\n1. Meningkatkan kompetensi perawat melalui program pendidikan dan pelatihan berkelanjutan yang terstruktur.\n2. Mengembangkan standar praktik keperawatan berbasis evidence-based nursing practice.\n3. Membangun sistem kredensial dan rekredensial yang transparan, akuntabel, dan berkeadilan.\n4. Mendorong inovasi pelayanan keperawatan dengan pemanfaatan teknologi digital.\n5. Memperkuat kolaborasi interprofesional untuk peningkatan keselamatan pasien.",
        pengalaman:
          "• Kepala Ruang ICU RSUD dr. Soedarso (2018 - 2024)\n• Anggota Tim Akreditasi Keperawatan RSUD dr. Soedarso (2019 - 2023)\n• Wakil Ketua Komite Keperawatan Periode 2024 - 2027\n• Pelatih BLS/ACLS Tersertifikasi AHA\n• Magister Keperawatan - Universitas Indonesia (2016)\n• Pemakalah Seminar Nasional Keperawatan Kritis 2022\n• Anggota PPNI Kalimantan Barat sejak 2010",
        unit: "ICU",
        isActive: true,
      },
    }),
    prisma.candidate.create({
      data: {
        name: "Ns. Muhammad Fadli Hidayat, S.Kep., Sp.KMB.",
        nip: "000000000000000000",
        photo: null,
        visiMisi:
          "VISI:\nMenjadikan Komite Keperawatan sebagai motor penggerak transformasi pelayanan keperawatan yang humanis, profesional, dan berorientasi pada kepuasan pasien di RSUD dr. Soedarso.\n\nMISI:\n1. Membangun budaya kerja profesional dengan mengedepankan etika keperawatan dan caring behavior.\n2. Mengoptimalkan peran komite dalam pembinaan etik dan disiplin profesi keperawatan.\n3. Meningkatkan kesejahteraan dan perlindungan hukum bagi tenaga keperawatan.\n4. Mengembangkan riset keperawatan sebagai dasar pengembangan praktik klinis.\n5. Memfasilitasi jenjang karir perawat klinis sesuai dengan Permenkes yang berlaku.",
        pengalaman:
          "• Kepala Instalasi Rawat Inap Bedah RSUD dr. Soedarso (2020 - sekarang)\n• Ketua Tim Keselamatan Pasien (Patient Safety) 2019 - 2023\n• Spesialis Keperawatan Medikal Bedah - Universitas Padjadjaran (2018)\n• Asesor Kompetensi Perawat MTKI Kalbar\n• Penerima Penghargaan Perawat Teladan Tingkat Provinsi Kalbar 2021\n• Instruktur Perawatan Luka Modern Tersertifikasi WCET\n• Pengurus PPNI Cabang Kota Pontianak 2020 - sekarang",
        unit: "Rawat Inap Bedah",
        isActive: true,
      },
    }),
    prisma.candidate.create({
      data: {
        name: "Ns. Dewi Kartika Sari, S.Kep., M.Kep.",
        nip: "000000000000000000",
        photo: null,
        visiMisi:
          "VISI:\nMembangun Komite Keperawatan yang adaptif, inovatif, dan kolaboratif dalam mewujudkan pelayanan keperawatan prima di era transformasi kesehatan digital RSUD dr. Soedarso.\n\nMISI:\n1. Mengakselerasi digitalisasi dokumentasi dan sistem informasi keperawatan.\n2. Meningkatkan mutu asuhan keperawatan melalui audit klinis berkala dan terukur.\n3. Mengembangkan program mentoring dan preceptorship untuk perawat baru.\n4. Memfasilitasi kerjasama dengan institusi pendidikan keperawatan untuk pengembangan SDM.\n5. Membangun sistem penghargaan berbasis kinerja untuk memotivasi tenaga keperawatan.",
        pengalaman:
          "• Koordinator Diklat Keperawatan RSUD dr. Soedarso (2021 - sekarang)\n• Anggota Komite Keperawatan Sub Komite Mutu Periode 2024 - 2027\n• Magister Keperawatan Peminatan Manajemen - Universitas Gadjah Mada (2019)\n• Tim Pengembang Sistem Informasi Keperawatan RS (2022 - 2024)\n• Fasilitator Pelatihan Manajemen Bangsal Tingkat Nasional\n• Penerima Beasiswa LPDP untuk Studi S2 (2017)\n• Peneliti aktif dengan 8 publikasi jurnal nasional terakreditasi",
        unit: "Diklat Keperawatan",
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${candidates.length} kandidat berhasil dibuat:`);
  candidates.forEach((c, i) => {
    console.log(`   ${i + 1}. ${c.name} (NIP: ${c.nip})`);
  });

  // ============================================================
  // 3. Buat Pemilih (Voter)
  // ============================================================
  const voterPassword = await hash("voter123", 12);

  const voters = await Promise.all([
    prisma.user.create({
      data: {
        nip: "000000000000000000",
        name: "Ns. Rina Marlina, S.Kep.",
        email: "rina.marlina@rsud-soedarso.go.id",
        password: voterPassword,
        unit: "Ruang Rawat Inap Penyakit Dalam",
        role: "VOTER",
        hasVoted: false,
      },
    }),
    prisma.user.create({
      data: {
        nip: "000000000000000000",
        name: "Ns. Bambang Tri Wahyudi, S.Kep.",
        email: "bambang.wahyudi@rsud-soedarso.go.id",
        password: voterPassword,
        unit: "IGD",
        role: "VOTER",
        hasVoted: false,
      },
    }),
    prisma.user.create({
      data: {
        nip: "000000000000000000",
        name: "Ns. Yuliana Puspitasari, S.Kep.",
        email: "yuliana.puspita@rsud-soedarso.go.id",
        password: voterPassword,
        unit: "Ruang Operasi",
        role: "VOTER",
        hasVoted: false,
      },
    }),
    prisma.user.create({
      data: {
        nip: "000000000000000000",
        name: "Ns. Ahmad Rizki Pratama, S.Kep.",
        email: "ahmad.rizki@rsud-soedarso.go.id",
        password: voterPassword,
        unit: "Ruang Rawat Inap Anak",
        role: "VOTER",
        hasVoted: false,
      },
    }),
    prisma.user.create({
      data: {
        nip: "000000000000000000",
        name: "Ns. Lestari Handayani, S.Kep.",
        email: "lestari.handayani@rsud-soedarso.go.id",
        password: voterPassword,
        unit: "Poliklinik",
        role: "VOTER",
        hasVoted: false,
      },
    }),
  ]);

  console.log(`\n✅ ${voters.length} pemilih berhasil dibuat:`);
  voters.forEach((v, i) => {
    console.log(`   ${i + 1}. ${v.name} (NIP: ${v.nip}) - ${v.unit}`);
  });

  // ============================================================
  // 4. Buat Data Pemilihan (Election)
  // ============================================================
  const election = await prisma.election.create({
    data: {
      title: "Pemilihan Ketua Komite Keperawatan Periode 2027-2030",
      description:
        "Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso untuk periode 2027-2030. Pemilihan ini diselenggarakan secara elektronik untuk memastikan proses yang transparan, aman, dan efisien. Setiap anggota komite keperawatan memiliki hak satu suara yang bersifat rahasia.",
      startDate: new Date("2027-01-15T08:00:00.000Z"),
      endDate: new Date("2027-01-15T17:00:00.000Z"),
      isActive: true,
    },
  });

  console.log(`\n✅ Pemilihan dibuat: ${election.title}`);
  console.log(
    `   Periode: ${election.startDate.toLocaleDateString("id-ID")} - ${election.endDate.toLocaleDateString("id-ID")}`
  );

  // ============================================================
  // Ringkasan
  // ============================================================
  console.log("\n" + "=".repeat(60));
  console.log("📊 RINGKASAN SEEDING DATABASE");
  console.log("=".repeat(60));
  console.log(`   👤 Admin      : 1 akun (NIP: ADMIN001 / Pass: admin123)`);
  console.log(`   🗳️  Kandidat   : ${candidates.length} orang`);
  console.log(
    `   👥 Pemilih    : ${voters.length} orang (Pass: voter123)`
  );
  console.log(`   📋 Pemilihan  : 1 data`);
  console.log("=".repeat(60));
  console.log("✨ Seeding selesai!\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error saat seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
