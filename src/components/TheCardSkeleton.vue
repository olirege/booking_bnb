<template>
    <div class="card-wrapper">
        <div class="card-image">
            <div class='image'></div>
        </div>
        <div class="card-content">
            <div class="card-content-title">
                <div class="title"></div>
                <div class="rating"></div>
            </div>
            <div class="distance"></div>
            <div class="date"></div>
            <div class="price"></div>
        </div>
    </div>
</template>
<script>
import {gsap} from 'gsap'
export default ({
    setup() {
        
        return { }
    },
})
</script>

<style scoped>
    .card-wrapper{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        min-width: 15rem;
        min-height: 22rem;
        max-height: 25rem;
        border-radius: 10px;
    }
    .card-image{
        position: relative;
        padding: 0.5rem;
        width: 100%;
        height: 70%;
    }
    .card-image > .image{
        border-radius: 10px;
        animation: pulse-bg 5s infinite;
        display:flex;
        flex-direction: row;
        width:100%;
        height:100%;
    }
    .card-content{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 30%;
        padding: 0 0.5rem 0 0.5rem;
        background-color: var(--color-background);
        gap:2px;
    }
    .card-content > *{
        margin:0;
        padding:0;
    }
    .card-content > .card-content-title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width:100%;
        height: 1rem;

    }

    .card-content > .card-content-title > .title{
        width: 70%;
        animation: pulse-bg 5s infinite;
        border-radius: 5px;
        height: 100%;
    }
    .card-content > .card-content-title > .rating{
        width: 7%;
        animation: pulse-bg 5s infinite;
        border-radius: 5px;
        height: 100%;
    }
    .price, .distance, .date{
        height: 1rem;
        animation: pulse-bg 5s infinite;
        border-radius: 5px;

    }
    .price{
        width: 30%;
    }
    .distance{
        width: 20%;
    }
    .date{
        width: 20%;
    }
    
    @keyframes pulse-bg{
        0%{
            background-color: #ccc;
        }
        50%{
            background-color: #aaa;
        }
        100%{
            background-color: #ccc;
        }
    }
</style>