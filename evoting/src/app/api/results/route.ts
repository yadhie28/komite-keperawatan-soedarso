import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { votes: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const totalVoters = await prisma.user.count({
      where: { role: "VOTER" },
    });

    const totalVotesCast = await prisma.vote.count();

    const results = candidates.map((c) => ({
      candidateId: c.id,
      candidateName: c.name,
      candidateNip: c.nip,
      candidateUnit: c.unit,
      voteCount: c._count.votes,
    }));

    return NextResponse.json({
      results,
      totalVoters,
      totalVotesCast,
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Gagal memuat hasil pemilihan" },
      { status: 500 }
    );
  }
}

