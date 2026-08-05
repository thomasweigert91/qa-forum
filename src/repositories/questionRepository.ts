import { db } from "@/database/database";
import type {
  CreateQuestionRecord,
  Question,
  QuestionWithAuthor,
  QuestionWithAnswerCount,
} from "@/types/question";

type QuestionWithAnswerCountRow = QuestionWithAuthor & {
  answerCount: number;
};

const findAllStatement = db.query<Question, []>(`
  SELECT id, title, body, createdAt, createdById
  FROM questions
  ORDER BY createdAt DESC
`);

const findAllWithAnswerCountStatement = db.query<
  QuestionWithAnswerCountRow,
  []
>(`
  SELECT
    questions.id,
    questions.title,
    questions.body,
    questions.createdAt,
    questions.createdById,
    users.username AS createdByUsername,
    COUNT(answers.id) AS answerCount
  FROM questions
  JOIN users ON users.id = questions.createdById
  LEFT JOIN answers ON answers.questionId = questions.id
  GROUP BY
    questions.id,
    questions.title,
    questions.body,
    questions.createdAt,
    questions.createdById,
    users.username
  ORDER BY questions.createdAt DESC
`);

const findByIdStatement = db.query<Question, [number]>(`
  SELECT questions.id, questions.title, questions.body, questions.createdAt,
    questions.createdById, users.username AS createdByUsername
  FROM questions
  JOIN users ON users.id = questions.createdById
  WHERE questions.id = ?
`);

const findByTitleStatement = db.query<Question, [string]>(`
  SELECT id, title, body, createdAt, createdById
  FROM questions
  WHERE title LIKE ?
  ORDER BY createdAt DESC
`);

const createStatement = db.query<Question, CreateQuestionRecord>(`
  INSERT INTO questions (title, body, createdAt, createdById)
  VALUES ($title, $body, $createdAt, $createdById)
  RETURNING id, title, body, createdAt, createdById
`);

const updateStatement = db.query<
  Question,
  { questionId: number; title: string; body: string }
>(`
  UPDATE questions
  SET title = $title, body = $body
  WHERE id = $questionId
  RETURNING id, title, body, createdAt, createdById
`);

const deleteStatement = db.query<null, [number]>(`
  DELETE FROM questions
  WHERE id = ?
`);

export function findAllQuestions(): Question[] {
  return findAllStatement.all();
}

export function findAllQuestionsWithAnswerCount(): QuestionWithAnswerCount[] {
  return findAllWithAnswerCountStatement.all();
}

export function findQuestionById(
  questionId: number,
): Question | undefined {
  return findByIdStatement.get(questionId) ?? undefined;
}

export function findQuestionsByTitle(searchTerm: string): Question[] {
  return findByTitleStatement.all(`%${searchTerm}%`);
}

export function insertQuestion(question: CreateQuestionRecord): Question {
  const row = createStatement.get(question);

  if (!row) {
    throw new Error("Question could not be created");
  }

  return row;
}

export function updateQuestionById(
  questionId: number,
  title: string,
  body: string,
): Question | undefined {
  return updateStatement.get({ questionId, title, body }) ?? undefined;
}

export function deleteQuestionById(questionId: number): boolean {
  const result = deleteStatement.run(questionId);

  return result.changes > 0;
}
