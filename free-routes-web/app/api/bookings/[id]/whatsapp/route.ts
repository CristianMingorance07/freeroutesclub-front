import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Trip from "@/models/Trip";

interface PopulatedBooking {
  tripId: {
    whatsappGroup: string;
    _id: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;

  try {
    const booking = (await Booking.findById(id)
      .select("tripId")
      .populate({
        path: "tripId",
        select: "whatsappGroup",
        model: Trip,
      })
      .lean()
      .exec()) as PopulatedBooking | null;
    if (!booking) {
      return NextResponse.json(
        { error: "Reserva no encontrada" },
        { status: 404 },
      );
    }
    const { whatsappGroup } = booking.tripId;

    return NextResponse.json({ whatsappGroup });
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    return NextResponse.json(
      { error: "Error al obtener la reserva" },
      { status: 500 },
    );
  }
}
