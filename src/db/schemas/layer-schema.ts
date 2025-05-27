import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const layer = pgTable("layers", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),
});
