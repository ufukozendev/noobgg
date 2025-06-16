import { z } from "zod";

export const lobbyTypeEnum = z.enum(["public", "private"]);

export const createLobbyDto = z.object({
  gameId: z.union([z.string(), z.number()]),
  regionId: z.union([z.string(), z.number()]),
  modeId: z.union([z.string(), z.number()]),
  minTeamSize: z.number().int(),
  maxTeamSize: z.number().int(),
  type: lobbyTypeEnum.optional(),
  minRankId: z.union([z.string(), z.number()]).optional(),
  maxRankId: z.union([z.string(), z.number()]).optional(),
  isMicRequired: z.boolean().optional(),
  creatorId: z.union([z.string(), z.number()]),
  ownerId: z.union([z.string(), z.number()]),
  note: z.string().optional(),
  discordLink: z.string().max(255).optional(),
  rowVersion: z.string().optional(),
});

export const updateLobbyDto = createLobbyDto.partial();

export type CreateLobbyDto = z.infer<typeof createLobbyDto>;
export type UpdateLobbyDto = z.infer<typeof updateLobbyDto>;
