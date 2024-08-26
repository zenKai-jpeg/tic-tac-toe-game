/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');
const { userInfo } = require('os');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if (validateMove(position)) {
        board[position] = mark;
    }
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    for (let i = 1; i <= 9; i += 3) { 
        console.log(
            (board[i] === ' ' ? i : board[i]) + ' | ' +
            (board[i + 1] === ' ' ? (i + 1) : board[i + 1]) + ' | ' +
            (board[i + 2] === ' ' ? (i + 2) : board[i + 2])
        );
        if (i < 7) console.log('---------');
    }
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    let pos = Number(position);
    if (pos < 1 || pos > 9) {
        return false
    }
    if (board[pos] !== ' ') {
        return false;
    }
    return true
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let i = 0; i < winCombinations.length; i++) {
        let combination = winCombinations [i];
        if (board[combination[0]] === player && 
            board[combination[1]] === player && 
            board[combination[2]] === player){
        return true
        }
    }
    return false
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let position in board) {
        if (board[position] === " ") {
            return false
        }
    }
    return true
}


// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let move = false;

    while (!move) {
    let userInput = prompt("Player " + currentTurnPlayer + ", enter your move. [1 - 9]:");
    let numberInput = Number(userInput)

        if (validateMove(numberInput)) {
            move = true;
            markBoard(numberInput, player);
        }
        else {
            console.log("Please Insert a valid mode.")
        }
    }

printBoard();

if (checkWin(player)) {
    console.log("Player " + player + " wins!")
    return true
}
if (checkFull(player)) {
    console.log("It's a tie!")
    return true
}
return false
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false;
let currentTurnPlayer = 'X';

while (!winnerIdentified) {
winnerIdentified = playTurn(currentTurnPlayer);
currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
let playAgain = "Y";

while (winnerIdentified) {
playAgain = prompt('Do you want to play again? [Y/N]:');
if (playAgain === 'Y') {
    board = {
        1: ' ',
        2: ' ',
        3: ' ',
        4: ' ',
        5: ' ',
        6: ' ',
        7: ' ',
        8: ' ',
        9: ' '
    };

    // entry point of the whole program
    console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');
    
    winnerIdentified = false;
    currentTurnPlayer = 'X';

    while (!winnerIdentified) {
        winnerIdentified = playTurn(currentTurnPlayer);
        currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
    }
} else {
    console.log('Thanks for playing!');
}
}