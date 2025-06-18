import { pgTable, integer, bigint, timestamp, varchar, index, foreignKey } from "drizzle-orm/pg-core";
import { gamesTable } from "./games.drizzle";


// GameRank table
export const gameRanks = pgTable('game_ranks', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),

    name: varchar('name', { length: 100 }).notNull(),
    image: varchar('image', { length: 255 }).notNull(),
    order: integer('order').notNull(),

    gameId: bigint('game_id', { mode: 'bigint' }).notNull(),
  }, (table) => ({
    gameIdIndex: index('game_ranks_game_id_idx').on(table.gameId),
    nameIndex: index('game_ranks_name_idx').on(table.name),

    gameIdFk: foreignKey({
      columns: [table.gameId],
      foreignColumns: [gamesTable.id],
      name: 'fk_game_ranks_game_id'
    }),
  }));

  // Note: You'll need to import the gamesTable from your existing games schema file
  // import { gamesTable } from './games';