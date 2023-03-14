
const buttonLeftArrow = document.querySelector('.left-arrow')
const buttonRightArrow = document.querySelector('.right-arrow')
const yearDropdown = document.getElementById('#year-dropdown');

buttonLeftArrow.addEventListener('click', () => {
    showCalendar(-1);
})

buttonRightArrow.addEventListener('click', () => {
    showCalendar(1);
})

// yearDropdown.addEventListener('change', function() {
//   const selectedYear = yearDropdown.value;
//   // Uppdatera kalendern baserat på det valda året

// });