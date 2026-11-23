import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 }
      );
    }

    const { candidateId } = await req.json();

    if (!candidateId) {
      return NextResponse.json(
        { error: "Kandidat wajib dipilih" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }

    if (user.hasVoted) {
      return NextResponse.json(
        { error: "Anda sudah menggunakan hak suara Anda sebelumnya" },
        { status: 400 }
      );
    }

    // Periksa status pemilihan
    const election = await prisma.election.findFirst({
      where: { isActive: true },
    });

    if (!election) {
      return NextResponse.json(
        { error: "Tidak ada pemilihan yang sedang aktif" },
        { status: 400 }
      );
    }

    const now = new Date();
    if (new Date(election.startDate) > now) {
      return NextResponse.json(
        { error: "Pemilihan belum dimulai" },
        { status: 400 }
      );
    }

    if (new Date(election.endDate) < now) {
      return NextResponse.json(
        { error: "Periode pemilihan telah berakhir" },
        { status: 400 }
      );
    }

    // Periksa kandidat
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate || !candidate.isActive) {
      return NextResponse.json(
        { error: "Kandidat yang dipilih tidak valid atau tidak aktif" },
        { status: 400 }
      );
    }

    // Transaksi penyimpanan suara dan pembaruan status pemilih
    await prisma.$transaction(async (tx) => {
      // Periksa ulang di dalam transaksi
      const existingVote = await tx.vote.findUnique({
        where: { voterId: user.id },
      });

      if (existingVote) {
        throw new Error("ALREADY_VOTED");
      }

      await tx.vote.create({
        data: {
          voterId: user.id,
          candidateId: candidate.id,
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: { hasVoted: true },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Suara Anda berhasil disimpan. Terima kasih atas partisipasi Anda!",
    });
  } catch (error: any) {
    if (error?.message === "ALREADY_VOTED") {
      return NextResponse.json(
        { error: "Anda sudah memberikan suara" },
        { status: 400 }
      );
    }
    console.error("Error submitting vote:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal saat memproses suara Anda" },
      { status: 500 }
    );
  }
}

