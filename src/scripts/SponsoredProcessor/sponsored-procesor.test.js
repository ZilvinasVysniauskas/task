import SponsoredProcessor from './sponsored-processor';

describe('SponsoredProcessor', () => {
    let sponsoredProcessor;

    beforeEach(() => {
        sponsoredProcessor = new SponsoredProcessor();
    });

    describe('removeSponsored', () => {
        test('should remove elements containing "uEierd" class', () => {
            const mockElement = document.createElement('div');
            mockElement.innerHTML = `
                <div class="uEierd"><span>Sponsored</span></div>
                <div><span>not-sponsored</span></div>
            `;

            sponsoredProcessor.removeSponsored(mockElement);

            expect(mockElement.outerHTML).not.toContain('Sponsored');
            expect(mockElement.outerHTML).toContain('not-sponsored');
        });
    });
});
