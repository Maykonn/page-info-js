export default class EventsCollection {

  constructor() {
    this._Collection = new Map();
  }

  get(name) {
    return this._Collection.get(name);
  }

  set(name, func) {
    if (typeof func === 'function') {
      return this._Collection.set(name, func);
    }

    throw new Error('Function ' + name + ' must be a function');
  }

}