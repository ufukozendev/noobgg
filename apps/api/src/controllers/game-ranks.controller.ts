import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { gameRanks } from "../db/schemas/game-ranks.drizzle";
import { createGameRankSchema, updateGameRankSchema } from "@repo/shared";

export const getAllGameRanksController = async (c: Context) => {
  try {
    const ranks = await db.select().from(gameRanks);
    return c.json(ranks);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const getGameRankByIdController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

    const rank = await db.select().from(gameRanks).where(eq(gameRanks.id, BigInt(id)));

    if (rank.length === 0) return c.json({ error: "Game rank not found" }, 404);
    return c.json(rank[0]);
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

    const dbData = {
      ...result.data,
      gameId: BigInt(result.data.gameId),
    };

    const [rank] = await db.insert(gameRanks).values(dbData).returning();
    return c.json(rank, 201);
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

    const dbData: any = { ...result.data };
    if (dbData.gameId !== undefined) {
      dbData.gameId = BigInt(dbData.gameId);
    }

    const [rank] = await db
      .update(gameRanks)
      .set(dbData)
      .where(eq(gameRanks.id, BigInt(id)))
      .returning();

    if (!rank) return c.json({ error: "Game rank not found" }, 404);
    return c.json(rank);
  } catch (error) {
    console.error("Error in updateGameRankController:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const deleteGameRankController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

    const [rank] = await db
      .delete(gameRanks)
      .where(eq(gameRanks.id, BigInt(id)))
      .returning();

    if (!rank) return c.json({ error: "Game rank not found" }, 404);
    return c.json(rank);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};
