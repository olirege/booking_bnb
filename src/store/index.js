import { createStore } from "vuex";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc} from "firebase/firestore";

const store = createStore({
  state() {
    return {
      db: null,
      listings: null
    }
  },
  mutations: {
    setDb(state,payload){
      return state.db = payload
    },
    setListings(state,payload){
      return state.listings = payload
    },
  },
  getters: {
    getDb(state) {
      return state.db
    },
    getListings(state) {
      return state.listings
    },
  },
  actions: {
    async initFb(context) {
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
      context.commit('setDb',db)
    },
    async loadListings(context) {
      const db = context.getters.getDb
      const parsedListings = await getDocs(collection(db, "listings"));
      const listings = [];
      parsedListings.forEach((data) => {
          const temp = new Object()
          temp.id = data.id
          for(const [key,value] of Object.entries(data.data())){
              temp[key] = value
              }
          listings.push(temp);
      });
      context.commit('setListings',listings)
    },
    async postListing(context,payload) {
      const db = context.getters.getDb
      const docRef = await addDoc(collection(db, "listings"), payload);
    }
  },
});
export default store;
