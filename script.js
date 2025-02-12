const colorBox = document.querySelector('.color-box');
const colorOptions = document.querySelectorAll('.color-option');
const gameStatus = document.getElementById('gameStatus');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('newGameButton');

let targetColor;
let score = 0;
let colors = [];

// Function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to generate a new set of colors and target
function generateColors() {
    colors = [];
    for (let i = 0; i < 6; i++) {
        colors.push(getRandomColor());
    }
    targetColor = colors[Math.floor(Math.random() * 6)];
}

// Function to update the UI with the current colors
function updateGame() {
    colorBox.style.backgroundColor = targetColor;
    colorOptions.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.onclick = () => checkGuess(button, colors[index]);
    });

    colorBox.classList.remove("win-effect");
}

// Function to check the player's guess
function checkGuess(button, selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreDisplay.textContent = score;

        button.classList.add("correct-guess");
        colorBox.classList.add("win-effect");

        setTimeout(() => {
            button.classList.remove("correct-guess");
            generateColors();
            updateGame();
        }, 500);
    } else {
        gameStatus.textContent = "Wrong! Try Again.";
        gameStatus.style.color = "red";

        score = Math.max(0, score - 0.5);
        scoreDisplay.textContent = score;

        button.classList.add("wrong-guess");

        setTimeout(() => {
            button.classList.remove("wrong-guess");
        }, 500);
        if (score === 0) {
            endGame();
        }
    }
}
// Function to handle Game Over
function endGame() {
    gameOver = true;
    gameStatus.textContent = "Game Over! Click 'New Game' to restart.";
    gameStatus.style.color = "darkred";

    // Disable all color buttons
    colorOptions.forEach(button => {
        button.onclick = null;
        button.style.opacity = "0.5"; 
        button.style.cursor = "not-allowed"; 
    });
}


// Function to start a new game
function newGame() {
    score = 5; // Reset score
    gameOver = false; // Reset game state
    scoreDisplay.textContent = score;
    gameStatus.textContent = "Make a guess!";
    gameStatus.style.color = "black";

    colorOptions.forEach(button => {
        button.style.opacity = "1"; 
        button.style.cursor = "pointer";
    });

    generateColors();
    updateGame();
}

// Event listener for new game button
newGameButton.addEventListener('click', newGame);
newGame();