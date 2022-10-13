<template>
    <div class="region-modal-container" @focusout="$emit('close-region-modal')" tabindex="0" id="region-modal-container">
        <h1 class="modal-title">{{text.title}}</h1>
        <div class="regions-wrapper">
            <div class="region-card" v-for="(region,index) of text.regions" :key="index">
                <img src='' class="region-image"/>
                <h3 class="region-name">{{region}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted } from "vue"

export default ({
    emits:['close-region-modal'],
    setup() {
        const text = {
            regions: ["I'm flexible", 'Europe','United States','Caribeean','France','South America'],
            title: 'Search by region',
        }
        onMounted(()=>
            document.getElementById('region-modal-container').focus()
        )
        return {
            text,
        }
    },
})
</script>
<style scoped>
.backdrop{
    position: fixed;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    z-index: 140;
}
.region-modal-container {
    position:absolute;
    display:flex;
    flex-direction:column;
    top:5rem;
    left:0;
    width: 30rem;
    height: 30rem;
    background-color: #fff;
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 5px 10px 5px 2px rgba(0,0,0,0.1);
    border: 1px solid var(--color-border);
    z-index:150;
}
.region-modal-container:focus{
    outline: none;
}
.modal-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
}
.regions-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
}
.region-card {
    width: 30%;
    height: 10rem;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.region-image {
    width: 125px;
    height: 125px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: #ccc;
    border: 1px solid var(--color-border);
    cursor: pointer;

}
.region-image:hover{
    border: 1px solid var(--color-border-hover);
}
.region-name {
    font-size: 14px;
    font-weight: 600;
}
</style>
