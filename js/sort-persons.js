// Write a script ot use the input file to search the persons by name and hide the others
// The search should be case insensitive

const searchInput = document.getElementById('searchInput');
const persons = document.getElementsByClassName('person');

searchInput.addEventListener('input', () => {
	const searchValue = searchInput.value.toLowerCase();

	for (let i = 0; i < persons.length; i++) {
		const personName = persons[i].querySelector('.name').textContent.toLowerCase();

		if (personName.includes(searchValue)) {
			persons[i].style.display = 'block';
		} else {
			persons[i].style.display = 'none';
		}
	}
});