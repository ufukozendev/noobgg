import { Hono } from "hono";
import { cors } from "hono/cors";
import { exampleSchema } from "@repo/shared";
import router from "./routes";

// burada ortak paketi çektik

const app = new Hono();

app.use("*", cors({
  origin: ["http://localhost:3001"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

app.route("/", router);

export default app;
