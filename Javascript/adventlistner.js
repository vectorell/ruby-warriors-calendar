
const buttonLeftArrow = document.querySelector('.left-arrow')
const buttonRightArrow = document.querySelector('.right-arrow')
const yearDropdown = document.getElementById('#year-dropdown');
function white() { yearDisplay.style.background = 'white' }
yearDisplay.style.transition = '0s'


buttonLeftArrow.addEventListener('click', () => {

    if ((state.year == 2023) && (state.month == 0) ) {
        yearDisplay.style.background = '#e85f5c'
        setTimeout(white, 100)
    }
    else {
        showCalendar(-1);
    }
})

buttonRightArrow.addEventListener('click', () => {
    showCalendar(1);
})

yearDisplay.addEventListener('keydown', (event) => {

    if (event.key == "Enter" && yearDisplay.value >= 2023) {
        state.year = yearDisplay.value
        yearDisplay.style.background = '#bee7b8'
        setTimeout(white, 100)
        showCalendar(0)
    }
    else if (event.key == 'Enter' && yearDisplay.value <= 2022) {
        yearDisplay.style.background = '#e85f5c'
        setTimeout(white, 100)
        yearDisplay.value = 2023
    }
})

yearDisplay.addEventListener('click', (event) => {
    state.year = yearDisplay.value
    showCalendar(0)
})