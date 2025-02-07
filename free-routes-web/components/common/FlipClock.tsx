import { useState, useEffect } from "react";
import "../styles/FlipClock.css";

export default function FlipClock({
  departure,
}: {
  departure: { date: string; time: string };
}) {
  const [time, setTime] = useState(() => calculateTimeDifference(departure));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeDifference(departure));
    }, 1000);

    return () => clearInterval(timer);
  }, [departure]);

  return (
    <div className="digital-clock">
      <div className="time-group">
        {Object.entries(time).map(([key, value]) => (
          <div className="time-unit" key={key}>
            <span className="number block">{value}</span>
            <span className="label">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateTimeDifference(departure: { date: string; time: string }) {
  const now = new Date();

  const departureDate = new Date(departure.date);
  const [hours, minutes] = departure.time.split(":");

  const targetDate = new Date(departureDate);
  targetDate.setHours(parseInt(hours), parseInt(minutes), 0);

  const difference = targetDate.getTime() - now.getTime();

  if (difference > 0) {
    return {
      días: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0",
      ),
      horas: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      ),
      minutos: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
        2,
        "0",
      ),
      segundos: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  }

  return { días: "00", horas: "00", minutos: "00", segundos: "00" };
}
