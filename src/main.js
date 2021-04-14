import { createApp } from 'vue'
import App from './App.vue'
import firebase from 'firebase/app';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyCXN2jdVYRb5EUeiscUH0YjQi-tZKW9Ijc",
    authDomain: "image-uploaded-33694.firebaseapp.com",
    projectId: "image-uploaded-33694",
    storageBucket: "image-uploaded-33694.appspot.com",
    messagingSenderId: "315271758052",
    appId: "1:315271758052:web:ea20df2b82982e8641ecf1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App).mount('#app')
