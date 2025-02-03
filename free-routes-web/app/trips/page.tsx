"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import TripCard from "@/components/TripCard";
import TripCardLoading from "@/components/TripCardLoading";
import { ITrip as Trip } from "@/models/Trip";
import { useTripContext } from "@/context/TripContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import SearchBar from "@/components/SearchBar";

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const { setSelectedTrip } = useTripContext();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPosition = useCallback(() => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
    setTimeout(checkScrollPosition, 500);
  };

  useEffect(() => {
    checkScrollPosition();
  }, [trips, checkScrollPosition]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("/api/trips?hello=hi", { cache: "no-store" });
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
      <div className="absolute top-0 z-0 h-[90vh] w-full justify-center bg-[url('/img/bg-trips.png')] bg-cover bg-center bg-no-repeat brightness-50 sm:h-[80vh]"></div>
      <motion.div
        className="sm:p8 relative z-20 flex h-[80vh] max-w-6xl flex-col justify-center p-5 pr-0 text-center sm:mx-auto sm:h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
            Rutas populares
          </h1>

          <div className="hidden items-center justify-center gap-4 sm:flex md:mt-0">
            <button
              className={`${!canScrollLeft && "cursor-default"}`}
              onClick={() => handleScroll("left")}
            >
              <CiCircleChevLeft
                className={`size-10 rounded-full transition-colors ${canScrollLeft ? "text-white" : "text-gray-600"}`}
              />
            </button>
            <button
              className={`${!canScrollRight && "cursor-default"}`}
              onClick={() => handleScroll("right")}
            >
              <CiCircleChevRight
                className={`size-10 rounded-full transition-colors ${canScrollRight && trips.length > 0 ? "text-white" : "text-gray-600"}`}
              />
            </button>
          </div>
        </div>
        <div
          id="carrousel"
          ref={carouselRef}
          className="no-scrollbar -ml-4 flex max-w-6xl gap-6 overflow-x-scroll sm:ml-0"
        >
          {trips.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <TripCardLoading />
                </div>
              ))
            : trips.map((trip) => (
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

      <motion.div
        className="mt-0 flex flex-col justify-center sm:mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <SearchBar setFilteredTrips={setFilteredTrips} />
      </motion.div>
      {filteredTrips.length > 0 && (
        <motion.div
          className="mx-auto mt-8 flex max-w-6xl flex-wrap justify-center gap-6"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {filteredTrips.map((trip) => (
            <Link
              key={trip._id}
              href={`/trips/${trip._id}`}
              onClick={() => setSelectedTrip(trip)}
              className="hover:no-underline"
            >
              <TripCard trip={trip} />
            </Link>
          ))}
        </motion.div>
      )}

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
