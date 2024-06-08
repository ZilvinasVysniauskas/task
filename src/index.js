import ContentProcessor from "./scripts/ContentProcessor/content-processor";
import CertificateProcessor from "./scripts/CertificateProcessor/certificate-processor";
import SponsoredProcessor from "./scripts/SponsoredProcessor/sponsored-processor";
import ElementsManager from "./elements/ElementsManager/elements-manager";


const elementsManager = new ElementsManager();
const contentProcessor = new ContentProcessor(new CertificateProcessor(elementsManager), new SponsoredProcessor(), elementsManager);

contentProcessor.loadInitialElement();
contentProcessor.removeSponsoredUrls();
contentProcessor.processUrlsForCertificate();
contentProcessor.processDomUpdates();