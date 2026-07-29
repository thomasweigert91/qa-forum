import { Database } from "bun:sqlite";
import fs from "node:fs";
import path from "node:path";

const databaseDirectory = path.join(process.cwd(), "src/data");
const databasePath = path.join(databaseDirectory, "qa-forum.sqlite");

const dbPath = process.env["DATABASE_PATH"] ?? databasePath;

fs.mkdirSync(databaseDirectory, {
  recursive: true,
});

export const db = new Database(dbPath, {
  create: true,
  strict: true,
});

db.run(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL,
    created_by_id TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS answers (
    id TEXT PRIMARY KEY,
    question_id TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL,
    created_by_id TEXT NOT NULL,
    FOREIGN KEY (question_id)
      REFERENCES questions(id)
      ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_answers_question_id
  ON answers(question_id);
`);
