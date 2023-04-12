import {ElementCreator} from "./ElementCreator.js";
import {QuizQuestion} from "./QuizQuestion.js";
import birdsData from "./birdsData.js";
import birdsDataEn from "./birdsDataEn";
import {CreateQuizGameField}  from "./CreateQuizGameField.js";
import {CreateQuizGameLevel} from "./CreateQuizGameLevel";
import {languageData} from "./languageData";

export class CreateQuiz extends ElementCreator{
  /**
   * @param {HTMLElement} parent
   * @param {string} tag
   * @param {string[]} cssClass
   * @param {string} language
   */
  constructor(parent, tag, cssClass, language) {
    super(parent, tag, cssClass);
    this.activeLanguage = language;
    this.data = this.checkLanguageData(language);
    this.rightNumArr = this.generateRightAnswersNum();
    this.gameRound = 0;
    this.score = 5;
    this.gameScore = 0;
    this.isWin = false;
    this.startGameQuiz();
    this.languageBtnListener();
  }

  checkLanguageData = (language) => {
    if(language === "ru"){
      return birdsData;
    }
    return birdsDataEn;
  };

  generateRightAnswersNum = () => {
    const arr = [];
    for(let i = 0; i < 6; i++){
      let num = Math.floor(Math.random() * 6);
      arr.push(num);
    }
    return arr;
  };

  addListerToList = () => {
    const variables = this.gameField.quizListList.element.querySelectorAll("li");
    variables.forEach(variable => {
      variable.onclick = () => {
        this.currentAnswer = +variable.classList[1];
        this.gameField.quizCard.destroyHolder();
        this.gameField.quizCard.createCard(this.currentAnswer);
        if(+this.currentAnswer === +this.rightNumArr[this.gameRound] && this.isWin === false){
          variable.classList.add("list__item_true");
          this.question.quizWin();
          const winSound = new Audio();
          winSound.src = "https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3";
          winSound.play();
          this.nextQuestionBtn.classList.remove("page__quiz-btn_disabled");
          this.nextQuestionBtn.onclick = this.nextQuestion;
          this.gameScore += this.score;
          this.isWin = !this.isWin;
          document.querySelector(".score__score").textContent = this.gameScore;
          this.gameRound++;
        }else if(!this.isWin){
          if(!variable.classList.contains("list__item_false")){
            const loseSound = new Audio();
            loseSound.src = "https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6ccf3232f.mp3?filename=negative_beeps-6008.mp3";
            loseSound.play();
          }
          variable.classList.add("list__item_false");
          this.score !== 0 ? this.score-- : 0;
        }
      };
    });
  };

  startGameQuiz = () => {
    console.log(this.rightNumArr[this.gameRound]);
    this.gameRoundIndex = new CreateQuizGameLevel(this.element, "section", ["page__quiz-round", "round"],
      languageData[this.activeLanguage][1].gameIndicator);
    this.question = new QuizQuestion(this.element, "section",
      ["page__quiz-question", "question"],
      [birdsData[this.gameRound][this.rightNumArr[this.gameRound]],
        birdsDataEn[this.gameRound][this.rightNumArr[this.gameRound]]]);
    this.gameField = new CreateQuizGameField(this.element, "section",
      ["page__quiz-game", "game__data"], this.data[this.gameRound], this.activeLanguage);
    this.nextQuestionBtn = document.createElement("div");
    this.nextQuestionBtn.classList.add("page__quiz-btn", "page__quiz-btn_disabled");
    this.nextQuestionBtn.textContent = languageData[this.activeLanguage][2].question[0];
    this.element.append(this.nextQuestionBtn);
    this.roundIndicator(this.gameRound);
    this.addListerToList();
  };

  nextQuestion = () => {
    if(this.gameRound != 6){
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
      this.isWin = false;
      this.score = 5;
      this.startGameQuiz();
    }
    if(this.gameRound === 6){
      this.endGameMessage();
    }
  };

  roundIndicator = (round) => {
    const roundsArr = this.gameRoundIndex.element.querySelectorAll(".round__element");
    if(+round - 1 !== -1){
      roundsArr[round].classList.remove("round__element_active");
    }
    roundsArr[round].classList.add("round__element_active");
  };

  endGameMessage = () => {
    document.querySelector(".body-quiz").classList.add("body-quiz_win");
    this.gameField.quizCard.destroyHolder();
    this.gameField.quizCard.endGameMessage(this.gameScore);
    this.question.element.remove();
    this.gameField.quizListList.element.remove();
    this.nextQuestionBtn.remove();
    if(this.gameScore === 30) {
      const repeatGame = document.createElement("a");
      repeatGame.href = "https://github.com/lyutails";
      repeatGame.target = "_blank";
      repeatGame.classList.add("page__quiz-btn", "page__quiz-win-btn");
      repeatGame.textContent = languageData[this.activeLanguage][3].endGame[0];
      repeatGame.classList.add("graditude");
      this.element.append(repeatGame);
    }else {
      const repeatGame = document.createElement("div");
      repeatGame.classList.add("page__quiz-btn", "page__quiz-win-btn", "page__quiz-repeat");
      repeatGame.textContent = languageData[this.activeLanguage][3].endGame[1];
      this.element.append(repeatGame);
      repeatGame.onclick = () => {
        this.gameRound = 0;
        this.nextQuestion();
        this.gameScore = 0;
        this.score = 5;
        document.querySelector(".score__score").textContent = 0;
        document.querySelector(".body-quiz").classList.remove("body-quiz_win");
      };
    }
    const tabletWin = document.createElement("div");
    tabletWin.classList.add("body-quiz_win-tablet");
    this.element.append(tabletWin);
  };

  languageBtnListener = () => {
    const languageEnBtn = document.querySelector(".choose__lang-en");
    const languageRuBtn = document.querySelector(".choose__lang-ru");
    languageEnBtn.addEventListener("click", () => this.changeLanguageText("en"));
    languageRuBtn.addEventListener("click", () => this.changeLanguageText("ru"));
  };

  changeLanguageText = (lang) => {
    this.nextQuestionBtn.textContent = languageData[lang][2].question[0];
    const rounds = this.element.querySelectorAll(".round__element");
    for(let i = 0; i < rounds.length; i++){
      rounds[i].textContent = languageData[lang][1].gameIndicator[i];
    }
    const cardHolder = document.querySelectorAll(".card__data-holder");
    for(let i = 0; i < cardHolder.length; i++){
      cardHolder[i].textContent = languageData[lang][4].cardHolder[i];
    }
    const listArr = document.querySelectorAll(".list__item");
    const listArrData = lang === "ru" ? birdsData[this.gameRound] : birdsDataEn[this.gameRound];
    for (let i = 0; i < listArr.length; i++){
      listArr[i].textContent = listArrData[i]["name"];
    }
    if(this.question.isWin){
      if(lang === "ru"){
        this.question.birdName.textContent = birdsData[this.gameRound][this.rightNumArr[this.gameRound]].name;
      }else {
        this.question.birdName.textContent = birdsDataEn[this.gameRound][this.rightNumArr[this.gameRound]].name;
      }
    }
    if(this.element.querySelector(".music__music-control-wrapper_card")){
      const card = this.gameField.quizCard;
      if( lang === "ru"){
        const birdDataRu = birdsData[this.gameRound][this.currentAnswer];
        card.birdName.textContent = birdDataRu.name;
        card.birdSecondName.textContent = birdDataRu.species;
        card.cardDescription.textContent = birdDataRu.description;
      }else {
        const birdDataEn = birdsDataEn[this.gameRound][this.currentAnswer];
        card.birdName.textContent = birdDataEn.name;
        card.birdSecondName.textContent = birdDataEn.species;
        card.cardDescription.textContent = birdDataEn.description;
      }
    }
    if(this.element.querySelector(".game-end")){
      if(this.element.querySelector(".page__quiz-btn").classList.contains("page__quiz-repeat")){
        this.element.querySelector(".page__quiz-btn").textContent =
          languageData[lang][3].endGame[1];
      }else {
        this.element.querySelector(".page__quiz-btn").textContent =
          languageData[lang][3].endGame[0];
      }
      this.element.querySelector(".game-end__title").textContent = languageData[lang][5].winCard[3];
      this.element.querySelector(".m-1").textContent = languageData[lang][5].winCard[0];
      this.element.querySelector(".m-2").textContent = languageData[lang][5].winCard[1];
      this.element.querySelector(".m-3").textContent = languageData[lang][5].winCard[2];
    }
  };

}