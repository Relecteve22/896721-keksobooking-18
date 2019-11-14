'use strict';

(function () {
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var loadAndSave = function (onLoad, onError, url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000; // 10s

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
