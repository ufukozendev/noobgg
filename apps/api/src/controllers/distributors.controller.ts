import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { distributorsTable } from "../db/schemas/distributors.drizzle";
import { createDistributorSchema, updateDistributorSchema } from "@repo/shared";

export const getAllDistributorsController = async (c: Context) => {
  try {
    const distributors = await db.select().from(distributorsTable);
    return c.json(distributors);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const getDistributorByIdController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

    const distributor = await db
      .select()
      .from(distributorsTable)
      .where(eq(distributorsTable.id, id));
    if (distributor.length === 0)
      return c.json({ error: "Distributor not found" }, 404);
    return c.json(distributor[0]);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const createDistributorController = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = createDistributorSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    const [distributor] = await db
      .insert(distributorsTable)
      .values(result.data)
      .returning();
    return c.json(distributor, 201);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const updateDistributorController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

    const data = await c.req.json();
    const result = updateDistributorSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    if (Object.keys(result.data).length === 0) {
      // Return a specific message if all fields were optional and none were provided,
      // or if provided fields were stripped out by Zod due to not being in the schema.
      return c.json({ error: "No valid fields provided for update" }, 400);
    }

    const [distributor] = await db
      .update(distributorsTable)
      .set(result.data) // Drizzle expects the actual data object for .set()
      .where(eq(distributorsTable.id, id))
      .returning();

    if (!distributor) return c.json({ error: "Distributor not found" }, 404);
    return c.json(distributor);
  } catch (error) {
    // Log the error for server-side inspection if needed
    console.error("Error in updateDistributorController:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const deleteDistributorController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

    const [distributor] = await db
      .delete(distributorsTable)
      .where(eq(distributorsTable.id, id))
      .returning();

    if (!distributor) return c.json({ error: "Distributor not found" }, 404);
    return c.json(distributor);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};
