<template>
    <div class="big-search-modal-wrapper">
        <div class="big-search-modal">
            <div class='big-search-modal-header'>
                <div class="big-search-modal-close-btn" @click ="$emit('close-big-search-modal')">
                    <BIconX></BIconX>
                </div>
                <div class="big-search-modal-tabs">
                    <div class="big-search-modal-tab">
                        <h2>{{text.stayTab}}</h2>
                    </div>
                    <div class="big-search-modal-tab">
                        <h2>{{text.experienceTab}}</h2>
                    </div>
                </div>
            </div>
            <div class="big-search-modal-content-container">
                <div class="big-search-modal-content" id="big-search-where" @click="collapsible">
                    <div class="big-search-modal-content-header-collapsed">
                        <h2>{{text.where.headerCollapsed}}</h2>
                        <p>{{text.where.search}}</p>
                    </div>
                    <div class="big-search-modal-content-header">
                        <h2>{{text.where.header}}</h2>
                    </div>
                    <div class="big-search-modal-content-body">
                        <div class="big-search-modal-search">
                            <BIconSearch />
                            <input :placeholder="text.where.searchPlaceHolder" />
                        </div>
                        <div class="region-component-wrapper">
                            <TheRegionComponent />
                        </div>
                    </div>
                </div>
                <div class="big-search-modal-content" id="big-search-when" @click="collapsible">
                    <div class="big-search-modal-content-header-collapsed">
                        <h2>{{text.when.headerCollapsed}}</h2>
                        <p>{{text.when.search}}</p>
                    </div>
                    <div class="big-search-modal-content-header">
                        <h2>{{text.when.header}}</h2>
                    </div>
                    <div class="big-search-modal-content-body">
                        <div class="calendar-component-wrapper">
                            <TheCalendarComponent />
                        </div>
                        <div class="big-search-modal-content-body-footer" id="big-search-when-body-footer">
                            <div class="skip-btn">
                                <h2>{{text.skip}}</h2>
                            </div>
                            <div class="next-btn-wrapper" @click ='whenOnNext'>
                            <div class='next-btn'>
                                <h2>{{text.next}}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="big-search-modal-content" id="big-search-who" @click="collapsible">
                    <div class="big-search-modal-content-header-collapsed">
                        <h2>{{text.who.headerCollapsed}}</h2>
                        <p>{{text.who.search}}</p>
                    </div>
                    <div class="big-search-modal-content-header">
                        <h2>{{text.who.header}}</h2>
                    </div>
                    <div class="big-search-modal-content-body">
                        <div class="guests-component-wrapper">
                            <TheGuestsComponent />
                        </div>
                    </div>
                </div>
            </div>
            <div class="big-search-modal-footer" id="big-search-footer">
                <div class="clear-btn">
                    <h2>{{text.clear}}</h2>
                </div>
                <div class="search-btn-wrapper">
                    <div class='search-btn'>
                        <BIconSearch />
                        <h2>{{text.search}}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {BIconSearch,BIconX} from 'bootstrap-icons-vue'
import TheRegionComponent from './TheRegionComponent.vue'
import TheCalendarComponent from './TheCalendarComponent.vue'
import TheGuestsComponent from './TheGuestsComponent.vue'
import {gsap} from 'gsap'
export default({
    emits:['close-big-search-modal'],
    components:{
        BIconSearch,
        BIconX,
        TheRegionComponent,
        TheCalendarComponent,
        TheGuestsComponent,

    },
    setup() {
        const TL = gsap.timeline({paused:true})
        const text = {
            stayTab: 'Stays',
            experienceTab: 'Experiences',
            where: {
                headerCollapsed: 'Where?',
                header: 'Where to?',
                searchPlaceHolder: 'Search Destinations',
                search: 'Im flexible'
            },
            when: {
                headerCollapsed: 'When?',
                header: "When's your trip?",
                search: 'Add dates',
            },
            who: {
                headerCollapsed: 'Who?',
                header: "Who's coming?",
                search: 'Add guests',
            },
            clear: 'Clear all',
            search: 'Search',
            skip: 'Skip all',
            next: 'Next',
        }
        const ids = ['big-search-where','big-search-when','big-search-who']
        const expanded = []
        
        function collapsible(e){
            let id = e.target.parentNode.id
            if (ids.includes(id) && !expanded.includes(id)){
                let content = document.getElementById(id)
                content.classList.add("big-search-modal-content-active")
                if (id == 'big-search-when'){
                    content.style.height = '100%'
                    content.style.display ='block'
                    let whoContent = document.getElementById('big-search-who')
                    whoContent.style.display = 'none'
                    document.getElementById("big-search-footer").style.display = 'none'
                } 
                if (id == 'big-search-who'){
                    content.style.height = '26rem'
                }
                content.querySelector('.big-search-modal-content-header-collapsed').style.display = 'none'
                content.querySelector('.big-search-modal-content-header').style.display = 'flex'
                content.querySelector('.big-search-modal-content-body').style.display = 'flex'
                if (expanded.length > 0){
                    let oldId = expanded[0]
                    if (oldId == 'big-search-when'){
                        document.getElementById(oldId).style.height = '4rem'
                        let whoContent = document.getElementById('big-search-who')
                        whoContent.style.display = 'block'
                        document.getElementById("big-search-footer").style.display = 'flex'
                    }
                    if (oldId == 'big-search-who'){
                        document.getElementById(oldId).style.height = '4rem'
                    }
                    let oldContent = document.getElementById(oldId)
                    oldContent.querySelector('.big-search-modal-content-header-collapsed').style.display = 'flex'
                    oldContent.querySelector('.big-search-modal-content-header').style.display = 'none'
                    oldContent.querySelector('.big-search-modal-content-body').style.display = 'none'
                    oldContent.classList.remove("big-search-modal-content-active")
                }
                expanded[0] = id
            }
        }
        function whenOnNext(){
            let whenContent = document.getElementById(expanded[0])
            whenContent.querySelector('.big-search-modal-content-header-collapsed').style.display = 'flex'
            whenContent.querySelector('.big-search-modal-content-header').style.display = 'none'
            whenContent.querySelector('.big-search-modal-content-body').style.display = 'none'
            whenContent.classList.remove("big-search-modal-content-active")
            whenContent.style.height = '4rem'
            
            let whoContent = document.getElementById('big-search-who')
            whoContent.style.display = 'block'
            document.getElementById("big-search-footer").style.display = 'flex'
            whoContent.style.height = '26rem'
            whoContent.querySelector('.big-search-modal-content-header-collapsed').style.display = 'none'
            whoContent.querySelector('.big-search-modal-content-header').style.display = 'flex'
            whoContent.querySelector('.big-search-modal-content-body').style.display = 'flex'
        }
        return {
            text,
            collapsible,
            whenOnNext
        }
    }
})
</script>
<style scoped>
.big-search-modal-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 300;
}
.big-search-modal{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:100%;
    background-color:var(--vt-c-white-mute);
    position:fixed;
    top:0;
    left:0;
    z-index:200;
}
.big-search-modal-header{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:10%;
    background-color:var(--vt-c-white-mute);
    border-bottom:1px solid var(--vt-c-border);
}
.big-search-modal-close-btn{
    display:flex;
    justify-content:center;
    align-items:center;
    width:45px;
    height:45px;
    padding: 10px;
    border-radius: 50%;
    cursor:pointer;
    margin-left: 2rem;
    border: 1px solid var(--vt-c-black);
    background-color: var(--vt-c-white);
    color: var(--vt-c-black);
    z-index:302
}
.big-search-modal-close-btn > svg{
    width: 1.5rem;
    height: 1.5rem;
}
.big-search-modal-tabs{
    display:flex;
    position: absolute;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
}
.big-search-modal-tab{
    display:flex;
    flex-direction: column;
    margin: 0 0.5rem 0 0.5rem;
    cursor: pointer;
}
.big-search-modal-tab::after{
    content: '';
    display: block;
    border-bottom: 2px solid var(--vt-c-black-mute);
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out
}
.big-search-modal-tab:hover:after{
    transform: scaleX(1);
}

.big-search-modal-tab > h2{
    font-size:1.1rem;
    font-weight:500;
}
.big-search-modal-tab > h2:hover{
    opacity:0.65;
}
.big-search-modal-content-container{
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:100%;
    padding: 1rem;
    gap:1rem;
}
.big-search-modal-content{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:4rem;
    border-radius:25px;
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
}
.big-search-modal-content-active{
    height:22rem
}

.big-search-modal-content-header-collapsed{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:100%;
    padding: 0 1rem;
}
.big-search-modal-content-header-collapsed > h2{
    font-size:1.1rem;
    font-weight:500;
    color: var(--vt-c-black-mute)
}
.big-search-modal-content-header{
    display:none;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:10%;
    padding: 0 1rem;
    margin: 1rem 0 1rem 0;
}
.big-search-modal-content-body{
    display:none;
    flex-direction:column;
    height:100%;
    width:100%;
    gap:1rem;
}
.big-search-modal-content-header > h2 {
    font-size:1.1rem;
    font-weight:600;
}
.big-search-modal-search{
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    width:calc(100% - 2rem);
    height:3.5rem;
    border:1px solid var(--vt-c-black);
    border-radius:10px;
    margin:0 1rem 0 1rem;
}
.big-search-modal-search > input{
    width:100%;
    height:70%;
    border:none;
    outline:none;
    font-size:1rem;
    font-weight:500;
    padding: 0 0 0 1rem;
}
.big-search-modal-search > svg{
    width:1.0rem;
    height:1.0rem;
    margin:0 1rem 0 1rem;
}
.big-search-modal-footer, .big-search-modal-content-body-footer{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    width:100%;
    height:5.5rem;
    background-color:var(--vt-c-white);
    border-top:1px solid var(--vt-c-border);
}
.clear-btn, .skip-btn{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    width:50%;
    height:100%;
    cursor:pointer;
    margin: 0 0 0 1rem;
}
.clear-btn > h2, .skip-btn > h2{
    font-size:1rem;
    font-weight:600;
    color:var(--vt-c-black-mute);
    text-decoration: underline;
}
.search-btn-wrapper, .next-btn-wrapper{
    display:flex;
    justify-content:flex-end;
    align-items:center;
    width:50%;
    height:3rem;
    cursor:pointer;
    margin: 0 1rem 0 0;
}
.search-btn, .next-btn{
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    width:10rem;
    height:100%;
    cursor:pointer;
    border-radius:25px;
    background-color:var(--vt-c-black);
    padding: 1rem;
}
.next-btn{
    width: 6rem;
    border-radius: 10px;
}
.search-btn > h2, .next-btn > h2{
    font-size:1.3rem;
    font-weight:600;
    color:var(--vt-c-white);
    margin: 0 0.5rem 0 0.5rem;
}
.search-btn > svg{
    width:1.5rem;
    height:1.5rem;
    color:var(--vt-c-white);
}
.region-component-wrapper{
    display:flex;
    align-items:center;
    width:100%;
    overflow-x:scroll;
}
.calendar-component-wrapper{
    display:flex;
    align-items:center;
    width:100%;
}
.guests-component-wrapper{
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    padding: 0 1rem;
}
</style>