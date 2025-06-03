import { Context } from "hono";

export const anyRouteGETControler = (c: Context) => {
  return c.text("Hello Any Route!");
};

export const anyRoutePOSTControler = (c: Context) => {
  return c.text("Hello Any Route!");
};
