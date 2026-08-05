import { getAnswersByQuestionId } from "@/services/answerServices";
import {
  getQuestionById,
  getQuestionsWithAnswerCount,
} from "@/services/questionService";
import type { Request, Response } from "express";

export const renderIndexPage = (_req: Request, res: Response) => {
  const questions = getQuestionsWithAnswerCount();

  res.render("questions/index.html", {
    questions,
  });
};

export const renderCreateQuestionPage = (req: Request, res: Response) => {
  const userId = req.userId;
  res.render("questions/create.html", { userId });
};

export const renderQuestionDetailPage = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  const questionId = Number(id);

  const question = getQuestionById(questionId);

  if (!question) {
    return res.status(404).render("errors/404.html", {
      message: "Question does not exist",
    });
  }

  const answers = getAnswersByQuestionId(questionId);

  return res.render("questions/detail.html", {
    question,
    answers,
  });
};
