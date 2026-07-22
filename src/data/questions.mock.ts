import type { Question } from "../types/question";

export const QUESTIONS: Question[] = [
  {
    id: "question-1",
    title: "Was ist der Unterschied zwischen type und interface?",
    body: `
Ich lerne aktuell TypeScript und bin mir noch unsicher, wann ich
\`type\` und wann ich \`interface\` verwenden sollte.

Gibt es konkrete Anwendungsfälle, in denen eines von beiden klar besser ist?
    `.trim(),
    createdAt: new Date("2026-07-18T08:30:00"),
    createdById: "user-2",
  },
  {
    id: "question-2",
    title: "Warum gibt Array.find möglicherweise undefined zurück?",
    body: `
Ich suche ein Element über seine ID:

\`\`\`ts
const question = questions.find(
  (question) => question.id === questionId,
);
\`\`\`

TypeScript sagt, dass das Ergebnis auch \`undefined\` sein kann.
Warum ist das so und wie gehe ich sauber damit um?
    `.trim(),
    createdAt: new Date("2026-07-19T12:15:00"),
    createdById: "user-1",
  },
  {
    id: "question-3",
    title: "Wie strukturiere ich ein kleines Bun-Projekt?",
    body: `
Ich möchte ein Q&A-Forum mit Bun und TypeScript entwickeln.

Welche Ordnerstruktur ist für den Anfang sinnvoll, ohne das Projekt
unnötig zu kompliziert aufzubauen?
    `.trim(),
    createdAt: new Date("2026-07-20T16:45:00"),
    createdById: "user-3",
  },
  {
    id: "question-4",
    title: "Wann sollte ich async und await verwenden?",
    body: `
Ich verstehe grundsätzlich, dass \`async\` Funktionen ein Promise zurückgeben.

Mir ist aber noch nicht klar, wann ich \`await\` verwenden sollte und
wann ich ein Promise direkt zurückgeben kann.
    `.trim(),
    createdAt: new Date("2026-07-21T09:05:00"),
    createdById: "user-4",
  },
];
