document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('searchInput').addEventListener('keyup', searchFunction);

    function createCard(card) {
        const twitterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>`;
        const locationSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-location"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-10 12-10 12S2 17.5 2 12A10 10 0 0 1 12 2z"/><circle cx="12" cy="12" r="3"/></svg>`;

        return `
            <div class="card" data-category="${card.status}">
                <div class="card-inner">
                    <img class='card-img' src="${card.image}" alt="${card.name}">
                    <h2 class='card__name'>${card.name}</h2>
                    <p class='card-status ${card.status.toLowerCase()}'>${card.status}</p>
                    <p class='card__office'>Taken by ${card.security_organ}</p>
                    <p class='locations'>Last seen: ${card.last_known_location}</p>
                    <p class='card__gender'>Gender: ${card.gender}</p>
                    <a class="card-twitter card-button" target='__blank' href="https://x.com/${card.twitter}">${twitterSvg}<span>${card.twitter || "--"}</span></a>
                    <a class="card-location card-button" href="Loc:${card.holding_location}">${locationSvg}<span>Currently: ${card.holding_location || "--"}</span></a>
                </div>
                <button class="share-button twitter" onclick="shareCard(${card.id})">Share on X (Twitter)</button>
            </div>
        `;
    }

    function searchFunction() {
        let input = document.getElementById('searchInput');
        let filter = input.value.toLowerCase();
        let persons = document.getElementById('persons');
        let cards = persons.getElementsByClassName('card');

        for (let i = 0; i < cards.length; i++) {
            let txtValue = cards[i].textContent || cards[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                cards[i].style.display = '';
            } else {
                cards[i].style.display = 'none';
            }
        }

        updateCounters();
    }

    function filterCategory(category) {
        let persons = document.getElementById('persons');
        let cards = persons.getElementsByClassName('card');

        for (let i = 0; i < cards.length; i++) {
            if (category === 'All' || cards[i].getAttribute('data-category') === category) {
                cards[i].style.display = '';
            } else {
                cards[i].style.display = 'none';
            }
        }

        updateCounters();
    }

    function updateCounters() {
        let persons = document.getElementById('persons');
        let cards = persons.getElementsByClassName('card');

        let counts = {
            All: 0,
            Missing: 0,
            Arrested: 0,
            Fallen: 0,
            Kidnapped: 0,
            Found: 0
        };

        for (let i = 0; i < cards.length; i++) {
            let category = cards[i].getAttribute('data-category');
            counts[category]++;
            counts['All']++;
        }

        document.getElementById('all-count').textContent = counts['All'];
        document.getElementById('missing-count').textContent = counts['Missing'];
        document.getElementById('arrested-count').textContent = counts['Arrested'];
        document.getElementById('fallen-count').textContent = counts['Fallen'];
        document.getElementById('kidnapped-count').textContent = counts['Kidnapped'];
        document.getElementById('found-count').textContent = counts['Found'];
    }

    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            const container = document.querySelector("#persons");
            data.forEach((card) => {
                container.innerHTML += createCard(card);
            });
            updateCounters(); // Update counters after data is loaded
        })
        .catch((error) => console.error("Error fetching data:", error));

    let buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let category = button.getAttribute('data-category');
            filterCategory(category);

            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});
