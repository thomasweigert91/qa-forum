export type Answer = {
  readonly id: string;
  questionId: string;
  body: string;
  createdAt: Date;
  createdById: string;
};

export type CreateAnswerInput = {
  createdById: string;
  body: string;
};
