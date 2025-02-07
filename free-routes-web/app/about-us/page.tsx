"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <>
      <section className="relative flex min-h-dvh flex-col items-center justify-center pt-10 text-white lg:pt-0">
        <div className="absolute top-0 h-full w-full justify-center bg-[url('/img/bg-about-us.jpeg')] bg-cover bg-center bg-no-repeat brightness-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 p-8 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl 2xl:text-7xl">
            ¿Quiénes somos?
          </h2>
          <p className="text-2xl sm:text-3xl 2xl:text-5xl">
            Descubre al equipo de We Riders Travel
          </p>
        </motion.div>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="group relative mx-auto flex w-72 transform flex-col items-center justify-between rounded-xl bg-white/90 text-[#08338F] shadow-lg transition-transform hover:-translate-y-1 lg:w-auto">
            <Image
              src={"/img/dani-profile.png"}
              width={500}
              height={150}
              className="h-44 w-full rounded-t-xl object-cover"
              alt="Dani"
            />
            <div className="flex h-full w-full flex-col items-center justify-start p-6">
              <h3 className="mb-4 text-3xl font-bold">Dani</h3>
              <p className="text-center text-sm leading-relaxed text-gray-700 sm:text-base">
                Aventurero por naturaleza, con un don especial para conectar con
                las personas y garantizar un ambiente ameno.
              </p>
            </div>
          </div>

          <div className="group relative mx-auto flex w-72 transform flex-col items-center justify-between rounded-xl bg-white/90 text-[#08338F] shadow-lg transition-transform hover:-translate-y-1 lg:w-auto">
            <Image
              src={"/img/cristian-profile.jpg"}
              width={500}
              height={150}
              className="h-44 w-full rounded-t-xl object-cover"
              alt="Cristian"
            />
            <div className="flex h-full w-full flex-col items-center justify-start p-6">
              <h3 className="mb-4 text-3xl font-bold">Cristian</h3>
              <p className="text-center text-sm leading-relaxed text-gray-700 sm:text-base">
                Muy aventurero y hábil con las manos, siempre preparado para
                solucionar cualquier inconveniente técnico.
              </p>
            </div>
          </div>
          <div className="group relative mx-auto flex w-72 transform flex-col items-center justify-between rounded-xl bg-white/90 text-[#08338F] shadow-lg transition-transform hover:-translate-y-1 lg:w-auto">
            <Image
              src={"/img/xavi-profile.jpeg"}
              width={500}
              height={150}
              className="h-44 w-full rounded-t-xl object-cover"
              alt="Xavi"
            />
            <div className="flex h-full w-full flex-col items-center justify-start p-6">
              <h3 className="mb-4 text-3xl font-bold">Xavi</h3>
              <p className="text-center text-sm leading-relaxed text-gray-700 sm:text-base">
                Aventurero apasionado y un maestro en capturar los mejores
                momentos con su cámara.
              </p>
            </div>
          </div>
        </motion.section>
      </section>
    </>
  );
}
