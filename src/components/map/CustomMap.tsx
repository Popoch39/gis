"use client";
import React, { useEffect, useRef } from "react";
import maplibregl, {
	AttributionControl,
	GeolocateControl,
	GlobeControl,
	LogoControl,
	ScaleControl,
	TerrainControl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import useMapStore from "@/stores/mapStore";
import mapButtons from "./mapButtons";

export function CustomMap() {
	const mapRef = useRef<HTMLDivElement>(null);
	const { mapInstance, setMap } = useMapStore();
	mapButtons();

	useEffect(() => {
		if (!mapRef.current || mapInstance) return;
		const map = new maplibregl.Map({
			attributionControl: false,
			container: "map",
			style: "https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
			center: [0, 0], // starting position [lng, lat]
			zoom: 6, // starting zoom
		})
			.addControl(
				new maplibregl.NavigationControl({
					visualizePitch: true,
					showZoom: true,
					showCompass: true,
				}),
			)
			.addControl(
				new AttributionControl({
					compact: true,
				}),
			)
			.addControl(
				new GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true,
					},
					trackUserLocation: true,
				}),
			)
			.addControl(new LogoControl({ compact: false }));

		const scale = new ScaleControl({
			maxWidth: 80,
			unit: "imperial",
		});
		map.addControl(scale);

		scale.setUnit("metric");
		setMap(map);
	}, [mapInstance]);

	return <div ref={mapRef} id="map" className="h-full w-full" />;
}
