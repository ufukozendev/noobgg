import { z } from "zod";

export const createGamePlatformDto = z.object({
  gameId: z.union([z.string(), z.number()]),
  platformId: z.union([z.string(), z.number()]),
});

export const updateGamePlatformDto = z.object({
  gameId: z.union([z.string(), z.number()]).optional(),
  platformId: z.union([z.string(), z.number()]).optional(),
});

export type CreateGamePlatformDto = z.infer<typeof createGamePlatformDto>;
export type UpdateGamePlatformDto = z.infer<typeof updateGamePlatformDto>;
