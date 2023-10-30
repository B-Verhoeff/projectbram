// Variabelen
const playerDice = document.getElementById("playerDice"); // selecteert het HTML-element met id 'playerDice' en stelt het in als variabele
const computerDice = document.getElementById("computerDice"); // selecteert het HTML-element met id 'computerDice' en stelt het in als variabele
const startButton = document.getElementById("startButton"); // selecteert het HTML-element met id 'startButton' en stelt het in als variabele
const higherButton = document.getElementById("higherButton"); // selecteert het HTML-element met id 'higherButton' en stelt het in als variabele
const lowerButton = document.getElementById("lowerButton"); // selecteert het HTML-element met id 'lowerButton' en stelt het in als variabele
const rollDiceButton = document.getElementById("rollDiceButton"); // selecteert het HTML-element met id 'rollDiceButton' en stelt het in als variabele
const betInput = document.getElementById("betInput"); // selecteert het HTML-element met id 'betInput' en stelt het in als variabele
const placeBetButton = document.getElementById("placeBetButton"); // selecteert het HTML-element met id 'placeBetButton' en stelt het in als variabele
const scoreDisplay = document.getElementById("score"); // selecteert het HTML-element met id 'score' en stelt het in als variabele
const resultMessage = document.getElementById("resultMessage"); // selecteert het HTML-element met id 'resultMessage' en stelt het in als variabele

let playerCredits = 100; // stelt de credits van de speler in op 100
let computerCredits = 100; // stelt de credits van de computer in op 100
let playerRoll, computerRoll; // definieert variabelen voor de rollen van de dobbelstenen

startButton.addEventListener("click", startGame); // voegt een 'click' eventlistener toe aan de startknop die de functie 'startGame' uitvoert

function startGame() {
    playerCredits = 100; // stelt de credits van de speler opnieuw in op 100
    computerCredits = 100; // stelt de credits van de computer opnieuw in op 100
    playerRoll = 0; // stelt de rol van de speler in op 0
    computerRoll = 0; // stelt de rol van de computer in op 0
    resultMessage.textContent = ""; // zet de boodschap voor het resultaat van het spel op een lege string

    startButton.disabled = true; // deactiveert de startknop
    rollDiceButton.disabled = false; // activeert de rolknop
    rollDiceButton.classList.remove("disabled"); // verwijdert de 'disabled' klasse van de rolknop
    betInput.disabled = false; // maakt het invoerveld voor de inzet beschikbaar
    placeBetButton.disabled = false; // maakt de knop om de inzet te plaatsen beschikbaar

    updateScore(); // updatet de score weergegeven op de pagina
}

rollDiceButton.addEventListener("click", () => {
    playerRoll = rollDice(); // rolt de dobbelsteen voor de speler en slaat het resultaat op in de variabele 'playerRoll'
    playerDice.src = `images/dobbelsteen-${playerRoll}.png`; // verandert de afbeelding van de dobbelsteen van de speler op basis van de rol

    // Roep hier de functie aan om de worp van de computer weer te geven
    showComputerRoll(); // roept de functie aan om de rol van de computer weer te geven

    rollDiceButton.disabled = true; // deactiveert de rolknop
    rollDiceButton.classList.add("disabled"); // voegt de 'disabled' klasse toe aan de rolknop
    higherButton.disabled = false; // activeert de 'higher' knop
    lowerButton.disabled = false; // activeert de 'lower' knop
    betInput.disabled = false; // maakt het invoerveld voor de inzet beschikbaar
    placeBetButton.disabled = false; // maakt de knop om de inzet te plaatsen beschikbaar
});

function rollDice() {
    return Math.floor(Math.random() * 6) + 1; // genereert een willekeurige getal tussen 1 en 6 en geeft het terug als resultaat van de functie
}

higherButton.addEventListener("click", () => {
    // Roep hier de functie aan om de worp van de computer weer te geven
    showComputerRoll(); // roept de functie aan om de rol van de computer weer te geven

    compareRolls("higher"); // voert de functie 'compareRolls' uit met de keuze van de speler om hoger te gaan
});

lowerButton.addEventListener("click", () => {
    // Roep hier de functie aan om de worp van de computer weer te geven
    showComputerRoll(); // roept de functie aan om de rol van de computer weer te geven

    compareRolls("lower"); // voert de functie 'compareRolls' uit met de keuze van de speler om lager te gaan
});

function showComputerRoll() {
    computerRoll = rollDice(); // rolt de dobbelsteen voor de computer en slaat het resultaat op in de variabele 'computerRoll'
    computerDice.src = `images/dobbelsteen-${computerRoll}.png`; // verandert de afbeelding van de dobbelsteen van de computer op basis van de rol
}

function compareRolls(choice) {
    const playerSum = playerRoll; // slaat de waarde van 'playerRoll' op in de variabele 'playerSum'
    const computerSum = computerRoll; // slaat de waarde van 'computerRoll' op in de variabele 'computerSum'

    const betAmount = parseInt(betInput.value); // slaat de waarde van de inzet van de speler op in de variabele 'betAmount'

    if (betAmount <= playerCredits) { // controleert of de inzet van de speler niet hoger is dan de credits die hij heeft
        if ((choice === "higher" && playerSum > computerSum) || (choice === "lower" && playerSum < computerSum)) {
            playerCredits += betAmount; // verhoogt de credits van de speler met het bedrag dat hij heeft ingezet
            computerCredits -= betAmount; // vermindert de credits van de computer met het bedrag dat de speler heeft ingezet
            resultMessage.textContent = `Je hebt gewonnen ${betAmount} credits!`; // geeft een boodschap weer die meldt dat de speler heeft gewonnen en hoeveel credits hij heeft gewonnen
        } else {
            playerCredits -= betAmount; // vermindert de credits van de speler met het bedrag dat hij heeft ingezet
            computerCredits += betAmount; // verhoogt de credits van de computer met het bedrag dat de speler heeft ingezet
            resultMessage.textContent = `Je hebt verloren ${betAmount} credits.`; // geeft een boodschap weer die meldt dat de speler heeft verloren en hoeveel credits hij heeft verloren
        }
        updateScore(); // updatet de score weergegeven op de pagina
    } else {
        resultMessage.textContent = "Ongeldige inzet. Je hebt niet genoeg credits."; // geeft een boodschap weer die meldt dat de speler niet genoeg credits heeft om de ingezette hoeveelheid te kunnen betalen
    }

    if (playerCredits <= 0 || computerCredits <= 0) { // controleert of de credits van een van de partijen op 0 is gekomen
        endGame(); // roept de functie 'endGame' aan
    } else {
        rollDiceButton.disabled = false; // activeert de rolknop
        rollDiceButton.classList.remove("disabled"); // verwijdert de 'disabled' klasse van de rolknop
        higherButton.disabled = true; // deactiveert de 'higher' knop
        lowerButton.disabled = true; // deactiveert de 'lower' knop
        betInput.disabled = true; // deactiveert het invoerveld voor de inzet
        placeBetButton.disabled = true; // deactiveert de knop om de inzet te plaatsen
    }
}

function updateScore() {
    scoreDisplay.textContent = `Score: Speler: ${playerCredits} - Computer: ${computerCredits}`; // past de tekst voor de score aan op basis van de credits van de speler en de computer
}

function endGame() {
    if (playerCredits <= 0) {
        resultMessage.textContent = "Het spel is afgelopen. Je hebt geen credits meer."; // geeft een boodschap weer dat het spel is afgelopen en dat de speler geen credits meer heeft
    } else if (computerCredits <= 0) {
        resultMessage.textContent = "Gefeliciteerd! Je hebt het spel gewonnen."; // geeft een boodschap weer dat het spel is afgelopen en dat de speler heeft gewonnen
    }

    startButton.disabled = false; // activeert de startknop
}

placeBetButton.addEventListener("click", () => {
    const betAmount = parseInt(betInput.value); // slaat de waarde van de inzet van de speler op in de variabele 'betAmount'

    if (betAmount > playerCredits) {
        resultMessage.textContent = "Ongeldige inzet. Je hebt niet genoeg credits."; // geeft een boodschap weer dat de speler niet genoeg credits heeft om de ingezette hoeveelheid te kunnen betalen
    }
}); // voegt een eventlistener toe aan de knop om de inzet te plaatsen dat controleert of de speler genoeg credits heeft om de ingezette hoeveelheid te kunnen betalen
