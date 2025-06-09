import { Context } from "hono";

// v1: any-route controller (boş şablon)
export const anyRouteGetController = (c: Context) => {
  return c.text("Hello Any Route!");
};

export const anyRoutePostController = (c: Context) => {
  return c.text("Hello Any Route!");
};
