import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjo3ZdOvCp6P6gEpk81pjbafziXXSk2uM",
  authDomain: "test1-86af7.firebaseapp.com",
  projectId: "test1-86af7",
  storageBucket: "test1-86af7.appspot.com",
  messagingSenderId: "216412241864",
  appId: "1:216412241864:web:cd88c833148dae17570afd"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getTokenn = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BB2VqU4JqEMT67ioqIxNnoVPrV6HM6l45hjuSq2VUiTuH0Gy_FWwx1x3LFOwC90ik-Jw4jIr5L5JenJwmy1VQzI'}).then((currentToken) => {
      if (currentToken) {
        //console.log('current token for client: ', currentToken);
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