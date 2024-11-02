const words = ["Adult", "Blows", "Cocks", "Cream", "Dicks", "Dildo", "Flirt", "Girth", "Horny", "Kinky", "Lusty", "Milfs", "Moans", "Naked", "Nasty", "Rides", "Sassy", "Sluts", "Smut", "Sperm", "Spicy", "Taint", "Tasty", "Tease", "Thong", "Wives", "Blush", "Boobs", "Bimbo", "Choke", "Piped", "Prick", "Risen", "Shags", "Spank", "Stiff", "Twink", "Jacks", "Licks", "Scent", "Twats", "Porno", "Juicy", "Angel", "Beast", "Peach", "Melon"];
const targetWord = words[Math.floor(Math.random() * words.length)].toLowerCase();

let currentRow = 0;
let currentCol = 0;
const maxGuesses = 6;

document.addEventListener("DOMContentLoaded", () => {
    createGameBoard();
    if (!isMobileDevice()) {
        setupKeyboard(); // Only set up the keyboard if not on mobile
    }
});

// Function to check if the device is mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent); // Check user agent for mobile devices
}

function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    for (let i = 0; i < maxGuesses; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("id", `row-${i}-col-${j}`);
            gameBoard.appendChild(tile);

            // Focus on the first tile to trigger the keyboard on mobile
            if (i === 0 && j === 0) {
                tile.addEventListener("click", () => {
                    tile.contentEditable = true; // Make tile editable to trigger keyboard
                    tile.focus(); // Focus on the tile
                    tile.addEventListener("input", (event) => {
                        const input = event.target.textContent.toLowerCase();
                        if (/^[a-z]$/.test(input)) {
                            handleKeyPress(input); // Process input
                        }
                    });
                });
            }
        }
    }
}

function setupKeyboard() {
    // Handle physical keyboard input
    document.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        if (key === "enter") {
            handleKeyPress("enter");
        } else if (key === "backspace") {
            handleKeyPress("backspace");
        } else if (/^[a-z]$/.test(key)) {
            handleKeyPress(key);
        }
    });

    // Handle on-screen keyboard input
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
        key.addEventListener("click", (event) => {
            const keyText = event.target.textContent.toLowerCase();
            handleKeyPress(keyText === "backspace" ? "backspace" : keyText);
        });
    });
}

function handleKeyPress(key) {
    if (key === "enter") {
        if (currentCol === 5) {
            checkGuess();
        }
        animateKey("enter-key");
    } else if (key === "backspace") {
        if (currentCol > 0) {
            currentCol--;
            updateTile("");
        }
        animateKey("backspace-key");
    } else if (/^[a-z]$/.test(key) && currentCol < 5) {
        updateTile(key);
        currentCol++;
        animateKeyByLetter(key);
    }
}

function updateTile(letter) {
    const tile = document.getElementById(`row-${currentRow}-col-${currentCol}`);
    tile.textContent = letter.toUpperCase();
}

function checkGuess() {
    const guess = [];
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-col-${i}`);
        guess.push(tile.textContent.toLowerCase());
    }

    const guessWord = guess.join('');

    // Check for cheat or loser special cases
    if (guessWord === "cheat") {
        highlightWin();
        showWinPopup(); // Show win message when typing "cheat"
        return;
    }

    if (guessWord === "loser") {
        endGame(`You triggered a loss! The word was: ${targetWord}`);
        return;
    }

    // Check if the guess is the correct word
    if (guessWord === targetWord) {
        highlightWin(); // Highlight all tiles as correct
        showWinPopup(); // Show win message
        return; // Exit function
    }

    // Store which letters have been marked to avoid double counting
    const checkedIndices = Array(5).fill(false);

    // First pass: check for correct letters in the correct position
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-col-${i}`);
        const letter = guess[i];

        if (targetWord[i] === letter) {
            tile.classList.add("correct");
            checkedIndices[i] = true; // Mark this index as checked
        }
    }

    // Second pass: check for present letters (in the wrong position)
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-col-${i}`);
        const letter = guess[i];

        if (!checkedIndices[i]) { // Only check letters that haven't been marked as correct
            if (targetWord.includes(letter) && !checkedIndices[targetWord.indexOf(letter)]) {
                tile.classList.add("present");
            } else {
                tile.classList.add("absent");
            }
        }
    }

    currentRow++;
    currentCol = 0;

    if (currentRow === maxGuesses) {
        endGame(`Game Over! The word was: ${targetWord}`);
    }
}

function highlightWin() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-col-${i}`);
        tile.classList.add("correct");
    }
}

function showWinPopup() {
    createPopup("Congratulations! You've guessed the word!", "🎉", "win");
}

function endGame(message) {
    createPopup(`Game Over! The word was: ${targetWord}`, "😢", "game-over");
    document.removeEventListener("keydown", handleKeyPress);
}

function createPopup(messageText, icon, type) {
    const popup = document.createElement("div");
    popup.classList.add("popup", type); // Add class for styling

    const messageIcon = document.createElement("div");
    messageIcon.classList.add("message-icon");
    messageIcon.textContent = icon;
    popup.appendChild(messageIcon);

    const message = document.createElement("h1"); // Create an h1 element for the message
    message.innerText = messageText;
    popup.appendChild(message);

    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popup);
    });

    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}

function animateKey(keyId) {
    const key = document.getElementById(keyId);
    if (key) {
        key.classList.add("pressed");
        setTimeout(() => key.classList.remove("pressed"), 150);
    }
}

function animateKeyByLetter(letter) {
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
        if (key.textContent.toLowerCase() === letter) {
            key.classList.add("pressed");
            setTimeout(() => key.classList.remove("pressed"), 150);
        }
    });
}
