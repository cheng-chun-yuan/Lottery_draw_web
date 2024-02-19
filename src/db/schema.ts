import {
  index,
  pgTable,
  serial,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

// Users Table
export const lotterysTable = pgTable(
  "lotterys",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    name: varchar("name").notNull().unique(),
    symbol: varchar("symbol").notNull(),
    baseTokenURI: varchar("base_token_uri").notNull(),
    percentage: integer("percentage").array().notNull(),
    link: varchar("link").notNull(),
  },
  (table) => ({
    displayIdIndex: index("lotterys_display_id_index").on(table.displayId),
  }),
);
