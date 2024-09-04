// src/index.ts
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authRoutes } from "./authRoutes";

const app = new Hono();

// Basic endpoint to check if the server is working
app.get("/", (c) => {
  return c.text("Hello Hono how are you!");
});

// Use the auth routes
app.route("/", authRoutes);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
