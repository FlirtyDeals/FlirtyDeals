// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select all images and ribbons
    const cards = document.querySelectorAll('.special-card, .special-card2, .special-card3');

    cards.forEach((card) => {
        // Select the image within the card
        const img = card.querySelector('img');
        
        // Ensure the image starts blurred
        img.classList.add('blurred2');

        // Select the ribbon within the card
        const ribbon = card.querySelector('.ribbon, .ribbon2, .ribbon3');

        // Add click event listener to the ribbon
        ribbon.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            
            // Toggle the blur class to reveal/hide the image
            img.classList.toggle('blurred2');
        });
    });
});
