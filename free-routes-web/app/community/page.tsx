"use client";

import { FaWhatsapp, FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SocialMediaPage() {
  return (
    <>
      <section className="relative flex min-h-dvh flex-col items-center justify-center pt-10 text-white lg:pt-0">
        <div className="absolute top-0 h-full w-full justify-center bg-[url('/img/bg-community.png')] bg-cover bg-center bg-no-repeat brightness-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 p-8 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl 2xl:text-7xl">
            Conecta con Nosotros
          </h2>
          <p className="text-2xl sm:text-3xl 2xl:text-5xl">
            ¡Nuestra comunidad motera está donde tú estés!
          </p>
        </motion.div>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* WhatsApp */}
          <div className="group relative mx-auto flex w-72 transform flex-col items-center justify-between rounded-xl bg-white/90 p-6 text-[#08338F] shadow-lg transition-transform hover:-translate-y-1 lg:w-auto">
            <FaWhatsapp className="mb-4 text-6xl text-green-500" />
            <h3 className="mb-4 text-xl font-bold">Grupo de WhatsApp</h3>
            <p className="mb-6 text-center text-sm leading-relaxed text-gray-700 sm:text-base">
              Conéctate con otros moteros y moteras, organiza rutas y comparte
              momentos. ¡Donde todo comienza!
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

          {/* Instagram */}
          <div className="group relative mx-auto flex w-72 transform flex-col items-center justify-between rounded-xl bg-white/90 p-6 text-[#08338F] shadow-lg transition-transform hover:-translate-y-1 lg:w-auto">
            <FaInstagram className="t from-yellow-500 to-purple-500 bg-clip-text text-6xl text-pink-500" />
            <h3 className="mb-4 text-xl font-bold">Instagram Free Routes</h3>
            <p className="mb-6 text-center text-sm leading-relaxed text-gray-700 sm:text-base">
              Descubre nuestras rutas, fotos épicas y contenido exclusivo. Vive
              la pasión de Free Routes.
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
          <div className="group relative mx-auto flex w-72 transform flex-col items-center justify-between rounded-xl bg-white/90 p-6 text-[#08338F] shadow-lg transition-transform hover:-translate-y-1 lg:w-auto">
            <FaSpotify className="mb-4 text-6xl text-green-400" />
            <h3 className="mb-4 text-xl font-bold">Podcast: La Kedada</h3>
            <p className="mb-6 text-center text-sm leading-relaxed text-gray-700 sm:text-base">
              Escucha historias del mundo del motor en Spotify, YouTube e
              Instagram. ¡No te pierdas un episodio!
            </p>
            <div className="flex w-full justify-center gap-4">
              <a
                href="https://open.spotify.com/show/6GsMQvMot1Sap1KTBoNwtI?si=db4465086ef04165"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-400 p-3 text-white transition hover:bg-green-500"
              >
                <FaSpotify className="text-2xl" />
              </a>
              <a
                href="https://www.youtube.com/@LaKedadaPodcast/videos"
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
        </motion.section>
      </section>
    </>
  );
}
