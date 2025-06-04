import { pgTable, bigint, timestamp, varchar, index, unique, foreignKey } from "drizzle-orm/pg-core";
import { gamesTable } from "./games.drizzle";
import { platforms } from "./platforms.drizzle";


// GamePlatform junction table
export const gamePlatforms = pgTable('game_platforms', {
    id: bigint('id', { mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    
    gameId: bigint('game_id', { mode: 'bigint' }).notNull(),
    platformId: bigint('platform_id', { mode: 'bigint' }).notNull(),
  }, (table) => ({
    gameIdIndex: index('game_platforms_game_id_idx').on(table.gameId),
    platformIdIndex: index('game_platforms_platform_id_idx').on(table.platformId),
    
    // Unique constraint to prevent duplicate game-platform combinations
    uniqueGamePlatform: unique('unique_game_platform').on(table.gameId, table.platformId),
    
    gameIdFk: foreignKey({
      columns: [table.gameId],
      foreignColumns: [gamesTable.id],
      name: 'fk_game_platforms_game_id'
    }),
    
    platformIdFk: foreignKey({
      columns: [table.platformId],
      foreignColumns: [platforms.id],
      name: 'fk_game_platforms_platform_id'
    }),
  }));