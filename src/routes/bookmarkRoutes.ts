import { requireAuth } from "@/middleware/requireAuth";
import { Router } from "express";

export const bookmarkRouter = Router();

bookmarkRouter.get("/", requireAuth, (_req, res) => {
  res.render("bookmarks/index.html");
});
