import dbPromise from "./db";

interface Job {
  id?: number;
  timestamp: number;
}

export const createJob = async (timestamp: number): Promise<void> => {
  try {
    const db = await dbPromise;
    await db.run("INSERT INTO jobs (timestamp) VALUES (?)", timestamp);
    console.log(
      `hello from after database query Job with timestamp ${timestamp} created successfully and added to the database.`
    );
  } catch (error) {
    console.error("Error creating job:", error);
  }
};

export const deleteJob = async (timestamp: number): Promise<void> => {
  const db = await dbPromise;
  await db.run("DELETE FROM jobs WHERE timestamp = ?", timestamp);
  console.log(
    `hello from after database query Job with timestamp ${timestamp} deleted 
    successfully and removed from the database.`
  );
};

// Function to update the timestamp of a job in the database
export const updateJobInDatabase = async (
  oldTimestamp: number,
  newTimestamp: number
): Promise<void> => {
  try {
    const db = await dbPromise;

    // Update the job's timestamp
    await db.run(
      "UPDATE jobs SET timestamp = ? WHERE timestamp = ?",
      newTimestamp,
      oldTimestamp
    );
    console.log(
      `Job with old timestamp ${oldTimestamp} successfully updated to ${newTimestamp} in the database.`
    );
  } catch (error) {
    console.error("Error updating job in the database:", error);
    throw error;
  }
};
