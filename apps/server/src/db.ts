import Database from "better-sqlite3";
import { join } from "path";

const dbPath = join(__dirname, "..", "data", "task.db");
const db = new Database(dbPath);

// Create table if not exists (now with description)
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    completed BOOLEAN NOT NULL DEFAULT 0
  )
`);

export default db;
