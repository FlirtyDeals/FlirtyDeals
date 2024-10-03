document.addEventListener("DOMContentLoaded", function() {
    const acceptButton = document.getElementById("accept-button");
    const exitButton = document.getElementById("exit-button");
    const images = document.querySelectorAll(".blurred"); // Select all blurred images
    const headerImage = document.querySelector(".header img"); // Select header image
    const modal = document.getElementById("modal"); // Modal for age verification

    // Function to show the modal
    function showModal() {
        modal.style.display = "flex"; // Show the modal
    }

    // Function to hide the modal and remove blur
    function acceptImages() {
        images.forEach(image => {
            image.classList.remove("blurred");
        });
        if (headerImage) {
            headerImage.classList.remove("blurred");
        }
        modal.style.display = "none";
        localStorage.setItem("imagesAccepted", "true"); // Save acceptance in localStorage
    }

    // Function to redirect or close
    function exitPage() {
        window.location.href = "about:blank"; // Redirect to a blank page or custom URL
    }

    // Event listener for the accept button
    acceptButton.addEventListener("click", acceptImages);

    // Event listener for the exit button
    exitButton.addEventListener("click", exitPage);

    // Check if the user has already accepted
    if (localStorage.getItem("imagesAccepted")) {
        images.forEach(image => {
            image.classList.remove("blurred");
        });
        if (headerImage) {
            headerImage.classList.remove("blurred");
        }
    } else {
        showModal();
    }
});
