<template>
    <div class="guests-modal-container" @focusout="$emit('close-guests-modal')" tabindex="0" id="guests-modal-container">
        <div class="guests-wrapper" v-for="(guest,index) of text.guests" :key="index">
            <div class="guests-card">
                <h2 class="guest-type">{{guest.type}}</h2>
                <h3 class="guest-age">{{guest.age}}</h3>
            </div>
            <div class="counter">
                <div class="counter-btn" :class="{'counter-btn-disabled':counters[guest.type] == 0}" @click="decrement">
                    <BIconDashCircle></BIconDashCircle>
                </div>
                <h2 class="counter-value">{{counters[guest.type]}}</h2>
                <div class="counter-btn" @click="increment">
                    <BIconPlusCircle></BIconPlusCircle>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {reactive,onMounted} from 'vue'
import { BIconDashCircle, BIconPlusCircle } from 'bootstrap-icons-vue'
export default ({
    emits:['close-guests-modal'],
    components: {
        BIconDashCircle,
        BIconPlusCircle
    },
    setup() {
        const counters = reactive({
            'Adults': 0,
            "Children": 0,
            "Infants": 0,
            "Pets": 0,
        }) 
        const text = {
            guests:[{
                type:'Adults',
                age:'Ages 13 or above'
            },
            {
                type:'Children',
                age:'Ages 2-12'
            },
            {
                type:'Infants',
                age:'Under 2'
            },{
                type:'Pets',
                age:'Bringing a service animal?'
            }],
        }
        function increment(type) {
            counters[type] += 1
            console.log(counters)
        }
        function decrement() {
            counters[type] -= 1
        }
        onMounted(() => {
            document.getElementById('guests-modal-container').focus()
        })
        return {
            text,
            counters,
            increment,
            decrement
        }
    },
})
</script>
<style scoped>
.guests-modal-container {
    position:absolute;
    display:flex;
    flex-direction:column;
    top:5rem;
    right:0;
    width: 25rem;
    height: 25rem;
    background-color: #fff;
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 5px 10px 5px 2px rgba(0,0,0,0.1);
    border: 1px solid var(--color-border);
    z-index:160;
}
.guests-modal-container:focus{
    outline: none;
}
.guests-wrapper {
    display: flex;
    flex-wrap: wrap;
    height:5rem;
    width:100%;
    border-bottom: 1px solid var(--color-border);
}
.guests-card {
    width: 70%;
    height: 5rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.guest-type {
    font-size: 16px;
    font-weight: 600;
}
.guest-age {
    font-size: 14px;
    color: var(--color-gray);
}
.counter {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
.counter-btn {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.8rem;
    background-color: var(--color-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.counter-btn:hover{
    color: var(--vt-color-black-mute);
}
.counter-btn-disabled {
    color: var(--color-border);
    cursor: not-allowed;
}
.counter-value {
    font-size: 20px;
    font-weight: 600;
    margin: 1rem 0;
}
</style>
