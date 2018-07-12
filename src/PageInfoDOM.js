import InternalDOMEventsList from "./InternalDOMEventsList";

export default class PageInfoDOM {

  constructor(CustomEvents) {
    this._Events = CustomEvents;

    this._registerInternalEventForPercentageOfLoading();
  }

  _registerInternalEventForPercentageOfLoading() {
    let self = this;
    let elements = window.document.getElementsByTagName('*');

    let elementsTotal = elements.length;

    function doneLoading() {
      if (self._Events.has(InternalDOMEventsList.DOM.AllElementsLoaded)) {
        self._Events.get(InternalDOMEventsList.DOM.AllElementsLoaded)();
      }
    }

    if (elementsTotal === 0) {
      return doneLoading();
    }

    let numberOfLoadedElements = 0;

    function elementLoaded(element) {
      numberOfLoadedElements += 1;

      let percentageLoaded = ((100 / elementsTotal * numberOfLoadedElements) << 0) + '%';

      if (self._Events.has(InternalDOMEventsList.DOM.ElementLoaded)) {
        self._Events.get(InternalDOMEventsList.DOM.ElementLoaded)(element);
      }

      if (self._Events.has(InternalDOMEventsList.DOM.ElementsLoadingPercentageIncremented)) {
        self._Events.get(InternalDOMEventsList.DOM.ElementsLoadingPercentageIncremented)(percentageLoaded, element);
      }

      if (elementsTotal === numberOfLoadedElements) {
        return doneLoading();
      }
    }

    for (let i = elementsTotal; i--;) {
      switch (elements[i].tagName) {
        case 'IMG':
          let TempImage = new Image();
          TempImage.onload = () => {
            elementLoaded(elements[i]);
          };
          TempImage.onerror = () => {
            elementLoaded(elements[i]);
          };
          TempImage.src = elements[i].src;
          break;
        default:
          // TODO: verify a way to know when this element is really loaded
          elementLoaded(elements[i]);
          break;
      }
    }
  }

}