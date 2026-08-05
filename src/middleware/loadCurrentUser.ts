import {
  deleteSessionById,
  findSessionById,
} from "@/repositories/sessionRepository";
import type { NextFunction, Request, Response } from "express";

export const loadCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionId = req.cookies["sessionId"];
  const session = sessionId ? findSessionById(Number(sessionId)) : undefined;
  const sessionIsValid =
    session !== undefined && new Date(session.expiresAt) >= new Date();

  if (session && !sessionIsValid && sessionId) {
    deleteSessionById(Number(sessionId));
  }

  res.locals["isLoggedIn"] = sessionIsValid;
  res.locals["userId"] = sessionIsValid ? session?.userId : undefined;
  res.locals["currentPath"] = req.path;

  next();
};
