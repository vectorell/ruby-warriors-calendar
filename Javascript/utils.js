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


let current = document.querySelectorAll('.current')
const weekday = document.querySelector('.calendar__weekdaytitles__container')
const button = document.querySelector('.add-event-btn')
const body = document.querySelector('body')
const rightSide = document.querySelector('.right')
const activitiesByDate = {}
const events = document.querySelector('.events')
const eventDay = document.querySelector('.event-day')
const eventDate = document.querySelector('.event-date')
const container = document.querySelector('.container')




const yearDisplay = document.querySelector('.year-display');
function render(date) {
    let calendarApp = document.querySelector('.date-boxes')
    monthDisplay.innerText = months[state.month]
    yearDisplay.value = state.year
    let slots = document.querySelectorAll('.slot')
    let firstWeek = getTargetWeek(state.year, state.month, 3)
    for (let i = 0; i < slots.length; i++) {
        slots[i].innerText = firstWeek-1 + i
    }

    slots.forEach(element => {
        if (element.innerText == '0') {
            element.innerText = '52'
        } 
    })
    
    calendarApp.innerHTML = `
        ${ dateBoxes(state.year, state.month).map(date => `<div id="${date.key}" class="${date.monthClass} ${date.todayClass ? date.todayClass : ''}">${date.date}</div>`).join('') }`

        // Eventlyssnare för varje skapat datum
        let current = document.querySelectorAll('.current')
        current.forEach(element => {
            element.addEventListener('click', (event) => {
                console.log('klick')
                const dateId = event.target.id
                console.log(dateId)
                const index = dateId.indexOf(' ');
                const dateWithoutTime = dateId.substring(0, index);
                let date = new Date().getDay(dateWithoutTime)

                // console.log(date);
                    
                    // Denna koden jämför datumet och tar fram rätt veckodag
                const dateObject = new Date(dateWithoutTime);
                // console.log(dateObject)
                const options = { weekday: 'long' };
                const dayOfWeek = new Intl.DateTimeFormat('sv-SE', options).format(dateObject);

                eventDate.innerText = dateWithoutTime
                eventDay.innerText = dayOfWeek;
                // console.log(dayOfWeek)
                showActivities(dateWithoutTime)
                });
                
            })
}


// En funktion som ska göra så att informationen från ett event visas
function showActivities(date) {
	const activities = activitiesByDate[date]
	let activitiesList = document.createElement('ul')
	activitiesList.className = 'activities-list'

	if (!activities || activities.length === 0) {
		let listItem = document.createElement('li')
		listItem.innerText = 'Inga aktiviteter denna dagen.'
		activitiesList.append(listItem)
	} else {
		for (let i = 0; i < activities.length; i++) {
			let listItem = document.createElement('li');
			listItem.innerText = 
			`Att göra: ${activities[i].head} 
			Plats:  ${activities[i].place} 
			Tid: ${activities[i].time} 
			Kom ihåg: ${activities[i].event}`;
			activitiesList.append(listItem);
			
		}
	}

	events.innerHTML = ''
	events.append(activitiesList)
	
	console.log(activitiesList)
}

function showCalendar(prevOrNext) {
    let date = new Date(state.year, state.month + prevOrNext)
    console.log('date')
    console.log(date)

    state.year = date.getFullYear()
    state.month = date.getMonth()
    
    if (state.year >= 2023)
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




function getCurrentWeek(year, month, day) {
    let currentDate = new Date();
    
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) /
    (24 * 60 * 60 * 1000));
    
    let currentWeek = Math.ceil(days / 7);
    return currentWeek
}


function getTargetWeek(year, month, day) {
    
    // 1. Hämta skillnad mellan nuvarande vecka och vald vecka
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear()
    let targetYear = year

    let startDate = new Date(year, (month), (day));
    let days = Math.floor(-1*(currentDate - startDate) /
        (24 * 60 * 60 * 1000));
    let targetWeek = Math.ceil(days / 7);


    // 2. Räkna ut vald vecka mha nuvarande + vald vecka
    let result = Math.abs(getCurrentWeek() + targetWeek)  
    let yearDifference = Math.abs(currentYear - targetYear)
    
    if (result > 52) {
        result = result - yearDifference*52
    }
    console.log('result')
    console.log(Math.abs(result))
    return result
}


getTargetWeek(2021, 02, 22)