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
  console.log('Page completely loaded in (milliseconds)', PageInfo.Time.getElapsedTimeToLoadDOM());
  console.log('Page completely loaded timestamp', PageInfo.Time.getDOMLoadedTimestamp());
};


var PageInfo = new PageInfoJS(myCallbacks);
console.log('Page load start timestamp', PageInfo.Time.getStartTimestamp());
console.log('Number of elements in this page: ' + PageInfo.getElementsNumber());