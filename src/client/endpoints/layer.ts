import type { LayerType } from "@/types/layer";
import axios from "axios";

export class LayerClientService {
  static async getAll() {
    const response = await axios.get("/api/layers");
    return response.data.layers as LayerType[];
  }

  static async getAllByUserId() {
    const response = await axios.get("api/layers/user");
    return response.data.layers as LayerType[];
  }
}
