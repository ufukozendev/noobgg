import { z } from "zod";

export const createGameModeDto = z.object({
  name: z.string().min(1).max(150),
  description: z.string().optional(),
  order: z.number().int(),
  gameId: z.union([z.string(), z.number()]),
  minTeamSize: z.number().int(),
  maxTeamSize: z.number().int(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export const updateGameModeDto = z.object({
  name: z.string().min(1).max(150).optional(),
  description: z.string().optional(),
  order: z.number().int().optional(),
  gameId: z.union([z.string(), z.number()]).optional(),
  minTeamSize: z.number().int().optional(),
  maxTeamSize: z.number().int().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export type CreateGameModeDto = z.infer<typeof createGameModeDto>;
export type UpdateGameModeDto = z.infer<typeof updateGameModeDto>;
