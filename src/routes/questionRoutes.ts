import { Router } from "express";

import {
  createAnswerController,
  createQuestionController,
  deleteQuestionController,
  getQuestionsByIdController,
  getQuestionsController,
  updateQuestionController,
} from "@/controllers/questionRouteController";

export const questionApiRouter = Router();

questionApiRouter.get("/", getQuestionsController);
questionApiRouter.post("/", createQuestionController);
questionApiRouter.patch("/:id", updateQuestionController);
questionApiRouter.get("/:id", getQuestionsByIdController);
questionApiRouter.delete("/:id", deleteQuestionController);
questionApiRouter.post("/:id/answers", createAnswerController);
