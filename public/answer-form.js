const toggleButton = document.querySelector("[data-answer-form-toggle]");
const formSection = document.querySelector("[data-answer-form-section]");
const answerTextarea = document.querySelector("#answer-body");

toggleButton?.addEventListener("click", () => {
  if (!(formSection instanceof HTMLElement)) {
    return;
  }

  const willOpen = formSection.hidden;

  formSection.hidden = !willOpen;
  toggleButton.setAttribute("aria-expanded", String(willOpen));

  if (willOpen && answerTextarea instanceof HTMLTextAreaElement) {
    answerTextarea.focus();
  }
});
