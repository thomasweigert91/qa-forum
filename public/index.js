const deleteQuestionForms = document.querySelectorAll(
  ".question-card__delete-form",
);

deleteQuestionForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const response = await fetch(form.action, { method: "DELETE" });

    if (response.ok) {
      window.location.href = "/";
      return;
    }

    window.alert("Die Frage konnte nicht gelöscht werden.");
  });
});
