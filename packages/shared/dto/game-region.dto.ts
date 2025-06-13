import { z } from "zod";

export const createGameRegionDto = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
  gameId: z.union([z.string(), z.number()]),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export const updateGameRegionDto = z.object({
  name: z.string().min(1).max(255).optional(),
  code: z.string().min(1).max(50).optional(),
  gameId: z.union([z.string(), z.number()]).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export type CreateGameRegionDto = z.infer<typeof createGameRegionDto>;
export type UpdateGameRegionDto = z.infer<typeof updateGameRegionDto>;
