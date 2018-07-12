export default class Time {

  constructor() {
    const now = new Date();
    this._startTime = now.getTime();
    this._DOMLoadedTime = 0; // DOM not loaded yet
    this._elapsedTimeToLoadTheDOM = 0;  // DOM not loaded yet
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

  /**
   * The client callback that will be called when DOM loads.
   *
   * @param {function} clientCallback
   */
  whenDOMIsLoadedDo(clientCallback) {
    if (typeof clientCallback !== 'function') {
      console.error('PageInfoJS: invalid callback for Time.whenDOMIsLoadedDo(function)');
    }

    window.document.addEventListener('DOMContentLoaded', () => {
      this._elapsedTimeCounter(clientCallback);
    }, false);
  }

  _elapsedTimeCounter(clientCallback) {
    const now = new Date();
    this._DOMLoadedTime = now.getTime();
    this._elapsedTimeToLoadTheDOM = this._DOMLoadedTime - this._startTime;
    clientCallback();
  }
};
