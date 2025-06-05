import {
  pgTable,
  bigint,
  timestamp,
  varchar,
  text,
  boolean,
  integer,
  index,
  foreignKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { userProfiles } from "./user-profile.drizzle";

export const eventTypeEnum = pgEnum("event_type", [
  "meetup",
  "tournament",
  "other",
]);

export const events = pgTable(
  "events",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    title: varchar("title", { length: 150 }).notNull(),
    description: text("description"),
    startTime: timestamp("start_time", { withTimezone: true }).notNull(),
    endTime: timestamp("end_time", { withTimezone: true }).notNull(),
    place: varchar("place", { length: 255 }),
    isOnline: boolean("is_online").notNull().default(false),
    imageUrl: varchar("image_url", { length: 255 }),
    isOfficial: boolean("is_official").notNull().default(false),
    creatorId: bigint("creator_id", { mode: "bigint" }).notNull(),
    minAgeRestriction: integer("min_age_restriction"),
    attendeesCount: integer("attendees_count").notNull().default(0),
    languageId: bigint("language_id", { mode: "bigint" }),
    countryId: bigint("country_id", { mode: "bigint" }),
    cityId: bigint("city_id", { mode: "bigint" }),
    eventType: eventTypeEnum("event_type").notNull(),
  },
  (table) => ({
    creatorIdIndex: index("events_creator_id_idx").on(table.creatorId),
    startTimeIndex: index("events_start_time_idx").on(table.startTime),
    eventTypeIndex: index("events_event_type_idx").on(table.eventType),

    creatorIdFk: foreignKey({
      columns: [table.creatorId],
      foreignColumns: [userProfiles.id],
      name: "fk_events_creator_id",
    }),
  }),
);
