const API_URL = `volunteers.json`;  // We need this from the main dashboard if possible

let allVolunteers = [];

function createCard(volunteer) {
    return `
        <div class="card" data-category="${volunteer.Category}">
            <div class="card-inner">
                <h2 class='card__name'>${volunteer.Name}</h2>
                <p class='card-status ${volunteer.Category.toLowerCase()}'>${volunteer.Category}</p>
                <p class='card__profession'>Profession: ${volunteer.Profession}</p>
                <p class='card__contact'>Contact: ${volunteer.Contact}</p>
                <p class='card__location'>Location: ${volunteer.Location}</p>
                <p class='card__twitter'>X: <a target='_blank' href="https://x.com/${volunteer.Twitter}">@${volunteer.Twitter}</a></p>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function() {
    const volunteersContainer = document.getElementById('volunteers');
    const loadingElement = document.getElementById('loading');
    const searchInput = document.getElementById('searchInput');

    function loadVolunteers() {
        loadingElement.style.display = 'flex';
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                loadingElement.style.display = 'none';
                allVolunteers = data;
                displayVolunteers(allVolunteers);
                updateCategoryCounters();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                loadingElement.textContent = "An error occurred while fetching volunteers";
            });
    }

    function displayVolunteers(volunteers) {
        volunteersContainer.innerHTML = volunteers.map(createCard).join('');
    }

    function filterCategory(category) {
        const filteredVolunteers = category === 'All'
            ? allVolunteers
            : allVolunteers.filter(volunteer => volunteer.Category === category);
        displayVolunteers(filteredVolunteers);
    }

    function searchVolunteers() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredVolunteers = allVolunteers.filter(volunteer =>
            volunteer.Name.toLowerCase().includes(searchTerm) ||
            volunteer.Profession.toLowerCase().includes(searchTerm) ||
            volunteer.Location.toLowerCase().includes(searchTerm)
        );
        displayVolunteers(filteredVolunteers);
    }

    function updateCategoryCounters() {
        const counts = {
            All: allVolunteers.length,
            Medical: allVolunteers.filter(v => v.Category === 'Medical').length,
            Legal: allVolunteers.filter(v => v.Category === 'Legal').length,
            Other: allVolunteers.filter(v => v.Category === 'Other').length
        };

        document.querySelectorAll('.buttons button').forEach(button => {
            const category = button.getAttribute('data-category');
            button.querySelector('.badge').textContent = counts[category];
        });
    }

    let buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterCategory(category);
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    searchInput.addEventListener('input', searchVolunteers);

    loadVolunteers();
});
