import { z } from 'zod';

export const createGameRankSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name must be 100 characters or less" }),
  image: z.string().min(1, { message: "Image is required" }).max(255, { message: "Image must be 255 characters or less" }),
  order: z.number().int({ message: "Order must be an integer" }).min(0, { message: "Order must be non-negative" }),
  gameId: z.number().int({ message: "Game ID must be an integer" }).positive({ message: "Game ID must be positive" }),
});

export const updateGameRankSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }).max(100, { message: "Name must be 100 characters or less" }).optional(),
  image: z.string().min(1, { message: "Image cannot be empty" }).max(255, { message: "Image must be 255 characters or less" }).optional(),
  order: z.number().int({ message: "Order must be an integer" }).min(0, { message: "Order must be non-negative" }).optional(),
  gameId: z.number().int({ message: "Game ID must be an integer" }).positive({ message: "Game ID must be positive" }).optional(),
});
