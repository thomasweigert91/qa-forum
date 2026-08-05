const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const sidebarLinks = document.querySelectorAll(".sidebar__link");
const searchInput = document.querySelector('.search input[type="search"]');

const setMenuState = (isOpen) => {
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute(
    "aria-label",
    isOpen ? "Menü schließen" : "Menü öffnen",
  );
};

menuToggle?.addEventListener("click", () => {
  setMenuState(!document.body.classList.contains("menu-open"));
});

menuClose?.addEventListener("click", () => {
  setMenuState(false);
});

sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput?.focus();
  }

  if (event.key === "Escape") {
    setMenuState(false);
    searchInput?.blur();
  }
});

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
