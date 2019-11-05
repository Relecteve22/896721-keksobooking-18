'use strict';

(function () {
  var StartPin = {
    LEFT: 570,
    TOP: 375
  };
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var MyPin = {
    WIDTH: 62,
    HEIGHT: 82
  };
  var MAX_NUMBER_PINS = 5;

  var map = document.querySelector('.map');
  var myPin = document.querySelector('.map__pin--main');
  var mapFiltersForm = document.querySelector('.map__filters');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var inputCordenatios = document.querySelector('#address');
  var main = document.querySelector('main');

  var mapWidth = map.offsetWidth;
  var allAds = [];
  var sharpMarkX = Pin.WIDTH / 2;
  var mysharpMarkX = MyPin.WIDTH / 2;

  var renderPinHouse = function (house) {
    var housePinElement = similarPinTemplate.cloneNode(true);

    housePinElement.querySelector('img').src = house.author.avatar;
    housePinElement.querySelector('img').alt = house.offer.title;
    housePinElement.style.left = (house.location.x - sharpMarkX) + 'px';
    housePinElement.style.top = house.location.y - Pin.HEIGHT + 'px';
    return housePinElement;
  };

  var renderHouses = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_NUMBER_PINS; i++) {
      var ad = ads[i];
      var pinElement = renderPinHouse(ad);
      var clickHandler = window.card.createClickPinHandler(ad);
      pinElement.addEventListener('click', clickHandler);
      fragment.appendChild(pinElement);
    }
    return map.appendChild(fragment);
  };
  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.toogleForm(window.form.adForm, false);
    window.form.toogleForm(mapFiltersForm, false);
    inputCordenatios.disabled = true;
  };

  var cordinatesPinInputStart = function () {
    inputCordenatios.value = (StartPin.LEFT + sharpMarkX) + ', ' + (StartPin.TOP + Pin.HEIGHT / 2);
  };

  window.form.toogleForm(window.form.adForm, true);
  window.form.toogleForm(mapFiltersForm, true);

  cordinatesPinInputStart();
  window.form.houseTypeDoValidity(window.form.minPriceHouses);

  var successHandler = function (ads) {
    allAds = ads;
    renderHouses(allAds);
  };

  var showModal = function () {
    var errorTempaltePopup = errorTemplate.cloneNode(true);
    var closeButton = errorTempaltePopup.querySelector('.error__button');

    var closeModal = function () {
      main.removeChild(errorTempaltePopup);
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    var onDocumentKeydown = function (evt) {
      if (!window.util.isEsc(evt)) {
        return;
      }
      closeModal();
    };

    document.addEventListener('keydown', onDocumentKeydown);

    closeButton.addEventListener('click', function () {
      closeModal();
    });

    main.appendChild(errorTempaltePopup);
  };

  var errorHandler = function () {
    showModal();
  };

  var activeAndLoad = function () {
    activatePage();
    window.backend.load(successHandler, errorHandler);
    myPin.removeEventListener('mousedown', myPinMouseDownHanlder);
    myPin.removeEventListener('keydown', myPinKeydownHandler);
  };

  var myPinMouseDownHanlder = function () {
    activeAndLoad();
  };

  var myPinKeydownHandler = function (evt) {
    if (window.util.isEnter(evt)) {
      activeAndLoad();
    }
  };

  myPin.addEventListener('mousedown', myPinMouseDownHanlder);
  myPin.addEventListener('keydown', myPinKeydownHandler);

  var getPinLeft = function (left) {
    if (left < window.pin.MIN_X_PIN - mysharpMarkX) {
      return window.pin.MIN_X_PIN - mysharpMarkX;
    }

    if ((left + MyPin.WIDTH) > mapWidth + mysharpMarkX) {
      return (mapWidth + mysharpMarkX) - MyPin.WIDTH;
    }

    return left;
  };

  var getPinTop = function (top) {
    if (top < window.pin.MIN_Y_PIN - MyPin.HEIGHT) {
      return window.pin.MIN_Y_PIN - MyPin.HEIGHT;
    }

    if ((top + MyPin.HEIGHT) > window.pin.MAX_Y_PIN) {
      return window.pin.MAX_Y_PIN - MyPin.HEIGHT;
    }

    return top;
  };

  var movePin = function (left, top) {
    myPin.style.top = top + 'px';
    myPin.style.left = left + 'px';
  };

  myPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
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

      var coodXLeftMyPin = myPin.offsetLeft - shift.x;
      var coodYTopMyPin = myPin.offsetTop - shift.y;

      var updateAddress = function (left, top) {
        inputCordenatios.value = (left + Math.floor(mysharpMarkX)) + ', ' + (top + MyPin.HEIGHT);
      };

      var left = getPinLeft(coodXLeftMyPin);
      var top = getPinTop(coodYTopMyPin);

      movePin(left, top);

      updateAddress(left, top);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (defaultEvt) {
          defaultEvt.preventDefault();
          myPin.removeEventListener('click', onClickPreventDefault);
        };
        myPin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    element: map,
    mapFiltersForm: mapFiltersForm
  };
})();
