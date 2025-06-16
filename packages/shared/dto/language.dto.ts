import { z } from "zod";

export const createLanguageDto = z.object({
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(10),
  flagUrl: z.string().max(255).optional(),
});

export const updateLanguageDto = z.object({
  name: z.string().min(1).max(100).optional(),
  code: z.string().min(1).max(10).optional(),
  flagUrl: z.string().max(255).optional(),

});

export type CreateLanguageDto = z.infer<typeof createLanguageDto>;
export type UpdateLanguageDto = z.infer<typeof updateLanguageDto>;
