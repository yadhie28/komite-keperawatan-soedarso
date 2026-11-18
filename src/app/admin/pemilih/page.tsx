"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";

interface Voter {
  id: string;
  name: string;
  nip: string;
  email: string | null;
  unit: string;
  hasVoted: boolean;
  role: string;
}

const emptyForm = {
  name: "",
  nip: "",
  email: "",
  unit: "",
  password: "",
};

export default function AdminPemilihPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchVoters = useCallback(async () => {
    try {
      const res = await fetch("/api/voters");
      if (res.ok) {
        const data = await res.json();
        setVoters(data);
      }
    } catch {
      setError("Gagal memuat data pemilih.");
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
      fetchVoters();
    }
  }, [status, session, router, fetchVoters]);

  const handleSubmit = async () => {
    if (!form.name || !form.nip || !form.unit || !form.password) {
      setError("Nama, NIP, Unit, dan Password wajib diisi.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/voters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess("Pemilih berhasil ditambahkan.");
        setForm(emptyForm);
        setShowForm(false);
        fetchVoters();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Gagal menambahkan pemilih.");
      }
    } catch {
      setError("Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetVote = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin mereset status voting pemilih ini?")) return;

    try {
      const res = await fetch(`/api/voters/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hasVoted: false }),
      });

      if (res.ok) {
        setSuccess("Status voting berhasil direset.");
        fetchVoters();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Gagal mereset status voting.");
      }
    } catch {
      setError("Terjadi kesalahan.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pemilih ini?")) return;

    try {
      const res = await fetch(`/api/voters/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccess("Pemilih berhasil dihapus.");
        fetchVoters();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Gagal menghapus pemilih.");
      }
    } catch {
      setError("Terjadi kesalahan.");
    }
  };

  const filteredVoters = voters.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const votedCount = voters.filter((v) => v.hasVoted).length;
  const notVotedCount = voters.filter((v) => !v.hasVoted).length;

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-[#1e3a5f] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-500">Memuat data pemilih...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">
              Kelola Pemilih
            </h1>
            <p className="text-gray-500 mt-1">Kelola daftar pemilih terdaftar</p>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                setForm(emptyForm);
                setShowForm(true);
              }}
              className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2a4f7f] transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Pemilih
            </button>
          )}
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-2xl font-bold text-[#1e3a5f]">{voters.length}</p>
            <p className="text-gray-500 text-sm">Total Pemilih</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{votedCount}</p>
            <p className="text-gray-500 text-sm">Sudah Memilih</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{notVotedCount}</p>
            <p className="text-gray-500 text-sm">Belum Memilih</p>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">
              Tambah Pemilih Baru
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NIP *
                  </label>
                  <input
                    type="text"
                    value={form.nip}
                    onChange={(e) => setForm({ ...form, nip: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
                    placeholder="Masukkan NIP"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
                    placeholder="Masukkan email (opsional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Kerja *
                  </label>
                  <input
                    type="text"
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
                    placeholder="Masukkan unit kerja"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
                  placeholder="Masukkan password"
                />
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-700 text-sm">
                  💡 Untuk menambahkan banyak pemilih sekaligus, hubungi administrator untuk proses impor data.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setForm(emptyForm);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
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
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama, NIP, atau unit..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none text-gray-900"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1e3a5f] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">No</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Nama</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">NIP</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Unit</th>
                  <th className="px-6 py-3 text-center text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVoters.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                      {searchQuery ? "Tidak ada pemilih yang ditemukan." : "Belum ada pemilih terdaftar."}
                    </td>
                  </tr>
                ) : (
                  filteredVoters.map((voter, index) => (
                    <tr key={voter.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {voter.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{voter.nip}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {voter.email || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{voter.unit}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            voter.hasVoted
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {voter.hasVoted ? "Sudah Memilih" : "Belum Memilih"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {voter.hasVoted && (
                            <button
                              onClick={() => handleResetVote(voter.id)}
                              className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                            >
                              Reset
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(voter.id)}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
