let computerGuess = Math.random() * 10; // Computer rolt 1 tot en met 10
computerGuess = Math.ceil(computerGuess); // Dat wil zeggen, de waarde bijvoorbeeld 3,4 wordt afgerond naar 4,0
console.log(computerGuess); 

function reset() {
    window.location.reload(); // Herlaad het programma
}


function higher() { // Laat zien of je wint als je hoger gokt
    document.getElementById("N1").innerHTML = computerGuess
    if (computerGuess > 5) {
        document.getElementById('textField').innerHTML =
            "You Win";
    } else {
        document.getElementById('textField').innerHTML =
            "You Lose";
    }
    document.getElementById("emptyspace").style.display = "none"; // Houdt de browser van bewegen
}

function lower() { // Laat zien of je wint als je lager gokt
    document.getElementById("N1").innerHTML = computerGuess
    if (computerGuess < 6) {
        document.getElementById('textField').innerHTML =
            "You Win";
    } else {
        document.getElementById('textField').innerHTML =
            "You Lose";
    }
    document.getElementById("emptyspace").style.display = "none"; // Houdt de browser van bewegen
}