<script>
import { RouterLink, RouterView } from "vue-router";
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TheCategories from './components/TheCategories.vue'
import TheShowMapButton from "./components/TheShowMapButton.vue";
import TheLoginModal from "./components/TheLoginModal.vue";
import {useStore} from 'vuex'
import { computed } from 'vue'
export default ({
    components: {
        RouterLink,
        RouterView,
        TheHeader,
        TheFooter,
        TheLoginModal,
        TheCategories,
        TheShowMapButton,
    },
    setup() {
        const store = useStore()
        const loginModalState = computed( () => {return store.getters.getLoginModalState})
        store.dispatch('initFb').then(
            () => {
                return store.getters.getDb
            }
        ).finally(
            () => {
                return store.dispatch('loadListings')
            }
        )
        store.dispatch('checkAuth')
        return {
            loginModalState,
                }
    },
})

</script>

<template>
  <TheHeader></TheHeader>
  <TheCategories></TheCategories>
  <RouterView />
  <TheLoginModal v-if="loginModalState"></TheLoginModal>
  <TheShowMapButton></TheShowMapButton>
  <TheFooter></TheFooter>
</template>