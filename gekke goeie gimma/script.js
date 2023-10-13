// Variabelen
const playerDice = document.getElementById("playerDice");
const computerDice = document.getElementById("computerDice");
const startButton = document.getElementById("startButton");
const higherButton = document.getElementById("higherButton");
const lowerButton = document.getElementById("lowerButton");
const rollDiceButton = document.getElementById("rollDiceButton");
const betInput = document.getElementById("betInput");
const placeBetButton = document.getElementById("placeBetButton");
const scoreDisplay = document.getElementById("score");
const resultMessage = document.getElementById("resultMessage");

let playerCredits = 100;
let computerCredits = 100;
let playerRoll, computerRoll;

startButton.addEventListener("click", startGame);

function startGame() {
    playerCredits = 100;
    computerCredits = 100;
    playerRoll = 0;
    computerRoll = 0;
    resultMessage.textContent = "";

    startButton.disabled = true;
    rollDiceButton.disabled = false;
    rollDiceButton.classList.remove("disabled");
    betInput.disabled = false;
    placeBetButton.disabled = false;

    updateScore();
}

rollDiceButton.addEventListener("click", () => {
    playerRoll = rollDice();
    computerRoll = rollDice();

    playerDice.src = `images/dobbelsteen-${playerRoll}.png`;
    computerDice.src = `images/dobbelsteen-${computerRoll}.png`;

    rollDiceButton.disabled = true;
    rollDiceButton.classList.add("disabled");
    higherButton.disabled = false;
    lowerButton.disabled = false;
    betInput.disabled = false;
    placeBetButton.disabled = false;
});

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

higherButton.addEventListener("click", () => {
    compareRolls("higher");
});

lowerButton.addEventListener("click", () => {
    compareRolls("lower");
});

function compareRolls(choice) {
    const isHigher = playerRoll > computerRoll;
    const isLower = playerRoll < computerRoll;

    const betAmount = parseInt(betInput.value);

    if (betAmount <= playerCredits) {
        if ((choice === "higher" && isHigher) || (choice === "lower" && isLower)) {
            playerCredits += betAmount;
            computerCredits -= betAmount;
            resultMessage.textContent = `Je hebt gewonnen ${betAmount} credits!`;
        } else {
            playerCredits -= betAmount;
            computerCredits += betAmount;
            resultMessage.textContent = `Je hebt verloren ${betAmount} credits.`;
        }
        updateScore();
    } else {
        resultMessage.textContent = "Ongeldige inzet. Je hebt niet genoeg credits.";
    }

    if (playerCredits <= 0 || computerCredits <= 0) {
        endGame();
    } else {
        rollDiceButton.disabled = false;
        rollDiceButton.classList.remove("disabled");
        higherButton.disabled = true;
        lowerButton.disabled = true;
        betInput.disabled = true;
        placeBetButton.disabled = true;
    }
}

function updateScore() {
    scoreDisplay.textContent = `Score: Speler: ${playerCredits} - Computer: ${computerCredits}`;
}

function endGame() {
    if (playerCredits <= 0) {
        resultMessage.textContent = "Het spel is afgelopen. Je hebt geen credits meer.";
    } else if (computerCredits <= 0) {
        resultMessage.textContent = "Gefeliciteerd! Je hebt het spel gewonnen.";
    }

    startButton.disabled = false;
}

placeBetButton.addEventListener("click", () => {
    const betAmount = parseInt(betInput.value);

    if (betAmount > playerCredits) {
        resultMessage.textContent = "Ongeldige inzet. Je hebt niet genoeg credits.";
    }
});
