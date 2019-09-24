'use strict';

var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_HOUSE = ['12:00', '13:00', '14:00'];
var CHECKOUT_HOUSE = ['12:00', '13:00', '14:00'];
var FEATURES_HOUSE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
var map = document.querySelector('.map');
var fragment = document.createDocumentFragment();
var similarHouseTemplate = document.querySelector('#card').content.querySelector('.map__card');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var getRandomElements = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};
var getHouse = function (index) {
  var infoHouse = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: 'Название',
      address: location.x + ' ' + location.y,
      price: 573,
      type: getRandomElements(TYPE_HOUSE),
      rooms: 5,
      guests: 6,
      checkin: getRandomElements(CHECKIN_HOUSE),
      checkout: getRandomElements(CHECKOUT_HOUSE),
      features: getRandomElements(FEATURES_HOUSE),
      photos: photos[index],
    },
    location: {
      x: getRandomInt(0, 560),
      y: getRandomInt(130, 630)
    }
  };
  return infoHouse;
};

var createArray = function () {
  var houses = [];
  for (var i = 0; i < 3; i++) {
    houses[i] = getHouse(i);
  }
  return houses;
};

var renderPinHouse = function (house, index) {
  var housePinElement = similarPinTemplate.cloneNode(true);

  housePinElement.querySelector('img').src = house[index].author.avatar;
  housePinElement.querySelector('img').alt = house[index].offer.title;
  housePinElement.style = ('left: ' + house[index].location.x + 'px; top: ' + house[index].location.y + 'px;');
  return housePinElement;
};

var renderHouses = function () {
  for (var i = 0; i < 3; i++) {
    fragment.appendChild(renderPinHouse(createArray(), i));
  }
  return fragment;
};

map.appendChild(renderHouses());

map.classList.remove('map--faded');
