import type { pointTable } from "@/db/schemas/point-schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import z from "zod";

export type PointType = InferSelectModel<typeof pointTable>;
export type createPointType = InferInsertModel<typeof pointTable>;

export const validatePoint = z.object({
	name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
	layerId: z.number().min(1, "La couche est requise"),
});
