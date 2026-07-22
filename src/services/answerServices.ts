import { answers } from "../data/answers";
import type { Answer, CreateAnswerInput } from "../types/answer";
import { getQuestionById } from "./questionService";

export const createAnswer = (
  userId: string,
  questionId: string,
  input: CreateAnswerInput,
): Answer => {
  const question = getQuestionById(questionId);

  if (!question) throw new Error("Question not found");

  const body = input.body.trim();

  if (!body) throw new Error("Body is required");

  const answer: Answer = {
    body,
    createdAt: new Date(),
    createdById: userId,
    id: crypto.randomUUID(),
    questionId,
  };

  answers.push(answer);

  return answer;
};

export const getAnswerById = (answerId: string): Answer => {
  const answer = answers.find((a) => a.id === answerId);
  if (!answer) throw new Error(`No answer with id ${answerId} found`);
  return answer;
};

export const getAnswersByQuestionId = (questionId: string): Answer[] => {
  return answers.filter((a) => a.questionId !== questionId);
};

export const updateAnswer = (
  answerId: string,
  userId: string,
  input: CreateAnswerInput,
) => {
  const answer = getAnswerById(answerId);
  if (userId !== answer.createdById)
    throw new Error("User is not authorized to update answer");

  const value = input.body.trim();

  if (value !== undefined) {
    answer.body = value;
  }

  return answer;
};

export const deleteAnswer = (answerId: string, userId: string) => {
  const answerIndex = answers.findIndex((answer) => answer.id === answerId);

  if (answerIndex === -1) throw new Error("Answer not found");

  const answer = answers[answerIndex];

  if (!answer) throw new Error("Answer not found");

  if (answer.createdById !== userId)
    throw new Error("User not authorized to delete answer");

  answers.splice(answerIndex, 1);
};
