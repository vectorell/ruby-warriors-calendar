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

window.addEventListener('load', function() {
	eventDate.innerText = today.todayDate + ' ' + today.todayMonth
	eventDay.innerText = today.todayWeekday
})

current.forEach(element => {
    element.addEventListener('click', (event) => {
		console.log('klick')
        const dateId = event.target.id
		console.log(event)
        const index = dateId.indexOf(' ');
        const dateWithoutTime = dateId.substring(0, index);
        console.log(dateWithoutTime);
        
        // Denna koden jämför datumet och tar fram rätt veckodag
        const dateObject = new Date(dateWithoutTime);
        const options = { weekday: 'long' };
        const dayOfWeek = new Intl.DateTimeFormat('sv-SE', options).format(dateObject);

        eventDate.innerText = dateWithoutTime
        eventDay.innerText = dayOfWeek;
		 console.log(dayOfWeek)
			showActivities(dateWithoutTime)
	   
	});
	
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
	content.head.classList.add('head-form')
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

	container.append(overlay)
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