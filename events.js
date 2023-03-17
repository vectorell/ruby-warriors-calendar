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