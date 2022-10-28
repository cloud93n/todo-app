// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2phtJxapVVfIhRewCTRWvUqtIOdG8lSU",
  authDomain: "todo-app-f6965.firebaseapp.com",
  projectId: "todo-app-f6965",
  storageBucket: "todo-app-f6965.appspot.com",
  messagingSenderId: "685229726708",
  appId: "1:685229726708:web:e90544b5ff3e4395ebb7a1",
  measurementId: "G-8EY6T521W1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;