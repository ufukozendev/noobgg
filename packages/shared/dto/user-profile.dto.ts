import { z } from "zod";

export const genderEnum = z.enum(["male", "female", "unknown"]);
export const regionTypeEnum = z.enum([
  "north_america",
  "south_america",
  "europe",
  "asia",
  "oceania",
  "middle_east",
  "africa",
  "russia_cis",
  "unknown",
]);

export const createUserProfileDto = z.object({
  userKeycloakId: z.string().min(1).max(100),
  userName: z.string().min(1).max(50),
  firstName: z.string().max(60).optional(),
  lastName: z.string().max(60).optional(),
  profileImageUrl: z.string().max(255).optional(),
  bannerImageUrl: z.string().max(255).optional(),
  bio: z.string().optional(),
  birthDate: z.string().datetime().optional(),
  gender: genderEnum.optional(),
  regionType: regionTypeEnum.optional(),
  lastOnline: z.string().datetime().optional(),
  rowVersion: z.string().optional(),
});

export const updateUserProfileDto = createUserProfileDto.partial();

export type CreateUserProfileDto = z.infer<typeof createUserProfileDto>;
export type UpdateUserProfileDto = z.infer<typeof updateUserProfileDto>;
