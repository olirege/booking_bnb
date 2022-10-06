<template>
    <div class="footer-wrapper">
        <span class="left-side-wrapper">
            <div class='copyrights'>
                <p>{{text.copyrights}}</p>
            </div>
            <nav class="details">
                <ul>
                    <span class="li-separator"> <BIconDot></BIconDot></span>
                    <li><a href="#">About</a></li>
                    <span class="li-separator"> <BIconDot></BIconDot></span>
                    <li><a href="#">Contact</a></li>
                    <span class="li-separator"> <BIconDot></BIconDot></span>
                    <li><a href="#">Privacy Policy</a></li>
                    <span class="li-separator"> <BIconDot></BIconDot></span>
                    <li><a href="#">Terms of Use</a></li>
                </ul>
            </nav>
        </span>
        <div class="options">
            <div class="option" id="language">
                <BIconGlobe></BIconGlobe>
                {{text.language}}
            </div>
            <div class="option" id="currencies">
                <BIconCurrencyDollar></BIconCurrencyDollar>
                {{text.currency}}
            </div>
            <div class="option" id="support">
                {{text.support}}
                <BIconChevronUp></BIconChevronUp>
            </div>
        </div>
        <div class="devices-icons">
            <span class="device-option">
                <BIconSearch></BIconSearch>
                <h5>{{text.search}}</h5>
            </span>
            <span class="device-option">
                <BIconHeart></BIconHeart>
                <h5>{{text.wish}}</h5>
            </span>
            <span class="device-option">
                <BIconPersonCircle></BIconPersonCircle>
                <h5>{{text.login}}</h5>
            </span>
        </div>
    </div>
</template>
<script>
import { BIconGlobe, BIconCurrencyDollar, BIconChevronUp, BIconDot, BIconSearch,BIconHeart,BIconPersonCircle } from 'bootstrap-icons-vue';
export default ({
    components: {
        BIconGlobe,
        BIconCurrencyDollar,
        BIconChevronUp,
        BIconDot,
        BIconSearch,
        BIconHeart,
        BIconPersonCircle
    },
    setup() {
        const text = {
            search: 'Search',
            wish: 'Wish',
            login: 'Login',
            language: 'English (CA)',
            currency: 'CAD',
            support:'Support',
            copyrights: '© 2021 All Rights Are Canned Preserved'
        }
        
        return{
            text
        }
        
    },
})
</script>
<style scoped>
.footer-wrapper{
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-background);
    height: 50px;
    width: calc(100% - 1.3em);
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid var(--color-border);
    z-index: 100;
    font-size: 0.8rem;
    padding: 0 4rem 0 4rem;
}
.footer-wrapper > *{
    display:none;
    visibility:hidden
}

.devices-icons{
    visibility: visible;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 1rem 0 1rem;
    gap:1rem;
}
.device-option{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
}
.device-option > svg{
    font-size:20px;
}

@media(min-width: 769px){
    .devices-icons{
        display:none;
        visibility:hidden
    }
    .left-side-wrapper{
        visibility:visible;
        display:block;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        gap: 5px;
    }
    .details{
        display:flex;
        justify-content: flex-start;
    }
    .details > ul{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: 0;
        width: 100%;
    }
    .details > ul > li{
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .details > ul > .li-separator{
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .details > ul > li > a{
        color: var(--color-text);
        text-decoration: none;
    }
    .options{
        visibility:visible;
        display:flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        width: 20rem;
        font-weight: bold;
        color:black;
    }
    .option{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 100%;
        min-width: 6rem;
        gap: 5px;
    }
}
@media(min-width:1024px){
    .left-side-wrapper{
        display:flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        gap: 5px;
    }

}
</style>
