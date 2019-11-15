'use strict';

(function () {
  var SUCCESS_ANSWER = 200;
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT = 10000; // 10s

  var loadAndSave = function (onLoad, onError, url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_ANSWER) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (successHandler, errorHandler) {
    loadAndSave(successHandler, errorHandler, Url.GET, 'GET');
  };
  var save = function (successHandler, errorHandler, data) {
    loadAndSave(successHandler, errorHandler, Url.POST, 'POST', data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
