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
        elements.forEach(element => {
            this.#certificateProcessor.processNodeForCertificate(element);
        });
    }

    processDomUpdates() {
        const observer = new MutationObserver(this.#mutationCallback);
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    }

    #mutationCallback = (mutationsList) => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const addedSites = node.querySelectorAll('a[href]');
                    addedSites.forEach(site => {
                        this.#certificateProcessor.processNodeForCertificate(site);
                    });
                }
            });
        });
    }
}

export default ContentProcessor;
