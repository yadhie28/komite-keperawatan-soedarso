import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const election = await prisma.election.findFirst({
    where: { isActive: true },
  });

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const now = new Date();
  const isElectionActive =
    election &&
    election.isActive &&
    new Date(election.startDate) <= now &&
    new Date(election.endDate) >= now;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#2a4f7f]">
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-[#1e3a5f] font-bold text-lg">RS</span>
            </div>
            <div className="text-white">
              <p className="text-sm font-medium">RSUD dr. Soedarso</p>
              <p className="text-xs text-blue-200">Pontianak, Kalimantan Barat</p>
            </div>
          </div>
          <Link
            href="/login"
            className="px-6 py-2 bg-white text-[#1e3a5f] rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
          >
            Masuk
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg
              className="w-12 h-12 text-[#1e3a5f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            E-Voting Ketua Komite Keperawatan
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-200 mb-2">
            RSUD dr. Soedarso
          </h2>
          <p className="text-lg text-blue-300 font-medium">Periode 2027 - 2030</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Informasi Pemilihan
          </h3>

          {election ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Judul Pemilihan</p>
                  <p className="font-semibold text-[#1e3a5f]">{election.title}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isElectionActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        isElectionActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {isElectionActive ? "Sedang Berlangsung" : "Belum Aktif / Selesai"}
                  </span>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Mulai</p>
                  <p className="font-semibold text-[#1e3a5f]">
                    {formatDate(election.startDate)}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Selesai</p>
                  <p className="font-semibold text-[#1e3a5f]">
                    {formatDate(election.endDate)}
                  </p>
                </div>
              </div>
              {election.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
                  <p className="text-gray-700">{election.description}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                Belum ada pemilihan yang dijadwalkan.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Silakan hubungi administrator untuk informasi lebih lanjut.
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 bg-white text-[#1e3a5f] rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Masuk untuk Memilih
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Aman & Rahasia</h4>
            <p className="text-blue-200 text-sm">
              Suara Anda terjamin kerahasiaannya dengan sistem keamanan terbaik.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Cepat & Mudah</h4>
            <p className="text-blue-200 text-sm">
              Proses pemilihan cepat dan mudah, cukup beberapa klik saja.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h4 className="text-white font-semibold mb-2">Transparan</h4>
            <p className="text-blue-200 text-sm">
              Hasil pemilihan dapat dipantau secara real-time dan transparan.
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-blue-200 text-sm">
            &copy; {new Date().getFullYear()} Komite Keperawatan RSUD dr. Soedarso.
            Seluruh hak cipta dilindungi.
          </p>
          <p className="text-blue-300/50 text-xs mt-2">
            Sistem E-Voting Pemilihan Ketua Komite Keperawatan Periode 2027-2030
          </p>
        </div>
      </footer>
    </div>
  );
}
