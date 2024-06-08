import * as markStyles from '../../styles/mark.css';

class CertificateProcessor {
    #elementsManager;
    #elementProcessedAttr = 'element-processed';

    constructor(elementsManager) {
        this.#elementsManager = elementsManager;
    }

    processNodeForCertificate(element) {
        if (!element.hasAttribute(this.#elementProcessedAttr)) {
            const linkUrl = element.getAttribute('href');
            const linkTextElement = element.querySelector('h3');

            if (linkTextElement && !linkUrl.startsWith('https://www.google.com/search?')) {
                if (linkUrl.startsWith('https')) {
                    this.#insertMarkToElement(linkTextElement, true);
                } else if (linkUrl.startsWith('http')) {
                    this.#insertMarkToElement(linkTextElement, false);
                    this.#processInsecureElement(element, linkUrl);
                }
            }

            element.setAttribute(this.#elementProcessedAttr, 'true');
        }
    }

    #insertMarkToElement(element, isPositive) {
        const newElement = document.createElement('div');
        const svg = isPositive ? this.#elementsManager.secureUrlIcon : this.#elementsManager.notSecureUrlIcon;
        newElement.innerHTML = `
            <div class="${markStyles.mark}">
                <h3>${element.innerHTML}<span>${svg}</span></h3>
            </div>
        `;

        const markIcon = newElement.querySelector('span');
        markIcon.addEventListener('mouseenter', () => {
            this.#elementsManager.revealInfoBox(isPositive, markIcon);
        });
        markIcon.addEventListener('mouseleave', () => {
            this.#elementsManager.hideInfoBox();
        });

        element.parentNode.replaceChild(newElement, element);
    }

    #processInsecureElement(element, url) {
        element.removeAttribute('href');
        element.style.cursor = 'pointer';
        element.addEventListener('click', () => {
            this.#elementsManager.revealUnsecureEnterBox(url);
        });
    }
}

export default CertificateProcessor;
