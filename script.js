


document.addEventListener('DOMContentLoaded', () => {
    const createTokenBtn = document.querySelector('.create-new-token-btn');
    const popupOverlay = document.getElementById('createTokenPopup');

    if (createTokenBtn && popupOverlay) {
        createTokenBtn.addEventListener('click', () => {
            popupOverlay.style.display = 'flex';
        });

        popupOverlay.addEventListener('click', (event) => {
            // Close popup if clicked outside the content
            if (event.target === popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });
    }
});