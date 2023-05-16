self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('push', function(event) {
    event.waitUntil(
      // Получить список клиентов для SW
      self.clients.matchAll().then(function(clientList) {
            // Проверяем, есть ли хотя бы один сфокусированный клиент.
        var focused = clientList.some(function(client) {
          return client.focused;
        });
  
        var notificationMessage;
        if (focused) {
          notificationMessage = 'Imperio! You\'re still here, thanks!';
        } else if (clientList.length > 0) {
          notificationMessage = 'Imperio! You haven\'t closed the page, ' +
                                'click here to focus it!';
        } else {
          notificationMessage = 'Imperio! You have closed the page, ' +
                                'click here to re-open it!';
        }
        // Показывать уведомление с заголовком «Unforgiveable Curses»
        // и телом в зависимости от состоянию клиентов SW
        // (три разных тела: 
        // * 1, страница сфокусирована;
        // * 2, страница по-прежнему открыта, но не сфокусирована;
        // * 3, страница закрыта).
        return self.registration.showNotification('Unforgiveable Curses', {
          body: notificationMessage,
        });
      })
    );
  });
  
  // Регистрируем обработчик события 'notificationclick'.
  self.addEventListener('notificationclick', function(event) {
    event.waitUntil(
      // Получаем список клиентов SW.
      self.clients.matchAll().then(function(clientList) {
        // Если есть хотя бы один клиент, фокусируем его.
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        // В противном случае открываем новую страницу.
        return self.clients.openWindow('our/url/page');
      })
    );
  });