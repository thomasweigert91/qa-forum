export type Question = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  createdById: number;
  createdByUsername?: string;
};

export type QuestionWithAuthor = Question & {
  createdByUsername: string;
};

export type QuestionWithAnswerCount = QuestionWithAuthor & {
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

export type QuestionParams = {
  id: string;
};

export type CreateQuestionRecord = Omit<Question, "id">;
