import { db } from "@/database/database";
import type { CreateSession, Session } from "@/types/user.types";

const findSessionByIdStatement = db.query<Session, [number]>(`
    SELECT id, userId, createdAt, expiresAt
    FROM sessions
    WHERE id = ?
`);

const deleteSessionByUserIdStatement = db.query<void, [number]>(`
    DELETE FROM sessions WHERE userId = ?
`);

const deleteSessionByIdStatement = db.query<void, [number]>(`
    DELETE FROM sessions WHERE id = ?
`);
const insertSessionStatement = db.query<
  Session,
  { userId: number; createdAt: string; expiresAt: string }
>(`
    INSERT INTO sessions (
      userId,
      createdAt,
      expiresAt
    )
    VALUES (
      $userId,
      $createdAt,
      $expiresAt
    )
    RETURNING *
`);

export const findSessionById = (sessionId: number) => {
  const row = findSessionByIdStatement.get(sessionId);

  return row ?? undefined;
};

export const deleteSessionById = (sessionId: number) => {
  return deleteSessionByIdStatement.run(sessionId).changes > 0;
};

export const deleteSessionByUserId = (userId: number) => {
  return deleteSessionByUserIdStatement.run(userId).changes > 0;
};

export const createSession = (input: CreateSession) => {
  return insertSessionStatement.run({ ...input });
};
