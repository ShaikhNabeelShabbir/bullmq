import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Open the database connection
const dbPromise = open({
  filename: String(process.env.DATABASE_FILENAME),
  driver: sqlite3.Database,
});

export default dbPromise;

// Create the jobs table if it doesn't exist yet
(async () => {
  try {
    const db: Database<sqlite3.Database, sqlite3.Statement> = await dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp INTEGER 
      );
    `);
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
})();
