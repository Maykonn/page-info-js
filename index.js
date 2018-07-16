/**
 * PageInfoJS
 *
 * @author Maykonn Welington Candido<maykonn@outlook.com>
 */

'use strict';

import PageInfo from "./src/PageInfo";
import EventsList from "./src/EventsList";

((window) => {

  /**
   * @type {PageInfo}
   */
  window.PageInfoJS = PageInfo;

  /**
   * List of internal events handled by PageInfoJS
   * @type {{DOM}}
   */
  window.PageInfoJS.EventsList = EventsList;

})(window, undefined);