import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { gameRanks } from "../../db/schemas/game-ranks.drizzle";
import { createGameRankDto, updateGameRankDto } from "@repo/shared/dto/game-rank.dto";
import { ApiError } from "../../middleware/errorHandler";

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
  if (rank.length === 0) throw new ApiError("Game rank not found", 404);
  return c.json(rank[0]);
};

export const createGameRankController = async (c: Context) => {
  const data = await c.req.json();
  const result = createGameRankDto.safeParse(data);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  const values = {
    ...result.data,
    createdAt: result.data.createdAt ? new Date(result.data.createdAt) : undefined,
    updatedAt: result.data.updatedAt ? new Date(result.data.updatedAt) : undefined,
    deletedAt: result.data.deletedAt ? new Date(result.data.deletedAt) : undefined,
  };
  const [rank] = await db.insert(gameRanks).values(values).returning();
  return c.json(rank, 201);
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
    throw new ApiError("No valid fields provided for update", 400);
  }
  const values = {
    ...result.data,
    createdAt: result.data.createdAt ? new Date(result.data.createdAt) : undefined,
    updatedAt: result.data.updatedAt ? new Date(result.data.updatedAt) : undefined,
    deletedAt: result.data.deletedAt ? new Date(result.data.deletedAt) : undefined,
  };
  const [rank] = await db
    .update(gameRanks)
    .set(values)
    .where(eq(gameRanks.id, id))
    .returning();
  if (!rank) throw new ApiError("Game rank not found", 404);
  return c.json(rank);
};

export const deleteGameRankController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError("Invalid id", 400);
  }
  const [rank] = await db
    .delete(gameRanks)
    .where(eq(gameRanks.id, id))
    .returning();
  if (!rank) throw new ApiError("Game rank not found", 404);
  return c.json(rank);
};
