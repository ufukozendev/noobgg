import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { gameRanks } from "../db/schemas/game-ranks.drizzle";
import { createGameRankSchema, updateGameRankSchema } from "../lib/zod-schemas/game-ranks";

export const getAllGameRanksController = async (c: Context) => {
  try {
    const gameRanksList = await db.select().from(gameRanks);
    return c.json(gameRanksList);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const getGameRankByIdController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

    const gameRank = await db.select().from(gameRanks).where(eq(gameRanks.id, id));
    if (gameRank.length === 0) return c.json({ error: "Game rank not found" }, 404);
    return c.json(gameRank[0]);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const createGameRankController = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = createGameRankSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    const [gameRank] = await db.insert(gameRanks).values(result.data).returning();
    return c.json(gameRank, 201);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const updateGameRankController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

    const data = await c.req.json();
    const result = updateGameRankSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    if (Object.keys(result.data).length === 0) {
      return c.json({ error: "No valid fields provided for update" }, 400);
    }

    const [gameRank] = await db
      .update(gameRanks)
      .set(result.data)
      .where(eq(gameRanks.id, id))
      .returning();

    if (!gameRank) return c.json({ error: "Game rank not found" }, 404);
    return c.json(gameRank);
  } catch (error) {
    console.error("Error in updateGameRankController:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const deleteGameRankController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

    const [gameRank] = await db
      .delete(gameRanks)
      .where(eq(gameRanks.id, id))
      .returning();

    if (!gameRank) return c.json({ error: "Game rank not found" }, 404);
    return c.json(gameRank);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};