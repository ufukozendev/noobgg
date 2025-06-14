import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { gamesTable } from "../../db/schemas/games.drizzle";
import { createGameDto, updateGameDto } from "@repo/shared/dto/game.dto";
import { getTranslation } from "../../utils/translation";
import { ApiError } from "../../middleware/errorHandler";
import { convertBigIntToString } from "../../utils/bigint-serializer";
import { generateSnowflakeId } from "../../utils/id-generator";

export const getAllGamesController = async (
  c: Context<{
    Variables: { locale: string; messages: Record<string, string> };
  }>
) => {
  const games = await db
    .select({
      id: gamesTable.id,
      name: gamesTable.name,
      description: gamesTable.description,
      logo: gamesTable.logo,
    })
    .from(gamesTable);
  return c.json(convertBigIntToString(games) as object);
};

export const getGameByIdController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const id = BigInt(idParam);
  const game = await db
    .select()
    .from(gamesTable)
    .where(eq(gamesTable.id, id));
  if (game.length === 0) {
    const errorMessage = getTranslation(c, "game_not_found");
    throw new ApiError(errorMessage, 404);
  }
  return c.json(convertBigIntToString(game[0]) as object);
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
    id: generateSnowflakeId(),
    ...result.data
  };
  const [game] = await db.insert(gamesTable).values(values).returning();
  return c.json(convertBigIntToString(game) as object, 201);
};

export const updateGameController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const id = BigInt(idParam);
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
  return c.json(convertBigIntToString(game) as object);
};

export const deleteGameController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const id = BigInt(idParam);
  const [game] = await db
    .delete(gamesTable)
    .where(eq(gamesTable.id, id))
    .returning();
  if (!game) {
    const errorMessage = getTranslation(c, "game_not_found");
    throw new ApiError(errorMessage, 404);
  }
  return c.json(convertBigIntToString(game) as object);
};
