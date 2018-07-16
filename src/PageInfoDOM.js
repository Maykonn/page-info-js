import InternalDOMEventsList from "./EventsList";
import PageInfoTime from "./PageInfoTime";
import EventsCollection from "./EventsCollection";

export default class PageInfoDOM {

  constructor(clientCallbacks) {
    this.Time = new PageInfoTime();
    new Promise((resolve) => {
      this._Events = new EventsCollection(clientCallbacks);
      this._elements = window.document.getElementsByTagName('*');
      this._elementsLength = this._elements.length;
      resolve();
    })
      .then(() => {
        this._loadedElementsLength = 0;
        this._do();
      });
  }

  getElementsLength() {
    return this._elementsLength;
  }

  getElementsLoadedLength() {
    return this._loadedElementsLength;
  }

  _do() {
    let self = this;

    let doneLoading = () => {
      if (self._Events.has(InternalDOMEventsList.DOM.AllElementsLoaded)) {
        self._Events.get(InternalDOMEventsList.DOM.AllElementsLoaded)(self);
      }
    };

    if (self._elementsLength === 0) {
      return doneLoading();
    }

    let elementLoaded = (element) => {
      self._loadedElementsLength += 1;

      if (self._Events.has(InternalDOMEventsList.DOM.ElementLoaded)) {
        self._Events.get(InternalDOMEventsList.DOM.ElementLoaded)(element, self);
      }

      if (self._Events.has(InternalDOMEventsList.DOM.ElementsLoadingPercentageIncremented)) {
        const percentageLoaded = ((100 / self._elementsLength * self._loadedElementsLength) << 0);
        self._Events.get(InternalDOMEventsList.DOM.ElementsLoadingPercentageIncremented)(percentageLoaded, element, self);
      }

      if (self._elementsLength === self._loadedElementsLength) {
        return doneLoading();
      }
    };

    for (let i = self._elementsLength; i--;) {
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