import { z } from "zod";

export const createDistributorDto = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  website: z.string().max(255).optional(),
  logo: z.string().max(255).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export const updateDistributorDto = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  website: z.string().max(255).optional(),
  logo: z.string().max(255).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),
});

export type CreateDistributorDto = z.infer<typeof createDistributorDto>;
export type UpdateDistributorDto = z.infer<typeof updateDistributorDto>;
