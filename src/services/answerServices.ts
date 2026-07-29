import { randomUUID } from "node:crypto";

import type { Answer, CreateAnswerInput } from "@/types/answer";

import { getQuestionById } from "@/services/questionService";
import {
  deleteAnswerById,
  findAnswerById,
  findAnswersByQuestionId,
  insertAnswer,
  updateAnswerById,
} from "@/repositories/answersRepository";

export function createAnswer(
  userId: string,
  questionId: string,
  input: CreateAnswerInput,
): Answer {
  const question = getQuestionById(questionId);

  if (!question) {
    throw new Error("Question not found");
  }

  const body = input.body.trim();

  if (!body) {
    throw new Error("Body is required");
  }

  const answer: Answer = {
    id: randomUUID(),
    questionId,
    body,
    createdAt: new Date().toISOString(),
    createdById: userId,
  };

  return insertAnswer(answer);
}

export function getAnswerById(answerId: string): Answer | undefined {
  return findAnswerById(answerId);
}

export function getAnswersByQuestionId(questionId: string): Answer[] {
  return findAnswersByQuestionId(questionId);
}

export function updateAnswer(
  answerId: string,
  userId: string,
  input: CreateAnswerInput,
): Answer {
  const answer = findAnswerById(answerId);

  if (!answer) {
    throw new Error("Answer not found");
  }

  if (answer.createdById !== userId) {
    throw new Error("User is not authorized to update answer");
  }

  const body = input.body?.trim();

  if (body === undefined) {
    return answer;
  }

  if (!body) {
    throw new Error("Body is required");
  }

  const updatedAnswer = updateAnswerById(answerId, body);

  if (!updatedAnswer) {
    throw new Error("Answer could not be updated");
  }

  return updatedAnswer;
}

export function deleteAnswer(answerId: string, userId: string): boolean {
  const answer = findAnswerById(answerId);

  if (!answer) {
    throw new Error("Answer not found");
  }

  if (answer.createdById !== userId) {
    throw new Error("User is not authorized to delete answer");
  }

  return deleteAnswerById(answerId);
}
