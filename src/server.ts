import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { questionApiRouter } from "./routes/questionApiRoutes";
import { pageRouter } from "./routes/pageRoutes";
import cookieParser from "cookie-parser";
import { profileRouter } from "./routes/profileRoutes";
import { authRouter } from "./routes/authRoutes";
import { loadCurrentUser } from "./middleware/loadCurrentUser";
import { myQuestionRouter } from "./routes/myQuestionRoutes";
import { bookmarkRouter } from "./routes/bookmarkRoutes";

const app = express();
const port = Number(process.env["PORT"]) || 8000;

const viewsPath = path.join(process.cwd(), "src", "views");
const publicPath = path.join(process.cwd(), "public");

nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  watch: process.env["NODE_ENV"] !== "production",
  noCache: process.env["NODE_ENV"] !== "production",
});

app.set("view engine", "njk");
app.set("views", viewsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loadCurrentUser);

app.use(
  express.static(publicPath, {
    index: false,
  }),
);

app.use("/", pageRouter);
app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/my-questions", myQuestionRouter);
app.use("/bookmarks", bookmarkRouter);
app.use("/questions", questionApiRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server läuft auf Port ${port}`);
});
