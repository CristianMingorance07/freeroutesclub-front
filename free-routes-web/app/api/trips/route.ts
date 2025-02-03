import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Trip from "@/models/Trip";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const startDateStr = searchParams.get("startDate");
  const endDateStr = searchParams.get("endDate");

  const startDate = startDateStr ? new Date(startDateStr) : undefined;
  const endDate = endDateStr ? new Date(endDateStr) : undefined;

  let query: any = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (startDate && endDate) {
    query.dates = {
      $gte: startDate,
      $lte: endDate,
    };
  } else if (startDate) {
    query.dates.start = { $gte: startDate };
  } else if (endDate) {
    const today = new Date();
    query.dates = {
      $gte: today,
      $lte: endDate,
    };
  }

  const trips = await Trip.find();
  return NextResponse.json({ success: true, data: trips });
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const newTrip = await Trip.create(body);
  return NextResponse.json({ success: true, data: newTrip }, { status: 201 });
}
