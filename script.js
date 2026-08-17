// Кнопка «Факт обо мне»
const factButton = document.getElementById("factButton");
const factText = document.getElementById("factText");

if (factButton && factText) {
  factButton.addEventListener("click", () => {
    factText.textContent =
      "💗 Я учусь создавать сайты, и это моя первая работа!";
  });
}

// Анонимные сообщения
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("anonymousMessage");
const formStatus = document.getElementById("formStatus");

if (messageForm && messageInput && formStatus) {
  messageForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();
    formStatus.textContent = "Отправляем...";

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      formStatus.textContent = "✅ Сообщение отправлено!";
      messageInput.value = "";
    } catch {
      formStatus.textContent =
        "❌ Не удалось отправить. Попробуй ещё раз.";
    }
  });
}
// Настройки: шестерёнка, тема и цвет
const settingsButton = document.getElementById("settingsButton");
const settingsPanel = document.getElementById("settingsPanel");
const themeChoices = document.querySelectorAll(".theme-choice");
const colorChoices = document.querySelectorAll(".color-choice");

let selectedTheme = localStorage.getItem("siteTheme") || "light";
let selectedColor = localStorage.getItem("siteColor") || "pink";

function applyAppearance() {
  document.body.dataset.theme = selectedTheme;
  document.body.dataset.color = selectedColor;

  themeChoices.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === selectedTheme);
  });

  colorChoices.forEach((button) => {
    button.classList.toggle("active", button.dataset.color === selectedColor);
  });

  localStorage.setItem("siteTheme", selectedTheme);
  localStorage.setItem("siteColor", selectedColor);
}

if (settingsButton && settingsPanel) {
  settingsButton.addEventListener("click", (event) => {
    event.stopPropagation();
    settingsPanel.classList.toggle("is-open");
  });

  settingsPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    settingsPanel.classList.remove("is-open");
  });

  themeChoices.forEach((button) => {
    button.addEventListener("click", () => {
      selectedTheme = button.dataset.mode;
      applyAppearance();
    });
  });

  colorChoices.forEach((button) => {
    button.addEventListener("click", () => {
      selectedColor = button.dataset.color;
      applyAppearance();
    });
  });

  applyAppearance();
}
