export class ElementCreator {
  /**
   * @param {HTMLElement} parent
   * @param {string} tag
   * @param {string[]} cssClass
   */
  constructor(parent, tag, cssClass = []) {
    this.element = document.createElement(tag);
    cssClass.forEach(data => this.element.classList.add(data));
    parent.append(this.element);
  }
}