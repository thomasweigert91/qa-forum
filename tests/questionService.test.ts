import { beforeEach, describe, expect, test } from "bun:test";
import { questions } from "../src/data/questions";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestionsByTitle,
  updateQuestion,
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
    console.log(result);
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

    const result = getQuestionsByTitle("typescript");
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe("TypeScript Interfaces");
  });

  test("search is case insensitive", () => {
    createQuestion("user-1", {
      title: "TypeScript Interfaces",
      body: "Wie funktionieren Interfaces?",
    });

    const result = getQuestionsByTitle("TYPESCRIPT");
    expect(result).toHaveLength(1);
  });

  test("updates a question", () => {
    const question = createQuestion("user-1", {
      title: "TypeScript Interfaces",
      body: "Wie funktionieren Interfaces?",
    });

    const updatedQuestion = updateQuestion(question.id, {
      body: "IST UPDATED",
      title: "DIES WURDE UPDATED",
    });

    if (!updatedQuestion) {
      throw new Error("Expected question to be updated");
    }

    expect(updatedQuestion.title).toBe("DIES WURDE UPDATED");
    expect(getQuestionById(question.id)).toEqual(updatedQuestion);
    expect(updatedQuestion.body).toBe("IST UPDATED");
  });

  test("deletes a question", () => {
    const question = createQuestion("user-2", {
      title: "Bun installieren",
      body: "Wie installiere ich Bun?",
    });

    deleteQuestion(question.id);

    expect(questions).toHaveLength(0);
  });
});
