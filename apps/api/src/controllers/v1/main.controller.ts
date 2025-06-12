import { Context } from "hono";
import { getTranslation } from "../../utils/translation";
export const homeController = (c: Context) => {
  const t = getTranslation(c, "greeting");
  return c.json(t, 200);
};
