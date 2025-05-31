import { geometry, index, integer, json, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { layerTable } from "./layer-schema";

type BasePropertiesTypes = {
	name: string;
	image?: string;
};

type PointPropertiesTypes = BasePropertiesTypes & Record<string, unknown>;

export const pointTable = pgTable(
	"points",
	{
		id: serial("id").primaryKey(),

		name: text("name").notNull(),
		properties: json("properties").$type<PointPropertiesTypes>(),
		location: geometry("location", { type: "point", srid: 4326 }).notNull(),

		createdAt: timestamp("created_at")
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull(),
		updatedAt: timestamp("updated_at")
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull(),

		layerId: integer("layer_id")
			.notNull()
			.references(() => layerTable.id, { onDelete: "cascade" }),
	},
	(t) => [index("spatial_index").using("gist", t.location)],
);

export const pointRelation = relations(pointTable, ({ one }) => ({
	layer: one(layerTable),
}));
