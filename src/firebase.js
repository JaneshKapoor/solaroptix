// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Added for authentication
import { getFirestore } from "firebase/firestore";  // Added for Firestore

// Your web app's Firebase configuration
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
const auth = getAuth(app);  // Initialize Firebase Authentication
const provider = new GoogleAuthProvider();  // Google Auth Provider
const db = getFirestore(app);  // Firestore for database functionality

// Export Firebase services for use in your app
export { analytics, auth, provider, db };
