
const buttonLeftArrow = document.querySelector('.left-arrow')
const buttonRightArrow = document.querySelector('.right-arrow')
const yearDropdown = document.getElementById('#year-dropdown');

buttonLeftArrow.addEventListener('click', () => {
	const theMonthBefore = buttonLeftArrow.value; 
})

buttonRightArrow.addEventListener('click', () => {
	const theMonthAfter = buttonRightArrow.value; 
})

yearDropdown.addEventListener('change', function() {
  const selectedYear = yearDropdown.value;
  // Uppdatera kalendern baserat på det valda året

});

