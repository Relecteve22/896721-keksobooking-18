'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 300; // ms

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var isEsc = function (evt) {
    return evt.keyCode === window.util.ESC_KEYCODE;
  };

  var isEnter = function (evt) {
    return evt.keyCode === window.util.ENTER_KEYCODE;
  };

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (elements) {
    return elements[getRandomInt(0, elements.length - 1)];
  };

  var getRandomSizeArray = function (elements) {
    return getRandomInt(0, elements.length - 1);
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    isEsc: isEsc,
    isEnter: isEnter,
    debounce: debounce
  };
})();
