import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Trip from '@/models/Trip';

export async function GET(request: Request, { params }: { params: Record<string, string> }) {
    await dbConnect();

    try {
        const { id } = params;

        const trip = await Trip.findById(id);
        if (!trip) {
            return NextResponse.json({ error: 'Viaje no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ data: trip });
    } catch (error) {
        console.error('Error al obtener el viaje:', error);
        return NextResponse.json({ error: 'Error al obtener el viaje' }, { status: 500 });
    }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
    await dbConnect();
    const { id } = context.params;

    try {
        const body = await req.json();
        const updatedTrip = await Trip.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedTrip) {
            return NextResponse.json({ success: false, message: 'Trip not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedTrip });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    await dbConnect();
    const { id } = context.params;

    try {
        const deletedTrip = await Trip.findByIdAndDelete(id);
        if (!deletedTrip) {
            return NextResponse.json({ success: false, message: 'Trip not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: deletedTrip });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
