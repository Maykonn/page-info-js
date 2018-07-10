;(function () {
  var timeStart = Date.now();
  var timeElapsed = 0;

  function id(v) {
    return document.getElementById(v);
  }

  function loadbar() {
    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send();
    alert(req.getAllResponseHeaders().toLowerCase().match(/content-length: \d+/) + " bytes");

    var ovrl = id("overlay"),
      prog = id("progress"),
      stat = id("progstat"),
      elements = document.getElementsByTagName('*'),
      c = 0,
      tot = elements.length;
    if (tot === 0) return doneLoading();

    function imgLoaded() {
      c += 1;
      var perc = ((100 / tot * c) << 0) + "%";
      prog.style.width = perc;
      stat.innerHTML = "Loading " + perc;

      console.log('c', c)
      console.log('tot', tot)

      if (c === tot) return doneLoading();
    }

    function doneLoading() {
      ovrl.style.opacity = 0;
      setTimeout(function () {
        ovrl.style.display = "none";
      }, 1200);
    }

    var scriptsCounter = 0;
    for (var i = tot; i--;) {
      console.log('i', i);

      switch (elements[i].tagName) {
        case 'IMG':
          console.log('IMG');
          var tImg = new Image();
          tImg.onload = imgLoaded;
          tImg.onerror = imgLoaded;
          tImg.src = elements[i].src;
          break;
        case 'SCRIPT':
          console.log('SCRIPT');
          imgLoaded();
          break;
        default:
          console.log(elements[i].tagName);
          //elements[i].onerror = imgLoaded;
          //elements[i].onload = imgLoaded;
          imgLoaded();
          break;
      }
    }


    /*for (var i = 0; i < tot; i++) {
        var tImg = new Image();
        tImg.onload = imgLoaded;
        tImg.onerror = imgLoaded;
        tImg.src = elements[i].src;
    }*/
  }

  document.addEventListener('DOMContentLoaded', loadbar, false);
}());