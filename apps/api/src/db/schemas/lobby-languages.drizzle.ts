import { pgTable, bigint, timestamp, index, foreignKey } from "drizzle-orm/pg-core";
import { lobbies } from "./lobbies.drizzle";
import { languages } from "./languages.drizzle";

export const lobbyLanguages = pgTable(
  "lobby_languages",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    lobbyId: bigint("lobby_id", { mode: "bigint" }).notNull(),
    languageId: bigint("language_id", { mode: "bigint" }).notNull(),
  },
  (table) => ({
    lobbyIdIndex: index("lobby_languages_lobby_id_idx").on(table.lobbyId),
    languageIdIndex: index("lobby_languages_language_id_idx").on(table.languageId),

    lobbyIdFk: foreignKey({
      columns: [table.lobbyId],
      foreignColumns: [lobbies.id],
      name: "fk_lobby_languages_lobby_id",
    }),

    languageIdFk: foreignKey({
      columns: [table.languageId],
      foreignColumns: [languages.id],
      name: "fk_lobby_languages_language_id",
    }),
  }),
);
