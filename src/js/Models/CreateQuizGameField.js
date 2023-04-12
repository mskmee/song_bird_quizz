import {ElementCreator} from "./ElementCreator.js";
import {CreateQuizListList} from "./CreateQuizListList.js";
import {CreateQuizCardAnswer} from "./CreateQuizCardAnswer.js";

/**
 * @param {HTMLElement} parent
 * @param {string} tag
 * @param {string[]} cssClass
 * @param {string[]} gameChoseOptions
 */

export class CreateQuizGameField extends ElementCreator{
  constructor(parent, tag, cssClass, gameChooseOptions, lang) {
    super(parent, tag, cssClass);
    this.createQuizListList(gameChooseOptions);
    this.createQuizCardAnswer(gameChooseOptions, lang);
    this.quizCard.createCardHolder();
  }

  createQuizListList = (gameChooseOptions) => {
    this.quizListList = new CreateQuizListList(this.element, "ul", ["game__data-list", "list"],
      gameChooseOptions);
  };

  createQuizCardAnswer = (gameChooseOptions, lang) => {
    this.quizCard = new CreateQuizCardAnswer(this.element, "div",
      ["game-data__card", "card"], gameChooseOptions, lang);
  };

}