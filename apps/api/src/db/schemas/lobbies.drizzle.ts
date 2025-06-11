import {
  pgTable,
  bigint,
  integer,
  timestamp,
  varchar,
  text,
  boolean,
  index,
  pgEnum,
  foreignKey,
} from "drizzle-orm/pg-core";
import { gamesTable } from "./games.drizzle";
import { gameModes } from "./game-modes.drizzle";
import { gameRanks } from "./game-ranks.drizzle";
import { gameRegions } from "./game-regions.drizzle";
import { userProfiles } from "./user-profile.drizzle";

export const lobbyTypeEnum = pgEnum("lobby_type", ["public", "private"]);

export const lobbies = pgTable(
  "lobbies",
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    gameId: bigint("game_id", { mode: "bigint" }).notNull(),
    regionId: bigint("region_id", { mode: "bigint" }).notNull(),
    modeId: bigint("mode_id", { mode: "bigint" }).notNull(),
    minTeamSize: integer("min_team_size").notNull(),
    maxTeamSize: integer("max_team_size").notNull(),
    type: lobbyTypeEnum("type").notNull().default("public"),
    minRankId: bigint("min_rank_id", { mode: "bigint" }),
    maxRankId: bigint("max_rank_id", { mode: "bigint" }),
    isMicRequired: boolean("is_mic_required").notNull().default(false),
    creatorId: bigint("creator_id", { mode: "bigint" }).notNull(),
    ownerId: bigint("owner_id", { mode: "bigint" }).notNull(),
    note: text("note"),
    discordLink: varchar("discord_link", { length: 255 }),
    rowVersion: text("row_version").notNull().$defaultFn(() => "0"),
  },
  (table) => ({
    gameIdIndex: index("lobbies_game_id_idx").on(table.gameId),
    regionIdIndex: index("lobbies_region_id_idx").on(table.regionId),
    modeIdIndex: index("lobbies_mode_id_idx").on(table.modeId),
    creatorIdIndex: index("lobbies_creator_id_idx").on(table.creatorId),
    ownerIdIndex: index("lobbies_owner_id_idx").on(table.ownerId),

    gameIdFk: foreignKey({
      columns: [table.gameId],
      foreignColumns: [gamesTable.id],
      name: "fk_lobbies_game_id",
    }),

    regionIdFk: foreignKey({
      columns: [table.regionId],
      foreignColumns: [gameRegions.id],
      name: "fk_lobbies_region_id",
    }),

    modeIdFk: foreignKey({
      columns: [table.modeId],
      foreignColumns: [gameModes.id],
      name: "fk_lobbies_mode_id",
    }),

    minRankIdFk: foreignKey({
      columns: [table.minRankId],
      foreignColumns: [gameRanks.id],
      name: "fk_lobbies_min_rank_id",
    }),

    maxRankIdFk: foreignKey({
      columns: [table.maxRankId],
      foreignColumns: [gameRanks.id],
      name: "fk_lobbies_max_rank_id",
    }),

    creatorIdFk: foreignKey({
      columns: [table.creatorId],
      foreignColumns: [userProfiles.id],
      name: "fk_lobbies_creator_id",
    }),

    ownerIdFk: foreignKey({
      columns: [table.ownerId],
      foreignColumns: [userProfiles.id],
      name: "fk_lobbies_owner_id",
    }),
  }),
);
