import { addScheduledJob } from "./queue";
import { createJob } from "./job";

export async function scheduleJobController(c: any) {
  const { timestamp } = await c.req.json();

  // Validate the timestamp
  if (typeof timestamp !== "number" || isNaN(timestamp)) {
    return c.json({ error: "Invalid timestamp" }, 400);
  }

  try {
    // Add the job to the BullMQ queue
    await addScheduledJob(timestamp);

    // Add the job to the database
    await createJob(timestamp);

    console.log(
      "Job scheduled with timestamp:",
      new Date(timestamp).toLocaleString()
    );
    return c.json({
      message: "Job scheduled and saved to the database successfully!",
    });
  } catch (error) {
    console.error("Error scheduling job:", error);
    return c.json({ error: "Failed to schedule job" }, 400);
  }
}
