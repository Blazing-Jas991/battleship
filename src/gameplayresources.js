// gameplayresources.js

import { Ship } from './ship.js';
import { Player } from './players.js';
import { updateCell } from './renderGame.js';

export const playerOne = new Player('Jas');
export const playerTwo = new Player('Claude', true);

export const playerOneContainer = document.createElement('div');
export const playerTwoContainer = document.createElement('div');

export const playerOneBoard = playerOne.gameBoard;
export const playerTwoBoard = playerTwo.gameBoard;

const boardAndResetButtonContainer = document.createElement('div');
boardAndResetButtonContainer.classList.add('overall-board-container');
const boardsContainer = document.createElement('div');
boardsContainer.classList.add('boards-container');
export const resetButton = document.createElement('button');
const resetButtonHolder = document.createElement('div');
resetButton.textContent = 'Reset Game';
resetButton.classList.add('reset-button');
resetButtonHolder.appendChild(resetButton);

const pageBody = document.querySelector('body');
export const mainStagingContainer = document.querySelector('.staging-div');
let currentPlayer = playerOne;

export function appendPlayerBoard() {
  const playerOneBoardContainer = document.createElement('div');
  playerOneBoardContainer.classList.add('player-board-container');
  playerOneContainer.classList.add('player-board');
  const playerOneBoardText = document.createElement('h2');
  playerOneBoardText.textContent = 'Player One Board';
  playerOneBoardContainer.append(playerOneBoardText, playerOneContainer);
  boardsContainer.appendChild(playerOneBoardContainer);
}

export function appendComputerBoard() {
  const playerTwoBoardContainer = document.createElement('div');
  playerTwoBoardContainer.classList.add('computer-board-container');
  const playerTwoBoardText = document.createElement('h2');
  playerTwoBoardText.textContent = 'Computer Board';
  playerTwoContainer.classList.add('computer-board');
  playerTwoBoardContainer.append(playerTwoBoardText, playerTwoContainer);
  boardsContainer.appendChild(playerTwoBoardContainer);
  boardAndResetButtonContainer.append(boardsContainer, resetButtonHolder);
  pageBody.appendChild(boardAndResetButtonContainer);
}

export function placeShipRandomly(board, ship) {
  let placementDirection;

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

export function attackComputer() {
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
}

export function computerTurn() {
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

export function createAndPlaceComShips() {
  const playerTwoFirstShip = new Ship(2);
  const playerTwoSecondShip = new Ship(3);
  const playerTwoThirdShip = new Ship(4);
  const playerTwoFourthShip = new Ship(2);
  const playerTwoFifthShip = new Ship(3);
  const playerTwoSixthShip = new Ship(1);
  const playerTwoSeventhShip = new Ship(1);
  const playerTwoEightShip = new Ship(1);
  const playerTwoNinthShip = new Ship(1);
  const playerTwoTenthShip = new Ship(2);
  placeShipRandomly(playerTwoBoard, playerTwoFirstShip);
  placeShipRandomly(playerTwoBoard, playerTwoSecondShip);
  placeShipRandomly(playerTwoBoard, playerTwoThirdShip);
  placeShipRandomly(playerTwoBoard, playerTwoFourthShip);
  placeShipRandomly(playerTwoBoard, playerTwoFifthShip);
  placeShipRandomly(playerTwoBoard, playerTwoSixthShip);
  placeShipRandomly(playerTwoBoard, playerTwoSeventhShip);
  placeShipRandomly(playerTwoBoard, playerTwoEightShip);
  placeShipRandomly(playerTwoBoard, playerTwoNinthShip);
  placeShipRandomly(playerTwoBoard, playerTwoTenthShip);
}
