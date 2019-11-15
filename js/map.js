'use strict';

(function () {
  var MAX_NUMBER_PINS = 5;
  var StartPin = {
    LEFT: 570,
    TOP: 375
  };

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var inputCordenatios = document.querySelector('#address');
  var map = document.querySelector('.map');
  var mapFiltersForm = document.querySelector('.map__filters');
  var main = document.querySelector('main');

  var mapWidth = map.offsetWidth;
  var allAds = [];
  var sharpMarkX = Pin.WIDTH / 2;
  var renderedPins = [];

  var renderPinHouse = function (house) {
    var housePinElement = similarPinTemplate.cloneNode(true);

    housePinElement.querySelector('img').src = house.author.avatar;
    housePinElement.querySelector('img').alt = house.offer.title;
    housePinElement.style.left = (house.location.x - sharpMarkX) + 'px';
    housePinElement.style.top = house.location.y - Pin.HEIGHT + 'px';
    return housePinElement;
  };

  var destroyPins = function () {
    if (!(renderedPins && renderedPins.length)) {
      return;
    }

    renderedPins.forEach(function (element) {
      map.removeChild(element);
    });

    renderedPins = [];
  };

  var renderHouses = function (ads) {
    destroyPins();
    var adsCopy = ads.slice();
    if (adsCopy.length > MAX_NUMBER_PINS) {
      adsCopy.length = MAX_NUMBER_PINS;
    }
    var fragment = document.createDocumentFragment();
    adsCopy.forEach(function (ad) {
      var pinElement = renderPinHouse(ad);
      renderedPins.push(pinElement);
      var clickHandler = window.card.createClickPinHandler(ad);
      pinElement.addEventListener('click', clickHandler);
      fragment.appendChild(pinElement);
    });
    return map.appendChild(fragment);
  };
  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.ad.classList.remove('ad-form--disabled');
    window.form.toogleForm(window.form.ad, false);
    inputCordenatios.disabled = false;
  };

  var cordinatesPinInputStart = function () {
    inputCordenatios.value = (StartPin.LEFT + sharpMarkX) + ', ' + (StartPin.TOP + Pin.HEIGHT / 2);
  };

  window.form.toogleForm(window.form.ad, true);
  window.form.toogleForm(mapFiltersForm, true);

  cordinatesPinInputStart();
  window.form.houseTypeDoValidity(window.form.MIN_PRICE_HOUSES);

  var successHandler = function (ads) {
    allAds = ads;
    renderHouses(allAds);
    window.form.toogleForm(mapFiltersForm, false);
  };
  var showModalError = function () {
    var errorTempaltePopup = errorTemplate.cloneNode(true);
    var closeButton = errorTempaltePopup.querySelector('.error__button');

    var closeModal = function () {
      main.removeChild(errorTempaltePopup);
      document.removeEventListener('keydown', documentKeydownHandler);
    };

    var documentKeydownHandler = function (evt) {
      if (!window.util.isEsc(evt)) {
        return;
      }
      closeModal();
    };

    document.addEventListener('keydown', documentKeydownHandler);

    closeButton.addEventListener('click', function () {
      closeModal();
    });

    errorTempaltePopup.addEventListener('click', function () {
      closeModal();
    });

    main.appendChild(errorTempaltePopup);
  };

  var errorHandler = function () {
    showModalError();
  };

  var activeAndLoad = function () {
    activatePage();
    window.backend.load(successHandler, errorHandler);
    window.pin.myElement.removeEventListener('mousedown', myPinMouseDownHanlder);
    window.pin.myElement.removeEventListener('keydown', myPinKeydownHandler);
  };

  var myPinMouseDownHanlder = function () {
    activeAndLoad();
  };

  var myPinKeydownHandler = function (evt) {
    if (window.util.isEnter(evt)) {
      activeAndLoad();
    }
  };

  window.pin.myElement.addEventListener('mousedown', myPinMouseDownHanlder);
  window.pin.myElement.addEventListener('keydown', myPinKeydownHandler);

  var returnAllAds = function () {
    return allAds;
  };

  var returnRenderedPins = function () {
    return renderedPins;
  };

  window.map = {
    main: main,
    element: map,
    width: mapWidth,
    inputCordenatios: inputCordenatios,
    returnAllAds: returnAllAds,
    renderHouses: renderHouses,
    showModalError: showModalError,
    destroyPins: destroyPins,
    myPinMouseDownHanlder: myPinMouseDownHanlder,
    myPinKeydownHandler: myPinKeydownHandler,
    returnRenderedPins: returnRenderedPins
  };
})();
