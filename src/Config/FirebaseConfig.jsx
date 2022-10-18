// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Lzm4siXxo3WgI2X3I2dirL6n1o2Sn3M",
  authDomain: "data-trello.firebaseapp.com",
  projectId: "data-trello",
  storageBucket: "data-trello.appspot.com",
  messagingSenderId: "612719395414",
  appId: "1:612719395414:web:b3ef67b29e6a676f75b1f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
