import type { layerTable } from "@/db/schemas/layer-schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import z from "zod";

export type LayerType = InferSelectModel<typeof layerTable>;
export type createLayerType = InferInsertModel<typeof layerTable>;

export const validateLayer = z.object({
	name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
	userId: z.string().min(1, "L'utilisateur est requis"),
});

export const createLayerForm = z.object({
	name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

export type createLayerFormType = z.infer<typeof createLayerForm>;
