import type {
  CreateQuestionInput,
  Question,
  QuestionWithAnswerCount,
  UpdateQuestionInput,
} from "@/types/question";

import {
  deleteQuestionById,
  findAllQuestions,
  findAllQuestionsWithAnswerCount,
  findQuestionById,
  findQuestionsByTitle,
  insertQuestion,
  updateQuestionById,
} from "@/repositories/questionRepository";
import { formatDate } from "@/utils/formatDate";

export function getQuestions(): Question[] {
  return findAllQuestions();
}

export function getQuestionsWithAnswerCount(): QuestionWithAnswerCount[] {
  const rawQuestionsWithAnswerCount = findAllQuestionsWithAnswerCount();

  return rawQuestionsWithAnswerCount.map((question) => ({
    ...question,
    createdAtFormatted: formatDate(question.createdAt),
  }));
}

export function getQuestionById(
  questionId: number,
): Question | undefined {
  const question = findQuestionById(questionId);
  if (!question) return;
  return { ...question, createdAt: formatDate(question.createdAt) };
}

export function getQuestionsByTitle(searchTerm: string): Question[] {
  const normalizedSearchTerm = searchTerm.trim();

  if (!normalizedSearchTerm) {
    return findAllQuestions();
  }

  return findQuestionsByTitle(normalizedSearchTerm);
}

export function createQuestion(
  userId: number,
  input: CreateQuestionInput,
): Question {
  const question = {
    title: input.title.trim(),
    body: input.body.trim(),
    createdAt: new Date().toISOString(),
    createdById: userId,
  };

  return insertQuestion(question);
}

export function updateQuestion(
  questionId: number,
  input: UpdateQuestionInput,
): Question | undefined {
  const existingQuestion = findQuestionById(questionId);

  if (!existingQuestion) {
    return undefined;
  }

  const title = input.title?.trim() ?? existingQuestion.title;
  const body = input.body?.trim() ?? existingQuestion.body;

  return updateQuestionById(questionId, title, body);
}

export function deleteQuestion(questionId: number): boolean {
  return deleteQuestionById(questionId);
}
