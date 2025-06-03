import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { distributorsTable } from "../db/schemas/distributors.drizzle";

export const getAllDistributorsController = async (c: Context) => {  try {
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

    const distributor = await db.select().from(distributorsTable).where(eq(distributorsTable.id, id));    if (distributor.length === 0) return c.json({ error: "Distributor not found" }, 404);
    return c.json(distributor[0]);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const createDistributorController = async (c: Context) => {
  try {
    const data = await c.req.json();
    

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      return c.json({ error: "Name is required and must be a non-empty string" }, 400);
    }
    
    if (data.name.length > 255) {
      return c.json({ error: "Name must be 255 characters or less" }, 400);
    }


    if (data.website && (typeof data.website !== 'string' || data.website.length > 255)) {
      return c.json({ error: "Website must be a string with 255 characters or less" }, 400);
    }

    if (data.logo && (typeof data.logo !== 'string' || data.logo.length > 255)) {
      return c.json({ error: "Logo must be a string with 255 characters or less" }, 400);
    }

    if (data.description && typeof data.description !== 'string') {
      return c.json({ error: "Description must be a string" }, 400);
    }   
    const [distributor] = await db.insert(distributorsTable).values(data).returning();
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
    

    if (!data || Object.keys(data).length === 0) {
      return c.json({ error: "No data provided" }, 400);
    }


    if (data.name !== undefined) {
      if (typeof data.name !== 'string' || data.name.trim().length === 0) {
        return c.json({ error: "Name must be a non-empty string" }, 400);
      }
      if (data.name.length > 255) {
        return c.json({ error: "Name must be 255 characters or less" }, 400);
      }
    }

    if (data.website !== undefined && data.website !== null) {
      if (typeof data.website !== 'string') {
        return c.json({ error: "Website must be a string" }, 400);
      }
      if (data.website.length > 255) {
        return c.json({ error: "Website must be 255 characters or less" }, 400);
      }
    }

    if (data.logo !== undefined && data.logo !== null) {
      if (typeof data.logo !== 'string') {
        return c.json({ error: "Logo must be a string" }, 400);
      }
      if (data.logo.length > 255) {
        return c.json({ error: "Logo must be 255 characters or less" }, 400);
      }
    }

    if (data.description !== undefined && data.description !== null) {
      if (typeof data.description !== 'string') {
        return c.json({ error: "Description must be a string" }, 400);
      }
    }

    const [distributor] = await db
      .update(distributorsTable)
      .set(data)
      .where(eq(distributorsTable.id, id))
      .returning();    if (!distributor) return c.json({ error: "Distributor not found" }, 404);
    return c.json(distributor);
  } catch (error) {
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
      .returning();    if (!distributor) return c.json({ error: "Distributor not found" }, 404);
    return c.json(distributor);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};