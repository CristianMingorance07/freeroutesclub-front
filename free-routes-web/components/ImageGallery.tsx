'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './styles/ImageGallery.css';

export default function ImageGallery({ images }: { images: string[] }) {
    const [current, setCurrent] = useState(0);

    // Cambiar automáticamente las imágenes cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const nextImage = () => setCurrent((current + 1) % images.length);
    const prevImage = () => setCurrent((current - 1 + images.length) % images.length);

    return (
        <div className="gallery-container">
            <div className="gallery-wrapper">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Gallery Image ${index + 1}`}
                        width={800}
                        height={500}
                        className={`gallery-image ${index === current ? 'active' : ''}`}
                    />
                ))}
            </div>
            <button onClick={prevImage} className="navigation-button left">❮</button>
            <button onClick={nextImage} className="navigation-button right">❯</button>
        </div>
    );
}
