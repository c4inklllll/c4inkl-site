document.getElementById("helloButton").addEventListener("click", () => {
  alert("Спасибо, что заглянули на мой сайт!");
});

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeButton.textContent = "☀️ Светлая тема";
  } else {
    themeButton.textContent = "🌙 Тёмная тема";
  }
});

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("anonymousMessage");
const formStatus = document.getElementById("formStatus");

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
  } catch (error) {
    formStatus.textContent = "❌ Не удалось отправить. Попробуй ещё раз.";
  }
});
