import InternalDOMEventsList from "./EventsList";
import Time from "./Time";
import EventsCollection from "./EventsCollection";

export default class PageInfo {

  constructor(clientCallbacks) {
    /**
     * @type {PageInfoTime}
     */
    this.Time = new Time();

    new Promise((resolve) => {
      this._Events = new EventsCollection(clientCallbacks);
      this._elements = window.document.getElementsByTagName('*');
      this._elementsNumber = this._elements.length;
      resolve();
    })
      .then(() => {
        this._loadedElementsNumber = 0;
        this._analyzeDOM();
      });
  }

  getElementsNumber() {
    return this._elementsNumber;
  }

  getLoadedElementsNumber() {
    return this._loadedElementsNumber;
  }

  _analyzeDOM() {
    let self = this;

    let doneLoading = () => {
      if (self._Events.has(InternalDOMEventsList.DOM.AllElementsLoaded)) {
        self._Events.get(InternalDOMEventsList.DOM.AllElementsLoaded)(self);
      }
    };

    if (self._elementsNumber === 0) {
      return doneLoading();
    }

    let elementLoaded = (element) => {
      self._loadedElementsNumber += 1;

      if (self._Events.has(InternalDOMEventsList.DOM.ElementLoaded)) {
        self._Events.get(InternalDOMEventsList.DOM.ElementLoaded)(element, self);
      }

      if (self._Events.has(InternalDOMEventsList.DOM.ElementsLoadingPercentageIncremented)) {
        const percentageLoaded = ((100 / self._elementsNumber * self._loadedElementsNumber) << 0);
        self._Events.get(InternalDOMEventsList.DOM.ElementsLoadingPercentageIncremented)(percentageLoaded, element, self);
      }

      if (self._elementsNumber === self._loadedElementsNumber) {
        return doneLoading();
      }
    };

    for (let i = self._elementsNumber; i--;) {
      let callback = () => {
        return elementLoaded(self._elements[i]);
      };

      switch (self._elements[i].tagName) {
        case 'BODY':
          self._elements[i].onload = callback;
          break;
        case 'IMG':
          let TempImage = new Image();
          TempImage.onload = callback;
          TempImage.onerror = callback;
          TempImage.src = self._elements[i].src;
          break;
        default:
          callback(self._elements[i]);
          break;
      }
    }
  }

}