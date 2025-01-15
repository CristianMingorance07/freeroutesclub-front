import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Trip from '@/models/Trip';

export async function GET() {
    await dbConnect();
    const trips = await Trip.find({});
    return NextResponse.json({ success: true, data: trips });
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const newTrip = await Trip.create(body);
    return NextResponse.json({ success: true, data: newTrip }, { status: 201 });
}
