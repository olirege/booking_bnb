<template>
    <div class="payment-wrapper">
        <div class="booking-info-wrapper">
            <div class="booking-info">
                <Router-link :to="{name:'room', params:{id:selectedRoom.id}}">
                    <div class="payment-header">
                        <BIconChevronLeft></BIconChevronLeft>
                        <h1 class="payment-title">{{text.title}}</h1>
                    </div>
                </Router-link>
                <div class="booking-info-header">
                    <h2>{{text.bookingInfoTitle}}</h2>
                </div>
                <div class="options">
                    <div class="option">
                        <span>
                            <h3 class="option-title">{{text.dates}}</h3>
                            <p>{{selectedDates}}</p>
                        </span>
                        <h3 class="edit">{{text.edit}}</h3>
                    </div>
                    <div class="option">
                        <span>
                            <h3 class="option-title">{{text.guests}}</h3>
                            <p>{{selectedGuests}}</p>
                        </span>
                        <h3 class="edit">{{text.edit}}</h3>
                    </div>
                </div>
                <div class="login-wrapper" v-if="!user.isAnonymous">
                    <div class="login-header">
                        <h3>{{text.login}}</h3>
                    </div>
                    <div class="login-options">
                        <div class="login-form">
                            <input class="email" :placeholder="text.email"/>
                            <input class="password" :placeholder="text.password"/>
                        </div>
                        <div class="continue-btn">
                            <h3>{{text.continue}}</h3>
                        </div>
                        <div class="or-separator">
                            <span></span>
                            <h3>{{text.or}}</h3>
                            <span></span>
                        </div>
                        <div class='login-social'>
                            <div class="login-option">
                                <BIconGoogle></BIconGoogle>
                            </div>
                            <div class="login-option">
                                <BIconFacebook></BIconFacebook>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="price-breakdown-wrapper">
                <div class="price-info">
                    <div class="room-info-header">
                        <div class="image">
                            <img :src="coverImage" alt="room image">
                        </div>
                        <span>
                            <div class="room-info">
                                <h3>{{selectedRoom.type}}</h3>
                                <p>{{selectedRoom.title}}</p>
                            </div>
                            <div class="card-info">
                                <div class="rating">
                                    <BIconStar></BIconStar>
                                    <h3>{{selectedRoom.rating}}</h3>
                                </div>
                                <div class="reviews">
                                    <span>({{selectedRoom.reviews}}{{text.reviews}})</span>
                                </div>
                                <BIconDot></BIconDot>
                                <div class="host">
                                    <BIconTrophyFill></BIconTrophyFill>
                                    <h3>{{selectedRoom.hostType}}</h3>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div class="insurance-wrapper">
                        <h3 class="insurance">
                            {{text.insurance.text}}
                        </h3>
                        <span class="left">
                            {{text.insurance.left}}
                        </span>
                        <span class="right">
                            {{text.insurance.right}}
                        </span>
                    </div>
                    <div class="price-breakdown">
                        <div class="price-breakdown-row">
                            <span>{{formatToCurrency(selectedRoom.pricePerNight)}}  x {{numberOfDays}} {{text.perNight}}</span>
                            <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays)}} </span>
                        </div>
                        <div class="price-breakdown-row">
                            <span>{{text.serviceFee}}</span>
                            <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays * 0.1)}} </span>
                        </div>
                        <div class="price-breakdown-row">
                            <span>{{text.cleaningFee}}</span>
                            <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays * 0.05)}} </span>
                        </div>
                        <div class="price-breakdown-row">
                            <span>{{text.taxes}}</span>
                            <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays * 0.15)}} </span>
                        </div>
                        
                        <div class="price-breakdown-footer">
                            <span>{{text.total}}</span>
                            <span>{{formatToCurrency(selectedRoom.pricePerNight * numberOfDays * 1.30)}} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
</template>
<script>
import {useStore} from 'vuex'
import {ref as vueRef,computed, onMounted } from 'vue'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {BIconChevronLeft,BIconGoogle,BIconFacebook,BIconStar,BIconTrophyFill,BIconDot} from 'bootstrap-icons-vue'

export default({
    components: {
        BIconChevronLeft,
        BIconGoogle,
        BIconFacebook,
        BIconStar,
        BIconDot,
        BIconTrophyFill,
    },
    setup() {
        const store = useStore()
        const user = computed(() => store.getters.getUser)
        const selectedDates = computed(() => {
            let unformatedDates = store.getters.getSelectedDates
            let dates = []
            unformatedDates.forEach(date => {
                let dateObj = new Date(date[0])
                let day = dateObj.getDate()
                let month = dateObj.getMonth() + 1
                let year = dateObj.getFullYear()
                dates.push(`${day}/${month}/${year}`)
            })
            return dates.join(' - ')
        })
        const selectedGuests = computed(() => { 
            let unformattedGuests = store.getters.getSelectedGuests
            return `${unformattedGuests.Adults} ${unformattedGuests.Adults > 1 ? 'adults' : 'adult'} 
            ${unformattedGuests.Children > 0 ? `, ${unformattedGuests.Children} ${unformattedGuests.Children > 1 ? 'children' : 'child'}` : ''}
            ${unformattedGuests.Pets > 0 ? `, ${unformattedGuests.Pets} ${unformattedGuests.Pets > 1 ? 'pets' : 'pet'}` : ''}
            ${unformattedGuests.Infants > 0 ? `, ${unformattedGuests.Infants} ${unformattedGuests.Infants > 1 ? 'infants' : 'infant'}` : ''}`
        })
        const selectedRoom = computed(() => store.getters.getSelectedRoom)
        const text = {
            title:'Request to book - FartBnb',
            bookingInfoTitle:'Your Trip',
            priceBreakdown:'Price details',
            dates:'Dates',
            guests:'Guests',
            edit:'Edit',
            login:'Log in or sign up to book',
            continue:'Continue',
            or:'or',
            email:'Email',
            password:'Password',
            reviews:' reviews',
            insurance: {text:"Your booking is protected by ",left: "fart", right: "bnb"},
            serviceFee: "Service fee",
            taxes: "Taxes",
            cleaningFee: "Cleaning fee",
            total: "Total",
            
            }

        const coverImage = vueRef();
        async function getImages() {
            const storage = getStorage();
            const imgRef = ref(storage, selectedRoom.value.image[0]);
            const url = await getDownloadURL(imgRef);
            coverImage.value = url;
        }
        const currentCurrency = computed(() => {
            return store.getters.getCurrentCurrency;
        });
        function formatToCurrency(value) {
            return Intl.NumberFormat('en-US', { style: 'currency', currency: currentCurrency.value }).format(value);
        }
        const numberOfDays = computed(() => {
            let dates = store.getters.getSelectedDates
            let firstDate = new Date(dates[0][0])
            let secondDate = new Date(dates[1][0])
            let diffTime = Math.abs(secondDate - firstDate);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            return diffDays
        });
        onMounted(() => {
            getImages();
        });

        return {
            text,
            selectedDates,
            selectedGuests,
            selectedRoom,
            coverImage,
            formatToCurrency,
            numberOfDays,
            currentCurrency,
            user,
        }
    }
})
</script>
<style scoped>
.payment-wrapper {
    width: calc(100% - 1.16em);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top:100px;
}
.booking-info-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    gap: 1rem;
}
.payment-header {
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    gap:0.3rem;
    margin-bottom: 2rem;
}
.payment-title {
    font-size: 2rem;
    font-weight: 700;
}
.booking-info {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.booking-info-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 2rem;
}
.booking-info-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
}
.options {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
}
.option {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.option span{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
.option .option-title{
    font-size: 1.1rem;
    font-weight: 700;
}
.option .edit{
    text-decoration: underline;
    color: var(--vt-c-black);
    font-weight:bold
}
.login-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.login-header {
    width: 100%;
    display: flex;
    margin: 1rem 0;
    align-items: center;
    justify-content: flex-start;
}
.login-header h3 {
    font-size: 1.3rem;
    font-weight: 700;
}
.login-options {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    justify-content: center;
    border-radius: 10px;
}
.login-form input{
    width: 97%;
    height: 50px;
    border: none;
    border-bottom: 1px solid black;
}
.login-form .password{
    border-bottom: none;
}
.continue-btn {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--vt-c-black);
    color: white;
    border-radius: 10px;
    margin: 1rem 0;
}
.or-separator {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 2rem 0;
}
.or-separator h3{
    font-size: 0.7rem;
}
.or-separator span{
    width: 250px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid var(--color-border);
}
.login-option {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-social {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
.login-social > .login-option{
    width: 50%;
    height: 3.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--vt-c-black);
    border-radius: 10px;
}
.price-breakdown-wrapper {
    width: 40%;
    display: flex;
    flex-direction: column;
    
}
.price-breakdown-wrapper > .price-info{
    border: 1px solid var(--color-border);
    border-radius: 25px;
    padding: 1rem;
}
.price-breakdown-wrapper > .price-info > .room-info-header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
    gap: 0.5rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1rem; 
}
.price-breakdown-wrapper > .price-info > .room-info-header > .image {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
}
.price-breakdown-wrapper > .price-info > .room-info-header > .image > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.price-breakdown-wrapper > .price-info > .room-info-header > span{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
}
.price-breakdown-wrapper > .price-info > .room-info-header > span > .room-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
.price-breakdown-wrapper > .price-info > .room-info-header > span > .room-info > h3{
    font-size: 0.8rem;
}
.price-breakdown-wrapper > .price-info > .room-info-header > span > .room-info > p{
    font-size: 1.1rem;
}
.price-breakdown-wrapper > .price-info > .room-info-header > span > .card-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:0.3rem;
    justify-content: center;
}
.price-breakdown-wrapper > .price-info > .room-info-header > span > .card-info  div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    gap:0.2rem;
}
.price-breakdown-wrapper > .price-info > .insurance-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 1rem;
}
.insurance-wrapper .insurance {
    margin-right: 0.5rem;
    font-size: 0.9rem;
    white-space: nowrap;
}
.insurance-wrapper .left{
    color: var(--vt-c-firebrick);
}
.insurance-wrapper .left,
.insurance-wrapper .right{
    font-size: 0.9rem;
}
.price-breakdown-wrapper > .price-info > .price-breakdown {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
.price-breakdown-wrapper > .price-info > .price-breakdown > .price-breakdown-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}
.price-breakdown-wrapper > .price-info > .price-breakdown > .price-breakdown-footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    margin-top: 1rem;
}
@media(min-width: 768px) and (max-width: 1023px){
    .payment-wrapper{
        padding: 0 2%;
    }
    .booking-info-wrapper{
        gap:1.5rem;
    }
}
@media(min-width: 1024px) and (max-width: 1299px){
    .payment-wrapper{
        padding: 0 10%;
    }
    .booking-info-wrapper{
        gap:3rem;
    }
    .insurance-wrapper > .insurance{
        font-size: 1.0rem;
    }
    .card-info h3{
        font-size: 0.7rem;
    }
    .insurance-wrapper > .left,
    .insurance-wrapper > .right{
        font-size: 1.0rem;
    }

}
@media(min-width: 1300px){
    .payment-wrapper{
        padding: 0 20%;
    }
    .booking-info-wrapper{
        gap:4rem;
    }
    .card-info h3{
        font-size: 0.8rem;
    }
    .insurance-wrapper > .insurance{
        font-size: 1.1rem;
    }
    .insurance-wrapper > .left,
    .insurance-wrapper > .right{
        font-size: 1.1rem;
    }
}
</style>