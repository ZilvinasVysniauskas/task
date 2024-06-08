import ContentProcessor from "./scripts/content-processor";
import CertificateProcessor from "./scripts/certificate-processor";
import SponsoredProcessor from "./scripts/sponsored-processor";
import ElementsManager from "./elements/elements-manager";


const elementsManager =  new ElementsManager();
const contentProcessor = new ContentProcessor(new CertificateProcessor(elementsManager), new SponsoredProcessor(), elementsManager);

contentProcessor.loadInitialElement();
contentProcessor.removeSponsoredUrls();
contentProcessor.processUrlsForCertificate();
contentProcessor.processDomUpdates();