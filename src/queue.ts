import { Queue } from "bullmq";
import Redis from "ioredis"; // Ensure ioredis is installed

// Create a Redis connection
const redis = new Redis({
  host: "localhost", // Replace with your Redis server's host
  port: 6379, // Replace with your Redis server's port
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

export { myQueue };
