// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

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
  measurementId: "G-8EY6T521W1",
  databaseURL: "https://todo-app-f6965-default-rtdb.asia-southeast1.firebasedatabase.app/"

};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const db = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;