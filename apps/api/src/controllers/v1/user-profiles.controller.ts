import { Context } from "hono";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { userProfiles } from "../../db/schemas/user-profile.drizzle";
import { createUserProfileSchema, updateUserProfileSchema } from "@repo/shared";

function convertBigIntToString(obj: any): any {
  if (typeof obj === "bigint") {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }
  if (obj !== null && typeof obj === "object") {
    const converted: any = {};
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertBigIntToString(value);
    }
    return converted;
  }
  return obj;
}

export const getUserProfile = async (c: Context) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam || !/^\d+$/.test(idParam)) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const id = BigInt(idParam);
    const [user] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, id));
    if (!user) return c.json({ error: "User not found" }, 404);
    const safeUser = convertBigIntToString(user);
    return c.json(safeUser);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const createUserProfile = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = createUserProfileSchema.safeParse(data);
    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }
    const user = await db.transaction(async (tx) => {
      const [isKeycloakUserExists] = await tx
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.userKeycloakId, result.data.userKeycloakId));
      if (isKeycloakUserExists) throw new Error("Keycloak ID already exists");

      const [isUsernameTaken] = await tx
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.userName, result.data.userName));
      if (isUsernameTaken) throw new Error("Username already exists");

      const [newUser] = await tx
        .insert(userProfiles)
        .values({
          ...result.data,
          createdAt: new Date(),
        })
        .returning();
      return newUser;
    });
    const safeUser = convertBigIntToString(user);
    return c.json(safeUser, 201);
  } catch (error) {
    if (error instanceof Error && error.message.includes("already exists")) {
      return c.json({ error: error.message }, 409);
    }
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const updateUserProfile = async (c: Context) => {
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

    if (result.data.userKeycloakId) {
      const [existing] = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.userKeycloakId, result.data.userKeycloakId));
      if (existing && existing.id !== id) {
        return c.json({ error: "Keycloak ID already exists" }, 409);
      }
    }

    if (result.data.userName) {
      const [existing] = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.userName, result.data.userName));
      if (existing && existing.id !== id) {
        return c.json({ error: "Username already exists" }, 409);
      }
    }

    const [user] = await db
      .update(userProfiles)
      .set({
        ...result.data,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, id))
      .returning();
    if (!user) return c.json({ error: "User not found" }, 404);
    const safeUser = convertBigIntToString(user);
    return c.json(safeUser);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const deleteUserProfile = async (c: Context) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam || !/^\d+$/.test(idParam)) {
      return c.json({ error: "Invalid id" }, 400);
    }
    const id = BigInt(idParam);
    const [user] = await db
      .update(userProfiles)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.id, id))
      .returning();
    if (!user) return c.json({ error: "User not found" }, 404);
    const safeUser = convertBigIntToString(user);
    return c.json(safeUser);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};
