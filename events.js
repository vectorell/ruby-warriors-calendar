window.addEventListener('load', function() {
	eventDate.innerText = today.todayDate + ' ' + today.todayMonth
	eventDay.innerText = today.todayWeekday
})


let LS_KEY = 'saved-events'
// // Funktion för att uppdatera local storage till activitiesByDate
// function fetchLocalStorage() {
//     let stringFromLocalStorage = localStorage.getItem(LS_KEY)
//      if (!stringFromLocalStorage) { stringFromLocalStorage = '[]' }

//     let arrayFromLocalStorage = JSON.parse(stringFromLocalStorage)


//     activitiesByDate = arrayFromLocalStorage
//     console.log(arrayFromLocalStorage)
//     console.log('test')
//     // if (arrayFromLocalStorage != null) {

//         for (let i = 0; i < arrayFromLocalStorage.length; i++) {
//             let activity = activitiesByDate[i]
//             let alteredActivity = Object.values(activity)
//             console.log('alteredActivity')
//             console.log(alteredActivity)
    
//             alteredActivity.forEach(element => {
//                 // console.log('alteredActivity2')
//                 // console.log(alteredActivity)
//                 for (let i = 0; i < element.length; i++) {
//                     console.log(element[i].date)
//                     console.log('test')
//                     showActivities(element[i].date)
//                 }
//                 // element.forEach(element => {
//                     // showActivities(element.date)
//                 })
            
//         }
//     // }
    
    
// }

// fetchLocalStorage()


function fetchLocalStorage() {
    let arrayFromLocalStorage = JSON.parse(localStorage.getItem(LS_KEY))
    console.log('arrayFromLocalStorage nedan:')
    console.log(arrayFromLocalStorage)

    let arrayElement = Object.fromEntries(arrayFromLocalStorage) 
    console.log(arrayElement)


    arrayFromLocalStorage.forEach(element => {
        console.log('element')
        console.log(element)

        // let arrayElement = Object.fromEntries(element) 
        console.log('arrayElement')
        console.log(arrayElement)
        for (let i = 0; i < arrayElement.length; i++) {
            console.log('arrayElement[i]')
            console.log(arrayElement[i])
        }

                
            })

}

fetchLocalStorage()

// Funktion för att spara till local storage
function saveToLocalStorage(item) {

    let stringFromLocalStorage = localStorage.getItem(LS_KEY)
    if (!stringFromLocalStorage) { stringFromLocalStorage = '[]' }

    // item = activitiesByDate

    let arrayFromLocalStorage = JSON.parse(stringFromLocalStorage)
    // console.log(arrayFromLocalStorage)
    arrayFromLocalStorage.push(item)

    let stringToSave = JSON.stringify(arrayFromLocalStorage)
    localStorage.setItem(LS_KEY, stringToSave)
}





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
        saveToLocalStorage(activitiesByDate)
		console.log(activitiesByDate)
        console.log('dateValue')
        console.log(dateValue)
	 showActivities(dateValue)
	})

	content.buttonCloseOverlay.addEventListener('click', (event) => {
		event.preventDefault();
	
		overlay.remove();
	})
	

}) 
