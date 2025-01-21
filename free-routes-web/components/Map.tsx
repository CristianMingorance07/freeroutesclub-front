import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
