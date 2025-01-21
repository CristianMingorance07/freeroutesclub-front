'use client';

import { useEffect, useState } from 'react';
import ReservationForm from '@/components/ReservationForm';

export default function ReserveTripPage({ params }: { params: Promise<{ id: string }> }) {
    const [trip, setTrip] = useState<null | {
        id: string;
        title: string;
        price: number;
        duration: string;
        spotsLeft: number;
        dates: { start: string; end: string };
        promotions?: { isActive: boolean; discount: number; spots: number };
    }>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchTrip() {
            try {
                const resolvedParams = await params;
                const res = await fetch(`/api/trips/${resolvedParams.id}`);
                if (!res.ok) throw new Error('Error al cargar los datos del viaje.');
                const data = await res.json();
                setTrip({
                    id: resolvedParams.id,
                    title: data.data.title,
                    price: data.data.price,
                    duration: data.data.duration,
                    spotsLeft: data.data.availability.spotsLeft,
                    dates: data.data.dates,
                    promotions: data.data.promotions,
                });
            } catch {
                setError('No se pudo cargar la información del viaje. Inténtalo más tarde.');
            } finally {
                setLoading(false);
            }
        }
        fetchTrip();
    }, [params]);

    if (loading) return <p className="text-center text-lg">Cargando...</p>;
    if (error || !trip) return <p className="text-center text-red-500">{error || 'Viaje no encontrado.'}</p>;

    const discountedPrice = trip.promotions?.isActive && trip.spotsLeft <= trip.promotions.spots
        ? (trip.price * (1 - trip.promotions.discount / 100)).toFixed(2)
        : trip.price.toFixed(2);

    return (
        <div className="max-w-4xl mx-auto p-8">
            <ReservationForm
                tripId={trip.id}
                tripPrice={parseFloat(discountedPrice)}
                tripTitle={trip.title}
                tripDuration={trip.duration}
                tripSpotsLeft={trip.spotsLeft}
                tripDates={trip.dates}
                tripPromotion={trip.promotions}
            />
        </div>
    );
}
