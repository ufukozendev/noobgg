import { Context } from "hono";
import { createRoute } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { gamesTable } from "../db/schemas/games.drizzle";
import {
  createGameSchema,
  updateGameSchema,
  ErrorResponseSchema,
  GameResponseSchema,
  GamesListResponseSchema,
  GamesPaginatedResponseSchema,
  paginationQuerySchema,
  IdParamSchema,
} from "@repo/shared";
import { BaseService } from "../services/base.service";
import { extractPaginationParams } from "../utils/pagination";

// Create service instance
const gamesService = new BaseService(gamesTable);

// OpenAPI Route Definitions
export const getAllGamesRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Games"],
  summary: "Get all games with pagination",
  description: "Retrieve a paginated list of all available games in the platform. This endpoint returns all games that are not soft-deleted with pagination support.",
  request: {
    query: paginationQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GamesPaginatedResponseSchema,
          example: {
            success: true,
            data: [
              {
                id: 1,
                name: "Counter-Strike 2",
                description: "Popular tactical first-person shooter game",
                logo: "https://example.com/cs2-logo.png",
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-15T10:30:00Z",
                deletedAt: null,
              },
            ],
            meta: {
              currentPage: 1,
              totalPages: 5,
              totalItems: 95,
              itemsPerPage: 20,
              hasNextPage: true,
              hasPreviousPage: false,
            },
          },
        },
      },
      description: "Paginated list of games retrieved successfully",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Internal server error",
          },
        },
      },
      description: "Internal Server Error - Something went wrong on our end",
    },
  },
});

export const getGameByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags: ["Games"],
  summary: "Get game by ID",
  description: "Retrieve a specific game by its unique identifier. Returns detailed information about the game.",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GameResponseSchema,
          example: {
            id: 1,
            name: "Counter-Strike 2",
            description: "Popular tactical first-person shooter game",
            logo: "https://example.com/cs2-logo.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
            deletedAt: null,
          },
        },
      },
      description: "Game found and returned successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Invalid id",
          },
        },
      },
      description: "Bad Request - Invalid game ID provided (must be a positive integer)",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Game not found",
          },
        },
      },
      description: "Not Found - The requested game does not exist",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Internal server error",
          },
        },
      },
      description: "Internal Server Error - Something went wrong on our end",
    },
  },
});

export const createGameRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Games"],
  summary: "Create a new game",
  description: "Add a new game to the platform. All fields except description and logo are required.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createGameSchema,
          example: {
            name: "Counter-Strike 2",
            description: "Popular tactical first-person shooter game",
            logo: "https://example.com/cs2-logo.png",
          },
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: GameResponseSchema,
          example: {
            id: 1,
            name: "Counter-Strike 2",
            description: "Popular tactical first-person shooter game",
            logo: "https://example.com/cs2-logo.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: null,
            deletedAt: null,
          },
        },
      },
      description: "Game created successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Name is required and must be between 1-150 characters",
          },
        },
      },
      description: "Bad Request - Invalid input data provided (check required fields and formats)",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Internal server error",
          },
        },
      },
      description: "Internal Server Error - Something went wrong on our end",
    },
  },
});

export const updateGameRoute = createRoute({
  method: "put",
  path: "/{id}",
  tags: ["Games"],
  summary: "Update an existing game",
  description: "Update an existing game by its ID. All fields are optional - only provided fields will be updated.",
  request: {
    params: IdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updateGameSchema,
          example: {
            name: "Counter-Strike 2 Updated",
            description: "Updated description for the game",
          },
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GameResponseSchema,
          example: {
            id: 1,
            name: "Counter-Strike 2 Updated",
            description: "Updated description for the game",
            logo: "https://example.com/cs2-logo.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
            deletedAt: null,
          },
        },
      },
      description: "Game updated successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Invalid id",
          },
        },
      },
      description: "Bad Request - Invalid game ID or input data provided",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Game not found",
          },
        },
      },
      description: "Not Found - The requested game does not exist",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Internal server error",
          },
        },
      },
      description: "Internal Server Error - Something went wrong on our end",
    },
  },
});

export const deleteGameRoute = createRoute({
  method: "delete",
  path: "/{id}",
  tags: ["Games"],
  summary: "Delete a game",
  description: "Delete a game by its ID. This performs a hard delete - the game will be permanently removed from the database.",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GameResponseSchema,
          example: {
            id: 1,
            name: "Counter-Strike 2",
            description: "Popular tactical first-person shooter game",
            logo: "https://example.com/cs2-logo.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
            deletedAt: null,
          },
        },
      },
      description: "Game deleted successfully - returns the deleted game data",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Invalid id",
          },
        },
      },
      description: "Bad Request - Invalid game ID provided (must be a positive integer)",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Game not found",
          },
        },
      },
      description: "Not Found - The requested game does not exist",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Internal server error",
          },
        },
      },
      description: "Internal Server Error - Something went wrong on our end",
    },
  },
});

// Controller Functions
export const getAllGamesController = async (c: Context) => {
  try {
    const params = extractPaginationParams(c);
    const result = await gamesService.findAllPaginated(params);
    return c.json(result);
  } catch (error) {
    console.error('Error fetching games:', error);
    return c.json({ success: false, error: "Internal server error" }, 500);
  }
};

export const getGameByIdController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const game = await db.select().from(gamesTable).where(eq(gamesTable.id, id));

    if (game.length === 0) return c.json({ error: "Game not found" }, 404);
    return c.json(game[0]);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const createGameController = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = createGameSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    const [game] = await db.insert(gamesTable).values(result.data).returning();
    return c.json(game, 201);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const updateGameController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const data = await c.req.json();
    const result = updateGameSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    if (Object.keys(result.data).length === 0) {
      return c.json({ error: "No valid fields provided for update" }, 400);
    }

    const [game] = await db
      .update(gamesTable)
      .set(result.data)
      .where(eq(gamesTable.id, id))
      .returning();

    if (!game) return c.json({ error: "Game not found" }, 404);
    return c.json(game);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const deleteGameController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const [game] = await db
      .delete(gamesTable)
      .where(eq(gamesTable.id, id))
      .returning();

    if (!game) return c.json({ error: "Game not found" }, 404);
    return c.json(game);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};
