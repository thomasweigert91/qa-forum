import { createAnswer } from "@/services/answerServices";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "@/services/questionService";
import type { Answer, CreateAnswerInput } from "@/types/answer";
import type { ErrorResponse } from "@/types/api.types";
import type {
  CreateQuestionInput,
  Question,
  QuestionParams,
  UpdateQuestionInput,
} from "@/types/question";
import type { Request, Response } from "express";

export const getQuestionsController = (_req: Request, res: Response) => {
  const questions = getQuestions();

  res.json(questions);
};

export const getQuestionsByIdController = (
  req: Request<QuestionParams, Question | ErrorResponse>,
  res: Response<Question | ErrorResponse>,
) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const question = getQuestionById(id);

    res.json(question);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    res.status(404).json({ message });
  }
};

export const createQuestionController = (
  req: Request<{}, Question | ErrorResponse, CreateQuestionInput>,
  res: Response<Question | ErrorResponse>,
) => {
  try {
    const input = req.body;

    // Placeholder until authentication is implemented
    createQuestion("user-1", input);

    res.status(201).redirect("/");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    res.status(400).json({ message });
  }
};

export const createAnswerController = (
  req: Request<QuestionParams, Answer | ErrorResponse, CreateAnswerInput>,
  res: Response<Answer | ErrorResponse>,
) => {
  try {
    const { id } = req.params;

    // Placeholder until authentication is implemented
    const answer = createAnswer("user-1", id, req.body);

    if (req.is("application/x-www-form-urlencoded")) {
      return res.redirect(303, `/questions/${id}`);
    }

    return res.status(201).json(answer);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return res.status(400).json({ message });
  }
};

export const updateQuestionController = (
  req: Request<QuestionParams, Question | ErrorResponse, UpdateQuestionInput>,
  res: Response<Question | ErrorResponse>,
) => {
  try {
    const { id } = req.params;
    const input = req.body;

    const question = updateQuestion(id, input);

    res.json(question);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    res.status(400).json({ message });
  }
};

export const deleteQuestionController = (
  req: Request<QuestionParams, void | ErrorResponse>,
  res: Response<void | ErrorResponse>,
) => {
  try {
    const { id } = req.params;

    deleteQuestion(id);

    res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    res.status(404).json({ message });
  }
};
