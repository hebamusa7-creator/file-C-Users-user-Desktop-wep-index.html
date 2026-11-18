(() => {
  const root = document.documentElement;
  const body = document.body;
  const minFontSize = 14;
  const maxFontSize = 22;
  const savedFontSize = Number(localStorage.getItem("doghouse-font-size")) || 16;

  function setFontSize(size) {
    const safeSize = Math.min(maxFontSize, Math.max(minFontSize, size));
    root.style.fontSize = `${safeSize}px`;
    localStorage.setItem("doghouse-font-size", String(safeSize));
  }

  setFontSize(savedFontSize);

  document.querySelectorAll("[data-font]").forEach((button) => {
    button.addEventListener("click", () => {
      const currentSize = parseFloat(getComputedStyle(root).fontSize);
      const change = button.dataset.font === "increase" ? 2 : -2;
      setFontSize(currentSize + change);
    });
  });

  const themeButton = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("doghouse-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  function updateThemeButton() {
    if (!themeButton) return;
    const isDark = body.classList.contains("dark-mode");
    themeButton.textContent = isDark ? "☀️ الوضع" : "🌙 الوضع";
    themeButton.setAttribute(
      "aria-label",
      isDark ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي"
    );
  }

  updateThemeButton();

  themeButton?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem(
      "doghouse-theme",
      body.classList.contains("dark-mode") ? "dark" : "light"
    );
    updateThemeButton();
  });

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const name = form.elements.name.value.trim();
    status.textContent = `شكرًا لك يا ${name}، تم تجهيز رسالتك بنجاح. هذا نموذج تجريبي ولا يرسل البيانات.`;
    form.reset();
  });
})();