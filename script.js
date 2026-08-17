// ==========================================
// ✨ ФАКТ ОБО МНЕ
// ==========================================

const factButton = document.getElementById("factButton");
const factText = document.getElementById("factText");

if (factButton && factText) {

    factButton.addEventListener("click", function () {

        factText.textContent =
            "16 y.o from KZ";

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
// 🎵 КАСТОМНЫЙ ПЛЕЕР

const favoriteTrack = document.getElementById("favoriteTrack");
const playTrack = document.getElementById("playTrack");
const trackProgress = document.getElementById("trackProgress");
const trackTime = document.getElementById("trackTime");
const trackDuration = document.getElementById("trackDuration");
const volumeTrack = document.getElementById("volumeTrack");
const volumeProgress = document.getElementById("volumeProgress");

function formatTime(seconds) {
    if (!isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return minutes + ":" + String(secs).padStart(2, "0");
}


// ▶ PLAY / PAUSE

playTrack.addEventListener("click", () => {

    if (favoriteTrack.paused) {
        favoriteTrack.play();

        playTrack.textContent = "❚❚";
    } else {
        favoriteTrack.pause();

        playTrack.textContent = "▶";
    }

});


// ⏱ ДЛИТЕЛЬНОСТЬ

favoriteTrack.addEventListener("loadedmetadata", () => {

    trackDuration.textContent =
        formatTime(favoriteTrack.duration);

});


// 📊 ПРОГРЕСС

favoriteTrack.addEventListener("timeupdate", () => {

    if (favoriteTrack.duration) {

        const progress =
            (favoriteTrack.currentTime /
            favoriteTrack.duration) * 100;

        trackProgress.value = progress;

        trackTime.textContent =
            formatTime(favoriteTrack.currentTime);
    }

});


// 🎚 ПЕРЕМЕЩЕНИЕ ПО ТРЕКУ

trackProgress.addEventListener("input", () => {

    if (favoriteTrack.duration) {

        favoriteTrack.currentTime =
            (trackProgress.value / 100) *
            favoriteTrack.duration;

    }

});


// 🔊 ГРОМКОСТЬ

// 🔊 ГРОМКОСТЬ 1–100

volumeProgress.addEventListener("input", () => {

    const volume = Number(volumeProgress.value);

    favoriteTrack.volume = volume / 100;

    favoriteTrack.muted = false;

    if (volume <= 1) {
        volumeTrack.textContent = "🔇";
    } else if (volume <= 50) {
        volumeTrack.textContent = "🔈";
    } else {
        volumeTrack.textContent = "🔊";
    }

});


// 🔇 КНОПКА ОТКЛЮЧЕНИЯ ЗВУКА

volumeTrack.addEventListener("click", () => {

    if (favoriteTrack.muted) {

        favoriteTrack.muted = false;

        volumeTrack.textContent =
            volumeProgress.value <= 50 ? "🔈" : "🔊";

    } else {

        favoriteTrack.muted = true;

        volumeTrack.textContent = "🔇";

    }

});

// 🎵 ТРЕК ЗАКОНЧИЛСЯ

favoriteTrack.addEventListener("ended", () => {

    playTrack.textContent = "▶";
    trackProgress.value = 0;
    trackTime.textContent = "0:00";

});
