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