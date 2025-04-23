import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-QU7KNt_sxBM-DfG6fInvzK0WhfPxKXA",
  authDomain: "login-auth-973fe.firebaseapp.com",
  projectId: "login-auth-973fe",
  storageBucket: "login-auth-973fe.appspot.com",
  messagingSenderId: "79496580854",
  appId: "1:79496580854:web:550cfb40911c31d72be6d7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//getAnalytics(firebaseApp); //  Only if you need analytics in this file

export const db = getFirestore(firebaseApp);

export default firebaseApp;
