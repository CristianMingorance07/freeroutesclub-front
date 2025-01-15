'use client';

import { useRouter } from 'next/navigation';

export default function MerchPage() {
    const router = useRouter();

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-100 via-white to-blue-100 text-center"
            style={{padding: '5%'}}>
            {/* Cabecera */}
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Merchandising 🚧</h1>
            <p className="text-lg text-gray-700 mb-6">
                Nuestra tienda está en desarrollo, pero mientras tanto, ¡te invitamos a jugar! ¿Qué tan lejos puedes
                llegar? 🚀
            </p>

            {/* Marco del Juego */}
            <div
                className="relative w-full max-w-lg aspect-video rounded-2xl shadow-lg overflow-hidden border-4 border-blue-300"
                style={{height: 'inherit'}}
            >
                <iframe
                    src="https://flappybird.io/"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay"
                    title="Juego Flappy Bird"
                    className="z-10"
                ></iframe>
            </div>

            {/* Botón de Navegación */}
            <button
                onClick={() => router.push('/')}
                className="mt-10 px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-lg font-bold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
                Volver al Inicio
            </button>

        </div>
    );
}
