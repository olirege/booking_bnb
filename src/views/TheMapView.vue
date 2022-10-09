<template>
    <GoogleMap api-key="AIzaSyCRvPb4r_F8VqLHVVugvXSAI2Li4TvzOb0" class="map" :center="center" :zoom="15">
        <CustomMarker v-for="listing of listings" :key="listing.id"  :options="{ position: listing.coords, anchorPoint: 'BOTTOM_CENTER' }">
            <div style="text-align: center">
                <div class="priceMark"><h3>{{formatToCurrency(listing.pricePerNight)}} {{currentCurrency}}</h3></div>
            </div>
        </CustomMarker >
    </GoogleMap>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import {GoogleMap, CustomMarker} from "vue3-google-map"

export default({
    components: {
        GoogleMap,
        CustomMarker,
    },
    setup(){
        const store = useStore()
        const currentCurrency = computed(() => {
            return store.getters.getCurrentCurrency;
        });        
        function formatToCurrency(value) {
            return Intl.NumberFormat('en-US', { style: 'currency', currency: currentCurrency.value }).format(value);
        } 
        const listings = store.getters.getListings
        const center = { lat: 40.689247, lng: -74.044502 };

        return { center,listings,currentCurrency,formatToCurrency };
    }
})
</script>
<style scoped>
.map {
    position:absolute;
    top: 200px;
    height: calc(100% - 250px);
    width: 100%;
}
.priceMark{
    background-color: var(--color-background);
    border-radius: 25px;
    width: 6rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.priceMark:hover{
    scale:1.1;
    cursor:pointer;
}
.priceMark > h3{
    color: black;
    font-size: 1.2em;
    font-weight: bold;
}
</style>