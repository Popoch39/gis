import { json, pgEnum, pgTable, serial } from "drizzle-orm/pg-core";

const typeEnum = pgEnum("type", [
  "POINT",
  "MULTIPOINT",
  "LINESTRING",
  "MULTILINESTRING",
  "POLYGON",
  "MULTIPOLYGON",
  "GEOMETRYCOLLECTION",
  "FEATURE",
  "FEATURECOLLECTION",
]);

export const feature = pgTable("features", {
  id: serial("id").primaryKey(),

  infos: json("infos"),
  type: typeEnum("type").notNull(),
});

type infoType = {
  //TODO: do me
};
