function createCard(card) {
	const twitterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>`;
	const locationSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-location"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-10 12-10 12S2 17.5 2 12A10 10 0 0 1 12 2z"/><circle cx="12" cy="12" r="3"/></svg>`;

	const nameElm = `<h2 class='card-name'>${card.name}</h2>`;
	const imageElm = `<img class='card-img' src="${card.image}" alt="${card.name}">`;
	const statusElm = `<p class='card-status ${card.status.toLowerCase()}'>${card.status}</p>`;
	const securityElm = `<p class='card-office'>${card.security_organ}</p>`;
	const locationsElm = `<p class='locations'>Last Location: ${card.last_known_location}</p>`;
	const sexElm = `<p class='card-sex'>Sex: ${card.sex}</p>`;
	const twitterElm = `
        <a class="card-twitter card-button" target='__blank' href="https://x.com/${card.twitter}">
            ${twitterSvg}
            <span>${card.twitter || "--"}</span>
        </a>
    `;
	const locationElm = `
        <a class="card-location card-button" href="Loc:${card.holding_location}">
            ${locationSvg}
            <span>${card.holding_location || "--"}</span>
        </a>
    `;
	const shareButton = `
        <button class="share-button" onclick="shareCard(${card.id})">Share</button>
    `;

	return `
        <div class="card">
            <div class="card-inner">
                ${imageElm}
                ${nameElm}
                ${statusElm}
                ${securityElm}
                ${locationsElm}
                ${sexElm}
                ${twitterElm}
                ${locationElm}
            </div>
            ${shareButton}
        </div>
    `;
}

function shareCard(id) {
	fetch("data.json")
		.then((response) => response.json())
		.then((data) => {
			const card = data.find((item) => item.id === id);
			const text = `Check out this missing person: ${card.name}, status: ${card.status}, last seen at ${card.last_known_location}. #March2Parliament`;
			const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
			window.open(url, "_blank");
		})
		.catch((error) => console.error("Error fetching data:", error));
}

document.addEventListener("DOMContentLoaded", () => {
	fetch("data.json")
		.then((response) => response.json())
		.then((data) => {
			const container = document.querySelector(".card-container");
			data.forEach((card) => {
				container.innerHTML += createCard(card);
			});
		})
		.catch((error) => console.error("Error fetching data:", error));
});