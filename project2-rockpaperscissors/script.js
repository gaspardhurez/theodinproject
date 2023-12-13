
let playerScore = 0;
let computerScore = 0;

function getComputerChoice () {
    const randomInt = Math.floor(Math.random() * 3)
    if (randomInt == 0) return "Rock";
    else if (randomInt == 1) return "Paper";
    else return "Scissors";
}

function playOneRound(event) {
    console.log(event);
    console.log(event.target);

    const choice = event.target.id

    let playerSelection = (choice == 'rock') ? "Rock" : (choice == 'paper') ? 'Paper' : 'Scissors'

    let computerSelection = getComputerChoice()

    const body = document.querySelector("body")
    let resultsDiv = document.createElement("div")
    let result;

    if (playerSelection == "Rock" && computerSelection == "Scissors"
    || playerSelection == "Scissors" && computerSelection == "Paper"
    || playerSelection == "Paper" && computerSelection == "Rock"
    )  
    {
        result = `You win! ${playerSelection} beats ${computerSelection}`
        winner = 'player'
    }

    if (computerSelection == "Rock" && playerSelection == "Scissors"
    || computerSelection == "Scissors" && playerSelection == "Paper"
    || computerSelection == "Paper" && playerSelection == "Rock"
    ) 
    {
        result = `You lose! ${computerSelection} beats ${playerSelection}`
        winner = 'computer'
    }

    if (playerSelection == computerSelection) {
        computerSelection = getComputerChoice()
        return playOneRound(event)
    }

    resultsDiv.textContent = result
    body.appendChild(resultsDiv)
    updateScore(winner);
}

function updateScore(winner) {
    if (winner === 'player') playerScore++;
    else computerScore++;
    displayScores();
}

function displayScores() {
    const scoreDiv = document.querySelector("#playerScore")
    scoreDiv.textContent = `Player: ${playerScore} - Computer: ${computerScore}`
}


const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', playOneRound)
})