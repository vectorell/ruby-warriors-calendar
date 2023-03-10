/** GLOBALA VARIABLER och DOM-INHÄMTNINGAR */
let daysInSelectedMonth
const dateContainer = document.querySelectorAll('.date__container')
const dateContainerDayNumber = document.querySelectorAll('.weekday-number-text')


/**************** INHÄMTNING AV DAGENS DATUM + TID *******************/
// Hela dagens datum som sträng
let currentFullDateString = Date()
console.log(currentFullDateString)

// Hela dagens datum omgjort till en array
let currentFullDateArray = currentFullDateString.split(' ')

// Dagens klockslag
let currentTimeString = currentFullDateArray[4]
let currentTime = currentTimeString.split(':')

// Dagens datum + tid, som används i funktioner etc
let today = {
    todayYear: currentFullDateArray[3],
    todayMonth: currentFullDateArray[1],
    todayWeekday: currentFullDateArray[0],
    todayDate: currentFullDateArray[2],
    todayHour: currentTime[0],
    todayMinute: currentTime[1],
    todaySecond: currentTime[2]
}
/*******************************************/


monthArray = [
    {name: 'jan', days: 31, index: 1},
    {name: 'feb', days: 28, index: 2},
    {name: 'mar', days: 31, index: 3},
    {name: 'apr', days: 30, index: 4},
    {name: 'maj', days: 31, index: 5},
    {name: 'jun', days: 30, index: 6},
    {name: 'jul', days: 31, index: 7},
    {name: 'aug', days: 31, index: 8},
    {name: 'sep', days: 30, index: 9},
    {name: 'okt', days: 31, index: 10},
    {name: 'nov', days: 30, index: 11},
    {name: 'dec', days: 31, index: 12}
]

// FUNKTION: Returnera antal dagar för vald månad
function howManyDaysInMonth(month) {
    monthArray.forEach(element => {
        if ((element.name == month) || (element.index == month)) {
            // console.log(element.days)
            daysInSelectedMonth = element.days
            return daysInSelectedMonth
        }
    })
}


// FUNKTION: Grafisk rendering av datumboxar baserat på vald månad
// (beroende av funktionen 'howManyDaysInMonth()')
function renderDateBoxes(month) {
    howManyDaysInMonth(month)
    console.log(daysInSelectedMonth)

    for (let i = 0; i < daysInSelectedMonth+1; i++) {
        dateContainer.forEach(element => {
            if (element.classList.contains(`date${i}`)) {
            element.style.visibility = 'visible'
            element.innerText = i
            }
        })
    }
}

renderDateBoxes(2)