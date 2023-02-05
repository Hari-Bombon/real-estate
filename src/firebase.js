// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdIkTVePWABxIsnmOODyEMfoiXTzoNciY",
  authDomain: "realtor-clone-dad1c.firebaseapp.com",
  projectId: "realtor-clone-dad1c",
  storageBucket: "realtor-clone-dad1c.appspot.com",
  messagingSenderId: "839462083762",
  appId: "1:839462083762:web:549b453dba78e864bcbdab",
  measurementId: "G-Z88BEPM4Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();