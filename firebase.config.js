// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaCnzotYKDwNvurpY2xjTtjDhJ5A2kT4Y",
  authDomain: "emlak-sepette-6ced2.firebaseapp.com",
  projectId: "emlak-sepette-6ced2",
  storageBucket: "emlak-sepette-6ced2.appspot.com",
  messagingSenderId: "847138346411",
  appId: "1:847138346411:web:441a5dc6fb0ad20f3deeee",
  measurementId: "G-9QVRNFCYG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
