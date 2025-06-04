import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { gameRanks } from "../db/schemas/game-ranks.drizzle";

export const getAllGameRanksController = async (c: Context) => {
  const ranks = await db.select().from(gameRanks);
  return c.json(ranks);
};

export const getGameRankByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const rank = await db.select().from(gameRanks).where(eq(gameRanks.id, BigInt(id)));

  if (rank.length === 0) return c.json({ error: "Game rank not found" }, 404);
  return c.json(rank[0]);
};

export const createGameRankController = async (c: Context) => {
  const data = await c.req.json();
  const [rank] = await db.insert(gameRanks).values(data).returning();
  return c.json(rank, 201);
};

export const updateGameRankController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const data = await c.req.json();
  const [rank] = await db
    .update(gameRanks)
    .set(data)
    .where(eq(gameRanks.id, BigInt(id)))
    .returning();

  if (!rank) return c.json({ error: "Game rank not found" }, 404);
  return c.json(rank);
};

export const deleteGameRankController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const [rank] = await db
    .delete(gameRanks)
    .where(eq(gameRanks.id, BigInt(id)))
    .returning();

  if (!rank) return c.json({ error: "Game rank not found" }, 404);
  return c.json(rank);
};
