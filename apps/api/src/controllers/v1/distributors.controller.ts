import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { distributorsTable } from "../../db/schemas/distributors.drizzle";
import { ApiError } from "../../middleware/errorHandler";
import {
  createDistributorDto,
  updateDistributorDto,
} from "@repo/shared/dto/distributor.dto";
import { getTranslation } from "src/utils/translation";
export const getAllDistributorsController = async (c: Context) => {
  const distributors = await db.select().from(distributorsTable);
  return c.json(distributors);
};

export const getDistributorByIdController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(getTranslation(c, "validation_invalidId"), 400);
  }
  const distributor = await db
    .select()
    .from(distributorsTable)
    .where(eq(distributorsTable.id, BigInt(id)));
  if (distributor.length === 0)
    throw new ApiError(getTranslation(c, "distributor_not_found"), 404);
  return c.json(distributor[0]);
};

export const createDistributorController = async (c: Context) => {
  const data = await c.req.json();

  const result = createDistributorDto.safeParse(data);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  const values = {
    ...result.data,
  };
  const [distributor] = await db
    .insert(distributorsTable)
    .values(values)
    .returning();
  return c.json(
    {
      success: true,
      message: getTranslation(c, "distributor_created_successfully"),
      data: distributor,
    },
    201
  );
};

export const updateDistributorController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(getTranslation(c, "validation_invalidId"), 400);
  }
  const data = await c.req.json();
  const result = updateDistributorDto.safeParse(data);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  if (Object.keys(result.data).length === 0) {
    throw new ApiError(getTranslation(c, "validation_noFields"), 400);
  }
  const values = {
    ...result.data,
  };
  const [distributor] = await db
    .update(distributorsTable)
    .set(values)
    .where(eq(distributorsTable.id, BigInt(id)))
    .returning();
  if (!distributor)
    throw new ApiError(getTranslation(c, "distributor_not_found"), 404);
  return c.json(
    {
      success: true,
      message: getTranslation(c, "distributor_updated_successfully"),
      data: distributor,
    },
    201
  );
};

export const deleteDistributorController = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError("Invalid id", 400);
  }
  const [distributor] = await db
    .delete(distributorsTable)
    .where(eq(distributorsTable.id, BigInt(id)))
    .returning();
  if (!distributor)
    throw new ApiError(getTranslation(c, "distributor_not_found"), 404);
  return c.json(
    {
      success: true,
      message: getTranslation(c, "distributor_deleted_successfully"),
    },
    201
  );
};
