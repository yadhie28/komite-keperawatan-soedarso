import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Hanya administrator yang dapat memperbarui pemilih." },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await req.json();

    const voter = await prisma.user.findUnique({
      where: { id },
    });

    if (!voter) {
      return NextResponse.json(
        { error: "Pemilih tidak ditemukan" },
        { status: 404 }
      );
    }

    // Check if NIP is updated and already exists
    if (body.nip && body.nip !== voter.nip) {
      const existing = await prisma.user.findUnique({
        where: { nip: body.nip },
      });
      if (existing) {
        return NextResponse.json(
          { error: "NIP sudah digunakan oleh pemilih lain" },
          { status: 400 }
        );
      }
    }

    let hashedPassword = undefined;
    if (body.password) {
      hashedPassword = await hash(body.password, 10);
    }

    // If reset hasVoted to false, remove associated vote record
    if (body.hasVoted === false && voter.hasVoted) {
      await prisma.vote.deleteMany({
        where: { voterId: id },
      });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.nip !== undefined && { nip: body.nip }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.unit !== undefined && { unit: body.unit }),
        ...(body.hasVoted !== undefined && { hasVoted: body.hasVoted }),
        ...(hashedPassword && { password: hashedPassword }),
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

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating voter:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui data pemilih" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Hanya administrator yang dapat menghapus pemilih." },
        { status: 403 }
      );
    }

    const { id } = params;

    const voter = await prisma.user.findUnique({
      where: { id },
    });

    if (!voter) {
      return NextResponse.json(
        { error: "Pemilih tidak ditemukan" },
        { status: 404 }
      );
    }

    if (voter.role === "ADMIN") {
      return NextResponse.json(
        { error: "Tidak dapat menghapus akun administrator" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Pemilih berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting voter:", error);
    return NextResponse.json(
      { error: "Gagal menghapus pemilih" },
      { status: 500 }
    );
  }
}

