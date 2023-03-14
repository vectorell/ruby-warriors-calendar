
const buttonLeftArrow = document.querySelector('.left-arrow')
const buttonRightArrow = document.querySelector('.right-arrow')
const yearDropdown = document.getElementById('#year-dropdown');

buttonLeftArrow.addEventListener('click', () => {
    if (monthIndex > 0) {
        renderDateBoxes(--monthIndex)
        convertMonthIndexToName(monthIndex)
        monthDisplay.innerText = monthName
    }
})

buttonRightArrow.addEventListener('click', () => {
    if (monthIndex < 12) {
        renderDateBoxes(++monthIndex)
        convertMonthIndexToName(monthIndex)
        monthDisplay.innerText = monthName
    }
})

// yearDropdown.addEventListener('change', function() {
//   const selectedYear = yearDropdown.value;
//   // Uppdatera kalendern baserat på det valda året

// });
