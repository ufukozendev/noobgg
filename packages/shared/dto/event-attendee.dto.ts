import { z } from "zod";

export const createEventAttendeeDto = z.object({
  eventId: z.union([z.string(), z.number()]),
  userProfileId: z.union([z.string(), z.number()]),
  joinedAt: z.string().datetime().optional(),
});

export const updateEventAttendeeDto = z.object({
  eventId: z.union([z.string(), z.number()]).optional(),
  userProfileId: z.union([z.string(), z.number()]).optional(),
  joinedAt: z.string().datetime().optional(),
});

export type CreateEventAttendeeDto = z.infer<typeof createEventAttendeeDto>;
export type UpdateEventAttendeeDto = z.infer<typeof updateEventAttendeeDto>;
