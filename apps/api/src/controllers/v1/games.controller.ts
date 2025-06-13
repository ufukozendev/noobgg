import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { gamesTable } from "../../db/schemas/games.drizzle";
import { createGameDto, updateGameDto } from "@repo/shared/dto/game.dto";
import { getTranslation } from "../../utils/translation";
import { ApiError } from "../../middleware/errorHandler";

export const getAllGamesController = async (
  c: Context<{
    Variables: { locale: string; messages: Record<string, string> };
  }>
) => {
  const games = await db.select().from(gamesTable);
  return c.json(games);
};

export const getGameByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const game = await db
    .select()
    .from(gamesTable)
    .where(eq(gamesTable.id, id));
  if (game.length === 0) {
    const errorMessage = getTranslation(c, "game_not_found");
    throw new ApiError(errorMessage, 404);
  }
  return c.json(game[0]);
};

export const createGameController = async (c: Context) => {
  const data = await c.req.json();
  const result = createGameDto.safeParse(data);
  if (!result.success) {
    const errorMessage = getTranslation(c, "validation_required");
    throw new ApiError(
      JSON.stringify(result.error.flatten().fieldErrors || errorMessage),
      400
    );
  }
  const values = {
    ...result.data,
    createdAt: result.data.createdAt ? new Date(result.data.createdAt) : undefined,
    updatedAt: result.data.updatedAt ? new Date(result.data.updatedAt) : undefined,
    deletedAt: result.data.deletedAt ? new Date(result.data.deletedAt) : undefined,
  };
  const [game] = await db.insert(gamesTable).values(values).returning();
  return c.json(game, 201);
};

export const updateGameController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const data = await c.req.json();
  const result = updateGameDto.safeParse(data);
  if (!result.success) {
    const errorMessage = getTranslation(c, "validation_required");
    throw new ApiError(
      JSON.stringify(result.error.flatten().fieldErrors || errorMessage),
      400
    );
  }
  if (Object.keys(result.data).length === 0) {
    const errorMessage = getTranslation(c, "validation_required");
    throw new ApiError(errorMessage, 400);
  }
  const values = {
    ...result.data,
    createdAt: result.data.createdAt ? new Date(result.data.createdAt) : undefined,
    updatedAt: result.data.updatedAt ? new Date(result.data.updatedAt) : undefined,
    deletedAt: result.data.deletedAt ? new Date(result.data.deletedAt) : undefined,
  };
  const [game] = await db
    .update(gamesTable)
    .set(values)
    .where(eq(gamesTable.id, id))
    .returning();
  if (!game) {
    const errorMessage = getTranslation(c, "game_not_found");
    throw new ApiError(errorMessage, 404);
  }
  return c.json(game);
};

export const deleteGameController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const [game] = await db
    .delete(gamesTable)
    .where(eq(gamesTable.id, id))
    .returning();
  if (!game) {
    const errorMessage = getTranslation(c, "game_not_found");
    throw new ApiError(errorMessage, 404);
  }
  return c.json(game);
};
