"use client";

import { useState } from "react";
import { BsShieldLockFill, BsGiftFill } from "react-icons/bs";

interface ReservationFormProps {
  tripId: string;
  tripPrice: number;
  tripTitle: string;
  tripDuration: string;
  tripSpotsLeft: number;
  tripDates: { start: string; end: string };
  tripPromotion?: { isActive: boolean; discount: number; spots: number };
}

export default function ReservationForm({
  tripId,
  tripPrice = 0,
  tripTitle,
  tripDuration,
  tripSpotsLeft,
  tripDates,
  tripPromotion,
}: ReservationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentOption: "full",
    hasCompanion: false,
    companion: { name: "", phone: "" },
  });

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tripStartDate = new Date(tripDates.start);
  const daysToTrip = Math.ceil(
    (tripStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  const isPartialPaymentAllowed = daysToTrip > 15;

  const discountedPrice = tripPromotion?.isActive
    ? tripPrice * (1 - tripPromotion.discount / 100)
    : tripPrice;

  const calculateTotalPrice = () => {
    let basePrice =
      formData.paymentOption === "partial"
        ? discountedPrice * 0.3
        : discountedPrice;

    if (formData.hasCompanion) {
      basePrice *= 2;
    }

    if (couponApplied) {
      basePrice *= 0.9; // Aplicar descuento del 10%
    }

    return basePrice.toFixed(2);
  };

  const totalPrice = calculateTotalPrice();

  const handleApplyCoupon = () => {
    if (coupon === "FREEROUTES10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError(
        "Cupón no válido o exclusivo para miembros de Free Routes Club.",
      );
    }
  };

  const handlePaymentOptionChange = (option: string) => {
    setFormData((prev) => ({ ...prev, paymentOption: option }));
  };

  const handleCompanionToggle = () => {
    setFormData((prev) => ({
      ...prev,
      hasCompanion: !prev.hasCompanion,
      companion: { name: "", phone: "" },
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("companion.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        companion: { ...prev.companion, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCouponError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId,
          customer: {
            ...formData,
            tripPrice: parseFloat(totalPrice),
            tripTitle,
            coupon: couponApplied ? "FREEROUTES10" : "",
          },
          paymentOption: formData.paymentOption,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (typeof window !== "undefined") {
          window.location.href = data.url;
        }
      } else {
        setCouponError(data.error || "Error al procesar la reserva.");
      }
    } catch {
      setCouponError("Error al procesar la reserva. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="reservation-form mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      <div className="details relative mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        {/* Insignia de Promoción */}
        {tripPromotion?.isActive && (
          <div className="absolute right-0 top-0 rounded-bl-lg bg-red-600 px-4 py-1 text-xs font-bold text-white">
            ¡Oferta limitada!
          </div>
        )}

        {/* Título del Viaje */}
        <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-800">
          {tripTitle}
        </h2>

        {/* Descripción visual con elementos clave */}
        <div className="grid grid-cols-2 gap-6">
          {/* Fechas */}
          <div className="flex flex-col">
            <span className="mb-1 text-sm font-semibold text-gray-500">
              Fechas
            </span>
            <div className="flex items-center">
              <div className="flex w-full flex-col items-center rounded-lg bg-blue-100 px-3 py-2 text-blue-600 shadow-sm">
                <p className="text-lg font-bold">
                  {new Date(tripDates.start).toLocaleDateString("es-ES", {
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm">
                  {new Date(tripDates.start).toLocaleDateString("es-ES", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className="mx-2 text-lg text-gray-400">→</span>
              <div className="flex w-full flex-col items-center rounded-lg bg-blue-100 px-3 py-2 text-blue-600 shadow-sm">
                <p className="text-lg font-bold">
                  {new Date(tripDates.end).toLocaleDateString("es-ES", {
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm">
                  {new Date(tripDates.end).toLocaleDateString("es-ES", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Duración */}
          <div className="flex flex-col">
            <span className="mb-1 text-sm font-semibold text-gray-500">
              Duración
            </span>
            <div className="flex items-center justify-center rounded-lg bg-indigo-100 px-3 py-2 text-indigo-600 shadow-sm">
              <span className="text-lg font-bold">{tripDuration}</span>
            </div>
          </div>

          {/* Precio base */}
          <div className="flex flex-col">
            <span className="mb-1 text-sm font-semibold text-gray-500">
              Precio
            </span>
            <div className="flex flex-col items-start">
              {tripPromotion?.isActive ? (
                <>
                  <span className="text-lg font-bold text-red-600">
                    €{discountedPrice.toFixed(2)}{" "}
                    <span className="text-xs font-medium">(Con descuento)</span>
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    €{tripPrice.toFixed(2)}{" "}
                    <span className="text-xs">(Precio original)</span>
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-800">
                  €{tripPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Plazas disponibles */}
          <div className="flex flex-col">
            <span className="mb-1 text-sm font-semibold text-gray-500">
              Plazas disponibles
            </span>
            <div className="flex items-center justify-center rounded-lg bg-green-100 px-3 py-2 text-green-600 shadow-sm">
              <span className="text-lg font-bold">{tripSpotsLeft}</span>
            </div>
          </div>
        </div>

        {/* Generador de urgencia */}
        {tripPromotion?.isActive && (
          <p className="mt-4 text-center text-sm font-medium text-red-500">
            ¡Quedan solo {tripPromotion.spots} plazas con descuento! No pierdas
            tu oportunidad.
          </p>
        )}
      </div>

      {/* Campos de información del cliente */}
      <div className="mb-6 grid gap-4">
        <div>
          <label className="mb-1 block font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="mb-1 block font-medium">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="mb-1 block font-medium">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Opciones de pago */}
      <div className="mb-6 flex justify-around">
        <button
          type="button"
          className={`rounded-lg px-6 py-3 font-bold transition ${
            formData.paymentOption === "full"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handlePaymentOptionChange("full")}
        >
          Pago Completo
        </button>
        {isPartialPaymentAllowed && (
          <button
            type="button"
            className={`rounded-lg px-6 py-3 font-bold transition ${
              formData.paymentOption === "partial"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handlePaymentOptionChange("partial")}
          >
            Pago Parcial
          </button>
        )}
      </div>

      {/* ¿Acompañante? */}
      <div className="mb-4">
        <label className="mb-1 block font-medium">
          ¿Viene con acompañante?
        </label>
        <div
          onClick={handleCompanionToggle}
          className={`flex h-6 w-12 cursor-pointer items-center rounded-full bg-gray-300 p-1 transition ${
            formData.hasCompanion ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`h-4 w-4 transform rounded-full bg-white shadow-md transition ${
              formData.hasCompanion ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
      </div>

      {formData.hasCompanion && (
        <div className="mb-6 grid gap-4">
          <div>
            <label className="mb-1 block font-medium">
              Nombre del Acompañante
            </label>
            <input
              type="text"
              name="companion.name"
              value={formData.companion.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">
              Teléfono del Acompañante
            </label>
            <input
              type="tel"
              name="companion.phone"
              value={formData.companion.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      )}

      {/* Resumen del precio */}
      <div className="mb-6 rounded bg-[#f1f5f9] p-6 text-center shadow">
        <p className="text-lg font-medium text-[#3B74BF]">
          Total a pagar:{" "}
          <span className="font-bold text-[#08338F]">€{totalPrice}</span>
        </p>
        {tripPromotion?.isActive && (
          <p className="text-sm text-green-500">
            ¡Ahorro aplicado: {tripPromotion.discount}%!
          </p>
        )}
        {formData.paymentOption === "partial" && (
          <p className="mt-2 text-sm text-red-500">
            Recuerda que se tendrá que abonar el total 15 días antes del inicio
            del viaje.
          </p>
        )}
      </div>

      {/* Botón de seguridad */}
      <div className="mb-6 text-center text-gray-500">
        <BsShieldLockFill className="mr-2 inline text-blue-500" />
        <span>Pagos seguros garantizados</span>
      </div>

      {/* Cuadro del cupón promocional */}
      <div className="mb-6 rounded border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h3 className="mb-2 flex items-center text-lg font-semibold text-gray-800">
          <BsGiftFill className="mr-2 text-pink-500" /> Cupón exclusivo para
          miembros
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          Si eres miembro de{" "}
          <span className="font-bold text-blue-500">Free Routes Club</span>,
          introduce tu cupón promocional aquí.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Introduce tu cupón"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="rounded-lg bg-pink-500 px-6 py-3 font-bold text-white transition hover:bg-pink-600"
          >
            Aplicar
          </button>
        </div>
        {couponError && (
          <p className="mt-2 text-sm text-red-500">{couponError}</p>
        )}
        {couponApplied && (
          <p className="mt-2 text-sm text-green-500">
            ¡Cupón aplicado con éxito!
          </p>
        )}
      </div>

      {/* Resto del formulario */}
      {/* (Mantén todos los elementos originales aquí) */}

      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-lg px-6 py-4 font-bold text-white transition-opacity ${
          loading
            ? "bg-gray-300"
            : "bg-gradient-to-r from-[#ED0874] to-[#3B74BF] hover:opacity-90"
        }`}
      >
        {loading ? "Procesando..." : "Confirmar Reserva"}
      </button>
    </form>
  );
}
