
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



yearDisplay.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        state.year = yearDisplay.value
        showCalendar(0)
    }
})

yearDisplay.addEventListener('click', () => {
    state.year = yearDisplay.value
    showCalendar(0)
})