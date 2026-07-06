'use client';

import React, { useState, useEffect } from 'react';

export function ImageCarousel({ images, intervalMs = 3000 }: { images: string[], intervalMs?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  if (!images || images.length === 0) return null;
  if (images.length === 1) return <img src={images[0]} alt="Project screenshot" />;

  return (
    <div className="image-carousel" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Screenshot ${index + 1}`}
          style={{
            position: index === 0 ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
            zIndex: index === currentIndex ? 1 : 0
          }}
        />
      ))}
      <div className="carousel-indicators" style={{
        position: 'absolute',
        bottom: '12px',
        left: '0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        zIndex: 2
      }}>
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: index === currentIndex ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
              transition: 'background 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
