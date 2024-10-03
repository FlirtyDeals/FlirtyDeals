document.addEventListener('DOMContentLoaded', function () {
    // Get the video element
    const topDealCard = document.querySelector('.top-deal');
    const video = topDealCard.querySelector('.video');
    
    // Add mouseover event to play the video
    topDealCard.addEventListener('mouseenter', function () {
        video.style.display = 'block'; // Show the video
        video.play(); // Play the video
    });

    // Add mouseleave event to pause the video
    topDealCard.addEventListener('mouseleave', function () {
        video.pause(); // Pause the video
        video.currentTime = 0; // Reset video to start
        video.style.display = 'none'; // Hide the video
    });
});