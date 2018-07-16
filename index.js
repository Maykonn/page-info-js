/**
 * PageInfoJS
 *
 * @author Maykonn Welington Candido<maykonn@outlook.com>
 */


'use strict';

import PageInfoDOM from "./src/PageInfoDOM";
import EventsList from "./src/EventsList";

((window) => {

  window.PageInfoJS = {};
  window.PageInfoJS.EventsList = EventsList;
  window.PageInfoJS.DOM = PageInfoDOM;

})(window, undefined);