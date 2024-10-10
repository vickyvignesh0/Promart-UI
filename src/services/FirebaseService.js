// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBiLxauh_V8Gri_SGBIcdACOiaCQXnDY3U",
    authDomain: "promart-ui.firebaseapp.com",
    projectId: "promart-ui",
    storageBucket: "promart-ui.appspot.com",
    messagingSenderId: "439234965958",
    appId: "1:439234965958:web:28c5bad68db82a3fc142c7",
    measurementId: "G-GM8GNLGHF0"
  };

// Initialize Firebase
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
export const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth};