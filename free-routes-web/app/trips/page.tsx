"use client";

import { ITrip as Trip } from "@/models/Trip";
import { useTripContext } from "@/context/TripContext";
import { useState, useEffect } from "react";
import TripCard from "@/components/TripCard";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { setSelectedTrip } = useTripContext();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("/api/trips", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch trips");
        const { data }: { data: Trip[] } = await res.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#f9fafb] to-[#e3e8f1] py-12">
      <div className="absolute top-0 z-0 h-[80vh] w-full justify-center bg-[url('/img/bg-trips.png')] bg-cover bg-center bg-no-repeat brightness-50"></div>
      {/* Hero Section */}
      <motion.div
        className="relative z-20 mx-auto flex h-[80vh] max-w-6xl flex-col justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white">
          Explora nuestras rutas
        </h1>
        <div id="carrousel" className="flex overflow-x-scroll gap-4 no-scrollbar bg-blue-200">
          {trips.map((trip) => (
            <motion.div
              key={trip._id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/trips/${trip._id}`}
                onClick={() => setSelectedTrip(trip)}
                className="hover:no-underline"
              >
                <TripCard trip={trip} />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trips Grid */}
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
          },
        }}
      >
        {trips.map((trip) => (
          <motion.div
            key={trip._id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              href={`/trips/${trip._id}`}
              onClick={() => setSelectedTrip(trip)}
              className="hover:no-underline"
            >
              <TripCard trip={trip} />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <p className="text-lg text-gray-600">
          ¿Te atreves a salir de la rutina? Planea tu próxima gran escapada con
          nosotros.
        </p>
        <Link href="/contact">
          <button className="mt-6 rounded-full bg-gradient-to-r from-[#ED0874] to-[#3B74BF] px-8 py-4 text-lg text-white shadow-md transition-opacity hover:opacity-90">
            ¡Contáctanos ya! 🏍️
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
