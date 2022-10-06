<script>
import { RouterLink, RouterView } from "vue-router";
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TheCategories from './components/TheCategories.vue'

export default ({
    components: {
        RouterLink,
        RouterView,
        TheHeader,
        TheFooter,
        TheCategories,
    },
    setup() {
        
    },
})

</script>

<template>
  <TheHeader></TheHeader>
  <TheCategories></TheCategories>
  <RouterView />
  <TheFooter></TheFooter>
</template>

<style scoped>

</style>
