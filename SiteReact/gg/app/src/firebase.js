import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXMZ8dNAdAsIFdu5Dx1m6Hl-PanSU4YL4",
  authDomain: "diplom-45232.firebaseapp.com",
  projectId: "diplom-45232",
  storageBucket: "diplom-45232.appspot.com",
  messagingSenderId: "1072434267743",
  appId: "1:1072434267743:web:bb5d50bea1fe7f2366bdea"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getTokenn = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BHTIKXqw37l1s3dfGStqqn_M3fbUYLn3pCXBUJICatpQQuUlMcYFx4alkk3oqfxbzN11hDTbOv7Insb8kK5g9y4'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});