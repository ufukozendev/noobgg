import { pgTable, bigint, timestamp, index, unique, foreignKey } from 'drizzle-orm/pg-core';
import { userProfiles } from './user-profile.drizzle';
import { gamesTable } from './games.drizzle';

export const userFavoriteGames = pgTable(
  'user_favorite_games',
  {
    id: bigint('id', { mode: 'bigint' })
      .primaryKey(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }),

    userProfileId: bigint('user_profile_id', { mode: 'bigint' }).notNull(),
    gameId: bigint('game_id', { mode: 'bigint' }).notNull(),
  },
  (table) => ({
    userProfileIdIdx: index('user_fav_games_user_profile_id_idx').on(
      table.userProfileId,
    ),
    gameIdIdx: index('user_fav_games_game_id_idx').on(table.gameId),
    uniqueFavorite: unique('user_fav_games_user_game_unique').on(
      table.userProfileId,
      table.gameId,
    ),

    userProfileFk: foreignKey({
      columns: [table.userProfileId],
      foreignColumns: [userProfiles.id],
      name: 'fk_user_fav_games_user_profile_id',
    }),
    gameFk: foreignKey({
      columns: [table.gameId],
      foreignColumns: [gamesTable.id],
      name: 'fk_user_fav_games_game_id',
    }),
  }),
); 