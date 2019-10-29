'use strict';

(function () {
  // var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var START_PIN_LEFT = 570;
  var START_PIN_TOP = 375;
  var map = document.querySelector('.map');
  var myPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var inputCordenatios = document.querySelector('#address');
  // var infoButtonClose = document.querySelector('.popup__close');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MY_PIN_WIDTH = 65;
  var MY_PIN_HEIGHT = 65;
  var mapWidth = map.offsetWidth;

  var renderPinHouse = function (house) {
    var housePinElement = similarPinTemplate.cloneNode(true);

    housePinElement.querySelector('img').src = house.author.avatar;
    housePinElement.querySelector('img').alt = house.offer.title;
    housePinElement.style.left = (house.location.x + PIN_WIDTH / 2) + 'px';
    housePinElement.style.top = house.location.y + PIN_HEIGHT + 'px';
    return housePinElement;
  };
  var getLangTypeHouse = function () {
    var LangHouse = [];
    for (var i = 0; i < window.pin.TYPE_HOUSE.length; i++) {
      if (window.pin.TYPE_HOUSE[i] === 'flat') {
        LangHouse[i] = 'Квартира';
      }
      if (window.pin.TYPE_HOUSE[i] === 'bungalo') {
        LangHouse[i] = 'Бунгало';
      }
      if (window.pin.TYPE_HOUSE[i] === 'house') {
        LangHouse[i] = 'Дом';
      }
      if (window.pin.TYPE_HOUSE[i] === 'palace') {
        LangHouse[i] = 'Дворец';
      }
    }
    return LangHouse;
  };
  var renderInfoAboutHouse = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(window.card.renderPromoHouse(ads[i]));
    }
    return map.appendChild(fragment);
  };
  // var onAdClick = function (evt) {
  //   var fragment = document.createDocumentFragment();
  //   fragment.appendChild(renderPromoHouse(createHouses()[evt.target]));
  //   return fragment;
  // };
  var renderHouses = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPinHouse(ads[i]));
      // var adElement = renderPinHouse(ads[i]);
      // adElement.dataset.index = i;
      // adElement.addEventListener('click', onAdClick);
    }
    return map.appendChild(fragment);
  };

  var overPageHandler = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.toogleForm(adForm, false);
    window.form.toogleForm(mapFiltersForm, false);
    inputCordenatios.disabled = true;
  };

  var cordinatesPinInputStart = function () {
    inputCordenatios.value = (START_PIN_LEFT + PIN_WIDTH / 2) + ', ' + (START_PIN_TOP + PIN_HEIGHT / 2);
  };

  window.form.toogleForm(adForm, true);
  window.form.toogleForm(mapFiltersForm, true);

  cordinatesPinInputStart();
  window.form.houseTypeDoValidity(window.form.minPriceHouses);

  var buttonPinStartMenu = function () {
    overPageHandler();
    // renderInfoAboutHouse(window.pin.createHouses());
    renderHouses(window.pin.createHouses());
    myPin.removeEventListener('mousedown', buttonPinStartMenu);
    myPin.removeEventListener('keydown', buttonPinStartMenu);
  };

  myPin.addEventListener('mousedown', buttonPinStartMenu);
  myPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      buttonPinStartMenu();
    }
  });

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

      myPin.style.top = (myPin.offsetTop - shift.y) + 'px';
      myPin.style.left = (myPin.offsetLeft - shift.x) + 'px';
      inputCordenatios.value = ((myPin.offsetLeft - shift.x) + Math.round(MY_PIN_WIDTH / 2)) + ', ' + ((myPin.offsetTop - shift.y) + MY_PIN_HEIGHT);

      if ((myPin.offsetTop - shift.y) < window.pin.MIN_Y_PIN) {
        myPin.style.top = window.pin.MIN_Y_PIN + 'px';
      }
      if (((myPin.offsetTop - shift.y) + MY_PIN_HEIGHT) > window.pin.MAX_Y_PIN) {
        myPin.style.top = (window.pin.MAX_Y_PIN - MY_PIN_HEIGHT) + 'px';
      }
      if ((myPin.offsetLeft - shift.x) < window.pin.MIN_X_PIN) {
        myPin.style.left = window.pin.MIN_X_PIN + 'px';
      }
      if (((myPin.offsetLeft - shift.x) + MY_PIN_WIDTH) > mapWidth) {
        myPin.style.left = (window.pin.MAX_X_PIN - MY_PIN_WIDTH) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          myPin.removeEventListener('click', onClickPreventDefault);
        };
        myPin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    getLangTypeHouse: getLangTypeHouse,
    map: map
  };
})();
