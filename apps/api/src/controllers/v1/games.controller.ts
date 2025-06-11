import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { gamesTable } from "../../db/schemas/games.drizzle";
import {
  createGameSchema,
  updateGameSchema
} from "@repo/shared";

export const getAllGamesController = async (c: Context) => {
  try {
    const games = await db.select().from(gamesTable);
    return c.json(games);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const getGameByIdController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const game = await db.select().from(gamesTable).where(eq(gamesTable.id, id));
    if (game.length === 0) return c.json({ error: "Game not found" }, 404);
    return c.json(game[0]);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const createGameController = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = createGameSchema.safeParse(data);
    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }
    const [game] = await db.insert(gamesTable).values(result.data).returning();
    return c.json(game, 201);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const updateGameController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const data = await c.req.json();
    const result = updateGameSchema.safeParse(data);
    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }
    if (Object.keys(result.data).length === 0) {
      return c.json({ error: "No valid fields provided for update" }, 400);
    }
    const [game] = await db
      .update(gamesTable)
      .set(result.data)
      .where(eq(gamesTable.id, id))
      .returning();
    if (!game) return c.json({ error: "Game not found" }, 404);
    return c.json(game);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const deleteGameController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const [game] = await db
      .delete(gamesTable)
      .where(eq(gamesTable.id, id))
      .returning();
    if (!game) return c.json({ error: "Game not found" }, 404);
    return c.json(game);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};
