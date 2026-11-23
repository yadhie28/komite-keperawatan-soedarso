import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let election = await prisma.election.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    if (!election) {
      election = await prisma.election.findFirst({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(election);
  } catch (error) {
    console.error("Error fetching election:", error);
    return NextResponse.json(
      { error: "Gagal memuat informasi pemilihan" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Hanya administrator yang dapat mengubah pengaturan pemilihan." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, description, startDate, endDate, isActive } = body;

    const existingElection = await prisma.election.findFirst({
      orderBy: { createdAt: "desc" },
    });

    let updatedElection;

    if (existingElection) {
      updatedElection = await prisma.election.update({
        where: { id: existingElection.id },
        data: {
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          ...(startDate !== undefined && { startDate: new Date(startDate) }),
          ...(endDate !== undefined && { endDate: new Date(endDate) }),
          ...(isActive !== undefined && { isActive }),
        },
      });
    } else {
      updatedElection = await prisma.election.create({
        data: {
          title: title || "Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso",
          description: description || "Periode 2027-2030",
          startDate: startDate ? new Date(startDate) : new Date(),
          endDate: endDate ? new Date(endDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          isActive: isActive !== undefined ? isActive : true,
        },
      });
    }

    return NextResponse.json(updatedElection);
  } catch (error) {
    console.error("Error updating election:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui pengaturan pemilihan" },
      { status: 500 }
    );
  }
}

