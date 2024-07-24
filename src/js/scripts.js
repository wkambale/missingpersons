 // Define the shareCard function globally
 function shareCard(id) {
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            const card = data.find((item) => item.id === id);
            const text = `NOTICE! This is a missing person: ${card.name}, status: ${card.status}, last seen at ${card.last_known_location}. #March2Parliament`;
            const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
        })
        .catch((error) => console.error("Error fetching data:", error));
}

 function parseCustomDateFormat(dateString) {
	 const [time, date] = dateString.split(' ');
	 const [hours, minutes] = time.split(':').map(Number);
	 const [day, month, year] = date.split('-').map(Number);
	 const parsedDate = new Date(year, month - 1, day, hours, minutes);
	 return parsedDate;
 }

 // Function to create the cards
 function createCard(card) {
    const takenTime = card.taken_time ? getRelativeTime(parseCustomDateFormat(card.taken_time)) : 'Unknown';
    const exactTime = card.taken_time ? parseCustomDateFormat(card.taken_time).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : 'Unknown';

    return `
        <div class="card" data-category="${card.status}">
            <div class="card-inner">
                <img class='card-img' src="${card.image}" alt="${card.name}">
                <h2 class='card__name'>${card.name}</h2>
                <p class='card-status ${card.status.toLowerCase()}'>${card.status}</p>
                <p class='card__office'>Taken by ${card.security_organ}</p>
                <p class='card__time' title="${exactTime}">Time: ${takenTime}</p>
                <p class='locations'>Last seen: ${card.last_known_location}</p>
                <p class='card__gender'>Gender: ${card.gender}</p>
                <p class='card__twitter'>X (Twitter): <a target='_blank' href="https://x.com/${card.twitter}">${card.twitter || "--"}</a></p>
                <p class='.card__currently'>Currently: ${card.holding_location || "--"}</p>
            </div>
            <button class="share-button twitter" onclick="shareCard(${card.id})">Share on X (Twitter)</button>
        </div>
    `;
}

 /**
  * Returns a relative time string based on the time a person was taken.
  *
  * @param {number} timestamp - The timestamp to calculate the relative time from.
  * @return {string} The relative time string.
  */
 function getRelativeTime(timestamp) {
	 const now = new Date();
	 const timeDiff = Math.abs(now - new Date(timestamp));
	 const seconds = Math.floor(timeDiff / 1000);
	 const minutes = Math.floor(seconds / 60);
	 const hours = Math.floor(minutes / 60);
	 const days = Math.floor(hours / 24);
	 const months = Math.floor(days / 30);
	 const years = Math.floor(months / 12);

	 if (seconds < 60) return `${seconds} seconds ago`;
	 if (minutes < 60) return `${minutes} minutes ago`;
	 if (hours < 24) return `${hours} hours ago`;
	 if (days < 30) return `${days} days ago`;
	 if (months < 12) return `${months} months ago`;
	 return `${years} years ago`;
 }

document.addEventListener("DOMContentLoaded", function() {
    // init pagination
    initPaginate();

    // onkeyup event, call searchFunction
    document.getElementById('searchInput').addEventListener('keyup', searchFunction);

    // Function to filter persons based on search input
    function searchFunction() {
        let input = document.getElementById('searchInput');
        let filter = input.value.toLowerCase();
        let persons = document.getElementById('persons');
        let blog = persons.getElementsByClassName('card');

        for (let i = 0; i < blog.length; i++) {
            let txtValue = blog[i].textContent || blog[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                blog[i].style.display = '';
            } else {
                blog[i].style.display = 'none';
            }
        }
    }

    // Function to filter persons based on category
    function filterCategory(category) {
        let persons = document.getElementById('persons');
        let person = persons.getElementsByClassName('card');

        for (let i = 0; i < person.length; i++) {
            if (category === 'All' || person[i].getAttribute('data-category') === category) {
                person[i].style.display = '';
            } else {
                person[i].style.display = 'none';
            }
        }
    }

    // Add event listeners to category buttons and manage active state
    let buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let category = button.getAttribute('data-category');
            filterCategory(category);

            // Remove 'active' class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');
        });
    });
});

/* 
    Pagination functionality
*/

// pagination configuration
const CONFIG = {
    url: `data.json`,
    personsPerPage: 12,
    scrollThreshold: 100,
    scrollDelay: 1500,
};

// DOM elements
const elements = {
    personsList: document.getElementById('persons'),
    loading: document.getElementById('loading')
};

// states
let state = {
    currentIndex: 1,
    isLoading: false,
    personsData: [],
    canLoadMore : false
};

// Fetch the persons data from date.json file
async function fetchData(){
    try{
        const response = await fetch(CONFIG.url);
        if(!response.ok){
            throw new error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }catch(error){
        state.isLoading = false;
        console.error("Error fetching data.", error);
        loadingElement.textContent = "An error occured while fetching persons";
        throw error;
    }
}

/**
 * Returns a person's element object
 *
 * @param {person} object - data.json object 
 */
function createPersonElement(person){
    const personElement = document.createElement('div');
    personElement.classList.add('person');

    const takenTime = person.taken_time ? getRelativeTime(parseCustomDateFormat(person.taken_time)) : 'Unknown';
    const exactTime = person.taken_time ? parseCustomDateFormat(person.taken_time).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : 'Unknown';

    personElement.innerHTML = `
        <div class="card" data-category="${person.status}">
            <div class="card-inner">
                <img class="card-img" src="${person.image}" alt="${person.name}">
                <h2 class='card__name'>${person.name}</h2>
                <p class='card-status ${person.status.toLowerCase()}'>${person.status}</p>
                <p class='card__office'>Taken by ${person.security_organ}</p>
                <p class='card__time' title="${exactTime}">Time: ${takenTime}</p>
                <p class='locations'>Last seen: ${person.last_known_location}</p>
                <p class='card__gender'>Gender: ${person.gender}</p>
                <p class='card__twitter'>X (Twitter): <a target='_blank' href="https://x.com/${person.twitter}">${person.twitter || "--"}</a></p>
                <p class='.card__currently'>Currently: ${person.holding_location || "--"}</p>
            </div>
            <button class="share-button twitter" onclick="shareCard(${person.id})">Share on X (Twitter)</button>
        </div>
    `;
    return personElement
}

// load persons
function loadPersons(){
    if(state.isLoading || state.currentIndex > state.personsData.length) return;
    
    state.isLoading = true;
    elements.loading.style.display = 'flex';

    const fragment = document.createDocumentFragment();
    const endIndex = Math.min((state.currentIndex + CONFIG.personsPerPage), state.personsData.length)

    for(let x = state.currentIndex; x < endIndex; x++){
        const personElement = createPersonElement(state.personsData[x]);
        fragment.appendChild(personElement);
    }

    elements.personsList.appendChild(fragment)
    state.currentIndex = endIndex;

    state.isLoading = false;
    elements.loading.style.display = 'flex';

    if(state.currentIndex >= state.personsData.length){
        state.canLoadMore  = false
    }
}

// Handle scroll event
function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - CONFIG.scrollThreshold) {
        elements.loading.style.display = 'flex';
        setTimeout(()=>{
            loadPersons();
        }, CONFIG.scrollDelay)
    }
}

// run pagination 
async function initPaginate(){
    state.personsData = await fetchData();
    loadPersons();
    window.addEventListener("scroll", handleScroll);
}
