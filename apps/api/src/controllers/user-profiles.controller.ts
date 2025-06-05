import { Context } from "hono";
import { eq, isNull, or, and } from "drizzle-orm";
import { db } from "../db";
import { userProfiles } from "../db/schemas/user-profile.drizzle";
import { createUserProfileSchema, updateUserProfileSchema } from "@repo/shared";
import { BaseService } from "../services/base.service";
import { extractPaginationParams } from "../utils/pagination";

// Create service instance
const userProfilesService = new BaseService(userProfiles);

export const getAllUserProfilesController = async (c: Context) => {
  try {
    const params = extractPaginationParams(c);
    // BaseService already handles soft-delete filtering by default
    const result = await userProfilesService.findAllPaginated(params);
    return c.json(result);
  } catch (error) {
    console.error("Error in getAllUserProfilesController:", error);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
};

export const getUserProfileByUsernameController = async (c: Context) => {
  try {
    const username = c.req.param("username");
    if (!username || username.trim().length === 0) {
      return c.json({ error: "Invalid username" }, 400);
    }

    const result = await db
      .select()
      .from(userProfiles)
      .where(and(
        eq(userProfiles.userName, username.trim()),
        isNull(userProfiles.deletedAt)
      ));

    if (result.length === 0) {
      return c.json({ error: "User profile not found" }, 404);
    }

    return c.json(result[0]);
  } catch (error) {
    console.error("Error in getUserProfileByUsernameController:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

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
      .where(and(
        eq(userProfiles.id, id),
        isNull(userProfiles.deletedAt)
      ));

    if (result.length === 0) {
      return c.json({ error: "User profile not found" }, 404);
    }

    return c.json(result[0]);
  } catch (error) {
    console.error("Error in getUserProfileController:", error);
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

    // Check for both duplicates in a single query
    const existing = await db
      .select()
      .from(userProfiles)
      .where(or(
        eq(userProfiles.userKeycloakId, result.data.userKeycloakId),
        eq(userProfiles.userName, result.data.userName)
      ));

    if (existing.length > 0) {
      const existingKeycloak = existing.find(u => u.userKeycloakId === result.data.userKeycloakId);
      const existingUsername = existing.find(u => u.userName === result.data.userName);

      if (existingKeycloak) {
        return c.json({ error: "User with this Keycloak ID already exists" }, 409);
      }
      if (existingUsername) {
        return c.json({ error: "Username already exists" }, 409);
      }
    }

    const [userProfile] = await db
      .insert(userProfiles)
      .values({
        ...result.data,
        birthDate: result.data.birthDate ? new Date(result.data.birthDate) : null,
      })
      .returning();

    return c.json(userProfile, 201);
  } catch (error) {
    console.error("Error in createUserProfileController:", error);
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

      // Make sure it's not the same user (convert BigInt to string for comparison)
      if (existingByUsername.length > 0 && existingByUsername[0].id.toString() !== id.toString()) {
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
  } catch (error) {
    console.error("Error in updateUserProfileController:", error);
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
  } catch (error) {
    console.error("Error in deleteUserProfileController:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};