import { z } from "zod";

export const createLanguageDto = z.object({
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(10),
  flagUrl: z.string().max(255).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export const updateLanguageDto = z.object({
  name: z.string().min(1).max(100).optional(),
  code: z.string().min(1).max(10).optional(),
  flagUrl: z.string().max(255).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export type CreateLanguageDto = z.infer<typeof createLanguageDto>;
export type UpdateLanguageDto = z.infer<typeof updateLanguageDto>;
