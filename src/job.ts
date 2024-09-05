import dbPromise from "./db";

interface Job {
  jobId?: number;
  timestamp: number;
}

export const createJob = async (timestamp: number): Promise<void> => {
  try {
    const db = await dbPromise;
    await db.run("INSERT INTO jobs (timestamp) VALUES (?)", timestamp);
    console.log(
      `Job with timestamp ${timestamp} created successfully in the database.`
    );
  } catch (error) {
    console.error("Error creating job:", error);
  }
};

export const deleteJob = async (jobId: string): Promise<void> => {
  try {
    const db = await dbPromise;
    await db.run("DELETE FROM jobs WHERE jobId = ?", jobId);
    console.log(`Job with ID ${jobId} deleted successfully from the database.`);
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};

export const updateJobInDatabase = async (
  oldJobId: number,
  newJobId: number,
  newTimestamp: number
): Promise<void> => {
  try {
    const db = await dbPromise;

    // Update the job's timestamp
    await db.run(
      "UPDATE jobs SET timestamp = ?, jobId = ? WHERE jobId = ?",
      newTimestamp,
      newJobId,
      oldJobId
    );
    console.log(
      `Job with ID ${oldJobId} successfully updated to ID ${newJobId} and timestamp ${newTimestamp} in the database.`
    );
  } catch (error) {
    console.error("Error updating job in the database:", error);
    throw error;
  }
};
