import { Context } from "hono";
import { db } from "../../db";
import { languages } from "../../db/schemas/languages.drizzle";
import { and, asc, desc, eq, like, sql, isNull } from "drizzle-orm";
import { createLanguageDto, updateLanguageDto } from "@repo/shared";
import { getLanguagesSchema } from "@repo/shared/schemas/languages";
import { ApiError } from "../../middleware/errorHandler";
import {
  convertBigIntToNumber,
  convertBigIntToString,
} from "src/utils/bigint-serializer";

// GET /api/languages - List with pagination, search & sorting
export const getLanguages = async (c: Context) => {
  const parsed = getLanguagesSchema.safeParse(c.req.query());
  if (!parsed.success)
    throw new ApiError(JSON.stringify(parsed.error.flatten().fieldErrors), 400);
  const { page, limit, search, sortBy, sortOrder } = parsed.data;
  const offset = (Number(page) - 1) * Number(limit);
  const wh = [isNull(languages.deletedAt)];
  if (search) wh.push(like(languages.name, `%${search}%`));
  const whereCondition = and(...wh);
  const orderColumn =
    sortBy === "code"
      ? languages.code
      : sortBy === "createdAt"
        ? languages.createdAt
        : languages.name;
  const orderDir = sortOrder === "desc" ? desc(orderColumn) : asc(orderColumn);
  const data = await db
    .select()
    .from(languages)
    .where(whereCondition)
    .orderBy(orderDir)
    .limit(Number(limit))
    .offset(offset);
  const [{ count }] = await db
    .select({ count: sql`count(*)` })
    .from(languages)
    .where(whereCondition);

  return c.json({
    data: data.map(convertBigIntToString),
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: Number(count),
      totalPages: Math.ceil(Number(count) / Number(limit)),
    },
    filters: { search, sortBy, sortOrder },
  });
};

// GET /api/languages/all – minimal list for dropdowns
export const getAllLanguages = async (c: Context) => {
  const data = await db
    .select({
      id: languages.id,
      name: languages.name,
      code: languages.code,
      flagUrl: languages.flagUrl,
    })
    .from(languages)
    .where(isNull(languages.deletedAt))
    .orderBy(asc(languages.name));
  return c.json({ data });
};

// GET /api/languages/:id
export const getLanguageById = async (c: Context) => {
  const idParam = c.req.param("id");
  const id = BigInt(idParam);
  const [languageRow] = await db
    .select()
    .from(languages)
    .where(and(eq(languages.id, id), isNull(languages.deletedAt)))
    .limit(1);
  if (!languageRow) throw new ApiError("Language not found", 404);
  return c.json({ data: languageRow });
};

// POST /api/languages
export const createLanguage = async (c: Context) => {
  const body = await c.req.json();
  const parsed = createLanguageDto.safeParse(body);
  if (!parsed.success)
    throw new ApiError(JSON.stringify(parsed.error.flatten().fieldErrors), 400);
  const { name, code, flagUrl } = parsed.data;
  const [exists] = await db
    .select()
    .from(languages)
    .where(
      and(eq(languages.code, code.toLowerCase()), isNull(languages.deletedAt))
    )
    .limit(1);
  if (exists) throw new ApiError("Language code already exists", 409);
  const [created] = await db
    .insert(languages)
    .values({
      name: name.trim(),
      code: code.trim().toLowerCase(),
      flagUrl: flagUrl?.trim() || null,
    })
    .returning();
  return c.json({ data: convertBigIntToNumber(created) }, 201);
};

// PUT /api/languages/:id
export const updateLanguage = async (c: Context) => {
  const id = BigInt(c.req.param("id"));
  const body = await c.req.json();
  const parsed = updateLanguageDto.safeParse(body);
  if (!parsed.success)
    throw new ApiError(JSON.stringify(parsed.error.flatten().fieldErrors), 400);
  const [existing] = await db
    .select()
    .from(languages)
    .where(and(eq(languages.id, id), isNull(languages.deletedAt)))
    .limit(1);
  if (!existing) throw new ApiError("Language not found", 404);
  if (parsed.data.code && parsed.data.code !== existing.code) {
    const [conflict] = await db
      .select()
      .from(languages)
      .where(
        and(
          eq(languages.code, parsed.data.code.toLowerCase()),
          isNull(languages.deletedAt)
        )
      )
      .limit(1);
    if (conflict) throw new ApiError("Language code already exists", 409);
  }
  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (parsed.data.name !== undefined) updateData.name = parsed.data.name.trim();
  if (parsed.data.code !== undefined)
    updateData.code = parsed.data.code.trim().toLowerCase();
  if (parsed.data.flagUrl !== undefined)
    updateData.flagUrl = parsed.data.flagUrl?.trim() || null;
  const [updated] = await db
    .update(languages)
    .set(updateData)
    .where(eq(languages.id, id))
    .returning();
  return c.json({ data: convertBigIntToString(updated) });
};

// DELETE /api/languages/:id (soft delete)
export const deleteLanguage = async (c: Context) => {
  const id = BigInt(c.req.param("id"));
  const [deleted] = await db
    .update(languages)
    .set({ deletedAt: new Date(), updatedAt: new Date() })
    .where(eq(languages.id, id))
    .returning();
  if (!deleted) throw new ApiError("Language not found", 404);
  return c.json({ message: "Language deleted successfully" });
};
