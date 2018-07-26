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
 * @param Mutation {MutationRecord}
 * @param PageInfo {PageInfo}
 */
myCallbacks[PageInfoJS.EventsList.DOM.MutationObserved] = function (Mutation, PageInfo) {
  console.log('Mutation Observed after (milliseconds)', PageInfo.Time.getElapsedTime(), Mutation);
  switch (Mutation.type) {
    case 'childList':
      console.log('A child node has been added or removed.');
      break;
    case 'attributes':
      console.log('The ' + Mutation.attributeName + ' attribute was modified.');
      break;
  }
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
 * @param error {PageInfoError}
 */
myCallbacks[PageInfoJS.EventsList.OnError] = function (PageInfo, error) {
  console.log('Current error:', error);
};

var PageInfo = new PageInfoJS(myCallbacks);
console.log('Page load start timestamp', PageInfo.Time.getStartTimestamp());
console.log('Number of DOM elements: ' + PageInfo.getElementsNumber());

// Forcing a fake dom change after some time like ads scripts does, will be captured by PageInfoJS custom callbacks:
setTimeout(function () {
  var body = document.getElementsByTagName('body')[0];
  var ad = document.createElement('div');
  ad.innerHTML = 'Simulating an ad appearing here after 7 seconds.';
  body.insertBefore(ad, body.firstChild);
  setTimeout(function () {
    ad.innerHTML = 'Ad changed after 4 seconds from first ad appear.';
  }, 4000);
}, 7000);


// Forcing an error:
//console.log('Simulating an javascript error to be captured by PageInfoJS custom callbacks');
//PageInfo.callingUndefinedMethodNow();