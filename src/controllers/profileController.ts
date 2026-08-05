import type { Request, Response } from "express";

export const renderProfileController = (req: Request, res: Response) => {
  const userId = req.userId;
  res.render("profile/dashboard.html", {
    userId,
  });
};

export const renderUnauthorizedPageController = (
  _req: Request,
  res: Response,
) => {
  res.render("errors/unauthorized.html");
};
