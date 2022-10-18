<template>
<div class="room-wrapper">
    <div class="room">
        <div class="media-header">
            <div class="media-home-btn">
                <BIconChevronLeft></BIconChevronLeft>
                <h2>Home</h2>
            </div>
            <div class="like-and-share">
                    <div class="like">
                        <BIconHeart></BIconHeart>
                    </div>
                    <div class="share">
                        <BIconUpload></BIconUpload>
                    </div>
                </div>
        </div>
        <div class="room-header" v-if="selectedRoom">
            <div class="title"><h2>{{selectedRoom.title}}</h2></div>
            <div class="subtitle">
                <div class="card-info">
                    <div class="rating">
                        <BIconStarFill></BIconStarFill>
                        <span>{{selectedRoom.rating}}</span>
                    </div>
                    <BIconDot></BIconDot>
                    <div class="reviews">
                        <span>{{selectedRoom.reviews}}</span>
                        <span>{{text.reviews}}</span>
                    </div>
                    <BIconDot></BIconDot>
                    <div class="host">
                        <BIconTrophyFill></BIconTrophyFill>
                        <span>{{selectedRoom.hostType}}</span>
                    </div>
                    <BIconDot></BIconDot>
                    <div class="location">
                        <span>{{selectedRoom.location.city}}, {{selectedRoom.location.province}}, {{selectedRoom.location.country}}</span>
                    </div>
                </div>
                <div class="like-and-share">
                    <div class="like">
                        <BIconHeart></BIconHeart>
                        <span>{{text.save}}</span>
                    </div>
                    <div class="share">
                        <BIconUpload></BIconUpload>
                        <span>{{text.share}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="room-scroller">
            <ul class="tabs">
                <li class="tab"></li>
            </ul>
        </div>
        <div class="room-images-container">
            <div class="images">
                <div class="big-image">
                    <div class="image-overlay"></div>
                    <img :src="images[0]" alt="room image">
                </div>
                <div class="small-images">
                    <div class="small-image" v-for="(image,index) of images" :key="index">
                        <div class="image-overlay"></div>
                        <img :src="image" alt="room image">
                    </div>
                </div>
            </div>
            <div class="show-more-images-btn">
                <BIconGrid3x3GapFill></BIconGrid3x3GapFill>
                <span>{{text.showMoreImages}}</span>
            </div>
        </div>
        <div class="room-info-container">
            <div class="room-info">
                <div class="room-info-header">
                    <div class="room-info-title">
                        <h2>{{selectedRoom.type}} {{text.hostedBy}} {{selectedRoom.host.name}}</h2>
                        <div class='room-info-details'>
                            <span>{{selectedRoom.maxGuests}} {{text.guests}}</span>
                            <BIconDot></BIconDot>
                            <span>{{selectedRoom.maxBedrooms}} {{text.bedrooms}}</span>
                            <BIconDot></BIconDot>
                            <span>{{selectedRoom.maxBeds}} {{text.beds}}</span>
                            <BIconDot></BIconDot>
                            <span>{{selectedRoom.maxBaths}} {{text.baths}}</span>
                        </div>
                    </div>
                    <div class="room-info-detail">
                        <img :src="hostProfileImage" alt="host image"/>
                    </div>
                </div>
                <div class="room-info-body">
                    <div class="room-highlights">
                        <div  class="highlight-container" v-if="selectedRoom.highlights.asWifi">
                            <div class="highlight-icon">
                                <BIconWifi></BIconWifi>
                            </div>
                            <div class="highlight-text">
                                <span>{{text.highlight.wifi.name}}</span>
                                <p>{{text.highlight.wifi.text}}</p>
                            </div>
                        </div>
                        <div class="highlight-container" v-if="selectedRoom.highlights.asSelfCheckIn">
                            <div class="highlight-icon">
                                <BIconDoorOpen></BIconDoorOpen>
                            </div>
                            <div class="highlight-text">
                                <span>{{text.highlight.selfCheckIn.name}}</span>
                                <p>{{text.highlight.selfCheckIn.text}}</p>
                            </div>
                        </div>
                        <div class="highlight-container" v-if="selectedRoom.highlights.asFreeCancellation">
                            <div class="highlight-icon">
                                <BIconCalendar4Event></BIconCalendar4Event>
                            </div>
                            <div class="highlight-text">
                                <span>{{text.highlight.freeCancellation.name}} - {{text.highlight.freeCancellation.text}} {{today}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="room-insurance">
                        <div class="insurance-logo">
                            <span class='left'>{{text.insurance.titleLeft}}</span>
                            <span class='right'>{{text.insurance.titleRight}}</span>
                        </div>
                        <div class="insurance-text">
                            <p>{{text.insurance.text}}</p>
                        </div>
                        <div class="learn-more-btn">
                            <span>{{text.learnMore}}</span>
                        </div>
                    </div>
                    <div class="room-additional-info">
                        <div class="about-the-place">
                            <p>{{text.placeDescription}}</p>
                        </div>
                        <div class="learn-more-btn">
                            <span>{{text.learnMore}}</span>
                        </div>
                    </div>
                    <div class="room-bed-type">
                        <div class="room-bed-type-header">
                            <h2>{{text.whereSleep}}</h2>
                        </div>
                        <div class="bedtype-wrapper">
                            <div class="bedtype-card" v-if="selectedRoom.bedTypes.boxStack">
                                <div class="bedtype-image">
                                    <BIconBoxes></BIconBoxes>
                                </div>
                                <div class="bedtype-text">
                                    <p>{{selectedRoom.bedTypes.boxStack}}</p>
                                    <span>{{text.bedTypes.boxStack}}</span>
                                </div>
                            </div>
                            <div class="bedtype-card" v-if="selectedRoom.bedTypes.singleBox">
                                <div class="bedtype-image">
                                    <BIconBoxSeam></BIconBoxSeam>
                                </div>
                                <div class="bedtype-text">
                                    <p>{{selectedRoom.bedTypes.singleBox}}</p>
                                    <span>{{text.bedTypes.singleBox}}</span>
                                </div>
                            </div>
                            <div class="bedtype-card" v-if="selectedRoom.bedTypes.mailBox">
                                <div class="bedtype-image">
                                    <BIconMailbox></BIconMailbox>
                                </div>
                                <div class="bedtype-text">
                                    <p>{{selectedRoom.bedTypes.mailBox}}</p>
                                    <span>{{text.bedTypes.mailBox}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="price-info">
                <div class="price-container-wrapper">
                    <div class="price-container">
                        <div class="price-container-header">
                            <div class="price-container-title">
                                <h3>{{formatToCurrency(selectedRoom.pricePerNight)}} {{currentCurrency}}</h3>
                                <span>{{text.perNight}}</span>
                            </div>
                            <div class="price-container-ratings-reviews">
                                <div class="ratings">
                                    <BIconStarFill></BIconStarFill>
                                    <span>{{selectedRoom.rating}}</span>
                                </div>
                                <BIconDot></BIconDot>
                                <div class="reviews">
                                    <span>{{selectedRoom.reviews}}</span>
                                    <span>{{text.reviews}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="booking-form">
                            <div class="dates-row" @click="showCheckInModal">
                                <div class="checkin">
                                    <h2 class='booking-form-label'>{{text.checkin}}</h2>
                                    <h2>{{selectedDates? selectedDates[0]: "Add date" }}</h2>
                                </div>
                                <div class="checkout">
                                    <h2 class='booking-form-label'>{{text.checkout}}</h2>
                                    <h2>{{selectedDates? selectedDates[1]: "Add date"}}</h2>
                                </div>
                            </div>
                            <div class="guests-row" @click="showGuestsModal">
                                <span>
                                    <h2 class='booking-form-label'>{{text.guests}}</h2>
                                    <div class='guest-text-wrapper'>
                                    <div class="guest-text" v-for ='(n,type,index) in selectedGuests' :key="index">
                                        <h2 v-if ='n > 0'>{{n}} {{type}}</h2><h2 v-if=" index == Object.keys(selectedGuests).length">,</h2>
                                    </div>
                                    </div>
                                </span>
                                <BIconChevronDown></BIconChevronDown>
                            </div>
                        </div>
                        <TheCheckInModal v-show="showCheckInModalState" @close-checkin-modal="closeCheckInModal"></TheCheckInModal>
                        <TheGuestsModal v-show="showGuestsModalState" @close-guests-modal="closeGuestsModal"></TheGuestsModal>
                        <div class="reserve-btn">
                            <span>{{text.reserve}}</span>
                        </div>
                        <h3 class="charge-reminder">{{text.noChargeYet}}</h3>
                        <div class="price-breakdown-container" v-if="selectedDates">
                            <div class="price-breakdown">
                                <div class="price-breakdown-row">
                                    <span>{{formatToCurrency(selectedRoom.pricePerNight)}} {{currentCurrency}} x {{numberOfDays}} {{text.perNight}}</span>
                                    <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays)}} {{currentCurrency}}</span>
                                </div>
                                <div class="price-breakdown-row">
                                    <span>{{text.serviceFee}}</span>
                                    <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays * 0.1)}} {{currentCurrency}}</span>
                                </div>
                                <div class="price-breakdown-row">
                                    <span>{{text.cleaningFee}}</span>
                                    <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays * 0.05)}} {{currentCurrency}}</span>
                                </div>
                                <div class="price-breakdown-row">
                                    <span>{{text.taxes}}</span>
                                    <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays * 0.15)}} {{currentCurrency}}</span>
                                </div>
                                
                                <div class="price-breakdown-footer">
                                    <span>{{text.total}}</span>
                                    <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays * 1.30)}} {{currentCurrency}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rare-find-container">
                        <h2>{{text.rarefind}}, {{selectedRoom.host.name}}{{text.rarefindDescription}}</h2>
                        <BIconGem></BIconGem>
                    </div>
                    <div class="report-container">
                        <BIconExclamationCircle></BIconExclamationCircle>
                        <h2>{{text.report}}</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="media-footer">
            <div class="calendar-dates">
                <h2 v-if="!selectedDates">{{text.addDates}}</h2>
                <div class="rating">
                    <BIconStarFill></BIconStarFill>
                    <span>{{selectedRoom.rating}}</span>
                </div>
            </div>
            <div class="reserve-btn">
                <span>{{text.reserve}}</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {
    BIconUpload, BIconHeart,BIconStarFill,
    BIconTrophyFill,BIconGrid3x3GapFill,
    BIconChevronDown,BIconGem,BIconExclamationCircle,
    BIconDot,BIconWifi,BIconDoorOpen,BIconCalendar4Event,BIconBoxes,BIconBoxSeam,BIconMailbox,BIconChevronLeft,
} from 'bootstrap-icons-vue'
import { useStore } from 'vuex';
import { computed } from 'vue';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { ref as vueRef, onMounted } from 'vue'
import TheCheckInModal from '../components/TheCheckInModal.vue'
import TheGuestsModal from '../components/TheGuestsModal.vue'
export default ({
    components: {
        BIconUpload,
        BIconHeart,
        BIconStarFill,
        BIconGrid3x3GapFill,
        BIconTrophyFill,
        BIconChevronDown,
        BIconChevronLeft,
        BIconGem,
        BIconExclamationCircle,
        BIconDot,
        BIconWifi,
        BIconDoorOpen,
        BIconCalendar4Event,
        BIconBoxes,
        BIconBoxSeam,
        BIconMailbox,
        TheCheckInModal,
        TheGuestsModal,
    },
    setup() {
        
        const store = useStore();
        const today = new Date().toISOString().split('T')[0];
        const selectedDates = computed(() => {
                if(store.getters.getSelectedDates && store.getters.getSelectedDates.length == 2) {
                let unformattedDates = store.getters.getSelectedDates;
                let dates = [];
                dates.push(unformattedDates[0][0].toISOString().split('T')[0]);
                dates.push(unformattedDates[1][0].toISOString().split('T')[0]);
                return dates;
            }
        });
        const currentCurrency = computed(() => {
            return store.getters.getCurrentCurrency;
        });
        function formatToCurrency(value) {
            return Intl.NumberFormat('en-US', { style: 'currency', currency: currentCurrency.value }).format(value);
        }
        const numberOfDays = computed(() => {
            let date1 = new Date(selectedDates.value[0]);
            let date2 = new Date(selectedDates.value[1]);
            let Difference_In_Time = date2.getTime() - date1.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            return Difference_In_Days;
        });
        const selectedGuests = computed(() => {
            if(!store.getters.getSelectedGuests){
                return 1;
            }else{
                return store.getters.getSelectedGuests;
            }
        });
        const selectedRoom = computed(() => {
            return store.getters.getSelectedRoom;
        });
        const images = vueRef([]);
        async function getImages() {
            const storage = getStorage();
            for (let i = 0; i < 4; i++) {
                const imgRef = ref(storage, selectedRoom.value.image[i]);
                const url = await getDownloadURL(imgRef);
                images.value.push(url);
            }
        }
        const hostProfileImage = vueRef('');
        async function getProfileImage() {
            const storage = getStorage();
            const imgRef = ref(storage, selectedRoom.value.host.profileImage);
            const url = await getDownloadURL(imgRef);
            hostProfileImage.value = url;
        }
        const showCheckInModalState = computed(() => { return store.getters.getCheckInModalState });
        const showGuestsModalState = computed(() => { return store.getters.getGuestsModalState });
        function showCheckInModal() {
            store.commit('changeCheckInModalState', true)
            document.getElementById('checkin-modal-container').style.left = 'auto';
            document.getElementById('checkin-modal-container').style.right = 0;
        }
        function closeCheckInModal() {
            store.commit('changeCheckInModalState',false)
        }
        function showGuestsModal() {
            store.commit('changeGuestsModalState', true)
        }
 
        function closeGuestsModal() {
            store.commit('changeGuestsModalState',false)
        }

        onMounted(() => {
            getImages()
            getProfileImage()
        })
        const text = {
            reviews: 'reviews',
            save: 'Save',
            share: 'Share',
            hostedBy: 'hosted by',
            perNight: 'night',
            checkin: 'Check-in',
            checkout: 'Check-out',
            guests: 'Guests',
            reserve: 'Reserve',
            noChargeYet: 'You won’t be charged yet',
            serviceFee: 'Service fee',
            cleaningFee: 'Cleaning fee',
            total: 'Total',
            rarefind: 'A rare find',
            rarefindDescription: "'s place on FartBnb is usually fully booked",
            report: 'Report this listing',
            bedrooms: 'bedrooms',
            beds: 'beds',
            baths: 'baths',
            showMoreImages: 'Show more images',
            taxes: 'Taxes',
            highlight: {wifi: {name: 'Wifi', text: 'Free high-speed wifi'}, freeCancellation:{name:'Free Cancellation', text: 'before'}, selfCheckIn:{name:'Self Check-in', text: 'Check yourself in with the lockbox'}},
            insurance: {titleLeft: 'fart', titleRight:"cover" ,text: 'Get up to $1,000,000 in property damage protection, plus 24/7 assistance from our customer support team, with Fartcover.'},
            learnMore: 'Learn more',
            bedTypes: {singleBox: 'Single Box', boxStack: 'Stack of Boxes', mailBox: 'Cozy Mailbox'},
            whereSleep: 'Where you’ll sleep',
            placeDescription: "The coziest cottage you'll ever set foot on.",
            addDates: "Add dates for exact pricing",
        }
        return{
            text,
            selectedRoom,
            images,
            selectedDates,
            selectedGuests,
            numberOfDays,
            formatToCurrency,
            hostProfileImage,
            currentCurrency,
            today,
            showCheckInModal,
            showCheckInModalState,
            closeCheckInModal,
            showGuestsModal,
            closeGuestsModal,
            showGuestsModalState,

        }
    },
})
</script>
<style>
.room-wrapper {
    top:100px;
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 1;
    padding: 0 1% 0 1%;

}
.room {
    display: flex;
    flex-direction: column;
    justify-content:center;
    width: 100%;
    z-index: 1;
}
.room-header {
    display: flex;
    flex-direction: column;
    width:100%;
    height:100%;
    background-color: var(--color-primary);
    color: var(--color-white);
    margin-bottom:1rem;
}
.room-header .title {
    font-size: 1.5rem;
    font-weight: 700;
}
.room-header .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: 400;
}
.room-header .card-info {
    display: flex;
    align-items: center;
}
.room-header .subtitle svg {
    font-size:small
}
.room-header .card-info .rating,
.room-header .card-info .reviews,
.room-header .card-info .host,
.room-header .card-info .location{
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    gap:0.2rem;
}
.room-header .card-info .rating svg,
.room-header .card-info .host svg{
    width: 0.8rem;
    height: 0.8rem;
}
.room-header .card-info .location{
    text-decoration: underline;
}
.room-header .like-and-share {
    display: flex;
    align-items: center;
}
.room-header .like-and-share .like,
.room-header .like-and-share .share  {
    display: flex;
    align-items: baseline;
    margin-right: 0.5rem;
    gap:0.3rem;
    text-decoration: underline;
}
.room-header .like-and-share .like svg,
.room-header .like-and-share .share svg {
    width: 0.9rem;
    height: 0.9rem;
}
.room-scroller {
    display: none;
    flex-direction: column;
    padding: 1rem;
    background-color: var(--color-white);
}
.room-scroller .tabs {
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
}
.room-scroller .tabs .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 2rem;
    border: 1px solid var(--color-primary);
    border-radius: 0.25rem;
    margin-right: 0.5rem;
    cursor: pointer;
}
.room-scroller .tabs .tab:last-child {
    margin-right: 0;
}
.room-scroller .tabs .tab:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
}
.room-images-container {
    display: flex;
    flex-direction: column;
    background-color: var(--vt-c-white);
    width:100%;
    height: 100%;
    border-radius: 25px;
    overflow:hidden;
    margin-bottom: 2rem;
}
.room-images-container .images {
    display: flex;
    flex-direction: row;
    gap:0.5rem;
    border-radius: 25px;
    height:30rem;
}
.room-images-container .images .big-image {
    display:flex;
    align-items: center;
    justify-content: center;
    max-width: 50%;
    max-height: 100%;
}
.room-images-container .images .big-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.room-images-container .images .small-images {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 50%;
    max-height: 100%;
    cursor: pointer;
    gap:0.5rem;
}
.room-images-container .images .small-images .small-image {
    display:flex;
    max-width:calc(50% - 0.25rem);
    max-height:50%;
    height:50%;
}
.room-images-container .images .small-images .small-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}
.image-overlay{
    background-color: var(--vt-c-black-mute);
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    z-index:2;
    opacity:0;
    transition: opacity 0.3s ease-in-out;
}
.room-images-container .images .big-image:hover .image-overlay,
.room-images-container .images .small-images .small-image:hover .image-overlay{
    opacity:0.5;
}
.room-images-container .show-more-images-btn {
    display:flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    height: 2rem;
    border: 1px solid var(--vt-c-black);
    background-color: var(--color-background);
    border-radius: 0.25rem;
    margin-top: 0.5rem;
    cursor: pointer;
    bottom: 1rem;
    right: 1rem;
    z-index: 3;
    padding: 0 0.5rem;
}
.room-images-container .show-more-images-btn:hover{
    background-color: var(--vt-c-black);
    color: var(--vt-c-white);
}
.room-images-container .show-more-images-btn svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
}
.room-images-container .show-more-images-btn span {
    font-size: 0.75rem;
    white-space: nowrap;
}
.room-info-container{
    display: flex;
    flex-direction: row;
    background-color: var(--vt-c-white);
    width:100%;
    height:100vh;
    border-radius: 25px;
    gap:1rem;
}
.room-info-container .room-info{
    display: flex;
    flex-direction: column;
    height: 100%;

}
.room-info-container .room-info .room-info-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
}
.room-info-container .room-info .room-info-header .room-info-title{
    display: flex;
    flex-direction: column;
}
.room-info-container .room-info .room-info-header .room-info-details{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:0.2rem;
}
.room-info-container .room-info .room-info-header .room-info-details svg{
    width: 10px;
    height: 10px;
}
.room-info-container .room-info .room-info-header .room-info-details span{
    font-size: 0.7rem;
    color: var(--vt-c-black-mute);
}
.room-info-container .room-info .room-info-header .room-info-detail{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:0.2rem;
}
.room-info-container .room-info .room-info-header .room-info-detail img{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    object-fit: cover;
}
.room-info-container .room-info-body{
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-bottom: 1px solid var(--color-border);
}
.room-info-container .room-info-body .room-highlights{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap:1.2rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
}
.room-info-container .room-info-body .room-highlights .highlight-container{
    display: flex;
    flex-direction: row;
    gap:1rem;
}
.highlight-container .highlight-icon{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:0.2rem;
}
.highlight-container .highlight-icon svg{
    width: 1.6rem;
    height: 1.6rem;
    color: (var(--vt-c-black));
}
.highlight-container .highlight-text{
    display:flex;
    flex-direction: column;
    color: var(--vt-c-black);
}
.highlight-container .highlight-text span{
    font-size: 1rem;
    font-weight: 600;
    color: var(--vt-c-black-mute);
}
.highlight-container .highlight-text p {
    font-size: 0.9rem;
    color: var(--vt-c-text-light-2);
}
.room-info-container .room-insurance{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap:1.2rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
}
.room-info-container .room-insurance .insurance-logo{
    display: flex;
    flex-direction: row;
    gap:1rem;
}
.room-info-container .room-insurance .insurance-logo span{
    width: 3rem;
    height: 3rem;
    font-size: 2.6rem;
    object-fit: cover;
}
.insurance-logo .left{
    color: var(--vt-c-firebrick);
}
.room-insurance .insurance-text{
    display: flex;
    flex-direction: column;
    gap:0.5rem;
}
.room-insurance .insurance-text p{
    font-size: 1rem;
    color: var(--vt-c-black-mute);
}
.learn-more-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:0.2rem;
    font-size: 1rem;
    color: var(--vt-c-black);
}
.learn-more-btn span{
    font-weight: 600;
    text-decoration: underline;
}
.room-info-container .room-additional-info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap:1.2rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
}
.room-info-container .room-bed-type{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap:1.2rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
}
.room-info-container .room-bed-type .bed-type-header{
    display: flex;
    flex-direction: row;
}
.room-info-container .room-bed-type .bed-type-header h2{
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--vt-c-black);
}
.room-info-container .room-bed-type .bedtype-wrapper{
    display: flex;
    flex-direction: row;
    gap:1rem;
    margin-top: 1rem;
}
.bedtype-wrapper .bedtype-card{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 8rem;
    border-radius: 10px;
    padding: 1rem;
    background-color: var(--vt-c-white);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border);
}
.bedtype-card .bedtype-image{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
}
.bedtype-image svg{
    width: 1rem;
    height: 1rem;
    object-fit: cover;
}
.bedtype-card .bedtype-text{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:0.5rem;
    margin-top: 1rem;
}
.bedtype-text span, .bedtype-text p{
    font-size: 0.6rem;
    font-weight: 600;
    color: var(--vt-c-black);
}
.room-info-container .price-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    min-width:20rem;
    max-width:25rem;
}
.room-info-container .price-info .price-container-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    width:100%;
}
.room-info-container .price-info .price-container-wrapper .price-container{
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width:100%;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: 1.7rem;
    box-shadow: 0 0 0.5rem 0.1rem var(--color-border);

}
.price-container .price-container-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap:0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--vt-c-black);
    margin-bottom: 1rem;
}
.price-container .price-container-header .price-container-title{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap:0.2rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--vt-c-black);
}
.price-container .price-container-header .price-container-ratings-reviews{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:0.1rem;
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--vt-c-black-mute);
}
.price-container-ratings-reviews > .ratings , .price-container-ratings-reviews > .reviews{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:0.3rem;
}
.price-container .booking-form{
    display: flex;
    flex-direction: column;
    width:100%;
    border-radius: 10px;
    border: 1px solid var(--vt-c-black-mute);
    margin-bottom: 1rem;
}
.booking-form .dates-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--vt-c-black-mute);
}
.booking-form .booking-form-label{
    text-transform: uppercase;
    font-size: 0.6rem;
    font-weight: bold;
} 
.booking-form .dates-row .checkin,
.booking-form .dates-row .checkout{
    display: flex;
    width:100%;
    flex-direction: column;
    align-items: flex-start;
    gap:0.5rem;
    width: 100%;
}
.booking-form .dates-row .checkin{
    border-right: 1px solid var(--vt-c-black-mute);
}
.booking-form h2{
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--vt-c-black);
}
.booking-form .guests-row, .checkin, .checkout{
    padding: 0.5rem 1rem;
} 
.booking-form .guests-row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.booking-form .guests-row span{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap:0.5rem;
}

.booking-form .guests-row .guest-text-wrapper,
.booking-form .guests-row .guest-text{
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
}
.booking-form .guests-row svg{
    width: 1.3rem;
    height: 1.3rem;
}
.price-container .reserve-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap:0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    background-color: var(--vt-c-black);
    color: var(--vt-c-white);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
}
.price-container .charge-reminder{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap:0.5rem;
    font-size: 0.8rem;
    font-weight: 400;
    margin: 1rem 0;
    color: var(--vt-c-black-mute);
}
.price-container .price-breakdown-container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width:100%;
    font-size: 1rem;
    font-weight: 400;
    color: var(--vt-c-black-mute);
}
.price-breakdown-container .price-breakdown{
    display: flex;
    flex-direction: column;
    gap:0.5rem;
    width:100%;
}
.price-breakdown-container .price-breakdown .price-breakdown-row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap:0.5rem;
    font-size: 1.1rem;
}
.price-breakdown > .price-breakdown-footer{
    display: flex;
    border-top: 1px solid var(--color-border);
    padding-top: 0.5rem;
    justify-content: space-between;
}
.price-breakdown > .price-breakdown-footer > span{
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--vt-c-black);
}
.price-container-wrapper .rare-find-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap:0.5rem;
    width:100%;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: 1.7rem;
    margin-bottom: 1rem;
    box-shadow: 0 0 0.5rem 0.1rem var(--color-border);
}
.rare-find-container h2{
    font-size: 1.0rem;
    font-weight: 600;
    color: var(--vt-c-black);
}
.rare-find-container svg{
    width: 3rem;
    height: 3rem;
    color: var(--vt-c-firebrick)
}
.price-container-wrapper .report-container{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    gap:0.5rem;
    width:100%;
    font-size: 0.7rem;
    font-weight: 400;
    color: var(--vt-c-black-mute);
    margin-bottom: 1rem;
}
.media-header, .media-footer{
    display:none;
}
@media (max-width: 824px){
    .media-header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position:fixed;
        top:0;
        left:0;
        width:calc(100% - 1.16em);
        height: 3rem;
        background-color: var(--color-background);
        z-index: 100;
        align-content: center;
    }
    .media-header .media-home-btn{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap:0.5rem;
        padding: 0 1rem;
        color: var(--vt-c-black);
        cursor: pointer;
    }
    .media-header .media-home-btn svg{
        width: 0.7rem;
        height: 1.5rem;
    }
    .media-header .media-home-btn h2{
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: underline;
        margin-bottom:0.1rem;
    }
    .media-header .like-and-share{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap:0.5rem;
        padding: 0 1rem;
        color: var(--vt-c-black);
        cursor: pointer;
    }
    .media-footer{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position:fixed;
        bottom:0;
        left:0;
        width:calc(100% - 1.16em);
        height: 5rem;
        background-color: var(--color-background);
        z-index: 100;
        align-content: center;
        padding: 0 1rem;
        border-top: 1px solid var(--color-border);
    }
    .media-footer > .calendar-dates{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap:0.1rem;
        color: var(--vt-c-black);
        cursor: pointer;
    }
    .media-footer > .calendar-dates > h2 {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom:0.1rem;
    }
    .media-footer > .calendar-dates > .rating {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.2rem;
        font-size: 0.7rem;
        font-weight: 400;
        margin-bottom:0.1rem;
    }
    .media-footer > .reserve-btn{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap:0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        background-color: var(--vt-c-black);
        color: var(--vt-c-white);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        width: 8rem;
    }
    .room-wrapper{
        top:4rem;
    }
    .room-info-container{
        flex-direction: column;
        gap: 1rem;
        order:3;
        height:auto;
    }
    .room-info-container > .price-info{
        display:none;
    }
    .room-images-container{
        order:1;
        margin-bottom: 0.5rem;
    }
    .room-images-container > .images{
        height:auto;
    }
    .room-images-container > .images > .small-images{
        display: none;
    }
    .room-images-container > .images > .big-image{
        max-width:100%;
    }
    .room-header{
        order:2;
    }
    .room-header > .subtitle{
        gap: 0.2rem;
        font-size: 0.7rem;
        white-space:nowrap;
    }
    .room-header > .subtitle > .card-info{
        flex-wrap:wrap;
    }
    .room-header > .subtitle > .like-and-share{
        display:none;
    }
}
@media (min-width: 825px){
    
    .room-wrapper{
        padding: 0 6%;
    }
    .room-images-container{
        width: 100%;
    }
    .room-info-container{
        gap: 1rem;
    }
    .room-info-container .room-info .room-info-header .room-info-details span{
        font-size: 1rem;
    }
    .bedtype-image svg{
        width: 2rem;
        height: 2rem;
    }
    .bedtype-text span, .bedtype-text p{
        font-size: 0.9rem;
    }
}
@media (min-width: 900px){
.room-wrapper{
        padding: 0 7%;
    }
.room-info-container{
        gap: 4rem;
    }
}

@media (min-width: 1024px){
    .room-wrapper{
        padding: 0 12.5%;
    }

}
@media (max-width: 1400px){
    .price-container .price-container-header{
        flex-direction: column;
        gap:0;
    }
}

</style>
