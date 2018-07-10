/**
 * PageinfoJS
 *
 * @author Maykonn Welington Candido<maykonn@outlook.com>
 */


'use strict';

import Time from "./src/Time";

((window, undefined) => {

  // defining the namespace
  window.PageInfoJS = {
    Time: new Time(),
  };

})(window);