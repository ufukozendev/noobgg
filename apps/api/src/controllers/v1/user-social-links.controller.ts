import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { userSocialLinks } from "../../db/schemas/user-social-links.drizzle";
import { getTranslation } from "../../utils/translation";
import { ApiError } from "../../middleware/errorHandler";
import { convertBigIntToString } from "../../utils/bigint-serializer";
import { generateSnowflakeId } from "../../utils/id-generator";

export const getAllUserSocialLinksController = async (
  c: Context<{
    Variables: { locale: string; messages: Record<string, string> };
  }>
) => {
  const socialLinks = await db
    .select({
      id: userSocialLinks.id,
      userProfileId: userSocialLinks.userProfileId,
      platform: userSocialLinks.platform,
      url: userSocialLinks.url,
      createdAt: userSocialLinks.createdAt,
      updatedAt: userSocialLinks.updatedAt,
    })
    .from(userSocialLinks);
  return c.json(convertBigIntToString(socialLinks) as object);
};

export const getUserSocialLinkByIdController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const id = BigInt(idParam);
  const socialLink = await db.select().from(userSocialLinks).where(eq(userSocialLinks.id, id));
  if (socialLink.length === 0) {
    const errorMessage = getTranslation(c, "user_social_link_not_found");
    throw new ApiError(errorMessage, 404);
  }
  return c.json(
    {
      success: true,
      message: "User social link retrieved successfully",
      data: convertBigIntToString(socialLink[0]) as object,
    },
    200
  );
};

export const createUserSocialLinkController = async (c: Context) => {
  const data = await c.req.json();
  
  // Basic validation
  if (!data.userProfileId || !data.platform || !data.url) {
    const errorMessage = getTranslation(c, "validation_required");
    throw new ApiError(errorMessage, 400);
  }

  const values = {
    id: generateSnowflakeId(),
    userProfileId: BigInt(data.userProfileId),
    platform: data.platform,
    url: data.url,
  };
  
  const [socialLink] = await db.insert(userSocialLinks).values(values).returning();
  return c.json(
    {
      success: true,
      message: "User social link added successfully",
      data: convertBigIntToString(socialLink) as object,
    },
    201
  );
};

export const updateUserSocialLinkController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const id = BigInt(idParam);
  const data = await c.req.json();
  
  if (Object.keys(data).length === 0) {
    const errorMessage = getTranslation(c, "validation_required");
    throw new ApiError(errorMessage, 400);
  }

  const values = {
    ...data,
    updatedAt: new Date(),
  };
  
  const [socialLink] = await db
    .update(userSocialLinks)
    .set(values)
    .where(eq(userSocialLinks.id, id))
    .returning();
    
  if (!socialLink) {
    const errorMessage = getTranslation(c, "user_social_link_not_found");
    throw new ApiError(errorMessage, 404);
  }
  
  return c.json(
    {
      success: true,
      message: "User social link updated successfully",
      data: convertBigIntToString(socialLink) as object,
    },
    200
  );
};

export const deleteUserSocialLinkController = async (c: Context) => {
  const idParam = c.req.param("id");
  if (!idParam || !/^\d+$/.test(idParam)) {
    const errorMessage = getTranslation(c, "validation_invalidId");
    throw new ApiError(errorMessage, 400);
  }
  const id = BigInt(idParam);
  
  const [socialLink] = await db
    .delete(userSocialLinks)
    .where(eq(userSocialLinks.id, id))
    .returning();
    
  if (!socialLink) {
    const errorMessage = getTranslation(c, "user_social_link_not_found");
    throw new ApiError(errorMessage, 404);
  }
  
  return c.json(
    {
      success: true,
      message: "User social link deleted successfully",
    },
    200
  );
};