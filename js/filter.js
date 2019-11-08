'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var selectFilterTypes = mapFilter.querySelector('#housing-type');
  var selectFilterPrices = mapFilter.querySelector('#housing-price');
  var selectFilterRooms = mapFilter.querySelector('#housing-rooms');
  var selectFilterGuets = mapFilter.querySelector('#housing-guests');

  var currentFilter = {
    type: 'any',
    price: 'any',
    room: 'any',
    guest: 'any'
  };

  var isAny = function (value) {
    return value === 'any';
  };

  var is = function (value, currentValue) {
    console.log(value === currentValue);
    console.log(value === currentValue && value === currentValue);
    console.log(isAny(currentValue) || value === currentValue);
    return isAny(currentValue) || value === currentValue;
  };

  var onSelectFilterChange = function (evt) {
    currentFilter[evt.target.name] = evt.target.value;
    var arr = window.returnAllAds();

    var filteredPins = arr.filter(function (ad) {
      // console.log('-------------------');
      // console.log(currentFilter.type);
      // console.log('ad.offer.type');
      // console.log(ad.offer.type);
      return is(ad.offer.type, currentFilter.type) && is(ad.offer.room, currentFilter.room) && is(ad.offer.guest, currentFilter.guest);
    });

    console.log(filteredPins);

    window.map.render(filteredPins);
  };

  selectFilterTypes.addEventListener('change', onSelectFilterChange);
  selectFilterRooms.addEventListener('change', onSelectFilterChange);
  selectFilterGuets.addEventListener('change', onSelectFilterChange);

  // var isHouseType = function (ad) {
  //   if (selectFilterTypes.value === 'any') {
  //     return true;
  //   }
  //   if (selectFilterTypes.value === ad.offer.type) {
  //     return true;
  //   }
  //   return false;
  // };

  // var isHouseRooms = function (ad) {
  //   if (selectFilterRooms.value === 'any') {
  //     return true;
  //   }
  //   if (selectFilterRooms.value === ad.offer.rooms) {
  //     return true;
  //   }
  //   return false;
  // };

  // var isHouseGuests = function (ad) {
  //   if (selectFilterGuets.value === 'any') {
  //     return true;
  //   }
  //   if (selectFilterGuets.value === ad.offer.guests) {
  //     return true;
  //   }
  //   return false;
  // };

  // var isFilter = function (ad) {
  //   return isHouseType(ad) && isHouseRooms(ad) && isHouseGuests(ad);
  // };

  // window.filter = {
  //   isFilter: isFilter
  // };
})();
