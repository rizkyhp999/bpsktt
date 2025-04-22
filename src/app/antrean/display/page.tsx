"use client";
import { useEffect, useState, useRef } from "react";

export default function DisplayPage() {
  const [currentAntrean, setCurrentAntrean] = useState<any>(null);
  const previousAntrean = useRef<any>(null);
  const speechSynthesis =
    typeof window !== "undefined" ? window.speechSynthesis : null;

  const speak = (text: string) => {
    if (!speechSynthesis) return;
    // Hentikan suara sebelumnya

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const announceAntrean = (antrean: any) => {
    const text = `Nomor antrian ${antrean.nomor}, layanan ${antrean.layanan}, silahkan menuju loket`;
    speak(text);
  };

  useEffect(() => {
    const fetchCurrentAntrean = async () => {
      try {
        const response = await fetch("/api/antrean");
        const data = await response.json();

        if (data.length === 0) {
          setCurrentAntrean(null);
          return;
        }

        const lastAntrean = data.reduce((latest: any, current: any) => {
          return current.nomor > latest.nomor ? current : latest;
        }, data[0]);

        // if (previousAntrean.current?.nomor !== lastAntrean.nomor) {
        announceAntrean(lastAntrean);
        setCurrentAntrean(lastAntrean);
        previousAntrean.current = lastAntrean;
        // }
      } catch (error) {
        console.error("Gagal mengambil data antrean:", error);
      }
    };

    const interval = setInterval(fetchCurrentAntrean, 5000);
    fetchCurrentAntrean();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">ANTREAN SAAT INI</h1>

      {currentAntrean ? (
        <div className="text-center">
          <div className="text-9xl font-bold my-8">{currentAntrean.nomor}</div>
          <p className="text-2xl">Layanan: {currentAntrean.layanan}</p>
        </div>
      ) : (
        <p className="text-2xl">Tidak ada antrean</p>
      )}

      <div className="mt-12 text-xl">
        <p>Silahkan menunggu nomor Anda dipanggil</p>
      </div>
    </div>
  );
}
