import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Ambil antrean terakhir
// GET /api/antrean
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const where: any = {};
  if (start && end) {
    where.createdAt = {
      gte: new Date(start),
      lte: new Date(end),
    };
  }

  const antrean = await prisma.antrean.findMany({
    where,
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(antrean);
}

// POST: Buat antrean baru
export async function POST(request: Request) {
  const { layanan } = await request.json();

  const lastAntrean = await prisma.antrean.findFirst({
    orderBy: { nomor: "desc" },
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });

  const nextNumber = lastAntrean ? lastAntrean.nomor + 1 : 1;

  const newAntrean = await prisma.antrean.create({
    data: { nomor: nextNumber, layanan: "PST" },
  });

  return NextResponse.json(newAntrean);
}

// PUT: Update antrean
export async function PUT(request: Request) {
  const { id } = await request.json();

  // Tidak ada status yang perlu diperbarui lagi
  const updatedAntrean = await prisma.antrean.update({
    where: { id },
    data: { updatedAt: new Date() }, // Memperbarui waktu jika dibutuhkan
  });

  return NextResponse.json(updatedAntrean);
}
