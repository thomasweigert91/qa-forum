import { randomUUID } from "node:crypto";

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

export function getQuestions(): Question[] {
  return findAllQuestions();
}

export function getQuestionsWithAnswerCount(): QuestionWithAnswerCount[] {
  return findAllQuestionsWithAnswerCount();
}

export function getQuestionById(questionId: string): Question | undefined {
  return findQuestionById(questionId);
}

export function getQuestionsByTitle(searchTerm: string): Question[] {
  const normalizedSearchTerm = searchTerm.trim();

  if (!normalizedSearchTerm) {
    return findAllQuestions();
  }

  return findQuestionsByTitle(normalizedSearchTerm);
}

export function createQuestion(
  userId: string,
  input: CreateQuestionInput,
): Question {
  const question: Question = {
    id: randomUUID(),
    title: input.title.trim(),
    body: input.body.trim(),
    createdAt: new Date().toISOString(),
    createdById: userId,
  };

  return insertQuestion(question);
}

export function updateQuestion(
  questionId: string,
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

export function deleteQuestion(questionId: string): boolean {
  return deleteQuestionById(questionId);
}
