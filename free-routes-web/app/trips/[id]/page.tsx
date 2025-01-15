'use client';

import { useTripContext } from '@/context/TripContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageGallery from '@/components/ImageGallery';
import FlipClock from '@/components/common/FlipClock';
import ResettableMap from '@/components/ResettableMap';

export default function TripDetailPage() {
    const { selectedTrip } = useTripContext();
    const router = useRouter();
    const [trip, setTrip] = useState(
        selectedTrip || {
            _id: '',
            title: '',
            description: '',
            images: [],
            region: '',
            price: 0,
            departure: { date: '', time: '' },
            availability: { spotsLeft: 0 },
            promotions: { isActive: false, description: '', spots: 0, discount: 0 },
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
        }
    );

    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const reserveButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!selectedTrip) {
            const tripId = window.location.pathname.split('/').pop();
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
            { threshold: 0 }
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
        <section className="trip-detail-page bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-8 sm:py-16 px-4 sm:px-6 text-white">
            {/* Hero Section */}
            <motion.div
                className="hero-section relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 opacity-70"
                    style={{ backgroundImage: `url(${trip.images[0] || '/placeholder.jpg'})` }}
                ></div>
                <div className="relative z-10 max-w-6xl mx-auto text-center py-20 sm:py-32 px-4 sm:px-6">
                    <motion.h1
                        className="text-4xl sm:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8 }}
                    >
                        {trip.title}
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-xl text-gray-200 max-w-3xl mx-auto mb-8 sm:mb-12"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {trip.description}
                    </motion.p>
                    <FlipClock departure={trip.departure} />
                    <motion.button
                        ref={reserveButtonRef}
                        onClick={() => router.push(`/trips/${trip._id}/reserve?discountedPrice=${discountedPrice || trip.price}`)}
                        className="bg-gradient-to-r from-[#ED0874] to-[#3B74BF] text-white py-3 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg text-base sm:text-xl hover:scale-105 transition-transform mt-6 sm:mt-8"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ¡Reserva Ahora!
                    </motion.button>
                </div>
            </motion.div>

            {/* Tranquilidad y Soporte */}
            <motion.div
                className="section max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-md my-8 sm:my-12"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-2xl sm:text-4xl font-bold text-[#08338F] mb-4 sm:mb-6">¡Relájate y disfruta! Nosotros nos encargamos de todo 🛡️</h2>
                <p className="text-sm sm:text-lg text-[#3B74BF] mb-4 leading-relaxed">
                    Desde el momento en que te unas a esta aventura, no tendrás que preocuparte de nada. Contamos con un equipo de expertos que estarán a tu lado en cada paso del camino.
                </p>
                <ul className="list-disc pl-4 sm:pl-6 text-sm sm:text-lg space-y-3 sm:space-y-4 text-[#171717]">
                    <li>
                        🏍️ <strong>Dos guías expertos:</strong> Siempre tendrás dos guías acompañándote: uno liderando la ruta y otro cerrando el grupo para garantizar tu seguridad y comodidad.
                    </li>
                    <li>
                        🛠️ <strong>Soporte técnico:</strong> Nuestro equipo está preparado para ayudarte con cualquier eventualidad mecánica que pueda surgir en el camino.
                    </li>
                    <li>
                        🚑 <strong>Asistencia en carretera:</strong> Nos aseguramos de que estés cubierto en todo momento con un plan de asistencia integral.
                    </li>
                    <li>
                        🎯 <strong>Planificación perfecta:</strong> Desde los alojamientos hasta las comidas y actividades, todo está diseñado para que disfrutes al máximo.
                    </li>
                </ul>
            </motion.div>

            {/* Detalles Técnicos y Beneficios */}
            <motion.div
                className="section max-w-6xl mx-auto bg-[#1E293B] p-6 sm:p-10 rounded-xl shadow-md my-8 sm:my-12"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <h2 className="text-2xl sm:text-4xl font-bold text-[#FFDD00] mb-4 sm:mb-6">Lo que hace este viaje único 🏍️</h2>
                <ul className="list-disc pl-4 sm:pl-6 text-sm sm:text-lg space-y-3 sm:space-y-4 text-gray-200">
                    <li>
                        🚀 <strong>Rutas exclusivas:</strong> Diseñadas para maximizar la emoción, explorando paisajes que no encontrarás en ninguna guía.
                    </li>
                    <li>
                        🏨 <strong>Alojamiento con encanto:</strong> Descansa en hoteles cuidadosamente seleccionados para ofrecerte comodidad y estilo.
                    </li>
                    <li>
                        🍴 <strong>Gastronomía local:</strong> Saborea lo mejor de la cocina de la región, desde cenas gourmet hasta desayunos energéticos.
                    </li>
                    <li>
                        🌟 <strong>Actividades adicionales:</strong> Desde rutas off-road hasta catas de vinos o visitas a lugares históricos.
                    </li>
                </ul>
            </motion.div>

            {/* Itinerario Épico */}
            <motion.div
                className="section max-w-5xl mx-auto bg-[#0F172A] p-6 sm:p-10 rounded-xl shadow-md my-8 sm:my-12"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-2xl sm:text-4xl font-bold text-[#FFDD00] mb-4 sm:mb-6">Itinerario del Viaje 🛣️</h2>
                <ul className="space-y-6 sm:space-y-8">
                    {trip.itinerary.map((day) => (
                        <motion.li key={day.day} className="flex flex-col items-start" variants={fadeInUp}>
                            <h3 className="text-lg sm:text-2xl font-bold text-[#FFDD00]">{`Día ${day.day}: ${day.title}`}</h3>
                            <p className="text-sm sm:text-lg text-gray-300 mt-2">{day.description}</p>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Mapa Interactivo */}
            <motion.div
                className="section max-w-6xl mx-auto bg-[#0F172A] p-6 sm:p-10 rounded-xl shadow-md my-8 sm:my-12"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-2xl sm:text-4xl font-bold text-[#FFDD00] mb-4 sm:mb-6">Ubicación 📍</h2>
                <p className="text-sm sm:text-lg text-gray-200 mb-4 sm:mb-6">
                    Explora la ubicación donde comienza tu próxima gran aventura. Este es el lugar donde los sueños
                    toman vida.
                </p>
                <ResettableMap position={[trip.coordinates.lat, trip.coordinates.lng]} />
            </motion.div>

            {/* Preguntas Frecuentes */}
            <motion.div
                className="section max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-md my-8 sm:my-12 text-center"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <h2 className="text-2xl sm:text-4xl font-bold text-[#08338F] mb-4 sm:mb-6">Preguntas Frecuentes ❓</h2>
                <ul className="list-disc pl-4 sm:pl-6 text-sm sm:text-lg space-y-3 sm:space-y-4 text-[#171717]">
                    {trip.faq.map((faqItem, index) => (
                        <li key={index}>
                            <strong>{faqItem.question}</strong>
                            <p className="text-[#64748b] mt-2">{faqItem.answer}</p>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Botón Fijo */}
            <AnimatePresence>
                {isButtonVisible && (
                    <motion.div
                        className="fixed bottom-4 left-1/2 sm:left-auto sm:right-4 transform sm:translate-x-0 -translate-x-1/2 z-[1000] flex flex-col sm:flex-row items-center gap-2 sm:gap-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-[#ED0874] text-white py-1 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm shadow-md text-center">
                            ¡Solo quedan {trip.availability.spotsLeft} plazas!
                        </div>
                        <motion.button
                            onClick={() => router.push(`/trips/${trip._id}/reserve?discountedPrice=${discountedPrice || trip.price}`)}
                            className="bg-gradient-to-r from-[#ED0874] to-[#3B74BF] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg text-sm sm:text-lg hover:scale-105 transition-transform"
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
