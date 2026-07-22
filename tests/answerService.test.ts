import { beforeEach, describe, expect, test } from "bun:test";
import { answers } from "../src/data/answers";
import {
  createAnswer,
  deleteAnswer,
  getAnswerById,
  getAnswersByQuestionId,
  updateAnswer,
} from "../src/services/answerServices";

describe("anserService", () => {
  beforeEach(() => {
    answers.length = 0;
  });

  test("creates an answer", () => {
    const answer = createAnswer("user-1", "question-1", {
      body: "I am an test answer",
    });

    expect(answer.body).toBe("I am an test answer");
    expect(answer.createdById).toBe("user-1");
    expect(answer.questionId).toBe("question-1");
    expect(answers.some((a) => a.id === answer.id)).toBeTrue();
  });

  test("gets answer by answerId", () => {
    const answer = createAnswer("user-1", "question-1", {
      body: "I am an test answer",
    });

    const createdAnswer = getAnswerById(answer.id);

    expect(createdAnswer).toBeDefined();
    expect(createdAnswer.id).toBe(answer.id);
  });

  test("gets all answers based on questionId", () => {
    createAnswer("user-1", "question-2", {
      body: "I am an test answer",
    });
    createAnswer("user-2", "question-2", {
      body: "Hello world",
    });
    createAnswer("user-3", "question-2", {
      body: "Just for testing purposes",
    });

    const answers = getAnswersByQuestionId("quesion-2");
    expect(answers).toBeDefined();
    expect(answers).toHaveLength(3);
  });

  test("updates an answer", () => {
    const answer = createAnswer("user-1", "question-2", {
      body: "I am an test answer",
    });

    const updatedAnswer = updateAnswer(answer.id, "user-1", {
      body: "I am an updated answer!",
    });

    expect(answer.body).toBe("I am an updated answer!");
    expect(getAnswerById(answer.id)).toEqual(updatedAnswer);
  });

  test("deletes an answer", () => {
    const answer = createAnswer("user-1", "question-2", {
      body: "I am an test answer",
    });

    deleteAnswer(answer.id, "user-1");
    expect(answers).toHaveLength(0);
  });

  test("deleting answer with wrong id throws error", () => {
    const answer = createAnswer("user-1", "question-2", {
      body: "I am an test answer",
    });
    expect(() => deleteAnswer(answer.id, "user-2")).toThrowError();
  });
});
