import InternalEventsList from "./EventsList";
import Time from "./Time";
import EventsCollection from "./EventsCollection";
import "mutation-observer";

export default class PageInfo {

  constructor(clientCallbacks) {
    /**
     * @type {Array}
     */
    this._errors = [];
    this._errorObserver();

    /**
     * @type {PageInfoTime}
     */
    this.Time = new Time();

    /**
     * @type {EventsCollection}
     * @private
     */
    this._Events = new EventsCollection(clientCallbacks);

    new Promise((resolve) => {
      this._elements = window.document.getElementsByTagName('*');
      this._elementsNumber = this._elements.length;
      this._loadedElementsNumber = 0;

      this._readyStateObserver();
      this._mutationObserver();

      resolve();
    }).then(() => {
      this._analyzeDOM();
    });
  }

  /**
   * Number of DOM elements on page
   *
   * @returns {Number}
   */
  getElementsNumber() {
    return this._elementsNumber;
  }

  /**
   * Number of DOM elements loaded
   *
   * @returns {number}
   */
  getLoadedElementsNumber() {
    return this._loadedElementsNumber;
  }

  hasErrors() {
    return (this._errors.length > 0);
  }

  getAllErrors() {
    return this._errors;
  }

  _errorObserver() {
    let self = this;
    window.addEventListener('error', (e) => {
      self._errors.push(e);
      if (self._Events.has(InternalEventsList.OnError)) {
        self._Events.get(InternalEventsList.OnError)(self, e);
      }
    }, true);
  }

  _readyStateObserver() {
    window.document.onreadystatechange = () => {
      if (this._Events.has(InternalEventsList.DocumentReadyStateChanged.Any)) {
        this._Events.get(InternalEventsList.DocumentReadyStateChanged.Any)(this, window.document.readyState);
      }

      switch (window.document.readyState) {
        case 'uninitialized':
          if (this._Events.has(InternalEventsList.DocumentReadyStateChanged.ToUninitialized)) {
            this._Events.get(InternalEventsList.DocumentReadyStateChanged.ToUninitialized)(this);
          }
          break;
        case 'loading':
          if (this._Events.has(InternalEventsList.DocumentReadyStateChanged.ToLoading)) {
            this._Events.get(InternalEventsList.DocumentReadyStateChanged.ToLoading)(this);
          }
          break;
        case 'loaded':
          if (this._Events.has(InternalEventsList.DocumentReadyStateChanged.ToLoaded)) {
            this._Events.get(InternalEventsList.DocumentReadyStateChanged.ToLoaded)(this);
          }
          break;
        case 'interactive':
          if (this._Events.has(InternalEventsList.DocumentReadyStateChanged.ToInteractive)) {
            this._Events.get(InternalEventsList.DocumentReadyStateChanged.ToInteractive)(this);
          }
          break;
        case 'complete':
          if (this._Events.has(InternalEventsList.DocumentReadyStateChanged.ToComplete)) {
            this._Events.get(InternalEventsList.DocumentReadyStateChanged.ToComplete)(this);
          }
          break;
      }
    };
  }

  _mutationObserver() {
    let mutationObservedCallback = (MutationsList) => {
      // More than one mutation can occur, for example when attributes and content of a div element are changed
      for (let Mutation of MutationsList) {
        if (this._Events.has(InternalEventsList.DOM.MutationObserved)) {
          this._Events.get(InternalEventsList.DOM.MutationObserved)(Mutation, this);
        }
      }
    };

    let targetNode = window.document.getElementsByTagName('body')[0];
    let config = {attributes: true, childList: true, characterData: true, subtree: true};
    let observeMutations = new MutationObserver(mutationObservedCallback);
    observeMutations.observe(targetNode, config);
  }

  _analyzeDOM() {
    let self = this;

    let doneLoading = () => {
      if (self._Events.has(InternalEventsList.DOM.AllElementsLoaded)) {
        self._Events.get(InternalEventsList.DOM.AllElementsLoaded)(self);
      }
    };

    if (self._elementsNumber === 0) {
      return doneLoading();
    }

    let elementLoaded = (element) => {
      self._loadedElementsNumber += 1;

      if (self._Events.has(InternalEventsList.DOM.ElementLoaded)) {
        self._Events.get(InternalEventsList.DOM.ElementLoaded)(element, self);
      }

      if (self._Events.has(InternalEventsList.DOM.ElementsLoadingPercentageIncremented)) {
        const percentageLoaded = ((100 / self._elementsNumber * self._loadedElementsNumber) << 0);
        self._Events.get(InternalEventsList.DOM.ElementsLoadingPercentageIncremented)(percentageLoaded, element, self);
      }

      if (self._loadedElementsNumber === self._elementsNumber) {
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
          TempImage.src = self._elements[i].src;
          break;
        default:
          callback(self._elements[i]);
          break;
      }
    }
  }
}