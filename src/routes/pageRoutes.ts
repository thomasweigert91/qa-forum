import { Router, type Request } from "express";

import {
  getQuestionById,
  getQuestionsWithAnswerCount,
} from "../services/questionService";
import { getAnswersByQuestionId } from "../services/answerServices";

export const pageRouter = Router();

function formatDate(date: string | Date): string {
  const parsedDate = new Date(date);

  const dd = String(parsedDate.getDate()).padStart(2, "0");
  const mm = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const yyyy = parsedDate.getFullYear();
  const hh = String(parsedDate.getHours()).padStart(2, "0");
  const min = String(parsedDate.getMinutes()).padStart(2, "0");

  return `${dd}.${mm}.${yyyy} / ${hh}:${min}`;
}

pageRouter.get("/", (_req, res) => {
  const questions = getQuestionsWithAnswerCount().map((question) => ({
    ...question,
    createdAtFormatted: formatDate(question.createdAt),
  }));

  res.render("questions/index.html", {
    questions,
  });
});

pageRouter.get("/new", (_req, res) => {
  res.render("questions/create.html");
});

pageRouter.get(
  "/questions/:questionId",
  (req: Request<{ questionId: string }>, res) => {
    const { questionId } = req.params;

    const question = getQuestionById(questionId);

    if (!question) {
      return res.status(404).render("errors/404.html", {
        message: "Question does not exist",
      });
    }

    const answers = getAnswersByQuestionId(questionId).map((answer) => ({
      ...answer,
      createdAtFormatted: formatDate(answer.createdAt),
    }));

    const formattedQuestion = {
      ...question,
      createdAtFormatted: formatDate(question.createdAt),
    };

    return res.render("questions/detail.html", {
      question: formattedQuestion,
      answers,
    });
  },
);
