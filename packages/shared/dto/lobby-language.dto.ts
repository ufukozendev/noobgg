import { z } from "zod";

export const createLobbyLanguageDto = z.object({
  lobbyId: z.union([z.string(), z.number()]),
  languageId: z.union([z.string(), z.number()]),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export const updateLobbyLanguageDto = z.object({
  lobbyId: z.union([z.string(), z.number()]).optional(),
  languageId: z.union([z.string(), z.number()]).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export type CreateLobbyLanguageDto = z.infer<typeof createLobbyLanguageDto>;
export type UpdateLobbyLanguageDto = z.infer<typeof updateLobbyLanguageDto>;
