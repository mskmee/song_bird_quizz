import {ElementCreator} from "./ElementCreator.js";

export class PopUp extends ElementCreator {
  constructor(parent, tag, cssClass) {
    super(parent, tag, cssClass);
  }

  winner = (num) => {
    const popUpWrapper = document.createElement("div");
    popUpWrapper.classList.add("winner__wrapper", "d-flex", "justify-content-between", "flex-column",
      "align-items-center", "p-2", "m-2", "rounded-5", "bg-light", "h-75");
    this.popUpImg = document.createElement("img");
    this.popUpImg.src = "https://cdn.pixabay.com/photo/2015/10/30/12/19/winner-1013979_1280.jpg";
    this.popUpImg.classList.add("winner__img", "rounded-5");

    this.closeXBtn = document.createElement("button");
    this.closeXBtn.classList.add("btn-close", "m-2");

    this.closeXBtn.onclick = () => this.element.remove();

    this.popUpTitle = document.createElement("h2");
    this.popUpTitle.classList.add("winner__title");

    this.popUpText = document.createElement("h5");
    this.popUpText.classList.add("winner__text",);

    this.popUpText.textContent = `Твой счет: ${num}`;
    this.popUpWrapper = document.createElement("div");
    const textWrapper = document.createElement("div");

    this.closeBtn = document.createElement("button");
    this.closeBtn.classList.add("btn", "float-end", "rounded-4", "bg-success");
    this.closeBtn.textContent = "Закрыть";
    this.closeBtn.onclick = () => this.element.remove();
    this.buttonWrapper = document.createElement("div");
    this.buttonWrapper.classList.add("winner__btn-wrapper", "mb-3", "d-flex", "gap-4");
    this.buttonWrapper.append(this.closeBtn);

    textWrapper.classList.add("winner__text-wrapper", "text-center");
    textWrapper.append(this.popUpTitle, this.popUpText);
    num === 30 ? this.getMaxScore() : this.setWinData();
    this.againBtn.addEventListener("click", () => this.element.remove());
    popUpWrapper.append(this.closeXBtn, this.popUpImg, textWrapper, this.popUpWrapper, this.buttonWrapper);
    this.element.append(popUpWrapper);
    this.element.addEventListener("click", (e) => this.cloePopUp(e));
  };

  cloePopUp = (e) => {
    let [targetClassList] = e.target.classList;
    if(targetClassList === "pop__up"){
      this.element.remove();
    }
  };

  getMaxScore = () => {
    this.popUpTitle.innerHTML = "Поздравляю! <p p class='my-4'> Ты набрал максимум очков! </p>";
  };

  setWinData = () => {
    this.popUpTitle.innerHTML = "Игра окончена.<p class='my-4'> Сможешь набрать максимум очков? </p>";
    this.againBtn = document.createElement("button");
    this.againBtn.textContent = "Еще раз?";
    this.againBtn.classList.add("btn__repeat", "btn", "rounded-4", "bg-secondary");
    this.buttonWrapper.prepend(this.againBtn);
  };

  destroy = () => {
    this.element.remove();
  };
}