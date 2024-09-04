import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { addScheduledJob } from "./queue";

const app = new Hono();

// Basic endpoint to check if the server is working
app.get("/", (c) => {
  return c.text("Hello Hono how are you!");
});

// Endpoint to schedule a job
app.post("/schedule-job", async (c) => {
  const { timestamp } = await c.req.json();

  // Validate that the timestamp is a number and is in the future
  if (typeof timestamp !== "number" || isNaN(timestamp)) {
    return c.json({ error: "Invalid timestamp" }, 400);
  }
  console.log(timestamp);

  try {
    await addScheduledJob(timestamp);
    return c.json({ message: "Job scheduled successfully!" });
  } catch (error) {
    return c.json({ message: error }, 400);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
