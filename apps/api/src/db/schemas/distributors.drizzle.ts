import { integer, pgTable, varchar, text, index } from "drizzle-orm/pg-core";

export const distributorsTable = pgTable("distributors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  website: varchar({ length: 255 }),
  logo: varchar({ length: 255 }),
},
(table) => ({
  nameIndex: index("distributors_name_idx").on(table.name),
})); 