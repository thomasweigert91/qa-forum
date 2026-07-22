import type { Answer } from "./answer";
import type { Question } from "./question";

export type User = {
  readonly id: string;
  username: string;
  questions: Question[];
  answers: Answer[];
};
