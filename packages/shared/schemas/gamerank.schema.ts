import { z } from "zod";

export const createGameRankSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be 100 characters or less" })
    .trim(),
  image: z
    .string()
    .min(1, { message: "Image is required" })
    .max(255, { message: "Image must be 255 characters or less" })
    .trim(),
  order: z
    .number()
    .int({ message: "Order must be an integer" })
    .min(0, { message: "Order must be non-negative" }),
  gameId: z
    .number()
    .int({ message: "Game ID must be an integer" })
    .min(1, { message: "Game ID is required" }),
});

export const updateGameRankSchema = createGameRankSchema.partial();
