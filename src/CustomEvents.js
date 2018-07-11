export default class CustomEvents {
  constructor() {
    this._Collection = new Map();
  }

  get(name) {
    return this._Collection.get(name);
  }

  set(name, func) {
    if (typeof func === 'function') {
      this._Collection.set(name, func);
      return;
    }
    throw new Error('Function ' + name + ' must be a function');
  }

};