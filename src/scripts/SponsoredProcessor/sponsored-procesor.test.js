import SponsoredProcessor from './sponsored-processor';

const createMockElement = (html) => {
    const element = document.createElement('div');
    element.innerHTML = html;
    return element;
};

describe('SponsoredProcessor', () => {
    let sponsoredProcessor;

    beforeEach(() => {
        sponsoredProcessor = new SponsoredProcessor();
    });

    describe('removeSponsored', () => {
        test('should remove elements with "sponsored" text', () => {
            const htmlContent = `<div><span>Sponsored</span></div><div><span>not-sponsored</span></div>`;
            const mockElement = createMockElement(htmlContent);
            sponsoredProcessor.removeSponsored(mockElement);
            expect(mockElement.outerHTML).not.toMatch(/Sponsored/);
            expect(mockElement.outerHTML).toMatch(/not-sponsored/);
        });
    });
});
