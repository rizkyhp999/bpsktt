import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { date } = await request.json();

    if (!date) {
      return NextResponse.json(
        { message: "Tanggal tidak valid" },
        { status: 400 }
      );
    }

    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    // Hapus semua antrean pada tanggal tersebut
    await prisma.antrean.deleteMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    return NextResponse.json({ message: "Antrean berhasil direset" });
  } catch (error) {
    console.error("Error while resetting antrean:", error);
    return NextResponse.json(
      { message: "Gagal mereset antrean" },
      { status: 500 }
    );
  }
}

// Tambahkan ini untuk menangani method OPTIONS (preflight CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
