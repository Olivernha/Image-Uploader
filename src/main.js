import { createApp } from 'vue'
import App from './App.vue'
require('dotenv').config();
import firebase from 'firebase/app';
import 'firebase/storage';
import './index.css'

var firebaseConfig = {
    apiKey:process.env.apiKey,
    authDomain:process.env.authDomain,
    projectId:process.env.projectId,
    storageBucket:"image-uploaded-33694.appspot.com",
    messagingSenderId:process.env.messagingSenderId,
    appId:process.env.appId
};
firebase.initializeApp(firebaseConfig);
createApp(App).mount('#app')
