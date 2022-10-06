import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"
import "./assets/main.css";

import "bootstrap";
const app = createApp(App);

app.use(router).use(store);

app.mount("#app");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZjavOL5SpY7Gky-FueLN0rJNAVkhKH8E",
  authDomain: "booking-bnb-f473c.firebaseapp.com",
  projectId: "booking-bnb-f473c",
  storageBucket: "booking-bnb-f473c.appspot.com",
  messagingSenderId: "659369576965",
  appId: "1:659369576965:web:08ae7f6949515e7def6a6c",
  measurementId: "G-ET2V2RGZPM"
};

// Initialize Firebase
const fb_app = initializeApp(firebaseConfig);
const analytics = getAnalytics(fb_app);