// app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {TripProvider} from "@/context/TripContext";

const workSans = Work_Sans({
    subsets: ['latin'],
    variable: '--font-work-sans',
});

export const metadata: Metadata = {
    title: 'Free Routes Club',
    description: 'Experiences, courses, merch, and a community of riders.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={workSans.variable}>
        <body className="min-h-screen flex flex-col bg-white text-black">
        <TripProvider>
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </TripProvider>
        </body>
        </html>
    );
}
