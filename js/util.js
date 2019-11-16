'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (cb, interval) {
    var lastTimeout = null;
    if (!interval) {
      interval = DEBOUNCE_INTERVAL;
    }

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  };

  var isEsc = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var isEnter = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  window.util = {
    isEsc: isEsc,
    isEnter: isEnter,
    debounce: debounce
  };
})();
