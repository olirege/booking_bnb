<template>
    <main class="content-wrapper">
        <div v-if='listings' class="cards-wrapper">
            <TheCard v-for ='listing of listings' :key="listing.id" :listingData="{id:listing.id, imgs:listing.image}">
                <template #title>{{listing.title}}</template>
                <template #rating>{{listing.rating}}</template>
                <template #price>{{formatToCurrency(listing.pricePerNight)}}</template>
            </TheCard>
        </div>
        <div v-else class="cards-wrapper">
            <TheCardSkeleton v-for='(listing,index) of 9' :key="index"></TheCardSkeleton>
        </div>
    </main>
</template>
<script>
import TheCard from '../components/TheCard.vue';
import TheCardSkeleton from '../components/TheCardSkeleton.vue';
import { BIconImage }from 'bootstrap-icons-vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default({
    components: {
        TheCard,
        BIconImage,
        TheCardSkeleton,
    },
    setup() {
        const currentCurrency = 'USD';
        const store = useStore()

        const listings = computed(() => store.getters.getListings)
        function formatToCurrency(value) {
            return Intl.NumberFormat('en-US', { style: 'currency', currency: currentCurrency }).format(value);
        }
        return {
            formatToCurrency,
            currentCurrency,
            listings,
        }
    }

})
</script>
<style scoped>
    .content-wrapper{
        display:flex;
        justify-content: center;
        height: 100%;
        top: 200px;
        left: 0;
        z-index: 1;
        margin: 0 calc(4rem - 1em) 0 4rem;
        
    }
    .cards-wrapper{
        display:grid;
        grid-template-columns: repeat(var(--breakpoint-grid_columns,1), minmax(0,1fr));
        grid-auto-rows: minmax(min-content, max-content);
        grid-auto-flow:dense;
        gap:var(--breakpoint-grid_row-gap,0) var(--breakpoint-grid_column-gap,0);
        flex-wrap: wrap;
        height: 100%;
        width: 100%;
        z-index: 1;
    }
</style>
