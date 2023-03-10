const button = document.querySelector('button')
const body = document.querySelector('body')
let eventArray = []

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

	body.append(overlay)
	content.buttonAddEvent.addEventListener('click', (event) => {
		event.preventDefault();
		const headValue = content.inputHead.value;
    	const placeValue = content.inputPlace.value;
    	const dateValue = content.inputDate.value;
    	const timeValue = content.inputTime.value;
    	const eventValue = content.inputEvent.value;
		eventArray.push(headValue, placeValue, dateValue, timeValue, eventValue)
	})

	content.buttonCloseOverlay.addEventListener('click', (event) => {
		event.preventDefault();
	
		overlay.remove();
	})
	
	console.log(eventArray)
}) 
console.log(eventArray)
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

		
