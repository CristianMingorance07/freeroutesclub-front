"use client";

import { FaWhatsapp, FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";

export default function SocialMediaPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 py-12 text-gray-800 sm:px-12 lg:px-24">
      {/* Cabecera */}
      <header className="mb-16 text-center">
        <h1 className="mb-6 text-4xl font-extrabold text-blue-600 drop-shadow-lg sm:text-5xl">
          Conecta con Nosotros 🤗
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg">
          ¡Nuestra comunidad motera está donde tú estés! Desde rutas compartidas
          en <span className="font-bold text-green-500">WhatsApp</span>,
          contenido exclusivo en{" "}
          <span className="font-bold text-pink-500">Instagram</span>, hasta el
          emocionante mundo de{" "}
          <span className="font-bold text-blue-500">La Kedada</span>, nuestro
          podcast. ¡Únete y sé parte del viaje!
        </p>
      </header>

      {/* Tarjetas Interactivas */}
      <section className="mb-16 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* WhatsApp */}
        <div className="group relative flex transform flex-col items-center rounded-xl bg-white p-6 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl">
          <FaWhatsapp className="mb-4 text-6xl text-green-500 transition-transform group-hover:scale-110" />
          <h3 className="mb-4 text-xl font-bold">Grupo de WhatsApp</h3>
          <p className="mb-6 text-center text-sm leading-relaxed text-gray-700 sm:text-base">
            Conéctate con otros moteros, organiza rutas y comparte momentos.
            ¡Donde todo comienza!
          </p>
          <a
            href="https://chat.whatsapp.com/Kdx5sfIWw2TFWjxE3h8Ev1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-green-500 py-3 text-center font-bold text-white transition hover:bg-green-600"
          >
            Únete Ahora
          </a>
        </div>

        {/* Instagram Free Routes */}
        <div className="group relative flex transform flex-col items-center rounded-xl bg-white p-6 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl">
          <FaInstagram className="text-gradient-to-r mb-4 from-yellow-500 via-pink-500 to-purple-500 text-6xl transition-transform group-hover:scale-110" />
          <h3 className="mb-4 text-xl font-bold">Instagram Free Routes</h3>
          <p className="mb-6 text-center text-sm leading-relaxed text-gray-700 sm:text-base">
            Descubre nuestras rutas, fotos épicas y contenido exclusivo. Vive la
            pasión de Free Routes.
          </p>
          <a
            href="https://instagram.com/freeroutesclub"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 py-3 text-center font-bold text-white transition hover:opacity-90"
          >
            Seguir en Instagram
          </a>
        </div>

        {/* Podcast La Kedada */}
        <div className="group relative flex transform flex-col items-center rounded-xl bg-white p-6 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl">
          <FaSpotify className="mb-4 text-6xl text-green-400 transition-transform group-hover:scale-110" />
          <h3 className="mb-4 text-xl font-bold">Podcast: La Kedada</h3>
          <p className="mb-6 text-center text-sm leading-relaxed text-gray-700 sm:text-base">
            Escucha historias del mundo del motor en Spotify, YouTube e
            Instagram. ¡No te pierdas un episodio!
          </p>
          <div className="mb-4 flex w-full justify-center gap-4">
            <a
              href="https://spotify.com/la-kedada"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-400 p-3 text-white transition hover:bg-green-500"
            >
              <FaSpotify className="text-2xl" />
            </a>
            <a
              href="https://youtube.com/la-kedada"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-500 p-3 text-white transition hover:bg-red-600"
            >
              <FaYoutube className="text-2xl" />
            </a>
            <a
              href="https://instagram.com/la-kedada"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 p-3 text-white transition hover:opacity-90"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className="text-center">
        <h3 className="mb-6 text-2xl font-bold sm:text-3xl">
          ¿Listo para unirte a la conversación?
        </h3>
        <p className="mx-auto mb-8 max-w-xl text-sm text-gray-700 sm:text-lg">
          Free Routes Club te espera en nuestras plataformas. Comparte tu
          pasión, descubre nuevas rutas y sé parte de la comunidad motera más
          activa.
        </p>
      </section>

      {/* Pie de Página */}
      <footer className="mt-16 text-center text-sm text-gray-600">
        <p>
          Free Routes Club © {new Date().getFullYear()} - Aventuras en dos
          ruedas, conectando caminos y personas.
        </p>
      </footer>
    </div>
  );
}
