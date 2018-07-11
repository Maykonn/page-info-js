/**
 * PageinfoJS
 *
 * @author Maykonn Welington Candido<maykonn@outlook.com>
 */


'use strict';

import Time from "./src/Time";
import CustomEvents from "./src/CustomEvents";

((window, undefined) => {

  // defining the namespace
  window.PageInfoJS = {
    Time: new Time(),
    CustomEvents: new CustomEvents(),
  };

})(window);