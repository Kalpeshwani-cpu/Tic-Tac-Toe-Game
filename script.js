const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');
let isXTurn = true;
let boardState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] || checkWinner()) {
        return;
    }

    boardState[cellIndex] = isXTurn ? 'X' : 'O';
    cell.textContent = isXTurn ? 'X' : 'O';
    cell.classList.add(isXTurn ? 'x' : 'o');

    if (checkWinner()) {
        messageElement.textContent = `The Winner is ${isXTurn ? 'X' : 'O'} !!!`;
    } else if (boardState.every(cell => cell)) {
        messageElement.textContent = 'Draw!!!';
    } else {
        isXTurn = !isXTurn;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] && boardState[index] === boardState[combination[0]];
        });
    });
}

function restartGame() {
    isXTurn = true;
    boardState = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    messageElement.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
