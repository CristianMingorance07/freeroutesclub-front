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
        <section className="trip-detail-page bg-gradient-to-br from-white to-gray-100 flex flex-col gap-12 ">
          <motion.section
            id="trip-hero"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div
              className="absolute h-[40rem] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${trip.images[0] || "/img/placeholder.webp"})`,
                filter: "brightness(0.7) opacity(0.9)",
              }}
            ></div>
            <div className="relative text-white z-10 mx-auto flex h-[40rem] max-w-6xl flex-col items-center justify-center px-4 text-center">
              <motion.h1
                className="mb-4 text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:mb-6 sm:text-6xl"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8 }}
              >
                {trip.title}
              </motion.h1>

              <motion.h3 className="drop-shadow-lg">
                La aventura de tu vida empieza en...
              </motion.h3>

              <FlipClock departure={trip.departure} />
              <motion.div
                ref={reserveButtonRef}
                className="mt-6 sm:mt-8"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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
            className=" p-6 px-6 text-[#0F172A] sm:text-xl"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row">
              <div className="lg:w-2/3">
                {/* Contenedor para las primeras dos secciones */}
                <div className="flex flex-col gap-4">
                  {trip.sections?.slice(0, 2).map((section) => (
                    <div key={section.id} className="mx-auto max-w-4xl">
                      <h3 className="mb-5 text-[22px] font-semibold leading-tight tracking-wide sm:text-[24px]">
                        {section.title}
                      </h3>

                      {section.content?.paragraphs?.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="mb-5 text-[18px] font-light leading-relaxed tracking-normal sm:text-[19px]"
                          dangerouslySetInnerHTML={{
                            __html: paragraph.replace(
                              /<a /g,
                              "<a class='text-[#1E40AF] font-medium hover:text-[#1C3D95] transition-all duration-200 underline decoration-1'",
                            ),
                          }}
                        />
                      ))}

                      {section.content?.list?.length > 0 && (
                        <ul className="ml-6 list-disc space-y-3">
                          {section.content.list.map((item, idx) => (
                            <li
                              key={idx}
                              className="text-[17px] font-light leading-relaxed tracking-wide sm:text-[18px]"
                              dangerouslySetInnerHTML={{
                                __html: item.replace(
                                  /<a /g,
                                  "<a class='text-[#1E40AF] font-medium hover:text-[#1C3D95] transition-all duration-200 underline decoration-1'",
                                ),
                              }}
                            />
                          ))}
                        </ul>
                      )}

                      {section.images?.length > 0 && (
                        <div className="mt-6">
                          <ImageGallery images={section.images} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Contenedor para las secciones restantes */}
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-between">
                  {trip.sections?.slice(2).map((section) => (
                    <div key={section.id} className="w-full lg:w-[48%]">
                      <h3 className="mb-4 text-[18px] font-semibold leading-tight tracking-wide text-[#3D4756] sm:text-[20px]">
                        {section.title}
                      </h3>

                      {section.content?.paragraphs?.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="mb-3 text-[15px] font-light leading-relaxed tracking-normal sm:text-[16px]"
                          dangerouslySetInnerHTML={{
                            __html: paragraph.replace(
                              /<a /g,
                              "<a class='text-[#1E40AF] font-medium hover:text-[#1C3D95] transition-all duration-200 underline decoration-1'",
                            ),
                          }}
                        />
                      ))}

                      {section.content?.list?.length > 0 && (
                        <ul className="ml-5 list-disc space-y-2">
                          {section.content.list.map((item, idx) => (
                            <li
                              key={idx}
                              className="text-[15px] font-light leading-relaxed tracking-wide sm:text-[16px]"
                              dangerouslySetInnerHTML={{
                                __html: item.replace(
                                  /<a /g,
                                  "<a class='text-[#1E40AF] font-medium hover:text-[#1C3D95] transition-all duration-200 underline decoration-1'",
                                ),
                              }}
                            />
                          ))}
                        </ul>
                      )}

                      {section.images?.length > 0 && (
                        <div className="mt-4">
                          <ImageGallery images={section.images} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Bloque de información adicional */}
              <aside className="relative order-2 h-fit w-full rounded-lg bg-white p-5 shadow-lg sm:static lg:sticky lg:top-20 lg:order-none lg:max-w-[320px]">
                <h4 className="mb-4 text-xl font-extrabold tracking-wide text-[#ED0874]">
                  {trip.title}
                </h4>
                <p className="mb-6 text-base font-bold leading-relaxed tracking-wide text-gray-600">
                  {trip.duration} • Salida:{" "}
                  {new Date(trip.departure.date).toLocaleDateString()}
                </p>

                <div className="mb-6">
                  <p className="text-3xl font-extrabold text-[#3B74BF]">
                    {trip.price} €
                    <span className="ml-2 text-lg text-gray-400 line-through">
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

                <p className="mt-4 text-center text-xs leading-relaxed tracking-wide text-gray-500">
                  o paga en 3 plazos de {(trip.price / 3).toFixed(2)} € sin
                  intereses.
                </p>

                <hr className="my-6" />

                <div className="mb-6">
                  <h4 className="mb-2 text-base font-bold tracking-wide text-[#3B74BF]">
                    Qué está incluido
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
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

                <hr className="my-6" />

                <div className="mb-6">
                  <h4 className="mb-2 text-base font-bold tracking-wide text-[#3B74BF]">
                    Puntos de Interés
                  </h4>
                  <ul className="space-y-2">
                    {trip.additionalDetails.pointsOfInterest.map(
                      (point, idx) => (
                        <li key={idx} className="text-xs leading-relaxed">
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
                    className="text-xs font-bold tracking-wide text-blue-600 hover:underline"
                  >
                    Seguro médico y maletas (cobertura hasta 50,000€)
                  </a>
                </div>
              </aside>
            </div>
          </motion.section>

          <div className="relative px-6 py-8 bg-[#0F172A]  shadow-md ">
            <div className="mx-auto flex max-w-6xl flex-col justify-center gap-6 lg:flex-row lg:justify-between lg:gap-4">
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
                    <ItineraryDayDetails key={day.day} day={day} />
                  ))}
                </ul>
              </motion.section>

              <aside
                id="trip-map"
                className="relative order-2 w-full lg:sticky lg:top-20 lg:h-[300px] lg:w-2/5 lg:self-start"
              >
                <h4 className="mb-4 text-2xl font-extrabold tracking-wide text-[#FFDD00]">
                  ¿Dónde vamos? 📍
                </h4>
                <div className="relative min-h-72 w-full overflow-hidden sm:h-[700px] lg:h-[85vh]">
                  <div className="h-webkit-fill-available absolute inset-0 w-full">
                    <ResettableMap
                      position={[trip.coordinates.lat, trip.coordinates.lng]}
                    />
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <motion.section
            id="trip-coordinators"
            className="relative mx-auto max-w-7xl px-6 text-center "
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-[#1F2937] sm:text-5xl">
              Conoce a los Coordinadores del Viaje 👥
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-600">
              Nuestro equipo está aquí para brindarte apoyo en cada paso del
              camino, asegurando una experiencia segura, organizada y memorable.
            </p>

            <div className="grid grid-cols-1 justify-center gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {trip.coordinators.map((coordinator, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center rounded-xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-gray-200 shadow-md sm:h-48 sm:w-48">
                    <img
                      src={coordinator.photoUrl}
                      alt={coordinator.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h4 className="mt-6 text-2xl font-semibold text-[#1F2937]">
                    {coordinator.name}
                  </h4>
                  <p className="mt-2 text-lg text-gray-500">
                    {coordinator.role}
                  </p>
                  <p className="mt-3 max-w-xs text-base leading-relaxed text-gray-600">
                    {coordinator.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="faq"
            className="section px-6 mx-auto pb-20 max-w-6xl text-center "
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-[#0F172A] sm:mb-6 sm:text-4xl">
              Preguntas Frecuentes
            </h2>
            <ul className="space-y-3 text-sm text-[#171717] sm:space-y-4 sm:text-lg">
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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                <FaWhatsapp className="absolute -top-7 size-16 rounded-full bg-green-500 p-3 text-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:-left-4" />
                <p className="text-[#ED0874]">
                  ¡Solo quedan{" "}
                  <span className="font-bold">
                    {trip.availability.spotsLeft}
                  </span>{" "}
                  plazas!
                </p>
                <Link href={`/trips/${trip._id}/reserve`}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
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
        <Loader />
      )}
    </>
  );
}
