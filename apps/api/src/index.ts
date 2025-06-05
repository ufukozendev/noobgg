import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import { exampleSchema } from "@repo/shared";
import router from "./routes";

// burada ortak paketi çektik

const app = new OpenAPIHono();

app.use("*", cors({
  origin: ["http://localhost:3001"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// Add Swagger UI route
app.get("/docs", swaggerUI({ url: "/docs/openapi.json" }));

// Generate OpenAPI spec
app.doc("/docs/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "noob.gg API",
    description: "Gaming platform API for noob.gg - Interactive documentation for developers",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
});

app.route("/", router);

export default app;
