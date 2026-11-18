"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface ElectionData {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface StatsData {
  totalVoters: number;
  totalVotesCast: number;
  participationRate: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [election, setElection] = useState<ElectionData | null>(null);
  const [stats, setStats] = useState<StatsData>({
    totalVoters: 0,
    totalVotesCast: 0,
    participationRate: "0",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editElection, setEditElection] = useState(false);
  const [electionForm, setElectionForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isActive: false,
  });

  const fetchData = useCallback(async () => {
    try {
      const [electionRes, resultsRes] = await Promise.all([
        fetch("/api/election"),
        fetch("/api/results"),
      ]);

      if (electionRes.ok) {
        const elData = await electionRes.json();
        if (elData) {
          setElection(elData);
          setElectionForm({
            title: elData.title || "",
            description: elData.description || "",
            startDate: elData.startDate
              ? new Date(elData.startDate).toISOString().slice(0, 16)
              : "",
            endDate: elData.endDate
              ? new Date(elData.endDate).toISOString().slice(0, 16)
              : "",
            isActive: elData.isActive || false,
          });
        }
      }

      if (resultsRes.ok) {
        const resData = await resultsRes.json();
        const totalVoters = resData.totalVoters || 0;
        const totalVotesCast = resData.totalVotesCast || 0;
        const participationRate =
          totalVoters > 0
            ? ((totalVotesCast / totalVoters) * 100).toFixed(1)
            : "0";
        setStats({ totalVoters, totalVotesCast, participationRate });
      }
    } catch {
      setError("Gagal memuat data.");
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
      const user = session?.user as { role?: string };
      if (user?.role !== "ADMIN") {
        router.push("/dashboard");
        return;
      }
      fetchData();
    }
  }, [status, session, router, fetchData]);

  const handleSaveElection = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/election", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...electionForm,
          startDate: new Date(electionForm.startDate).toISOString(),
          endDate: new Date(electionForm.endDate).toISOString(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setElection(data);
        setEditElection(false);
        setSuccess("Pengaturan pemilihan berhasil disimpan.");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Gagal menyimpan pengaturan.");
      }
    } catch {
      setError("Terjadi kesalahan.");
    } finally {
      setSaving(false);
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
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-500">Memuat halaman admin...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">
            Dashboard Admin
          </h1>
          <p className="text-gray-500 mt-1">
            Kelola pemilihan, kandidat, dan pemilih
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V21" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-[#1e3a5f]">{stats.totalVoters}</p>
            <p className="text-gray-500 text-sm">Total Pemilih</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.totalVotesCast}</p>
            <p className="text-gray-500 text-sm">Suara Masuk</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-purple-600">{stats.participationRate}%</p>
            <p className="text-gray-500 text-sm">Tingkat Partisipasi</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1e3a5f]">
              Pengaturan Pemilihan
            </h2>
            {!editElection && (
              <button
                onClick={() => setEditElection(true)}
                className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg text-sm hover:bg-[#2a4f7f] transition-colors"
              >
                Edit Pengaturan
              </button>
            )}
          </div>

          {editElection ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Pemilihan
                </label>
                <input
                  type="text"
                  value={electionForm.title}
                  onChange={(e) =>
                    setElectionForm({ ...electionForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={electionForm.description}
                  onChange={(e) =>
                    setElectionForm({ ...electionForm, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Mulai
                  </label>
                  <input
                    type="datetime-local"
                    value={electionForm.startDate}
                    onChange={(e) =>
                      setElectionForm({ ...electionForm, startDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Selesai
                  </label>
                  <input
                    type="datetime-local"
                    value={electionForm.endDate}
                    onChange={(e) =>
                      setElectionForm({ ...electionForm, endDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={electionForm.isActive}
                  onChange={(e) =>
                    setElectionForm({ ...electionForm, isActive: e.target.checked })
                  }
                  className="w-4 h-4 text-[#1e3a5f] border-gray-300 rounded focus:ring-[#1e3a5f]"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Aktifkan Pemilihan
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setEditElection(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveElection}
                  disabled={saving}
                  className="px-6 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2a4f7f] transition-colors disabled:opacity-50 flex items-center"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </div>
          ) : election ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Judul:</span>
                  <p className="font-medium text-gray-900">{election.title}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status:</span>
                  <p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        election.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {election.isActive ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Mulai:</span>
                  <p className="font-medium text-gray-900">
                    {election.startDate
                      ? new Date(election.startDate).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Selesai:</span>
                  <p className="font-medium text-gray-900">
                    {election.endDate
                      ? new Date(election.endDate).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Belum ada pengaturan pemilihan. Klik &quot;Edit Pengaturan&quot; untuk membuat.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/kandidat"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-[#1e3a5f] mb-1">Kelola Kandidat</h3>
            <p className="text-gray-500 text-sm">Tambah, edit, dan hapus kandidat</p>
          </Link>

          <Link
            href="/admin/pemilih"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197V21" />
              </svg>
            </div>
            <h3 className="font-bold text-[#1e3a5f] mb-1">Kelola Pemilih</h3>
            <p className="text-gray-500 text-sm">Kelola daftar pemilih terdaftar</p>
          </Link>

          <Link
            href="/admin/hasil"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-bold text-[#1e3a5f] mb-1">Hasil Pemilihan</h3>
            <p className="text-gray-500 text-sm">Lihat hasil dan statistik pemilihan</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
