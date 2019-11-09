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
    // console.log(value);
    return value === 'any';
  };

  var is = function (value, currentValue) {
    console.log(value);
    // console.log(value === currentValue);
    // console.log(value === currentValue && value === currentValue);
    // console.log(isAny(currentValue) || value === currentValue);
    // console.log(value);
    return isAny(currentValue) || value === currentValue;
  };

  var onSelectFilterChange = function (evt) {
    currentFilter[evt.target.name] = evt.target.value;
    // console.log(evt.target.name);
    // console.log(evt.target.value);
    var arr = window.returnAllAds();

    var ElementsFilterHousing = {
      type: 'housing-type',
      price: 'housing-price',
      rooms: 'housing-rooms',
      guests: 'housing-guests'
    };

    var filteredPins = arr.filter(function (ad) {
      // console.log('-------------------');
      // console.log('ad.offer.type');
      // console.log(ad.offer.type);
      // console.log(is(ad.offer.rooms, currentFilter[ElementsFilterHousing.rooms]));
      // return is(ad.offer.type, currentFilter[ElementsFilterHousing.type]);
      return is(ad.offer.type, currentFilter[ElementsFilterHousing.type]) && is(ad.offer.rooms, currentFilter[ElementsFilterHousing.rooms]) && is(ad.offer.guests, currentFilter[ElementsFilterHousing.guests]);
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
