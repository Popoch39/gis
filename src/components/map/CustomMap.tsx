"use client";
import React, { useEffect, useRef, useState } from "react";
import maplibregl, { AttributionControl, GeolocateControl, GlobeControl, LogoControl, ScaleControl, TerrainControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import useMapStore from "@/stores/mapStore";
import mapButtons from "./mapButtons";
import * as turf from "@turf/turf";
import { useQuery } from "@tanstack/react-query";
import { LayerClientService } from "@/client/endpoints/layer";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "@/lib/auth-client";

export function CustomMap() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["layers"],
    queryFn: async () => {
      const layers = await LayerClientService.getAllByUserId();
      return layers;
    },
  });
  if (isLoading) {
    console.log("loading");
  }
  if (isError) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    } else {
      toast.error("An error occurred while fetching layers");
    }
  }
  if (data) {
    console.log(data[0]);
  }
  const mapRef = useRef<HTMLDivElement>(null);
  const { mapInstance, setMap } = useMapStore();
  mapButtons();

  useEffect(() => {
    if (!mapRef.current || mapInstance) return;
    try {
      const startTime = performance.now();
      const map = new maplibregl.Map({
        attributionControl: false,
        container: "map",
        style: "https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
        center: [2.3522, 48.8568], // paris
        zoom: 6, // starting zoom
      });
      // .addControl(
      //   new maplibregl.NavigationControl({
      //     visualizePitch: true,
      //     showZoom: true,
      //     showCompass: true,
      //   }),
      // )
      // .addControl(
      //   new AttributionControl({
      //     compact: true,
      //   }),
      // )
      // .addControl(
      //   new GeolocateControl({
      //     positionOptions: {
      //       enableHighAccuracy: true,
      //     },
      //     trackUserLocation: true,
      //   }),
      // )
      // .addControl(new LogoControl({ compact: false }));

      const scale = new ScaleControl({
        maxWidth: 80,
        unit: "imperial",
      });
      map.addControl(scale);

      scale.setUnit("metric");
      setMap(map);

      map.on("load", () => {
        const endTime = performance.now();
        console.log(`Map initialized in ${(endTime - startTime).toFixed(2)}ms`);
      });
      // map.addSource("cadastre", {
      // type: "raster",
      // tiles: [
      // "https://data.geopf.fr/wmts?" +
      // "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0" +
      // "&LAYER=CADASTRALPARCELS.PARCELLAIRE_EXPRESS" +
      // "&STYLE=normal" +
      // "&FORMAT=image/png" +
      // "&TILEMATRIXSET=PM" +
      // "&TILEMATRIX={z}" +
      // "&TILEROW={y}" +
      // "&TILECOL={x}",
      // ],
      // tileSize: 256,
      // attribution: "© IGN - Geoportail",
      // });
      // map.addLayer({
      // id: "cadastre",
      // type: "raster",
      // source: "cadastre",
      // paint: {
      // "raster-opacity": 0.8, // Réduire légèrement l'opacité
      // "raster-fade-duration": 300, // Transition plus rapide
      // "raster-resampling": "linear", // Rééchantillonnage plus rapide
      // },
      // layout: {
      // visibility: "visible", // ou "none" selon ton besoin
      // },
      // });
      //
      // map.on("error", (e) => {
      // console.error("Erreur MapLibre:", e);
      // });
      //
      // map.on("sourcedataloading", (e) => {
      // if (e.sourceId === "cadastre") {
      // console.log("Chargement des tuiles cadastre...");
      // }
      // });
      // });
    } catch (error) {
      console.log("Error loading maplibre preload script", error);
    }
  }, [mapInstance, setMap]);

  return (
    <>
      <div id="map" ref={mapRef} className="h-full w-full" />
    </>
  );
}
