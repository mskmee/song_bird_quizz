import '../style/style.scss';
import {CreateQuiz} from "./Models/CreateQuiz.js";
import {themelistener} from "./controller/themeControl";
import {setPageIndicator} from "./controller/pageIndicator";
import {languageControl} from "./controller/languageControl";
import {CreateGallery} from "./Models/CreateGallery";

let language = localStorage.getItem("language") || "ru";
const languageListener = new languageControl(language);
if(document.querySelector(".body-quiz")){
  const quiz = new CreateQuiz(document.querySelector(".page__quiz"), "div",
    ["page__quiz-main"], languageListener.activeLanguage);
}
if(document.querySelector(".page__gallery")){
  const gallery = new CreateGallery(document.querySelector(".page__gallery"), "div",
    ["page__gallery-main"], languageListener.activeLanguage);
}

themelistener();
setPageIndicator();