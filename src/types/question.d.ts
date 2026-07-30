export type Question = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  createdById: string;
};

export type QuestionWithAnswerCount = Question & {
  answerCount: number;
};

export type CreateQuestionInput = {
  title: string;
  body: string;
};

export type UpdateQuestionInput = {
  title?: string;
  body?: string;
};

export type QuestionWithFormattedDate = Question & {
  createdAtFormatted: string;
};

export type QuestionParams = Pick<Question, "id">;
