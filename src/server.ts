import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { pageRouter } from "./routes/pageRoutes";
import { questionApiRouter } from "./routes/questionRoutes";
import { runMigrations } from "./database/seed";

runMigrations();

const app = express();
const port = Number(process.env["PORT"]) || 8000;

const viewsPath = path.join(process.cwd(), "src", "views");
const publicPath = path.join(process.cwd(), "public");

nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  watch: true,
  noCache: true,
});

app.set("view engine", "njk");
app.set("views", viewsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(publicPath, {
    index: false,
  }),
);

app.use("/", pageRouter);
app.use("/api/questions", questionApiRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server läuft auf Port ${port}`);
});
