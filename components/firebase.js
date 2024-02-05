// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBME5sSRj2DEkRuep78WUgyzb5M4RjpAH4",
  authDomain: "todoapplication-2b2ff.firebaseapp.com",
  projectId: "todoapplication-2b2ff",
  storageBucket: "todoapplication-2b2ff.appspot.com",
  messagingSenderId: "407793702001",
  appId: "1:407793702001:web:dfd7628087efae8f5937d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const GetDB = ( ) => {
    return getFirestore(app);
}