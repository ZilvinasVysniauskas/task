import ContentProcessor from "./scripts/ContentProcessor/content-processor";
import CertificateProcessor from "./scripts/CertificateProcessor/certificate-processor";
import SponsoredProcessor from "./scripts/SponsoredProcessor/sponsored-processor";
import ElementsManager from "./elements/ElementsManager/elements-manager";


if (!/^https:\/\/www\.google\.[a-z]{2,}\/search\?/.test(window.location.href)) {
    console.log("This script must be used on a Google search page.");
} else {
    const elementsManager = new ElementsManager();
    const contentProcessor = new ContentProcessor(new CertificateProcessor(elementsManager), new SponsoredProcessor(), elementsManager);

    contentProcessor.loadInitialElement();
    contentProcessor.removeSponsoredUrls();
    contentProcessor.processUrlsForCertificate();
    contentProcessor.processDomUpdates();
}