'use client';

import { FaMotorcycle, FaSmile, FaHeart, FaMapMarkedAlt, FaUserShield } from 'react-icons/fa';

export default function CommunityPage() {
    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen flex flex-col items-center text-gray-800 p-4 sm:p-8">
            {/* Hero Section */}
            <header className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 drop-shadow-lg mb-4">
                    ¡Bienvenido a Free Routes Club! 🏍️
                </h1>
                <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-700">
                    ¿Tienes una moto? ¿Te gusta la aventura? ¿Te da miedo quedarte atrás? Tranquilo, nosotros también empezamos así. En Free Routes Club, todos tienen un lugar. Con más de <span className="font-bold text-blue-500">500 compañeros</span>, hemos aprendido que las mejores historias se escriben en dos ruedas.
                </p>
                <div className="mt-8">
                    <button
                        className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-sm sm:text-lg font-bold rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                    >
                        Únete Ahora
                    </button>
                </div>
            </header>

            {/* Beneficios Clave */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center">
                    <FaSmile className="text-yellow-500 text-5xl sm:text-6xl mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Amigos Nuevos</h3>
                    <p className="text-sm sm:text-base text-gray-700">
                        Olvídate de rodar solo. Aquí encontrarás amigos que saben que el café de gasolinera también cuenta como gourmet.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center">
                    <FaUserShield className="text-green-500 text-5xl sm:text-6xl mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Nunca Estás Solo</h3>
                    <p className="text-sm sm:text-base text-gray-700">
                        Siempre salimos en grupos liderados por dos guías. Si te pierdes, será porque estabas mirando demasiado el paisaje.
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center">
                    <FaMapMarkedAlt className="text-red-500 text-5xl sm:text-6xl mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold mb-2">Rutas de Ensueño</h3>
                    <p className="text-sm sm:text-base text-gray-700">
                        Desde el asfalto perfecto hasta pistas que te harán reír (o llorar), tenemos algo para todos los gustos.
                    </p>
                </div>
            </section>

            {/* Enfoque en los Viajes */}
            <section className="bg-blue-600 text-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-5xl mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">¡Viaja con Nosotros!</h2>
                <p className="text-sm sm:text-lg text-center mb-6">
                    Más que rutas, son experiencias que recordarás para siempre. Cada viaje está diseñado para combinar aventura, paisajes épicos y momentos inolvidables. Desde las carreteras costeras hasta las montañas, cada kilómetro es una nueva historia.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center">
                        <FaMotorcycle className="text-4xl sm:text-6xl mb-4 text-yellow-300" />
                        <h3 className="text-lg sm:text-xl font-bold">Rutas Guiadas</h3>
                        <p className="text-sm sm:text-base">
                            Planificamos cada detalle para que solo tengas que preocuparte por disfrutar del viaje.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <FaHeart className="text-4xl sm:text-6xl mb-4 text-pink-300" />
                        <h3 className="text-lg sm:text-xl font-bold">Ambiente Familiar</h3>
                        <p className="text-sm sm:text-base">
                            Porque viajar en moto no solo es conducir, es compartir momentos con personas que vibran como tú.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <FaMapMarkedAlt className="text-4xl sm:text-6xl mb-4 text-green-300" />
                        <h3 className="text-lg sm:text-xl font-bold">Destinos Inolvidables</h3>
                        <p className="text-sm sm:text-base">
                            Desde los Pirineos hasta la Costa, diseñamos recorridos que te dejarán sin palabras.
                        </p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <button
                        className="px-6 sm:px-8 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-sm sm:text-lg font-bold rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                    >
                        Explora Próximos Viajes
                    </button>
                </div>
            </section>

            {/* Preguntas Frecuentes */}
            <section className="max-w-5xl mb-16 text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-8">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">¿Qué pasa si soy nuevo?</h3>
                        <p className="text-sm sm:text-base text-gray-700">
                            ¡Perfecto! Nuestras rutas están diseñadas para todos. Lo importante es tener ganas de disfrutar y aprender.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">¿Necesito equipamiento especial?</h3>
                        <p className="text-sm sm:text-base text-gray-700">
                            Un casco, guantes y ganas de pasarlo bien son suficientes para empezar. Pero si traes una chaqueta molona, también cuenta.
                        </p>
                    </div>
                </div>
            </section>

            {/* Llamada a la Acción */}
            <section className="text-center mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">¿Listo para la aventura?</h3>
                <p className="text-sm sm:text-lg text-gray-700 mb-6 max-w-xl mx-auto">
                    Ven con nosotros, ríe, explora, y descubre lo que significa ser parte de una comunidad que vive para rodar. ¡Tu moto te está esperando!
                </p>
                <button
                    className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-sm sm:text-lg font-bold rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                >
                    Únete Ahora
                </button>
            </section>

            {/* Pie de Página */}
            <footer className="mt-12 text-center text-sm text-gray-600">
                <p>
                    Free Routes Club © {new Date().getFullYear()} - Aventuras en dos ruedas, con café y risas garantizadas.
                </p>
            </footer>
        </div>
    );
}
