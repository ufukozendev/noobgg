import { z } from "zod";

export const createPlatformDto = z.object({
  name: z.string().min(1).max(100),
});

export const updatePlatformDto = z.object({
  name: z.string().min(1).max(100).optional(),
});

export type CreatePlatformDto = z.infer<typeof createPlatformDto>;
export type UpdatePlatformDto = z.infer<typeof updatePlatformDto>;
