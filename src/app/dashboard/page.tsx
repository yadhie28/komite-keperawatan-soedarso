import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  const election = await prisma.election.findFirst({
    where: { isActive: true },
  });

  const totalCandidates = await prisma.candidate.count({
    where: { isActive: true },
  });

  const totalVoters = await prisma.user.count({
    where: { role: "VOTER" },
  });

  const totalVotesCast = await prisma.vote.count();

  const now = new Date();
  const isElectionActive =
    election &&
    election.isActive &&
    new Date(election.startDate) <= now &&
    new Date(election.endDate) >= now;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">
            Selamat Datang, {user.name}!
          </h1>
          <p className="text-gray-500 mt-1">NIP: {user.nip} | Unit: {user.unit}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-[#1e3a5f] mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
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
            Status Pemilihan
          </h2>
          {election ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-gray-600 font-medium">{election.title}</span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    isElectionActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      isElectionActive ? "bg-green-500 animate-pulse" : "bg-red-500"
                    }`}
                  />
                  {isElectionActive ? "Sedang Berlangsung" : "Tidak Aktif"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 rounded-lg p-3">
                  <span className="text-gray-500">Mulai:</span>{" "}
                  <span className="text-[#1e3a5f] font-medium">
                    {formatDate(election.startDate)}
                  </span>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <span className="text-gray-500">Selesai:</span>{" "}
                  <span className="text-[#1e3a5f] font-medium">
                    {formatDate(election.endDate)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Tidak ada pemilihan aktif saat ini.</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-[#1e3a5f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-[#1e3a5f]">{totalCandidates}</p>
            <p className="text-gray-500 text-sm">Kandidat</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V21"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-green-600">{totalVoters}</p>
            <p className="text-gray-500 text-sm">Total Pemilih</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-purple-600"
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
            <p className="text-3xl font-bold text-purple-600">{totalVotesCast}</p>
            <p className="text-gray-500 text-sm">Suara Masuk</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">
            Status Voting Anda
          </h2>
          {user.hasVoted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Anda sudah memberikan suara
              </h3>
              <p className="text-gray-500">
                Terima kasih atas partisipasi Anda dalam pemilihan ini.
              </p>
              <Link
                href="/hasil"
                className="inline-flex items-center mt-4 px-6 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2a4f7f] transition-colors"
              >
                Lihat Hasil Sementara
              </Link>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-yellow-700 mb-2">
                Anda belum memberikan suara
              </h3>
              <p className="text-gray-500 mb-4">
                {isElectionActive
                  ? "Pemilihan sedang berlangsung. Segera berikan suara Anda!"
                  : "Pemilihan belum dimulai atau sudah selesai."}
              </p>
              {isElectionActive && (
                <Link
                  href="/voting"
                  className="inline-flex items-center px-8 py-3 bg-[#1e3a5f] text-white rounded-lg font-semibold hover:bg-[#2a4f7f] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Voting Sekarang
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
