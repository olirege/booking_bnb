<template>
    <GoogleMap api-key="AIzaSyCRvPb4r_F8VqLHVVugvXSAI2Li4TvzOb0" class="map" :center="center" :zoom="15">
        <Marker :options="{ position: center }" />
    </GoogleMap>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import {GoogleMap, Marker} from "vue3-google-map"

export default({
    components: {
        GoogleMap,
        Marker,
    },
    setup(){
        const store = useStore()
        const center = { lat: 40.689247, lng: -74.044502 };
        return { center };
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
</style>