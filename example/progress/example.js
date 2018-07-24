/**
 * Your custom callback functions
 *
 * @type {Array}
 */
var myCallbacks = [];


/**
 * @param element {HTMLElement}
 * @param PageInfo {PageInfo}
 */
myCallbacks[PageInfoJS.EventsList.DOM.ElementLoaded] = function (element, PageInfo) {
  console.log('  >> Element loaded', element);
  console.log('  >> Loaded elements', PageInfo.getLoadedElementsNumber());
};

/**
 * @param percentage {Number}
 * @param element {HTMLElement}
 * @param PageInfo {PageInfo}
 */
myCallbacks[PageInfoJS.EventsList.DOM.ElementsLoadingPercentageIncremented] = function (percentage, element, PageInfo) {
  console.log('  >> Percentage of page loading', percentage);
};

/**
 * @param PageInfo {PageInfo}
 */
myCallbacks[PageInfoJS.EventsList.DOM.AllElementsLoaded] = function (PageInfo) {
  console.log('Page completely loaded in (milliseconds)', PageInfo.Time.getElapsedTime());
  console.log('Page loaded timestamp', PageInfo.Time.getCurrentTimestamp());
};

/**
 * @param PageInfo {PageInfo}
 * @param changedTo {string}
 */
myCallbacks[PageInfoJS.EventsList.DocumentReadyStateChanged.Any] = function (PageInfo, changedTo) {
  console.log('Document ready state changed to `' + changedTo + '` after (milliseconds)', PageInfo.Time.getElapsedTime());
};

/**
 * @param PageInfo {PageInfo}
 */
myCallbacks[PageInfoJS.EventsList.DocumentReadyStateChanged.ToComplete] = function (PageInfo) {
  console.log('Document is COMPLETE now, elapsed time (milliseconds)', PageInfo.Time.getElapsedTime());
  console.log('Document have errors?', PageInfo.hasErrors());
  console.log('Document Errors', PageInfo.getAllErrors());
};

/**
 * @param PageInfo {PageInfo}
 * @param error {string}
 */
myCallbacks[PageInfoJS.EventsList.OnError] = function (PageInfo, error) {
  console.log('Current error:', error);
};

var PageInfo = new PageInfoJS(myCallbacks);
console.log('Page load start timestamp', PageInfo.Time.getStartTimestamp());
console.log('Number of DOM elements: ' + PageInfo.getElementsNumber());

// Forcing an error:
PageInfo.callingUndefinedMethodNow();