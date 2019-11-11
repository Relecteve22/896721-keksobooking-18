'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var selectFilterTypes = mapFilter.querySelector('#housing-type');
  var selectFilterPrices = mapFilter.querySelector('#housing-price');
  var selectFilterRooms = mapFilter.querySelector('#housing-rooms');
  var selectFilterGuets = mapFilter.querySelector('#housing-guests');
  var featuresFilter = mapFilter.querySelector('#housing-features');

  var currentFilter = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any'
  };

  var currentFeaturesFilter = {
    'wifi': '',
    'dishwasher': '',
    'parking': '',
    'washer': '',
    'elevator': '',
    'conditioner': ''
  };

  var isAny = function (value) {
    return value === 'any';
  };

  var is = function (value, currentValue) {
    return isAny(currentValue) || value.toString() === currentValue;
  };

  var isCheckbox = function (value, currentValue) {
    for (var i = 0; i < value.length; i++) {
      if (value[i] === currentValue) {
        return true;
      }
      return false;
    }
    return false;
  };

  var isPrice = function (value, currentValue) {
    var Price = {
      min: 10000,
      max: 50000
    };
    if (isAny(currentValue)) {
      return true;
    }
    switch (currentValue) {
      case 'middle': {
        return value >= Price.min && value <= Price.max;
      }
      case 'low': {
        return value <= Price.min;
      }
      case 'high': {
        return value >= Price.max;
      }
    }
    return false;
  };

  var checkboxsFilterChangeHandler = function (evt) {
    currentFeaturesFilter[evt.target.checked] = evt.target.value;
    var allAds = window.map.returnAllAds();
    var filteredPins = allAds.filter(function (ad) {
      return isCheckbox(ad.offer.features, currentFeaturesFilter[true]);
    });

    window.map.renderHouses(filteredPins);
  };

  var selectFilterChangeHandler = function (evt) {
    currentFilter[evt.target.name] = evt.target.value;
    var allAds = window.map.returnAllAds();
    var filteredPins = allAds.filter(function (ad) {
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
  featuresFilter.addEventListener('change', checkboxsFilterChangeHandler);
})();
