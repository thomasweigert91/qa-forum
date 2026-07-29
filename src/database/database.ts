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

db.run("PRAGMA foreign_keys = ON");
