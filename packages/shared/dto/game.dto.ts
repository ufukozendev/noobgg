import { z } from "zod";

export const createGameDto = z.object({
  name: z.string().min(1).max(150),
  description: z.string().optional(),
  logo: z.string().max(255).optional(),
});

export const updateGameDto = z.object({
  name: z.string().min(1).max(150).optional(),
  description: z.string().optional(),
  logo: z.string().max(255).optional(),
});

export type CreateGameDto = z.infer<typeof createGameDto>;
export type UpdateGameDto = z.infer<typeof updateGameDto>;
