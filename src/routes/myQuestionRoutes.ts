import { requireAuth } from "@/middleware/requireAuth";
import { Router } from "express";

export const myQuestionRouter = Router();

myQuestionRouter.get("/", requireAuth, (_req, res) => {
  res.render("questions/mine.html");
});
