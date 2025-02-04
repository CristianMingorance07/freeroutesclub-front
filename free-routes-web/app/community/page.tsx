"use client";

import {
  FaMotorcycle,
  FaSmile,
  FaHeart,
  FaMapMarkedAlt,
  FaUserShield,
} from "react-icons/fa";
import Cta from "@/components/common/Cta";

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-50 via-white to-blue-100 p-4 text-gray-800 sm:p-8">
      {/* Hero Section */}
      <header className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-blue-600 drop-shadow-lg sm:text-5xl">
          ¡Bienvenido a Free Routes Club! 🏍️
        </h1>
        <p className="mx-auto max-w-3xl text-base text-gray-700 sm:text-lg">
          ¿Tienes una moto? ¿Te gusta la aventura? ¿Te da miedo quedarte atrás?
          Tranquilo, nosotros también empezamos así. En Free Routes Club, todos
          tienen un lugar. Con más de{" "}
          <span className="font-bold text-blue-500">500 compañeros</span>, hemos
          aprendido que las mejores historias se escriben en dos ruedas.
        </p>
        <div className="mt-8">
          <Cta
            href="https://chat.whatsapp.com/Kdx5sfIWw2TFWjxE3h8Ev1"
            text="Únete Ahora"
          />
        </div>
      </header>

      {/* Beneficios Clave */}
      <section className="mb-16 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg">
          <FaSmile className="mb-4 text-5xl text-yellow-500 sm:text-6xl" />
          <h3 className="mb-2 text-lg font-bold sm:text-xl">Amigos Nuevos</h3>
          <p className="text-sm text-gray-700 sm:text-base">
            Olvídate de rodar solo. Aquí encontrarás amigos que saben que el
            café de gasolinera también cuenta como gourmet.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg">
          <FaUserShield className="mb-4 text-5xl text-green-500 sm:text-6xl" />
          <h3 className="mb-2 text-lg font-bold sm:text-xl">
            Nunca Estás Solo
          </h3>
          <p className="text-sm text-gray-700 sm:text-base">
            Siempre salimos en grupos liderados por dos guías. Si te pierdes,
            será porque estabas mirando demasiado el paisaje.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg">
          <FaMapMarkedAlt className="mb-4 text-5xl text-red-500 sm:text-6xl" />
          <h3 className="mb-2 text-lg font-bold sm:text-xl">
            Rutas de Ensueño
          </h3>
          <p className="text-sm text-gray-700 sm:text-base">
            Desde el asfalto perfecto hasta pistas que te harán reír (o llorar),
            tenemos algo para todos los gustos.
          </p>
        </div>
      </section>

      {/* Enfoque en los Viajes */}
      <section className="mb-16 max-w-5xl rounded-2xl bg-blue-600 p-6 text-white shadow-xl sm:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
          ¡Viaja con Nosotros!
        </h2>
        <p className="mb-6 text-center text-sm sm:text-lg">
          Más que rutas, son experiencias que recordarás para siempre. Cada
          viaje está diseñado para combinar aventura, paisajes épicos y momentos
          inolvidables. Desde las carreteras costeras hasta las montañas, cada
          kilómetro es una nueva historia.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <FaMotorcycle className="mb-4 text-4xl text-yellow-300 sm:text-6xl" />
            <h3 className="text-lg font-bold sm:text-xl">Rutas Guiadas</h3>
            <p className="text-sm sm:text-base">
              Planificamos cada detalle para que solo tengas que preocuparte por
              disfrutar del viaje.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaHeart className="mb-4 text-4xl text-pink-300 sm:text-6xl" />
            <h3 className="text-lg font-bold sm:text-xl">Ambiente Familiar</h3>
            <p className="text-sm sm:text-base">
              Porque viajar en moto no solo es conducir, es compartir momentos
              con personas que vibran como tú.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaMapMarkedAlt className="mb-4 text-4xl text-green-300 sm:text-6xl" />
            <h3 className="text-lg font-bold sm:text-xl">
              Destinos Inolvidables
            </h3>
            <p className="text-sm sm:text-base">
              Desde los Pirineos hasta la Costa, diseñamos recorridos que te
              dejarán sin palabras.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button className="transform rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl sm:px-8 sm:text-lg">
            Explora Próximos Viajes
          </button>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="mb-16 max-w-5xl text-left">
        <h2 className="mb-8 text-center text-2xl font-bold text-blue-600 sm:text-3xl">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-bold sm:text-xl">
              ¿Qué pasa si soy nuevo?
            </h3>
            <p className="text-sm text-gray-700 sm:text-base">
              ¡Perfecto! Nuestras rutas están diseñadas para todos. Lo
              importante es tener ganas de disfrutar y aprender.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-bold sm:text-xl">
              ¿Necesito equipamiento especial?
            </h3>
            <p className="text-sm text-gray-700 sm:text-base">
              Un casco, guantes y ganas de pasarlo bien son suficientes para
              empezar. Pero si traes una chaqueta molona, también cuenta.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
