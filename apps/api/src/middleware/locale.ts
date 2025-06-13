import { Context, Next } from "hono";
import { messages } from "../locales";

export interface Variables {
  locale: string;
  messages: Record<string, string>;
  version?: string;
};

export const localeMiddleware = async (c: Context<{ Variables: Variables }>, next: Next) => {
  const headers: Record<string, string> = {};
  c.req.raw.headers.forEach((value, key) => {
    headers[key] = value;
  });

  let detectedLocale = "en-US";

  const preferredLang = c.req.header("X-Preferred-Language");

  if (preferredLang === "tr") {
    detectedLocale = "tr-TR";
  } else if (preferredLang === "en") {
    detectedLocale = "en-US";
  }

  c.set("locale", detectedLocale);
  c.set("messages", messages[detectedLocale as keyof typeof messages]);

  await next();
};