import { Context } from "hono";
import { createJob, deleteJob, updateJobInDatabase } from "./job";
import { addScheduledJob, removeScheduledJobById } from "./queue";

export async function scheduleJobController(c: Context) {
  const { timestamp } = await c.req.json();

  // Validate the timestamp
  if (typeof timestamp !== "number" || isNaN(timestamp)) {
    return c.json({ error: "Invalid timestamp" }, 400);
  }

  try {
    // Add the job to BullMQ queue and get the job ID
    const jobId = await addScheduledJob(timestamp);

    // Add the job to the database with the generated job ID
    await createJob(timestamp);

    console.log(
      "Job scheduled with timestamp:",
      new Date(timestamp).toLocaleString(),
      "and ID:",
      jobId
    );

    return c.json({
      message: "Job scheduled and saved to the database successfully!",
      jobId,
    });
  } catch (error) {
    console.error("Error scheduling job:", error);
    return c.json({ error: "Failed to schedule job" }, 400);
  }
}

export const handleDeleteJob = async (c: Context): Promise<Response> => {
  const { jobId } = await c.req.json();

  console.log("Received jobId: ", jobId);

  // Check if the jobId exists in the request
  if (!jobId || typeof jobId !== "string") {
    return c.json({ error: "Missing or invalid job ID" }, 400);
  }

  try {
    // Remove the job using the job ID
    await removeScheduledJobById(jobId);
    console.log("Job removed from BullMQ");

    // Remove the job from the database
    await deleteJob(jobId);
    console.log("Job removed from the database");

    // Return success response
    return c.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);

    // Return failure response
    return c.json({ error: "Failed to delete job" }, 500);
  }
};

export const handleUpdateJob = async (c: Context): Promise<Response> => {
  const { oldJobId, newTimestamp, newJobId } = await c.req.json();

  console.log("Received oldJobId: ", oldJobId);
  console.log("Received newJobId: ", newJobId);
  console.log("Received newTimestamp: ", newTimestamp);

  // Validate if all required fields are provided and are valid
  if (
    !oldJobId ||
    typeof oldJobId !== "string" ||
    !newJobId ||
    typeof newJobId !== "string" ||
    typeof newTimestamp !== "number"
  ) {
    return c.json({ error: "Missing or invalid fields" }, 400);
  }

  try {
    // Remove the existing job using the old job ID
    await removeScheduledJobById(oldJobId);
    console.log("Job removed from BullMQ");

    // Add a new job with the updated timestamp and new job ID
    await addScheduledJob(newTimestamp);
    console.log("New job added to BullMQ");

    // Update the timestamp and job ID in the database
    await updateJobInDatabase(oldJobId, newJobId, newTimestamp);
    console.log("Job timestamp and ID updated in the database");

    // Return success response
    return c.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Error updating job:", error);

    // Return failure response
    return c.json({ error: "Failed to update job" }, 500);
  }
};
