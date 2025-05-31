import type { Map as MaplibreMap } from "maplibre-gl";
import { create } from "zustand";

interface MapStore {
	mapInstance: MaplibreMap | null;
	setMap: (map: maplibregl.Map) => void;
	mapReady: boolean;
	setMapReady: (ready: boolean) => void;
}

const useMapStore = create<MapStore>()((set) => ({
	mapInstance: null,
	setMap: (map) => set({ mapInstance: map }),
	mapReady: false,
	setMapReady: (ready) => set({ mapReady: ready }),
}));

export default useMapStore;
