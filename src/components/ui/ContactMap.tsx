'use client';

import React, { useEffect, useRef } from 'react';
/// <reference types="@types/google.maps" />

interface ContactMapProps {
  address: string;
  title: string;
  zoom?: number;
}

const ContactMap: React.FC<ContactMapProps> = ({
  address = 'Ho Chi Minh, VN',
  title = 'CỬA HÀNG CHÍNH!',
  zoom = 15
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load Google Maps script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Define global initMap function
      window.initMap = () => {
        if (!mapRef.current) return;

        // For now, hardcode coordinates for Ho Chi Minh City
        // In a real app, you would use a geocoding service to convert address to coordinates
        const coordinates = { lat: 10.772, lng: 106.658 };

        const map = new google.maps.Map(mapRef.current, {
          center: coordinates,
          zoom,
          mapTypeControl: false,
          scrollwheel: false,
          styles: [
            {
              featureType: 'administrative',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#444444' }]
            },
            {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [{ color: '#f2f2f2' }]
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'road',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 45 }]
            },
            {
              featureType: 'road.highway',
              elementType: 'all',
              stylers: [{ visibility: 'simplified' }]
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'water',
              elementType: 'all',
              stylers: [{ color: '#b4d4e1' }, { visibility: 'on' }]
            }
          ]
        });

        const marker = new google.maps.Marker({
          position: coordinates,
          map,
          title,
          animation: google.maps.Animation.DROP,
          icon: '/images/marker.png'
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `<div class="map-info-window"><h4>${title}</h4><p>${address}</p></div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      };
    };

    // Check if Google Maps is already loaded
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      window.initMap();
    }

    return () => {
      // Cleanup
      window.initMap = () => { /* empty function */ };
    };
  }, [address, title, zoom]);

  return (
    <div 
      ref={mapRef}
      id="contact-map"
      className="w-full h-full rounded-md overflow-hidden shadow-sm"
      style={{ minHeight: '500px' }}
    ></div>
  );
};

// Add TypeScript interface for the global window object
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

export default ContactMap;
