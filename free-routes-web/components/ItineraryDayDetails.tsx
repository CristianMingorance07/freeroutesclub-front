import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ItineraryDayDetails({
                                              day,
                                            }: {
  day: { day: number; title: string; description: string; details: { morning?: string; midday?: string; night?: string }; image?: string };
}) {
  const [isOpen, setIsOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const accordion = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
  };

  return (
      <motion.li
          key={day.day}
          className="flex flex-col items-start p-5 rounded-xl bg-gradient-to-br from-[#f8f9fa] to-[#e4e7eb] shadow-md hover:shadow-lg transition-shadow border border-gray-300 text-gray-800 font-sans"
          variants={fadeInUp}
      >
        <div className="flex w-full items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 tracking-wide">
            {`Día ${day.day}:`} <span className="ml-2 font-normal text-gray-600">{`${day.title}`}</span>
          </h3>
          <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 transition-all focus:outline-none"
          >
            <svg
                className={`h-6 w-6 transform transition-transform ${isOpen ? "rotate-45" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  variants={accordion}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="mt-4 space-y-5 text-gray-700 text-base leading-relaxed"
              >
                <p className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">{day.description}</p>
                {day.details.morning && (
                    <div className="p-4 bg-white rounded-lg border-l-4 border-[#6b7280]">
                      <h4 className="text-gray-900 font-medium">🌅 Mañana</h4>
                      <p>{day.details.morning}</p>
                    </div>
                )}
                {day.details.midday && (
                    <div className="p-4 bg-white rounded-lg border-l-4 border-[#6b7280]">
                      <h4 className="text-gray-900 font-medium">🌞 Medio día</h4>
                      <p>{day.details.midday}</p>
                    </div>
                )}
                {day.details.night && (
                    <div className="p-4 bg-white rounded-lg border-l-4 border-[#6b7280]">
                      <h4 className="text-gray-900 font-medium">🌙 Noche</h4>
                      <p>{day.details.night}</p>
                    </div>
                )}
                {day.image && (
                    <div className="relative w-full h-48 sm:h-56 rounded-lg overflow-hidden mt-4 shadow-md border border-gray-300">
                      <Image
                          src={day.image}
                          alt={day.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                      />
                    </div>
                )}
              </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
  );
}