'use client'

import { useRef, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Configurar íconos personalizados de Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

export default function ResettableMap({ position }: { position: [number, number] }) {
    const mapRef = useRef<L.Map | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        // Verificar si el contenedor tiene una instancia previa
        if (containerRef.current && containerRef.current.innerHTML !== '') {
            containerRef.current.innerHTML = '' // Limpiar manualmente el contenedor del mapa
        }

        // Inicializar el mapa
        if (containerRef.current) {
            mapRef.current = L.map(containerRef.current).setView(position, 10)

            // Añadir capa de mosaicos
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current)

            // Añadir marcador
            L.marker(position).addTo(mapRef.current)
        }

        // Limpiar el mapa al desmontar
        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null // Resetear referencia del mapa
            }
        }
    }, [position])

    return <div ref={containerRef} className="h-64 w-full rounded-lg shadow-md" />
}
