// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhRgPNM3Yt7R4dFrdvrx-odH1yfhopvOA",
  authDomain: "user-email-pass-auth-415fd.firebaseapp.com",
  projectId: "user-email-pass-auth-415fd",
  storageBucket: "user-email-pass-auth-415fd.firebasestorage.app",
  messagingSenderId: "943475948241",
  appId: "1:943475948241:web:f6b596fe49260c472ea3f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth