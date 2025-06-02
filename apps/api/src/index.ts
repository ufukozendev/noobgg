import { Hono } from "hono";
import { exampleSchema } from "@repo/shared";

// burada ortak paketi çektik

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
