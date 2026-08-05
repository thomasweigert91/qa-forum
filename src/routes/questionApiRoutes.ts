import { Router } from "express";

import {
  createAnswerController,
  createQuestionController,
  deleteQuestionController,
  updateQuestionController,
} from "@/controllers/questionApiController";
import { requireAuth } from "@/middleware/requireAuth";

export const questionApiRouter = Router();

questionApiRouter.post("/", requireAuth, createQuestionController);
questionApiRouter.patch("/:id", requireAuth, updateQuestionController);
questionApiRouter.post("/:id/answers", requireAuth, createAnswerController);
questionApiRouter.post("/:id/delete", requireAuth, deleteQuestionController);
