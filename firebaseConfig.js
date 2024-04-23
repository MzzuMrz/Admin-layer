// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAiBbv--wImgg2pzo00XwjN6UBSsDEOWuI",
    authDomain: "mindco-health.firebaseapp.com",
    projectId: "mindco-health",
    storageBucket: "mindco-health.appspot.com",
    messagingSenderId: "358335983664",
    appId: "1:358335983664:web:df3984915178d43786bdf5",
    measurementId: "G-7FTZWMKR66"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();