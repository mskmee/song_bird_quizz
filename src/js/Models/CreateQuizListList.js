import {ElementCreator} from "./ElementCreator.js";

export class CreateQuizListList extends ElementCreator {
  constructor(parent, tag, cssClass, gameChooseOptions, ) {
    super(parent, tag, cssClass);
    this.createListData(gameChooseOptions);
  }

  createListData = (options) => {
    for(let i = 0; i < 6; i++){
      const li = document.createElement("li");
      li.classList.add("list__item", `${i}`);
      li.textContent = options[i]?.name;
      this.element.append(li);
    }
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