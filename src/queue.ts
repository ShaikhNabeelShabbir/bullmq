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
export async function addScheduledJob(timestamp: number) {
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
  await myQueue.add(
    "scheduledJob",
    { message: "This is a scheduled job!", scheduledTimestamp: timestamp },
    { delay }
  );
}

// Function to remove a scheduled job from the queue by its timestamp
export async function removeScheduledJob(timestamp: number) {
  console.log("Removing job with Timestamp:", timestamp);
  console.log("timestamp string", String(timestamp));

  if (timestamp) {
    await myQueue.remove(String(timestamp));
    console.log("Job removed successfully:",timestamp);
  } else {
    console.log("No job found with the given timestamp.");
    throw new Error("Job not found");
  }
}

export { myQueue };
