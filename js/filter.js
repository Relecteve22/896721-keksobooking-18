'use strict';

(function () {
  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var mapFilterElement = document.querySelector('.map__filters');
  var selectFilterTypesElement = mapFilterElement.querySelector('#housing-type');
  var selectFilterPricesElement = mapFilterElement.querySelector('#housing-price');
  var selectFilterRoomsElement = mapFilterElement.querySelector('#housing-rooms');
  var selectFilterGuetsElement = mapFilterElement.querySelector('#housing-guests');
  var featuresFilterElement = mapFilterElement.querySelector('#housing-features');

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

  var isCheckbox = function (features) {
    if (checkboxCount === 0) {
      return true;
    }
    for (var i = 0; i < features.length; i++) {
      if (currentFeaturesFilter[features[i]]) {
        return true;
      }
    }
    return false;
  };

  var isPrice = function (value, currentValue) {
    if (isAny(currentValue)) {
      return true;
    }
    switch (currentValue) {
      case 'middle': {
        return value >= Price.MIN && value <= Price.MAX;
      }
      case 'low': {
        return value <= Price.MIN;
      }
      case 'high': {
        return value >= Price.MAX;
      }
    }
    return false;
  };

  var filterPins = function () {
    var allAds = window.map.returnAllAds();
    var filteredPins = allAds.filter(function (ad) {
      return is(ad.offer.type, currentFilter['housing-type'])
        && is(ad.offer.rooms, currentFilter['housing-rooms'])
        && is(ad.offer.guests, currentFilter['housing-guests'])
        && isPrice(ad.offer.price, currentFilter['housing-price'])
        && isCheckbox(ad.offer.features);
    });
    window.map.renderHouses(filteredPins);
  };

  var filterPinsDebounced = window.util.debounce(filterPins);

  var checkboxCount = 0;

  var checkboxsFilterChangeHandler = function (evt) {
    window.card.closePromo();
    currentFeaturesFilter[evt.target.value] = evt.target.checked;
    if (evt.target.checked) {
      checkboxCount++;
    } else {
      checkboxCount--;
    }
    filterPinsDebounced();
  };

  var selectFilterChangeHandler = function (evt) {
    window.card.closePromo();
    currentFilter[evt.target.name] = evt.target.value;
    filterPinsDebounced();
  };

  selectFilterTypesElement.addEventListener('change', selectFilterChangeHandler);
  selectFilterRoomsElement.addEventListener('change', selectFilterChangeHandler);
  selectFilterGuetsElement.addEventListener('change', selectFilterChangeHandler);
  selectFilterPricesElement.addEventListener('change', selectFilterChangeHandler);
  featuresFilterElement.addEventListener('change', checkboxsFilterChangeHandler);

  window.filter = {
    formElement: mapFilterElement
  };
})();
