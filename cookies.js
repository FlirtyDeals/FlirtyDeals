// Get the cookie popup and the button
const cookiePopup = document.getElementById('cookie-popup');
const acceptCookiesButton = document.getElementById('accept-cookies');

// Function to hide the popup
function hidePopup() {
    cookiePopup.style.display = 'none';
}

// Check if cookies are accepted on page load
if (localStorage.getItem('cookiesAccepted')) {
    // Cookies have been accepted, do nothing
    hidePopup();
} else {
    // Show the popup if cookies have not been accepted
    cookiePopup.style.display = 'flex';
}

// Event listener for the button
acceptCookiesButton.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    hidePopup();
});

// Optional: Event listener for the learn more link
document.getElementById('learn-more').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    alert('Learn more about cookies at [your cookie policy link].'); // Replace with your actual link
});
