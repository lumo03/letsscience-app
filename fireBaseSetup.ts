// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: process.env.FIREBASE_APIKEY,

  authDomain: "let-s-science.firebaseapp.com",

  projectId: "let-s-science",

  storageBucket: "let-s-science.appspot.com",

  messagingSenderId: process.env.FIREBASE_MESSENGERID,

  appId: process.env.FIREBASE_APPID

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);