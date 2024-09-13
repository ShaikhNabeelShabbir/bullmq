import { Worker } from "bullmq";
import Redis from "ioredis";
import fetch from "node-fetch";
// Your Telegram bot token
const TELEGRAM_BOT_TOKEN = String(process.env.DATABASE_FILENAME);
// Create a Redis connection
const redis = new Redis({
    host: "127.0.0.1", // Replace with your Redis server's host
    port: 6379, // Replace with your Redis server's port
    maxRetriesPerRequest: null, // Set to null as required by BullMQ
});
// Create a worker to process jobs from the queue
const worker = new Worker("scheduledJobs", // Ensure this matches the queue name in queue.ts
async (job) => {
    console.log("Worker processing job:", job.id);
    // Extract data from the job
    const { scheduledTimestamp, telegram_user_id, message } = job.data;
    const currentTimestamp = Date.now();
    console.log("Scheduled Timestamp:", new Date(scheduledTimestamp).toLocaleString());
    console.log("Current Timestamp:", new Date(currentTimestamp).toLocaleString());
    // Sending message to Telegram using fetch
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: telegram_user_id, // Send to the provided Telegram user ID
                text: message || "Hello! This is a scheduled message.", // Default message
            }),
        });
        const result = await response.json();
        if (result.ok) {
            console.log("Message sent successfully:", result);
        }
        else {
            console.error("Failed to send message:", result);
        }
    }
    catch (error) {
        console.error("Error sending message to Telegram:", error);
    }
    console.log("Processing job with message:", message, "id:", job.id);
}, { connection: redis });
export { worker };
