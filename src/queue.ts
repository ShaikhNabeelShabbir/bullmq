import { Queue } from "bullmq";

// Create a queue
const myQueue = new Queue("scheduledJobs");

// Function to add a scheduled job to the queue
export async function addScheduledJob(timestamp: number) {
  console.log("Requested Timestamp:", timestamp);

  const currentTime = Date.now();
  console.log("Current Time:", currentTime);

  // Calculate delay
  const delay = timestamp - currentTime;
  console.log("delay", delay);
  // Validate that the timestamp is in the future
  if (delay <= 0) {
    console.log("invalid timestamp");

    throw new Error("Timestamp must be in the future");
  }

  // Add a job with the specified delay
  await myQueue.add(
    "scheduledJob",
    { message: "This is a scheduled job!" },
    { delay }
  );
}

export { myQueue };
