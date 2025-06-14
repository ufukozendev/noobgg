import { z } from "zod";

export const createGameDistributorDto = z.object({
  gameId: z.union([z.string(), z.number()]),
  distributorId: z.union([z.string(), z.number()]),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export const updateGameDistributorDto = z.object({
  gameId: z.union([z.string(), z.number()]).optional(),
  distributorId: z.union([z.string(), z.number()]).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export type CreateGameDistributorDto = z.infer<typeof createGameDistributorDto>;
export type UpdateGameDistributorDto = z.infer<typeof updateGameDistributorDto>;
