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
    // onkeyup event, call searchFunction
    document.getElementById('searchInput').addEventListener('keyup', searchFunction);

    function createCard(card) {
        const twitterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>`;
        const locationSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-location"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-10 12-10 12S2 17.5 2 12A10 10 0 0 1 12 2z"/><circle cx="12" cy="12" r="3"/></svg>`;

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
                    <a class="card-twitter card-button" target='__blank' href="https://x.com/${card.twitter}">${twitterSvg}<span>${card.twitter || "--"}</span></a>
                    <a class="card-location card-button" href="Loc:${card.holding_location}">${locationSvg}<span>Currently: ${card.holding_location || "--"}</span></a>
                </div>
                <button class="share-button twitter" onclick="shareCard(${card.id})">Share on X (Twitter)</button>
            </div>
        `;
    }

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
        personCount();
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
        personCount();
    }

    // Function to update person count
    function personCount() {
        let persons = document.getElementById('persons');
        let visiblePersons = persons.getElementsByClassName('card');
        let visibleCount = 0;
        
        for (let i = 0; i < visiblePersons.length; i++) {
            if (visiblePersons[i].style.display !== 'none') {
                visibleCount++;
            }
        }

        const statElement = document.querySelector("#person-count .stat");
        statElement.innerText = `${visibleCount}`;
    }

    // Hydrate the data to HTML.
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            const container = document.querySelector("#persons");
            data.forEach((card) => {
                container.innerHTML += createCard(card);
            });
            personCount(); // Update count after initial load
        })
        .catch((error) => console.error("Error fetching data:", error));

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
