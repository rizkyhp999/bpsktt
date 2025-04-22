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
        <Button asChild>
          <Link href="https://bps.go.id" target="_blank">
            BPS Tana Tidung
          </Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/parkiran">Parkiran</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/antrean">Antrean Pelayanan</Link>
        </Button>
      </div>
    </main>
  );
}
