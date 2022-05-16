// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCIl7n_YwQeA8QWGX8BX_B-kNXSrei8c_w",
    authDomain: "sentimental-analysis-fproject.firebaseapp.com",
    databaseURL: "https://sentimental-analysis-fproject-default-rtdb.firebaseio.com",
    projectId: "sentimental-analysis-fproject",
    storageBucket: "sentimental-analysis-fproject.appspot.com",
    messagingSenderId: "353631901578",
    appId: "1:353631901578:web:a46380dce873f3c0e45a73",
    measurementId: "G-BSC2KJXSVB"
};

// Initialize Firebase
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
export const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth};