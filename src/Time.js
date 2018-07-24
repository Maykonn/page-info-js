export default class PageInfoTime {

  constructor() {
    const now = new Date();
    this._startTimestamp = now.getTime();
  }

  /**
   * Returns the script start time
   *
   * @returns {number} The number of milliseconds between midnight, January 1, 1970 Universal Coordinated Time (UTC) (or GMT) and now.
   */
  getStartTimestamp() {
    return this._startTimestamp;
  }

  /**
   * Returns the elapsed time in milliseconds until now
   *
   * @returns {number}
   */
  getElapsedTime() {
    const now = new Date();
    return now.getTime() - this._startTimestamp;
  }

  /**
   * Returns the current timestamp
   *
   * @returns {number}
   */
  getCurrentTimestamp() {
    const now = new Date();
    return now.getTime();
  }
};
