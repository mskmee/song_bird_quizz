import {ElementCreator} from "./ElementCreator.js";
import {QuizAudio} from "./QuizAudio.js";
import {languageData} from "./languageData";

export class CreateQuizCardAnswer extends ElementCreator {
  constructor(parent, tag, cssClass, dataArr, lang) {
    super(parent, tag, cssClass);
    this.cardHolder = document.createElement("div");
    this.cardHolder.classList.add("card__top");
    this.dataArr = dataArr;
    this.activeLang = lang;
  }

  createCard = (number) => {
    let {image, audio, description, name, species} = this.dataArr[number];
    this.img = new Image(210, 160);
    this.img.classList.add("card__img");
    this.img.src = image;
    this.img.setAttribute("alt", "bird-img");

    const cardDataHolder = document.createElement("div");
    cardDataHolder.classList.add("card__data");

    this.birdName = document.createElement("p");
    this.birdName.classList.add("card__name");
    this.birdName.textContent = name;

    this.birdSecondName = document.createElement("p");
    this.birdSecondName.classList.add("card__second-name");
    this.birdSecondName.textContent = species;

    const musicDiv = document.createElement("div");
    musicDiv.classList.add("music__div");
    this.music = new QuizAudio(musicDiv, audio);
    this.addClassToMusic(musicDiv);
    this.cardDescription = document.createElement("div");
    this.cardDescription.classList.add("card__description");
    this.cardDescription.textContent = description;
    cardDataHolder.append(this.birdName, this.birdSecondName, musicDiv);
    this.cardHolder.append(this.img, cardDataHolder);
    this.element.append(this.cardHolder, this.cardDescription);
  };

  createCardHolder = () => {
    const cardDataHolder = document.createElement("div");
    cardDataHolder.classList.add("card__data");
    this.cardDescription = document.createElement("div");
    this.cardDescription.classList.add("card__description");
    this.cardDescription.innerHTML = `<p class='card__data-holder'>${languageData[this.activeLang][4].cardHolder[0]}.</p>` +
      `<p class='card__data-holder'>${languageData[this.activeLang][4].cardHolder[1]}</p>` +
      `<p class='card__data-holder'>${languageData[this.activeLang][4].cardHolder[2]}</p>`;
    this.element.append(this.cardDescription);
  };

  destroyHolder = () => {
    while (this.element.firstChild){
      this.element.removeChild(this.element.firstChild);
    }
    while (this.cardHolder.firstChild){
      this.cardHolder.removeChild(this.cardHolder.firstChild);
    }
  };

  addClassToMusic = (el) => {
    el.querySelector(".music__control").classList.add("music__control_card");
    el.querySelector(".music__music-control-wrapper").classList.add("music__music-control-wrapper_card");
    el.querySelector(".music__duration-control").classList.add("music__duration-control_card");
    el.querySelector(".music__volume-control-wrapper").classList.add("music__volume-control-wrapper_card");
    el.querySelector(".music__volume-control").classList.add("music__volume-control_card");
    el.querySelector(".music__time-wrapper").classList.add("music__time-wrapper_card");
    el.querySelector(".music__time-start").classList.add("music__time-start_card");
    el.querySelector(".music__time-end").classList.add("music__time-end_card");
  };

  endGameMessage = (score) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("game-end");
    const title = document.createElement("h3");
    title.classList.add("game-end__title");
    title.textContent = `${languageData[this.activeLang][5].winCard[3]}`;
    const message = document.createElement("p");
    message.innerHTML = `<span class="m-1">${languageData[this.activeLang][5].winCard[0]}</span>
 <b>${score}</b> <span class="m-2">${languageData[this.activeLang][5].winCard[1]}</span> <b>30</b> 
 <span class="m-3">${languageData[this.activeLang][5].winCard[2]}</span> :)`;
    message.classList.add("game-end__text");
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("game-end__img");
    wrapper.append(title, message, imgDiv);
    this.element.append(wrapper);
  };
}