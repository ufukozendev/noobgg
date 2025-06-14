import { z } from "zod";

export const createPlatformDto = z.object({
  name: z.string().min(1).max(100),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export const updatePlatformDto = z.object({
  name: z.string().min(1).max(100).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export type CreatePlatformDto = z.infer<typeof createPlatformDto>;
export type UpdatePlatformDto = z.infer<typeof updatePlatformDto>;
