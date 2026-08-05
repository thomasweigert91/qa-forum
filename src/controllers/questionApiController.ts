import { createAnswer } from "@/services/answerServices";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
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

export const getQuestionsByIdController = (
  req: Request<QuestionParams, Question | ErrorResponse>,
  res: Response<Question | ErrorResponse>,
) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const questionId = Number(id);

    const question = getQuestionById(questionId);

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

    createQuestion(req.userId!, input);

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
    const questionId = Number(id);

    const answer = createAnswer(req.userId!, questionId, req.body);

    if (req.is("application/x-www-form-urlencoded")) {
      return res.redirect(303, `/questions/${questionId}`);
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
    const questionId = Number(id);
    const input = req.body;

    const question = updateQuestion(questionId, input);

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
    const questionId = Number(id);

    deleteQuestion(questionId);

    if (req.is("application/x-www-form-urlencoded")) {
      return res.redirect(303, "/");
    }

    return res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    res.status(404).json({ message });
  }
};
