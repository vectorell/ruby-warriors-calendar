import { showActivities } from "./utils.js";
const buttonLeftArrow = document.querySelector('.left-arrow')
const buttonRightArrow = document.querySelector('.right-arrow')
const yearDropdown = document.getElementById('#year-dropdown');
let current = document.querySelectorAll('.current')
const weekday = document.querySelector('.calendar__weekdaytitles__container')


const eventDay = document.querySelector('.event-day')
const eventDate = document.querySelector('.event-date')



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

// yearDropdown.addEventListener('change', function() {
//   const selectedYear = yearDropdown.value;
//   // Uppdatera kalendern baserat på det valda året

// });