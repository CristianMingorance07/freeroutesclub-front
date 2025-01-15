'use client';

import { ITrip as Trip } from '@/models/Trip';
import { useTripContext } from '@/context/TripContext';
import { useState, useEffect } from 'react';
import TripCard from '@/components/TripCard';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const { setSelectedTrip } = useTripContext();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await fetch('/api/trips', { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to fetch trips');
                const { data }: { data: Trip[] } = await res.json();
                setTrips(data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, []);

    return (
        <section className="relative bg-gradient-to-br from-[#f9fafb] to-[#e3e8f1] py-12 px-6">
            {/* Hero Section */}
            <motion.div
                className="max-w-6xl mx-auto text-center mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl font-extrabold text-[#08338F] leading-tight mb-4">
                    Vive la Aventura de Tu Vida
                </h1>
                <p className="text-lg text-[#3B74BF] max-w-4xl mx-auto">
                    Descubre rutas épicas, historias que contar y paisajes que te dejarán sin aliento. ¿Listo para arrancar?
                </p>
            </motion.div>

            {/* Trips Grid */}
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <Link href={`/trips/${trip._id}`} onClick={() => setSelectedTrip(trip)} className="hover:no-underline">
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
                    ¿Te atreves a salir de la rutina? Planea tu próxima gran escapada con nosotros.
                </p>
                <Link href="/contact">
                    <button className="mt-6 px-8 py-4 bg-gradient-to-r from-[#ED0874] to-[#3B74BF] text-white text-lg rounded-full shadow-md hover:opacity-90 transition-opacity">
                        ¡Contáctanos ya! 🏍️
                    </button>
                </Link>
            </motion.div>
        </section>
    );
}
