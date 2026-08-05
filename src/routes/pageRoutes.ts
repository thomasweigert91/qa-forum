import { Router } from "express";

import {
  renderCreateQuestionPage,
  renderIndexPage,
  renderQuestionDetailPage,
} from "@/controllers/pageController";
import { requireAuth } from "@/middleware/requireAuth";

export const pageRouter = Router();

pageRouter.get("/", renderIndexPage);
pageRouter.get("/new", requireAuth, renderCreateQuestionPage);
pageRouter.get("/questions/:id", renderQuestionDetailPage);
