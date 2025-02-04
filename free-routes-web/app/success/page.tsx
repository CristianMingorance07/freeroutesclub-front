"use client";

import dynamic from "next/dynamic";
import { FaWhatsapp } from "react-icons/fa";
import successAnimation from "@/public/animations/success.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Success() {
  const whatsappGroupLink = "https://chat.whatsapp.com/tu-enlace-de-grupo";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[url('/img/bg-bikes.jpeg')] bg-cover bg-no-repeat p-4">
      <div className="max-w-sm rounded-lg bg-white p-8 pt-0">
        <div className="relative flex w-full max-w-sm items-center justify-between">
          <h1 className="rounded-lg text-3xl font-bold text-[rgb(0,218,185)]">
            ¡Reserva Confirmada!
          </h1>
          <Lottie animationData={successAnimation} loop={false} />
        </div>

        <div className="">
          <p className="mb-4 text-gray-700">
            Te esperamos ahora en el grupo de WhatsApp para coordinar los
            detalles de tu viaje y conocer a los demás participantes.
          </p>
          <a
            href={whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[rgb(0,218,185)] px-4 py-3 font-bold text-white transition hover:bg-[rgb(39,136,121)]"
          >
            <FaWhatsapp className="text-xl" />
            Unirse al Grupo de WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
