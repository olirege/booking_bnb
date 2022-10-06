<template>
    <div class="card-wrapper">
        <div class="card-image">
            <div class="card-image-controls">
                <div class="card-image-prev"><BIconChevronLeft></BIconChevronLeft></div>
                <div class="card-image-next"><BIconChevronRight></BIconChevronRight></div>
            </div>
            <BIconHeart class="card-image-like-btn"></BIconHeart>
            <div class="image"><img :src="`/images/${img}`"/></div>
            <div class="images-index">
                <BIconCircleFill></BIconCircleFill>
                <BIconCircleFill></BIconCircleFill>
                <BIconCircleFill></BIconCircleFill>
                <BIconCircleFill></BIconCircleFill>
            </div>
        </div>
        <div class="card-content">
            <div class="card-content-title"><h1><slot name="title"></slot></h1>
                <div class="rating">
                    <BIconStarFill></BIconStarFill>
                    <p><slot name='rating'></slot></p>
                </div>
            </div>
            <p><slot name='distance'></slot></p>
            <p><slot name='date-range'></slot></p>
            <div class ='price-wrapper'><h1 class="price"><slot name="price"></slot></h1><h1>{{night}}</h1></div>
        </div>
    </div>
</template>
<script>
import { 
    BIconStarFill,
    BIconHeart,
    BIconChevronLeft,
    BIconChevronRight,
    BIconCircleFill
} from 'bootstrap-icons-vue'

export default ({
    props: ['img'],
    components: {
        BIconStarFill,
        BIconHeart,
        BIconChevronLeft,
        BIconChevronRight,
        BIconCircleFill,
    },
    setup() {
        const night = 'night'
        return { night }
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
        border-radius: 10px;
    }
    .card-image{
        position: relative;
        width: 100%;
        height: 70%;
        background-color: var(--color-background);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
    .card-image > .image{
        width:100%;
        height:100%;
    }
    .card-image > .image > img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;

    }
    .card-image > .card-image-like-btn{
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        margin: 10px;
        color: var(--color-background);
        z-index:100;
        cursor: pointer;
    }
    .card-image > .card-image-like-btn:hover{
        scale:1.1;
    }
    .card-image-controls{
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 20px);
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        transition: all 0.3s ease-in-out;
        margin: 0 10px 0 10px;
        z-index: 100;
    }
    .card-image:hover > .card-image-controls{
        opacity: 1;
    }

    .card-image-prev, .card-image-next{
        display:flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        width: 32px;
        padding: 8px;
        border-radius: 50%;
        border: 1px solid var(--color-border-darker);
        background-color: var(--color-background);
        cursor: pointer;

    }
    .card-image-prev > *, .card-image-next > *{
        width: 12px;
        height: 12px;
        color: black;
    }
    .card-image > .images-index{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;
        z-index: 100;
        font-size: 0.5em;
        gap:2px;
        color: var(--color-background);
        cursor: pointer;
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
    }
    .card-content > *{
        margin:0;
        padding:0;
    }
    .card-content > .card-content-title > h1{
        margin:0;
        font-size: 1.0rem;
        font-weight: 600;
        margin: 0;
    }
    .card-content > .card-content-title > .rating{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
    }
    .card-content-title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        width:100%;
    }
    .card-content > p{
        font-size: 0.8rem;
        font-weight: 400;
    }
    .price-wrapper{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
        width: 100%;
    }
    .card-content > .price-wrapper > .price{
        font-size: 1.0rem;
        font-weight: 600;
    }
    .card-content > .price-wrapper > h1{
        font-size: 0.8rem;
        font-weight: 400;
    }
    
</style>