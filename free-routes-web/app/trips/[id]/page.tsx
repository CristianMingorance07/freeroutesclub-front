"use client";

import {useEffect, useState, useRef} from "react";
import {useParams} from "next/navigation";
import {ITrip} from "@/models/Trip";
import Link from "next/link";
import {FaWhatsapp} from "react-icons/fa";
import {motion, AnimatePresence} from "framer-motion";
import FlipClock from "@/components/common/FlipClock";
import ImageGallery from "@/components/ImageGallery";
import ItineraryDayDetails from "@/components/ItineraryDayDetails";
import Loader from "@/components/common/Loader";
import ResettableMap from "@/components/ResettableMap";

export default function TripDetailPage() {
    const {id: tripId} = useParams();

    const [trip, setTrip] = useState<ITrip>();

    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const reserveButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        fetch(`/api/trips/${tripId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.data) {
                    setTrip({...data.data, id: tripId});
                }
            });
    }, [tripId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsButtonVisible(!entry.isIntersecting);
            },
            {threshold: 0},
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
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0},
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
                            className={`absolute h-[30rem] w-full bg-cover bg-center`}
                            style={{
                                backgroundImage: `url(${trip.images[0] || "/img/placeholder.webp"})`,
                                filter: "brightness(0.7) opacity(0.9)",
                            }}
                        ></div>
                        <div
                            className="relative z-10 mx-auto flex h-[30rem] max-w-6xl flex-col items-center justify-center px-4 text-center">
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
                            <Link href={`/trips/${trip._id}/reserve`}>
                                <motion.button
                                    ref={reserveButtonRef}
                                    className="mt-6 rounded-full bg-gradient-to-r from-[#ED0874] to-[#3B74BF] px-6 py-3 text-base text-white shadow-lg transition-transform hover:scale-105 sm:mt-8 sm:px-8 sm:py-3 sm:text-xl"
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.95}}
                                >
                                    ¡Reserva Ahora!
                                </motion.button>
                            </Link>
                        </div>
                    </motion.section>

                    <motion.section
                        id="trip-description"
                        className="p-6 bg-gradient-to-br from-white to-gray-100 text-[#0F172A] sm:text-xl"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{duration: 0.8, delay: 0.2}}
                    >
                        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-2">
                            {/* Contenedor para las primeras dos secciones */}
                            <div className="lg:col-span-2 grid grid-cols-1 gap-0 auto-rows-auto">

                                {trip.sections?.slice(0, 2).map((section) => (
                                    <div
                                        key={section.id}
                                        className="bg-white rounded-lg p-6 transition-transform "
                                        style={{height: "fit-content !important"}}
                                    >
                                        <div>
                                            <h3 className="mb-4 text-3xl font-bold text-[#0F172A] sm:text-4xl tracking-wide">
                                                {section.title}
                                            </h3>
                                            {section.content?.paragraphs?.map((paragraph, idx) => (
                                                <p
                                                    key={idx}
                                                    className="mb-4 text-lg leading-relaxed text-gray-700 tracking-wide"
                                                    dangerouslySetInnerHTML={{
                                                        __html: paragraph.replace(
                                                            /<a /g,
                                                            "<a class='text-blue-600 font-bold hover:underline'"
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
                                                                    "<a class='text-blue-600 font-bold hover:underline'"
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

                            {/* Bloque de información adicional */}
                            <aside
                                className="
                                lg:col-span-1 bg-white shadow-lg rounded-lg p-6 h-fit
                                relative sm:static lg:sticky lg:top-20
                                order-2 lg:order-none">


                                <h4 className="text-2xl font-extrabold text-[#ED0874] mb-4 tracking-wide">{trip.title}</h4>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed tracking-wide">
                                    {trip.duration} • Salida: {new Date(trip.departure.date).toLocaleDateString()}
                                </p>

                                <div className="mb-6">
                                    <p className="text-4xl font-extrabold text-[#3B74BF]">
                                        {trip.price} €
                                        <span className="line-through text-gray-400 text-xl ml-2">
        {(trip.price + 100).toFixed(2)} €
      </span>
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Reserva tu plaza con un depósito de
                                        <span className="font-bold text-[#ED0874]">
        {(trip.price * 0.45).toFixed(2)} €
      </span>
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Paga {(trip.price - trip.price * 0.45).toFixed(2)} € antes del{" "}
                                        {new Date(
                                            new Date(trip.dates.start).getTime() - 60 * 24 * 60 * 60 * 1000
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <button
                                    className="bg-gradient-to-r from-[#ED0874] to-[#3B74BF] text-white font-bold py-3 px-6 rounded-full hover:scale-105 hover:shadow-lg transition-transform tracking-wide"
                                >
                                    Reservar Ahora
                                </button>
                                <p className="mt-4 text-sm text-gray-500 text-center leading-relaxed tracking-wide">
                                    o paga en 3 plazos de {(trip.price / 3).toFixed(2)} € sin intereses.
                                </p>

                                <hr className="my-6"/>

                                <div className="mb-6">
                                    <h4 className="text-lg font-bold text-[#3B74BF] mb-2 tracking-wide">Qué está
                                        incluido</h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        {trip.inclusions.map((inclusion, idx) => (
                                            <li key={idx} className="flex items-start leading-relaxed">
                                                <span className="text-green-500 mr-2">✅</span>
                                                {inclusion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-[#1F2937] mb-4 text-left tracking-wide">
                                        Resumen de la Experiencia
                                    </h4>
                                    <div className="space-y-4 px-4 pr-8 pl-0">
                                        {[
                                            {
                                                label: "🎉 Diversión",
                                                value: trip.additionalDetails.experienceIndicators.fun,
                                                color: "from-pink-400 to-pink-600",
                                            },
                                            {
                                                label: "⚙️ Dificultad",
                                                value: trip.additionalDetails.experienceIndicators.difficulty,
                                                color: "from-blue-400 to-blue-600",
                                            },
                                            {
                                                label: "🌄 Paisaje",
                                                value: trip.additionalDetails.experienceIndicators.scenery,
                                                color: "from-green-400 to-green-600",
                                            },
                                            {
                                                label: "🏛️ Cultura",
                                                value: trip.additionalDetails.experienceIndicators.culture,
                                                color: "from-purple-400 to-purple-600",
                                            },
                                            {
                                                label: "🍝 Gastronomía",
                                                value: trip.additionalDetails.experienceIndicators.gastronomy,
                                                color: "from-yellow-400 to-yellow-600",
                                            },
                                        ].map((indicator, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="space-y-1"
                                                initial={{opacity: 0, y: 30}}
                                                whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}}
                                                transition={{duration: 0.8, delay: idx * 0.2}}
                                            >
                                                <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium text-[#4B5563]">
                        {indicator.label}
                    </span>
                                                    <span className="text-sm font-semibold text-gray-600">
                        {indicator.value * 10}%
                    </span>
                                                </div>
                                                <div
                                                    className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${indicator.color}`}
                                                        initial={{width: "0%"}}
                                                        whileInView={{width: `${indicator.value * 10}%`}}
                                                        viewport={{once: true}}
                                                        transition={{
                                                            duration: 1.5,
                                                            delay: idx * 0.3,
                                                            ease: "easeInOut",
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>


                                <hr className="my-6"/>

                                <div className="mb-6">
                                    <h4 className="text-lg font-bold text-[#3B74BF] mb-2 tracking-wide">Puntos de
                                        Interés</h4>
                                    <ul className="space-y-2">
                                        {trip.additionalDetails.pointsOfInterest.map((point, idx) => (
                                            <li key={idx} className="text-sm leading-relaxed">
                                                <strong>{point.name}:</strong> {point.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <a
                                        href="https://www.weroad.es/legal/seguro-medico-equipaje"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 text-sm font-bold hover:underline tracking-wide"
                                    >
                                        Seguro médico y maletas (cobertura hasta 50,000€)
                                    </a>
                                </div>
                            </aside>


                            {/* Contenedor para las secciones restantes */}
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-min" >
                                {trip.sections?.slice(2).map((section) => (
                                    <div
                                        key={section.id}
                                        className="bg-white rounded-lg p-4 transition-transform"
                                        style={{height: "auto"}}
                                    >
                                        <div>
                                            <h3 className="mb-2 text-xl font-semibold text-[#0F172A] tracking-wide">
                                                {section.title}
                                            </h3>
                                            {section.content?.paragraphs?.map((paragraph, idx) => (
                                                <p
                                                    key={idx}
                                                    className="mb-2 text-sm leading-relaxed text-gray-700 tracking-wide"
                                                    dangerouslySetInnerHTML={{
                                                        __html: paragraph.replace(
                                                            /<a /g,
                                                            "<a class='text-blue-600 font-bold hover:underline'"
                                                        ),
                                                    }}
                                                />
                                            ))}
                                            {section.content?.list?.length > 0 && (
                                                <ul className="ml-4 list-disc space-y-1 text-gray-700 tracking-wide">
                                                    {section.content.list.map((item, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="text-sm leading-relaxed"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.replace(
                                                                    /<a /g,
                                                                    "<a class='text-blue-600 font-bold hover:underline'"
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
                    </motion.section>


                    <div className="bg-[#0F172A] p-6 shadow-md sm:p-10">
                        <div
                            className="mx-auto flex max-w-7xl flex-col justify-center gap-9 lg:flex-row lg:justify-between lg:gap-4">
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
                                        <ItineraryDayDetails key={day.day} day={day}/>
                                    ))}
                                </ul>
                            </motion.section>

                            <motion.section
                                id="trip-map"
                                className="w-full sm:min-w-96"
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{once: true}}
                                transition={{duration: 1}}
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
                                    <motion.button
                                        className="rounded-full bg-gradient-to-r from-[#ED0874] to-[#3B74BF] px-6 py-2 text-sm text-white shadow-lg transition-transform hover:scale-105 sm:px-8 sm:py-3 sm:text-lg"
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.95}}
                                    >
                                        ¡Reserva Ahora!
                                    </motion.button>
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
