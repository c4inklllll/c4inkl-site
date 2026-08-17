// ==========================================
// ✨ ФАКТ ОБО МНЕ
// ==========================================

const factButton = document.getElementById("factButton");
const factText = document.getElementById("factText");

if (factButton && factText) {

    factButton.addEventListener("click", function () {

        factText.textContent =
            "💗 Я учусь создавать сайты, и это моя первая работа!";

    });

}


// ==========================================
// 💌 АНОНИМНЫЕ СООБЩЕНИЯ
// ==========================================

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("anonymousMessage");
const formStatus = document.getElementById("formStatus");

if (messageForm && messageInput && formStatus) {

    messageForm.addEventListener("submit", async function (event) {

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

                body: JSON.stringify({
                    message: message
                })
            });


            const data = await response.json();


            if (!response.ok) {
                throw new Error(data.error);
            }


            formStatus.textContent =
                "✅ Сообщение отправлено!";

            messageInput.value = "";


        } catch (error) {

            formStatus.textContent =
                "❌ Не удалось отправить. Попробуй ещё раз.";

        }

    });

}



// ==========================================
// ⚙️ НАСТРОЙКИ
// ==========================================

const settingsButton =
    document.getElementById("settingsButton");

const settingsPanel =
    document.getElementById("settingsPanel");

const themeButtons =
    document.querySelectorAll(".theme-choice");

const colorButtons =
    document.querySelectorAll(".color-choice");



// ==========================================
// ⚙️ ОТКРЫТЬ / ЗАКРЫТЬ НАСТРОЙКИ
// ==========================================

if (settingsButton && settingsPanel) {

    settingsButton.addEventListener("click", function (event) {

        event.stopPropagation();

        settingsPanel.classList.toggle("is-open");

    });


    // Закрытие при клике вне настроек

    document.addEventListener("click", function (event) {

        if (
            !settingsPanel.contains(event.target) &&
            !settingsButton.contains(event.target)
        ) {

            settingsPanel.classList.remove("is-open");

        }

    });

}



// ==========================================
// ☀️🌙 ТЕМА
// ==========================================

function changeTheme(theme) {

    if (theme === "dark") {

        document.body.setAttribute(
            "data-theme",
            "dark"
        );

    } else {

        document.body.removeAttribute(
            "data-theme"
        );

    }


    // Обновляем активную кнопку

    themeButtons.forEach(function (button) {

        if (button.dataset.mode === theme) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });


    // Сохраняем выбор

    localStorage.setItem(
        "siteTheme",
        theme
    );

}



// ==========================================
// 🎨 ЦВЕТ
// ==========================================

function changeColor(color) {

    if (color === "pink") {

        document.body.removeAttribute(
            "data-color"
        );

    } else {

        document.body.setAttribute(
            "data-color",
            color
        );

    }


    // Обновляем активную кнопку

    colorButtons.forEach(function (button) {

        if (button.dataset.color === color) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });


    // Сохраняем выбор

    localStorage.setItem(
        "siteColor",
        color
    );

}



// ==========================================
// КНОПКИ ТЕМЫ
// ==========================================

themeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        changeTheme(button.dataset.mode);

    });

});



// ==========================================
// КНОПКИ ЦВЕТА
// ==========================================

colorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        changeColor(button.dataset.color);

    });

});



// ==========================================
// 💾 ЗАГРУЗКА СОХРАНЁННЫХ НАСТРОЕК
// ==========================================

const savedTheme =
    localStorage.getItem("siteTheme") || "light";

const savedColor =
    localStorage.getItem("siteColor") || "pink";


changeTheme(savedTheme);
changeColor(savedColor);
// ==========================================
// 🔤 ШРИФТ
// ==========================================

const fontButtons =
    document.querySelectorAll(".font-choice");


function changeFont(font) {

    document.body.style.fontFamily = font;


    // Обновляем активную кнопку

    fontButtons.forEach(function (button) {

        if (button.dataset.font === font) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });


    // Сохраняем

    localStorage.setItem(
        "siteFont",
        font
    );

}


// Кнопки шрифтов

fontButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        changeFont(
            button.dataset.font
        );

    });

});


// Загружаем сохранённый шрифт

const savedFont =
    localStorage.getItem("siteFont") || "Arial";


changeFont(savedFont);
