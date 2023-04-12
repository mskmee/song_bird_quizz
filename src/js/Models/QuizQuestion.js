import {ElementCreator} from "./ElementCreator.js";
import {QuizAudio} from "./QuizAudio.js";
import mobyleHolder from "../../assets/images/mobile-random-bird-holder.png";
import holder from "../../assets/images/tablet-random-bird-holder.png";

/**
 * @description create quiz question page
 *
 */
export class QuizQuestion extends ElementCreator {
  /**
   * @param {HTMLElement} parent
   * @param {string} tag
   * @param {string[]} cssClass
   * @param {[array]} questionData
   */
  constructor(parent, tag, cssClass, questionData) {
    super(parent, tag, cssClass);
    this.questionData = questionData;
    this.createQuestionData();
    this.isWin = false;
  }

  /**
   * @description create HTML element with question data and append it to holder
   */
  createQuestionData = () => {
    this.data = document.createElement("div");
    this.data.classList.add("question__data", "data");
    this.img = new Image();
    this.img.src = document.body.clientWidth >= 768 ? holder : mobyleHolder;
    this.img.classList.add("data__img");
    this.birdName = document.createElement("div");
    this.birdName.textContent = "******";
    this.birdName.classList.add("data__name");
    this.data.append(this.img, this.birdName);

    const musicDiv = document.createElement("div");
    musicDiv.classList.add("data__music");
    let {audio} = this.questionData[0];
    this.music = new QuizAudio(musicDiv, audio);
    this.element.append(this.data, musicDiv);
  };

  quizWin = () => {
    this.winName = this.checkLangData();
    let {image} = this.questionData[0];
    this.img.src = image;
    this.img.classList.add("data__img_true");
    this.birdName.textContent = this.winName;
    this.music.element.pause();
    this.music.isPlay = false;
    this.music.controlBtn.classList.remove("music__control_pause");
    this.isWin = true;
  };

  checkLangData = () => {
    if(document.querySelector(".choose__lang-en").classList.contains("choose__lang_active")){
      return this.questionData[1].name;
    }
    return this.questionData[0].name;
  };

  destroyElement = () => {
    while (this.element.firstChild){
      this.element.removeChild(this.element.firstChild);
    }
    while (this.cardHolder.firstChild){
      this.cardHolder.removeChild(this.cardHolder.firstChild);
    }
  };
}