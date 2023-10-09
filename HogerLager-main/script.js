let score = 0;
let currentNumber = 1;

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateDiceImage(number) {
    document.getElementById("dice").src = `images/dobbelsteen-${number}.png`;
}

function updateScore(result) {
    const newNumber = rollDice();
    updateDiceImage(newNumber);

    if ((result === "higher" && newNumber > currentNumber) || (result === "lower" && newNumber < currentNumber)) {
        score++;
    } else {
        score = 0;
    }

    currentNumber = newNumber;

    document.getElementById("score").textContent = `Score: ${score}`;
}

document.getElementById("higher").addEventListener("click", () => {
    updateScore("higher");
});

document.getElementById("lower").addEventListener("click", () => {
    updateScore("lower");
});

updateDiceImage(currentNumber);
