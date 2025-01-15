'use client';

import { useState } from 'react';
import { BsShieldLockFill, BsGiftFill } from 'react-icons/bs';

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
        name: '',
        email: '',
        phone: '',
        paymentOption: 'full',
        hasCompanion: false,
        companion: { name: '', phone: '' },
    });

    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState('');
    const [loading, setLoading] = useState(false);

    const today = new Date();
    const tripStartDate = new Date(tripDates.start);
    const daysToTrip = Math.ceil((tripStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const isPartialPaymentAllowed = daysToTrip > 15;

    const discountedPrice = tripPromotion?.isActive
        ? tripPrice * (1 - tripPromotion.discount / 100)
        : tripPrice;

    const calculateTotalPrice = () => {
        let basePrice =
            formData.paymentOption === 'partial'
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
        if (coupon === 'FREEROUTES10') {
            setCouponApplied(true);
            setCouponError('');
        } else {
            setCouponApplied(false);
            setCouponError('Cupón no válido o exclusivo para miembros de Free Routes Club.');
        }
    };

    const handlePaymentOptionChange = (option: string) => {
        setFormData((prev) => ({ ...prev, paymentOption: option }));
    };

    const handleCompanionToggle = () => {
        setFormData((prev) => ({
            ...prev,
            hasCompanion: !prev.hasCompanion,
            companion: { name: '', phone: '' },
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('companion.')) {
            const field = name.split('.')[1];
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
        setCouponError('');

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tripId,
                    customer: {
                        ...formData,
                        tripPrice: parseFloat(totalPrice),
                        tripTitle,
                        coupon: couponApplied ? 'FREEROUTES10' : '',
                    },
                    paymentOption: formData.paymentOption,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = data.url;
            } else {
                setCouponError(data.error || 'Error al procesar la reserva.');
            }
        } catch (err) {
            setCouponError('Error al procesar la reserva. Inténtalo nuevamente.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="reservation-form max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
        >
            <div className="details bg-white p-6 rounded-lg mb-6 shadow-lg border border-gray-200 relative">
                {/* Insignia de Promoción */}
                {tripPromotion?.isActive && (
                    <div
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                        ¡Oferta limitada!
                    </div>
                )}

                {/* Título del Viaje */}
                <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">{tripTitle}</h2>

                {/* Descripción visual con elementos clave */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Fechas */}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-500 mb-1">Fechas</span>
                        <div className="flex items-center">
                            <div
                                className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg shadow-sm flex flex-col items-center w-full">
                                <p className="text-lg font-bold">{new Date(tripDates.start).toLocaleDateString('es-ES', {day: 'numeric'})}</p>
                                <p className="text-sm">{new Date(tripDates.start).toLocaleDateString('es-ES', {
                                    month: 'short',
                                    year: 'numeric'
                                })}</p>
                            </div>
                            <span className="mx-2 text-gray-400 text-lg">→</span>
                            <div
                                className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg shadow-sm flex flex-col items-center w-full">
                                <p className="text-lg font-bold">{new Date(tripDates.end).toLocaleDateString('es-ES', {day: 'numeric'})}</p>
                                <p className="text-sm">{new Date(tripDates.end).toLocaleDateString('es-ES', {
                                    month: 'short',
                                    year: 'numeric'
                                })}</p>
                            </div>
                        </div>
                    </div>

                    {/* Duración */}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-500 mb-1">Duración</span>
                        <div
                            className="bg-indigo-100 text-indigo-600 px-3 py-2 rounded-lg shadow-sm flex items-center justify-center">
                            <span className="text-lg font-bold">{tripDuration}</span>
                        </div>
                    </div>

                    {/* Precio base */}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-500 mb-1">Precio</span>
                        <div className="flex flex-col items-start">
                            {tripPromotion?.isActive ? (
                                <>
                        <span className="text-lg font-bold text-red-600">
                            €{discountedPrice.toFixed(2)} <span className="text-xs font-medium">(Con descuento)</span>
                        </span>
                                    <span className="text-sm line-through text-gray-400">
                            €{tripPrice.toFixed(2)} <span className="text-xs">(Precio original)</span>
                        </span>
                                </>
                            ) : (
                                <span className="text-lg font-bold text-gray-800">€{tripPrice.toFixed(2)}</span>
                            )}
                        </div>
                    </div>

                    {/* Plazas disponibles */}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-500 mb-1">Plazas disponibles</span>
                        <div
                            className="bg-green-100 text-green-600 px-3 py-2 rounded-lg shadow-sm flex items-center justify-center">
                            <span className="text-lg font-bold">{tripSpotsLeft}</span>
                        </div>
                    </div>
                </div>

                {/* Generador de urgencia */}
                {tripPromotion?.isActive && (
                    <p className="mt-4 text-center text-sm text-red-500 font-medium">
                        ¡Quedan solo {tripPromotion.spots} plazas con descuento! No pierdas tu oportunidad.
                    </p>
                )}
            </div>

            {/* Campos de información del cliente */}
            <div className="grid gap-4 mb-6">
                <div>
                    <label className="block font-medium mb-1">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Teléfono</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
                    />
                </div>
            </div>

            {/* Opciones de pago */}
            <div className="mb-6 flex justify-around">
                <button
                    type="button"
                    className={`py-3 px-6 rounded-lg font-bold transition ${
                        formData.paymentOption === 'full' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => handlePaymentOptionChange('full')}
                >
                    Pago Completo
                </button>
                {isPartialPaymentAllowed && (
                    <button
                        type="button"
                        className={`py-3 px-6 rounded-lg font-bold transition ${
                            formData.paymentOption === 'partial' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => handlePaymentOptionChange('partial')}
                    >
                        Pago Parcial
                    </button>
                )}
            </div>

            {/* ¿Acompañante? */}
            <div className="mb-4">
                <label className="block font-medium mb-1">¿Viene con acompañante?</label>
                <div
                    onClick={handleCompanionToggle}
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition ${
                        formData.hasCompanion ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                >
                    <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                            formData.hasCompanion ? 'translate-x-6' : ''
                        }`}
                    ></div>
                </div>
            </div>

            {formData.hasCompanion && (
                <div className="grid gap-4 mb-6">
                    <div>
                        <label className="block font-medium mb-1">Nombre del Acompañante</label>
                        <input
                            type="text"
                            name="companion.name"
                            value={formData.companion.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Teléfono del Acompañante</label>
                        <input
                            type="tel"
                            name="companion.phone"
                            value={formData.companion.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                </div>
            )}

            {/* Resumen del precio */}
            <div className="mb-6 bg-[#f1f5f9] p-6 rounded shadow text-center">
                <p className="text-lg text-[#3B74BF] font-medium">
                    Total a pagar: <span className="font-bold text-[#08338F]">€{totalPrice}</span>
                </p>
                {tripPromotion?.isActive && (
                    <p className="text-sm text-green-500">
                        ¡Ahorro aplicado: {tripPromotion.discount}%!
                    </p>
                )}
                {formData.paymentOption === 'partial' && (
                    <p className="text-sm text-red-500 mt-2">
                        Recuerda que se tendrá que abonar el total 15 días antes del inicio del viaje.
                    </p>
                )}
            </div>

            {/* Botón de seguridad */}
            <div className="mb-6 text-center text-gray-500">
                <BsShieldLockFill className="inline text-blue-500 mr-2"/>
                <span>Pagos seguros garantizados</span>
            </div>



            {/* Cuadro del cupón promocional */}
            <div className="mb-6 bg-gray-50 p-6 rounded shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <BsGiftFill className="text-pink-500 mr-2"/> Cupón exclusivo para miembros
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    Si eres miembro de <span className="font-bold text-blue-500">Free Routes Club</span>, introduce tu
                    cupón promocional aquí.
                </p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Introduce tu cupón"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="py-3 px-6 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition"
                    >
                        Aplicar
                    </button>
                </div>
                {couponError && <p className="text-sm text-red-500 mt-2">{couponError}</p>}
                {couponApplied && <p className="text-sm text-green-500 mt-2">¡Cupón aplicado con éxito!</p>}
            </div>

            {/* Resto del formulario */}
            {/* (Mantén todos los elementos originales aquí) */}

            <button
                type="submit"
                disabled={loading}
                className={`py-4 px-6 w-full rounded-lg font-bold text-white transition-opacity ${
                    loading ? 'bg-gray-300' : 'bg-gradient-to-r from-[#ED0874] to-[#3B74BF] hover:opacity-90'
                }`}
            >
                {loading ? 'Procesando...' : 'Confirmar Reserva'}
            </button>
        </form>
    );
}
