import ElementsManager from './elements-manager';
describe('ElementsManager', () => {
    let elementsManager;

    beforeEach(() => {
        elementsManager = new ElementsManager();
        document.body.innerHTML = '';
    });

    describe('loadUnsecureInfoBox()', () => {
        test('should create and append unsecureEnterBox with propper content', () => {
            elementsManager.loadUnsecureInfoBox();
            const unsecureEnterBox = document.body.querySelector('div')
            expect(unsecureEnterBox).not.toBeNull()
            expect(unsecureEnterBox.querySelectorAll('h3').length).toBe(1);
            expect(unsecureEnterBox.querySelectorAll('p').length).toBe(1);
            expect(unsecureEnterBox.querySelectorAll('button').length).toBe(2);
        });
        test('should register click listener for closeButton and on click hide box and reveal overflow', () => {
            elementsManager.loadUnsecureInfoBox();
            const unsecureEnterBox = document.body.querySelector('div')
            const closeButton = unsecureEnterBox.querySelector('#closeButton');

            closeButton.dispatchEvent(new MouseEvent('click'));
            expect(unsecureEnterBox.style.display).toBe('none')
            expect(document.body.style.overflow).toBe('auto')
        });
    });

    describe('revealUnsecureEnterBox()', () => {
        test('should display unsecureEnterBox and set link href', () => {
            const url = 'http://example.com';
            elementsManager.loadUnsecureInfoBox();
            elementsManager.revealUnsecureEnterBox(url);

            expect(document.body.querySelector('div').style.display).toBe('block');
            expect(document.body.querySelector('div a').getAttribute('href')).toBe(url);
        });
    });

    describe('loadInfobox()', () => {
        test('should create and append infoBox', () => {
            elementsManager.loadInfobox();
            expect(document.body.querySelector('div')).not.toBeNull();
        });
    });

    describe('revealInfoBox()', () => {
        test('should display infoBox with website is secure text when website is secure', () => {
            elementsManager.loadInfobox();
            const infoBox = document.body.querySelector('div');

            const parentIcon = document.createElement('div');
            document.body.appendChild(parentIcon);

            elementsManager.revealInfoBox(true, parentIcon);
            expect(infoBox.innerHTML).toBe('website is secure');
        });
        test('should display infoBox with not secure website text when website is not secure', () => {
            elementsManager.loadInfobox();
            const infoBox = document.body.querySelector('div');

            const parentIcon = document.createElement('div');
            document.body.appendChild(parentIcon);

            elementsManager.revealInfoBox(false, parentIcon);
            expect(infoBox.innerHTML).toBe('not secure website');
        });
    });

    describe('hideInfoBox()', () => {
        test('should remove style', () => {
            elementsManager.loadInfobox();
            const infoBox = document.body.querySelector('div');
            expect(infoBox.classList.length).toBe(1)

            elementsManager.hideInfoBox();

            expect(infoBox.classList.length).toBe(0)
        });
    });
});
