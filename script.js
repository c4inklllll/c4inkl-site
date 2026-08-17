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
