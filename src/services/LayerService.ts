import { eq } from "drizzle-orm";
import { layerTable } from "@/db/schemas/layer-schema";
import { handleApiError } from "@/lib/auth-wrapper";
import { db } from "@/lib/db";
import type { createLayerType } from "@/types/layer";

export class LayerService {
	static async store(payload: createLayerType) {
		try {
			const layer = await db.insert(layerTable).values(payload).returning();
			return layer;
		} catch (error) {
			handleApiError(error);
		}
	}

	static async all() {
		try {
			const layers = await db.select().from(layerTable);
			return layers;
		} catch (error) {
			handleApiError(error);
		}
	}

	static async getByUserId(userId: string) {
		try {
			const layers = await db.query.layerTable.findMany({
				where: eq(layerTable.userId, userId),
			});
			return layers;
		} catch (error) {
			handleApiError(error);
		}
	}
}
