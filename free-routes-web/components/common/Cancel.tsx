'use client';

import { useRouter } from 'next/navigation';
import { BsXCircle } from 'react-icons/bs';
import Lottie from 'lottie-react';
import cancelAnimation from '@/public/animations/cancel.json';

export default function Cancel() {
    const router = useRouter();

    if (!router) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 text-white">
            <Lottie animationData={cancelAnimation} className="w-48 h-48 mb-8" loop={false} />
            <h1 className="text-3xl font-bold mb-4">¡Algo salió mal!</h1>
            <p className="text-lg text-center mb-6">
                Parece que tu reserva <span className="font-bold">no se completó</span>.
                No te preocupes, puedes intentarlo de nuevo.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => router.push('/trips')}
                    className="px-6 py-3 bg-white text-gray-800 rounded-full font-bold shadow-lg hover:opacity-90 transition duration-300"
                >
                    Ver más viajes
                </button>
                <button
                    onClick={() => router.push('/support')}
                    className="px-6 py-3 bg-red-600 text-white rounded-full font-bold shadow-lg hover:bg-red-500 transition duration-300"
                >
                    Contactar Soporte
                </button>
            </div>
        </div>
    );
}
