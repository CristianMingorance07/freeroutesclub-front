// app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { TripProvider } from "@/context/TripContext";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "We Riders Travel",
  description:
    "Descubre aventuras épicas en moto por los destinos más apasionantes. Vive jornadas inolvidables, comparte rutas impactantes y únete a la mejor comunidad de viajeros sobre dos ruedas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className="flex min-h-screen flex-col bg-white text-black">
        <TripProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </TripProvider>
      </body>
    </html>
  );
}
