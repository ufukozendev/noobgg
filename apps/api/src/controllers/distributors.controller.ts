import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { distributorsTable } from "../db/schemas/distributors.drizzle";

export const getAllDistributorsController = async (c: Context) => {
  const distributors = await db.select().from(distributorsTable);
  return c.json(distributors);
};

export const getDistributorByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const distributor = await db.select().from(distributorsTable).where(eq(distributorsTable.id, id));

  if (distributor.length === 0) return c.json({ error: "Distributor not found" }, 404);
  return c.json(distributor[0]);
};

export const createDistributorController = async (c: Context) => {
  const data = await c.req.json();
  const [distributor] = await db.insert(distributorsTable).values(data).returning();
  return c.json(distributor, 201);
};

export const updateDistributorController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const data = await c.req.json();
  const [distributor] = await db
    .update(distributorsTable)
    .set(data)
    .where(eq(distributorsTable.id, id))
    .returning();

  if (!distributor) return c.json({ error: "Distributor not found" }, 404);
  return c.json(distributor);
};

export const deleteDistributorController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const [distributor] = await db
    .delete(distributorsTable)
    .where(eq(distributorsTable.id, id))
    .returning();

  if (!distributor) return c.json({ error: "Distributor not found" }, 404);
  return c.json(distributor);
};