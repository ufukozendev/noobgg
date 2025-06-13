import { Context, Next } from "hono";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = async (err: any, c: Context, next: Next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return c.json({ error: message }, status);
};
