"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function PetugasPage() {
  const [currentAntrean, setCurrentAntrean] = useState<any>(null);
  const [antreanList, setAntreanList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Fetch queues for selected date
  const fetchAntreanByDate = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const response = await fetch(
        `/api/antrean?start=${startOfDay.toISOString()}&end=${endOfDay.toISOString()}`
      );
      const data = await response.json();
      setAntreanList(data);

      if (data.length > 0) {
        const lastIndex = data.length - 1;
        setCurrentIndex(lastIndex);
        setCurrentAntrean(data[lastIndex]);
      } else {
        setCurrentIndex(-1);
        setCurrentAntrean(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAntreanByDate(date);
  }, [date]);

  const handleNextAntrean = async () => {
    setIsLoading(true);
    try {
      if (antreanList.length === 0) {
        const response = await fetch("/api/antrean", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        const newAntrean = await response.json();
        setAntreanList([newAntrean]);
        setCurrentIndex(0);
        setCurrentAntrean(newAntrean);
        return;
      }

      const nextNumber =
        antreanList.length > 0
          ? Math.max(...antreanList.map((a) => a.nomor)) + 1
          : 1;

      const createResponse = await fetch("/api/antrean", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomor: nextNumber }),
      });

      if (!createResponse.ok) {
        throw new Error("Failed to create the next antrean");
      }

      const newAntrean = await createResponse.json();
      const newList = [...antreanList, newAntrean];
      setAntreanList(newList);
      setCurrentIndex(newList.length - 1);
      setCurrentAntrean(newAntrean);
    } catch (error) {
      console.error("Error in handleNextAntrean:", error);
      alert("There was an error processing the antrean.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (!date) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/antrean/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date.toISOString() }),
      });

      if (!response.ok) {
        throw new Error("Gagal mereset antrean");
      }

      // Setelah reset, muat ulang daftar antrean
      await fetchAntreanByDate(date);
    } catch (error) {
      console.error("Error while resetting:", error);
      alert("Terjadi kesalahan saat mereset antrean.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Panel Petugas Antrean</h1>

      <div className="mb-6">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[280px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP", { locale: id })
              ) : (
                <span>Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setIsCalendarOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="mt-4">
          <Button
            onClick={handleReset}
            variant="destructive"
            disabled={antreanList.length === 0 || isLoading}
          >
            Reset Antrean Hari Ini
          </Button>
        </div>
      </div>

      <div className="border p-6 rounded-lg max-w-md mx-auto mb-6">
        {currentAntrean ? (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Antrean Saat Ini
            </h2>
            <p className="text-6xl font-bold text-center my-8">
              {currentAntrean.nomor}
            </p>
            <p className="text-sm text-gray-500 text-center">
              {new Date(currentAntrean.createdAt).toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-center mt-2">
              Layanan:{" "}
              <span className="font-semibold text-blue-600">
                {currentAntrean.layanan}
              </span>
            </p>
          </>
        ) : (
          <p className="text-center py-8">
            Tidak ada antrean untuk tanggal ini
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={handleNextAntrean}
          disabled={isLoading}
          className="min-w-32"
        >
          {isLoading ? "Memproses..." : "Berikutnya"}
        </Button>
      </div>

      {antreanList.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Daftar Antrean
          </h2>
          <div className="border rounded-lg divide-y max-w-md mx-auto">
            {antreanList.map((antrean) => (
              <div key={antrean.id} className="p-3">
                <div className="flex justify-between items-center">
                  <div className="font-bold">#{antrean.nomor}</div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(antrean.createdAt).toLocaleString("id-ID")}
                </div>
                <div className="text-xs text-gray-500">
                  Layanan: {antrean.layanan}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
