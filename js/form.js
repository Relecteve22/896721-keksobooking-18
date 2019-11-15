'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MIN_PRICE_HOUSES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var SizePhoto = {
    WIDTH: 40,
    HEIGHT: 44
  };
  var DisabledOptionRoom = {
    ONE_ELEMENTS: [1, 1],
    TWO_ELEMENTS: [2, 1, 2],
    THREE_ELEMENTS: [3, 1, 2, 3],
    FOUR_ELEMENTS: [100, 0]
  };
  var StartCoordsMyPin = {
    X: 595,
    Y: 410
  };
  var TypeHouse = {
    ONE_ELEMENT: 'bungalo',
    TWO_ELEMENT: 'flat',
    THREE_ELEMENT: 'house',
    FOUR_ELEMENT: 'palace'
  };

  var priceForNigntInputElement = document.querySelector('#price');
  var timeInSelectElement = document.querySelector('#timein');
  var timeOutSelectElement = document.querySelector('#timeout');
  var selectRoomElement = document.querySelector('#room_number');
  var selectGuetsElement = document.querySelector('#capacity');
  var houseTypeSelectElement = document.querySelector('#type');
  var optionGuetsElement = selectGuetsElement.querySelectorAll('option');
  var submitAdFormElement = document.querySelector('.ad-form__submit');
  var resetButtonElement = document.querySelector('.ad-form__reset');
  var adFormElement = document.querySelector('.ad-form');
  var fileChooserAvatarElement = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatarElement = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhotoElement = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoElement = document.querySelector('.ad-form__photo');
  var containerPhotoElement = document.querySelector('.ad-form__photo-container');
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');

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

  fileChooserAvatarElement.addEventListener('change', function () {
    var file = fileChooserAvatarElement.files[0];
    readerFile(file, previewAvatarElement, true);
  });

  fileChooserPhotoElement.addEventListener('change', function () {
    var fragment = document.createDocumentFragment();
    Array.prototype.forEach.call(fileChooserPhotoElement.files, function (photo) {
      var elementPhoto = previewPhotoElement.cloneNode(true);
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
    containerPhotoElement.appendChild(fragment);
  });

  var showModalSuccess = function () {
    var successTempalteCopy = successTemplateElement.cloneNode(true);

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
    priceForNigntInputElement.min = objectHouse[houseTypeSelectElement.value + ''];
    priceForNigntInputElement.placeholder = objectHouse[houseTypeSelectElement.value + ''];
  };

  var syncTime = function (to, from) {
    to.value = from.value;
  };

  timeInSelectElement.addEventListener('change', function () {
    syncTime(timeOutSelectElement, timeInSelectElement);
  });
  timeOutSelectElement.addEventListener('change', function () {
    syncTime(timeInSelectElement, timeOutSelectElement);
  });

  var filterOptionRoom = function (numberOptionRooms, numberOptionGuestOne, numberOptionGuestTwo, numberOptionGuestThree) {
    if (selectRoomElement.value === (numberOptionRooms + '')) {
      optionGuetsElement.forEach(function (option) {
        option.disabled = false;
        if (option.value !== (numberOptionGuestOne + '') && option.value !== (numberOptionGuestTwo + '') && option.value !== (numberOptionGuestThree + '')) {
          option.disabled = true;
        }
      });
    }
  };
  filterOptionRoom.apply(null, DisabledOptionRoom.ONE_ELEMENTS);

  selectRoomElement.addEventListener('change', function () {
    filterOptionRoom.apply(null, DisabledOptionRoom.ONE_ELEMENTS);
    filterOptionRoom.apply(null, DisabledOptionRoom.TWO_ELEMENTS);
    filterOptionRoom.apply(null, DisabledOptionRoom.THREE_ELEMENTS);
    filterOptionRoom.apply(null, DisabledOptionRoom.FOUR_ELEMENTS);
  });

  var validitySelectRoom = function (numberOptionRooms, numberOptionGuestOne, numberOptionGuestTwo, numberOptionGuestThree) {
    if (selectRoomElement.value === numberOptionRooms + '') {
      if (selectGuetsElement.value === (numberOptionGuestOne + '') || selectGuetsElement.value === (numberOptionGuestTwo + '') || selectGuetsElement.value === (numberOptionGuestThree + '')) {
        selectGuetsElement.setCustomValidity('');
        houseTypeDoValidity(MIN_PRICE_HOUSES);
      } else {
        selectGuetsElement.setCustomValidity('Неверно');
      }
    }
  };

  houseTypeSelectElement.addEventListener('change', function () {
    houseTypeDoValidity(MIN_PRICE_HOUSES);
  });

  var validityInputTypeHouses = function (numberOptionType, minPriceTypeHouse) {
    if (houseTypeSelectElement.value === numberOptionType + '') {
      if (priceForNigntInputElement.value >= minPriceTypeHouse) {
        priceForNigntInputElement.setCustomValidity('');
      } else {
        priceForNigntInputElement.setCustomValidity('Слишком маленькая цена');
      }
    }
  };

  submitAdFormElement.addEventListener('click', function () {
    validitySelectRoom.apply(null, DisabledOptionRoom.ONE_ELEMENTS);
    validitySelectRoom.apply(null, DisabledOptionRoom.TWO_ELEMENTS);
    validitySelectRoom.apply(null, DisabledOptionRoom.THREE_ELEMENTS);
    validitySelectRoom.apply(null, DisabledOptionRoom.FOUR_ELEMENTS);
    validityInputTypeHouses(TypeHouse.ONE_ELEMENT, MIN_PRICE_HOUSES.bungalo);
    validityInputTypeHouses(TypeHouse.TWO_ELEMENT, MIN_PRICE_HOUSES.flat);
    validityInputTypeHouses(TypeHouse.THREE_ELEMENT, MIN_PRICE_HOUSES.house);
    validityInputTypeHouses(TypeHouse.FOUR_ELEMENT, MIN_PRICE_HOUSES.palace);
  });

  var destroyPhotos = function () {
    if (!(renderedPhotos && renderedPhotos.length)) {
      return;
    }

    renderedPhotos.forEach(function (element) {
      containerPhotoElement.removeChild(element);
    });

    renderedPhotos = [];
  };

  var destroyPhotoAvatar = function () {
    if (!(isPhotoAvatar)) {
      return;
    }

    previewAvatarElement.src = 'img/muffin-grey.svg';

    isPhotoAvatar = false;
  };

  var resetPage = function () {
    window.filter.map.reset();
    adFormElement.reset();
    window.map.destroyPins();
    window.card.closePromo();
    window.pin.resultCoordPin(window.pin.StartMyPin.X, window.pin.StartMyPin.Y);
    window.map.inputCordenatios.value = StartCoordsMyPin.X + ', ' + StartCoordsMyPin.Y;
    destroyPhotos();
    destroyPhotoAvatar();
    window.map.element.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    toogleForm(window.form.ad, true);
    window.map.inputCordenatios.disabled = true;
    window.pin.myElement.addEventListener('mousedown', window.map.myPinMouseDownHanlder);
    window.pin.myElement.addEventListener('keydown', window.map.myPinKeydownHandler);
    window.map.returnRenderedPins = [];
  };

  resetButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetPage();
  });

  adFormElement.addEventListener('submit', function (evt) {
    var data = new FormData(adFormElement);
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
    MIN_PRICE_HOUSES: MIN_PRICE_HOUSES,
    toogleForm: toogleForm,
    houseTypeDoValidity: houseTypeDoValidity,
    ad: adFormElement
  };
})();
