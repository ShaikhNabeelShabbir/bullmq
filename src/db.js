import sqlite3 from "sqlite3";
import { open } from "sqlite";
// Open the database connection
const dbPromise = open({
    filename: String(process.env.DATABASE_FILENAME) || "default.db",
    driver: sqlite3.Database,
});
export default dbPromise;
// Create the jobs table if it doesn't exist yet
(async () => {
    try {
        const db = await dbPromise;
        await db.exec(`
      CREATE TABLE IF NOT EXISTS jobs (
        jobId INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp INTEGER
      );
    `);
        console.log("Jobs table is ready.");
    }
    catch (error) {
        console.error("Error initializing the database:", error);
    }
})();
