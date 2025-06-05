import {
  pgTable,
  bigint,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/pg-core";
import { events } from "./events.drizzle";
import { userProfiles } from "./user-profile.drizzle";

export const eventAttendees = pgTable(
  "event_attendees",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    eventId: bigint("event_id", { mode: "bigint" }).notNull(),
    userProfileId: bigint("user_profile_id", { mode: "bigint" }).notNull(),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    eventIdIndex: index("event_attendees_event_id_idx").on(table.eventId),
    userProfileIdIndex: index("event_attendees_user_profile_id_idx").on(
      table.userProfileId,
    ),

    eventIdFk: foreignKey({
      columns: [table.eventId],
      foreignColumns: [events.id],
      name: "fk_event_attendees_event_id",
    }),

    userProfileIdFk: foreignKey({
      columns: [table.userProfileId],
      foreignColumns: [userProfiles.id],
      name: "fk_event_attendees_user_profile_id",
    }),
  }),
);
