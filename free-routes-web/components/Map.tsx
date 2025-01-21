import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
    ssr: false
});
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
    ssr: false
});
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {
    ssr: false
});

export default function Map({ position }: { position: [number, number] }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            return () => {
                const container = document.querySelector('.leaflet-container');
                if (container?.classList.contains('leaflet-container')) {
                    container.remove();
                }
            };
        }
    }, [position]);

    return (
        <div key={position.toString()} className="relative">
            <MapContainer
                center={position}
                zoom={10}
                className="h-64 w-full rounded-lg shadow-md"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} />
            </MapContainer>
        </div>
    );
}
