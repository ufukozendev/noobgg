import { z } from 'zod';

export const createPlatformSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(100, { message: 'Name must be 100 characters or less' }),
});

export const updatePlatformSchema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty' }).max(100, { message: 'Name must be 100 characters or less' }).optional(),
});
