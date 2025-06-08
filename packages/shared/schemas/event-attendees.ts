import { z } from "zod";

export const createEventAttendeeSchema = z.object({
  eventId: z.coerce.bigint().or(
    z
      .string()
      .regex(/^\d+$/)
      .transform((val) => BigInt(val))
  ),
  userProfileId: z.coerce.bigint().or(
    z
      .string()
      .regex(/^\d+$/)
      .transform((val) => BigInt(val))
  ),
});

export const getEventAttendeesSchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  eventId: z.string().optional(),
});

export type CreateEventAttendeeInput = z.infer<
  typeof createEventAttendeeSchema
>;
export type GetEventAttendeesInput = z.infer<typeof getEventAttendeesSchema>;
