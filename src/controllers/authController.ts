import { deleteSessionById } from "@/repositories/sessionRepository";
import { signIn, signUp } from "@/services/authServices";
import type { SignUpRawInput } from "@/types/user.types";
import type { Request, Response } from "express";

// ----- VIEWS ----- //
export const renderLoginPage = (_req: Request, res: Response) => {
  res.render("auth/login.html");
};

export const renderSignupFormController = (_req: Request, res: Response) => {
  res.render("auth/signup.html");
};

// ----- DATA ----- //
export const postLoginDetailsController = async (
  req: Request<
    Record<string, never>,
    never,
    { email: string; password: string }
  >,
  res: Response,
) => {
  const { password, email } = req.body;

  try {
    const session = await signIn(password, email);

    return res
      .cookie("sessionId", String(session.lastInsertRowid), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env["NODE_ENV"] === "production",
      })
      .redirect("/");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Anmeldung fehlgeschlagen";

    return res.status(401).render("auth/login.html", {
      error: message,
    });
  }
};

export const postSignUpDetailsController = async (
  req: Request<Record<string, never>, never, SignUpRawInput>,
  res: Response,
) => {
  const { username, email, password, passwordConfirmation } = req.body;

  const passwordMatchesConfirmation = password === passwordConfirmation;

  if (!passwordMatchesConfirmation) {
    return res.status(400).render("auth/signup.html", {
      error: "Die Passwörter stimmen nicht überein.",
    });
  }

  const response = await signUp({ username, email, password });

  const isSignedUp = response.success;

  if (!isSignedUp) {
    return res.status(400).render("auth/signup.html", {
      error: response.errorMessage,
    });
  }

  return res.status(201).redirect("/login");
};

export const signOutController = (req: Request, res: Response) => {
  const sessionId = Number(req.cookies["sessionId"]);

  if (Number.isInteger(sessionId)) {
    deleteSessionById(sessionId);
  }

  return res.clearCookie("sessionId").redirect("/");
};
