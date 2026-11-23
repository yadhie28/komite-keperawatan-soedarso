"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface ResultData {
  candidateId: string;
  candidateName: string;
  candidateNip: string;
  candidateUnit: string;
  voteCount: number;
}

interface StatsData {
  totalVoters: number;
  totalVotesCast: number;
}

const COLORS = [
  "#1e3a5f",
  "#2a4f7f",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
];

export default function HasilPage() {
  const [results, setResults] = useState<ResultData[]>([]);
  const [stats, setStats] = useState<StatsData>({ totalVoters: 0, totalVotesCast: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch("/api/results");
      if (res.ok) {
        const data = await res.json();
        setResults(data.results);
        setStats({
          totalVoters: data.totalVoters,
          totalVotesCast: data.totalVotesCast,
        });
      } else {
        setError("Gagal memuat hasil pemilihan.");
      }
    } catch {
      setError("Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleRefresh = () => {
    setLoading(true);
    fetchResults();
  };

  const winner = results.length > 0
    ? results.reduce((prev, curr) => (curr.voteCount > prev.voteCount ? curr : prev))
    : null;

  const participationRate =
    stats.totalVoters > 0
      ? ((stats.totalVotesCast / stats.totalVoters) * 100).toFixed(1)
      : "0";

  const pieData = results.map((r) => ({
    name: r.candidateName,
    value: r.voteCount,
  }));

  if (loading) {
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
            <p className="text-gray-500">Memuat hasil pemilihan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">
              Hasil Pemilihan
            </h1>
            <p className="text-gray-500 mt-1">
              Ketua Komite Keperawatan RSUD dr. Soedarso Periode 2027-2030
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2a4f7f] transition-colors flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-3xl font-bold text-[#1e3a5f]">{stats.totalVoters}</p>
            <p className="text-gray-500 text-sm">Total Pemilih Terdaftar</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.totalVotesCast}</p>
            <p className="text-gray-500 text-sm">Suara Masuk</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-3xl font-bold text-purple-600">{participationRate}%</p>
            <p className="text-gray-500 text-sm">Tingkat Partisipasi</p>
          </div>
        </div>

        {winner && winner.voteCount > 0 && (
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4f7f] rounded-xl shadow-lg p-6 md:p-8 mb-8 text-center text-white">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="text-blue-200 text-sm mb-1 uppercase tracking-wide">
              Perolehan Suara Tertinggi
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{winner.candidateName}</h2>
            <p className="text-blue-200">NIP: {winner.candidateNip} | Unit: {winner.candidateUnit}</p>
            <p className="text-4xl font-bold text-yellow-400 mt-3">
              {winner.voteCount} Suara
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-4">
              Diagram Batang Perolehan Suara
            </h3>
            {results.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="candidateName"
                    tick={{ fontSize: 12 }}
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    formatter={(value: number) => [`${value} suara`, "Jumlah Suara"]}
                  />
                  <Bar dataKey="voteCount" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-10">Belum ada data suara.</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-4">
              Diagram Lingkaran Distribusi Suara
            </h3>
            {pieData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name: string; percent: number }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value} suara`, "Jumlah Suara"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-10">Belum ada data suara.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-bold text-[#1e3a5f] mb-4">
              Tabel Perolehan Suara
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1e3a5f] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">No</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Nama Kandidat</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">NIP</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Unit</th>
                  <th className="px-6 py-3 text-center text-sm font-medium">Jumlah Suara</th>
                  <th className="px-6 py-3 text-center text-sm font-medium">Persentase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                      Belum ada data suara.
                    </td>
                  </tr>
                ) : (
                  results
                    .sort((a, b) => b.voteCount - a.voteCount)
                    .map((result, index) => {
                      const percentage =
                        stats.totalVotesCast > 0
                          ? ((result.voteCount / stats.totalVotesCast) * 100).toFixed(1)
                          : "0";
                      return (
                        <tr
                          key={result.candidateId}
                          className={`${
                            index === 0 && result.voteCount > 0
                              ? "bg-yellow-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {index + 1}
                            {index === 0 && result.voteCount > 0 && (
                              <span className="ml-2 text-yellow-500">🏆</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {result.candidateName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {result.candidateNip}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {result.candidateUnit}
                          </td>
                          <td className="px-6 py-4 text-sm text-center font-bold text-[#1e3a5f]">
                            {result.voteCount}
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-600">
                            {percentage}%
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
