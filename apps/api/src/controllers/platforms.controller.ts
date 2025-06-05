import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { platforms } from "../db/schemas/platforms.drizzle";
import { createPlatformSchema, updatePlatformSchema } from "@repo/shared";

export const getAllPlatformsController = async (c: Context) => {
  try {
    const result = await db.select().from(platforms);
    return c.json(result);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const getPlatformByIdController = async (c: Context) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam || !/^\d+$/.test(idParam)) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const id = BigInt(idParam);

    const result = await db
      .select()
      .from(platforms)
      .where(eq(platforms.id, id));
    if (result.length === 0)
      return c.json({ error: "Platform not found" }, 404);
    return c.json(result[0]);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const createPlatformController = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = createPlatformSchema.safeParse(data);
    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    const [platform] = await db
      .insert(platforms)
      .values(result.data)
      .returning();
    return c.json(platform, 201);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const updatePlatformController = async (c: Context) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam || !/^\d+$/.test(idParam)) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const id = BigInt(idParam);

    const data = await c.req.json();
    const result = updatePlatformSchema.safeParse(data);
    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }
    if (Object.keys(result.data).length === 0) {
      return c.json({ error: "No data provided" }, 400);
    }

    const [platform] = await db
      .update(platforms)
      .set(result.data)
      .where(eq(platforms.id, id))
      .returning();

    if (!platform) return c.json({ error: "Platform not found" }, 404);
    return c.json(platform);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const deletePlatformController = async (c: Context) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam || !/^\d+$/.test(idParam)) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const id = BigInt(idParam);

    const [platform] = await db
      .delete(platforms)
      .where(eq(platforms.id, id))
      .returning();

    if (!platform) return c.json({ error: "Platform not found" }, 404);
    return c.json(platform);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
};
