export type Answer = {
  readonly id: number;
  questionId: number;
  body: string;
  createdAt: string;
  createdById: number;
  createdByUsername?: string;
};

export type AnswerWithAuthor = Answer & {
  createdByUsername: string;
};

export type CreateAnswerInput = {
  body: string;
};

export type CreateAnswerRecord = Omit<Answer, "id">;
