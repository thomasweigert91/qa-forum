import { db } from "@/database/database";
import type {
  Answer,
  AnswerWithAuthor,
  CreateAnswerRecord,
} from "@/types/answer";

const findAnswerByIdStatement = db.query<Answer, [number]>(`
  SELECT id, questionId, body, createdAt, createdById
  FROM answers
  WHERE id = ?
`);

const findAnswersByQuestionIdStatement = db.query<AnswerWithAuthor, [number]>(`
  SELECT answers.id, answers.questionId, answers.body, answers.createdAt,
    answers.createdById, users.username AS createdByUsername
  FROM answers
  JOIN users ON users.id = answers.createdById
  WHERE answers.questionId = ?
  ORDER BY answers.createdAt DESC
`);

const createAnswerStatement = db.query<Answer, CreateAnswerRecord>(`
  INSERT INTO answers (questionId, body, createdAt, createdById)
  VALUES ($questionId, $body, $createdAt, $createdById)
  RETURNING id, questionId, body, createdAt, createdById
`);

const updateAnswerStatement = db.query<
  Answer,
  { answerId: number; body: string }
>(`
  UPDATE answers
  SET body = $body
  WHERE id = $answerId
  RETURNING id, questionId, body, createdAt, createdById
`);

const deleteAnswerStatement = db.query<null, [number]>(`
  DELETE FROM answers
  WHERE id = ?
`);

export function findAnswerById(answerId: number): Answer | undefined {
  return findAnswerByIdStatement.get(answerId) ?? undefined;
}

export function findAnswersByQuestionId(questionId: number): Answer[] {
  return findAnswersByQuestionIdStatement.all(questionId);
}

export function insertAnswer(answer: CreateAnswerRecord): Answer {
  const row = createAnswerStatement.get(answer);

  if (!row) {
    throw new Error("Answer could not be created");
  }

  return row;
}

export function updateAnswerById(
  answerId: number,
  body: string,
): Answer | undefined {
  return updateAnswerStatement.get({ answerId, body }) ?? undefined;
}

export function deleteAnswerById(answerId: number): boolean {
  const result = deleteAnswerStatement.run(answerId);

  return result.changes > 0;
}
