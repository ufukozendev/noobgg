import { Context, Next } from "hono";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 *
 * @param {unknown} err - The error object caught by the middleware.
 * @param {Context} c - The Hono context object.
 * @returns {Promise<Response>} A JSON response with the error message and status code.
 */

export const errorHandler = (err: unknown, c: Context): Response => {
  const status = (err as any)?.status ?? 500;
  const message = (err as any)?.message ?? "Internal Server Error";
  const errorResponse = {
    status,
    message,
  };
  return c.json(errorResponse, status);
};
