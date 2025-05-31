import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schemas";
import { pointTable } from "./point-schema";

export const layerTable = pgTable("layers", {
	id: serial("id").primaryKey(),

	name: text("name").notNull(),

	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),

	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const layerRelation = relations(layerTable, ({ one, many }) => ({
	user: one(user, {
		fields: [layerTable.userId],
		references: [user.id],
	}),
	poinlayerts: many(pointTable),
}));
