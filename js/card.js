'use strict';

(function () {
  var TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    palace: 'Дворец',
    house: 'Дом'
  };

  var similarHouseTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderPhotos = function (photos, alt, parent) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var element = document.createElement('img');
      element.alt = alt[i];
      element.src = photos[i];
      element.width = '45';
      element.height = '40';
      element.classList.add('popup__photo');
      fragment.appendChild(element);
    }
    parent.appendChild(fragment);
  };

  var renderPromoHouse = function (house) {
    var housePromoElement = similarHouseTemplate.cloneNode(true);
    var popupPhotos = housePromoElement.querySelector('.popup__photos');

    housePromoElement.querySelector('.popup__title').textContent = house.offer.title;
    housePromoElement.querySelector('.popup__text--address').textContent = house.location.x + ', ' + house.location.y;
    housePromoElement.querySelector('.popup__text--price').textContent = house.offer.price + '₽/ночь.';
    housePromoElement.querySelector('.popup__type').textContent = TYPES[house.offer.type];
    housePromoElement.querySelector('.popup__text--capacity').textContent = house.offer.rooms + ' комнаты для ' + house.offer.guests + ' гостей.';
    housePromoElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + house.offer.checkin + ', выезд до ' + house.offer.checkout;
    housePromoElement.querySelector('.popup__description ').textContent = house.offer.description;
    housePromoElement.querySelector('.popup__avatar').src = house.author.avatar;
    renderPhotos(house.offer.photos, house.offer.title, popupPhotos);
    return housePromoElement;
  };

  window.card = {
    renderPromoHouse: renderPromoHouse
  };
})();
