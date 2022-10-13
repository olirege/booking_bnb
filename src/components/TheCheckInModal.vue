<template>
    <div class="checkin-modal-container" @focusout="$emit('close-checkin-modal')" tabindex="0" id="checkin-modal-container">
        <div class="checkin-header">
            <div class="options-wrapper">
                <div class="option" @click="activateOption" id="default-option"><h2>{{text.chooseDates}}</h2></div>
                <div class="option" @click="activateOption"><h2>{{text.flexible}}</h2></div>
            </div>
        </div>
        <div class="wrapper" @click="onDateSelected" v-show="optionName === text.chooseDates">
            <div class="month-left-wrapper">
                <div class="month-header">
                    <div class="previous-month-btn">
                        <BIconChevronLeft @click="previousMonth"></BIconChevronLeft>
                        <h2 class="month-name">{{text.months[currentMonth]}} {{currentYear}}</h2>    
                    </div>
                </div>
                <div class="calendar">
                    <div class="calendar-header">
                        <div class="week-day" v-for="(day,index) of text.days" :key="index">
                            <h2>{{day}}</h2>
                        </div>
                    </div>
                    <div class="calendar-body" :id="currentMonth + '_' + currentYear">
                        <h2 class="day" v-for="(day,index) of days " :key="index" :class="{'day-in-range':isDateInSelectedRange(day,currentMonth,currentYear)}">
                            {{day}}
                        </h2>
                    </div>
                </div>
            </div>
            <div class="month-right-wrapper">
                <div class="month-header">
                    <div class="next-month-btn">
                        <h2 class="month-name">{{text.months[nextMonthValue]}} {{nextYearValue}}</h2>
                        <BIconChevronRight @click="nextMonth"></BIconChevronRight>
                    </div>
                </div>
                <div class="calendar">
                    <div class="calendar-header">
                        <div class="week-day" v-for="(day,index) of text.days" :key="index">
                            <h2>{{day}}</h2>
                        </div>
                    </div>
                    <div class="calendar-body" :id="nextMonthValue + '_' + nextYearValue">
                        <h2 class="day" v-for="(day,index) of daysOfNextMonth" :key="index" :class="{'day-in-range':isDateInSelectedRange(day,nextMonthValue,nextYearValue)}">
                            {{day}}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="flexible-wrapper" v-show="optionName === text.flexible">
            <div class="flexible-header">
                <h2>{{text.flexibleHeaderLength}}</h2>
            </div>
            <div class="flexible-body">
                <div class='flexible-option-length-wrapper'>
                    <div class="flexible-option-length" v-for="(option,index) of text.flexibleLengthOptions" :key="index" @click="activateFlexOption">
                        <h2>{{option}}</h2>
                    </div>
                </div>
            </div>
            <div class="flexible-header">
                <h2>{{text.flexibleHeaderMonthYear}}</h2>
            </div>
            <div class="flexible-body">
                <div class="flexible-body-prev-btn">
                    <BIconChevronLeft></BIconChevronLeft>
                </div>
                <div class="flexible-body-month-year-wrapper">
                    <div class="flexible-option-month-year" v-for="(option,index) of MonthsAndYearForNext2Years()" :key="index" @click="activateFlexMonthOption">
                        <h2>{{option[0]}}</h2>
                        <BIconCalendar></BIconCalendar>
                        <h2>{{option[1]}}</h2>
                    </div>
                </div>
                <div class="flexible-body-next-btn">
                    <BIconChevronRight></BIconChevronRight>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { BIconChevronLeft, BIconChevronRight,BIconCalendar } from 'bootstrap-icons-vue'
import {ref,onMounted} from 'vue'
import {useStore} from 'vuex'
import horizontalLoop from '../utils/helpers'
import {gsap} from 'gsap' 
export default ({
    emits:['close-checkin-modal'],
    components: {
        BIconChevronLeft,
        BIconChevronRight,
        BIconCalendar,
    },
    setup() {
        const text = {
            flexible:"I'm Flexible",
            chooseDates:'Choose dates',
            months:['January','February','March','April','May','June','July','August','September','October','November','December'],
            days:['Su','Mo','Tu','We','Th','Fr','Sa'],
            flexibleHeaderLength:'How long do you want to stay?',
            flexibleHeaderMonthYear:'When do you want to stay?',
            flexibleLengthOptions:['Weekend','Week','Month']    
        }
        const store = useStore()
        const today = new Date()
        const currentMonth = ref(today.getMonth())
        const currentYear = ref(today.getFullYear())
        const days = ref(getDays(currentMonth.value,currentYear.value))
        const daysOfNextMonth = ref(getDays(currentMonth.value + 1,currentYear.value))
        const nextMonthValue = ref(currentMonth.value + 1)
        const nextYearValue = ref(currentYear.value)
        const selectedDates = ref([])
        const isSelecting = ref(false)

        function onDateSelected(e){
            if(e.target.classList.contains('day')){
                let month = e.target.closest('.calendar-body').id.split('_')[0]
                let year = e.target.closest('.calendar-body').id.split('_')[1]
                let date = [new Date(year,month,e.target.textContent),e.target]
                
                if(selectedDateHandler(date)){
                    e.target.classList.add('day-selected')
                }else{
                    selectedDates.value.forEach(date => {
                        date[1].classList.remove('day-selected')
                    })
                    selectedDates.value = []
                    selectedDates.value.push(date)
                    isSelecting.value = true
                    e.target.classList.add('day-selected')

                }
            }
            if (selectedDates.value.length != 0){
                store.commit('setSelectedDates',selectedDates.value)
            }
        }
        function selectedDateHandler(date) {
            if(selectedDates.value.length == 0){
                selectedDates.value.push(date)
                isSelecting.value = true
                return true
            }else if(selectedDates.value.length == 1){
                if(isSelecting.value){
                    if(date[0] > selectedDates.value[0][0]){
                        selectedDates.value.push(date)
                        isSelecting.value = false
                        return true
                    }else{
                        isSelecting.value = false
                        return false
                    }
                }else if(selectedDates.value[0][0].getDate() == date.getDate()){
                    return false
                }
            }else{
                return false
            }
        }
   
        function isDateInSelectedRange(day,month,year) {
            if(!day){return false}
            if(selectedDates.value.length === 2) {
                const startDate = selectedDates.value[0][0] 
                const endDate = selectedDates.value[1][0]
                const date = new Date(year,month,day)
                if(date > startDate && date < endDate) {
                    return true
                }
            }
        }

        function nextMonth() {
            if(currentMonth.value === 10) {
                currentMonth.value = 0
                currentYear.value+=1
            }else if (currentMonth.value === 11) {
                currentMonth.value = 1
                currentYear.value+=1
            }
             else {
                currentMonth.value+=2
            }
            if(nextMonthValue.value === 10) {
                nextMonthValue.value = 0
                nextYearValue.value+=1
            }else if (nextMonthValue.value === 11){
                nextMonthValue.value = 1
                nextYearValue.value+=1
            } 
            else {
                nextMonthValue.value+=2
            }
            days.value = getDays(currentMonth.value,currentYear.value)
            daysOfNextMonth.value = getDays(currentMonth.value + 1,currentYear.value)
            
            if(selectedDates.value.length > 0 && selectedDates.value.length <= 2) {
                selectedDates.value.forEach(date => {
                    if(date[0].getMonth() === currentMonth.value && date[0].getFullYear() === currentYear.value || date[0].getMonth() === nextMonthValue.value && date[0].getFullYear() === nextYearValue.value) {
                        date[1].classList.add('day-selected')}
                    else{
                            date[1].classList.remove('day-selected')
                        }                    
                })
            }
            
        }
        function previousMonth() {
            if(currentMonth.value == 0) {
                currentMonth.value = 10
                currentYear.value-=1
            }else if(currentMonth.value == 1) {
                currentMonth.value = 11
                currentYear.value-=1
            }
             else {
                currentMonth.value -= 2
            }
            if(nextMonthValue.value == 0) {
                nextMonthValue.value = 10
                nextYearValue.value -= 1
            }else if (nextMonthValue.value == 1){
                nextMonthValue.value = 11
                nextYearValue.value -= 1
            } 
            else {
                nextMonthValue.value -= 2
            }
            days.value = getDays(currentMonth.value,currentYear.value)
            daysOfNextMonth.value = getDays(currentMonth.value + 1,currentYear.value)
            
            if(selectedDates.value.length > 0 && selectedDates.value.length <= 2) {
                selectedDates.value.forEach(date => {
                    if(date[0].getMonth() === currentMonth.value && date[0].getFullYear() === currentYear.value || date[0].getMonth() === nextMonthValue.value && date[0].getFullYear() === nextYearValue.value) {
                        date[1].classList.add('day-selected')}
                    else{
                            date[1].classList.remove('day-selected')
                        }                    
                })
            }
        }
        function getDays(month,year) {
            let days = []
            let firstDay = new Date(year,month,1).getDay()
            let lastDay = new Date(year,month+1,0).getDate()
            for(let i = 0; i < firstDay; i++) {
                days.push('')
            }
            for(let i = 1; i <= lastDay; i++) {
                days.push(i)
            }
            return days
        }

        const optionName  = ref(text.chooseDates)
        const selectedOption = ref();
        function activateOption(e) {
            if (selectedOption.value) {
                selectedOption.value.classList.remove('option-selected')
            }
            selectedOption.value = e.target.closest('.option')
            optionName.value = selectedOption.value.textContent
            if (selectedOption.value) {
                selectedOption.value.classList.add('option-selected')
            }
        }
        const selectedFlexOption = ref();
        function activateFlexOption(e) {
            if (selectedFlexOption.value) {
                selectedFlexOption.value.classList.remove('flexible-option-length-selected')
            }
            selectedFlexOption.value = e.target.closest('.flexible-option-length')
            if (selectedFlexOption.value) {
                selectedFlexOption.value.classList.add('flexible-option-length-selected')
            }
        }
        const selectedFlexMonthOption = ref();
        function activateFlexMonthOption(e) {
            if (selectedFlexMonthOption.value) {
                selectedFlexMonthOption.value.classList.remove('flexible-option-month-year-selected')
            }
            selectedFlexMonthOption.value = e.target.closest('.flexible-option-month-year')
            if (selectedFlexMonthOption.value) {
                selectedFlexMonthOption.value.classList.add('flexible-option-month-year-selected')
            }
        }

        function MonthsAndYearForNext2Years(){
            let payload = {}
            let currentMonth = new Date().getMonth()
            let currentYear = new Date().getFullYear()          
            for(let i = 0; i < 24; i++){
                if(currentMonth === 11){
                    currentMonth = 0
                    currentYear += 1
                }else{
                    currentMonth += 1
                }
                payload[i] = [text.months[currentMonth],currentYear]
            }
            return payload
        }
        onMounted(() => {
            document.getElementById('checkin-modal-container').focus()
            let defaultOption = document.getElementById('default-option')
            defaultOption.classList.add('option-selected')
            selectedOption.value = defaultOption

            const cards = gsap.utils.toArray(".flexible-option-month-year")
            let activeElement;
            const loop = horizontalLoop(cards, {
            paused: true, 
            draggable: false,
            center: true,
            onChange: (element, index) => {
                activeElement && activeElement.classList.remove("active");
                element.classList.add("active");
                activeElement = element;
            }
            });
            cards.forEach((box, i) => box.addEventListener("click", () => {
                console.log(loop)
                loop.toIndex(i, {duration: 1, ease: "power1.inOut"})}
                ));
            document.querySelector(".flexible-body-next-btn").addEventListener("click", () => loop.next({duration: 1, ease: "power1.inOut"}));
            document.querySelector(".flexible-body-prev-btn").addEventListener("click", () => loop.previous({duration: 1, ease: "power1.inOut"}));
        })
        return {
            text,
            activateOption,
            nextMonth,
            previousMonth,
            currentMonth,
            currentYear,
            days,
            daysOfNextMonth,
            nextMonthValue,
            nextYearValue,
            today,
            onDateSelected,
            selectedDates,
            isSelecting,
            isDateInSelectedRange,
            optionName,
            activateFlexOption,
            MonthsAndYearForNext2Years,
            activateFlexMonthOption,
        }
    },
})
</script>
<style scoped>
.checkin-modal-container{
    position:absolute;
    display:flex;
    flex-direction:column;
    top:5rem;
    left:0;
    width: 45rem;
    height: 30rem;
    background-color: #fff;
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 5px 10px 5px 2px rgba(0,0,0,0.1);
    border: 1px solid var(--color-border);
    z-index:3001;
}
.checkin-modal-container:focus{
    outline:none;
}
.checkin-header{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom: 1rem;
}
.options-wrapper {
    display:flex;
    width: 15rem;
    height:3rem;
    border-radius: 25px;
    flex-direction:row;
    justify-content:space-between;
    align-items: center;
    margin-bottom: 1rem;
    background-color: #ccc;
}
.option {
    margin: 0 0.6rem;
    width: 7rem;
    height: 2rem;
    border-radius: 25px;
    display:flex;
    justify-content:center;
    align-items:center;
    transition: all 0.2s ease-in-out;
}
.option-selected{
    background-color: var(--vt-c-white);
    box-shadow: 5px 10px 5px 2px rgba(0,0,0,0.1);
}
.wrapper{
    display:flex;
    flex-direction:row;
    gap:5rem;
}
.option > h2 {
    font-size: 0.9rem;
    font-weight: 500;
}
.month-left-wrapper, .month-right-wrapper {
    display:flex;
    flex-direction:column;
    height: 100%;
}
.month-header {
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-bottom: 1rem;
    width:100%;
}
.previous-month-btn, .next-month-btn {
    width:100%;
}
.month-header > .previous-month-btn > svg {
    position:absolute;
    left: 0;
}
.month-header > .next-month-btn > svg {
    position:absolute;
    right: 0;
}
.month-name {
    font-size: 16px;
    font-weight: 600;
}
.previous-month-btn, .next-month-btn {
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
}

.calendar {
    display:flex;
    flex-direction:column;
    width: 100%;
    height: 100%;
}
.calendar-header {
    display:grid;
    grid-template-columns: repeat(7, 1fr);
    height: 2rem;
    margin-bottom: 1rem;

}
.week-day{
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 10px;
    background-color: var(--color-background);
}
.day {
    display:flex;
    justify-content:center;
    align-items:center;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 0.8rem;
    background-color: var(--color-background);
    cursor: pointer;
}
.day:hover {
    border:2px solid var(--vt-c-black);
}
.day-selected {
    background-color: var(--vt-c-black-mute);
    color: var(--vt-c-white);
    border: 2px solid var(--color-border);
}
.day-in-range {
    background-color: #ddd;
}
.calendar-body {
    display:grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
    justify-content:center;
    align-items:center;
    row-gap:2px;
}
/* flexible */
.flexible-wrapper{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    margin-top: 1rem;
}
.flexible-header{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    margin-bottom: 1rem;
}
.flexible-header > h2 {
    font-size: 1.3rem;
    font-weight: 500;
}
.flexible-body{
    display:flex;
    flex-direction:row;
    width:100%;
    justify-content:center;
    align-items:center;
}

.flexible-option-length-wrapper{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    height: 3rem;
    gap:1rem;
    border-radius: 25px;
}

.flexible-option-length{
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 0.1rem 1rem;
    margin-bottom: 1rem;
    border: 2px solid var(--color-border);
    border-radius: 25px;
    cursor: pointer;
}
.flexible-option-length > h2 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
}
.flexible-option-length:hover,.flexible-option-length-selected {
    border: 2px solid var(--vt-c-black);
}
.flexible-body-month-year-wrapper{
    width:100%;
    display:flex;
    flex-direction:row;
    overflow:hidden;
    gap:0.4rem;
}
.flexible-option-month-year{
    display:flex;
    min-width: 7rem;
    width:7rem;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-bottom: 1rem;
    border: 2px solid var(--color-border);
    border-radius: 25px;
    cursor: pointer;
    padding:1.5rem;
}
.flexible-option-month-year > h2 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
}
.flexible-option-month-year:hover,.flexible-option-month-year-selected {
    border: 2px solid var(--vt-c-black);
}
.month-year-option{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    padding: 0.1rem 1rem;
    border: 2px solid var(--color-border);
    border-radius: 25px;
    cursor: pointer;
}
.month-year-option > h2 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
}
.flexible-body-next-btn, .flexible-body-prev-btn{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width: 2rem;
    padding: 10px;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    cursor: pointer;
    z-index:2;
}
</style>
