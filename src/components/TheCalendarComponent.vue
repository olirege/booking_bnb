<template>
    <div class="calendar-wrapper">
        <div class="checkin-header">
            <div class="options-wrapper">
                <div class="option" @click="activateOption" id="default-option"><h2>{{text.chooseDates}}</h2></div>
                <div class="option" @click="activateOption"><h2>{{text.flexible}}</h2></div>
            </div>
        </div>
        <div class="calendar-header">
            <div class="week-day" v-for="(day,index) of text.days" :key="index">
                <h2>{{day}}</h2>
            </div>
        </div>
        <div class="content" @click="onDateSelected" v-show="optionName === text.chooseDates">
            <div class="month-wrapper" v-for="n in 3" :key="n">
                <div class="month-header">
                    <h2 class="month-name">{{text.months[currentMonth + n > 11 ? 0 : currentMonth + n]}} {{currentMonth + n > 11 ? currentYear + 1 : currentYear}}</h2>    
                </div>
                <div class="calendar">
                    <div class="calendar-body" :id="(currentMonth + n) + '_' + currentYear">
                        <h2 class="day" v-for="(day,index) of getDays(currentMonth + n > 11 ? 0 : currentMonth + n, currentMonth + n > 11 ? currentYear + 1 : currentYear) " :key="index" :class="{'day-in-range':isDateInSelectedRange(day,currentMonth + n > 11 ? 0 : currentMonth + n, currentMonth + n > 11 ? currentYear + 1 : currentYear)}">
                            {{day}}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="date-estimate-options">
            <div class="date-estimate-option" v-for="(option,index) of text.dateEstimateOptions" :key="index">
                <h2>{{option}}</h2>
            </div>
        </div>
    </div>
</template>
<script>
import {ref,onMounted} from 'vue'
import { BIconChevronLeft } from 'bootstrap-icons-vue'
import {useStore} from 'vuex'

export default({
    components: {
        BIconChevronLeft
    },
    setup() {
        const text = {
            flexible:"I'm Flexible",
            chooseDates:'Choose dates',
            months:['January','February','March','April','May','June','July','August','September','October','November','December'],
            days:['Su','Mo','Tu','We','Th','Fr','Sa'],
            flexibleHeaderLength:'How long do you want to stay?',
            flexibleHeaderMonthYear:'When do you want to stay?',
            flexibleLengthOptions:['Weekend','Week','Month'],
            dateEstimateOptions:['Exact dates','± 1 day','± 3 days','± 7days']    
        }
        const store = useStore()
        const today = new Date()
        const currentMonth = ref(today.getMonth())
        const currentYear = ref(today.getFullYear())
        const days = ref(getDays(currentMonth.value,currentYear.value))
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
            days.value = getDays(currentMonth.value,currentYear.value)
            if(selectedDates.value.length > 0 && selectedDates.value.length <= 2) {
                selectedDates.value.forEach(date => {
                    if(date[0].getMonth() === currentMonth.value && date[0].getFullYear() === currentYear.value) {
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
        onMounted(() => {
            let defaultOption = document.getElementById('default-option')
            defaultOption.classList.add('option-selected')
            selectedOption.value = defaultOption
        })
        return{
            text,
            currentMonth,
            currentYear,
            days,
            nextMonth,
            isDateInSelectedRange,
            onDateSelected,
            optionName,
            activateOption,
            selectedOption,
            getDays,
            
        }
    },
})
</script>
<style scoped>
.calendar-wrapper{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width: 100%;
    height: 33rem;
    background-color: var(--color-background);
    padding: 0.5rem;
    gap: 0.5rem
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
.content{
    display:flex;
    flex-direction:column;
    overflow-y:scroll;
    gap:1rem;
}
.option > h2 {
    font-size: 0.9rem;
    font-weight: 500;
}
.month-header {
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    margin-bottom: 0.3rem;
    width:100%;
}
.month-name {
    font-size: 16px;
    font-weight: 600;
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
    border-bottom: 1px solid var(--color-border)

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
    width:100%;
    height: 3.5rem;
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
.date-estimate-options{
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    width:100%;
    border-top: 1px solid var(--color-border);
    padding: 2rem 0 0 0;
}
.date-estimate-option{
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    width: 5rem;
    height: 2rem;
    border-radius: 25px;
    background-color: var(--vt-c-white);
    border: 1px solid var(--color-border);
    margin-right: 0.5rem;
    cursor: pointer;
}
.date-estimate-option > h2 {
    font-size: 0.7rem;
    font-weight: 500;
}
</style>
