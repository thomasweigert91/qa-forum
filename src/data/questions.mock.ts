import type { Question } from "../types/question";

export let QUESTIONS: Question[] = [
  {
    id: "question-1",
    title: "Was ist der Unterschied zwischen type und interface?",
    body: "Ist einfach so",
    createdAt: new Date("2026-07-18T08:30:00"),
    createdById: "user-2",
  },
  {
    id: "question-2",
    title: "Warum gibt Array.find möglicherweise undefined zurück?",
    body: "Ist einfach so",
    createdAt: new Date("2026-07-19T12:15:00"),
    createdById: "user-1",
  },
  {
    id: "question-3",
    title: "Wie strukturiere ich ein kleines Bun-Projekt?",
    body: "Ist einfach so",
    createdAt: new Date("2026-07-20T16:45:00"),
    createdById: "user-3",
  },
  {
    id: "question-4",
    title: "Wann sollte ich async und await verwenden?",
    body: "Ist einfach so",
    createdAt: new Date("2026-07-21T09:05:00"),
    createdById: "user-4",
  },
];
