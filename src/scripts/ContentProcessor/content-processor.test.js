import ContentProcessor from './content-processor';

describe('ContentProcessor', () => {
    let mockCertificateProcessor;
    let mockSponsoredProcessor;
    let mockElementsManager;
    let contentProcessor;

    beforeEach(() => {
        mockCertificateProcessor = {
            processNodeForCertificate: jest.fn(),
        };

        mockSponsoredProcessor = {
            removeSponsored: jest.fn(),
        };

        mockElementsManager = {
            loadInfobox: jest.fn(),
            loadUnsecureInfoBox: jest.fn(),
        };

        contentProcessor = new ContentProcessor(
            mockCertificateProcessor,
            mockSponsoredProcessor,
            mockElementsManager
        );
    });

    describe('loadInitialElement', () => {
        test('should call loadInfobox and loadUnsecureInfoBox', () => {
            contentProcessor.loadInitialElement();
            expect(mockElementsManager.loadInfobox).toHaveBeenCalledTimes(1);
            expect(mockElementsManager.loadUnsecureInfoBox).toHaveBeenCalledTimes(1);
        });
    });

    describe('removeSponsoredUrls', () => {
        test('should call removeSponsored with document.body', () => {
            contentProcessor.removeSponsoredUrls();
            expect(mockSponsoredProcessor.removeSponsored).toHaveBeenCalledWith(document.body);
        });
    });

    describe('processUrlsForCertificate', () => {
        test('should call processNodeForCertificate for each anchor element with href attribute', () => {
            document.body.innerHTML = `
                <a href="https://example.com"></a>
                <a></a>
                <a href="https://example.org"></a>
            `;

            contentProcessor.processUrlsForCertificate();
            expect(mockCertificateProcessor.processNodeForCertificate).toHaveBeenCalledTimes(2);
        });
    });

    describe('processDomUpdates', () => {
        test('should process nodes that contain URLs and remove sponsored links', () => {
            const mutationObserverMock = jest.fn(function MutationObserver(callback) {
                this.observe = jest.fn();
                this.trigger = (mockedMutationsList) => {
                    callback(mockedMutationsList, this);
                };
            });

            global.MutationObserver = mutationObserverMock;

            const nodeWithATag = document.createElement('div');
            nodeWithATag.innerHTML = '<a href="http://example.com"></a>';
            const nodeWithoutATag = document.createElement('div');
            const textNode = document.createTextNode('some text');

            const mockedMutationsList = [
                {
                    addedNodes: [nodeWithATag, nodeWithATag, nodeWithoutATag, textNode],
                },
            ];

            contentProcessor.processDomUpdates();

            mutationObserverMock.mock.instances[0].trigger(mockedMutationsList);

            expect(mockCertificateProcessor.processNodeForCertificate).toHaveBeenCalledTimes(2);
            expect(mockSponsoredProcessor.removeSponsored).toHaveBeenCalledTimes(3);
        });
    });
});
