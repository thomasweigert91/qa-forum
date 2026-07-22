import { beforeEach, describe, expect, test } from "bun:test";
import { questions } from "../src/data/questions";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  searchQuestions,
} from "../src/services/questionService";

describe("questionService", () => {
  beforeEach(() => {
    questions.length = 0;
  });

  test("creates a question", () => {
    const question = createQuestion("user-1", {
      title: "Was ist Bun?",
      body: "Welche Aufgabe übernimmt Bun?",
    });

    expect(question.title).toBe("Was ist Bun?");
    expect(question.body).toBe("Welche Aufgabe übernimmt Bun?");
    expect(question.createdById).toBe("user-1");
    expect(question.id).toBeString();
    expect(question.createdAt).toBeInstanceOf(Date);
  });

  test("finds a question by id", () => {
    const createdQuestion = createQuestion("user-3", {
      title: "Was ist Bun?",
      body: "Keine Ahnung",
    });

    const result = getQuestionById(createdQuestion.id);
    expect(result).toEqual(createdQuestion);
  });

  test("returns undefined when a question does not exist", () => {
    const result = getQuestionById("unknown-id");
    expect(result).toBeUndefined();
  });

  test("searches question by title", () => {
    createQuestion("user-1", {
      title: "TypeScript Interfaces",
      body: "Wie funktionieren Interfaces?",
    });

    createQuestion("user-2", {
      title: "Bun installieren",
      body: "Wie installiere ich Bun?",
    });

    const result = searchQuestions("typescript");
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe("TypeScript Interfaces");
  });

  test("search is case insensitive", () => {
    createQuestion("user-1", {
      title: "TypeScript Interfaces",
      body: "Wie funktionieren Interfaces?",
    });

    const result = searchQuestions("TYPESCRIPT");
    expect(result).toHaveLength(1);
  });

  test("deletes a question", () => {
    const question = createQuestion("user-2", {
      title: "Bun installieren",
      body: "Wie installiere ich Bun?",
    });

    deleteQuestion("user-2", question.id);

    expect(questions).toHaveLength(0);
  });
});
