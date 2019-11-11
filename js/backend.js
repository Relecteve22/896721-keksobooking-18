'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200: {
          onLoad(xhr.response);
          break;
        }
        case 301: {
          onError('Статус ответа: ' + xhr.status + '. Ресурс переехал навсегда.');
          break;
        }
        case 307: {
          onError('Статус ответа: ' + xhr.status + '. Ресурс переехал временно.');
          break;
        }
        case 400: {
          onError('Статус ответа: ' + xhr.status + '. Неправильный запрос.');
          break;
        }
        case 404: {
          onError('Статус ответа: ' + xhr.status + '. Запрашиваемый запрос не найден.');
          break;
        }
        case 500: {
          onError('Статус ответа: ' + xhr.status + '. Произошла внутрения ошибка сервера.');
          break;
        }
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200: {
          onLoad(xhr.response);
          break;
        }
        case 301: {
          onError('Статус ответа: ' + xhr.status + '. Ресурс переехал навсегда.');
          break;
        }
        case 307: {
          onError('Статус ответа: ' + xhr.status + '. Ресурс переехал временно.');
          break;
        }
        case 400: {
          onError('Статус ответа: ' + xhr.status + '. Неправильный запрос.');
          break;
        }
        case 404: {
          onError('Статус ответа: ' + xhr.status + '. Запрашиваемый запрос не найден.');
          break;
        }
        case 500: {
          onError('Статус ответа: ' + xhr.status + '. Произошла внутрения ошибка сервера.');
          break;
        }
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
