'use strict';

(function () {
  var BorderMap = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0
  };
  var MyPin = {
    WIDTH: 62,
    HEIGHT: 82
  };
  var StartMyPin = {
    Y: 375,
    X: 570
  };

  var myPinElement = document.querySelector('.map__pin--main');

  var mysharpMarkX = MyPin.WIDTH / 2;

  var getPinLeft = function (left) {
    if (left < BorderMap.MIN_X - mysharpMarkX) {
      return BorderMap.MIN_X - mysharpMarkX;
    }

    if ((left + MyPin.WIDTH) > window.map.width + mysharpMarkX) {
      return (window.map.width + mysharpMarkX) - MyPin.WIDTH;
    }

    return left;
  };

  var getPinTop = function (top) {
    if (top < BorderMap.MIN_Y - MyPin.HEIGHT) {
      return BorderMap.MIN_Y - MyPin.HEIGHT;
    }

    if ((top + MyPin.HEIGHT) > BorderMap.MAX_Y) {
      return BorderMap.MAX_Y - MyPin.HEIGHT;
    }

    return top;
  };

  var movePin = function (left, top) {
    myPinElement.style.top = top + 'px';
    myPinElement.style.left = left + 'px';
  };

  var resultCoordPin = function (left, top) {
    myPinElement.style.top = top + 'px';
    myPinElement.style.left = left + 'px';
  };

  myPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var MouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coodXLeftMyPin = myPinElement.offsetLeft - shift.x;
      var coodYTopMyPin = myPinElement.offsetTop - shift.y;

      var updateAddress = function (left, top) {
        window.map.inputCordenatios.value = (left + Math.floor(mysharpMarkX)) + ', ' + (top + MyPin.HEIGHT);
      };

      var left = getPinLeft(coodXLeftMyPin);
      var top = getPinTop(coodYTopMyPin);

      movePin(left, top);

      updateAddress(left, top);
    };

    var MouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);

      if (dragged) {
        var ClickPreventDefaultHandler = function (defaultEvt) {
          defaultEvt.preventDefault();
          myPinElement.removeEventListener('click', ClickPreventDefaultHandler);
        };
        myPinElement.addEventListener('click', ClickPreventDefaultHandler);
      }
    };
    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  });

  window.pin = {
    myElement: myPinElement,
    resultCoordPin: resultCoordPin,
    StartMyPin: StartMyPin
  };
})();
