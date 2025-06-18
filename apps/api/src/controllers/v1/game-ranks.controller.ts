import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { gameRanks } from "../../db/schemas/game-ranks.drizzle";
import {
  createGameRankDto,
  updateGameRankDto,
} from "@repo/shared/dto/game-rank.dto";
import { ApiError } from "../../middleware/errorHandler";
import { getTranslation } from "../../utils/translation";


export const getAllGameRanksController = async (c: Context) => {
  const ranks = await db.select().from(gameRanks);
  return c.json(ranks);
};

export const getGameRankByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError("Invalid id", 400);
  }
  const rank = await db.select().from(gameRanks).where(eq(gameRanks.id, id));
  if (rank.length === 0)
    throw new ApiError(getTranslation(c, "game_rank_not_found"), 404);
  return c.json(rank[0]);
};

export const createGameRankController = async (c: Context) => {
  const data = await c.req.json();
  const result = createGameRankDto.safeParse(data);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }

  // Filter out undefined values and prepare the insert values
  const values: any = {};

  // Required fields
  if (result.data.name !== undefined) values.name = result.data.name;
  if (result.data.gameId !== undefined) values.gameId = result.data.gameId;
  if (result.data.image !== undefined) values.image = result.data.image;
  if (result.data.order !== undefined) values.order = result.data.order;

  const [rank] = await db.insert(gameRanks).values(values).returning();
  return c.json(
    {
      success: true,
      message: getTranslation(c, "game_rank_created_successfully"),
      data: rank,
    },
    201
  );
};

export const updateGameRankController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError("Invalid id", 400);
  }
  const data = await c.req.json();
  const result = updateGameRankDto.safeParse(data);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  if (Object.keys(result.data).length === 0) {
    throw new ApiError(getTranslation(c, "validation_noFields"), 400);
  }
  const values = {
    ...result.data,
  };
  const [rank] = await db
    .update(gameRanks)
    .set(values)
    .where(eq(gameRanks.id, id))
    .returning();
  if (!rank) throw new ApiError(getTranslation(c, "game_rank_not_found"), 404);
  return c.json(
    {
      success: true,
      message: getTranslation(c, "game_rank_updated_successfully"),
      data: rank,
    },
    200
  );
};

export const deleteGameRankController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(getTranslation(c, "game_rank_invalid_id"), 400);
  }
  const [rank] = await db
    .delete(gameRanks)
    .where(eq(gameRanks.id, id))
    .returning();
  if (!rank) throw new ApiError(getTranslation(c, "game_rank_not_found"), 404);
  return c.json(
    {
      success: true,
      message: getTranslation(c, "game_rank_deleted_successfully"),
    },
    200
  );
};
