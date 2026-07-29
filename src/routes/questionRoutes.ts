import { Router } from "express";
import type { Request, Response } from "express";

import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../services/questionService";
import { createAnswer } from "../services/answerServices";

import type {
  CreateQuestionInput,
  Question,
  UpdateQuestionInput,
} from "../types/question";
import type { Answer, CreateAnswerInput } from "../types/answer";
import type { ErrorResponse } from "../types/api.types";

export const questionApiRouter = Router();

type QuestionParams = {
  questionId: string;
};

// GET /questions
questionApiRouter.get(
  "/",
  (_req: Request<{}, Question[]>, res: Response<Question[]>) => {
    const questions = getQuestions();

    res.json(questions);
  },
);

// GET /questions/:questionId
questionApiRouter.get(
  "/:questionId",
  (
    req: Request<QuestionParams, Question | ErrorResponse>,
    res: Response<Question | ErrorResponse>,
  ) => {
    try {
      const { questionId } = req.params;

      const question = getQuestionById(questionId);

      res.json(question);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";

      res.status(404).json({ message });
    }
  },
);

// POST /questions
questionApiRouter.post(
  "/",
  (
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
  },
);

// POST /questions/:questionId/answers
questionApiRouter.post(
  "/:questionId/answers",
  (
    req: Request<QuestionParams, Answer | ErrorResponse, CreateAnswerInput>,
    res: Response<Answer | ErrorResponse>,
  ) => {
    try {
      const { questionId } = req.params;

      // Placeholder until authentication is implemented
      const answer = createAnswer("user-1", questionId, req.body);

      if (req.is("application/x-www-form-urlencoded")) {
        return res.redirect(303, `/questions/${questionId}`);
      }

      return res.status(201).json(answer);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";

      return res.status(400).json({ message });
    }
  },
);

// PATCH /questions/:questionId
questionApiRouter.patch(
  "/:questionId",
  (
    req: Request<QuestionParams, Question | ErrorResponse, UpdateQuestionInput>,
    res: Response<Question | ErrorResponse>,
  ) => {
    try {
      const { questionId } = req.params;
      const input = req.body;

      const question = updateQuestion(questionId, input);

      res.json(question);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";

      res.status(400).json({ message });
    }
  },
);

// DELETE /questions/:questionId
questionApiRouter.delete(
  "/:questionId",
  (
    req: Request<QuestionParams, void | ErrorResponse>,
    res: Response<void | ErrorResponse>,
  ) => {
    try {
      const { questionId } = req.params;

      deleteQuestion(questionId);

      res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";

      res.status(404).json({ message });
    }
  },
);
