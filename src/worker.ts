import { Worker } from "bullmq";
import Redis from "ioredis"; // Ensure ioredis is installed

// Create a Redis connection
const redis = new Redis({
  host: "localhost", // Replace with your Redis server's host
  port: 6379, // Replace with your Redis server's port
});

// Create a worker to process jobs from the queue
const worker = new Worker(
  "scheduledJobs",
  async (job) => {
    const { scheduledTimestamp } = job.data;
    const currentTimestamp = Date.now();

    console.log(
      "Scheduled Timestamp:",
      new Date(scheduledTimestamp).toLocaleString()
    );
    console.log(
      "Current Timestamp:",
      new Date(currentTimestamp).toLocaleString()
    );
    console.log("Processing job with message:", job.data.message);
  },
  { connection: redis }
);

export { worker };
