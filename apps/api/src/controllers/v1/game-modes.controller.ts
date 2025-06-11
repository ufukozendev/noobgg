import { Context } from "hono";

export const getAllGameModesController = async (c: Context) => {
  return c.json({ message: "Game modes endpoint not implemented" }, 501);
};
