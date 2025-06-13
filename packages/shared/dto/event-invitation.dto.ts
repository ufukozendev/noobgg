import { z } from "zod";

export const invitationStatusEnum = z.enum(["pending", "accepted", "declined"]);

export const createEventInvitationDto = z.object({
  inviterId: z.union([z.string(), z.number()]),
  inviteeId: z.union([z.string(), z.number()]),
  eventId: z.union([z.string(), z.number()]),
  sentAt: z.string().datetime().optional(),
  respondedAt: z.string().datetime().optional(),
  status: invitationStatusEnum.optional(), // default: "pending"
});

export const updateEventInvitationDto = z.object({
  inviterId: z.union([z.string(), z.number()]).optional(),
  inviteeId: z.union([z.string(), z.number()]).optional(),
  eventId: z.union([z.string(), z.number()]).optional(),
  sentAt: z.string().datetime().optional(),
  respondedAt: z.string().datetime().optional(),
  status: invitationStatusEnum.optional(),
});

export type CreateEventInvitationDto = z.infer<typeof createEventInvitationDto>;
export type UpdateEventInvitationDto = z.infer<typeof updateEventInvitationDto>;
