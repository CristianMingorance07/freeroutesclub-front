import { ITrip as Trip } from "@/models/Trip";
import Image from "next/image";
import { useState } from "react";

export default function TripCard({ trip }: { trip: Trip }) {
  const [imgSrc, setImgSrc] = useState(trip.imageUrl);
  const defaultImage = "/img/placeholder.webp";
  const handleImageError = () => {
    // Prevent an infinite loop if the default image also fails.
    if (imgSrc !== defaultImage) {
      setImgSrc(defaultImage);
    }
  };

  return (
    <div className="group relative flex h-[420px] w-72 flex-col overflow-hidden rounded-lg bg-white/90 shadow-md transition-transform hover:translate-x-1 hover:shadow-lg sm:w-96">
      <div className="relative h-2/5 w-full">
        <Image
          src={imgSrc}
          alt={trip.title}
          layout="fill"
          objectFit="cover"
          onError={handleImageError}
        />
      </div>
      <div className="flex flex-grow flex-col justify-between p-4">
        <h2 className="mb-2 text-xl font-bold text-[#08338F]">{trip.title}</h2>
        <p className="flex-grow text-sm text-gray-600">{trip.description}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Duración:</strong> {trip.duration}
          </p>
          <p className="text-lg font-bold text-[#ED0874]">€{trip.price}</p>
        </div>
      </div>
    </div>
  );
}
