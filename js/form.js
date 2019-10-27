'use strict';

(function () {
  var submitAdForm = document.querySelector('.ad-form__submit');
  var priceForNigntInput = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var selectRoom = document.querySelector('#room_number');
  var selectGuets = document.querySelector('#capacity');
  var optionGuets = selectGuets.querySelectorAll('option');

  var minPriceHouses = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var toogleElements = function (elements, type) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = type;
    }
  };

  var toogleForm = function (form, type) {
    var dataToToogle = [
      form.querySelectorAll('input'),
      form.querySelectorAll('select'),
      form.querySelectorAll('textarea'),
      form.querySelectorAll('button')
    ];

    for (var i = 0; i < dataToToogle.length; i++) {
      toogleElements(dataToToogle[i], type);
    }
  };

  var houseTypeDoValidity = function (objectHouse) {
    var houseTypeSelect = document.querySelector('#type');
    priceForNigntInput.min = objectHouse[houseTypeSelect.value];
  };

  var syncTime = function (to, from) {
    to.value = from.value;
  };

  timeInSelect.addEventListener('change', function () {
    syncTime(timeOutSelect, timeInSelect);
  });
  timeOutSelect.addEventListener('change', function () {
    syncTime(timeInSelect, timeOutSelect);
  });

  var filterOptionRoom = function (numberOptionRooms, numberOptionGuestOne, numberOptionGuestTwo, numberOptionGuestThree) {
    if (selectRoom.value === (numberOptionRooms + '')) {
      for (var i = 0; i < optionGuets.length; i++) {
        var option = optionGuets[i];
        option.disabled = false;
        if (option.value !== (numberOptionGuestOne + '') && option.value !== (numberOptionGuestTwo + '') && option.value !== (numberOptionGuestThree + '')) {
          option.disabled = true;
        }
      }
    }
  };

  filterOptionRoom(1, 1);

  selectRoom.addEventListener('change', function () {
    filterOptionRoom(1, 1);
    filterOptionRoom(2, 1, 2);
    filterOptionRoom(3, 1, 2, 3);
    filterOptionRoom(100, 0);
  });

  var validitySelectRoom = function (numberOptionRooms, numberOptionGuestOne, numberOptionGuestTwo, numberOptionGuestThree) {
    if (selectRoom.value === numberOptionRooms + '') {
      if (selectGuets.value === (numberOptionGuestOne + '') || selectGuets.value === (numberOptionGuestTwo + '') || selectGuets.value === (numberOptionGuestThree + '')) {
        selectGuets.setCustomValidity('');
      } else {
        selectGuets.setCustomValidity('Неверно');
      }
    }
  };

  submitAdForm.addEventListener('click', function () {
    validitySelectRoom(1, 1);
    validitySelectRoom(2, 1, 2);
    validitySelectRoom(3, 1, 2, 3);
    validitySelectRoom(100, 0);
  });

  window.form = {
    minPriceHouses: minPriceHouses,
    toogleForm: toogleForm,
    houseTypeDoValidity: houseTypeDoValidity
  };
})();
