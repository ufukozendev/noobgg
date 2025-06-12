import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { swaggerUI } from "@hono/swagger-ui";
import router from "./routes";
import { versionMiddleware } from "./middleware/version";
import { deprecationMiddleware } from "./middleware/deprecation";
import YAML from "yamljs";
import path from "path";
import { messages } from "./locales";

type Variables = {
  locale: string;
  messages: Record<string, string>;
  version?: string;
};

const app = new Hono<{ Variables: Variables }>();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-Preferred-Language",
      "Accept-Language",
      "Cookie",
    ],
    credentials: true,
  })
);

app.use("*", async (c, next) => {
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
});

app.use("/api/*", versionMiddleware);
app.use("/api/*", deprecationMiddleware);

app.get("/docs", swaggerUI({ url: "/docs/openapi.json" }));

app.get("/docs/openapi.json", (c) => {
  const openapiPath = path.join(process.cwd(), "openapi.yaml");
  const openapiDoc = YAML.load(openapiPath);
  return c.json(openapiDoc);
});

app.route("/", router);

app.onError((err, c) => {
  console.error("API Error:", err);
  return c.json(
    {
      error: "Internal Server Error",
      version: c.get("version") || "unknown",
    },
    500
  );
});

export default app;
