// Init firebase
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCsHZNpp7WT3p3mV4uKXoWA23wXRlHy1JM",
    authDomain: "ucema-47f32.firebaseapp.com",
    databaseURL: "https://ucema-47f32.firebaseio.com",
    projectId: "ucema-47f32",
    storageBucket: "ucema-47f32.appspot.com",
    messagingSenderId: "235459296674",
    appId: "1:235459296674:web:feb994e4e431d8093106fb",
    measurementId: "G-PQ5Z7DFXW6"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();

