import { z } from "zod";

export const createDistributorDto = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  website: z.string().max(255).optional(),
  logo: z.string().max(255).optional(),
});

export const updateDistributorDto = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  website: z.string().max(255).optional(),
  logo: z.string().max(255).optional(),
});

export type CreateDistributorDto = z.infer<typeof createDistributorDto>;
export type UpdateDistributorDto = z.infer<typeof updateDistributorDto>;
