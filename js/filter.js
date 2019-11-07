'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var selectFilterTypes = mapFilter.querySelector('#housing-type');
  var selectFilterPrices = mapFilter.querySelector('#housing-price');
  var selectFilterRooms = mapFilter.querySelector('#housing-rooms');
  var selectFilterGuets = mapFilter.querySelector('#housing-guests');

  var isHouseType = function (ad) {
    if (selectFilterTypes.value === 'any') {
      return true;
    }
    if (selectFilterTypes.value === ad.offer.type) {
      return true;
    }
    return false;
  };

  var isHouseRooms = function (ad) {
    if (selectFilterRooms.value === 'any') {
      return true;
    }
    if (selectFilterRooms.value === ad.offer.rooms) {
      return true;
    }
    return false;
  };

  var isHouseGuests = function (ad) {
    if (selectFilterGuets.value === 'any') {
      return true;
    }
    if (selectFilterGuets.value === ad.offer.guests) {
      return true;
    }
    return false;
  };

  var isFilter = function (ad) {
    return isHouseType(ad) && isHouseRooms(ad) && isHouseGuests(ad);
  };

  window.filter = {
    isFilter: isFilter
  };
})();
