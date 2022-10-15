<template>
    <div class="regions-wrapper">
        <div class="region-card" v-for="(region,index) of text.regions" :key="index">
            <img src='' class="region-image"/>
            <h3 class="region-name">{{region}}</h3>
        </div>
    </div>
</template>
<script>
export default ({
    setup() {
        const text = {
            regions: ["I'm flexible", 'Europe','United States','Caribeean','France','South America'],
        }
        return {
            text,
        }
    },
})
</script>
<style scoped>
.regions-wrapper {
    display: flex;
    flex-direction: row;
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
    margin-left: 1rem;
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

