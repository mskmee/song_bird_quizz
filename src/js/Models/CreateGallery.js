import {ElementCreator} from "./ElementCreator";
import birdsData from "./birdsData";
import birdsDataEn from "./birdsDataEn";
import {QuizAudio} from "./QuizAudio";

export class CreateGallery extends ElementCreator {
  constructor(parent, tag, cssClass, lang) {
    super(parent, tag, cssClass);
    this.lang = lang;
    this.languageBtnListener();
    this.galleryPage = 0;
    this.createGalleryPage();
    this.changeGalleryPage();
  }

  createGalleryPage = () => {
    const data = this.lang === "ru" ? birdsData : birdsDataEn;
    data[this.galleryPage].forEach((item,) => {
      const card = this.createCard(item);
      this.element.append(card);
    });
  };


  languageBtnListener = () => {
    const languageEnBtn = document.querySelector(".choose__lang-en");
    const languageRuBtn = document.querySelector(".choose__lang-ru");
    languageEnBtn.addEventListener("click", () => {
      this.lang = "en";
      this.changeLanguageText();
    });
    languageRuBtn.addEventListener("click", () => {
      this.lang = "ru";
      this.changeLanguageText();
    });
  };

  changeGalleryPage = () => {
    const leftArrow = document.querySelector(".arrow__left");
    const rightArrow = document.querySelector(".arrow__right");
    leftArrow.addEventListener("click", this.moveLeftGallery);
    rightArrow.addEventListener("click", this.moveRightGallery);
  };

  moveLeftGallery = () => {
    this.destroy();
    if(this.galleryPage === 0){
      this.galleryPage = 5;
    }else {
      this.galleryPage--;
    }
    setTimeout(()=> this.createGalleryPage(this.lang), 201);
  };

  moveRightGallery = () => {
    this.destroy();
    if(this.galleryPage === 5){
      this.galleryPage = 0;
    }else {
      this.galleryPage++;
    }
    setTimeout(() => this.createGalleryPage(this.lang),201);

  };

  changeLanguageText = () => {
    this.destroy();
    setTimeout(() => this.createGalleryPage(this.lang),201);
  };

  destroy = () => {
    const cards = document.querySelectorAll(".gallery__card-item");
    cards.forEach(card => card.classList.add("gallery__card-item_hidden"));
    setTimeout(() => {
      while (this.element.firstChild){
        this.element.removeChild(this.element.firstChild);
      }
    }, 200);
  };

  createCard = (data) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("gallery__wrapper");
    let {image, audio, description, name, species} = data;
    const img = new Image(210, 160);
    img.classList.add("card__img", "gallery__card-img");
    img.src = image;
    img.setAttribute("alt", "bird-img");

    const cardHolderTop = document.createElement("div");
    cardHolderTop.classList.add("gallery__card-top");

    const cardDataHolder = document.createElement("div");
    cardDataHolder.classList.add("card__data", "gallery__card-data");

    this.birdName = document.createElement("p");
    this.birdName.classList.add("card__name", "gallery__card-name");
    this.birdName.textContent = name;

    this.birdSecondName = document.createElement("p");
    this.birdSecondName.classList.add("card__second-name", "gallery__second-name");
    this.birdSecondName.textContent = species;

    const musicDiv = document.createElement("div");
    musicDiv.classList.add("music__div", "gallery__music-div");
    this.music = new QuizAudio(musicDiv, audio);
    this.addClassToMusic(musicDiv);
    this.cardDescription = document.createElement("div");
    this.cardDescription.classList.add("card__description", "gallery__card-description");
    this.cardDescription.textContent = description;
    cardDataHolder.append(this.birdName, this.birdSecondName, musicDiv);
    cardHolderTop.append(img, cardDataHolder);
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("gallery__card-item");
    cardWrapper.append(cardHolderTop, this.cardDescription);
    return cardWrapper;
  };

  addClassToMusic = (el) => {
    el.querySelector(".music__control").classList.add("music__control_gallery-card");
    el.querySelector(".music__music-control-wrapper").classList.add("music__music-control-wrapper_gallery-card");
    el.querySelector(".music__duration-control").classList.add("music__duration-control_gallery-card");
    el.querySelector(".music__volume-control-wrapper").classList.add("music__volume-control-wrapper_gallery-card");
    el.querySelector(".music__volume-control").classList.add("music__volume-control_gallery-card");
    el.querySelector(".music__time-wrapper").classList.add("music__time-wrapper_gallery-card");
    el.querySelector(".music__time-start").classList.add("music__time-start_gallery-card");
    el.querySelector(".music__time-end").classList.add("music__time-end_gallery-card");
  };

}