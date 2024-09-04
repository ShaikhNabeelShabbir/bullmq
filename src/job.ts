import dbPromise from "./db";

interface Job {
  id?: number;
  timestamp: number;
}

export const createJob = async (timestamp: number): Promise<void> => {
  try {
    const db = await dbPromise;
    await db.run("INSERT INTO jobs (timestamp) VALUES (?)", timestamp);
    console.log(`Job with timestamp ${timestamp} created successfully and added to the database.`);
  } catch (error) {
    console.error("Error creating job:", error);
  }
};
