// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7ayp0Y8_0ZkpM-ZJgKKNUQqngmmFkaus",
  authDomain: "gen-30-14db4.firebaseapp.com",
  projectId: "gen-30-14db4",
  storageBucket: "gen-30-14db4.firebasestorage.app",
  messagingSenderId: "833108537258",
  appId: "1:833108537258:web:108d26ba172187b55005d3",
  measurementId: "G-6FRLNEG9VY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initailize Firestore
const db = getFirestore(app)
export {db}
