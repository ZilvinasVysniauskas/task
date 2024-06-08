class SponsoredProcessor {
    removeSponsored(element) {
        const sponsoredMarkers = element.querySelectorAll('span')
        for (let marker of sponsoredMarkers) {
            if (marker.textContent.trim().toLowerCase() === 'ad' || marker.textContent.trim().toLowerCase() === 'sponsored') {
                marker.parentNode.remove();
            }
        }
    };
}

export default SponsoredProcessor;