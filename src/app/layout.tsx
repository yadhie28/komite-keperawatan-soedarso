import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "E-Voting Komite Keperawatan RSUD dr. Soedarso 2027-2030",
  description:
    "Sistem Pemilihan Elektronik Ketua Komite Keperawatan RSUD dr. Soedarso Periode 2027-2030. Platform e-voting yang aman, transparan, dan terpercaya.",
  keywords: [
    "e-voting",
    "komite keperawatan",
    "RSUD dr. Soedarso",
    "pemilihan ketua",
    "rumah sakit",
  ],
  authors: [{ name: "RSUD dr. Soedarso" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
