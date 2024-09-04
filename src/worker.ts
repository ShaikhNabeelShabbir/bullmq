import { Worker } from "bullmq";
import Redis from "ioredis";

// Create a Redis connection
const redis = new Redis({
  host: "127.0.0.1", // Replace with your Redis server's host
  port: 6379, // Replace with your Redis server's port
  maxRetriesPerRequest: null, // Set to null as required by BullMQ
});

// Create a worker to process jobs from the queue
const worker = new Worker(
  "scheduledJobs", // Ensure this matches the queue name in queue.ts
  async (job) => {
    console.log("Worker processing job:", job.id);
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
