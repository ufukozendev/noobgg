import { z } from "zod";

export const createGamePlatformDto = z.object({
  gameId: z.union([z.string(), z.number()]),
  platformId: z.union([z.string(), z.number()]),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export const updateGamePlatformDto = z.object({
  gameId: z.union([z.string(), z.number()]).optional(),
  platformId: z.union([z.string(), z.number()]).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export type CreateGamePlatformDto = z.infer<typeof createGamePlatformDto>;
export type UpdateGamePlatformDto = z.infer<typeof updateGamePlatformDto>;
