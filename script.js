// ==========================================
// ⚙️ НАСТРОЙКИ САЙТА
// ==========================================

const settingsButton = document.getElementById("settingsButton");
const settingsPanel = document.getElementById("settingsPanel");

const themeButtons = document.querySelectorAll(".theme-choice");
const colorButtons = document.querySelectorAll(".color-choice");


// ==========================================
// ОТКРЫТИЕ ШЕСТЕРЁНКИ
// ==========================================

settingsButton.addEventListener("click", function (event) {

    event.stopPropagation();

    settingsPanel.classList.toggle("is-open");

});


// ==========================================
// ЗАКРЫТЬ НАСТРОЙКИ ПРИ КЛИКЕ СНАРУЖИ
// ==========================================

document.addEventListener("click", function (event) {

    if (
        !settingsPanel.contains(event.target) &&
        !settingsButton.contains(event.target)
    ) {

        settingsPanel.classList.remove("is-open");

    }

});


// ==========================================
// ИЗМЕНЕНИЕ ТЕМЫ
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


    // Активная кнопка

    themeButtons.forEach(function (button) {

        if (button.dataset.mode === theme) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });


    // Сохраняем

    localStorage.setItem(
        "siteTheme",
        theme
    );

}


// ==========================================
// ИЗМЕНЕНИЕ ЦВЕТА
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


    // Активная кнопка

    colorButtons.forEach(function (button) {

        if (button.dataset.color === color) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });


    // Сохраняем

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

        const theme = button.dataset.mode;

        changeTheme(theme);

    });

});


// ==========================================
// КНОПКИ ЦВЕТА
// ==========================================

colorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const color = button.dataset.color;

        changeColor(color);

    });

});


// ==========================================
// ЗАГРУЗКА СОХРАНЁННЫХ НАСТРОЕК
// ==========================================

const savedTheme =
    localStorage.getItem("siteTheme") || "light";

const savedColor =
    localStorage.getItem("siteColor") || "pink";


changeTheme(savedTheme);

changeColor(savedColor);



// ==========================================
// ✨ ФАКТ ОБО МНЕ
// ==========================================

const factButton =
    document.getElementById("factButton");

const factText =
    document.getElementById("factText");


if (factButton && factText) {

    factButton.addEventListener(
        "click",
        function () {

            factText.textContent =
                "💗 Я учусь создавать сайты, и это моя первая работа!";

        }
    );

}


// ==========================================
// 💌 АНОНИМНЫЕ СООБЩЕНИЯ
// ==========================================

const messageForm =
    document.getElementById("messageForm");

const messageInput =
    document.getElementById("anonymousMessage");

const formStatus =
    document.getElementById("formStatus");


if (
    messageForm &&
    messageInput &&
    formStatus
) {

    messageForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const message =
                messageInput.value.trim();


            if (!message) {

                formStatus.textContent =
                    "❌ Напиши сообщение!";

                return;

            }


            formStatus.textContent =
                "Отправляем...";


            try {

                const response =
                    await fetch(
                        "/api/send-message",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    message: message
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.error
                    );

                }


                formStatus.textContent =
                    "✅ Сообщение отправлено!";

                messageInput.value = "";


            } catch (error) {

                formStatus.textContent =
                    "❌ Не удалось отправить. Попробуй ещё раз.";

            }

        }
    );

}
