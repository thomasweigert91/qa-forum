import type { Answer } from "./answer";

export type Question = {
  readonly id: string;
  title: string;
  body: string;
  createdAt: Date;
  createdById: string;
};

export type CreateQuestionInput = {
  title: string;
  body: string;
};

export type UpdateQuestionInput = {
  title: string;
  body: string;
};
