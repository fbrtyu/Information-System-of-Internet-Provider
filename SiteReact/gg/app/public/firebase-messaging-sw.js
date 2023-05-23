// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCXMZ8dNAdAsIFdu5Dx1m6Hl-PanSU4YL4",
    authDomain: "diplom-45232.firebaseapp.com",
    projectId: "diplom-45232",
    storageBucket: "diplom-45232.appspot.com",
    messagingSenderId: "1072434267743",
    appId: "1:1072434267743:web:bb5d50bea1fe7f2366bdea"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});