"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-[#1e3a5f] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#1e3a5f] font-bold text-sm">RS</span>
            </div>
            <Link href="/" className="font-bold text-lg hidden sm:block">
              E-Voting Komite Keperawatan
            </Link>
            <Link href="/" className="font-bold text-lg sm:hidden">
              E-Voting
            </Link>
          </div>

          {session && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/voting"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
              >
                Voting
              </Link>
              <Link
                href="/hasil"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
              >
                Hasil
              </Link>
              {isAdmin && (
                <>
                  <div className="w-px h-6 bg-white/30" />
                  <Link
                    href="/admin"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-[#2a4f7f] hover:bg-[#345d8f] transition-colors"
                  >
                    Admin
                  </Link>
                  <Link
                    href="/admin/kandidat"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
                  >
                    Kandidat
                  </Link>
                  <Link
                    href="/admin/pemilih"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
                  >
                    Pemilih
                  </Link>
                  <Link
                    href="/admin/hasil"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
                  >
                    Hasil Admin
                  </Link>
                </>
              )}
              <div className="w-px h-6 bg-white/30" />
              <span className="text-sm text-blue-200">
                {session.user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors"
              >
                Keluar
              </button>
            </div>
          )}

          {session && (
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-md hover:bg-[#2a4f7f] transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          )}

          {!session && (
            <Link
              href="/login"
              className="px-4 py-2 rounded-md text-sm font-medium bg-white text-[#1e3a5f] hover:bg-blue-50 transition-colors"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>

      {session && menuOpen && (
        <div className="md:hidden border-t border-white/20">
          <div className="px-4 py-3 space-y-2">
            <span className="block text-sm text-blue-200 pb-2 border-b border-white/20">
              {session.user?.name}
            </span>
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/voting"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Voting
            </Link>
            <Link
              href="/hasil"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Hasil
            </Link>
            {isAdmin && (
              <>
                <div className="border-t border-white/20 pt-2 mt-2">
                  <span className="block px-3 py-1 text-xs text-blue-300 uppercase tracking-wide">
                    Admin
                  </span>
                </div>
                <Link
                  href="/admin"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard Admin
                </Link>
                <Link
                  href="/admin/kandidat"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Kelola Kandidat
                </Link>
                <Link
                  href="/admin/pemilih"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Kelola Pemilih
                </Link>
                <Link
                  href="/admin/hasil"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2a4f7f] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Hasil Pemilihan
                </Link>
              </>
            )}
            <div className="border-t border-white/20 pt-2 mt-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
