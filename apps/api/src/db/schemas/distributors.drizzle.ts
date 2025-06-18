import { integer, bigint, pgTable, varchar, text, index, timestamp } from "drizzle-orm/pg-core";

export const distributorsTable = pgTable("distributors", {
  id: bigint('id', { mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  website: varchar({ length: 255 }),
  logo: varchar({ length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
},
(table) => ({
  nameIndex: index("distributors_name_idx").on(table.name),
})); 