const words = ["Adult", "Blows", "Cocks", "Cream", "Dicks", "Dildo", "Flirt", "Girth", "Horny", "Kinky", "Lusty", "Milfs", "Moans", "Naked", "Nasty", "Rides", "Sassy", "Sluts", "Smut", "Sperm", "Spicy", "Taint", "Tasty", "Tease", "Thong", "Wives", "Blush", "Boobs", "Bimbo", "Choke", "Piped", "Prick", "Risen", "Shags", "Spank", "Stiff", "Twink", "Jacks", "Licks", "Scent", "Twats", "Porno", "Juicy", "Angel", "Beast", "Peach", "Melon"];
const targetWord = words[Math.floor(Math.random() * words.length)].toLowerCase();

let currentRow = 0;
let currentCol = 0;
const maxGuesses = 6;

document.addEventListener("DOMContentLoaded", () => {
    createGameBoard();
    setupKeyboard(); // Setup keyboard for both mobile and desktop
});

// Create the game board
function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    for (let i = 0; i < maxGuesses; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("id", `row-${i}-col-${j}`);
            gameBoard.appendChild(tile);

            // Mobile: make tile editable on touch
            tile.addEventListener("click", () => {
                tile.contentEditable = true; // Make tile editable
                tile.focus(); // Focus on the tile
            });

            // Handle input for mobile
            tile.addEventListener("input", (event) => {
                const input = event.target.textContent.toLowerCase();
                if (/^[a-z]$/.test(input)) {
                    handleKeyPress(input); // Process valid input
                    tile.contentEditable = false; // Make tile non-editable after input
                    focusNextTile(); // Move to the next tile
                } else {
                    tile.textContent = ""; // Clear invalid input
                }
            });
        }
    }
    // Focus on the first tile
    document.getElementById("row-0-col-0").focus();
}

// Setup keyboard events
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

// Handle key presses
function handleKeyPress(key) {
    if (key === "enter") {
        if (currentCol === 5) {
            checkGuess();
        }
    } else if (key === "backspace") {
        if (currentCol > 0) {
            currentCol--;
            updateTile(""); // Clear the last letter
        }
    } else if (/^[a-z]$/.test(key) && currentCol < 5) {
        updateTile(key);
        currentCol++;
    }
}

// Update the current tile with the letter
function updateTile(letter) {
    const tile = document.getElementById(`row-${currentRow}-col-${currentCol}`);
    tile.textContent = letter.toUpperCase();
}

// Check the guessed word against the target word
function checkGuess() {
    const guess = [];
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-col-${i}`);
        guess.push(tile.textContent.toLowerCase());
    }

    const guessWord = guess.join('');

    // Special cases for "cheat" and "loser"
    if (guessWord === "cheat") {
        highlightWin();
        showWinPopup();
        return;
    }

    if (guessWord === "loser") {
        endGame(`You triggered a loss! The word was: ${targetWord}`);
        return;
    }

    // Check if the guess is correct
    if (guessWord === targetWord) {
        highlightWin();
        showWinPopup();
        return;
    }

    // Array to keep track of correct letters
    const checkedIndices = Array(5).fill(false);

    // Check for correct letters in the correct position
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-col-${i}`);
        const letter = guess[i];

        if (targetWord[i] === letter) {
            tile.classList.add("correct");
            checkedIndices[i] = true; // Mark this index as checked
        }
    }

    // Check for present letters (in the wrong position)
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

// Highlight the winning tiles
function highlightWin() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-col-${i}`);
        tile.classList.add("correct");
    }
}

// Show a winning popup
function showWinPopup() {
    createPopup("Congratulations! You've guessed the word!", "🎉", "win");
}

// End the game with a message
function endGame(message) {
    createPopup(message, "😢", "game-over");
    document.removeEventListener("keydown", handleKeyPress);
}

// Create a popup for game messages
function createPopup(messageText, icon, type) {
    const popup = document.createElement("div");
    popup.classList.add("popup", type); // Add class for styling

    const messageIcon = document.createElement("div");
    messageIcon.classList.add("message-icon");
    messageIcon.textContent = icon;
    popup.appendChild(messageIcon);

    const message = document.createElement("h1");
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

// Focus the next tile after entering a letter
function focusNextTile() {
    if (currentCol < 5) {
        const nextTile = document.getElementById(`row-${currentRow}-col-${currentCol}`);
        nextTile.focus();
    }
}
