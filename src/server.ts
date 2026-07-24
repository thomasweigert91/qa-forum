import express from "express";
import { questionRouter } from "./routes/questionRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static("public"));

app.use("/api/questions", questionRouter);

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
