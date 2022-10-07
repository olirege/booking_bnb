import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"
import "./assets/main.css";

import "bootstrap";
const app = createApp(App);

app.use(router).use(store);

app.mount("#app");


//Firebase///
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZjavOL5SpY7Gky-FueLN0rJNAVkhKH8E",
  authDomain: "booking-bnb-f473c.firebaseapp.com",
  projectId: "booking-bnb-f473c",
  storageBucket: "booking-bnb-f473c.appspot.com",
  messagingSenderId: "659369576965",
  appId: "1:659369576965:web:08ae7f6949515e7def6a6c",
  measurementId: "G-ET2V2RGZPM"
};

const fb_app = initializeApp(firebaseConfig);
const analytics = getAnalytics(fb_app);
const db = getFirestore(fb_app);

//Fb_tests//
import { collection, addDoc } from "firebase/firestore"; 

try {
  const docRef = await addDoc(collection(db, "listings"), {
    location: "Maastricht, Netherlands",
    pricePerNight: "131",
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
