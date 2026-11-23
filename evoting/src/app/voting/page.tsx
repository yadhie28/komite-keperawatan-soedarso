"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";

interface Candidate {
  id: string;
  name: string;
  nip: string;
  photo: string | null;
  visiMisi: string;
  pengalaman: string;
  unit: string;
  isActive: boolean;
}

export default function VotingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchCandidates = useCallback(async () => {
    try {
      const res = await fetch("/api/candidates");
      if (res.ok) {
        const data = await res.json();
        setCandidates(data);
      } else {
        setError("Gagal memuat data kandidat.");
      }
    } catch {
      setError("Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      const user = session?.user as { hasVoted?: boolean };
      if (user?.hasVoted) {
        router.push("/dashboard");
        return;
      }
      fetchCandidates();
    }
  }, [status, session, router, fetchCandidates]);

  const handleVote = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowConfirmModal(true);
  };

  const confirmVote = async () => {
    if (!selectedCandidate) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId: selectedCandidate.id }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Gagal menyimpan suara.");
        setShowConfirmModal(false);
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setShowConfirmModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg
              className="animate-spin h-10 w-10 text-[#1e3a5f] mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-gray-500">Memuat data kandidat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-2">
            Pilih Kandidat Anda
          </h1>
          <p className="text-gray-500">
            Klik tombol &quot;Pilih&quot; pada kandidat yang Anda dukung. Suara tidak dapat
            diubah setelah disimpan.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {candidates.length === 0 ? (
          <div className="text-center py-12">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-gray-500 text-lg">Belum ada kandidat yang terdaftar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4f7f] p-6 text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    {candidate.photo ? (
                      <img
                        src={candidate.photo}
                        alt={candidate.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
                  <p className="text-blue-200 text-sm">NIP: {candidate.nip}</p>
                  <p className="text-blue-200 text-sm">Unit: {candidate.unit}</p>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-[#1e3a5f] uppercase tracking-wide mb-2">
                      Visi & Misi
                    </h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line">
                      {candidate.visiMisi}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1e3a5f] uppercase tracking-wide mb-2">
                      Pengalaman
                    </h4>
                    <p className="text-gray-600 text-sm whitespace-pre-line">
                      {candidate.pengalaman}
                    </p>
                  </div>
                  <button
                    onClick={() => handleVote(candidate)}
                    className="w-full py-3 bg-[#1e3a5f] text-white rounded-lg font-semibold hover:bg-[#2a4f7f] transition-colors"
                  >
                    Pilih
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showConfirmModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
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
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">
                Konfirmasi Pilihan
              </h3>
              <p className="text-gray-600">
                Apakah Anda yakin ingin memilih:
              </p>
              <p className="text-lg font-bold text-[#1e3a5f] mt-2">
                {selectedCandidate.name}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                NIP: {selectedCandidate.nip} | Unit: {selectedCandidate.unit}
              </p>
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-600 text-sm font-medium">
                  ⚠️ Suara Anda tidak dapat diubah setelah disimpan!
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedCandidate(null);
                }}
                disabled={submitting}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={confirmVote}
                disabled={submitting}
                className="flex-1 py-3 bg-[#1e3a5f] text-white rounded-lg font-semibold hover:bg-[#2a4f7f] transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  "Ya, Pilih"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
