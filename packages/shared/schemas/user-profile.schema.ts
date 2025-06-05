import {z} from 'zod';

const genderEnum = z.enum(['male', 'female', 'unknown']);
const regionTypeEnum = z.enum(['north_america','south_america','europe', 'asia', 'oceania',  'middle_east', 'africa', 'russia_cis', 'unknown']);

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
    .optional(),

  gender: genderEnum.default('unknown'),
  regionType: regionTypeEnum.default('unknown'),

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
    .optional(),

  gender: genderEnum.default('unknown').optional(),
  regionType: regionTypeEnum.default('unknown').optional(),

  lastOnline: z.coerce.date().optional(),
});