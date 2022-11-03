// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6mkDdHL6r0X_jixwA9j8Fxv_9YitnFDE",
  authDomain: "filmon-e2eff.firebaseapp.com",
  projectId: "filmon-e2eff",
  storageBucket: "filmon-e2eff.appspot.com",
  messagingSenderId: "327175047258",
  appId: "1:327175047258:web:495eb5f58256ee7c8bf063"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {auth, app};    