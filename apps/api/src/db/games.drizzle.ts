import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const gamesTable = pgTable("games", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 150 }).notNull(),
  description: text(),
  logo: varchar({ length: 255 }),
}); 