import { createStore } from "vuex";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously  } from "firebase/auth";

const store = createStore({
  state() {
    return {
      db: null,
      listings: null,
      currentCurrency: "CAD",
      loginModalState: false,
      regionModalState: false,
      checkInModalState: false,
      guestsModalState: false,
      headerState: true,
      user: null,
      selectedRoom: null,
      selectedDates: null,
      selectedGuests: {
        'Adults': 1,
        "Children": 0,
        "Infants": 0,
        "Pets": 0,
      }
    }
  },
  mutations: {
    setDb(state,payload){
      return state.db = payload
    },
    setListings(state,payload){
      return state.listings = payload
    },
    setCurrentCurrency(state,payload){
      return state.currentCurrency = payload
    },
    changeLoginModalState(state,payload){
      return state.loginModalState = payload
    },
    changeCheckInModalState(state,payload){
      return state.checkInModalState = payload
    },
    changeRegionModalState(state,payload){
      return state.regionModalState = payload
    },
    changeGuestsModalState(state,payload){
      return state.guestsModalState = payload
    },
    changeHeaderState(state,payload){
      return state.headerState = payload
    },
    setUser(state,payload){
      return state.user = payload
    },
    setSelectedDates(state,payload){
      return state.selectedDates = payload
    },
    setSelectedRoom(state,payload){
      return state.selectedRoom = payload
    },
    setSelectedGuests(state,payload){
      return state.selectedGuests = payload
    },
  },
  getters: {
    getDb(state) {
      return state.db
    },
    getListings(state) {
      return state.listings
    },
    getCurrentCurrency(state) {
      return state.currentCurrency
    },
    getLoginModalState(state) {
      return state.loginModalState
    },
    getRegionModalState(state) {
      return state.regionModalState
    },
    getCheckInModalState(state) {
      return state.checkInModalState
    },
    getGuestsModalState(state) {
      return state.guestsModalState
    },
    getUser(state) {
      return state.user
    },
    getSelectedDates(state) {
      return state.selectedDates
    },
    getSelectedRoom(state) {
      return state.selectedRoom
    },
    getSelectedGuests(state) {
      return state.selectedGuests
    },
    getHeaderState(state) {
      return state.headerState
    }
      
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
    },
    
    async checkAuth(context) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          context.commit('setUser',user)
          if (user.isAnonymous){
            console.log("Anonymous user signed-in");
          }
        } else {
          context.dispatch('signInAnonymously')
        }
      });
    },
    async signInAnonymously(context) {
      const auth = getAuth();
      const result = await signInAnonymously(auth)
      context.commit('setUser',result.user)
    },
    async logOut(context) {
      const auth = getAuth();
      await auth.signOut()
    },
    async loadSelectedRoom(context,payload) {
      context.getters.getListings.forEach((listing) => {
        if (listing.id === payload) {
          context.commit('setSelectedRoom',listing)
        }
      })
    }
  }
});

export default store;
