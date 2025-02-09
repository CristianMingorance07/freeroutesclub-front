"use client";

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FaWhatsapp } from 'react-icons/fa';
import successAnimation from '@/public/animations/success.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Success() {
    const router = useRouter();

    const whatsappGroupLink = 'https://chat.whatsapp.com/tu-enlace-de-grupo';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#3B74BF] to-[#ED0874] text-white p-4">
            {/* Lottie Animation */}
            <div className="relative w-full max-w-sm">
                <Lottie animationData={successAnimation} className="w-48 h-48 mb-8" loop={false} />
            </div>

            {/* Confirmation Message */}
            <h1 className="text-3xl font-bold mb-4">¡Reserva Confirmada!</h1>
            <p className="text-lg text-center mb-6">
                Tu reserva para la aventura <span className="font-bold">ha sido confirmada</span>.
                Estamos emocionados de verte pronto.
            </p>

            {/* WhatsApp Group Join Button */}
            <div className="bg-white text-[#3B74BF] p-6 rounded-lg shadow-lg text-center mb-6 max-w-sm">
                <h2 className="text-xl font-bold mb-2">¡No olvides unirte al grupo de WhatsApp!</h2>
                <p className="text-gray-700 mb-4">
                    Mantente al tanto de los detalles del viaje y conecta con otros participantes.
                </p>
                <a
                    href={whatsappGroupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg font-bold hover:bg-[#1DA851] transition"
                >
                    <FaWhatsapp className="text-xl" />
                    Unirse al Grupo de WhatsApp
                </a>
            </div>

            {/* Back to Trips Button */}
            <button
                onClick={() => router.push('/trips')}
                className="px-8 py-3 bg-white text-[#3B74BF] rounded-full font-bold shadow-lg hover:opacity-90 transition duration-300"
            >
                Ver más viajes
            </button>

            {/* Footer */}
            <footer className="mt-8 text-center text-sm text-gray-600">
                <p className="mb-2">
                    Gracias por tu paciencia mientras creamos algo increíble para ti. 🚀
                </p>
            </footer>
        </div>
    );
}
