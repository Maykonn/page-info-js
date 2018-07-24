export default class PageInfoError {

  constructor(error, url, line, column, asString) {
    this._error = error;
    this._url = url;
    this._line = line;
    this._column = column;
    this._asString = asString;
  }

  getError() {
    return this._error;
  }

  getUrl() {
    return this._url;
  }

  getLine() {
    return this._line;
  }

  getColumn() {
    return this._column;
  }

  getAsString() {
    return this._asString;
  }
};