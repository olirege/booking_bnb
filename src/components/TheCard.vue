<template>
    <div class="card-wrapper">
        <div class="card-image">
            <div class="card-image-controls">
                <div class="card-image-prev" :id="'prev_' + listingData.id"><BIconChevronLeft></BIconChevronLeft></div>
                <div class="card-image-next" :id="'next_' + listingData.id"><BIconChevronRight></BIconChevronRight></div>
            </div>
            <BIconHeart class="card-image-like-btn"></BIconHeart>
            <!-- <div class="image"><img :src="`/images/${img}`"/></div> -->
            <div class="image"><img v-for="(image,index) of images" :key="'card-img_' + index" :src="image" :id="'card-img_' + listingData.id"/></div>
            <div  class='images-index' v-if="images">
                <BIconCircleFill v-for="(image,index) of images" :key=index :class="{'image-index-selected': index == selectedSlideIndex ? true : false, 'image-index': index != selectedSlideIndex ? true : false }"></BIconCircleFill>
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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { ref as vueRef, onMounted } from 'vue'
import {gsap} from 'gsap'
export default ({
    props: ['listingData'],
    components: {
        BIconStarFill,
        BIconHeart,
        BIconChevronLeft,
        BIconChevronRight,
        BIconCircleFill,
    },
    
    setup(props) {
        const night = 'night'
        const images = vueRef([])
        const selectedSlideIndex = vueRef(0)
        async function getImages() {
            const storage = getStorage();
            for (let i = 0; i < props.listingData.imgs.length; i++) {
                const imgRef = ref(storage, props.listingData.imgs[i]);
                const url = await getDownloadURL(imgRef);
                images.value.push(url);
            }
        }
        onMounted(() => {
            getImages().then(() =>{
                return gsap.utils.toArray("#card-img_"+ props.listingData.id)
            }).then( (slides) =>{
                var slideDelay = 1.5;
                var slideDuration = 0.3;
                var snapX;
                var prevButton = document.querySelector("#prev_" + props.listingData.id);
                var nextButton = document.querySelector("#next_" + props.listingData.id);
                var progressWrap = gsap.utils.wrap(0, 1);
                 
                var numSlides = slides.length;
                if (numSlides > 1){
                    gsap.set(slides, {
                    xPercent: i => i * 100
                    });

                    var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
                    var timer = gsap.delayedCall(slideDelay);

                    var animation = gsap.to(slides, {
                    xPercent: "+=" + (numSlides * 100),
                    duration: 1,
                    ease: "none",
                    paused: true,
                    repeat: -1,
                    modifiers: {
                        xPercent: wrap
                    }
                    });

                    var proxy = document.createElement("div");
                    var slideAnimation = gsap.to({}, {});
                    var slideWidth = 0;
                    var wrapWidth = 0;
                    resize();

                    window.addEventListener("resize", resize);

                    prevButton.addEventListener("click", function() {
                    animateSlides(1);
                    });

                    nextButton.addEventListener("click", function() {
                    animateSlides(-1);
                    });
                }
                function animateSlides(direction) {
                    timer.restart(true);
                    slideAnimation.kill();
                    
                    var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
                    slideAnimation = gsap.to(proxy, {
                        x: x,
                        duration: slideDuration,
                        onUpdate: updateProgress
                    });
                    if(selectedSlideIndex.value < slides.length - 1){
                        selectedSlideIndex.value -= direction
                    }else{
                        selectedSlideIndex.value = 0
                    }
                }

                function updateProgress() { 
                    animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
                }
                function resize() {
                    var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
                    slideWidth = slides[0].offsetWidth;
                    wrapWidth = slideWidth * numSlides;
                    snapX = gsap.utils.snap(slideWidth);
                    gsap.set(proxy, {
                        x: norm * wrapWidth
                    });
                    animateSlides(0);
                    slideAnimation.progress(1);
                }
            })
        })
        return { night,images,selectedSlideIndex }
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
        cursor: pointer;
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
        overflow:hidden;
        border-radius: 10px;
    }
    .card-image > .image{
        display:flex;
        flex-direction: row;
        width:100%;
        height:100%;
    }
    .card-image > .image > img{
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
        gap:2px;
    }
    .image-index-selected{
        color: var(--color-background);
        font-size: 0.5em;
    }
    .image-index{
        color: #ccc;
        font-size: 0.3em;
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