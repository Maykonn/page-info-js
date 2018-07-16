var myCallbacks = [];
myCallbacks[PageInfoJS.EventsList.DOM.ElementLoaded] = function (element, PageInfo) {
  console.log('  >> Element loaded', element);
  console.log('  >> Loaded elements', PageInfo.getElementsLoadedLength());
};

myCallbacks[PageInfoJS.EventsList.DOM.ElementsLoadingPercentageIncremented] = function (percentage, element, PageInfo) {
  console.log('  >> Percentage of page loading', percentage);
};

myCallbacks[PageInfoJS.EventsList.DOM.AllElementsLoaded] = function (PageInfo) {
  console.log('Page completely loaded in (milliseconds)', PageInfo.Time.getElapsedTimeToLoadTheDOM());
  console.log('Page completely loaded timestamp', PageInfo.Time.getDOMLoadedTime());
};

var PageInfo = new PageInfoJS.DOM(myCallbacks);
console.log('Page load start timestamp', PageInfo.Time.getStartTime());
console.log('Number of elements in this page: ' + PageInfo.getElementsLength());