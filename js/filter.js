'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var selectFilterTypes = mapFilter.querySelector('#housing-type');
  var selectFilterPrices = mapFilter.querySelector('#housing-price');
  var selectFilterRooms = mapFilter.querySelector('#housing-rooms');
  var selectFilterGuets = mapFilter.querySelector('#housing-guests');

  var currentFilter = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any'
  };

  var isAny = function (value) {
    return value === 'any';
  };

  var is = function (value, currentValue) {
    return isAny(currentValue) || value.toString() === currentValue;
  };

  // var isCheckbox = function (value, currentValue) {
  //   if (!value) {
  //     return false;
  //   }
  //   for (var i = 0; i < value.length; i++) {
  //     if (value[i] === currentValue) {
  //       return true;
  //     }
  //   }
  // };

  var isPrice = function (value, currentValue) {
    var minPrice = 10000;
    var maxPrice = 50000;
    if (isAny(currentValue)) {
      return true;
    }
    switch (currentValue) {
      case 'middle': {
        return value >= minPrice && value <= maxPrice;
      }
      case 'low': {
        return value <= minPrice;
      }
      case 'high': {
        return value >= maxPrice;
      }
    }
    return false;
  };

  // var checkboxsFilterChangeHandler = function (evt) {

  // };

  var selectFilterChangeHandler = function (evt) {
    currentFilter[evt.target.name] = evt.target.value;
    var arr = window.map.returnAllAds();
    var filteredPins = arr.filter(function (ad) {
      return is(ad.offer.type, currentFilter['housing-type'])
        && is(ad.offer.rooms, currentFilter['housing-rooms'])
        && is(ad.offer.guests, currentFilter['housing-guests'])
        && isPrice(ad.offer.price, currentFilter['housing-price']);
    });

    window.map.renderHouses(filteredPins);
  };

  selectFilterTypes.addEventListener('change', selectFilterChangeHandler);
  selectFilterRooms.addEventListener('change', selectFilterChangeHandler);
  selectFilterGuets.addEventListener('change', selectFilterChangeHandler);
  selectFilterPrices.addEventListener('change', selectFilterChangeHandler);
})();
