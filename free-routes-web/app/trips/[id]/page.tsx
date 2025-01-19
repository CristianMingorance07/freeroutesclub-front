"use client";

import { useTripContext } from "@/context/TripContext";
import { useParams } from "next/navigation";
import { ITrip } from "@/models/Trip";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageGallery from "@/components/ImageGallery";
import FlipClock from "@/components/common/FlipClock";
import ResettableMap from "@/components/ResettableMap";
import ItineraryDayDetails from "@/components/ItineraryDayDetails";
import { FaWhatsapp } from "react-icons/fa";
import Loader from "@/components/common/Loader";

export default function TripDetailPage() {
  const { id: tripId } = useParams();

  const [trip, setTrip] = useState<ITrip>();

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const reserveButtonRef = useRef<HTMLButtonElement | null>(null);

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

    return () => {
      if (reserveButtonRef.current) {
        observer.unobserve(reserveButtonRef.current);
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
        <section className="trip-detail-page bg-gradient-to-br from-[#f9fafb] to-[#e3e8f1] text-white">
          <motion.section
            id="trip-hero"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div
              className={`absolute h-[30rem] w-full bg-cover bg-center`}
              style={{
                backgroundImage: `url(${trip.images[0] || "/placeholder.jpg"})`,
                filter: "brightness(0.7) opacity(0.9)",
              }}
            ></div>
            <div className="relative z-10 mx-auto flex h-[30rem] max-w-6xl flex-col items-center justify-center px-4 text-center">
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
              <Link href={`/trips/${trip._id}/reserve`}>
                <motion.button
                  ref={reserveButtonRef}
                  className="mt-6 rounded-full bg-gradient-to-r from-[#ED0874] to-[#3B74BF] px-6 py-3 text-base text-white shadow-lg transition-transform hover:scale-105 sm:mt-8 sm:px-8 sm:py-3 sm:text-xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ¡Reserva Ahora!
                </motion.button>
              </Link>
            </div>
          </motion.section>

          <motion.section
            id="trip-description"
            className="mx-auto max-w-3xl p-4 text-base text-[#0F172A] sm:mb-12 sm:text-xl"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>{trip.description}</p>
          </motion.section>
          <div className="bg-[#0F172A] p-6 shadow-md sm:my-12 sm:p-10">
            <div className="mx-auto flex max-w-7xl flex-col justify-center gap-9 lg:flex-row lg:justify-between lg:gap-4">
              <motion.section
                id="trip-itinerary"
                className="w-full"
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

              <motion.section
                id="trip-map"
                className="w-full sm:min-w-96"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="mb-4 text-2xl font-bold text-[#FFDD00] sm:mb-6 sm:text-3xl">
                  Ubicación 📍
                </h2>
                <p className="mb-4 text-sm text-gray-200 sm:mb-6">
                  Explora la ubicación donde comienza tu próxima gran aventura.
                  Este es el lugar donde los sueños toman vida.
                </p>
                <ResettableMap
                  position={[trip.coordinates.lat, trip.coordinates.lng]}
                />
              </motion.section>
            </div>
          </div>

          <motion.section
            id="faq"
            className="section mx-auto my-8 max-w-6xl rounded-xl bg-white p-6 text-center shadow-md sm:my-12 sm:p-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-[#08338F] sm:mb-6 sm:text-4xl">
              Preguntas Frecuentes ❓
            </h2>
            <ul className="list-disc space-y-3 pl-4 text-sm text-[#171717] sm:space-y-4 sm:pl-6 sm:text-lg">
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
                className="fixed bottom-0 z-[1000] flex w-full -translate-x-1/2 transform items-center justify-between gap-2 bg-white px-4 py-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:bottom-4 sm:right-4 sm:w-96 sm:flex-col sm:rounded-xl"
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
                  <motion.button
                    className="rounded-full bg-gradient-to-r from-[#ED0874] to-[#3B74BF] px-6 py-2 text-sm text-white shadow-lg transition-transform hover:scale-105 sm:px-8 sm:py-3 sm:text-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ¡Reserva Ahora!
                  </motion.button>
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
