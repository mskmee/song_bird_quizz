import {ElementCreator} from "./ElementCreator";

export class CreateQuizGameLevel extends ElementCreator {
  constructor(parent, tag, cssClass, data ) {
    super(parent, tag, cssClass);
    this.createGameRounds(data);
  }

  createGameRounds = (data) => {
    for(let i = 0; i < data.length; i++){
      const div = document.createElement("div");
      div.textContent = data[i];
      div.classList.add("round__element");
      this.element.append(div);
    }
  };
}