const SECURE_URL_SVG = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#63E6BE" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>'
const INSECURE_URL_SVG = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff1a1a" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>'
const processNodeForCertificate = (element) => {
    const linkUrl = element.getAttribute('href');
    const linkTextElement = element.querySelector('h3');
    if (linkTextElement) {
        if (linkUrl.startsWith('https')) {
            insertMarkToElement(linkTextElement, true)

        } else if (linkUrl.startsWith('http')) {
            insertMarkToElement(linkTextElement, false)
        } else {
            console.log(linkUrl)
        }
    } else {
        //todo REMOVE
        // console.log(element)
    }
}

const mutationCallback = (mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const addedSites = node.querySelectorAll('a[href]');
                    for (let i = 0; i < addedSites.length; i++) {
                        processNodeForCertificate(addedSites[i])
                    }
                }
            });
        }
    }
};

const insertMarkToElement = (element, isPositive) => {
    const newElement = document.createElement('div');
    const svg = isPositive ? SECURE_URL_SVG : INSECURE_URL_SVG;
    newElement.innerHTML = `<div class="mark"><h3>${element.innerHTML}</h3>${svg}</div>`
    element.parentNode.replaceChild(newElement, element)
}

const elements = document.querySelectorAll('a[href]');
for (let i = 0; i < elements.length; i++) {
    processNodeForCertificate(elements[i])
}
let observer = new MutationObserver(mutationCallback)
observer.observe(document.body, {childList: true, subtree: true})