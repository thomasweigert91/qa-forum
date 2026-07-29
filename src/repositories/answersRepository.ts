import { db } from "@/database/database";
import type { Answer } from "@/types/answer";

export type AnswerRow = {
  id: string;
  question_id: string;
  body: string;
  created_at: string;
  created_by_id: string;
};

export function mapAnswerRow(row: AnswerRow): Answer {
  return {
    id: row.id,
    questionId: row.question_id,
    body: row.body,
    createdAt: row.created_at,
    createdById: row.created_by_id,
  };
}

const findAnswerByIdStatement = db.query<AnswerRow, [string]>(`
  SELECT
    id,
    question_id,
    body,
    created_at,
    created_by_id
  FROM answers
  WHERE id = ?
`);

const findAnswersByQuestionIdStatement = db.query<AnswerRow, [string]>(`
  SELECT
    id,
    question_id,
    body,
    created_at,
    created_by_id
  FROM answers
  WHERE question_id = ?
  ORDER BY created_at DESC
`);

const createAnswerStatement = db.query<AnswerRow, Answer>(`
  INSERT INTO answers (
    id,
    question_id,
    body,
    created_at,
    created_by_id
  )
  VALUES (
    $id,
    $questionId,
    $body,
    $createdAt,
    $createdById
  )
  RETURNING
    id,
    question_id,
    body,
    created_at,
    created_by_id
`);

const updateAnswerStatement = db.query<
  AnswerRow,
  {
    answerId: string;
    body: string;
  }
>(`
  UPDATE answers
  SET body = $body
  WHERE id = $answerId
  RETURNING
    id,
    question_id,
    body,
    created_at,
    created_by_id
`);

const deleteAnswerStatement = db.query<null, [string]>(`
  DELETE FROM answers
  WHERE id = ?
`);

export function findAnswerById(answerId: string): Answer | undefined {
  const row = findAnswerByIdStatement.get(answerId);

  return row ? mapAnswerRow(row) : undefined;
}

export function findAnswersByQuestionId(questionId: string): Answer[] {
  return findAnswersByQuestionIdStatement.all(questionId).map(mapAnswerRow);
}

export function insertAnswer(answer: Answer): Answer {
  const row = createAnswerStatement.get(answer);

  if (!row) {
    throw new Error("Answer could not be created");
  }

  return mapAnswerRow(row);
}

export function updateAnswerById(
  answerId: string,
  body: string,
): Answer | undefined {
  const row = updateAnswerStatement.get({
    answerId,
    body,
  });

  return row ? mapAnswerRow(row) : undefined;
}

export function deleteAnswerById(answerId: string): boolean {
  const result = deleteAnswerStatement.run(answerId);

  return result.changes > 0;
}
