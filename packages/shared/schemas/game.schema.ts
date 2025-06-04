import { z } from "zod";

export const createGameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(150, { message: "Name must be 150 characters or less" })
    .trim(),
  description: z.string().optional().nullable(),
  logo: z.string().max(255, { message: "Logo must be 255 characters or less" }).optional().nullable(),
});

export const updateGameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .max(150, { message: "Name must be 150 characters or less" })
    .trim()
    .optional(),
  description: z.string().optional().nullable(),
  logo: z.string().max(255, { message: "Logo must be 255 characters or less" }).optional().nullable(),
});
