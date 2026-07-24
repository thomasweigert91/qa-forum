import { Router } from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../services/questionService";
import type {
  CreateQuestionInput,
  UpdateQuestionInput,
} from "../types/question";

export const questionRouter = Router();

questionRouter.get("/", (_req, res) => {
  const questions = getQuestions();

  res.json(questions);
});

questionRouter.get("/:questionId", (req, res) => {
  const question = getQuestionById(req.params.questionId);

  res.json(question);
});

questionRouter.post("/", (req, res) => {
  const input = req.body as CreateQuestionInput;

  const question = createQuestion("user-1", input);

  res.status(201).json(question);
});

questionRouter.patch("/:questionId", (req, res) => {
  const input = req.body as UpdateQuestionInput;

  const question = updateQuestion(req.params.questionId, input);

  res.json(question);
});

questionRouter.delete("/:questionId", (req, res) => {
  deleteQuestion(req.params.questionId);

  res.status(204).send();
});
