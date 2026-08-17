const settingsButton = document.getElementById("settingsButton");
const settingsPanel = document.getElementById("settingsPanel");


// Открытие шестерёнки
settingsButton.addEventListener("click", function () {
    settingsPanel.classList.toggle("is-open");
});


// Выбор темы
const themeButtons = document.querySelectorAll(".theme-choice");

themeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const theme = button.dataset.mode;

        if (theme === "dark") {
            document.body.setAttribute("data-theme", "dark");
        } else {
            document.body.removeAttribute("data-theme");
        }

        themeButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});


// Выбор цвета
const colorButtons = document.querySelectorAll(".color-choice");

colorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const color = button.dataset.color;

        if (color === "pink") {
            document.body.removeAttribute("data-color");
        } else {
            document.body.setAttribute("data-color", color);
        }

        colorButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});
