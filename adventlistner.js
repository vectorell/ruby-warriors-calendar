import { showActivities } from "./utils.js";
const buttonLeftArrow = document.querySelector('.left-arrow')
const buttonRightArrow = document.querySelector('.right-arrow')
const yearDropdown = document.getElementById('#year-dropdown');
let current = document.querySelectorAll('.current')

buttonLeftArrow.addEventListener('click', () => {
    showCalendar(-1);
})

buttonRightArrow.addEventListener('click', () => {
    showCalendar(1);
})

current.forEach(element => {
    element.addEventListener('click', (event) => {
        const dateId = event.target.id
		console.log(event)
        // eventDate.innerText = dateId
		// eventDay.innerText = today.todayWeekday
			showActivities(dateId)
	 
        
});
	
})

// yearDropdown.addEventListener('change', function() {
//   const selectedYear = yearDropdown.value;
//   // Uppdatera kalendern baserat på det valda året

// });