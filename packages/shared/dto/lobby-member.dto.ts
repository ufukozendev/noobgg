import { z } from "zod";

export const createLobbyMemberDto = z.object({
  lobbyId: z.union([z.string(), z.number()]),
  memberId: z.union([z.string(), z.number()]),
  isAdmin: z.boolean().optional(),
});

export const updateLobbyMemberDto = z.object({
  lobbyId: z.union([z.string(), z.number()]).optional(),
  memberId: z.union([z.string(), z.number()]).optional(),
  isAdmin: z.boolean().optional(),
});

export type CreateLobbyMemberDto = z.infer<typeof createLobbyMemberDto>;
export type UpdateLobbyMemberDto = z.infer<typeof updateLobbyMemberDto>;
