export type Answer = {
  readonly id: string;
  questionId: string;
  body: string;
  createdAt: string;
  createdById: string;
};

export type CreateAnswerInput = {
  body: string;
};
