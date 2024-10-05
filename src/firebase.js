// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzkctLOhTLaUN4KmP14n2RJ_YMVo0NCIg",
  authDomain: "solaroptix-6501a.firebaseapp.com",
  projectId: "solaroptix-6501a",
  storageBucket: "solaroptix-6501a.appspot.com",
  messagingSenderId: "1031485897321",
  appId: "1:1031485897321:web:5552789ba5df06667080f8",
  measurementId: "G-XSB2NJ0BD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);