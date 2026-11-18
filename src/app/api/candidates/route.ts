import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get("all") === "true";

    const candidates = await prisma.candidate.findMany({
      where: showAll ? undefined : { isActive: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { error: "Gagal memuat data kandidat" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Hanya administrator yang dapat menambah kandidat." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, nip, unit, visiMisi, pengalaman, photo } = body;

    if (!name || !nip || !unit) {
      return NextResponse.json(
        { error: "Nama, NIP, dan Unit wajib diisi" },
        { status: 400 }
      );
    }

    const existingCandidate = await prisma.candidate.findUnique({
      where: { nip },
    });

    if (existingCandidate) {
      return NextResponse.json(
        { error: "Kandidat dengan NIP tersebut sudah terdaftar" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.create({
      data: {
        name,
        nip,
        unit,
        visiMisi: visiMisi || "",
        pengalaman: pengalaman || "",
        photo: photo || null,
        isActive: true,
      },
    });

    return NextResponse.json(candidate, { status: 201 });
  } catch (error) {
    console.error("Error creating candidate:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data kandidat" },
      { status: 500 }
    );
  }
}

