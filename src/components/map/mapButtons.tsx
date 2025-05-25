import useMapStore from "@/stores/mapStore";
import { useEffect } from "react";
import { FlyToParis } from "./ui/customMapButtons";

const mapButtons = () => {
const { mapInstance } = useMapStore();
useEffect(() => {
if (!mapInstance) return;
mapInstance.addControl(FlyToParis(mapInstance), "bottom-left");
}, [mapInstance]);
return null;
};

export default mapButtons;
