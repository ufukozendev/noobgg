import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { userProfiles } from "../db/schemas/user-profile.drizzle";
import { createUserProfileSchema, updateUserProfileSchema } from "@repo/shared";

export const getUserProfileController = async (c: Context) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam || !/^\d+$/.test(idParam)) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const id = BigInt(idParam);

    const result = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, id));

    if (result.length === 0) {
      return c.json({ error: "User profile not found" }, 404);
    }

    return c.json(result[0]);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const createUserProfileController = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = createUserProfileSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    // Check if userKeycloakId already exists
    const existingByKeycloakId = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userKeycloakId, result.data.userKeycloakId));

    if (existingByKeycloakId.length > 0) {
      return c.json({ error: "User with this Keycloak ID already exists" }, 409);
    }

    // Check if userName already exists
    const existingByUsername = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userName, result.data.userName));

    if (existingByUsername.length > 0) {
      return c.json({ error: "Username already exists" }, 409);
    }

    const [userProfile] = await db
      .insert(userProfiles)
      .values({
        ...result.data,
        birthDate: result.data.birthDate ? new Date(result.data.birthDate) : null,
      })
      .returning();

    return c.json(userProfile, 201);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const updateUserProfileController = async (c: Context) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam || !/^\d+$/.test(idParam)) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const id = BigInt(idParam);

    const data = await c.req.json();
    const result = updateUserProfileSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    if (Object.keys(result.data).length === 0) {
      return c.json({ error: "No data provided" }, 400);
    }

    // Check if userName already exists (if being updated)
    if (result.data.userName) {
      const existingByUsername = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.userName, result.data.userName));

      // Make sure it's not the same user
      if (existingByUsername.length > 0 && existingByUsername[0].id !== id) {
        return c.json({ error: "Username already exists" }, 409);
      }
    }

    const updateData = {
      ...result.data,
      birthDate: result.data.birthDate ? new Date(result.data.birthDate) : undefined,
      updatedAt: new Date(),
    };

    const [userProfile] = await db
      .update(userProfiles)
      .set(updateData)
      .where(eq(userProfiles.id, id))
      .returning();

    if (!userProfile) {
      return c.json({ error: "User profile not found" }, 404);
    }

    return c.json(userProfile);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const deleteUserProfileController = async (c: Context) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam || !/^\d+$/.test(idParam)) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const id = BigInt(idParam);

    // Soft delete - set deletedAt timestamp
    const [userProfile] = await db
      .update(userProfiles)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, id))
      .returning();

    if (!userProfile) {
      return c.json({ error: "User profile not found" }, 404);
    }

    return c.json(userProfile);
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
};