import { z } from "zod";

export const createLanguageSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  code: z.string().min(1).max(10).trim(),
  flagUrl: z
    .string()
    .url({ message: "Invalid URL" })
    .max(255)
    .optional()
    .or(z.literal("")).transform((v) => (v === "" ? undefined : v)),
});

export const updateLanguageSchema = createLanguageSchema.partial();

export const getLanguagesSchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  search: z.string().optional(),
  sortBy: z.enum(["name", "code", "createdAt"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type CreateLanguageInput = z.infer<typeof createLanguageSchema>;
export type UpdateLanguageInput = z.infer<typeof updateLanguageSchema>;
export type GetLanguagesInput = z.infer<typeof getLanguagesSchema>;

export interface Language {
  id: string;
  name: string;
  code: string;
  flagUrl?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
} 