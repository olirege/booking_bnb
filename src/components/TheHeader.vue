<template>
    <div class="header-wrapper">
        <div class="header-logo">
            <span class="logo-wrapper">
                <img class="logo" src="../assets/logo.svg" alt="logo">
                <h1>{{text.logo}}</h1>
            </span>
        </div>
        <div class="header-search" @click="activateSearchBar">
            <TheSearchBar  @close-big-search-bar="closeBigSearchBar"/>
            <Teleport to='body'>
                <Transition name="slide-up" appear>
                    <TheBigSearchModal v-if="showBigSearchModalState" @close-big-search-modal="closeBigSearchModal"></TheBigSearchModal>
                </Transition>
            </Teleport>
        </div>
        <div class="options">
            <div class="option" id="host">
                <h4>{{text.host}}</h4>
                <div class="globe-wrapper"><BIconGlobe></BIconGlobe></div>
            </div>
            <div class="user-button-wrapper" @click='toggleLoginTabMenu'>
                <BIconList></BIconList>
                <BIconPersonCircle v-if ='!user || user.isAnonymous'></BIconPersonCircle>
                <BIconPersonCheckFill v-if ='user && !user.isAnonymous && !user.photoURL'></BIconPersonCheckFill>
                <img :src="user.photoURL" v-if ='user && !user.isAnonymous && user.photoURL' class="user-photo" />
            </div>    
        </div>
    </div>
    <LoginTabMenu v-if="showLoginTabMenu" @close-login-menu='toggleLoginTabMenu'></LoginTabMenu>
</template>
<script>
import TheSearchBar from './TheSearchBar.vue'
import LoginTabMenu from './LoginTabMenu.vue'
import TheBigSearchModal from "./TheBigSearchModal.vue";
import { BIconGlobe,BIconList,BIconPersonCircle,BIconPersonCheckFill } from 'bootstrap-icons-vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { ref,computed } from 'vue'
import {gsap} from 'gsap'
export default ({
    components: {
        TheSearchBar,
        BIconGlobe,
        BIconList,
        BIconPersonCircle,
        BIconPersonCheckFill,
        LoginTabMenu,
        TheBigSearchModal,
    },
    setup() {        
        const store = useStore()
        const router = useRouter()
        const user = computed(() => store.getters.getUser)
        const text = {
                    logo:'fartbnb',
                    host:'Become a host',
                    }
        const showLoginTabMenu = ref(false)
        function toggleLoginTabMenu(state){
            console.log('toggleLoginTabMenu')
            showLoginTabMenu.value = state
        }
        const showBigSearchModalState = ref(false)
        function activateSearchBar(){
            let mm = gsap.matchMedia()
            let searchBarTL = gsap.timeline()
            mm.add(
            {
            isMonitor: "(min-width: 770px) and (min-height: 800px)",
            isLaptop: "(min-width: 770px) and (min-height: 599px) and (max-height: 799px)",
            isTablet: "(max-width: 769px)",
            },
            (context) => {
                let { isTablet,isMonitor, isLaptop } = context.conditions;
                if (isMonitor || isLaptop){
                    if(showBigSearchModalState.value){
                        showBigSearchModalState.value = false
                    }
                    searchBarTL.to('.header-wrapper',{
                        height: 200,
                        duration: 0.5,
                        ease: 'power2.out'
                    })
                    searchBarTL.to('.big-search-bar-container-wrapper',{
                        display:'flex',
                        visibility:'visible',
                        y:100,
                        duration:0.1,
                        ease:'power4.outIn'
                    })
                    // searchBarTL.to('.search-bar-wrapper',{
                    //     scale:1.2,
                    //     duration:0.4,
                    //     ease:'power4.out'
                    // },'<')
                    searchBarTL.to('.search-bar-wrapper',{
                        opacity:0,
                        display:'none',
                        visibility:'hidden',
                        duration:0.1,
                    })
                    searchBarTL.to('.big-search-bar-wrapper',{
                        display:'flex',
                        visibility:'visible',
                    },'<')
                    searchBarTL.to('.search-options',{
                        display:'flex',
                        visibility:'visible',
                    },'<')
                }else if(isTablet){
                    showBigSearchModalState.value = true
                }
            })
        }
        function closeBigSearchBar(){
        }
        function closeBigSearchModal(){
            showBigSearchModalState.value = false
        }
        return {
            text,
            showLoginTabMenu,
            toggleLoginTabMenu,
            user,
            activateSearchBar,
            showBigSearchModalState,
            closeBigSearchModal,
            closeBigSearchBar,
        }
    },
})
</script>
<style scoped>

 .header-wrapper{
    display:flex;
    justify-content: space-between;
    flex-direction:row;
    align-content: center;
    width: calc( 100% - 1.15em);
    background-color: var(--color-background);
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 150;
 }
 .header-search{
    display:flex;
    flex: 0 1 auto;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    margin: 0 2rem 0 2rem;
    transition: justify-content 0.5s ease-in-out;
 }

.header-logo{
    flex: 1 0 50px;
    visibility:hidden;
    display:none
}
.options{
    display:none;
    visibility:hidden;
    z-index:152;
}
.user-photo{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-left: 0.5rem;
}
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}
@media(min-width: 879px){
    
    .header-wrapper{
        border-bottom: 1px solid var(--color-border);
        width: calc( 100% - 1.06em);

    }
    .header-search{
        justify-content: flex-start;
        margin:0;
    }
    .header-logo{
        visibility:visible;
        display:flex;
        flex-direction: row;
        align-items: center;
        height:100px;
        margin-left: 4rem;
    }
    .logo-wrapper{
        display:flex;
        flex-direction: row;
        align-items: center;
        height:36px;
        gap: 10px;
    }
    .logo-wrapper > h1{
        visibility: hidden;
        display:none;
    }
    .logo{
        height: 100%;
    }
    .options{
        visibility:visible;
        display:flex;
        flex-direction: row;
        align-items: center;
        margin-right: 3rem;
        height:100px;
    }
    .option{
        display:flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        margin-right: 1rem;
        white-space:nowrap;
        font-weight: 600;
    }
    .option > h4{
        height:50px;
        border-radius: 25px;
        padding:10px;
        color:black;
        width:100%;
        text-align:center;
    }
    
    .option > .globe-wrapper{
        height:50px;
        display:flex;
        justify-content: center;
        align-items: center;
        width:60px;
        border-radius:50%;
        padding:10px;
    }
    .option > *:hover{
        background-color: #e6e5e5;
    }
    .user-button-wrapper{
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        gap: 5px;
        height:45px;
        border-radius: 10px;
        width: 100px;
        border: 1px solid var(--color-border);
        transition: all 0.2s ease-in-out;
        padding: 10px;
    }
    .user-button-wrapper:hover{
        box-shadow: 2px 2px 5px 3px var(--color-border);
    }

    .user-button-wrapper > *{
        height: 100%;
        width: 100%;
    }
 }

 @media(min-width:1024px){
    .header-search{
        justify-content:center;
    }
    .logo-wrapper > h1{
        visibility: visible;
        display:block;
        font-size: 24px;
    }
 }
</style>
