import { addScheduledJob, removeScheduledJob } from "./queue";
import { createJob, deleteJob } from "./job";
import { Context } from "hono";

export async function scheduleJobController(c: Context) {
  const { timestamp } = await c.req.json();

  // Validate the timestamp
  if (typeof timestamp !== "number" || isNaN(timestamp)) {
    return c.json({ error: "Invalid timestamp" }, 400);
  }

  try {
    // Add the job to BullMQ queue
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

export const handleDeleteJob = async (c: Context): Promise<Response> => {
  // Get the 'timestamp' from URL parameters
  const timestamp = c.req.param("timestamp");
  console.log("Received timestamp: ", timestamp);

  // Check if the timestamp exists in the request
  if (!timestamp) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  // Convert the timestamp to a number
  const timestampNum = Number(timestamp);

  // Validate that the timestamp is a valid number
  if (isNaN(timestampNum)) {
    return c.json({ error: "Invalid timestamp format" }, 400);
  }

  console.log("Converted timestamp to number: ", timestampNum);

  try {
    // Call the removeScheduledJob function to remove the job from BullMQ
    await removeScheduledJob(timestampNum);
    console.log("Job removed from BullMQ");

    // Call the deleteJob function to remove the job from the database
    await deleteJob(timestampNum);
    console.log("Job removed from the database");

    // Return success response
    return c.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);

    // Return failure response
    return c.json({ error: "Failed to delete job" }, 500);
  }
};
