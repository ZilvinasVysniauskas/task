
class ContentProcessor {
    #elementsManager;
    #sponsoredProcessor;
    #certificateProcessor;

    constructor(certificateProcessor, sponsoredProcessor, elementsManager) {
        this.#certificateProcessor = certificateProcessor;
        this.#sponsoredProcessor = sponsoredProcessor;
        this.#elementsManager = elementsManager;
    }

    loadInitialElement() {
        this.#elementsManager.loadInfobox();
        this.#elementsManager.loadUnsecureInfoBox();
    }

    removeSponsoredUrls() {
        this.#sponsoredProcessor.removeSponsored(document.body);
    }

    processUrlsForCertificate() {
        const elements = document.querySelectorAll('a[href]');
        for (let i = 0; i < elements.length; i++) {
            this.#certificateProcessor.processNodeForCertificate(elements[i])
        }
    }

    processDomUpdates() {
        let observer = new MutationObserver(this.#mutationCallback)
        observer.observe(document.body, {childList: true, subtree: true, attributes: true})
    }

    #mutationCallback = (mutationsList) => {
        for (let mutation of mutationsList) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const addedSites = node.querySelectorAll('a[href]');
                    for (let i = 0; i < addedSites.length; i++) {
                        this.#certificateProcessor.processNodeForCertificate(addedSites[i]);
                    }
                }
            });
        }
    }
}

export default ContentProcessor;