// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-4xl font-bold text-center">
        Welcome to BPS Kabupaten Tana Tidung
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/profil">
          <Button>Profil BPS</Button>
        </Link>
        <Link href="/publikasi">
          <Button variant="outline">Publikasi</Button>
        </Link>
        <Link href="/data">
          <Button variant="secondary">Data Statistik</Button>
        </Link>
        <Link href="https://bps.go.id" target="_blank">
          <Button variant="ghost">Website BPS Pusat</Button>
        </Link>
      </div>
    </main>
  );
}
