import { useState } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    console.log("Searching with", { destination, startDate, endDate });
  };

  return (
    <div className="flex items-center rounded-full border-2 border-gray-200 bg-white text-[#08338F] shadow-sm transition-shadow hover:shadow-md">
      <div className="relative flex-1 rounded-l-full py-3 pl-6 pr-4 hover:bg-gray-200">
        <label className="mb-1 block text-xs font-semibold">Destino</label>
        <input
          type="text"
          placeholder="¿Dónde quieres ir?"
          className="w-full border-none bg-transparent p-0 text-sm focus:ring-0"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Separador */}
      <div className="h-8 w-px bg-gray-200" />

      {/* Botón Fecha Inicio */}
      <button
        className="relative px-4 py-3 hover:bg-gray-200"
        onClick={() => document.getElementById("startDate")?.focus()}
      >
        <div className="text-left">
          <label className="mb-1 block text-xs font-semibold">Salida</label>
          <input
            id="startDate"
            type="date"
            className="absolute -z-10 opacity-0"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="text-sm">{startDate || "Selecciona fecha"}</span>
        </div>
      </button>

      {/* Separador */}
      <div className="h-8 w-px bg-gray-200" />

      {/* Botón Fecha Fin */}
      <button
        className="relative rounded-r-full px-4 py-3 hover:bg-gray-200"
        onClick={() => document.getElementById("endDate")?.focus()}
      >
        <div className="text-left">
          <label className="mb-1 block text-xs font-semibold">Vuelta</label>
          <input
            id="endDate"
            type="date"
            className="absolute -z-10 opacity-0"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <span className="text-sm">{endDate || "Selecciona fecha"}</span>
        </div>
      </button>

      {/* Botón Buscar */}
      <button
        onClick={handleSearch}
        className="bg-airbnb-red hover:bg-airbnb-red-dark m-2 rounded-full p-3 text-white transition-colors"
      >
        <FaSearch className="text-[#ED0874]" size={18} />
      </button>
    </div>
  );
}
