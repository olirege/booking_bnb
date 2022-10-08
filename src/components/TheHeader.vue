<template>
    <div class="header-wrapper">
        <div class="header-logo">
            <span class="logo-wrapper">
                <img class="logo" src="../assets/logo.svg" alt="logo">
                <h1>{{text.logo}}</h1>
            </span>
        </div>
        <div class="header-search">
            <TheSearchBar />
        </div>
        <div class="options">
            <div class="option" id="host">
                <h4>{{text.host}}</h4>
                <div class="globe-wrapper"><BIconGlobe @click="addListing"></BIconGlobe></div>
            </div>
            <div class="user-button-wrapper">
                <BIconList></BIconList>
                <BIconPersonCircle></BIconPersonCircle>
            </div>
        </div>
    </div>
</template>
<script>
import TheSearchBar from './TheSearchBar.vue'
import { BIconGlobe,BIconList,BIconPersonCircle } from 'bootstrap-icons-vue'
import {useStore} from 'vuex'
export default ({
    components: {
        TheSearchBar,
        BIconGlobe,
        BIconList,
        BIconPersonCircle,
    },
    setup() {        
        const store = useStore()
        const text = {
                    logo:'fartbnb',
                    host:'Become a host'}
        function addListing(){
            let payload= {
                title: 'test',
                pricePerNight: 100,
                rating: 5,
                distance: 5,
                dateRange: 'test',
                image: ['test']
            }
            store.dispatch('postListing',payload)

        }
        return {
            text,
            addListing,
        }
    },
})
</script>
<style scoped>


 .header-wrapper{
    display:flex;
    justify-content: space-between;
    flex-direction:row;
    align-content: center;
    background-color: var(--color-background);
    height: 100px;
    width: calc( 100% - 1.06em);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
 }
 .header-search{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0 2rem 0 2rem;

 }

.header-logo{
    visibility:hidden;
    display:none
}

.options{
    display:none;
    visibility:hidden
}

 @media(min-width: 768px){
    .header-wrapper{
        border-bottom: 1px solid var(--color-border);
    }
    .header-logo{
        visibility:visible;
        display:flex;
        flex-direction: row;
        align-items: center;
        margin-left: 4rem;
    }
    .logo-wrapper{
        display:flex;
        flex-direction: row;
        align-items: center;
        height:36px;
        gap: 10px;
    }
    .logo-wrapper > h1{
        visibility: hidden;
        display:none;
    }
    .logo{
        height: 100%;
    }
    .user-button-wrapper{
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        gap: 5px;
        height:45px;
        border-radius: 10px;
        width: 100px;
        border: 1px solid var(--color-border);
        transition: all 0.2s ease-in-out;
        padding: 10px;
    }
    .user-button-wrapper:hover{
        box-shadow: 2px 2px 5px 3px var(--color-border);
    }

    .user-button-wrapper > *{
        height: 100%;
        width: 100%;
    }
 }

 @media(min-width:950px){
    .logo-wrapper > h1{
        visibility: visible;
        display:block;
        font-size: 24px;
    }
    .options{
        visibility:visible;
        display:flex;
        flex-direction: row;
        align-items: center;
        margin-right: 3rem;
    }
    .option{
        display:flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        margin-right: 1rem;
        white-space:nowrap;
        font-weight: 600;
    }
    .option > h4{
        height:50px;
        border-radius: 25px;
        padding:10px;
        color:black;
        width:100%;
        text-align:center;
    }
    
    .option > .globe-wrapper{
        height:50px;
        display:flex;
        justify-content: center;
        align-items: center;
        width:60px;
        border-radius:50%;
        padding:10px;
    }
    .option > *:hover{
        background-color: #e6e5e5;
    }
 }
</style>
