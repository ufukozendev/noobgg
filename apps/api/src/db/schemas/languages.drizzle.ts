import { pgTable, bigint, timestamp, varchar, index } from "drizzle-orm/pg-core";

export const languages = pgTable(
  "languages",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length: 10 }).notNull(),
    flagUrl: varchar("flag_url", { length: 255 }),
  },
  (table) => ({
    nameIndex: index("languages_name_idx").on(table.name),
    codeIndex: index("languages_code_idx").on(table.code),
  }),
);
