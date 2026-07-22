import { questions } from "../data/questions";
import type {
  CreateQuestionInput,
  Question,
  UpdateQuestionInput,
} from "../types/question";

export const createQuestion = (
  createdById: string,
  input: CreateQuestionInput,
): Question => {
  const title = input.title.trim();
  const body = input.body.trim();

  if (!title) {
    throw new Error("Question title is required");
  }

  if (!body) {
    throw new Error("Question body is required");
  }

  const question: Question = {
    id: crypto.randomUUID(),
    title,
    body,
    createdAt: new Date(),
    createdById,
  };

  questions.push(question);

  return question;
};

export const getQuestionById = (questionId: string): Question | undefined => {
  return questions.find((question) => question.id === questionId);
};

export const getQuestions = (): Question[] => {
  return questions;
};

export const searchQuestions = (searchTerm: string): Question[] => {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  return questions.filter((question) =>
    question.title.toLowerCase().includes(normalizedTerm),
  );
};

export const updateQuestion = (
  questionId: string,
  input: UpdateQuestionInput,
  userId: string,
): Question => {
  const question = getQuestionById(questionId);

  if (!question) {
    throw new Error("Question not found");
  }
  if (question.createdById !== userId) {
    throw new Error("Not authorized to update this question");
  }

  if (input.title !== undefined) {
    const title = input.title.trim();

    if (!title) {
      throw new Error("Question title cannot be empty");
    }

    question.title = title;
  }

  if (input.body !== undefined) {
    const body = input.body.trim();

    if (!body) {
      throw new Error("Question body cannot be empty");
    }

    question.body = body;
  }

  return question;
};

export const deleteQuestion = (userId: string, questionId: string): void => {
  const questionIndex = questions.findIndex(
    (question) => question.id === questionId,
  );

  if (questionIndex === -1) {
    throw new Error("Question not found");
  }

  const question = questions[questionIndex];

  if (!question) {
    throw new Error("Question not found");
  }

  if (question.createdById !== userId) {
    throw new Error("Not authorized to delete this question");
  }

  questions.splice(questionIndex, 1);
};
