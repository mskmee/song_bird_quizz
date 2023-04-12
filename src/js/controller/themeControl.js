export const themelistener = () => {
  let isDark = localStorage.getItem("theme") || "white";
  console.log()
  const moonIcon = document.querySelector(".choose__theme-icon_moon");
  const sunIcon = document.querySelector(".choose__theme-icon_sun");
  if(isDark === "dark")  changeTheme(isDark, moonIcon, sunIcon, true)
    moonIcon.addEventListener("click", () => {
      changeTheme(isDark, moonIcon, sunIcon);
  });
  sunIcon.addEventListener("click", () => {
      changeTheme(isDark, moonIcon, sunIcon);
  });
};

function changeTheme(theme, moonIcon, sunIcon, firstLaunch = null) {
  if(theme === "white") {
    localStorage.setItem("theme", "dark");
    console.log(localStorage)
  }else if(!firstLaunch) {
    localStorage.setItem("theme", "white");
  }
  const gradient = document.querySelector(".body__gradient");
  gradient.classList.toggle("body__gradient_dark");
  const body = document.body;
  body.classList.toggle("body_dark");
  const element = document.querySelector(".body__background-elements");
  element.classList.toggle("body__background-elements_dark");
  const bodyBg = document.querySelector(".body__background");
  bodyBg.classList.toggle("body__background_dark");
  const bird = document.querySelector(".header__sing-bird");
  bird.classList.toggle("header__sing-bird_dark");
  const score = document.querySelector(".score");
  score.classList.toggle("score__dark");
  moonIcon.classList.toggle("choose__theme-icon_moon_active");
  sunIcon.classList.toggle("choose__theme-icon_sun_active");
  const icons = document.querySelectorAll(".element__sunny");
  icons.forEach(icon => icon.classList.toggle("element__sunny_dark"));
}
