import CertificateProcessor from "./certificate-processor";

describe('CertificateProcessor', () => {
    let certificateProcessor;
    let elementsManagerMock;

    beforeEach(() => {
        elementsManagerMock = {
            secureUrlIcon: '<svg>Secure Icon</svg>',
            notSecureUrlIcon: '<svg>Not Secure Icon</svg>',
            revealInfoBox: jest.fn(),
            hideInfoBox: jest.fn(),
            revealUnsecureEnterBox: jest.fn()
        };

        certificateProcessor =  new CertificateProcessor(elementsManagerMock)
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('processNodeForCertificate', () => {
        test('should add element-processed attr', () => {
            const mockElement = createMockElement(true);
            certificateProcessor.processNodeForCertificate(mockElement);
            expect(mockElement.hasAttribute('element-processed')).toBeTruthy()
        });

        test('should not process if element contains element-processed attr', () => {
            const mockElement = createMockElement(true);
            mockElement.setAttribute('element-processed', 'true');

            const previousOuterHtml = mockElement.outerHTML;

            certificateProcessor.processNodeForCertificate(mockElement);
            expect(mockElement.outerHTML).toBe(previousOuterHtml);
        });

        test('should insert secure icon svg if url starts with https', () => {
            const mockElement = createMockElement(true);
            certificateProcessor.processNodeForCertificate(mockElement);
            expect(mockElement.querySelector('svg').outerHTML).toBe('<svg>Secure Icon</svg>');
        });

        test('should insert not secure icon svg if url start with http', () => {
            const mockElement = createMockElement(false);
            certificateProcessor.processNodeForCertificate(mockElement);
            expect(mockElement.querySelector('svg').outerHTML).toBe('<svg>Not Secure Icon</svg>');
        });

        test('should remove href from unsecure url', () => {
            const mockElement = createMockElement(false);
            certificateProcessor.processNodeForCertificate(mockElement);
            expect(mockElement.hasAttribute('href')).toBeFalsy();
        });

        test('should add click event listener', () => {
            const mockElement = createMockElement(false);
            const url = mockElement.getAttribute('href')
            certificateProcessor.processNodeForCertificate(mockElement);

            mockElement.dispatchEvent(new MouseEvent('click'));
            expect(elementsManagerMock.revealUnsecureEnterBox).toHaveBeenCalledWith(url);
            expect(elementsManagerMock.revealUnsecureEnterBox).toHaveBeenCalledTimes(1);
        });

        test('should add event listeners to mark icon', () => {
            const mockElement = createMockElement(true);
            certificateProcessor.processNodeForCertificate(mockElement);
            const markIcon = mockElement.querySelector('span');

            markIcon.dispatchEvent(new MouseEvent('mouseenter'));
            expect(elementsManagerMock.revealInfoBox).toHaveBeenCalledWith(true, markIcon);

            markIcon.dispatchEvent(new MouseEvent('mouseleave'));
            expect(elementsManagerMock.hideInfoBox).toHaveBeenCalledTimes(1);
        });
    })

})

const createMockElement = (isSecure) => {
    const mockElement = document.createElement('a');
    mockElement.setAttribute('href', `${isSecure ? 'https' : 'http'}://example.com`);
    mockElement.innerHTML = '<h3>title</h3>';
    return mockElement;
}