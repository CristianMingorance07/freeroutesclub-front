import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Trip from "@/models/Trip";

interface TripQuery {
  title?: { $regex: string; $options: string };
  "dates.start"?: { $gte: Date };
  "dates.end"?: { $lte: Date };
}

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const startStr = searchParams.get("start");
  const endDateStr = searchParams.get("endDate");

  const start = startStr ? new Date(startStr) : undefined;
  const endDate = endDateStr ? new Date(endDateStr) : undefined;

  const query: TripQuery = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (start && endDate) {
    query["dates.start"] = { $gte: start };
    query["dates.end"] = { $lte: endDate };
  } else if (start) {
    query["dates.start"] = { $gte: start };
  } else if (endDate) {
    const today = new Date();
    query["dates.start"] = { $gte: today };
    query["dates.end"] = { $lte: endDate };
  }

  const trips = await Trip.find(query);
  return NextResponse.json({ success: true, data: trips });
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const newTrip = await Trip.create(body);
  return NextResponse.json({ success: true, data: newTrip }, { status: 201 });
}