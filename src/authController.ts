import { addScheduledJob } from "./queue";

export async function scheduleJobController(c: any) {
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
}
