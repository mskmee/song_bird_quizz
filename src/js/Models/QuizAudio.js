import {ElementCreator} from "./ElementCreator.js";

export class QuizAudio extends ElementCreator {
  /**
   * @param {HTMLElement} parent
   * @param {string} tag
   * @param {string[]} cssClass
   * @param {string} audioSrc
   */
  constructor(parent, audioSrc, tag="audio", cssClass = []) {
    super(parent, tag, cssClass);
    this.element.setAttribute("preload", "metadata");
    this.element.src = audioSrc;
    this.isPlay = false;
    this.isMute = false;
    this.volumeBeforeMute = 0;
    this.createPlayerControls();
    this.setMusicDuration();
    this.controlsHolder.style.setProperty("--volume-before-width",
      "100%");
    parent.append(this.controlsHolder);
  }

  changeMusicStatus = () => {
    this.isPlay = !this.isPlay;
    this.isPlay ? this.element.play() : this.element.pause();
  };

  /**
   *
   * @param {HTMLElement} element
   * @param {string} value
   *
   */

  setAttributesToElement = (element, value = "0") => {
    const options = {
      "type": "range",
      "max": "100"
    };
    for(let k in options) {
      element.setAttribute(k, options[k]);
    }
    element.setAttribute("value", value);
  };

  /**
   * @return [HTMLElement] player control btn
   */
  createPlayerControls = () => {
    this.controlsHolder = document.createElement("div");
    this.controlsHolder.classList.add("music");
    this.controlBtn = document.createElement("div");
    this.controlBtn.classList.add("music__control");
    this.controlBtn.onclick = () => {
      this.controlBtn.classList.toggle("music__control_pause");
      this.changeMusicStatus();
    };

    this.currentMusicTime = document.createElement("span");
    this.currentMusicTime.classList.add("music__time-start");
    this.currentMusicTime.textContent = "0:00";

    this.durationMusicTime = document.createElement("span");
    this.durationMusicTime.classList.add("music__time-end");
    this.durationMusicTime.textContent = "0:00";


    this.seekMusicSlider = document.createElement("input");
    this.seekMusicSlider.classList.add("music__duration-control");
    this.setAttributesToElement(this.seekMusicSlider);

    this.volumeMusicSlider = document.createElement("input");
    this.volumeMusicSlider.classList.add("music__volume-control");
    this.setAttributesToElement(this.volumeMusicSlider, "100");
    const audioControlsWrapper = document.createElement("div");
    audioControlsWrapper.classList.add("music__volume-control-wrapper");
    const muteButton = document.createElement("div");

    muteButton.classList.add("music__volume-btn");
    muteButton.onclick = () => this.muteMusic(muteButton);
    audioControlsWrapper.append(muteButton, this.volumeMusicSlider);

    const timeWrapper = document.createElement("div");
    timeWrapper.classList.add("music__time-wrapper");
    timeWrapper.append(this.currentMusicTime, this.durationMusicTime);

    const musicControlWrapper = document.createElement("div");
    musicControlWrapper.classList.add("music__music-control-wrapper");
    musicControlWrapper.append(this.controlBtn, this.seekMusicSlider);

    this.controlsHolder.append(musicControlWrapper, timeWrapper, audioControlsWrapper);
    this.element.addEventListener("timeupdate", this.timeUpdate);
    /*
    * inner current audio time in player and update before size
     */
    this.seekMusicSlider.addEventListener("input", (e) => {
      this.element.removeEventListener("timeupdate", this.timeUpdate);
      this.setInputVisualData(e.target);
      this.currentMusicTime.textContent =
        this.secondsToMusicTime(this.seekMusicSlider.value);
    });

    /*
    * update music slider by current music time
     */
    this.seekMusicSlider.addEventListener("change", () => {
      this.element.currentTime = this.seekMusicSlider.value;
      this.element.addEventListener("timeupdate", this.timeUpdate);
    });

    /*
    * update before element and sound volume in volume slider
     */

    this.volumeMusicSlider.addEventListener("input", (e) => {
      this.setInputVisualData(e.target);
      this.element.volume = this.volumeMusicSlider.value / 100;
      if(this.isMute){
        this.muteMusic(muteButton);
      }
    });

    /*
    * reset current music time, and switch button on music end
     */

    this.element.onended = () => {
      this.element.currentTime = 0;
      if(this.isPlay){
        this.isPlay = !this.isPlay;
        this.controlBtn.classList.remove("music__control_pause");
        this.controlsHolder.style.setProperty("--seek-before-width","0%");
      }
    };
  };

  /*
  * take metadata convert it to music time and set it into duration time
   */

  setMusicDuration = () => {
    this.element.addEventListener("loadedmetadata", () => {
      const time = this.secondsToMusicTime(this.element.duration);
      this.durationMusicTime.textContent = time;
      this.seekMusicSlider.setAttribute("max",
        `${Math.floor(this.element.duration)}`);
    });
  };

  secondsToMusicTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  setInputVisualData = (rangeInput) => {
    if(rangeInput === this.seekMusicSlider) {
      this.controlsHolder.style.setProperty("--seek-before-width",
        rangeInput.value / rangeInput.max * 100 + "%");
    } else {
      this.controlsHolder.style.setProperty("--volume-before-width",
        rangeInput.value / rangeInput.max * 100 + "%");
    }
  };

  muteMusic = (btn) => {
    if(this.isMute){
      btn.classList.remove("volume-btn_mute");
      this.isMute = false;
      this.element.volume = this.volumeBeforeMute;
    }else {
      this.isMute = true;
      this.volumeBeforeMute = this.volumeMusicSlider.value / 100;
      this.element.volume = 0;
      btn.classList.add("volume-btn_mute");
    }
  };

  timeUpdate = () => {
    let time = Math.floor(this.element.currentTime);
    this.seekMusicSlider.value = time;
    this.currentMusicTime.textContent = this.secondsToMusicTime(time);
    this.controlsHolder.style.setProperty("--seek-before-width",
      this.seekMusicSlider.value / this.seekMusicSlider.max * 100 + "%");
  };
}