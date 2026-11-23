import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Hanya administrator yang dapat melihat data pemilih." },
        { status: 403 }
      );
    }

    const voters = await prisma.user.findMany({
      where: { role: "VOTER" },
      select: {
        id: true,
        name: true,
        nip: true,
        email: true,
        unit: true,
        hasVoted: true,
        role: true,
        createdAt: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(voters);
  } catch (error) {
    console.error("Error fetching voters:", error);
    return NextResponse.json(
      { error: "Gagal memuat data pemilih" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Hanya administrator yang dapat menambah pemilih." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, nip, email, unit, password } = body;

    if (!name || !nip || !unit || !password) {
      return NextResponse.json(
        { error: "Nama, NIP, Unit, dan Password wajib diisi" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { nip },
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (existingUser) {
      if (existingUser.nip === nip) {
        return NextResponse.json(
          { error: "NIP sudah terdaftar dalam sistem" },
          { status: 400 }
        );
      }
      if (email && existingUser.email === email) {
        return NextResponse.json(
          { error: "Email sudah terdaftar dalam sistem" },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await hash(password, 10);
    const userEmail = email || `${nip.toLowerCase()}@rsud-soedarso.kalbarprov.go.id`;

    const voter = await prisma.user.create({
      data: {
        name,
        nip,
        email: userEmail,
        unit,
        password: hashedPassword,
        role: "VOTER",
        hasVoted: false,
      },
      select: {
        id: true,
        name: true,
        nip: true,
        email: true,
        unit: true,
        hasVoted: true,
        role: true,
      },
    });

    return NextResponse.json(voter, { status: 201 });
  } catch (error) {
    console.error("Error creating voter:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan pemilih" },
      { status: 500 }
    );
  }
}

