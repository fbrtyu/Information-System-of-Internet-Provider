// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCjo3ZdOvCp6P6gEpk81pjbafziXXSk2uM",
  authDomain: "test1-86af7.firebaseapp.com",
  projectId: "test1-86af7",
  storageBucket: "test1-86af7.appspot.com",
  messagingSenderId: "216412241864",
  appId: "1:216412241864:web:cd88c833148dae17570afd"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  //console.log('Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});