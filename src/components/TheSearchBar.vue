<template>
    <div class="search-bar-wrapper">
        <div class="btn-wrapper" id="filter"><BIconSliders></BIconSliders></div>
        <div class="place-holder-wrapper">
            <h1 class="mobile-wrapper">Where to?</h1>
            <div class="place-holder">
                <h2>{{text.place}}</h2>
                <span class='separatoe'></span>
                <h2>{{text.date}}</h2>
                <span class='separatoe'></span>
                <h2>{{text.guests}}</h2>
            </div>
        </div>
        <div class="btn-wrapper" id="search"><BIconSearch></BIconSearch></div>
    </div>
    <div class="big-search-bar-container-wrapper">
        <div  class="search-options">
            <div class="search-option">
                <h2>{{text.stays}}</h2>
            </div> 
            <div class="search-option" >
                <h2>{{text.experiences}}</h2>
            </div>
            <div class="search-option" >
                <h2>{{text.onlineExperiences}}</h2>
            </div>
        </div>
        <div class="big-search-bar-wrapper">
            <span class="option-wrapper">
                <div class="option" id="where-option" @click="showRegionModal">
                    <h1 class='option-title'>{{text.where}}</h1>
                    <h4 class="option-description">{{text.whereDescription}}</h4>
                </div>
            </span>
            <TheRegionModal v-if="showRegionModalState" @close-region-modal="closeRegionModal"></TheRegionModal>
            <span class="big-separator"></span>
            <span class="option-wrapper">
                <div class="option" @click="showCheckInModal">
                    <h1 class='option-title'>{{text.checkIn}}</h1>
                    <h4 class="option-description">{{checkInDate ? checkInDate : text.checkInDescription}}</h4>
                </div>
             </span>
             <span class="big-separator"></span>
             <span class="option-wrapper">
                 <div class="option" @click="showCheckInModal">
                    <h1 class='option-title'>{{text.checkOut}}</h1>
                    <h4 class="option-description">{{checkOutDate ? checkOutDate : text.checkOutDescription}}</h4>
                </div>
            </span>
            <TheCheckInModal v-if="showCheckInModalState" @close-checkin-modal="closeCheckInModal"></TheCheckInModal>
            <span class="big-separator"></span>
            <span class="option-wrapper">
                <div class="big-search-bar-last-element">
                    <span class= "option" @click="showGuestsModal">
                        <h1 class='option-title'>{{text.guest}}</h1>
                        <h4 class="option-description">{{text.guestsDescription}}</h4>
                    </span>
                    <div class="big-search-btn-wrapper">
                        <div class="big-search-btn" @click="showGuestsModal">
                            <BIconSearch></BIconSearch>
                            <h4>{{text.search}}</h4>
                        </div>
                    </div>
                </div>
            </span>
            <TheGuestsModal v-if="showGuestsModalState" @close-guests-modal="closeGuestsModal"></TheGuestsModal>
        </div>
    </div>
</template>
<script>
import { BIconSearch,BIconSliders } from 'bootstrap-icons-vue';
import TheRegionModal from './TheRegionModal.vue';
import TheGuestsModal from './TheGuestsModal.vue';
import TheCheckInModal from './TheCheckInModal.vue';

import { ref,computed } from 'vue';
import { useStore } from 'vuex';
export default ({
    components: {
        BIconSearch,
        BIconSliders,
        TheRegionModal,
        TheGuestsModal,
        TheCheckInModal,
    },
    setup(_,ctx) {
        const store = useStore();
        const showRegionModalState = computed(() => { return store.getters.getRegionModalState });
        const showGuestsModalState = computed(() => { return store.getters.getGuestsModalState });
        const showCheckInModalState = computed(() => { return store.getters.getCheckInModalState });
        const checkInDate = computed(() => {
             if(store.getters.getSelectedDates && store.getters.getSelectedDates.length > 0) {
                 let date = store.getters.getSelectedDates[0][0];
                 return text.months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
             }
        })
        const checkOutDate = computed(() => {
                if(store.getters.getSelectedDates && store.getters.getSelectedDates[1]) {
                    let date = store.getters.getSelectedDates[1][0];
                    return text.months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
                }
        })
        const text = {
            'place': 'Anywhere',
            'date': 'Any week',
            'guests': 'Add guests',
            'where': 'Where',
            'whereDescription': 'Anywhere',
            'checkIn': 'Check-in',
            'checkInDescription': 'Add date',
            'checkOut': 'Check-out',
            'checkOutDescription': 'Add date',
            'guest': 'Guests',
            'guestsDescription': 'Add guests',
            'search': 'Search',
            months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            stays:'Stays',
            experiences:'Experiences',
            onlineExperiences:'Online Experiences',
            }
        const selectedOption = ref(null);
        function activateOption(e) {
            if (selectedOption.value) {
                selectedOption.value.classList.remove('option-selected')
            }
            selectedOption.value = e.target.closest('.option-wrapper')
            if (selectedOption.value) {
                selectedOption.value.classList.add('option-selected')
            }
        }
        
        function closeRegionModal() {
            console.log('closeRegionModal')
            store.commit('changeRegionModalState',false)
        }
        function closeGuestsModal() {
            console.log('closeGuestsModal')
            store.commit('changeGuestsModalState',false)
        }
        function closeCheckInModal() {
            console.log('closeCheckInModal')
            store.commit('changeCheckInModalState',false)
        }
        
        function showRegionModal(e) {
            activateOption(e)
            store.commit('changeRegionModalState', true)
        }
        function showCheckInModal(e) {
            activateOption(e)
            store.commit('changeCheckInModalState', true)
        }
        function showGuestsModal(e) {
            activateOption(e)
            store.commit('changeGuestsModalState', true)
        }

        return{
            text,
            showRegionModal,
            showRegionModalState,
            showGuestsModalState,
            showCheckInModalState,
            showCheckInModal,
            showGuestsModal,
            activateOption,
            closeRegionModal,
            closeGuestsModal,
            closeCheckInModal,
            checkInDate,
            checkOutDate,
        }    
    },
})
</script>
<style scoped>
    .search-bar-wrapper{
        display:flex;
        background-color: var(--color-background);
        flex-direction: row-reverse;
        align-items:center;
        height: 50px;
        width: 100%;
        z-index: 100;
        border: 1px solid var(--color-border);
        border-radius: 25px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    }
    .search-bar-wrapper:hover{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    }
    .place-holder-wrapper{
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 100%;
    }
    .mobile-wrapper{
        display:flex;
        font-size: 1em;
        justify-content:flex-start;
        padding: 0 1rem;
        margin-left: 1rem;
        color: black;
    }

    .place-holder-wrapper > .place-holder{
        display:flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: 0 1rem 0 1rem;
    }
    .place-holder-wrapper > .place-holder > h2{
        font-size: 0.7rem;
        padding: 0 1rem 0 1rem;
        font-weight: 400;
        color: var(--color-text);
        cursor: pointer;
    }
    .separatoe{
        height: 1.3rem;
        width: 1px;
        background-color: var(--color-border);
    }
    .btn-wrapper{
        display:flex;
        align-items: center;
        justify-content: center;
        padding:10px;
        min-height: 32px;
        min-width: 32px;
        border-radius: 50%;
        margin-right: 8px;
        color:var(--color-background);
        cursor: pointer;
    }
    .btn-wrapper > *{
        height: 15px;
        width: 15px;
    }
    #filter{
        display:flex;
        visibility:visible;
        background-color: var(--color-background);
        color:black;
        border: 1px solid var(--color-border);
    }

    #search{
        margin-right: 0;
        margin-left: 8px;
        background-color:var(--color-background);
        color:black;
    }
@media(max-width:347px){
    .place-holder-wrapper > .place-holder > h2{
        font-size: 0.5rem;
        padding: 0 0.3rem 0 0.3rem;
    }
    .place-holder-wrapper > .place-holder{
        font-size: 0.5rem;
        padding: 0;
    }
}
@media(min-width:348px) and (max-width: 455px){
    .place-holder-wrapper > .place-holder > h2{
        font-size: 0.6rem;
        padding: 0 0.5rem 0 0.5rem;
    }
    .place-holder-wrapper > .place-holder{
        font-size: 0.6rem;
        padding: 0;
    }
}
@media(min-width: 768px){
    .search-bar-wrapper{
        width: 25rem;
        margin: 0;
        flex-direction: row;
    }
    #filter{
        display:none;
        visibility:hidden;
    }
    #search{
        margin-right: 8px;
        margin-left: 0;
        background-color: var(--color-logo);
    }
    .btn-wrapper > *{
        height: 11px;
        width: 11px;
    }
    .mobile-wrapper{
        display:none;
        visibility:hidden;
    }
    .place-holder-wrapper > .place-holder{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: 0 1rem 0 1rem;
    }
    .place-holder-wrapper > .place-holder > h2{
        font-size: 1rem;
        padding: 0 1rem 0 1rem;
        font-weight: 400;
        color: var(--color-text);
    }

    /* big search bar */
@media (min-width: 768px){
        .big-search-bar-container-wrapper{
            display:none;
            visibility:hidden;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            position:fixed;
            top:0;
            left:0;
            height:170px;
            width:calc(100% - 1.15em);
            z-index:151;
            background-color:var(--color-background);
            transition: height 0.5s ease-in-out;
        }
        .search-options{
            display:none;
            visibility:hidden;
            justify-content: center;
            align-items: center;
            height: 230px;
            position: absolute;
            top: -100px;
            width:100%;
            z-index: 100;
            transition: height 0.5s ease-in-out;
            }
        .search-option{
            display:flex;
            flex-direction: column;
            margin: 0 0.5rem 0 0.5rem;
            cursor: pointer;
        }
        .search-option::after{
            content: '';
            display: block;
            border-bottom: 2px solid var(--vt-c-black-mute);
            transform: scaleX(0);  
            transition: transform 250ms ease-in-out
        }
        .search-option:hover:after{
            transform: scaleX(1);
        }
        .search-option > h2{
            font-size: 1rem;
            font-weight: 400;
            color: var(--color-text);
        }
        .search-option > h2:hover{
            opacity:0.65;
        }
        .big-search-bar-wrapper{
            display:none;
            visibility: hidden;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 70px;
            width: 90%;
            z-index: 100;
            border: 1px solid var(--color-border);
            border-radius: 35px;
            background-color: var(--vt-c-white-mute);
            transition: width 0.5s ease-in-out;

        }
        .option-wrapper{
            height:100%;
            width:100%;
        }
        .option{
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            height: 100%;
        }
        .big-separator{
            height: 2rem;
            width: 5px;
            background-color: var(--color-border);
        }
        #where-option{
            width: 15rem;
        }
        .option-wrapper:hover{
            background-color: #ccc;
            box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
            border-radius:35px;
            z-index:149;
        }
        .option-selected{
            background-color: var(--vt-c-white);
            box-shadow: 5px 8px 8px 0 rgba(0,0,0,0.17);
            border-radius:35px;
            pointer-events: none;
        }
        .option > .option-title{
            font-size: 0.7rem;
            padding: 0 1rem 0 1rem;
            font-weight: bold;
            color: var(--vt-c-black);
        }
        .option > .option-description{
            font-size: 0.8rem;
            padding: 0 1rem 0 1rem;
            font-weight: 400;
            color: var(--color-text);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .big-search-bar-last-element{
            display:flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width:15rem;
            height: 100%;
        }
        .big-search-bar-last-element > .option{
            flex-basis:50%;
            padding-left:1rem;
        }
        .big-search-bar-last-element > .option > *{
            padding:0;
        }
        .big-search-bar-last-element > .option:hover{
            background-color: none;
            box-shadow: none;
        }
        .big-search-btn-wrapper{
            display:flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            width:50%;
        }
        .big-search-btn{
            display:flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap:5px;
            height:40px;
            width: 100%;
            border-radius: 25px;
            margin:0 1rem 0 0;
            background-color:var(--vt-c-firebrick);
            color: var(--vt-c-white);
            font-weight:bold;
        }
    }
}

@media(min-width: 1200px){
    .big-search-bar-container-wrapper{
        height:100px;
    }
    .big-search-bar-wrapper{
        width:60%;
    }
    .search-options{
        height:100%;
    }
    .search-option >h2{
        font-size: 1.2rem;
    }
    .search-option {
        margin: 0 1rem 0 1rem;
    }
}
</style>
