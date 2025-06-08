import { pointTable } from "@/db/schemas/point-schema";
import { handleApiError } from "@/lib/auth-wrapper";
import { db } from "@/lib/db";
import type { createPointType } from "@/types/features/point";

export class PointService {
	static async store(payload: createPointType) {
		try {
			console.log(payload);
			const point = await db.insert(pointTable).values(payload).returning();
			console.log(point);
			return point;
		} catch (error) {
			handleApiError(error);
		}
	}
}
