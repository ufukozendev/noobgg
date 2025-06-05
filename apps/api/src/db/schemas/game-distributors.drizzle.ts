import { pgTable, bigint, timestamp, index, foreignKey } from "drizzle-orm/pg-core";
import { gamesTable } from "./games.drizzle";
import { distributorsTable } from "./distributors.drizzle";

export const gameDistributors = pgTable(
  "game_distributors",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    gameId: bigint("game_id", { mode: "bigint" }).notNull(),
    distributorId: bigint("distributor_id", { mode: "bigint" }).notNull(),
  },
  (table) => ({
    gameIdIndex: index("game_distributors_game_id_idx").on(table.gameId),
    distributorIdIndex: index("game_distributors_distributor_id_idx").on(table.distributorId),

    gameIdFk: foreignKey({
      columns: [table.gameId],
      foreignColumns: [gamesTable.id],
      name: "fk_game_distributors_game_id",
    }),

    distributorIdFk: foreignKey({
      columns: [table.distributorId],
      foreignColumns: [distributorsTable.id],
      name: "fk_game_distributors_distributor_id",
    }),
  }),
);
