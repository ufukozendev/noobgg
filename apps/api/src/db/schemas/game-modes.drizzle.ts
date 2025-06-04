import { pgTable, bigint, integer, timestamp, text, varchar, index, foreignKey, unique } from 'drizzle-orm/pg-core';
import { gamesTable } from "./games.drizzle";

// GameMode table
export const gameModes = pgTable('game_modes', {
  id: bigint('id', { mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  
  name: varchar('name', { length: 150 }).notNull(),
  description: text('description'),
  order: integer('order').notNull(),
  
  gameId: bigint('game_id', { mode: 'bigint' }).notNull(),
  
  minTeamSize: integer('min_team_size').notNull(),
  maxTeamSize: integer('max_team_size').notNull(),
}, (table) => ({
  gameIdIndex: index('game_modes_game_id_idx').on(table.gameId),
  nameIndex: index('game_modes_name_idx').on(table.name),
  
  gameIdFk: foreignKey({
    columns: [table.gameId],
    foreignColumns: [gamesTable.id],
    name: 'fk_game_modes_game_id'
  }),
}));
