import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { gameModes } from "../../db/schemas/game-modes.drizzle";
import { createGameModeDto, updateGameModeDto } from "@repo/shared/dto/game-mode.dto";
import { getTranslation } from "../../utils/translation";
import { ApiError } from "../../middleware/errorHandler";
import { convertBigIntToString } from "../../utils/bigint-serializer";
import { generateSnowflakeId } from "../../utils/id-generator";

export const getAllGameModesController = async (
  c: Context<{
    Variables: { locale: string; messages: Record<string, string> };
  }>
) => {
  const gameModesData = await db
    .select({
      id: gameModes.id,
      name: gameModes.name,
      description: gameModes.description,
      order: gameModes.order,
      gameId: gameModes.gameId,
      minTeamSize: gameModes.minTeamSize,
      maxTeamSize: gameModes.maxTeamSize,
    })
    .from(gameModes);
  return c.json(convertBigIntToString(gameModesData) as object);
};

export const getGameModeByIdController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const id = BigInt(idParam);
  const gameMode = await db
    .select()
    .from(gameModes)
    .where(eq(gameModes.id, id));
  if (gameMode.length === 0) {
    const errorMessage = getTranslation(c, "game_mode_not_found");
    throw new ApiError(errorMessage, 404);
  }
  return c.json(convertBigIntToString(gameMode[0]) as object);
};

export const createGameModeController = async (c: Context) => {
  const data = await c.req.json();
  const result = createGameModeDto.safeParse(data);
  if (!result.success) {
    const errorMessage = getTranslation(c, "validation_required");
    throw new ApiError(
      JSON.stringify(result.error.flatten().fieldErrors || errorMessage),
      400
    );
  }
  
  // Convert gameId to BigInt if it's a string
  const gameId = typeof result.data.gameId === 'string' 
    ? BigInt(result.data.gameId) 
    : BigInt(result.data.gameId);
  
  const values = {
    id: generateSnowflakeId(),
    ...result.data,
    gameId,
  };
  const [gameMode] = await db.insert(gameModes).values(values).returning();
  return c.json(convertBigIntToString(gameMode) as object, 201);
};

export const updateGameModeController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const id = BigInt(idParam);
  const data = await c.req.json();
  const result = updateGameModeDto.safeParse(data);
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
  
  // Convert gameId to BigInt if it's provided and is a string
  type UpdateGameModeValues = Omit<typeof result.data, 'gameId'> & {
    gameId?: bigint;
  };
  
  const values: UpdateGameModeValues = { ...result.data };
  if (result.data.gameId !== undefined) {
    values.gameId = typeof result.data.gameId === 'string' 
      ? BigInt(result.data.gameId) 
      : BigInt(result.data.gameId);
  }
  
  const [gameMode] = await db
    .update(gameModes)
    .set(values)
    .where(eq(gameModes.id, id))
    .returning();
  if (!gameMode) {
    const errorMessage = getTranslation(c, "game_mode_not_found");
    throw new ApiError(errorMessage, 404);
  }
  return c.json(convertBigIntToString(gameMode) as object);
};

export const deleteGameModeController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const id = BigInt(idParam);
  const [gameMode] = await db
    .delete(gameModes)
    .where(eq(gameModes.id, id))
    .returning();
  if (!gameMode) {
    const errorMessage = getTranslation(c, "game_mode_not_found");
    throw new ApiError(errorMessage, 404);
  }
  return c.json(convertBigIntToString(gameMode) as object);
};
