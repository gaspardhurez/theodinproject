
function getComputerChoice () {
    randomInt = Math.floor(Math.random() * 3)
    if (randomInt == 0) return "Rock";
    else if (randomInt == 1) return "Paper";
    else return "Scissors";
}

function playOneRound(playerSelection) {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()
    computerSelection = getComputerChoice()

    if (playerSelection == "Rock" && computerSelection == "Scissors"
    || playerSelection == "Scissors" && computerSelection == "Paper"
    || playerSelection == "Paper" && computerSelection == "Rock"
    ) return `You win! ${playerSelection} beats ${computerSelection}`

    if (computerSelection == "Rock" && playerSelection == "Scissors"
    || computerSelection == "Scissors" && playerSelection == "Paper"
    || computerSelection == "Paper" && playerSelection == "Rock"
    ) return `You lose! ${computerSelection} beats ${playerSelection}`

    if (playerSelection == computerSelection) {
        computerSelection = getComputerChoice()
        return playOneRound(playerSelection, computerSelection)
    }
}


function game() {
    playerScore = 0
    computerScore = 0

    for (let i = 0; i < 5; i++) {
        if (playOneRound(prompt("Choice:"))[4] == 'w') {
            playerScore++ 
            console.log(`You won! Score is ${playerScore} - ${computerScore}`)
        }
        else {
            computerScore++
            console.log(`You lost! Score is ${playerScore} - ${computerScore}`)
        }

        
    }

}

game()