'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var SizePhoto = {
    WIDTH: 40,
    HEIGHT: 44
  };
  var minPriceHouses = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var DisabledOptionRoom = {
    OHE_ELEMENT: (1, 1),
    TWO_ELEMENT: (2, 1, 2),
    THREE_ELEMENT: (3, 1, 2, 3),
    FOUR_ELEMENT: (100, 0)
  };
  var StartCoordsMyPin = {
    X: 595,
    Y: 410
  };

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
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');
  var containerPhoto = document.querySelector('.ad-form__photo-container');

  var renderedPhotos = [];
  var isPhotoAvatar = false;

  var readerFile = function (file, element, isTrueAvatar) {
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          element.src = reader.result;
          if (isTrueAvatar) {
            isPhotoAvatar = true;
          }
        });

        reader.readAsDataURL(file);
      }
    }
  };

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    readerFile(file, previewAvatar, true);
  });

  fileChooserPhoto.addEventListener('change', function () {
    var fragment = document.createDocumentFragment();
    Array.from(fileChooserPhoto.files).forEach(function (photo) {
      var elementPhoto = previewPhoto.cloneNode(true);
      elementPhoto.classList.remove('visually-hidden');
      var file = photo;
      var element = document.createElement('img');
      element.width = SizePhoto.WIDTH;
      element.height = SizePhoto.HEIGHT;
      element.alt = 'Фото квартиры';
      elementPhoto.appendChild(element);
      elementPhoto.classList.add('ad-form-header__preview');
      renderedPhotos.push(elementPhoto);
      fragment.appendChild(elementPhoto);
      readerFile(file, element);
    });
    containerPhoto.appendChild(fragment);
  });

  var showModalSuccess = function () {
    var successTempalteCopy = successTemplate.cloneNode(true);

    var closeModal = function () {
      window.map.main.removeChild(successTempalteCopy);
      document.removeEventListener('keydown', documentKeydownHandler);
    };

    var documentKeydownHandler = function (evt) {
      if (!window.util.isEsc(evt)) {
        return;
      }
      closeModal();
    };

    document.addEventListener('keydown', documentKeydownHandler);

    successTempalteCopy.addEventListener('click', function () {
      closeModal();
    });

    window.map.main.appendChild(successTempalteCopy);
  };
  var toogleElements = function (elements, type) {
    elements.forEach(function (element) {
      element.disabled = type;
    });
  };

  var toogleForm = function (form, type) {
    var dataToToogle = [
      form.querySelectorAll('input'),
      form.querySelectorAll('select'),
      form.querySelectorAll('textarea'),
      form.querySelectorAll('button')
    ];
    dataToToogle.forEach(function (dataToToogleElement) {
      toogleElements(dataToToogleElement, type);
    });
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

  var destroyPhotos = function () {
    if (!(renderedPhotos && renderedPhotos.length)) {
      return;
    }

    renderedPhotos.forEach(function (element) {
      containerPhoto.removeChild(element);
    });

    renderedPhotos = [];
  };

  var destroyPhotoAvatar = function () {
    if (!(isPhotoAvatar)) {
      return;
    }

    previewAvatar.src = 'img/muffin-grey.svg';

    isPhotoAvatar = false;
  };

  var resetPage = function () {
    window.filter.mapFilter.reset();
    adForm.reset();
    window.map.destroyPins();
    window.card.closePromo();
    window.pin.resultCoordPin(window.pin.MyPinStartPin.X, window.pin.MyPinStartPin.Y);
    window.map.inputCordenatios.value = StartCoordsMyPin.X + ', ' + StartCoordsMyPin.Y;
    destroyPhotos();
    destroyPhotoAvatar();
    window.map.element.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    toogleForm(window.form.adForm, true);
    window.map.inputCordenatios.disabled = true;
    window.pin.myPin.addEventListener('mousedown', window.map.myPinMouseDownHanlder);
    window.pin.myPin.addEventListener('keydown', window.map.myPinKeydownHandler);
    window.map.returnRenderedPins = [];
  };

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetPage();
  });

  adForm.addEventListener('submit', function (evt) {
    var data = new FormData(adForm);
    window.backend.save(function () {
      showModalSuccess();
      resetPage();
    },
    function () {
      window.map.showModalError();
    },
    data);
    evt.preventDefault();
  });

  window.form = {
    minPriceHouses: minPriceHouses,
    toogleForm: toogleForm,
    houseTypeDoValidity: houseTypeDoValidity,
    adForm: adForm
  };
})();
