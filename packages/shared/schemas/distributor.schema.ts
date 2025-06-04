import { z } from "zod";

export const createDistributorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name must be 255 characters or less" }),
  description: z.string().optional(),
  website: z
    .string()
    .max(255, { message: "Website must be 255 characters or less" })
    .optional(),
  logo: z
    .string()
    .max(255, { message: "Logo must be 255 characters or less" })
    .optional(),
});

export const updateDistributorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .max(255, { message: "Name must be 255 characters or less" })
    .optional(),
  description: z.string().optional().nullable(),
  website: z
    .string()
    .max(255, { message: "Website must be 255 characters or less" })
    .optional()
    .nullable(),
  logo: z
    .string()
    .max(255, { message: "Logo must be 255 characters or less" })
    .optional()
    .nullable(),
});
