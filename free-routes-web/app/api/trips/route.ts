import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Trip from "@/models/Trip";

export async function GET(request: Request) {
  await dbConnect();

  console.log("searchParams", new URL(request.url).searchParams);

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const startStr = searchParams.get("start");
  const endDateStr = searchParams.get("endDate");

  const start = startStr ? new Date(startStr) : undefined;
  const endDate = endDateStr ? new Date(endDateStr) : undefined;
  console.log("start", start);

  let query: any = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }
  //{ "dates.start": { "$gte": ISODate("2025-06-15T00:00:00.000Z") } }
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
  console.log("query", query);

  const trips = await Trip.find(query);
  return NextResponse.json({ success: true, data: trips });
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const newTrip = await Trip.create(body);
  return NextResponse.json({ success: true, data: newTrip }, { status: 201 });
}
