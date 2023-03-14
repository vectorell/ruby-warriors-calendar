const button = document.querySelector('.add-event-btn')
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

const monthDisplay = document.querySelector('.month-display')

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

function render() {
    let calendarApp = document.querySelector('.date-boxes')
    const yearDisplay = document.querySelector('.year-display');
    monthDisplay.innerText = months[state.month]
    yearDisplay.innerText = state.year

    calendarApp.innerHTML = `
        ${ dateBoxes(state.year, state.month).map(date => `<div id="${date.key}" class="${date.monthClass} ${date.todayClass ? date.todayClass : ''}">${date.date}</div>`).join('') }
    `
}



function showCalendar(prevOrNext) {
    let date = new Date(state.year, state.month + prevOrNext)

    state.year = date.getFullYear()
    state.month = date.getMonth()
    render()
}

showCalendar(0)


// popup

// const openModalButtons = document.querySelectorAll('[data-modal-target]')
// const closeModalButtons = document.querySelectorAll('[data-close-button]')
// const overlay = document.getElementById('overlay')

// openModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = document.querySelector(button.dataset.modalTarget)
//     openModal(modal)
//   })
// })

// overlay.addEventListener('click', () => {
//   const modals = document.querySelectorAll('.modal.active')
//   modals.forEach(modal => {
//     closeModal(modal)
//   })
// })

// closeModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = button.closest('#modal')
//     closeModal(modal)
//   })
// })

// function openModal(modal) {
//   if (modal == null) return
//   modal.classList.add('active')
//   overlay.classList.add('active')
// }

// function closeModal(modal) {
//   if (modal == null) return
//   modal.classList.remove('active')
//   overlay.classList.remove('active')
// }