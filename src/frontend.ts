import { createAnswer } from "./services/answerServices";
import { createQuestion, getQuestions } from "./services/questionService";

const answer = createAnswer(
  crypto.randomUUID(),
  "d7e6562f-aab8-4b66-8c68-b6993e7ed580",
  { body: "Noch eine Test Antwort" },
);

console.log(answer);

const questions = getQuestions();

console.log(questions);
