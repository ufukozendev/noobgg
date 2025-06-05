import { z } from "zod";

// Gender enum validation
const genderEnum = z.enum(['male', 'female', 'unknown']);

// Region type enum validation  
const regionTypeEnum = z.enum([
  'north_america',
  'south_america', 
  'europe',
  'asia',
  'oceania',
  'middle_east',
  'africa',
  'russia_cis',
  'unknown'
]);

export const createUserProfileSchema = z.object({
  userKeycloakId: z
    .string()
    .min(1, { message: "User Keycloak ID is required" })
    .max(100, { message: "User Keycloak ID must be 100 characters or less" })
    .trim(),
  userName: z
    .string()
    .min(1, { message: "Username is required" })
    .max(50, { message: "Username must be 50 characters or less" })
    .trim(),
  firstName: z
    .string()
    .max(60, { message: "First name must be 60 characters or less" })
    .trim()
    .optional()
    .nullable(),
  lastName: z
    .string()
    .max(60, { message: "Last name must be 60 characters or less" })
    .trim()
    .optional()
    .nullable(),
  profileImageUrl: z
    .string()
    .max(255, { message: "Profile image URL must be 255 characters or less" })
    .url({ message: "Profile image URL must be a valid URL" })
    .optional()
    .nullable(),
  bannerImageUrl: z
    .string()
    .max(255, { message: "Banner image URL must be 255 characters or less" })
    .url({ message: "Banner image URL must be a valid URL" })
    .optional()
    .nullable(),
  bio: z
    .string()
    .optional()
    .nullable(),
  birthDate: z
    .string()
    .datetime({ message: "Birth date must be a valid ISO datetime" })
    .optional()
    .nullable(),
  gender: genderEnum.default('unknown'),
  regionType: regionTypeEnum.default('unknown'),
});

export const updateUserProfileSchema = z.object({
  userName: z
    .string()
    .min(1, { message: "Username cannot be empty" })
    .max(50, { message: "Username must be 50 characters or less" })
    .trim()
    .optional(),
  firstName: z
    .string()
    .max(60, { message: "First name must be 60 characters or less" })
    .trim()
    .optional()
    .nullable(),
  lastName: z
    .string()
    .max(60, { message: "Last name must be 60 characters or less" })
    .trim()
    .optional()
    .nullable(),
  profileImageUrl: z
    .string()
    .max(255, { message: "Profile image URL must be 255 characters or less" })
    .url({ message: "Profile image URL must be a valid URL" })
    .optional()
    .nullable(),
  bannerImageUrl: z
    .string()
    .max(255, { message: "Banner image URL must be 255 characters or less" })
    .url({ message: "Banner image URL must be a valid URL" })
    .optional()
    .nullable(),
  bio: z
    .string()
    .optional()
    .nullable(),
  birthDate: z
    .string()
    .datetime({ message: "Birth date must be a valid ISO datetime" })
    .optional()
    .nullable(),
  gender: genderEnum.optional(),
  regionType: regionTypeEnum.optional(),
});
