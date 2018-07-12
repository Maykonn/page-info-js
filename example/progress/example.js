var myCallbacks = [];
myCallbacks[PageInfoJS.InternalEventsList.DOM.ElementLoaded] = function (element) {
  console.log('Element loaded', element);
};

myCallbacks[PageInfoJS.InternalEventsList.DOM.ElementsLoadingPercentageIncremented] = function (percentage, element) {
  console.log('Percentage of page loading', percentage);
};

myCallbacks[PageInfoJS.InternalEventsList.DOM.AllElementsLoaded] = function () {
  console.log('Page completely loaded!');
};


var PageInfoDOM = new PageInfoJS.DOM(
  new PageInfoJS.CustomEvents(myCallbacks)
);