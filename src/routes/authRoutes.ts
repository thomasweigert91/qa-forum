import { Router } from "express";

import {
  postLoginDetailsController,
  postSignUpDetailsController,
  renderLoginPage,
  renderSignupFormController,
  signOutController,
} from "@/controllers/authController";

export const authRouter = Router();

authRouter.get("/login", renderLoginPage);
authRouter.post("/login", postLoginDetailsController);
authRouter.get("/signup", renderSignupFormController);
authRouter.post("/signup", postSignUpDetailsController);
authRouter.get("/signout", signOutController);
