import type {
  Answer,
  CreateAnswerInput,
  CreateAnswerRecord,
} from "@/types/answer";

import { getQuestionById } from "@/services/questionService";
import {
  deleteAnswerById,
  findAnswerById,
  findAnswersByQuestionId,
  insertAnswer,
  updateAnswerById,
} from "@/repositories/answersRepository";
import { formatDate } from "@/utils/formatDate";

export function createAnswer(
  userId: number,
  questionId: number,
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

  const answer: CreateAnswerRecord = {
    questionId,
    body,
    createdAt: new Date().toISOString(),
    createdById: userId,
  };

  return insertAnswer(answer);
}

export function getAnswerById(answerId: number): Answer | undefined {
  return findAnswerById(answerId);
}

export function getAnswersByQuestionId(questionId: number): Answer[] {
  const answers = findAnswersByQuestionId(questionId);

  return answers.map((a) => ({ ...a, createdAt: formatDate(a.createdAt) }));
}

export function updateAnswer(
  answerId: number,
  userId: number,
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

export function deleteAnswer(answerId: number, userId: number): boolean {
  const answer = findAnswerById(answerId);

  if (!answer) {
    throw new Error("Answer not found");
  }

  if (answer.createdById !== userId) {
    throw new Error("User is not authorized to delete answer");
  }

  return deleteAnswerById(answerId);
}
