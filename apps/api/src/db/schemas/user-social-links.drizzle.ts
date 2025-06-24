import { pgTable, bigint, timestamp, varchar, pgEnum, index, foreignKey } from 'drizzle-orm/pg-core';
import { userProfiles } from './user-profile.drizzle';

// Enum for supported social media platforms
export const socialMediaPlatformEnum = pgEnum('social_media_platform', [
  'discord',
  'facebook',
  'github',
  'instagram',
  'kick',
  'linkedin',
  'reddit',
  'spotify',
  'telegram',
  'tiktok',
  'twitch',
  'vk',
  'website',
  'x',
  'youtube',
]);

// User Social Links table
export const userSocialLinks = pgTable(
  'user_social_links',
  {
    id: bigint('id', { mode: 'bigint' })
      .primaryKey(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }),

    // References
    userProfileId: bigint('user_profile_id', { mode: 'bigint' }).notNull(),

    // Enum & data
    platform: socialMediaPlatformEnum('platform').notNull(),
    url: varchar('url', { length: 255 }).notNull(),
  },
  (table) => ({
    userProfileIdIdx: index('user_social_links_user_profile_id_idx').on(
      table.userProfileId,
    ),
    platformIdx: index('user_social_links_platform_idx').on(table.platform),

    userProfileIdFk: foreignKey({
      columns: [table.userProfileId],
      foreignColumns: [userProfiles.id],
      name: 'fk_user_social_links_user_profile_id',
    }),
  }),
); 