'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    palace: 'Дворец',
    house: 'Дом'
  };
  // это объекты для маппинга, а для не перечисления.
  var FEATURES_CLASS = {
    wifi: 'popup__feature--wifi',
    dishwasher: 'popup__feature--dishwasher',
    parking: 'popup__feature--parking',
    washer: 'popup__feature--washer',
    elevator: 'popup__feature--elevator',
    conditioner: 'popup__feature--conditioner'
  };

  var currentPromo = null;

  var createClickPinHandler = function (ad) {
    var clickPinHandler = function () {
      renderInfoAboutHouse(ad);
    };
    return clickPinHandler;
  };

  var closePromo = function () {
    if (!currentPromo) {
      return;
    }
    window.map.element.removeChild(currentPromo);
    currentPromo = null;

    document.removeEventListener('keydown', documentKeydownHandler);
  };

  var documentKeydownHandler = function (evt) {
    if (window.util.isEsc(evt)) {
      closePromo();
    }
  };

  var similarHouseTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderPhotos = function (photos, alt, parent) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      var element = document.createElement('img');
      element.alt = alt;
      element.src = photo;
      element.width = PHOTO_WIDTH + '';
      element.height = PHOTO_HEIGHT + '';
      element.classList.add('popup__photo');
      fragment.appendChild(element);
    });
    parent.appendChild(fragment);
  };

  var renderFeatures = function (features, parent) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      var element = document.createElement('li');
      element.classList.add('popup__feature', FEATURES_CLASS[feature]);
      fragment.appendChild(element);
    });
    parent.appendChild(fragment);
  };

  var renderPromoHouse = function (house) {
    var housePromoElement = similarHouseTemplate.cloneNode(true);
    var popupPhotos = housePromoElement.querySelector('.popup__photos');
    var popupFeatures = housePromoElement.querySelector('.popup__features');
    var popupDescription = housePromoElement.querySelector('.popup__description');
    var closeButton = housePromoElement.querySelector('.popup__close');

    var removeElementCard = function (object, elementDelete) {
      if (!(object && object.length)) {
        housePromoElement.removeChild(elementDelete);
      }
    };

    removeElementCard(house.offer.features, popupFeatures);
    removeElementCard(house.offer.photos, popupPhotos);
    removeElementCard(house.offer.description, popupDescription);

    housePromoElement.querySelector('.popup__title').textContent = house.offer.title;
    housePromoElement.querySelector('.popup__text--address').textContent = house.location.x + ', ' + house.location.y;
    housePromoElement.querySelector('.popup__text--price').textContent = house.offer.price + '₽/ночь.';
    housePromoElement.querySelector('.popup__type').textContent = TYPES[house.offer.type];
    housePromoElement.querySelector('.popup__text--capacity').textContent = house.offer.rooms + ' комнаты для ' + house.offer.guests + ' гостей.';
    housePromoElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + house.offer.checkin + ', выезд до ' + house.offer.checkout;
    housePromoElement.querySelector('.popup__avatar').src = house.author.avatar;
    if (house.offer.description) {
      popupDescription.textContent = house.offer.description;
    }
    if (house.offer.features) {
      renderFeatures(house.offer.features, popupFeatures);
    }
    if (house.offer.photos) {
      renderPhotos(house.offer.photos, house.offer.title, popupPhotos);
    }

    closeButton.addEventListener('click', function () {
      closePromo();
    });

    return housePromoElement;
  };

  var renderInfoAboutHouse = function (ad) {
    closePromo();

    var promoElement = renderPromoHouse(ad);
    currentPromo = promoElement;

    document.addEventListener('keydown', documentKeydownHandler);

    return window.map.element.appendChild(promoElement);
  };

  window.card = {
    createClickPinHandler: createClickPinHandler,
    closePromo: closePromo
  };
})();
