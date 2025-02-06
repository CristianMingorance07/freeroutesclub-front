// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Trip from "@/models/Trip";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: Request) {
  await dbConnect();
  const signature = req.headers.get("stripe-signature")!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const bookingId = session.metadata?.bookingId;
      const isFullPayment = session.metadata?.isFullPayment;
      const tripId = session.metadata?.tripId;
      if (bookingId) {
        await Booking.findByIdAndUpdate(bookingId, {
          "payment.paymentStatus": isFullPayment
            ? "FullyPaid"
            : "PartiallyPaid",
          status: isFullPayment ? "Completed" : "Active",
        });

        await Trip.findByIdAndUpdate(tripId, {
          $inc: { "availability.spotsLeft": -1 },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }
}
