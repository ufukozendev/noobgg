import {
  pgTable,
  bigint,
  timestamp,
  pgEnum,
  index,
  foreignKey,
} from "drizzle-orm/pg-core";
import { events } from "./events.drizzle";
import { userProfiles } from "./user-profile.drizzle";

export const invitationStatusEnum = pgEnum("invitation_status", [
  "pending",
  "accepted",
  "declined",
]);

export const eventInvitations = pgTable(
  "event_invitations",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    inviterId: bigint("inviter_id", { mode: "bigint" }).notNull(),
    inviteeId: bigint("invitee_id", { mode: "bigint" }).notNull(),
    eventId: bigint("event_id", { mode: "bigint" }).notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
    respondedAt: timestamp("responded_at", { withTimezone: true }),
    status: invitationStatusEnum("status").notNull().default("pending"),
  },
  (table) => ({
    eventIdIndex: index("event_invitations_event_id_idx").on(table.eventId),
    inviterIdIndex: index("event_invitations_inviter_id_idx").on(
      table.inviterId,
    ),
    inviteeIdIndex: index("event_invitations_invitee_id_idx").on(
      table.inviteeId,
    ),

    eventIdFk: foreignKey({
      columns: [table.eventId],
      foreignColumns: [events.id],
      name: "fk_event_invitations_event_id",
    }),
    inviterIdFk: foreignKey({
      columns: [table.inviterId],
      foreignColumns: [userProfiles.id],
      name: "fk_event_invitations_inviter_id",
    }),
    inviteeIdFk: foreignKey({
      columns: [table.inviteeId],
      foreignColumns: [userProfiles.id],
      name: "fk_event_invitations_invitee_id",
    }),
  }),
);
