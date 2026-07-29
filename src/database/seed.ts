import { db } from "./database";

export function runMigrations(): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL,
      created_by_id TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS answers (
      id TEXT PRIMARY KEY,
      question_id TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL,
      created_by_id TEXT NOT NULL,

      FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_answers_question_id
    ON answers(question_id)
  `);
}
