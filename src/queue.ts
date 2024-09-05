import { Queue } from "bullmq";
import Redis from "ioredis";
import { log } from "util";

// Create a Redis connection
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

// Create a queue
const myQueue = new Queue("scheduledJobs", { connection: redis });

// Function to add a scheduled job to the queue
export async function addScheduledJob(timestamp: number): Promise<string> {
  console.log("Requested Timestamp:", new Date(timestamp).toLocaleString());

  const currentTime = Date.now();
  console.log("Current Time:", new Date(currentTime).toLocaleString());

  // Calculate delay
  const delay = timestamp - currentTime;
  console.log("Delay (ms):", delay);

  // Validate that the timestamp is in the future
  if (delay <= 0) {
    console.log("Invalid timestamp");
    throw new Error("Timestamp must be in the future");
  }

  // Add a job with the specified delay and include the scheduled timestamp
  const job = await myQueue.add(
    "scheduledJob",
    { message: "This is a scheduled job!", scheduledTimestamp: timestamp },
    { delay }
  );

  console.log("Job added with ID:", job.id);
  return job.id as string;
}

// Function to remove a scheduled job from the queue by its ID
export async function removeScheduledJobById(jobId: string) {
  console.log("Removing job with ID:", jobId);

  if (jobId) {
    await myQueue.remove(jobId);
    console.log("Job removed successfully:", jobId);
  } else {
    console.log("No job found with the given ID.");
    throw new Error("Job not found");
  }
}

// Function to get a job by ID
export async function getJobById(jobId: string) {
  console.log("Getting job with ID:", jobId);

  const job = await myQueue.getJob(jobId);
  if (job) {
    console.log("Job found:", job);
    return job;
  } else {
    console.log("No job found with the given ID.");
    throw new Error("Job not found");
  }
}

export { myQueue };
