import { z } from "zod";

export const createGameRankDto = z.object({
  name: z.string().min(1).max(100),
  order: z.number().int(),
  image: z.string().min(1).max(255).optional(),
  gameId: z.number().int().optional(),
});

export const updateGameRankDto = z.object({
  name: z.string().min(1).max(100).optional(),
  order: z.number().int().optional(),
  image: z.string().min(1).max(255).optional(),
  gameId: z.number().int().optional(),
});

export type CreateGameRankDto = z.infer<typeof createGameRankDto>;
export type UpdateGameRankDto = z.infer<typeof updateGameRankDto>;
