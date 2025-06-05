import { Context } from "hono";
import { createRoute } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { distributorsTable } from "../db/schemas/distributors.drizzle";
import {
  createDistributorSchema,
  updateDistributorSchema,
  ErrorResponseSchema,
  DistributorResponseSchema,
  DistributorsListResponseSchema,
  IdParamSchema,
} from "@repo/shared";

// OpenAPI Route Definitions
export const getAllDistributorsRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Distributors"],
  summary: "Get all distributors",
  description: "Retrieve a list of all game distributors in the platform. This endpoint returns all distributors that are not soft-deleted.",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DistributorsListResponseSchema,
          example: [
            {
              id: 1,
              name: "Steam",
              description: "Digital distribution platform for PC gaming",
              website: "https://store.steampowered.com",
              logo: "https://example.com/steam-logo.png",
              createdAt: "2024-01-01T00:00:00Z",
              updatedAt: "2024-01-15T10:30:00Z",
              deletedAt: null,
            },
          ],
        },
      },
      description: "List of distributors retrieved successfully",
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

export const getDistributorByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags: ["Distributors"],
  summary: "Get distributor by ID",
  description: "Retrieve a specific distributor by its unique identifier. Returns detailed information about the distributor.",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DistributorResponseSchema,
          example: {
            id: 1,
            name: "Steam",
            description: "Digital distribution platform for PC gaming",
            website: "https://store.steampowered.com",
            logo: "https://example.com/steam-logo.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
            deletedAt: null,
          },
        },
      },
      description: "Distributor found and returned successfully",
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
      description: "Bad Request - Invalid distributor ID provided (must be a positive integer)",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Distributor not found",
          },
        },
      },
      description: "Not Found - The requested distributor does not exist",
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

export const createDistributorRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Distributors"],
  summary: "Create a new distributor",
  description: "Add a new game distributor to the platform. Name is required, other fields are optional.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createDistributorSchema,
          example: {
            name: "Steam",
            description: "Digital distribution platform for PC gaming",
            website: "https://store.steampowered.com",
            logo: "https://example.com/steam-logo.png",
          },
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: DistributorResponseSchema,
          example: {
            id: 1,
            name: "Steam",
            description: "Digital distribution platform for PC gaming",
            website: "https://store.steampowered.com",
            logo: "https://example.com/steam-logo.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: null,
            deletedAt: null,
          },
        },
      },
      description: "Distributor created successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Name is required and must be between 1-255 characters",
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

export const updateDistributorRoute = createRoute({
  method: "put",
  path: "/{id}",
  tags: ["Distributors"],
  summary: "Update an existing distributor",
  description: "Update an existing distributor by its ID. All fields are optional - only provided fields will be updated.",
  request: {
    params: IdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updateDistributorSchema,
          example: {
            name: "Steam Updated",
            description: "Updated description for Steam platform",
          },
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DistributorResponseSchema,
          example: {
            id: 1,
            name: "Steam Updated",
            description: "Updated description for Steam platform",
            website: "https://store.steampowered.com",
            logo: "https://example.com/steam-logo.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
            deletedAt: null,
          },
        },
      },
      description: "Distributor updated successfully",
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
      description: "Bad Request - Invalid distributor ID or input data provided",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Distributor not found",
          },
        },
      },
      description: "Not Found - The requested distributor does not exist",
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

export const deleteDistributorRoute = createRoute({
  method: "delete",
  path: "/{id}",
  tags: ["Distributors"],
  summary: "Delete a distributor",
  description: "Delete a distributor by its ID. This performs a hard delete - the distributor will be permanently removed from the database.",
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DistributorResponseSchema,
          example: {
            id: 1,
            name: "Steam",
            description: "Digital distribution platform for PC gaming",
            website: "https://store.steampowered.com",
            logo: "https://example.com/steam-logo.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
            deletedAt: null,
          },
        },
      },
      description: "Distributor deleted successfully - returns the deleted distributor data",
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
      description: "Bad Request - Invalid distributor ID provided (must be a positive integer)",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
          example: {
            error: "Distributor not found",
          },
        },
      },
      description: "Not Found - The requested distributor does not exist",
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
export const getAllDistributorsController = async (c: Context) => {
  try {
    const distributors = await db.select().from(distributorsTable);
    return c.json(distributors);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const getDistributorByIdController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const distributor = await db
      .select()
      .from(distributorsTable)
      .where(eq(distributorsTable.id, id));
    if (distributor.length === 0)
      return c.json({ error: "Distributor not found" }, 404);
    return c.json(distributor[0]);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const createDistributorController = async (c: Context) => {
  try {
    const data = await c.req.json();
    const result = createDistributorSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    const [distributor] = await db
      .insert(distributorsTable)
      .values(result.data)
      .returning();
    return c.json(distributor, 201);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const updateDistributorController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const data = await c.req.json();
    const result = updateDistributorSchema.safeParse(data);

    if (!result.success) {
      return c.json({ error: result.error.flatten().fieldErrors }, 400);
    }

    if (Object.keys(result.data).length === 0) {
      // Return a specific message if all fields were optional and none were provided,
      // or if provided fields were stripped out by Zod due to not being in the schema.
      return c.json({ error: "No valid fields provided for update" }, 400);
    }

    const [distributor] = await db
      .update(distributorsTable)
      .set(result.data) // Drizzle expects the actual data object for .set()
      .where(eq(distributorsTable.id, id))
      .returning();

    if (!distributor) return c.json({ error: "Distributor not found" }, 404);
    return c.json(distributor);
  } catch (error) {
    // Log the error for server-side inspection if needed
    console.error("Error in updateDistributorController:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export const deleteDistributorController = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id <= 0) {
      return c.json({ error: "Invalid id" }, 400);
    }

    const [distributor] = await db
      .delete(distributorsTable)
      .where(eq(distributorsTable.id, id))
      .returning();

    if (!distributor) return c.json({ error: "Distributor not found" }, 404);
    return c.json(distributor);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};
