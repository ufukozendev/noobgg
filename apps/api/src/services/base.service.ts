import { eq, count, asc, desc, SQL, and, isNull } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { db } from '../db';
import type { PaginationParams, PaginatedResponse } from '@repo/shared';
import { validatePaginationParams, createPaginationMeta } from '../utils/pagination';

/**
 * Base service class providing common pagination functionality
 * @template T - The Drizzle table type
 */
export class BaseService<T extends PgTable> {
  constructor(private table: T) {}

  /**
   * Find all records with pagination support
   * @param params - Pagination parameters
   * @param whereConditions - Optional where conditions
   * @param includeSoftDeleted - Whether to include soft-deleted records (default: false)
   * @returns Paginated response with data and metadata
   */
  async findAllPaginated(
    params: PaginationParams = {},
    whereConditions?: SQL | undefined,
    includeSoftDeleted: boolean = false
  ): Promise<PaginatedResponse<any>> {
    const { page, limit, offset } = validatePaginationParams(params);
    
    // Build base query
    let query = db.select().from(this.table);
    let countQuery = db.select({ count: count() }).from(this.table);
    
    // Build where conditions array
    const conditions: SQL[] = [];
    
    // Add soft delete filtering if the table has deletedAt column and includeSoftDeleted is false
    if (!includeSoftDeleted && 'deletedAt' in this.table) {
      conditions.push(isNull(this.table.deletedAt as any));
    }
    
    // Add custom where conditions if provided
    if (whereConditions) {
      conditions.push(whereConditions);
    }
    
    // Apply where conditions if any exist
    if (conditions.length > 0) {
      const combinedConditions = conditions.length === 1 ? conditions[0] : and(...conditions);
      query = query.where(combinedConditions);
      countQuery = countQuery.where(combinedConditions);
    }
    
    // Apply sorting if specified
    if (params.sortBy && params.sortBy in this.table) {
      const sortColumn = this.table[params.sortBy as keyof T] as any;
      if (sortColumn) {
        const sortFn = params.sortOrder === 'desc' ? desc : asc;
        query = query.orderBy(sortFn(sortColumn));
      }
    }
    
    // Apply pagination
    query = query.limit(limit).offset(offset);
    
    // Execute queries in parallel
    const [data, totalResult] = await Promise.all([
      query,
      countQuery
    ]);
    
    const totalItems = totalResult[0]?.count || 0;
    const meta = createPaginationMeta(totalItems, page, limit);

    // Convert BigInt values to strings for JSON serialization
    const serializedData = data.map(item => this.serializeBigInts(item));

    return {
      success: true,
      data: serializedData,
      meta
    };
  }

  /**
   * Find a single record by ID
   * @param id - Record ID
   * @param includeSoftDeleted - Whether to include soft-deleted records (default: false)
   * @returns Single record or null
   */
  async findById(id: any, includeSoftDeleted: boolean = false): Promise<any | null> {
    let query = db.select().from(this.table).where(eq(this.table.id as any, id));
    
    // Add soft delete filtering if the table has deletedAt column and includeSoftDeleted is false
    if (!includeSoftDeleted && 'deletedAt' in this.table) {
      query = query.where(and(
        eq(this.table.id as any, id),
        isNull(this.table.deletedAt as any)
      ));
    }
    
    const result = await query;
    const item = result.length > 0 ? result[0] : null;
    return item ? this.serializeBigInts(item) : null;
  }

  /**
   * Recursively converts BigInt values to strings for JSON serialization
   * @param obj - Object to serialize
   * @returns Object with BigInt values converted to strings
   */
  private serializeBigInts(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj === 'bigint') {
      return obj.toString();
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.serializeBigInts(item));
    }

    if (typeof obj === 'object') {
      const serialized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        serialized[key] = this.serializeBigInts(value);
      }
      return serialized;
    }

    return obj;
  }
}
