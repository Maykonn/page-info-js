export default class PageInfoTime {

  constructor() {
    const now = new Date();
    this._startTime = now.getTime();
    this._DOMLoadedTime = 0; // DOM not loaded yet
    this._elapsedTimeToLoadTheDOM = 0;  // DOM not loaded yet

    window.document.addEventListener('DOMContentLoaded', () => {
      this._elapsedTimeCounter();
    }, false);
  }

  /**
   * Returns the start time of the script execution.
   *
   * @returns {number} The number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and now.
   */
  getStartTime() {
    return this._startTime;
  }

  /**
   * Returns the time when DOM was loaded.
   *
   * @returns {number} The number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and the DOM Loaded date.
   */
  getDOMLoadedTime() {
    return this._DOMLoadedTime;
  }

  /**
   * Returns the milliseconds of execution to load the DOM.
   *
   * @returns {number}
   */
  getElapsedTimeToLoadTheDOM() {
    return this._elapsedTimeToLoadTheDOM;
  }

  _elapsedTimeCounter() {
    const now = new Date();
    this._DOMLoadedTime = now.getTime();
    this._elapsedTimeToLoadTheDOM = this._DOMLoadedTime - this._startTime;
  }
};
