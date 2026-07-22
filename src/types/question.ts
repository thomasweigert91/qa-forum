import type { Answer } from "./answer";

export type Question = {
  readonly id: string;
  title: string;
  body: string;
  createdAt: Date;
  createdById: string;
};
