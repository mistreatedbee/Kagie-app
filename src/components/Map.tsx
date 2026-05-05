import React from 'react';

export default function Map({ location }: { location?: { lat: number; lng: number } }) {
  const key = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY;
  if (!key) {
    return (
      <div className="h-40 sm:h-56 w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 flex items-center justify-center">
        <div className="text-center text-neutral-500">
          <div className="font-medium mb-1">Map placeholder</div>
          <div className="text-xs">Set VITE_GOOGLE_MAPS_API_KEY to show Google Maps</div>
        </div>
      </div>
    );
  }
  // If API key exists, show a simple iframe using Google Maps Static (quick, no extra deps)
  const src = `https://www.google.com/maps?q=${location?.lat || 0},${location?.lng || 0}&z=15&output=embed`;
  return (
    <div className="rounded-2xl overflow-hidden border border-neutral-200">
      <iframe title="map" src={src} className="w-full h-56" />
    </div>
  );
}
