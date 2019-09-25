'use strict';

var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_HOUSE = ['12:00', '13:00', '14:00'];
var CHECKOUT_HOUSE = ['12:00', '13:00', '14:00'];
var FEATURES_HOUSE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLE_HOUSE = ['Полуразволившейся сарай', 'Шикарный пентхаус на крыше пятиэтажки', 'Квартира для праздников'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
    x: getRandomInt(10, 1140),
    y: getRandomInt(130, 630)
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
      price: getRandomInt(1000, 1000000),
      type: getRandomElement(TYPE_HOUSE),
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 10),
      checkin: getRandomElement(CHECKIN_HOUSE),
      checkout: getRandomElement(CHECKOUT_HOUSE),
      features: getRandomElement(FEATURES_HOUSE),
      photos: PHOTOS[index],
    }
  };
};

var createRandomAds = function () {
  var houses = [];
  for (var i = 0; i < 3; i++) {
    houses[i] = createRandomAd(i);
  }
  return houses;
};

var renderPinHouse = function (house) {
  var housePinElement = similarPinTemplate.cloneNode(true);

  housePinElement.querySelector('img').src = house.author.avatar;
  housePinElement.querySelector('img').alt = house.offer.title;
  housePinElement.style = ('left: ' + house.location.x + 'px; top: ' + house.location.y + 'px;');
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
