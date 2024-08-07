const personTemplate = document.createElement('template');
    personTemplate.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }
        .card {
          height: 93%;
          background-color: var(--card-bg);
          border-radius: 15px;
          padding: 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .card:hover {
            background-color: var(--card-hover-bg);
        }

        .card-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 0 auto 1rem;
            object-fit: cover;
            border: 2px solid var(--white);
        }

        .card__name {
            font-size: 1.2rem;
            margin-bottom: 0.6rem;
            font-weight: 700;
        }

        .card-status {
          font-size: 0.8rem;
          margin-bottom: 1rem;
          color: var(--white);
          background-color: var(--purple);
          display: inline-block;
          border-radius: 12px;
          padding: 0.3rem 1rem;
        }
        
        .card-status.remanded { background-color: var(--yellow); color: var(--black); }
        .card-status.fallen { background-color: var(--red); }
        .card-status.missing { background-color: var(--blue); }
        .card-status.released { background-color: var(--green); }

        .share-button {
          background-color: var(--blue);
          border: none;
          color: var(--white);
          padding: 0.7rem;
          cursor: pointer;
          border-radius: 20px;
          width: 100%;
          font-size: 0.9rem;
          transition: background-color 0.3s ease;
          margin-top: auto;
        }
        
        .share-button:hover {
          background-color: #0056b3;
        }

        .card__twitter {
          font-size: 0.9rem;
          margin-bottom: 1rem;
          word-break: break-all;
        }
        
      </style>
      <div class="card">
        <div class="card-inner">
          <img class="card-img">
          <h2 class="card__name"></h2>
          <p class="card-status"></p>
          <p class="card__office">Taken by <slot name="security-organ"></slot></p>
          <p class="card__time">Time: <slot name="time-taken"></slot></p>
          <p class="locations">Last seen: <slot name="last-known-location"></slot></p>
          <p class="card__gender">Gender: <slot name="gender"></slot></p>
          <p class="card__twitter">X: <a target="_blank"></a></p>
          <p class="card__currently">Current Location: <slot name="holding-location"></slot></p>
        </div>
        <button class="share-button twitter">Share on X</button>
      </div>
    `;

class PersonCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(personTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['name', 'status', 'security-organ', 'time-taken', 'last-known-location', 'gender', 'twitter-handle', 'holding-location', 'photo-url', 'id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    // Set non-slot content
    this.shadowRoot.querySelector('.card-img').src = this.getAttribute('photo-url') || '';
    this.shadowRoot.querySelector('.card-img').alt = this.getAttribute('name') || '';
    this.shadowRoot.querySelector('.card__name').textContent = this.getAttribute('name') || '';

    const status = this.getAttribute('status') || '';
    const statusElement = this.shadowRoot.querySelector('.card-status');
    statusElement.textContent = status;
    statusElement.className = `card-status ${status.toLowerCase()}`;

    const twitterHandle = this.getAttribute('twitter-handle') || '--';
    const twitterLink = this.shadowRoot.querySelector('.card__twitter a');
    twitterLink.href = `https://x.com/${twitterHandle}`;
    twitterLink.textContent = twitterHandle;

    this.shadowRoot.querySelector('.share-button').addEventListener('click', this.shareCard.bind(this));
  }

  shareCard() {
    const name = this.getAttribute('name');
    const status = this.getAttribute('status');
    const lastKnownLocation = this.getAttribute('last-known-location');

    let text;
    if (status.toLowerCase() === "released") {
      text = `GOOD NEWS🖐!!!! ${name}, who was previously missing, has been released. They were last held at ${lastKnownLocation || 'Unknown'}. #March2Parliament`;
    } else {
      text = `NOTICE! This is a missing person: ${name}, status: ${status}, last seen at ${lastKnownLocation || 'Unknown'}. #March2Parliament`;
    }

    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }
}

customElements.define('person-card', PersonCard);