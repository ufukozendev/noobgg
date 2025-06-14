// v1: lobbies controller (boş şablon)

import { createLobbyDto, updateLobbyDto } from "@repo/shared/dto/lobby.dto";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import { db } from "../../db";
import { lobbies } from "../../db/schemas/lobbies.drizzle";
import { ApiError } from "../../middleware/errorHandler";
import { convertBigIntToNumber } from "../../utils/bigint-serializer";

export const getAllLobbiesController = async (c: Context) => {
  const result = await db.select().from(lobbies);
  return c.json(convertBigIntToNumber(result) as unknown[]);
};

export const getLobbyByIdController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    throw new ApiError("Invalid id", 400);
  }
  const id = BigInt(idParam);
  const result = await db
    .select()
    .from(lobbies)
    .where(eq(lobbies.id, id));
  if (result.length === 0)
    throw new ApiError("Lobby not found", 404);
  return c.json(convertBigIntToNumber(result[0]) as Record<string, unknown>);
};

export const createLobbyController = async (c: Context) => {
  const data = await c.req.json();
  const result = createLobbyDto.safeParse(data);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  const values = {
    ...result.data,
    gameId: BigInt(result.data.gameId),
    regionId: BigInt(result.data.regionId),
    modeId: BigInt(result.data.modeId),
    minRankId: result.data.minRankId ? BigInt(result.data.minRankId) : undefined,
    maxRankId: result.data.maxRankId ? BigInt(result.data.maxRankId) : undefined,
    creatorId: BigInt(result.data.creatorId),
    ownerId: BigInt(result.data.ownerId),
    createdAt: result.data.createdAt ? new Date(result.data.createdAt) : undefined,
    updatedAt: result.data.updatedAt ? new Date(result.data.updatedAt) : undefined,
    deletedAt: result.data.deletedAt ? new Date(result.data.deletedAt) : undefined,
  };
  const [lobby] = await db
    .insert(lobbies)
    .values(values)
    .returning();
  return c.json(convertBigIntToNumber(lobby) as Record<string, unknown>, 201);
};

export const updateLobbyController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    throw new ApiError("Invalid id", 400);
  }
  const id = BigInt(idParam);
  const data = await c.req.json();
  const result = updateLobbyDto.safeParse(data);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  if (Object.keys(result.data).length === 0) {
    throw new ApiError("No data provided", 400);
  }
  const values = {
    ...result.data,
    gameId: result.data.gameId ? BigInt(result.data.gameId) : undefined,
    regionId: result.data.regionId ? BigInt(result.data.regionId) : undefined,
    modeId: result.data.modeId ? BigInt(result.data.modeId) : undefined,
    minRankId: result.data.minRankId ? BigInt(result.data.minRankId) : undefined,
    maxRankId: result.data.maxRankId ? BigInt(result.data.maxRankId) : undefined,
    creatorId: result.data.creatorId ? BigInt(result.data.creatorId) : undefined,
    ownerId: result.data.ownerId ? BigInt(result.data.ownerId) : undefined,
    createdAt: result.data.createdAt ? new Date(result.data.createdAt) : undefined,
    updatedAt: result.data.updatedAt ? new Date(result.data.updatedAt) : undefined,
    deletedAt: result.data.deletedAt ? new Date(result.data.deletedAt) : undefined,
  };
  const [lobby] = await db
    .update(lobbies)
    .set(values)
    .where(eq(lobbies.id, id))
    .returning();
  if (!lobby) throw new ApiError("Lobby not found", 404);
  return c.json(convertBigIntToNumber(lobby) as Record<string, unknown>);
};

export const deleteLobbyController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    throw new ApiError("Invalid id", 400);
  }
  const id = BigInt(idParam);
  const [lobby] = await db
    .delete(lobbies)
    .where(eq(lobbies.id, id))
    .returning();
  if (!lobby) throw new ApiError("Lobby not found", 404);
  return c.json(convertBigIntToNumber(lobby) as Record<string, unknown>);
};
