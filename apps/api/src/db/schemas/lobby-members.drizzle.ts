import { pgTable, bigint, timestamp, boolean, index, foreignKey } from "drizzle-orm/pg-core";
import { lobbies } from "./lobbies.drizzle";
import { userProfiles } from "./user-profile.drizzle";

export const lobbyMembers = pgTable(
  "lobby_members",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    lobbyId: bigint("lobby_id", { mode: "bigint" }).notNull(),
    memberId: bigint("member_id", { mode: "bigint" }).notNull(),
    isAdmin: boolean("is_admin").notNull().default(false),
  },
  (table) => ({
    lobbyIdIndex: index("lobby_members_lobby_id_idx").on(table.lobbyId),
    memberIdIndex: index("lobby_members_member_id_idx").on(table.memberId),

    lobbyIdFk: foreignKey({
      columns: [table.lobbyId],
      foreignColumns: [lobbies.id],
      name: "fk_lobby_members_lobby_id",
    }),

    memberIdFk: foreignKey({
      columns: [table.memberId],
      foreignColumns: [userProfiles.id],
      name: "fk_lobby_members_member_id",
    }),
  }),
);
