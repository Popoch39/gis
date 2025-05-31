import type { LayerType } from "@/types/layer";
import axios, { AxiosError } from "axios";

export class LayerClientService {
	static async getAll() {
		const response = await axios.get("/api/layers");
		return response.data.layers as LayerType[];
	}
}
