'use strict';

(function () {
  var similarHouseTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderPromoHouse = function (house) {
    var housePromoElement = similarHouseTemplate.cloneNode(true);

    housePromoElement.querySelector('.popup__title').textContent = house.offer.title;
    housePromoElement.querySelector('.popup__text--address').textContent = house.location.x + ', ' + house.location.y;
    housePromoElement.querySelector('.popup__text--price').textContent = house.offer.price + '₽/ночь.';
    // housePromoElement.querySelector('.popup__type').textContent = window.data.getRandomElement(window.map.getLangTypeHouse());
    housePromoElement.querySelector('.popup__text--capacity').textContent = house.offer.rooms + ' комнаты для ' + house.offer.guests + ' гостей.';
    housePromoElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + house.offer.checkin + ', выезд до ' + house.offer.checkout;
    housePromoElement.querySelector('.popup__description ').textContent = house.offer.description;
    housePromoElement.querySelector('.popup__avatar').src = house.author.avatar;
    housePromoElement.querySelector('.popup__photo').src = window.pin.PHOTOS[house.offer.photos];
    return housePromoElement;
  };

  window.card = {
    renderPromoHouse: renderPromoHouse
  };
})();
