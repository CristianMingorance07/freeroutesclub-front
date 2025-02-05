"use client";

import dynamic from "next/dynamic";
import { FaWhatsapp } from "react-icons/fa";
import successAnimation from "@/public/animations/success.json";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Success() {
  const [whatsappGroupLink, setWhatsappGroupLink] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/bookings/${id}/whatsapp`)
      .then((res) => res.json())
      .then((data) => setWhatsappGroupLink(data.whatsappGroup))
      .catch((err) => console.error("Error fetching WhatsApp link:", err));
  }, [id]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[url('/img/bg-bikes.jpeg')] bg-cover bg-no-repeat p-4">
      <div className="max-w-sm rounded-lg bg-white p-8 pt-0">
        <div className="relative flex w-full max-w-sm items-center justify-between">
          <h2 className="rounded-lg text-3xl font-bold text-[rgb(0,218,185)]">
            ¡Reserva Confirmada!
          </h2>
          <Lottie animationData={successAnimation} loop={false} />
        </div>

        <article>
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
        </article>
      </div>
    </section>
  );
}
