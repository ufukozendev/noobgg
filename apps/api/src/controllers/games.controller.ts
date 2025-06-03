import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { gamesTable } from "../db/schemas/games.drizzle";

export const getAllGamesController = async (c: Context) => {
  const games = await db.select().from(gamesTable);
  return c.json(games);
};

export const getGameByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const game = await db.select().from(gamesTable).where(eq(gamesTable.id, id));

  if (game.length === 0) return c.json({ error: "Game not found" }, 404);
  return c.json(game[0]);
};

export const createGameController = async (c: Context) => {
  const data = await c.req.json();
  const [game] = await db.insert(gamesTable).values(data).returning();
  return c.json(game, 201);
};

export const updateGameController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const data = await c.req.json();
  const [game] = await db
    .update(gamesTable)
    .set(data)
    .where(eq(gamesTable.id, id))
    .returning();

  if (!game) return c.json({ error: "Game not found" }, 404);
  return c.json(game);
};

export const deleteGameController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (Number.isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const [game] = await db
    .delete(gamesTable)
    .where(eq(gamesTable.id, id))
    .returning();

  if (!game) return c.json({ error: "Game not found" }, 404);
  return c.json(game);
};
