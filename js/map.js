'use strict';

(function () {
  var START_PIN_LEFT = 570;
  var START_PIN_TOP = 375;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MY_PIN_WIDTH = 65;
  var MY_PIN_HEIGHT = 65;
  var map = document.querySelector('.map');
  var myPin = document.querySelector('.map__pin--main');
  var mapFiltersForm = document.querySelector('.map__filters');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var inputCordenatios = document.querySelector('#address');
  var main = document.querySelector('main');
  var mapWidth = map.offsetWidth;
  var allAds = [];
  var currentPromo = null;
  var sharpMarkX = PIN_WIDTH / 2;
  var mysharpMarkX = MY_PIN_WIDTH / 2;
  var MAX_NUMBER_PINS = 5;

  var pins = [];

  // var successHandler = function (data) {
  //   pins = data;
  //   window.render(pins);
  // };

  var renderPinHouse = function (house) {
    var housePinElement = similarPinTemplate.cloneNode(true);

    housePinElement.querySelector('img').src = house.author.avatar;
    housePinElement.querySelector('img').alt = house.offer.title;
    housePinElement.style.left = (house.location.x + sharpMarkX) + 'px';
    housePinElement.style.top = house.location.y + PIN_HEIGHT + 'px';
    return housePinElement;
  };
  var renderInfoAboutHouse = function (ad) {
    if (currentPromo) {
      map.removeChild(currentPromo);
    }

    var promoElement = window.card.renderPromoHouse(ad);
    currentPromo = promoElement;
    return map.appendChild(promoElement);
  };

  var renderHouses = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_NUMBER_PINS; i++) {
      var pinElement = renderPinHouse(ads[i]);
      var clickHandler = createClickPinHandler(i);
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
    inputCordenatios.value = (START_PIN_LEFT + sharpMarkX) + ', ' + (START_PIN_TOP + PIN_HEIGHT / 2);
  };

  window.form.toogleForm(window.form.adForm, true);
  window.form.toogleForm(mapFiltersForm, true);

  cordinatesPinInputStart();
  window.form.houseTypeDoValidity(window.form.minPriceHouses);

  var successHandler = function (ads) {
    allAds = ads;
    renderHouses(allAds);
  };

  var createClickPinHandler = function (index) {
    var clickPinHandler = function () {
      renderInfoAboutHouse(allAds[index]);
    };
    return clickPinHandler;
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

  myPin.addEventListener('mousedown', activeAndLoad);
  myPin.addEventListener('keydown', myPinKeydownHandler);

  var getPinLeft = function (left) {
    if (left < window.pin.MIN_X_PIN - mysharpMarkX) {
      return window.pin.MIN_X_PIN - mysharpMarkX;
    }

    if ((left + MY_PIN_WIDTH) > mapWidth + mysharpMarkX) {
      return (mapWidth + mysharpMarkX) - MY_PIN_WIDTH;
    }

    return left;
  };

  var getPinTop = function (top) {
    if (top < window.pin.MIN_Y_PIN - MY_PIN_HEIGHT) {
      return window.pin.MIN_Y_PIN - MY_PIN_HEIGHT;
    }

    if ((top + MY_PIN_HEIGHT) > window.pin.MAX_Y_PIN) {
      return window.pin.MAX_Y_PIN - MY_PIN_HEIGHT;
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
        inputCordenatios.value = (left + Math.round(mysharpMarkX)) + ', ' + (top + MY_PIN_HEIGHT);
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
    map: map,
    mapFiltersForm: mapFiltersForm
  };
})();
