

/** GLOBALA VARIABLER och DOM-INHÄMTNINGAR */
let daysInSelectedMonth
const dateContainer = document.querySelectorAll('.date__container')
const dateContainerDayNumber = document.querySelectorAll('.weekday-number-text')
const monthDisplay = document.querySelector('.month-display')


/************** INHÄMTNING AV DAGENS DATUM + TID *******************/
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

let months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']
let weekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']
let gridsize = 42

let state = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
}

function dateBoxes(year, month) {
    let dates = []

    let firstDayInMonth = new Date(year, month).getDay()

    firstDayInMonth = firstDayInMonth === 0 ? 7 : firstDayInMonth

    let daysInMonth = new Date(year, month + 1, 0).getDate()

    let daysInPreviousMonth = new Date(year, month, 0).getDate()

    // Föregående månads dagar som ska visas i kalendern
    for (let i = 1; i < firstDayInMonth; i++) {
        let previousMonthDate = daysInPreviousMonth - firstDayInMonth + i
        let key = new Date(state.year, state.month -1, previousMonthDate).toLocaleString()
        dates.push({key: key, date: previousMonthDate, monthClass: 'prev'})
    }

    // Denna månadens dagar som ska renderas
    let today = new Date()
    for (let i = 1; i <= daysInMonth; i++) {
        let key = new Date(state.year, state.month, i).toLocaleString();
        if (i === today.getDate() && state.month === today.getMonth() && state.year === today.getFullYear()) {
            dates.push({key: key, date: i, monthClass: 'current', todayClass: 'today'})
        } else {
            dates.push({key: key, date: i, monthClass: 'current'})
        }
    }

    
    // Kolla om det finns plats över i griden, visa dagar för kommande månad
    if (dates.length < gridsize) {
        let count = gridsize - dates.length
        for (let i = 1; i <= count; i++) {
            let key = new Date(state.year, state.month + 1, i).toLocaleString()
            dates.push({key: key, date: i, monthClass:'next'})
        }
    }
    return dates
}

const yearDisplay = document.querySelector('.year-display');
function render(date) {
    let calendarApp = document.querySelector('.date-boxes')
    monthDisplay.innerText = months[state.month]
    yearDisplay.value = state.year
    // console.log(date.todayClass)

    calendarApp.innerHTML = `
        ${ dateBoxes(state.year, state.month).map(date => `<div id="${date.key}" class="${date.monthClass} ${date.todayClass ? date.todayClass : ''}">${date.date}</div>`).join('') }`
}


function showCalendar(prevOrNext) {
    let date = new Date(state.year, state.month + prevOrNext)

    state.year = date.getFullYear()
    state.month = date.getMonth()
    render()
}

showCalendar(0)


// popup

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('#modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}
