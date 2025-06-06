import {z} from 'zod';
import {genderEnum, regionTypeEnum} from '../../../apps/api/src/db/schemas/user-profile.drizzle';

export const createUserProfileSchema = z.object({
  userKeycloakId: z
    .string()
    .min(1)
    .max(100),
  birthDate: z
    .coerce
    .date()
    .optional(),
  userName: z
    .string()
    .min(1)
    .max(50)
    .trim(),
  firstName: z
    .string()
    .max(60)
    .trim()
    .optional(),
  lastName: z
    .string()
    .max(60)
    .trim()
    .optional(),
  profileImageUrl: z
    .string()
    .url()
    .max(255)
    .optional(),
  bannerImageUrl: z
    .string()
    .url()
    .max(255)
    .optional(),
  bio: z
    .string()
    .max(500)
    .optional(),

  gender: z
    .enum(genderEnum.enumValues),
  regionType: z
    .enum(regionTypeEnum.enumValues),

  lastOnline: z.coerce.date().optional(),
});

export const updateUserProfileSchema = z.object({
  userKeycloakId: z
    .string()
    .min(1)
    .max(100)
    .optional(),
  birthDate: z
    .coerce
    .date()
    .optional(),
  userName: z
    .string()
    .min(1)
    .max(50)
    .trim()
    .optional(),
  firstName: z
    .string()
    .max(60)
    .trim()
    .optional(),
  lastName: z
    .string()
    .max(60)
    .trim()
    .optional(),
  profileImageUrl: z
    .string()
    .url()
    .max(255)
    .optional(),
  bannerImageUrl: z
    .string()
    .url()
    .max(255)
    .optional(),
  bio: z
    .string()
    .max(500)
    .optional(),

  gender: z
    .enum(genderEnum.enumValues),
  regionType: z
    .enum(regionTypeEnum.enumValues),

  lastOnline: z.coerce.date().optional(),
});