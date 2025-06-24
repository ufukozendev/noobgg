import { pgTable, bigint, timestamp, text, pgEnum,varchar } from 'drizzle-orm/pg-core';

// Enums
export const genderEnum = pgEnum('gender', ['male', 'female', 'unknown']);
export const regionTypeEnum = pgEnum('region_type', ['north_america','south_america','europe', 'asia', 'oceania',  'middle_east', 'africa', 'russia_cis', 'unknown']);


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
  regionType: regionTypeEnum('region_type').notNull().default('unknown'),
  
  // Timestamps
  lastOnline: timestamp('last_online', { withTimezone: true }).notNull().defaultNow(),
  
  // Optimistic concurrency control
  rowVersion: text('row_version').notNull().$defaultFn(() => '0'),
});
