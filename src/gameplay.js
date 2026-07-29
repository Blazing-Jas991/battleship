// gameplay.js

import { Player } from './players.js';
import { renderGameBoard, renderShips, updateCell } from './renderGame.js';
import { Ship } from './ship.js';

const playerOne = new Player('Jas');
const playerTwo = new Player('Claude', true);
let currentPlayer = playerOne;

const playerOneBoard = playerOne.gameBoard;
const playerTwoBoard = playerTwo.gameBoard;

const playerOneFirstShip = new Ship(4);
const playerOneSecondShip = new Ship(3);
const playerOneThirdShip = new Ship(3);
const playerOneFourthShip = new Ship(2);
const playerOneFifthShip = new Ship(2);
const playerOneSixthShip = new Ship(1);
const playerOneSeventhShip = new Ship(1);

const playerTwoFirstShip = new Ship(2);
const playerTwoSecondShip = new Ship(3);
const playerTwoThirdShip = new Ship(4);
const playerTwoFourthShip = new Ship(2);
const playerTwoFifthShip = new Ship(3);
const playerTwoSixthShip = new Ship(1);
const playerTwoSeventhShip = new Ship(1);

function placeShipRandomly(board, ship) {
  let placementDirection = null;

  if (Math.random() >= 0.5) {
    placementDirection = 'vertical';
  } else {
    placementDirection = 'horizontal';
  }

  let attackedCol = Math.floor(Math.random() * 10);
  let attackedRow = Math.floor(Math.random() * 10);
  let shipPlacement = board.placeShip(
    ship,
    attackedRow,
    attackedCol,
    placementDirection
  );
  while (!shipPlacement) {
    if (Math.random() >= 0.5) {
      placementDirection = 'vertical';
    } else {
      placementDirection = 'horizontal';
    }
    attackedCol = Math.floor(Math.random() * 10);
    attackedRow = Math.floor(Math.random() * 10);
    shipPlacement = board.placeShip(
      ship,
      attackedRow,
      attackedCol,
      placementDirection
    );
  }
}

placeShipRandomly(playerOneBoard, playerOneFirstShip);
placeShipRandomly(playerOneBoard, playerOneSecondShip);
placeShipRandomly(playerOneBoard, playerOneThirdShip);
placeShipRandomly(playerOneBoard, playerOneFourthShip);
placeShipRandomly(playerOneBoard, playerOneFifthShip);
placeShipRandomly(playerOneBoard, playerOneSixthShip);
placeShipRandomly(playerOneBoard, playerOneSeventhShip);

placeShipRandomly(playerTwoBoard, playerTwoFirstShip);
placeShipRandomly(playerTwoBoard, playerTwoSecondShip);
placeShipRandomly(playerTwoBoard, playerTwoThirdShip);
placeShipRandomly(playerTwoBoard, playerTwoFourthShip);
placeShipRandomly(playerTwoBoard, playerTwoFifthShip);
placeShipRandomly(playerTwoBoard, playerTwoSixthShip);
placeShipRandomly(playerTwoBoard, playerTwoSeventhShip);

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
    alert('Game Over Player One Won The Game');
  } else if (boardCheck && currentPlayer === playerTwo) {
    alert('Game Over Player Two Won The Game');
  }
}

playerTwoContainer.addEventListener('click', (event) => {
  if (!event.target.dataset.row || !event.target.dataset.col) {
    return;
  }
  if (currentPlayer !== playerOne) {
    return;
  }
  if (playerTwoBoard.areAllShipsSunk()) {
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
  if (playerOneBoard.areAllShipsSunk()) {
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
