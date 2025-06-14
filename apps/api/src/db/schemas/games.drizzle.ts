import { bigint, pgTable, varchar, text, index, timestamp } from "drizzle-orm/pg-core";

export const gamesTable = pgTable("games", {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  name: varchar({ length: 150 }).notNull(),
  description: text(),
  logo: varchar({ length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
},
(table) => ({
  nameIndex: index("games_name_idx").on(table.name),
})); 