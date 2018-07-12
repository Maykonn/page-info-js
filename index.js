/**
 * PageInfoJS
 *
 * @author Maykonn Welington Candido<maykonn@outlook.com>
 */


'use strict';

import PageInfoTime from "./src/PageInfoTime";
import CustomEvents from "./src/CustomEvents";
import PageInfoDOM from "./src/PageInfoDOM";
import InternalDOMEventsList from "./src/InternalDOMEventsList";

((window) => {

  window.PageInfoJS = {};
  window.PageInfoJS.InternalEventsList = InternalDOMEventsList;
  window.PageInfoJS.CustomEvents = CustomEvents;
  window.PageInfoJS.Time = PageInfoTime;
  window.PageInfoJS.DOM = PageInfoDOM;

  console.log('PageInfoJS', window.PageInfoJS);

})(window, undefined);