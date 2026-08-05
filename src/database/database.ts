import { Database } from "bun:sqlite";
import fs from "node:fs";
import path from "node:path";

const databaseDirectory = path.join(process.cwd(), "src/database");
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

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    expiresAt TEXT NOT NULL,

    FOREIGN KEY (userId)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    createdById INTEGER NOT NULL,

    FOREIGN KEY (createdById)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    questionId INTEGER NOT NULL,
    body TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    createdById INTEGER NOT NULL,

    FOREIGN KEY (questionId)
      REFERENCES questions(id)
      ON DELETE CASCADE,
    FOREIGN KEY (createdById)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS bookmarks (
    userId INTEGER NOT NULL,
    questionId INTEGER NOT NULL,
    createdAt TEXT NOT NULL,

    PRIMARY KEY (userId, questionId),

    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (questionId) REFERENCES questions(id) ON DELETE CASCADE
);

  CREATE INDEX IF NOT EXISTS idx_sessions_userId
    ON sessions(userId);

  CREATE INDEX IF NOT EXISTS idx_answers_questionId
    ON answers(questionId);
`);
