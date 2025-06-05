import type { PaginationParams, PaginationMeta } from "@repo/shared";

// Constants
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

/**
 * Validates and normalizes pagination parameters
 * @param params - Raw pagination parameters
 * @returns Validated pagination parameters with offset calculated
 */
export function validatePaginationParams(params: PaginationParams): {
  page: number;
  limit: number;
  offset: number;
} {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, params.limit || DEFAULT_PAGE_SIZE));
  const offset = (page - 1) * limit;
  
  return { page, limit, offset };
}

/**
 * Creates pagination metadata for response
 * @param totalItems - Total number of items in the dataset
 * @param currentPage - Current page number
 * @param itemsPerPage - Number of items per page
 * @returns Pagination metadata object
 */
export function createPaginationMeta(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): PaginationMeta {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

/**
 * Extracts pagination parameters from Hono context query
 * @param c - Hono context
 * @returns Pagination parameters
 */
export function extractPaginationParams(c: any): PaginationParams {
  return {
    page: c.req.query('page') ? Number(c.req.query('page')) : undefined,
    limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined,
    sortBy: c.req.query('sortBy') || undefined,
    sortOrder: (c.req.query('sortOrder') as 'asc' | 'desc') || 'desc',
  };
}
