<template>
    <div class="search-bar-wrapper">
        <div class="btn-wrapper" id="filter"><BIconSliders></BIconSliders></div>
        <div class="place-holder-wrapper">
            <h1 class="mobile-wrapper">Where to?</h1>
            <div class="place-holder">
                <h2>{{text.place}}</h2>
                <span class='separator'></span>
                <h2>{{text.date}}</h2>
                <span class='separator'></span>
                <h2>{{text.guests}}</h2>
            </div>
        </div>
        <div class="btn-wrapper" id="search"><BIconSearch></BIconSearch></div>

    </div>
</template>
<script>
import { BIconSearch,BIconSliders } from 'bootstrap-icons-vue';
export default ({
    components: {
        BIconSearch,
        BIconSliders
    },
    setup() {
        const text = {'place': 'Anywhere',
                      'date': 'Any week',
                      'guests': 'Add guests',
        }       
        return{
            text
        }    
    },
})
</script>
<style scoped>
    .search-bar-wrapper{
        display:flex;
        background-color: var(--color-background);
        flex-direction: row-reverse;
        align-items:center;
        height: 50px;
        width: 100%;
        z-index: 100;
        border: 1px solid var(--color-border);
        border-radius: 25px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    }
    .search-bar-wrapper:hover{
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    }
    .place-holder-wrapper{
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 100%;
    }
    .mobile-wrapper{
        display:flex;
        font-size: 1em;
        justify-content:flex-start;
        padding: 0 1rem;
        margin-left: 1rem;
        color: black;
    }

    .place-holder-wrapper > .place-holder{
        display:flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: 0 1rem 0 1rem;
    }
    .place-holder-wrapper > .place-holder > h2{
        font-size: 0.7rem;
        padding: 0 1rem 0 1rem;
        font-weight: 400;
        color: var(--color-text);
        cursor: pointer;
    }
    .separator{
        height: 1.3rem;
        width: 1px;
        background-color: var(--color-border);
    }
    .btn-wrapper{
        display:flex;
        align-items: center;
        justify-content: center;
        padding:10px;
        min-height: 32px;
        min-width: 32px;
        border-radius: 50%;
        margin-right: 8px;
        color:var(--color-background);
        cursor: pointer;
    }
    .btn-wrapper > *{
        height: 15px;
        width: 15px;
    }
    #filter{
        display:flex;
        visibility:visible;
        background-color: var(--color-background);
        color:black;
        border: 1px solid var(--color-border);
    }

    #search{
        margin-right: 0;
        margin-left: 8px;
        background-color:var(--color-background);
        color:black;
    }
@media(max-width:347px){
    .place-holder-wrapper > .place-holder > h2{
        font-size: 0.5rem;
        padding: 0 0.3rem 0 0.3rem;
    }
    .place-holder-wrapper > .place-holder{
        font-size: 0.5rem;
        padding: 0;
    }
}
@media(min-width:348px) and (max-width: 455px){
    .place-holder-wrapper > .place-holder > h2{
        font-size: 0.6rem;
        padding: 0 0.5rem 0 0.5rem;
    }
    .place-holder-wrapper > .place-holder{
        font-size: 0.6rem;
        padding: 0;
    }
}
@media(min-width: 768px){
    .search-bar-wrapper{
        width: 25rem;
        margin: 0;
        flex-direction: row;
    }
    #filter{
        display:none;
        visibility:hidden;
    }
    #search{
        margin-right: 8px;
        margin-left: 0;
        background-color: var(--color-logo);
    }
    .btn-wrapper > *{
        height: 11px;
        width: 11px;
    }
    .mobile-wrapper{
        display:none;
        visibility:hidden;
    }
    .place-holder-wrapper > .place-holder{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: 0 1rem 0 1rem;
    }
    .place-holder-wrapper > .place-holder > h2{
        font-size: 1rem;
        padding: 0 1rem 0 1rem;
        font-weight: 400;
        color: var(--color-text);
    }
}
</style>
