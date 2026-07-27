import { randomUUID } from "node:crypto";

import type {
  CreateQuestionInput,
  Question,
  UpdateQuestionInput,
} from "../types/question";
import { questions } from "../data/questions";

export function getQuestions(): Question[] {
  return questions;
}

export function getQuestionById(questionId: string): Question {
  const question = questions.find((question) => question.id === questionId);

  if (!question) {
    throw new Error("Question not found");
  }

  return question;
}

export const getQuestionsByTitle = (value: string) => {
  return questions.filter((q) =>
    q.title.toLowerCase().includes(value.toLowerCase()),
  );
};

export function createQuestion(
  userId: string,
  input: CreateQuestionInput,
): Question {
  if (!input.title?.trim()) {
    throw new Error("Title is required");
  }

  if (!input.body?.trim()) {
    throw new Error("Body is required");
  }

  const question: Question = {
    id: randomUUID(),
    title: input.title.trim(),
    body: input.body.trim(),
    createdAt: new Date(),
    createdById: userId,
  };

  questions.push(question);

  return question;
}

export function updateQuestion(
  questionId: string,
  input: UpdateQuestionInput,
): Question {
  const question = getQuestionById(questionId);

  if (input.title !== undefined) {
    if (!input.title.trim()) {
      throw new Error("Title cannot be empty");
    }

    question.title = input.title.trim();
  }

  if (input.body !== undefined) {
    if (!input.body.trim()) {
      throw new Error("Body cannot be empty");
    }

    question.body = input.body.trim();
  }

  return question;
}

export function deleteQuestion(questionId: string): void {
  const questionIndex = questions.findIndex(
    (question) => question.id === questionId,
  );

  if (questionIndex === -1) {
    throw new Error("Question not found");
  }

  questions.splice(questionIndex, 1);
}
