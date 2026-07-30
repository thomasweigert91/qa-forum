import { Router } from "express";

import {
  renderCreateQuestionPage,
  renderIndexPage,
  renderQuestionDetailPage,
} from "@/controllers/pageRouteController";

export const pageRouter = Router();

pageRouter.get("/", renderIndexPage);
pageRouter.get("/new", renderCreateQuestionPage);
pageRouter.get("/questions/:id", renderQuestionDetailPage);
