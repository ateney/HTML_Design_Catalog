const themeButtons = document.querySelectorAll(".theme-toggle");
const menuButtons = document.querySelectorAll(".menu-button");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
    const isDark = theme === "dark";
    document.body.dataset.theme = theme;

    themeButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(isDark));
        button.setAttribute("aria-label", `${isDark ? "ライト" : "ダーク"}モードに切り替え`);
    });

    if (themeColor) {
        themeColor.content = isDark ? "#171920" : "#f4f3ef";
    }
}

menuButtons.forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", `${button.dataset.name}メニューを開く`);

    button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-pressed") !== "true";
        button.setAttribute("aria-pressed", String(isOpen));
        button.setAttribute("aria-label", `${button.dataset.name}メニューを${isOpen ? "閉じる" : "開く"}`);
    });
});

themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
        setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
    });
});
