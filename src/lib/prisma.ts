import { PrismaClient } from "@prisma/client";

declare global {
  // Tambah properti global untuk development (hot-reloading)
  var prisma: PrismaClient | undefined;
}

// Gunakan global prisma jika ada, kalau tidak buat baru
const db = globalThis.prisma || new PrismaClient();

// Cegah multiple instance saat development
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

export default db;
