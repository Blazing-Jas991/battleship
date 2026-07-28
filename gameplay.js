import { Player } from './players.js';
import { renderGameBoard, renderShips, updateCell } from './renderGame.js';
import { Ship } from './ship.js';

const playerOne = new Player('Jas');
const playerTwo = new Player('Claude', true);
let currentPlayer = playerOne;

const playerOneBoard = playerOne.gameBoard;

const playerOneFirstShip = new Ship(4);
const playerOneSecondShip = new Ship(3);
const playerOneThirdShip = new Ship(3);

playerOneBoard.placeShip(playerOneFirstShip, 2, 4, 'vertical');
playerOneBoard.placeShip(playerOneSecondShip, 5, 2, 'horizontal');
playerOneBoard.placeShip(playerOneThirdShip, 6, 8, 'vertical');

const playerTwoBoard = playerTwo.gameBoard;

const playerTwoFirstShip = new Ship(2);
const playerTwoSecondShip = new Ship(3);
const playerTwoThirdShip = new Ship(4);

playerTwoBoard.placeShip(playerTwoFirstShip, 3, 5, 'vertical');
playerTwoBoard.placeShip(playerTwoSecondShip, 9, 1, 'horizontal');
playerTwoBoard.placeShip(playerTwoThirdShip, 5, 8, 'vertical');

const playerOneContainer = document.querySelector('.player-board');
const playerTwoContainer = document.querySelector('.computer-board');

renderGameBoard(10, 10, playerOneContainer);
renderGameBoard(10, 10, playerTwoContainer);
renderShips(playerOneBoard, playerOneContainer);

function checkGameOver(board) {
  let boardCheck = board.areAllShipsSunk();
  if (!boardCheck && currentPlayer === playerOne) {
    currentPlayer = playerTwo;
    computerTurn();
  } else if (!boardCheck && currentPlayer === playerTwo) {
    currentPlayer = playerOne;
  } else if (boardCheck && currentPlayer === playerOne) {
    return 'Game Over Player One Won The Game';
  } else if (boardCheck && currentPlayer === playerTwo) {
    return 'Game Over Player Two Won The Game';
  }
}

playerTwoContainer.addEventListener('click', (event) => {
  if (!event.target.dataset.row || !event.target.dataset.col) {
    return;
  }
  if (currentPlayer !== playerOne) {
    return;
  }

  let clickedRow = Number(event.target.dataset.row);
  let clickedCol = Number(event.target.dataset.col);

  let attackResult = playerTwoBoard.receiveAttack(clickedRow, clickedCol);
  updateCell(clickedRow, clickedCol, attackResult, playerTwoContainer);
  checkGameOver(playerTwoBoard);
});

function computerTurn() {
  if (currentPlayer !== playerTwo) {
    return;
  }

  let attackedCol = Math.floor(Math.random() * 10);
  let attackedRow = Math.floor(Math.random() * 10);
  let attackResult = playerOneBoard.receiveAttack(attackedRow, attackedCol);

  while (attackResult === 'already attacked') {
    attackedCol = Math.floor(Math.random() * 10);
    attackedRow = Math.floor(Math.random() * 10);
    attackResult = playerOneBoard.receiveAttack(attackedRow, attackedCol);
  }
  updateCell(attackedRow, attackedCol, attackResult, playerOneContainer);
  checkGameOver(playerOneBoard);
}
