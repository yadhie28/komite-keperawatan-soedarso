import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Akses ditolak. Hanya administrator yang dapat memperbarui kandidat." },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await req.json();

    const candidate = await prisma.candidate.findUnique({
      where: { id },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Kandidat tidak ditemukan" },
        { status: 404 }
      );
    }

    // Check if NIP is updated and already used by another candidate
    if (body.nip && body.nip !== candidate.nip) {
      const existing = await prisma.candidate.findUnique({
        where: { nip: body.nip },
      });
      if (existing) {
        return NextResponse.json(
          { error: "NIP sudah digunakan oleh kandidat lain" },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.candidate.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.nip !== undefined && { nip: body.nip }),
        ...(body.unit !== undefined && { unit: body.unit }),
        ...(body.visiMisi !== undefined && { visiMisi: body.visiMisi }),
        ...(body.pengalaman !== undefined && { pengalaman: body.pengalaman }),
        ...(body.photo !== undefined && { photo: body.photo }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating candidate:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui data kandidat" },
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
        { error: "Akses ditolak. Hanya administrator yang dapat menghapus kandidat." },
        { status: 403 }
      );
    }

    const { id } = params;

    const candidate = await prisma.candidate.findUnique({
      where: { id },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Kandidat tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.candidate.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Kandidat berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return NextResponse.json(
      { error: "Gagal menghapus kandidat" },
      { status: 500 }
    );
  }
}

