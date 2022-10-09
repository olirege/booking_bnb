<template>
    <div class="categories-wrapper">
        <div class="categories-prev" id="categories-btn"> <BIconChevronLeft/> </div>
        <div class="categories-content" >
            <CategoryCard v-for="(card, index) of 18" :key="index">
                <template #img>
                    <BIconHospital />
                </template>
                <template #title>
                    longtext4
                </template>
            </CategoryCard>
            <!-- <CategoryCardSkeleton v-for='(listing,index) of 18' :key="index"></CategoryCardSkeleton> -->
            <div class = "fade" id="fade-left"></div>
            <div class = "fade" id="fade-right"></div>
        </div>
        <div class="categories-next" id="categories-btn"><BIconChevronRight/></div>
        <div class="categories-filter" id="categories-btn"><BIconSliders/><h4>{{text.filter}}</h4></div>
    </div>
</template>
<script>
import { 
    BIconHospital,
    BIconChevronRight,
    BIconChevronLeft,
    BIconSliders } from 'bootstrap-icons-vue'
import CategoryCard from './CategoryCard.vue'
import CategoryCardSkeleton from './CategoryCardSkeleton.vue'
import horizontalLoop from '../utils/helpers' 
import {onMounted} from 'vue' 
import {gsap} from "gsap"
export default ({
    components: {
        CategoryCard,
        CategoryCardSkeleton,
        BIconHospital,
        BIconChevronRight,
        BIconChevronLeft,
        BIconSliders,
    },
    setup() {
        const text={
            filter: 'Filter'
        }
        onMounted( () => {
            const cards = gsap.utils.toArray(".category-card-wrapper")
            let activeElement;
            const loop = horizontalLoop(cards, {
            paused: true, 
            draggable: true,
            center: true,
            onChange: (element, index) => {
                activeElement && activeElement.classList.remove("active");
                element.classList.add("active");
                activeElement = element;
            }
            });
            cards.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 1, ease: "power1.inOut"})));
            document.querySelector(".categories-next").addEventListener("click", () => loop.next({duration: 1, ease: "power1.inOut"}));
            document.querySelector(".categories-prev").addEventListener("click", () => loop.previous({duration: 1, ease: "power1.inOut"}));
        })

        return { text }
    },
})
</script>
<style scoped>

 .categories-wrapper{
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 3px -3px rgba(0,0,0,0.2);
    background-color: var(--color-background);
    height: 72px;
    width: calc( 100% - 1.15em);
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 100;
    gap: 5px;
    overflow:hidden;
 }
 #categories-btn{
    display:none;
    visibility: hidden;
 }
 .categories-next, .categories-prev{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 32px;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid var(--color-border-darker);
 }
 .categories-next > *, .categories-prev > *{
    width:10px;
    height:10px
 }
 
 .categories-content{
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: center;
    gap:2rem;
    width:100%;
    height:72px;
    padding: 0 1rem 0 1rem;
    overflow:hidden;
 }

.categories-filter {
    display: none;
    visibility: hidden;
}
.fade {
    position: absolute;

    display: block;
  
    width: 2%;
    height: 100px;
}
#fade-right{
    right: 0px;
    background-image: linear-gradient(to right, 
        rgba(255, 255, 255, 0), 
        rgba(255, 255, 255, 1)
    100%);
}
#fade-left{
    left: 0px;
    background-image: linear-gradient(to left, 
        rgba(255, 255, 255, 0), 
        rgba(255, 255, 255, 1)
    100%);
}
@media (min-width: 768px) {
    .categories-wrapper{
        padding: 0 calc(2rem + 1em) 0 4rem;
        box-shadow: 0 0 0 0;
        height: 100px;
        width: calc( 100% - 1.06em);
    }
    .categories-content{
        height:100px;
    }
    .categories-filter{
        visibility: visible;
        height: 45px;
        border-radius: 10px;
        gap:5px;
        padding: 0 0.5em 0 0.5em;
        border: 1px solid var(--color-border);
        align-items: center;
        flex-direction:row;
    }
    #categories-btn{
        display:flex;
        visibility: visible;
        background-color: var(--color-background);
        z-index: 100;
        cursor: pointer;

    }
}
</style>
