import { Database } from "bun:sqlite";
import { env } from "bun";

const db = new Database(env.DB_FILE_PATH, {
  // $等のプレフィックスが不要になる
  strict: true,
});

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL
  );
`);

export { db };
