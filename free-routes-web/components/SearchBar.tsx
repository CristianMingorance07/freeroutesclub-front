import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { ITrip } from "@/models/Trip";

const formatDateEs = (dateString: string): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function SearchBar({
  setFilteredTrips,
}: {
  setFilteredTrips: (trips: ITrip[]) => void;
}) {
  const [destination, setDestination] = useState("");
  const [start, setStart] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (start && endDate && start > endDate) {
      setError("La fecha de vuelta no puede ser anterior a la de ida");
    } else {
      setError(null);
    }
  }, [start, endDate]);

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (destination) queryParams.append("title", destination);
      if (start) queryParams.append("start", start);
      if (endDate) queryParams.append("endDate", endDate);

      const queryString = queryParams.toString();
      const url = `/api/trips${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch trips");

      const { data }: { data: ITrip[] } = await res.json();
      if (data.length === 0) {
        setError("No se encontraron viajes con los criterios seleccionados");
        return;
      }
      setFilteredTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const triggerDatePicker = (type: "start" | "end") => {
    if (type === "start") {
      startRef.current?.showPicker();
    } else {
      endDateRef.current?.showPicker();
    }
  };

  return (
    <div className="sm:mx-0 w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center border-2 border-gray-200 bg-white py-9 text-[#08338F] shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:rounded-full sm:p-0">
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
              ref={startRef}
              type="date"
              className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <span className="text-sm">
              {start ? formatDateEs(start) : "Selecciona fecha"}
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
          disabled={error !== null}
          className={`m-2 mt-9 flex w-1/2 items-center justify-center gap-4 rounded-full p-3 text-white transition-colors hover:bg-gray-200 sm:m-0 sm:mx-4 sm:w-auto sm:bg-transparent ${error ? "cursor-not-allowed bg-gray-200" : "bg-[#ED0874]"}`}
        >
          <p className="sm:hidden">Buscar</p>
          <FaSearch className="text-white sm:text-[#ED0874]" size={18} />
        </button>
      </div>
      {error && (
        <p className="block p-4 font-semibold text-red-500">*{error}</p>
      )}
    </div>
  );
}
