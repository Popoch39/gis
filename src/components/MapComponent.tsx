"use client"
import { useEffect, useRef } from "react";
import maplibre from "maplibre-gl"

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new maplibre.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      attributionControl: false, // Hides attribution control
      center: [0, 0],
      zoom: 6,
    });
  }, [mapContainer])

  return (
    <div ref={mapContainer} className="h-full w-full"></div>
  )

}

export default MapComponent;
