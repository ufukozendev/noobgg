import {
  pgTable,
  bigint,
  timestamp,
  varchar,
  index,
  foreignKey,
} from "drizzle-orm/pg-core";
import { gamesTable } from "./games.drizzle";

export const gameRegions = pgTable(
  "game_regions",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 50 }).notNull(),
    gameId: bigint("game_id", { mode: "bigint" }).notNull(),
  },
  (table) => ({
    gameIdIndex: index("game_regions_game_id_idx").on(table.gameId),
    codeIndex: index("game_regions_code_idx").on(table.code),
    nameIndex: index("game_regions_name_idx").on(table.name),

    gameIdFk: foreignKey({
      columns: [table.gameId],
      foreignColumns: [gamesTable.id],
      name: "fk_game_regions_game_id",
    }),
  }),
);