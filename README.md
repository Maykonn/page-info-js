# PageInfoJS

With PageInfoJS you can gather information about time to load the DOM as well create custom callbacks for events
when:

- Elements are loaded, 
- DOM loading percentage change,
- DOM is completely loaded.

You can work information about time too:

- DOM loading start timestamp,
- Elapsed time in milliseconds to completely load the DOM,
- Timestamp of the moment the DOM loading ends.

**A real world example for PageInfoJS custom callbacks and time info is to send information about your frontend apps for your analytics backend servers.**

## How to use

Include the PageInfo.js script on `<head>` element and you can work with the PageInfoJS at the end of your html, after
close the `</body>` tag, or include your js script there.  
See the files on /example directory for a simples real world example.

## Working with custom callbacks

Using custom callbacks for PageInfoJS events you can declare an array of callbacks:
```JS
var myCallbacks = [];
```

And create a callback when a DOM element is loaded:
```JS
/**  
 * @param element {HTMLElement}  
 * @param PageInfo {PageInfo}  
 */
myCallbacks[PageInfoJS.EventsList.DOM.ElementLoaded] = function (element, PageInfo) {  
  console.log('  >> Element loaded', element);  
  console.log('  >> Loaded elements', PageInfo.getLoadedElementsNumber());  
};
```

**The possible events are:**
- PageInfoJS.EventsList.DOM.ElementLoaded
- PageInfoJS.EventsList.DOM.ElementsLoadingPercentageIncremented
- PageInfoJS.EventsList.DOM.AllElementsLoaded

## Working with timestamps

Getting the start timestamp of the DOM loading:

```JS
var timestamp = PageInfo.Time.getStartTimestamp();  
console.log('PageInfoJS start timestamp:', timestamp);
```

Getting timestamp of the moment the DOM loading ends:
```JS
var timestamp = PageInfo.Time.getDOMLoadedTimestamp();  
console.log('PageInfoJS DOM loading ends at:', timestamp);
```

Milliseconds expended to load the DOM:
```JS
var time = PageInfo.Time.getElapsedTimeToLoadDOM();  
console.log('PageInfoJS DOM loaded in (milliseconds):', time);
```