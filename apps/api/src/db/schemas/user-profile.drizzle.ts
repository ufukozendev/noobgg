import { pgTable, bigint, timestamp, text, pgEnum,varchar } from 'drizzle-orm/pg-core';

// Enums
export const genderEnum = pgEnum('gender', ['male', 'female', 'unknown']);
export const regionEnum = pgEnum('region', [
  'north_america',
  'south_america',
  'europe',
  'asia',
  'oceania',
  'middle_east',
  'africa',
  'russia_cis',
  'unknown',
]);
export const gameGenreEnum = pgEnum('game_genre', [
  'fps',
  'adventure',
  'mmorpg',
  'sports',
  'racing',
  'simulation',
  'strategy',
  'puzzle',
  'fighting',
  'survival',
  'battle_royale',
  'sandbox',
  'unknown',
]);
export { regionEnum as regionTypeEnum };
export { gameGenreEnum as gameGenreTypeEnum };

// Player types
export const playerTypeEnum = pgEnum('player_type', [
  'casual',
  'competitive',
  'pro',
  'unknown',
]);
export { playerTypeEnum as playerTypeTypeEnum };

// Roles/Relations to the gaming industry
export const industryRoleEnum = pgEnum('industry_role', [
  'streamer',
  'designer',
  'developer',
  'gamer',
  'content_creator',
  'unknown',
]);
export { industryRoleEnum as industryRoleTypeEnum };

// Looking-for preferences (LFG, LFM, etc.)
export const lookingForEnum = pgEnum('looking_for', [
  'lfg', // Looking for Group
  'lfm', // Looking for Members (recruiting)
  'lfc', // Looking for Clan/Team/Guild
  'unknown',
]);
export { lookingForEnum as lookingForTypeEnum };

// Presence / activity status
export const presenceStatusEnum = pgEnum('presence_status', [
  'offline',
  'online',
  'in_game',
  'in_lobby',
  'unknown',
]);
export { presenceStatusEnum as presenceStatusTypeEnum };

// UserProfile table
export const userProfiles = pgTable('user_profiles', {
  
  id: bigint('id', { mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  userKeycloakId: varchar('user_keycloak_id', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  
  birthDate: timestamp('birth_date', { withTimezone: true }),
  userName: varchar('user_name', { length: 50 }).notNull().unique(),
  firstName: varchar('first_name', { length: 60 }),
  lastName: varchar('last_name', { length: 60 }),
  profileImageUrl: varchar('profile_image_url', { length: 255 }),
  bannerImageUrl: varchar('banner_image_url', { length: 255 }),
  bio: text('bio'),
  
  
  // Enums
  gender: genderEnum('gender').notNull().default('unknown'),
  region: regionEnum('region').notNull().default('unknown'),
  favoriteGameGenre: gameGenreEnum('favorite_game_genre').notNull().default('unknown'),
  playerType: playerTypeEnum('player_type').notNull().default('unknown'),
  industryRole: industryRoleEnum('industry_role').notNull().default('unknown'),
  lookingFor: lookingForEnum('looking_for').notNull().default('unknown'),
  presenceStatus: presenceStatusEnum('presence_status').notNull().default('unknown'),
  
  
  // Timestamps
  lastOnline: timestamp('last_online', { withTimezone: true }).notNull().defaultNow(),
  
  // Optimistic concurrency control
  rowVersion: text('row_version').notNull().$defaultFn(() => '0'),
});
