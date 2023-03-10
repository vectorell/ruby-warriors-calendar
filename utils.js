const button = document.querySelector('button')
const body = document.querySelector('body')


button.addEventListener('click', () => {
	console.log('Du klickade på knappen')

	// Skapa alla element
	const overlay = document.createElement('div')
	const content = {
	contentForm: document.createElement('form'),
	inputHead: document.createElement('input'),
	inputPlace: document.createElement('input'),
	inputDate: document.createElement('input'),
	inputTime: document.createElement('input'),
	inputEvent: document.createElement('input'),
	buttonAddEvent: document.createElement('button')
	}

	//Adderar klasser för styling
	overlay.classList.add('overlay')
	content.contentForm.classList.add('content-form')
	content.inputHead.classList.add('input-head')
	content.inputPlace.classList.add('input-place')
	content.inputEvent.classList.add('input-event')
	content.buttonAddEvent.classList.add('button-add-event')
	
	// Innehåll
	content.inputDate.type = 'date'
	content.inputTime.type = 'time'
	content.inputHead.placeholder = 'Ny aktivitet'
	content.inputPlace.placeholder = 'Lägg till plats'
	content.inputEvent.placeholder = 'Lägg till påminnelse'
	content.buttonAddEvent.innerText = 'Lägg till Event'

	// Lägger till i DOM
	content.contentForm.append(content.inputHead)
    content.contentForm.append(content.inputPlace)
	content.contentForm.append(content.inputDate)
	content.contentForm.append(content.inputTime)
	content.contentForm.append(content.inputEvent)
	content.contentForm.append(content.buttonAddEvent)
	overlay.append(content.contentForm)

	body.append(overlay)

})
