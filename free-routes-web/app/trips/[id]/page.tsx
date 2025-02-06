"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { ITrip } from "@/models/Trip";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import FlipClock from "@/components/common/FlipClock";
import ImageGallery from "@/components/ImageGallery";
import ItineraryDayDetails from "@/components/ItineraryDayDetails";
import Loader from "@/components/common/Loader";
import ResettableMap from "@/components/ResettableMap";
import Cta from "@/components/common/Cta";

export default function TripDetailPage() {
  const { id: tripId } = useParams();

  const [trip, setTrip] = useState<ITrip>();

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const reserveButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`/api/trips/${tripId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setTrip({ ...data.data, id: tripId });
        }
      });
  }, [tripId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (reserveButtonRef.current) {
      observer.observe(reserveButtonRef.current);
    }

    const buttonRef = reserveButtonRef.current;
    if (buttonRef) {
      observer.observe(buttonRef);
    }
    return () => {
      if (buttonRef) {
        observer.unobserve(buttonRef);
      }
    };
  }, [trip]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {trip ? (
          <section className="trip-detail-page bg-gradient-to-br from-[#f9fafb] to-[#e3e8f1] pb-32 text-white">
            <motion.section
                id="trip-hero"
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 1}}
            >
              <div
                  className="absolute h-[40rem] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${trip.images[0] || "/img/placeholder.webp"})`,
                    filter: "brightness(0.7) opacity(0.9)",
                  }}
              ></div>
              <div
                  className="relative z-10 mx-auto flex h-[40rem] max-w-6xl flex-col items-center justify-center px-4 text-center">
                <motion.h1
                    className="mb-4 text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:mb-6 sm:text-6xl"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{duration: 0.8}}
                >
                  {trip.title}
                </motion.h1>

                <motion.h3 className="drop-shadow-lg">
                  La aventura de tu vida empieza en...
                </motion.h3>

                <FlipClock departure={trip.departure}/>
                <motion.div
                    ref={reserveButtonRef}
                    className="mt-6 sm:mt-8"
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.95}}
                >
                  <Cta
                      href={`/trips/${trip._id}/reserve`}
                      text="¡Reserva Ahora!"
                  />
                </motion.div>
              </div>
            </motion.section>

            <motion.section
                id="trip-description"
                className="bg-gradient-to-br from-white to-gray-100 p-6 text-[#0F172A] sm:text-xl"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{duration: 0.8, delay: 0.2}}
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row">
                <div className="lg:w-2/3">
                  {/* Contenedor para las primeras dos secciones */}
                  <div className="flex flex-col gap-4">
                    {trip.sections?.slice(0, 2).map((section) => (
                        <div
                            key={section.id}
                            className="rounded-lg bg-white p-6 transition-transform"
                        >
                          <div>
                            <h3 className="mb-4 text-3xl font-bold tracking-wide text-[#0F172A] sm:text-4xl">
                              {section.title}
                            </h3>
                            {section.content?.paragraphs?.map((paragraph, idx) => (
                                <p
                                    key={idx}
                                    className="mb-4 text-lg leading-relaxed tracking-wide text-gray-700"
                                    dangerouslySetInnerHTML={{
                                      __html: paragraph.replace(
                                          /<a /g,
                                          "<a class='text-blue-600 font-bold hover:underline'",
                                      ),
                                    }}
                                />
                            ))}
                            {section.content?.list?.length > 0 && (
                                <ul className="ml-4 list-disc space-y-2 text-gray-700">
                                  {section.content.list.map((item, idx) => (
                                      <li
                                          key={idx}
                                          className="text-lg leading-relaxed tracking-wide"
                                          dangerouslySetInnerHTML={{
                                            __html: item.replace(
                                                /<a /g,
                                                "<a class='text-blue-600 font-bold hover:underline'",
                                            ),
                                          }}
                                      />
                                  ))}
                                </ul>
                            )}
                          </div>
                          {section.images?.length > 0 && (
                              <div className="relative">
                                <ImageGallery images={section.images}/>
                              </div>
                          )}
                        </div>
                    ))}
                  </div>

                  {/* Contenedor para las secciones restantes */}
                  <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-between">
                    {trip.sections?.slice(2).map((section) => (
                        <div
                            key={section.id}
                            className="w-full rounded-lg bg-white p-6 transition-transform lg:-ml-4 lg:w-1/2"
                        >
                          <div>
                            <h3 className="mb-2 text-xl font-semibold tracking-wide text-[#0F172A]">
                              {section.title}
                            </h3>
                            {section.content?.paragraphs?.map((paragraph, idx) => (
                                <p
                                    key={idx}
                                    className="mb-2 text-sm leading-relaxed tracking-wide text-gray-700"
                                    dangerouslySetInnerHTML={{
                                      __html: paragraph.replace(
                                          /<a /g,
                                          "<a class='text-blue-600 font-bold hover:underline'",
                                      ),
                                    }}
                                />
                            ))}
                            {section.content?.list?.length > 0 && (
                                <ul className="ml-4 list-disc space-y-1 tracking-wide text-gray-700">
                                  {section.content.list.map((item, idx) => (
                                      <li
                                          key={idx}
                                          className="text-sm leading-relaxed"
                                          dangerouslySetInnerHTML={{
                                            __html: item.replace(
                                                /<a /g,
                                                "<a class='text-blue-600 font-bold hover:underline'",
                                            ),
                                          }}
                                      />
                                  ))}
                                </ul>
                            )}
                          </div>
                          {section.images?.length > 0 && (
                              <div className="relative">
                                <ImageGallery images={section.images}/>
                              </div>
                          )}
                        </div>
                    ))}
                  </div>
                </div>
                {/* Bloque de información adicional */}
                <aside
                    className="relative order-2 h-fit rounded-lg bg-white p-6 shadow-lg sm:static lg:sticky lg:top-20 lg:order-none">
                  <h4 className="mb-4 text-2xl font-extrabold tracking-wide text-[#ED0874]">
                    {trip.title}
                  </h4>
                  <p className="mb-6 text-lg leading-relaxed tracking-wide text-gray-600 font-bold">
                    {trip.duration} • Salida:{" "}
                    {new Date(trip.departure.date).toLocaleDateString()}
                  </p>

                  <div className="mb-6">
                    <p className="text-4xl font-extrabold text-[#3B74BF]">
                      {trip.price} €
                      <span className="ml-2 text-xl text-gray-400 line-through">
                      {(trip.price + 100).toFixed(2)} €
                    </span>
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">
                      Reserva tu plaza con un depósito de{" "}
                      <span className="font-bold text-[#ED0874]">
                      {(trip.price * 0.45).toFixed(2)} €
                    </span>
                    </p>

                  </div>

                  <Cta
                      href={`/trips/${trip._id}/reserve`}
                      text="¡Reserva Ahora!"
                  />
                  <p className="mt-4 text-center text-sm leading-relaxed tracking-wide text-gray-500">
                    o paga en 3 plazos de {(trip.price / 3).toFixed(2)} € sin
                    intereses.
                  </p>

                  <hr className="my-6"/>

                  <div className="mb-6">
                    <h4 className="mb-2 text-lg font-bold tracking-wide text-[#3B74BF]">
                      Qué está incluido
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {trip.inclusions.map((inclusion, idx) => (
                          <li
                              key={idx}
                              className="flex items-start leading-relaxed"
                          >
                            <span className="mr-2 text-green-500">✅</span>
                            {inclusion}
                          </li>
                      ))}
                    </ul>
                  </div>


                  <hr className="my-6"/>

                  <div className="mb-6">
                    <h4 className="mb-2 text-lg font-bold tracking-wide text-[#3B74BF]">
                      Puntos de Interés
                    </h4>
                    <ul className="space-y-2">
                      {trip.additionalDetails.pointsOfInterest.map(
                          (point, idx) => (
                              <li key={idx} className="text-sm leading-relaxed">
                                <strong>{point.name}:</strong> {point.description}
                              </li>
                          ),
                      )}
                    </ul>
                  </div>

                  <div>
                    <a
                        href="https://www.weroad.es/legal/seguro-medico-equipaje"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold tracking-wide text-blue-600 hover:underline"
                    >
                      Seguro médico y maletas (cobertura hasta 50,000€)
                    </a>
                  </div>
                </aside>
              </div>
            </motion.section>

            <div className="bg-[#0F172A] p-2 shadow-md sm:p-6">
              <div
                  className="mx-auto flex max-w-6xl flex-col justify-center gap-6 lg:flex-row lg:justify-between lg:gap-4">

                {/* Itinerario más amplio en escritorio */}
                <motion.section
                    id="trip-itinerary"
                    className="w-full lg:w-3/5"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                >
                  <h2 className="mb-4 text-2xl font-bold text-[#FFDD00] sm:mb-6 sm:text-3xl">
                    Itinerario 🛣️
                  </h2>
                  <ul className="space-y-6 sm:space-y-8">
                    {trip.itinerary.map((day) => (
                        <ItineraryDayDetails key={day.day} day={day}/>
                    ))}
                  </ul>
                </motion.section>

                {/* Mapa más grande y pegajoso en escritorio */}
                <aside id="trip-map"
                       className="relative order-2 w-full lg:w-2/5 lg:sticky lg:top-10 lg:self-start">
                  <h4 className="mb-4 text-2xl font-extrabold tracking-wide text-[#FFDD00]">
                    Donde vamos 📍
                  </h4>
                  <div className="relative w-full min-h-[500px] sm:h-[700px] lg:h-[85vh] overflow-hidden">
                    <div className="absolute inset-0 w-full  h-webkit-fill-available">
                      <ResettableMap position={[trip.coordinates.lat, trip.coordinates.lng]}/>
                    </div>
                  </div>
                </aside>

              </div>
            </div>

            <motion.section
                id="trip-coordinators"
                className="relative mx-auto my-16 max-w-7xl px-6 py-16 text-center sm:my-20 sm:py-20 lg:my-24 lg:px-12"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={{duration: 1, delay: 0.3}}
            >
              <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-[#1F2937] sm:text-5xl">
                Conoce a los Coordinadores del Viaje 👥
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Nuestro equipo está aquí para brindarte apoyo en cada paso del camino, asegurando una experiencia
                segura, organizada y memorable.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 justify-center">
                {trip.coordinators.map((coordinator, index) => (
                    <motion.div
                        key={index}
                        className="relative flex flex-col items-center p-8 bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                    >
                      {/* Imagen más grande con bordes suaves */}
                      <div
                          className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-md border-2 border-gray-200">
                        <img
                            src={coordinator.photoUrl}
                            alt={coordinator.name}
                            className="object-cover w-full h-full"
                        />
                      </div>

                      <h4 className="mt-6 text-2xl font-semibold text-[#1F2937]">{coordinator.name}</h4>
                      <p className="text-lg text-gray-500 mt-2">{coordinator.role}</p>
                      <p className="text-base text-gray-600 mt-3 max-w-xs leading-relaxed">{coordinator.description}</p>
                    </motion.div>
                ))}
              </div>
            </motion.section>


            <motion.section
                id="faq"
                className="section mx-auto my-8 max-w-6xl p-6 text-center sm:my-12 sm:p-10"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                transition={{duration: 1, delay: 0.3}}
            >
              <h2 className="mb-4 text-2xl font-bold text-[#0F172A] sm:mb-6 sm:text-4xl">
                Preguntas Frecuentes
              </h2>
              <ul className="space-y-3 pl-4 text-sm text-[#171717] sm:space-y-4 sm:pl-6 sm:text-lg">
                {trip.faq.map((faqItem, index) => (
                    <li key={index}>
                      <strong>{faqItem.question}</strong>
                      <p className="mt-2 text-[#64748b]">{faqItem.answer}</p>
                    </li>
                ))}
              </ul>
            </motion.section>

            <AnimatePresence>
              {isButtonVisible && (
                  <motion.div
                      id="reserve-fixed"
                      className="fixed bottom-0 z-[1000] flex h-32 w-full -translate-x-1/2 transform items-center justify-between gap-2 bg-white px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:bottom-4 sm:right-4 sm:w-96 sm:flex-col sm:justify-center sm:rounded-xl"
                      initial={{opacity: 0, y: 50}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: 50}}
                      transition={{duration: 0.5}}
                  >
                    <FaWhatsapp
                        className="absolute -top-7 size-16 rounded-full bg-green-500 p-3 text-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:-left-4"/>
                    <p className="text-[#ED0874]">
                      ¡Solo quedan{" "}
                      <span className="font-bold">
                    {trip.availability.spotsLeft}
                  </span>{" "}
                      plazas!
                    </p>
                    <Link href={`/trips/${trip._id}/reserve`}>
                      <motion.div
                          whileHover={{scale: 1.1}}
                          whileTap={{scale: 0.95}}
                      >
                        <Cta
                            href={`/trips/${trip._id}/reserve`}
                            text="¡Reserva Ahora!"
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
              )}
            </AnimatePresence>
          </section>
      ) : (
          <Loader/>
      )}
    </>
  );
}
