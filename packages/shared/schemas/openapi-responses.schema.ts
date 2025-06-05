import { z } from "zod";

// Common error response schema
export const ErrorResponseSchema = z.object({
  error: z.string().describe("Error message describing what went wrong"),
});

// Game response schemas
export const GameResponseSchema = z.object({
  id: z.number().int().positive().describe("Unique identifier for the game"),
  name: z.string().min(1).max(150).describe("Name of the game"),
  description: z.string().nullable().describe("Optional description of the game"),
  logo: z.string().max(255).nullable().describe("Optional logo URL for the game"),
  createdAt: z.string().datetime().describe("When the game was created"),
  updatedAt: z.string().datetime().nullable().describe("When the game was last updated"),
  deletedAt: z.string().datetime().nullable().describe("When the game was deleted (soft delete)"),
});

export const GamesListResponseSchema = z.array(GameResponseSchema);

// Distributor response schemas
export const DistributorResponseSchema = z.object({
  id: z.number().int().positive().describe("Unique identifier for the distributor"),
  name: z.string().min(1).max(255).describe("Name of the distributor"),
  description: z.string().nullable().describe("Optional description of the distributor"),
  website: z.string().max(255).nullable().describe("Optional website URL"),
  logo: z.string().max(255).nullable().describe("Optional logo URL"),
  createdAt: z.string().datetime().describe("When the distributor was created"),
  updatedAt: z.string().datetime().nullable().describe("When the distributor was last updated"),
  deletedAt: z.string().datetime().nullable().describe("When the distributor was deleted (soft delete)"),
});

export const DistributorsListResponseSchema = z.array(DistributorResponseSchema);

// Platform response schemas
export const PlatformResponseSchema = z.object({
  id: z.string().describe("Unique identifier for the platform (BigInt as string)"),
  name: z.string().min(1).max(100).describe("Name of the platform"),
  createdAt: z.string().datetime().describe("When the platform was created"),
  updatedAt: z.string().datetime().nullable().describe("When the platform was last updated"),
  deletedAt: z.string().datetime().nullable().describe("When the platform was deleted (soft delete)"),
});

export const PlatformsListResponseSchema = z.array(PlatformResponseSchema);

// Game Rank response schemas
export const GameRankResponseSchema = z.object({
  id: z.number().int().positive().describe("Unique identifier for the game rank"),
  name: z.string().min(1).max(100).describe("Name of the rank"),
  image: z.string().min(1).max(255).describe("Image URL for the rank"),
  order: z.number().int().min(0).describe("Display order of the rank"),
  gameId: z.number().int().positive().describe("ID of the associated game"),
  createdAt: z.string().datetime().describe("When the rank was created"),
  updatedAt: z.string().datetime().nullable().describe("When the rank was last updated"),
  deletedAt: z.string().datetime().nullable().describe("When the rank was deleted (soft delete)"),
});

export const GameRanksListResponseSchema = z.array(GameRankResponseSchema);

// Parameter schemas for path parameters
export const IdParamSchema = z.object({
  id: z.string().transform((val) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) throw new Error("Invalid ID format");
    return num;
  }).describe("Unique identifier"),
});

// Success message schema
export const SuccessResponseSchema = z.object({
  message: z.string().describe("Success message"),
});
