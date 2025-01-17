import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ItineraryDayDetails({
  day,
}: {
  day: { day: number; title: string; description: string };
}) {
  const [isOpen, setIsOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const accordion = {
    hidden: { height: 0, scaleY: 0, opacity: 0 },
    visible: { height: "auto", scaleY: 1, opacity: 1 },
  };

  return (
    <motion.li
      key={day.day}
      className="flex flex-col items-start"
      variants={fadeInUp}
    >
      <div className="flex w-full items-center gap-2">
        <button onClick={() => setIsOpen(!isOpen)} className="ml-2">
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
        <h3 className="text-lg font-bold sm:text-2xl">
          {`Día ${day.day}:`}<span className="font-normal ml-4">{`${day.title}`}</span>
        </h3>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            variants={accordion}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-2 text-sm text-gray-300 sm:text-lg"
          >
            {day.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
