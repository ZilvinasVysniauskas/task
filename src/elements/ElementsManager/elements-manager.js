import * as unsecureBoxStyles from "../../styles/unsecure-enter-box.css";
import * as infoBoxStyles from "../../styles/info-box.css";

class ElementsManager {
    secureUrlIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
            <path fill="#63E6BE" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
        </svg>`;

    notSecureUrlIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
            <path fill="#ff1a1a" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
        </svg>`;

    #unsecureEnterBoxInnerHtml = `
            <h3><strong>Warning: Unsecure Website</strong></h3>
            <p>You are about to enter a website that does not use HTTPS. Your connection to this site might not be secure. Proceed with caution.</p>
            <div class="${unsecureBoxStyles.buttonContainer}">
                <a><button>Proceed</button></a>
                <button id="closeButton">Cancel</button>
            </div>`;

    #unsecureEnterBox = document.createElement('div');
    #infoBox = document.createElement('div');

    constructor() {
        this.#infoBox.className = infoBoxStyles.infoBox;
    }

    loadUnsecureInfoBox() {
        this.#unsecureEnterBox.classList.add(unsecureBoxStyles.unsecureEnterBox)

        this.#unsecureEnterBox.innerHTML = this.#unsecureEnterBoxInnerHtml;
        document.body.appendChild(this.#unsecureEnterBox);

        const closeButton = this.#unsecureEnterBox.querySelector('#closeButton');
        closeButton.addEventListener('click', () => {
            this.#unsecureEnterBox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    revealUnsecureEnterBox(sourceUrl) {
        this.#unsecureEnterBox.style.display = 'block';
        const newTop = window.scrollY + (window.innerHeight - this.#unsecureEnterBox.offsetHeight) / 2;
        this.#unsecureEnterBox.style.top = `${newTop}px`;
        const link = this.#unsecureEnterBox.querySelector('a');
        link.setAttribute('href', sourceUrl);
        document.body.style.overflow = 'hidden';
    }

    loadInfobox() {
        this.#infoBox.classList.add(infoBoxStyles.infoBox)
        document.body.appendChild(this.#infoBox);
    }

    revealInfoBox(isSecure, parentIcon) {
        const markRect = parentIcon.getBoundingClientRect();
        this.#infoBox.textContent = isSecure ? 'website is secure' : 'not secure website';
        this.#infoBox.style.top = `${window.scrollY + markRect.top + markRect.height / 2}px`;
        this.#infoBox.style.left = `${window.scrollX + markRect.left + markRect.width + 10}px`;
        this.#infoBox.classList.add(infoBoxStyles.infoBoxVisible);
    }

    hideInfoBox() {
        this.#infoBox.classList.remove(infoBoxStyles.infoBoxVisible);
    }
}

export default ElementsManager;
