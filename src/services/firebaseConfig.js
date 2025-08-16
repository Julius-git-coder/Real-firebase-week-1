// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHfU8HlCGaimh9h9J0cdUiY23TFSseOuA",
  authDomain: "gen-30-e94d3.firebaseapp.com",
  projectId: "gen-30-e94d3",
  storageBucket: "gen-30-e94d3.firebasestorage.app",
  messagingSenderId: "412984068282",
  appId: "1:412984068282:web:e5830677c3c91552adda83",
  measurementId: "G-DLWEPJ9N4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initailize Firestore
const db = getFirestore(app)
export {db}
