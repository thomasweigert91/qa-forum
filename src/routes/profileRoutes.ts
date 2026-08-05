import {
  renderProfileController,
  renderUnauthorizedPageController,
} from "@/controllers/profileController";
import { requireAuth } from "@/middleware/requireAuth";
import { Router } from "express";

export const profileRouter = Router();

profileRouter.get("/", requireAuth, renderProfileController);
profileRouter.get("/unauthorized", renderUnauthorizedPageController);
