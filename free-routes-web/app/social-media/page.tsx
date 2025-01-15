'use client';

import { FaWhatsapp, FaInstagram, FaSpotify, FaYoutube } from 'react-icons/fa';

export default function SocialMediaPage() {
    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen flex flex-col items-center text-gray-800 px-6 sm:px-12 lg:px-24 py-12">
            {/* Cabecera */}
            <header className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 drop-shadow-lg mb-6">
                    Conecta con Nosotros 🤗
                </h1>
                <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed">
                    ¡Nuestra comunidad motera está donde tú estés! Desde rutas compartidas en <span className="font-bold text-green-500">WhatsApp</span>, contenido exclusivo en <span className="font-bold text-pink-500">Instagram</span>, hasta el emocionante mundo de <span className="font-bold text-blue-500">La Kedada</span>, nuestro podcast. ¡Únete y sé parte del viaje!
                </p>
            </header>

            {/* Tarjetas Interactivas */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
                {/* WhatsApp */}
                <div className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center group hover:shadow-2xl transition-transform transform hover:-translate-y-2">
                    <FaWhatsapp className="text-green-500 text-6xl mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-4">Grupo de WhatsApp</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center mb-6">
                        Conéctate con otros moteros, organiza rutas y comparte momentos. ¡Donde todo comienza!
                    </p>
                    <a
                        href="https://chat.whatsapp.com/tu-enlace-de-grupo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition"
                    >
                        Únete Ahora
                    </a>
                </div>

                {/* Instagram Free Routes */}
                <div className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center group hover:shadow-2xl transition-transform transform hover:-translate-y-2">
                    <FaInstagram className="text-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-6xl mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-4">Instagram Free Routes</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center mb-6">
                        Descubre nuestras rutas, fotos épicas y contenido exclusivo. Vive la pasión de Free Routes.
                    </p>
                    <a
                        href="https://instagram.com/freeroutesclub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-3 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-white font-bold rounded-full hover:opacity-90 transition"
                    >
                        Seguir en Instagram
                    </a>
                </div>

                {/* Podcast La Kedada */}
                <div className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center group hover:shadow-2xl transition-transform transform hover:-translate-y-2">
                    <FaSpotify className="text-green-400 text-6xl mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-4">Podcast: La Kedada</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center mb-6">
                        Escucha historias del mundo del motor en Spotify, YouTube e Instagram. ¡No te pierdas un episodio!
                    </p>
                    <div className="flex gap-4 w-full justify-center mb-4">
                        <a
                            href="https://spotify.com/la-kedada"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-green-400 text-white rounded-full hover:bg-green-500 transition"
                        >
                            <FaSpotify className="text-2xl" />
                        </a>
                        <a
                            href="https://youtube.com/la-kedada"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                            <FaYoutube className="text-2xl" />
                        </a>
                        <a
                            href="https://instagram.com/la-kedada"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-white rounded-full hover:opacity-90 transition"
                        >
                            <FaInstagram className="text-2xl" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Llamada a la Acción */}
            <section className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6">¿Listo para unirte a la conversación?</h3>
                <p className="text-sm sm:text-lg text-gray-700 max-w-xl mx-auto mb-8">
                    Free Routes Club te espera en nuestras plataformas. Comparte tu pasión, descubre nuevas rutas y sé parte de la comunidad motera más activa.
                </p>
                <button
                    className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-sm sm:text-lg font-bold rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                >
                    Únete a la Comunidad
                </button>
            </section>

            {/* Pie de Página */}
            <footer className="mt-16 text-center text-sm text-gray-600">
                <p>
                    Free Routes Club © {new Date().getFullYear()} - Aventuras en dos ruedas, conectando caminos y personas.
                </p>
            </footer>
        </div>
    );
}
