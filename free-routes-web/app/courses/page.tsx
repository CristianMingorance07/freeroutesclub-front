"use client";

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import constructionAnimation from '@/public/animations/construction.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function CoursesPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-300 text-center p-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-lg">
                    Cursos en Construcción 🚧
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Estamos trabajando duro para traerte los mejores cursos sobre motos.
                    <br />
                    <span className="text-blue-500 font-bold">¡Pronto estarán disponibles!</span>
                </p>
            </div>

            {/* Construction Animation */}
            <div className="relative w-full max-w-sm">
                <Lottie
                    animationData={constructionAnimation}
                    loop={true}
                    className="w-full h-auto"
                />
            </div>

            {/* Back Button */}
            <div className="mt-10">
                <button
                    onClick={() => router.push('/')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-lg font-bold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                    Volver al Inicio
                </button>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center text-sm text-gray-600">
                <p className="mb-2">
                    Gracias por tu paciencia mientras creamos algo increíble para ti. 🚀
                </p>
            </footer>
        </div>
    );
}
