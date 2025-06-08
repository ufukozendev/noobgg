import { z } from "zod";

export const createEventInvitationSchema = z.object({
  inviterId: z.string().or(z.number()),
  inviteeId: z.string().or(z.number()),
  eventId: z.string().or(z.number()),
});

export const respondToInvitationSchema = z.object({
  status: z.enum(["accepted", "declined"]),
});

export const getEventInvitationsSchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  status: z.enum(["pending", "accepted", "declined"]).optional(),
  type: z.enum(["sent", "received"]).optional(),
});

export type CreateEventInvitationInput = z.infer<typeof createEventInvitationSchema>;
export type RespondToInvitationInput = z.infer<typeof respondToInvitationSchema>;
export type GetEventInvitationsInput = z.infer<typeof getEventInvitationsSchema>;