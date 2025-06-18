import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { platforms } from "../../db/schemas/platforms.drizzle";
import {
  createPlatformDto,
  updatePlatformDto,
} from "@repo/shared/dto/platform.dto";
import { convertBigIntToNumber } from "../../utils/bigint-serializer";
import { ApiError } from "../../middleware/errorHandler";
import { getTranslation } from "../../utils/translation";
export const getAllPlatformsController = async (c: Context) => {
  const result = await db.select().from(platforms);
  return c.json(convertBigIntToNumber(result) as unknown[]);
};

export const getPlatformByIdController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    throw new ApiError(getTranslation(c, "validation_invalidId"), 400);
  }
  const id = BigInt(idParam);
  const result = await db.select().from(platforms).where(eq(platforms.id, id));
  if (result.length === 0)
    throw new ApiError(getTranslation(c, "platform_not_found"), 404);
  return c.json(convertBigIntToNumber(result[0]) as Record<string, unknown>);
};

export const createPlatformController = async (c: Context) => {
  const data = await c.req.json();
  const result = createPlatformDto.safeParse(data);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  const values = {
    ...result.data,
  };
  const [platform] = await db.insert(platforms).values(values).returning();
  return c.json(
    {
      success: true,
      message: getTranslation(c, "platform_created_successfully"),
      data: convertBigIntToNumber(platform) as Record<string, unknown>,
    },
    201
  );
};

export const updatePlatformController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    throw new ApiError("Invalid id", 400);
  }
  const id = BigInt(idParam);
  const data = await c.req.json();
  const result = updatePlatformDto.safeParse(data);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  if (Object.keys(result.data).length === 0) {
    throw new ApiError(getTranslation(c, "no_data_provided"), 400);
  }
  const values = {
    ...result.data,
  };
  const [platform] = await db
    .update(platforms)
    .set(values)
    .where(eq(platforms.id, id))
    .returning();
  if (!platform) throw new ApiError("Platform not found", 404);
  return c.json(
    {
      success: true,
      message: getTranslation(c, "platform_updated_successfully"),
      data: convertBigIntToNumber(platform) as Record<string, unknown>,
    },
    201
  );
};

export const deletePlatformController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    throw new ApiError("Invalid id", 400);
  }
  const id = BigInt(idParam);
  const [platform] = await db
    .delete(platforms)
    .where(eq(platforms.id, id))
    .returning();
  if (!platform)
    throw new ApiError(getTranslation(c, "platform_not_found"), 404);
  return c.json(
    {
      success: true,
      message: getTranslation(c, "platform_deleted_successfully"),
      data: convertBigIntToNumber(platform) as Record<string, unknown>,
    },
    200
  );
};
