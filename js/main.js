'use strict';

var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_HOUSE = ['12:00', '13:00', '14:00'];
var CHECKOUT_HOUSE = ['12:00', '13:00', '14:00'];
var FEATURES_HOUSE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLE_HOUSE = ['Полуразволившейся сарай', 'Шикарный пентхаус на крыше пятиэтажки', 'Квартира для праздников'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_ROOMS = 1;
var MAX_ROOMS = 10;
var MIN_GUETS = 1;
var MAX_GUETS = 10;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var PINS = 8;
var MIN_Y_PIN = 130;
var MAX_Y_PIN = 630;
var MIN_X_PIN = 10;
var MAX_X_PIN = 1120;
var PHOTOS = ['/assets/images/tokyo/hotel1.jpg', '/assets/images/tokyo/hotel2.jpg', '/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
// var similarHouseTemplate = document.querySelector("#card").content.querySelector(".map__card");
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getRandomElement = function (elements) {
  return elements[getRandomInt(0, elements.length - 1)];
};
var createRandomAd = function (index) {
  var location = {
    x: getRandomInt(MIN_X_PIN, MAX_X_PIN),
    y: getRandomInt(MIN_Y_PIN, MAX_Y_PIN)
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    location: {
      x: location.x,
      y: location.y
    },
    offer: {
      title: getRandomElement(TITLE_HOUSE),
      address: location.x + ', ' + location.y,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPE_HOUSE),
      rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInt(MIN_GUETS, MAX_GUETS),
      checkin: getRandomElement(CHECKIN_HOUSE),
      checkout: getRandomElement(CHECKOUT_HOUSE),
      features: getRandomElement(FEATURES_HOUSE),
      photos: PHOTOS[index],
    }
  };
};

var createRandomAds = function () {
  var houses = [];
  for (var i = 0; i < PINS; i++) {
    houses[i] = createRandomAd(i);
  }
  return houses;
};

var renderPinHouse = function (house) {
  var housePinElement = similarPinTemplate.cloneNode(true);

  housePinElement.querySelector('img').src = house.author.avatar;
  housePinElement.querySelector('img').alt = house.offer.title;
  housePinElement.style.left = (house.location.x + PIN_WIDTH / 2) + 'px';
  housePinElement.style.top = house.location.y + PIN_HEIGHT + 'px';
  return housePinElement;
};

var renderAds = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPinHouse(ads[i]));
  }
  return map.appendChild(fragment);
};

renderAds(createRandomAds());

map.classList.remove('map--faded');
