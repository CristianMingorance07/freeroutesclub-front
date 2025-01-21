import {NextResponse} from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/Booking';
import Trip from '@/models/Trip';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2024-12-18.acacia',
});

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { tripId, customer, paymentOption } = body;

        if (!customer || typeof customer.hasCompanion === 'undefined') {
            throw new Error('Faltan datos del cliente o "hasCompanion" en la solicitud.');
        }

        const trip = await Trip.findById(tripId);
        if (!trip) throw new Error('Viaje no encontrado.');


        const amountToCharge = customer.tripPrice;

        const booking = await Booking.create({
            tripId,
            customer,
            payment: {
                amountPaid: amountToCharge,
                isFullPayment: paymentOption === 'full',
                paymentStatus: 'Pending',
            },
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `Reserva para ${trip.title}`,
                        },
                        unit_amount: Math.round(amountToCharge * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
            metadata: { bookingId: booking._id.toString() },
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error('Error al procesar la reserva:', (err as Error).message);
        return NextResponse.json(
            { error: (err as Error).message || 'Error al procesar la reserva. Inténtalo nuevamente.' },
            { status: 500 }
        );
    }
}
