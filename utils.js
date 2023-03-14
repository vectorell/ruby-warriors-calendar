
/** GLOBALA VARIABLER och DOM-INHÄMTNINGAR */
const button = document.querySelector('.add-event-btn')
const body = document.querySelector('body')
const rightSide = document.querySelector('.right')
const activitiesByDate = {}
const events = document.querySelector('.events')
const eventDay = document.querySelector('.event-day')
const eventDate = document.querySelector('.event-date')
// let eventArray = []
// const eventName = document.querySelector('.event-name')
// const timeStamp = document.querySelector('.time-stamp')
// const placeText = document.querySelector('.place-text')
// const reminder = document.querySelector('.reminder-text')

let daysInSelectedMonth
const dateContainer = document.querySelectorAll('.date__container')
const dateContainerDayNumber = document.querySelectorAll('.weekday-number-text')
const monthDisplay = document.querySelector('.month-display')

window.addEventListener('load', function() {
		eventDate.innerText = today.todayDate + ' ' + today.todayMonth
		eventDay.innerText = today.todayWeekday
	})

button.addEventListener('click', () => {
	console.log('Du klickade på knappen')

	// Skapa alla element
	const overlay = document.createElement('div')
	const content = {
		contentForm: document.createElement('form'),
		head: document.createElement('h2'),
		inputHead: document.createElement('input'),
		inputPlace: document.createElement('input'),
		inputDate: document.createElement('input'),
		inputTime: document.createElement('input'),
		inputEvent: document.createElement('input'),
		buttonContainer: document.createElement('div'),
		buttonAddEvent: document.createElement('button'),
		buttonCloseOverlay: document.createElement('button')
	}

	//Adderar klasser för styling
	overlay.classList.add('overlay')
	content.contentForm.classList.add('content-form')
	content.inputHead.classList.add('input-head')
	content.inputPlace.classList.add('input-place')
	content.inputEvent.classList.add('input-event')
	content.inputDate.classList.add('input-date')
	content.inputTime.classList.add('input-time')
	content.buttonContainer.classList.add('button-container')
	content.buttonAddEvent.classList.add('button-add-event')
	
	// Innehåll
	content.inputDate.type = 'date'
	content.inputTime.type = 'time'
	content.inputHead.placeholder = '  Ny aktivitet'
	content.inputPlace.placeholder = '  Lägg till plats'
	content.inputEvent.placeholder = '  Lägg till påminnelse'
	content.buttonAddEvent.innerText = 'Lägg till Event'
	content.head.innerText = 'Lägg till ett event i din kalender'
	content.buttonCloseOverlay.innerText = 'Stäng'

	// Lägger till i DOM
	content.contentForm.append(content.head)
	content.contentForm.append(content.inputHead)
    content.contentForm.append(content.inputPlace)
	content.contentForm.append(content.inputDate)
	content.contentForm.append(content.inputTime)
	content.contentForm.append(content.inputEvent)
	content.buttonContainer.append(content.buttonAddEvent)
	content.buttonContainer.append(content.buttonCloseOverlay)
	content.contentForm.append(content.buttonContainer)
	
	overlay.append(content.contentForm)

	rightSide.append(overlay)
	content.buttonAddEvent.addEventListener('click', (event) => {
		event.preventDefault();
		const headValue = content.inputHead.value;
    	const placeValue = content.inputPlace.value;
    	const dateValue = content.inputDate.value;
    	const timeValue = content.inputTime.value;
    	const eventValue = content.inputEvent.value;

		if(!activitiesByDate[dateValue]) {
			activitiesByDate[dateValue] = []
		}

		activitiesByDate[dateValue].push({
			head: headValue,
			place: placeValue,
			date: dateValue,
			time: timeValue,
			event: eventValue
		})
		console.log(activitiesByDate)
	 showActivities(dateValue)
	})

	content.buttonCloseOverlay.addEventListener('click', (event) => {
		event.preventDefault();
	
		overlay.remove();
	})
	

}) 

// En funktion som ska göra så att informationen från ett event visas
function showActivities(date) {
	const activities = activitiesByDate[date]
	let activitiesList = document.createElement('ul')
	activitiesList.className = 'activities-list'
	for (let i = 0; i < activities.length; i++) {
		let listItem = document.createElement('li');
		listItem.innerText = `Att göra: ${activities[i].head} Plats:  ${activities[i].place} Tid: ${activities[i].time} Kom ihåg: ${activities[i].event}`;
		
		activitiesList.append(listItem);
	}
	events.append(activitiesList)
	console.log(activitiesList)
}



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



/*******************************************/


monthArray = [
    {name: 'JANUARI', days: 31, index: 1},
    {name: 'FEBRUARI', days: 28, index: 2},
    {name: 'MARS', days: 31, index: 3},
    {name: 'APRIL', days: 30, index: 4},
    {name: 'MAJ', days: 31, index: 5},
    {name: 'JUNI', days: 30, index: 6},
    {name: 'JULI', days: 31, index: 7},
    {name: 'AUGUSTI', days: 31, index: 8},
    {name: 'SEPTEMBER', days: 30, index: 9},
    {name: 'OKTOBER', days: 31, index: 10},
    {name: 'NOVEMBER', days: 30, index: 11},
    {name: 'DECEMBER', days: 31, index: 12}
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

    // Nollställning inför rendering
    dateContainer.forEach(element => {
        element.style.visibility = 'hidden'
    })

    for (let i = 0; i < daysInSelectedMonth+1; i++) {
        dateContainer.forEach(element => {
            if (element.classList.contains(`date${i}`)) {
                element.style.visibility = 'visible'
                element.innerText = i
            }
        })
    }
}



// Funktion för att konvertera månadsindex till månadsnamn
let monthName
function convertMonthIndexToName(index) {
    monthArray.forEach(element => {
        if (element.index == index) {
            console.log(element.name)
            monthName = element.name
            return monthName
        }
    })
}

/** SAKER SOM BEHÖVS FÖR START */
let monthIndex = new Date().getMonth() + 1;
console.log(monthIndex)
renderDateBoxes(monthIndex)
convertMonthIndexToName(monthIndex)
monthDisplay.innerText = monthName
