import {languageData} from "../Models/languageData";

export class languageControl {
  constructor(language) {
    this.activeLanguage = language;
    this.setListenersOnBts();
  }

  changeLanguageToRu = () => {
    this.activeLanguage = "ru";
    this.languageRuBtn.classList.toggle("choose__lang_active");
    this.languageEnBtn.classList.toggle("choose__lang_active");
    this.changeTextLanguage(languageData.ru[0].header);
    localStorage.setItem("language", "ru");
  };

  changeLanguageToEn = () => {
    this.activeLanguage = "en";
    this.languageRuBtn.classList.toggle("choose__lang_active");
    this.languageEnBtn.classList.toggle("choose__lang_active");
    this.changeTextLanguage(languageData.en[0].header);
    localStorage.setItem("language", "en");
  };

  setListenersOnBts = () => {
    this.languageEnBtn = document.querySelector(".choose__lang-en");
    this.languageRuBtn = document.querySelector(".choose__lang-ru");
    this.languageRuBtn.addEventListener("click", this.changeLanguageToRu);
    this.languageEnBtn.addEventListener("click", this.changeLanguageToEn);
    if(this.activeLanguage === "en") this.changeLanguageToEn();
  };

  changeTextLanguage = (langArr) => {
    let [langEn, langRu, score, main, quiz, gallery, greetings] = langArr;
    document.querySelector(".choose__lang-en").textContent = langEn;
    document.querySelector(".choose__lang-ru").textContent = langRu;
    document.querySelector(".score__text").textContent = score;
    const navLinks = document.querySelectorAll(".nav__link");
    navLinks[0].textContent = main;
    navLinks[1].textContent = quiz;
    navLinks[2].textContent = gallery;
    if(document.querySelector(".page__welcome")){
      document.querySelector(".page__welcome").textContent = greetings;
    }
  };
}
