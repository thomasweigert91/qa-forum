import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  searchQuestions,
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

deleteQuestion("user-1", "question-2");

console.log(questions);

updateQuestion(
  "question-4",
  { title: "NEUER TITLE", body: "Irgendwas neues" },
  "user-4",
);

console.log(questions);

console.log(searchQuestions("bun"));
