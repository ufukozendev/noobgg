import { z } from "zod";

// Pagination query parameters schema
export const paginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 1;
      const num = parseInt(val, 10);
      return isNaN(num) || num < 1 ? 1 : num;
    })
    .describe("Page number (default: 1)"),
  limit: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 20;
      const num = parseInt(val, 10);
      return isNaN(num) || num < 1 ? 20 : Math.min(num, 100);
    })
    .describe("Items per page (default: 20, max: 100)"),
  sortBy: z
    .string()
    .optional()
    .describe("Field to sort by"),
  sortOrder: z
    .enum(["asc", "desc"])
    .optional()
    .default("desc")
    .describe("Sort direction (default: desc)"),
});

// Pagination metadata schema
export const paginationMetaSchema = z.object({
  currentPage: z.number().int().positive().describe("Current page number"),
  totalPages: z.number().int().min(0).describe("Total number of pages"),
  totalItems: z.number().int().min(0).describe("Total number of items"),
  itemsPerPage: z.number().int().positive().describe("Number of items per page"),
  hasNextPage: z.boolean().describe("Whether there is a next page"),
  hasPreviousPage: z.boolean().describe("Whether there is a previous page"),
});

// Generic paginated response schema factory
export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    success: z.boolean().describe("Whether the request was successful"),
    data: z.array(itemSchema).describe("Array of items for current page"),
    meta: paginationMetaSchema.describe("Pagination metadata"),
  });
}

// Pagination parameters interface for internal use
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Pagination metadata interface
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Paginated response interface
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

// Export types
export type PaginationQueryInput = z.infer<typeof paginationQuerySchema>;
export type PaginationMetaOutput = z.infer<typeof paginationMetaSchema>;
