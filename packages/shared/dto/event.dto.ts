import { z } from "zod";

export const eventTypeEnum = z.enum(["meetup", "tournament", "other"]);

export const createEventDto = z.object({
  title: z.string().min(1).max(150),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  place: z.string().max(255).optional(),
  isOnline: z.boolean().optional(),
  imageUrl: z.string().max(255).optional(),
  isOfficial: z.boolean().optional(),
  creatorId: z.union([z.string(), z.number()]),
  minAgeRestriction: z.number().int().optional(),
  languageId: z.union([z.string(), z.number()]).optional(),
  countryId: z.union([z.string(), z.number()]).optional(),
  cityId: z.union([z.string(), z.number()]).optional(),
  eventType: eventTypeEnum,
});

export const updateEventDto = createEventDto.partial();

export type CreateEventDto = z.infer<typeof createEventDto>;
export type UpdateEventDto = z.infer<typeof updateEventDto>;
