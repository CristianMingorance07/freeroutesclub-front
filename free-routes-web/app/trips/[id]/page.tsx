"use client";

import { useTripContext } from "@/context/TripContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageGallery from "@/components/ImageGallery";
import FlipClock from "@/components/common/FlipClock";
import ResettableMap from "@/components/ResettableMap";
import ItineraryDayDetails from "@/components/ItineraryDayDetails";

export default function TripDetailPage() {
  const { selectedTrip } = useTripContext();
  const router = useRouter();
  const [trip, setTrip] = useState(
    selectedTrip || {
      _id: "",
      title: "",
      description: "",
      images: [],
      region: "",
      price: 0,
      departure: { date: "", time: "" },
      availability: { spotsLeft: 0 },
      promotions: { isActive: false, description: "", spots: 0, discount: 0 },
      itinerary: [],
      logistics: {
        fuelCost: 0,
        tolls: 0,
        accommodationOptions: { sharedRooms: 0, privateRooms: 0 },
        mealsCost: 0,
        activities: [],
      },
      inclusions: [],
      faq: [],
      testimonials: [],
      coordinates: { lat: 0, lng: 0 },
      acceptedBikes: [],
      minEngineCapacity: 0,
    },
  );

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const reserveButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedTrip) {
      const tripId = window.location.pathname.split("/").pop();
      fetch(`/api/trips/${tripId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) {
            setTrip({ ...data.data, id: tripId });
          }
        });
    }
  }, [selectedTrip]);

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
  }, []);

  const discountedPrice = trip.promotions?.isActive
    ? (trip.price - (trip.price * trip.promotions.discount) / 100).toFixed(2)
    : null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  return (
    <section className="trip-detail-page bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white">
      {/* Hero Section */}
      <motion.div
        className=""
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          className={`absolute h-[30rem] w-full bg-cover bg-center`}
          style={{
            backgroundImage: `url(${trip.images[0] || "/placeholder.jpg"})`,
            filter: "opacity(0.7)",
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
          <motion.h4 className="drop-shadow-lg">
            La aventura de tu vida empieza en...
          </motion.h4>

          <FlipClock departure={trip.departure} />
          <motion.button
            ref={reserveButtonRef}
            onClick={() =>
              router.push(
                `/trips/${trip._id}/reserve?discountedPrice=${discountedPrice || trip.price}`,
              )
            }
            className="mt-6 rounded-full bg-gradient-to-r from-[#ED0874] to-[#3B74BF] px-6 py-3 text-base text-white shadow-lg transition-transform hover:scale-105 sm:mt-8 sm:px-8 sm:py-3 sm:text-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ¡Reserva Ahora!
          </motion.button>
        </div>
      </motion.div>

      <motion.p
        className="mx-auto max-w-3xl p-4 text-base text-gray-200 sm:mb-12 sm:text-xl"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {trip.description}
      </motion.p>

      {/* Itinerario Épico */}
      <motion.div
        className="section mx-auto my-8 max-w-5xl rounded-xl bg-[#0F172A] p-6 shadow-md sm:my-12 sm:p-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <h2 className="mb-4 text-2xl font-bold text-[#FFDD00] sm:mb-6 sm:text-4xl">
          Itinerario 🛣️
        </h2>
        <ul className="space-y-6 sm:space-y-8">
          {trip.itinerary.map((day) => (
            <ItineraryDayDetails key={day.day} day={day} />
          ))}
        </ul>
      </motion.div>

      {/* Mapa Interactivo */}
      <motion.div
        className="section mx-auto my-8 max-w-6xl rounded-xl bg-[#0F172A] p-6 shadow-md sm:my-12 sm:p-10"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="mb-4 text-2xl font-bold text-[#FFDD00] sm:mb-6 sm:text-4xl">
          Ubicación 📍
        </h2>
        <p className="mb-4 text-sm text-gray-200 sm:mb-6 sm:text-lg">
          Explora la ubicación donde comienza tu próxima gran aventura. Este es
          el lugar donde los sueños toman vida.
        </p>
        <ResettableMap
          position={[trip.coordinates.lat, trip.coordinates.lng]}
        />
      </motion.div>

      {/* Preguntas Frecuentes */}
      <motion.div
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
      </motion.div>

      {/* Botón Fijo */}
      <AnimatePresence>
        {isButtonVisible && (
          <motion.div
            className="fixed bottom-4 left-1/2 z-[1000] flex -translate-x-1/2 transform flex-col items-center gap-2 sm:left-auto sm:right-4 sm:translate-x-0 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg bg-[#ED0874] px-3 py-1 text-center text-xs text-white shadow-md sm:px-4 sm:py-2 sm:text-sm">
              ¡Solo quedan {trip.availability.spotsLeft} plazas!
            </div>
            <motion.button
              onClick={() =>
                router.push(
                  `/trips/${trip._id}/reserve?discountedPrice=${discountedPrice || trip.price}`,
                )
              }
              className="rounded-full bg-gradient-to-r from-[#ED0874] to-[#3B74BF] px-6 py-2 text-sm text-white shadow-lg transition-transform hover:scale-105 sm:px-8 sm:py-3 sm:text-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ¡Reserva Ahora!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
