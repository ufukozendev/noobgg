import { z } from "zod";

export const createLobbyLanguageDto = z.object({
  lobbyId: z.union([z.string(), z.number()]),
  languageId: z.union([z.string(), z.number()]),
});

export const updateLobbyLanguageDto = z.object({
  lobbyId: z.union([z.string(), z.number()]).optional(),
  languageId: z.union([z.string(), z.number()]).optional(),
});

export type CreateLobbyLanguageDto = z.infer<typeof createLobbyLanguageDto>;
export type UpdateLobbyLanguageDto = z.infer<typeof updateLobbyLanguageDto>;
