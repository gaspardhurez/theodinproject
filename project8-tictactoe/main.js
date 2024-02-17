class Gameboard {

    constructor() {
        this.board = [];
    }
}

class Player {

    constructor(name) {
        this.name = name;
    }
}

class GameController {

    constructor(gameboard, player1, player2) {
        this.gameboard = gameboard;
        this.player1 = player1;
        this.player1.sign = 'X';
        this.player2 = player2;
        this.player2.sign = 'O';
        this.winner = 'TBD';
        this.moveCount = 0;

        this.initializeEmptyGameboard();
    }

    initializeEmptyGameboard() {
        this.gameboard.board = [];

        for (let i = 0; i < 3; i++) {
            this.gameboard.board.push([]);

            for (let j = 0; j < 3; j++) {
                this.gameboard.board[i].push("")
            }
        }

        this.activePlayer = this.player1;
    }

    switchRound() {
        this.activePlayer == player1 ? this.activePlayer = player2 : this.activePlayer = player1;
    }

    checkForWin() {

        const board = this.gameboard.board;

        for (let i = 0; i < 3; i++) {
            if (board[0][i] && board[0][i] == board[1][i] && board[0][i] == board[2][i]) return true;
            if (board[i][0] && board[i][0] == board[i][1] && board[i][0] == board[i][2]) return true;
        }

        if (board[0][0] && board[0][0] == board[1][1] && board[0][0] == board[2][2]) return true;
        if (board[0][2] && board[0][2] == board[1][1] && board[0][2] == board[2][0]) return true;

        return false;
    }

    checkForTie() {
        if (this.gameboard.board.every(row => row.every(Boolean))) return true;
        return false;
    }

    checkForEndOfGame() {
        if (this.checkForWin()) this.winner = this.activePlayer;
        else if (this.moveCount == 9 && this.checkForTie()) this.winner = null;
    }

    playRound(row, col) {

        this.gameboard.board[row][col] = this.activePlayer.sign;
        this.moveCount++;
        this.checkForEndOfGame();
    }
}


class GameInterface {

    constructor(game) {
        this.game = game;
        this.boardDiv = document.querySelector('.gameboard');
        this.activePlayerDisplay = document.querySelector('h3');
        this.activePlayerDisplay.textContent = `${this.game.activePlayer.name}'s turn`;
    }

    updateGameState() {

        if (this.game.winner == null) {
            this.activePlayerDisplay.textContent = "It's a tie";
        }

        else if (this.game.winner == this.game.activePlayer) {
            this.activePlayerDisplay.textContent = `Congratulations ${this.game.activePlayer.name}!`;
            let boardButtons = document.querySelectorAll('button');
            boardButtons.forEach(button => {button.disabled = true});
        }

        else {
            this.game.switchRound();
            this.activePlayerDisplay.textContent = `${this.game.activePlayer.name}'s turn`;
        }
    }

    initialRender() {

        for (let i = 0; i < 3; i++) {
            let boardRow = document.createElement('div');
            boardRow.classList.add('board-row');

            for (let j = 0; j < 3; j++) {
                let boardCell = document.createElement('div');
                let boardButton = document.createElement('button');

                boardButton.addEventListener('click', () => {
                    this.game.playRound(i, j);
                    boardButton.textContent = this.game.activePlayer.sign;
                    boardButton.disabled = true;
                    this.updateGameState(boardButton);
                })

                boardCell.classList.add('board-cell');
                boardCell.appendChild(boardButton);
                boardRow.appendChild(boardCell);
            }

            this.boardDiv.appendChild(boardRow);
        }
    }
}

let gameboard = new Gameboard();
let player1 = new Player(prompt("Player 1 name: "));
let player2 = new Player(prompt("Player 2 name: "));
let gameController = new GameController(gameboard, player1, player2);
let gameInterface = new GameInterface(gameController);

gameInterface.initialRender();


