//index.ts
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { addScheduledJob } from "./queue"; // Adjust import path if needed

const app = new Hono();

// Basic endpoint to check if the server is working
app.get("/", (c) => {
  return c.text("Hello Hono how are you!");
});

// Endpoint to schedule a job
app.post("/schedule-job", async (c) => {
  const { timestamp } = await c.req.json();

  if (typeof timestamp !== "number" || isNaN(timestamp)) {
    return c.json({ error: "Invalid timestamp" }, 400);
  }

  try {
    await addScheduledJob(timestamp);
    console.log(
      "Job scheduled with timestamp:",
      new Date(timestamp).toLocaleString()
    );
    return c.json({ message: "Job scheduled successfully!" });
  } catch (error) {
    console.error("Error scheduling job:", error);
    return c.json({ error }, 400);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
