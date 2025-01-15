'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { ITrip as Trip } from '@/models/Trip';

interface TripContextProps {
    selectedTrip: Trip | null;
    setSelectedTrip: (trip: Trip | null) => void;
}

const TripContext = createContext<TripContextProps | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    return (
        <TripContext.Provider value={{ selectedTrip, setSelectedTrip }}>
            {children}
        </TripContext.Provider>
    );
}

export function useTripContext() {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error('useTripContext must be used within a TripProvider');
    }
    return context;
}
