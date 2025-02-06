"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import cancelAnimation from "@/public/animations/cancel.json";

export default function Cancel() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!router) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      {isClient && (
        <Lottie
          animationData={cancelAnimation}
          className="mb-8 h-48 w-48"
          loop={false}
        />
      )}
      <h1 className="mb-4 text-3xl font-bold">¡Algo salió mal!</h1>
      <p className="mb-6 text-center text-lg">
        Parece que tu reserva <span className="font-bold">no se completó</span>.
        Puedes intentarlo de nuevo o contactar con soporte.
      </p>
      <div className="flex gap-4">
        <Link
          href="/trips"
          className="rounded-full bg-white px-6 py-3 font-bold text-gray-800 shadow-lg transition duration-300 hover:opacity-90"
        >
          Ver más viajes
        </Link>
        <a
          href="https://wa.me/+34685959259?text=Ha%20habido%20un%20problema%20con%20mi%20reserva"
          className="rounded-full bg-red-600 px-6 py-3 font-bold text-white shadow-lg transition duration-300 hover:bg-red-500"
        >
          Contactar con Soporte
        </a>
      </div>
    </div>
  );
}
