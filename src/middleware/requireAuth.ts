import {
  deleteSessionById,
  findSessionById,
} from "@/repositories/sessionRepository";
import type { NextFunction, Request, Response } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reject = () => {
    return res.redirect("/login");
  };

  const sessionId = req.cookies["sessionId"];

  if (!sessionId) {
    return reject();
  }

  const session = findSessionById(Number(sessionId));

  if (session == null) {
    return reject();
  }

  const sessionExpired = new Date(session.expiresAt) < new Date();

  if (sessionExpired) {
    deleteSessionById(Number(sessionId));

    return reject();
  }

  req.userId = session.userId;

  next();
};
