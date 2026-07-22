import type { Answer } from "../types/answer";

export const ANSWERS: Answer[] = [
  {
    id: "answer-1",
    questionId: "question-1",
    body: `
Beide können Objektstrukturen beschreiben.

Interfaces eignen sich besonders gut für erweiterbare Objektverträge.
Types sind flexibler und können zusätzlich Unions, Tuples und primitive
Typen abbilden.
    `.trim(),
    createdAt: new Date("2026-07-18T09:10:00"),
    createdById: "user-1",
  },
  {
    id: "answer-2",
    questionId: "question-1",
    body: `
Für viele einfache Objektmodelle kannst du beide verwenden.

Wichtiger als eine allgemeine Regel ist, dass du innerhalb des Projekts
eine konsistente Entscheidung triffst.
    `.trim(),
    createdAt: new Date("2026-07-18T10:25:00"),
    createdById: "user-3",
  },
  {
    id: "answer-3",
    questionId: "question-2",
    body: `
\`find\` gibt \`undefined\` zurück, wenn kein passendes Element gefunden wird.

Du solltest deshalb das Ergebnis prüfen:

\`\`\`ts
const question = questions.find(
  (question) => question.id === questionId,
);

if (!question) {
  throw new Error("Question not found");
}
\`\`\`
    `.trim(),
    createdAt: new Date("2026-07-19T12:40:00"),
    createdById: "user-2",
  },
  {
    id: "answer-4",
    questionId: "question-3",
    body: `
Beginne mit einer kleinen, feature-basierten Struktur.

Zum Beispiel:

\`\`\`txt
src/
  questions/
  users/
  answers/
  index.ts
\`\`\`

Weitere Unterteilungen solltest du erst ergänzen, wenn tatsächlich
unterschiedliche Verantwortlichkeiten entstehen.
    `.trim(),
    createdAt: new Date("2026-07-20T17:20:00"),
    createdById: "user-4",
  },
  {
    id: "answer-5",
    questionId: "question-4",
    body: `
Verwende \`await\`, wenn du innerhalb einer Funktion mit dem aufgelösten
Wert weiterarbeiten oder Fehler dort behandeln möchtest.

Falls du das Promise nur weiterreichen möchtest, kannst du es direkt
zurückgeben.
    `.trim(),
    createdAt: new Date("2026-07-21T09:35:00"),
    createdById: "user-3",
  },
];
