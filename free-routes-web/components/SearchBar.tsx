import { error } from "console";
import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const formatDateEs = (dateString: string): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      setError("La fecha de vuelta no puede ser anterior a la de ida");
    } else {
      setError(null);
    }
  }, [startDate, endDate]);

  const handleSearch = () => {
    console.log("Searching with", {
      destination,
      startDate,
      endDate,
    });
  };

  const triggerDatePicker = (type: "start" | "end") => {
    if (type === "start") {
      startDateRef.current?.showPicker();
    } else {
      endDateRef.current?.showPicker();
    }
  };

  return (
    <div className="flex w-full flex-col items-center border-2 border-gray-200 bg-white py-9 text-[#08338F] shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:rounded-full sm:p-0">
      {/* Input Destino */}
      <div className="relative w-full flex-1 rounded-l-full px-4 py-3 hover:bg-gray-50 sm:py-3 sm:pl-6 sm:pr-4">
        <label className="mb-1 block text-xs font-semibold">Destino</label>
        <input
          type="text"
          placeholder="¿Dónde quieres ir?"
          className="w-full border-none bg-transparent p-0 text-sm focus:ring-0"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="h-px w-full bg-gray-200 sm:h-8 sm:w-px" />

      <button
        className="relative w-full px-4 py-3 hover:bg-gray-50 sm:w-1/3"
        onClick={() => triggerDatePicker("start")}
      >
        <div className="text-left">
          <label className="mb-1 block text-xs font-semibold">Ida</label>
          <input
            ref={startDateRef}
            type="date"
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="text-sm">
            {startDate ? formatDateEs(startDate) : "Selecciona fecha"}
          </span>
        </div>
      </button>

      <div className="h-px w-full bg-gray-200 sm:h-8 sm:w-px" />

      <button
        className="relative w-full px-4 py-3 hover:bg-gray-50 sm:w-1/3"
        onClick={() => triggerDatePicker("end")}
      >
        <div className="text-left">
          <label className="mb-1 block text-xs font-semibold">Vuelta</label>
          <input
            ref={endDateRef}
            type="date"
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <span className="text-sm">
            {endDate ? formatDateEs(endDate) : "Selecciona fecha"}
          </span>
        </div>
      </button>

      <div className="h-px w-full bg-gray-200 sm:h-8 sm:w-px" />

      <button
        onClick={handleSearch}
        className="m-2 mt-9 flex w-1/2 items-center justify-center gap-4 rounded-full bg-[#ED0874] p-3 text-white transition-colors hover:bg-gray-200 sm:m-0 sm:mx-4 sm:w-auto sm:bg-transparent"
      >
        <p className="sm:hidden">Buscar</p>
        <FaSearch className="text-white sm:text-[#ED0874]" size={18} />
      </button>
      {error && <p className="p-4 font-semibold text-red-500">*{error}</p>}
    </div>
  );
}
