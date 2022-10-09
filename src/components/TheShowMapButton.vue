<template>
    <div class="show-map-button-wrapper">
        <RouterLink to="/map" v-if="currentRoute.name == 'home'">
            <div class="show-map-button">
                <h1 class="show-map-button-text">{{text.showMap}}</h1>
                <BIconMapFill></BIconMapFill>
            </div>
        </RouterLink>
        <RouterLink to="/" v-if="currentRoute.name == 'map'">
            <div class="show-map-button">
                <h1 class="show-map-button-text">{{text.showList}}</h1>
                <BIconPostcardFill></BIconPostcardFill>
            </div>
        </RouterLink>
    </div>
</template>
<script>
import { RouterLink , useRoute } from "vue-router";
import {BIconMapFill, BIconPostcardFill} from 'bootstrap-icons-vue'
export default ({
    components:{
        BIconMapFill,
        RouterLink,
        BIconPostcardFill,
    },
    setup() {
        const text = {showMap:'Show Map', showList:'Show List'}
        const currentRoute = useRoute()
        
        return {
            text,
            currentRoute
        }
    },
})
</script>
<style scoped>
    .show-map-button{
        position:fixed;
        bottom: 10%;
        left: calc(50% - 5rem);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 10rem;
        height: 2.2rem;
        background-color: var(--vt-c-black-soft);
        border-radius: 25px;
        z-index: 100;
    }
    .show-map-button > * {
        text-decoration: none;
        color: var(--vt-c-white-soft);
    }

    .show-map-button-text{
        font-size: 1rem;
        font-weight: 500;
    }
    .show-map-button-wrapper{
        cursor:pointer;
    }
    .show-map-button:hover{
        scale:1.05;
    }
</style>
