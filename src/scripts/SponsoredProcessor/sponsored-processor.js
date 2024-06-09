class SponsoredProcessor {
    removeSponsored(element) {
        const sponsoredMarkers = element.querySelectorAll('.uEierd')
        sponsoredMarkers.forEach(marker => marker.remove());

    };
}

export default SponsoredProcessor;