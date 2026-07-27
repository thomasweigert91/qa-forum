import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "./services/questionService";

const questions = getQuestions();
const question = getQuestionById("question-4");
console.log("single-question", question);

const newQuestion = createQuestion("user-3", {
  body: "Warum ist die Banane krumm",
  title: "Dumme Frage",
});
console.log("new Question", newQuestion);
console.log(questions);

console.log(questions);

console.log(questions);
