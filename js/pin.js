'use strict';

(function () {
  var TYPES_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_HOUSE = ['12:00', '13:00', '14:00'];
  var CHECKOUT_HOUSE = ['12:00', '13:00', '14:00'];
  var FEATURES_HOUSE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TITLE_HOUSE = ['Полуразволившейся сарай', 'Шикарный пентхаус на крыше пятиэтажки', 'Квартира для праздников'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 10;
  var MIN_GUETS = 1;
  var MAX_GUETS = 10;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var PINS = 8;
  var MIN_Y_PIN = 130;
  var MAX_Y_PIN = 630;
  var MIN_X_PIN = 0;
  var MAX_X_PIN = 1200;

  var createHouse = function (index) {
    var location = {
      x: window.data.getRandomInt(MIN_X_PIN, MAX_X_PIN),
      y: window.data.getRandomInt(MIN_Y_PIN, MAX_Y_PIN)
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
        title: window.data.getRandomElement(TITLE_HOUSE),
        address: location.x + ', ' + location.y,
        price: window.data.getRandomInt(MIN_PRICE, MAX_PRICE),
        type: window.data.getRandomElement(TYPES_HOUSE),
        rooms: window.data.getRandomInt(MIN_ROOMS, MAX_ROOMS),
        guests: window.data.getRandomInt(MIN_GUETS, MAX_GUETS),
        checkin: window.data.getRandomElement(CHECKIN_HOUSE),
        checkout: window.data.getRandomElement(CHECKOUT_HOUSE),
        features: window.data.getRandomElement(FEATURES_HOUSE),
        photos: window.data.getRandomSizeArray(PHOTOS),
        description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'
      }
    };
  };
  var createHouses = function () {
    var houses = [];
    for (var i = 0; i < PINS; i++) {
      houses[i] = createHouse(i);
    }
    return houses;
  };

  window.pin = {
    TYPES_HOUSE: TYPES_HOUSE,
    CHECKIN_HOUSE: CHECKIN_HOUSE,
    CHECKOUT_HOUSE: CHECKOUT_HOUSE,
    FEATURES_HOUSE: FEATURES_HOUSE,
    TITLE_HOUSE: TITLE_HOUSE,
    PHOTOS: PHOTOS,
    createHouses: createHouses,
    MIN_Y_PIN: MIN_Y_PIN,
    MAX_Y_PIN: MAX_Y_PIN,
    MIN_X_PIN: MIN_X_PIN,
    MAX_X_PIN: MAX_X_PIN
  };
})();
