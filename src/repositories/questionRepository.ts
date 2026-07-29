import { db } from "@/database/database";
import type { Question, QuestionWithAnswerCount } from "@/types/question";

export type QuestionRow = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  created_by_id: string;
};

type QuestionWithAnswerCountRow = QuestionRow & {
  answer_count: number;
};

export function mapQuestionRow(row: QuestionRow): Question {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    createdAt: row.created_at,
    createdById: row.created_by_id,
  };
}

function mapQuestionWithAnswerCountRow(
  row: QuestionWithAnswerCountRow,
): QuestionWithAnswerCount {
  return {
    ...mapQuestionRow(row),
    answerCount: row.answer_count,
  };
}

const findAllStatement = db.query<QuestionRow, []>(`
  SELECT
    id,
    title,
    body,
    created_at,
    created_by_id
  FROM questions
  ORDER BY created_at DESC
`);

const findAllWithAnswerCountStatement = db.query<
  QuestionWithAnswerCountRow,
  []
>(`
  SELECT
    questions.id,
    questions.title,
    questions.body,
    questions.created_at,
    questions.created_by_id,
    COUNT(answers.id) AS answer_count
  FROM questions
  LEFT JOIN answers
    ON answers.question_id = questions.id
  GROUP BY
    questions.id,
    questions.title,
    questions.body,
    questions.created_at,
    questions.created_by_id
  ORDER BY questions.created_at DESC
`);

const findByIdStatement = db.query<QuestionRow, [string]>(`
  SELECT
    id,
    title,
    body,
    created_at,
    created_by_id
  FROM questions
  WHERE id = ?
`);

const findByTitleStatement = db.query<QuestionRow, [string]>(`
  SELECT
    id,
    title,
    body,
    created_at,
    created_by_id
  FROM questions
  WHERE title LIKE ?
  ORDER BY created_at DESC
`);

const createStatement = db.query<QuestionRow, Question>(`
  INSERT INTO questions (
    id,
    title,
    body,
    created_at,
    created_by_id
  )
  VALUES (
    $id,
    $title,
    $body,
    $createdAt,
    $createdById
  )
  RETURNING
    id,
    title,
    body,
    created_at,
    created_by_id
`);

const updateStatement = db.query<
  QuestionRow,
  {
    questionId: string;
    title: string;
    body: string;
  }
>(`
  UPDATE questions
  SET
    title = $title,
    body = $body
  WHERE id = $questionId
  RETURNING
    id,
    title,
    body,
    created_at,
    created_by_id
`);

const deleteStatement = db.query<null, [string]>(`
  DELETE FROM questions
  WHERE id = ?
`);

export function findAllQuestions(): Question[] {
  return findAllStatement.all().map(mapQuestionRow);
}

export function findAllQuestionsWithAnswerCount(): QuestionWithAnswerCount[] {
  return findAllWithAnswerCountStatement
    .all()
    .map(mapQuestionWithAnswerCountRow);
}

export function findQuestionById(questionId: string): Question | undefined {
  const row = findByIdStatement.get(questionId);

  return row ? mapQuestionRow(row) : undefined;
}

export function findQuestionsByTitle(searchTerm: string): Question[] {
  const rows = findByTitleStatement.all(`%${searchTerm}%`);

  return rows.map(mapQuestionRow);
}

export function insertQuestion(question: Question): Question {
  const row = createStatement.get(question);

  if (!row) {
    throw new Error("Question could not be created");
  }

  return mapQuestionRow(row);
}

export function updateQuestionById(
  questionId: string,
  title: string,
  body: string,
): Question | undefined {
  const row = updateStatement.get({
    questionId,
    title,
    body,
  });

  return row ? mapQuestionRow(row) : undefined;
}

export function deleteQuestionById(questionId: string): boolean {
  const result = deleteStatement.run(questionId);

  return result.changes > 0;
}
