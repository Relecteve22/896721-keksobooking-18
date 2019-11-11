'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var submitAdForm = document.querySelector('.ad-form__submit');
  var priceForNigntInput = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var selectRoom = document.querySelector('#room_number');
  var selectGuets = document.querySelector('#capacity');
  var optionGuets = selectGuets.querySelectorAll('option');
  var resetButton = document.querySelector('.ad-form__reset');
  var adForm = document.querySelector('.ad-form');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  // var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  // var previewPhoto = document.querySelector('.ad-form-photo');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previewAvatar.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });

  var showModalSuccess = function () {
    var successTempaltePopup = successTemplate.cloneNode(true);

    var closeModal = function () {
      window.map.main.removeChild(successTempaltePopup);
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    var onDocumentKeydown = function (evt) {
      if (!window.util.isEsc(evt)) {
        return;
      }
      closeModal();
    };

    document.addEventListener('keydown', onDocumentKeydown);

    successTempaltePopup.addEventListener('click', function () {
      closeModal();
    });

    window.map.main.appendChild(successTempaltePopup);
  };

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

  // var resetMapFIlter = function () {

  // };

  resetButton.addEventListener('click', function () {
    window.filter.mapFilter.reset();
    adForm.reset();
    window.map.destroyPins();
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
      showModalSuccess();
    }, function () {
      window.map.showModalError();
    });
    evt.preventDefault();
  });

  window.form = {
    minPriceHouses: minPriceHouses,
    toogleForm: toogleForm,
    houseTypeDoValidity: houseTypeDoValidity,
    adForm: adForm
  };
})();
