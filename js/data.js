'use strict';

(function () {
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
  window.data = {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    getRandomSizeArray: getRandomSizeArray
  };
})();
