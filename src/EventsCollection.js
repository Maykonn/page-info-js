export default class EventsCollection {

  constructor(events = undefined) {
    this._Collection = (typeof events !== 'undefined' ? events : []);
  }

  has(index) {
    return typeof this._Collection[index] !== 'undefined';
  }

  get(index) {
    return this._Collection[index];
  }

  set(index, func) {
    if (typeof func === 'function') {
      this._Collection[index] = func;
      return this;
    }

    throw new Error('Function ' + name + ' must be a function');
  }

  delete(index) {
    let indexPosition = this._Collection.indexOf(index);
    if (indexPosition > -1) {
      this._Collection.splice(indexPosition, 1);
    }
  }

}