<script>
import { RouterLink, RouterView } from "vue-router";
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TheCategories from './components/TheCategories.vue'
import TheShowMapButton from "./components/TheShowMapButton.vue";
import {useStore} from 'vuex'
import { onMounted } from 'vue'
export default ({
    components: {
        RouterLink,
        RouterView,
        TheHeader,
        TheFooter,
        TheCategories,
        TheShowMapButton,
    },
    setup() {
        const store = useStore()
        store.dispatch('initFb').then(
            () => {
                return store.getters.getDb
            }
        ).finally(
            () => {
                return store.dispatch('loadListings')
            }
        )
    },
})

</script>

<template>
  <TheHeader></TheHeader>
  <TheCategories></TheCategories>
  <RouterView />
  <TheShowMapButton></TheShowMapButton>
  <TheFooter></TheFooter>
</template>

<style scoped>

</style>
