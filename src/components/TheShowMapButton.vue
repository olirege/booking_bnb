<template>
    <div class="show-map-button-wrapper">
        <h1 class="show-map-button-text">{{text}}</h1>
        <BIconMapFill></BIconMapFill>
    </div>
</template>
<script>
import {BIconMapFill} from 'bootstrap-icons-vue'
export default ({
    components:{
        BIconMapFill,
    },
    setup() {
        const text = 'Show Map'
        return {
            text,
        }
    },
})
</script>
<style scoped>
    .show-map-button-wrapper{
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
        background-color: #ccc;
        border-radius: 25px;
        z-index: 100;
    }
    .show-map-button-text{
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-heading);
    }
</style>
