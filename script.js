// ===============================
// ФАКТ ОБО МНЕ
// ===============================

const factButton = document.getElementById("factButton");
const factText = document.getElementById("factText");

if (factButton && factText) {
  factButton.addEventListener("click", () => {
    factText.textContent =
      "💗 Я учусь создавать сайты, и это моя первая работа!";
  });
}


// ===============================
// АНОНИМНЫЕ СООБЩЕНИЯ
// ===============================

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("anonymousMessage");
const formStatus = document.getElementById("formStatus");

if (messageForm && messageInput && formStatus) {
  messageForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();

    if (!message) {
      formStatus.textContent = "❌ Напиши сообщение!";
      return;
    }

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


// ===============================
// ⚙️ НАСТРОЙКИ
// ===============================

const settingsButton = document.getElementById("settingsButton");
const settingsPanel = document.getElementById("settingsPanel");

const themeButtons = document.querySelectorAll(".theme-choice");
const colorButtons = document.querySelectorAll(".color-choice");


// ===============================
// ОТКРЫТЬ / ЗАКРЫТЬ НАСТРОЙКИ
// ===============================

if (settingsButton && settingsPanel) {

  settingsButton.addEventListener("click", (event) => {
    event.stopPropagation();

    settingsPanel.classList.toggle("is-open");
  });


  // Закрываем настройки, если кликнули вне окна
  document.addEventListener("click", (event) => {

    if (
      !settingsPanel.contains(event.target) &&
      !settingsButton.contains(event.target)
    ) {
      settingsPanel.classList.remove("is-open");
    }

  });
}


// ===============================
// ТЕМА
// ===============================

function setTheme(theme) {

  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.removeAttribute("data-theme");
  }


  // Обновляем активную кнопку
  themeButtons.forEach((button) => {

    button.classList.toggle(
      "active",
      button.dataset.mode === theme
    );

  });


  // Сохраняем настройку
  localStorage.setItem("siteTheme", theme);
}


// ===============================
// ЦВЕТ
// ===============================

function setColor(color) {

  if (color === "pink") {
    document.body.removeAttribute("data-color");
  } else {
    document.body.setAttribute("data-color", color);
  }


  // Обновляем активную кнопку
  colorButtons.forEach((button) => {

    button.classList.toggle(
      "active",
      button.dataset.color === color
    );

  });


  // Сохраняем настройку
  localStorage.setItem("siteColor", color);
}


// ===============================
// КНОПКИ ТЕМЫ
// ===============================

themeButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const theme = button.dataset.mode;

    setTheme(theme);

  });

});


// ===============================
// КНОПКИ ЦВЕТА
// ===============================

colorButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const color = button.dataset.color;

    setColor(color);

  });

});


// ===============================
// ЗАГРУЗКА СОХРАНЁННЫХ НАСТРОЕК
// ===============================

const savedTheme =
  localStorage.getItem("siteTheme") || "light";

const savedColor =
  localStorage.getItem("siteColor") || "pink";


setTheme(savedTheme);
setColor(savedColor);
