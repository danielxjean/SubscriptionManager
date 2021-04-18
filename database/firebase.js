import * as firebase from "firebase/app";
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBnZ3n7XXZ9u7w3HLCzRlPXJUWLARHWs9A",
    authDomain: "subscriptionmanager-d881e.firebaseapp.com",
    databaseURL: "https://subscriptionmanager-d881e.firebaseio.com",
    projectId: "subscriptionmanager-d881e",
    storageBucket: "subscriptionmanager-d881e.appspot.com",
    messagingSenderId: "92228983718",
    appId: "1:92228983718:web:507f16c100cb762f470d67",
    measurementId: "G-97K2BNBTBQ"
  };

  if (!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export { firebase };
