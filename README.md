# PageInfoJS

With PageInfoJS you can gather information about time to load the DOM as well create custom callbacks for events
when:

- Elements are loaded, 
- DOM loading percentage changes,
- DOM is completely loaded.

You can work with information about time too:

- DOM loading start timestamp,
- Elapsed time in milliseconds to completely load the DOM,
- Timestamp of the moment the DOM loading ends.

**A real world example for PageInfoJS custom callbacks and time info is to send information about your frontend apps for your analytics backend servers.**

## How to use

Include the `/dist/PageInfo.js` or `/dist/PageInfo.gz` script on `<head>` element and you can work with the PageInfoJS at the end of your html, after
close the `</body>` tag, or include your js script there.

**You can find the compiled code on [package releases list](https://github.com/Maykonn/PageInfoJS/releases).**

**See the files on /example directory for a simple real world example.**

## Compiling the code
Clone this repo and you can use npm and webpack to compile the code.
Install the requirements:   

```
git clone https://github.com/Maykonn/PageInfoJS.git
npm install
``` 

In your dev environment you can run (will compile the code and open the example app at localhost:8080/):
```
npm run start
```

Build the code to production at `/dist` directory (minify, uglify, remove comments, logs, etc):
```
npm run build
```

The `npm run build` command will generate two file at /dist directory, PageInfo.gz and PageInfo.js. 

## Working with custom callbacks

To use the custom callbacks for PageInfoJS events you can declare an array of callbacks:
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

And pass the callbacks array for the PageInfoJS instance:

```JS
var PageInfo = new PageInfoJS(myCallbacks);
```

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