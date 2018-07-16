var myCallbacks = [];
myCallbacks[PageInfoJS.InternalEventsList.DOM.ElementLoaded] = function (element, PageInfoJsDOM) {
  console.log('Element loaded', element);
  console.log('Loaded elements', PageInfoJsDOM.getElementsLoadedLength());
};

myCallbacks[PageInfoJS.InternalEventsList.DOM.ElementsLoadingPercentageIncremented] = function (percentage, element, PageInfoJsDOM) {
  console.log('Percentage of page loading', percentage);
};

myCallbacks[PageInfoJS.InternalEventsList.DOM.AllElementsLoaded] = function (PageInfoJsDOM) {
  console.log('Page completely loaded!');
};

var PageInfoJsDOM = new PageInfoJS.DOM(
  new PageInfoJS.CustomEvents(myCallbacks)
);

console.log('Number of elements in this page: ' + PageInfoJsDOM.getElementsLength());