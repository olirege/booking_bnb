<script>
import { RouterLink, RouterView, useRouter } from "vue-router";
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TheCategories from './components/TheCategories.vue'
import TheShowMapButton from "./components/TheShowMapButton.vue";
import TheLoginModal from "./components/TheLoginModal.vue";
import { useStore } from 'vuex'
import { computed,ref } from 'vue'
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
        const router = useRouter()
        const loginModalState = computed( () => {return store.getters.getLoginModalState})
        const TheCategoriesState = ref(true)
        const TheFooterState = ref(true)
        const TheHeaderState = ref(true)
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
        
        router.beforeEach((to, from, next) => {
            if(to.name === 'room') {
                TheCategoriesState.value = false
                window.addEventListener('resize', () => {
                    if(window.innerWidth > 820) {
                        TheFooterState.value = true
                        TheHeaderState.value = true
                    } else {
                        TheFooterState.value = false
                        TheHeaderState.value = false
                    }
                })
            }
            if (from.name === 'room') {
                TheCategoriesState.value = true
                window.removeEventListener('resize', () => {
                    if(window.innerWidth > 820) {
                        TheFooterState.value = true
                        TheHeaderState.value = true
                    } else {
                        TheFooterState.value = false
                        TheHeaderState.value = false
                    }
                })
            }
            if (to.name === 'payment') {
                TheCategoriesState.value = false
                TheFooterState.value = false
            }
            if (from.name === 'payment') {
                TheCategoriesState.value = true
                TheFooterState.value = true
            }
            next()
        })
        return {
            loginModalState,
            TheCategoriesState,
            TheFooterState,
            TheHeaderState
                }
    },
})

</script>

<template>
  <TheHeader v-if="TheHeaderState"></TheHeader>
  <TheCategories v-if="TheCategoriesState"></TheCategories>
  <RouterView />
  <TheLoginModal v-if="loginModalState"></TheLoginModal>
  <TheShowMapButton></TheShowMapButton>
  <TheFooter v-if="TheFooterState"></TheFooter>
</template>