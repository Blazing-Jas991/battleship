// gamePlayResources.js

import { Ship } from './ship.js';
import { Player } from './players.js';
import { updateCell } from './renderGame.js';

export const pageBody = document.querySelector('body');
export const mainStagingContainer = document.querySelector('.staging-div');
export const dialog = document.querySelector('dialog');
export const gameBoardsContainer = document.createElement('div');
gameBoardsContainer.classList.add('game-boards-container');

export const resetButtonHolder = document.createElement('div');
resetButtonHolder.style.display = 'none';
resetButtonHolder.classList.add('reset-button-holder');
dialog.showModal();

let targetQueue = [];

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

function getAdjacentCoordinates(row, col) {
  let upperRow = { row: row - 1, col: col };
  let lowerRow = { row: row + 1, col: col };
  let leftCol = { row: row, col: col - 1 };
  let rightCol = { row: row, col: col + 1 };
  return [upperRow, lowerRow, leftCol, rightCol];
}

export function createGameSession() {
  const playerOne = new Player('Jas');
  const playerTwo = new Player('Claude', true);
  let currentPlayer = playerOne;

  const playerOneContainer = document.createElement('div');
  const playerTwoContainer = document.createElement('div');

  const playerOneBoard = playerOne.gameBoard;
  const playerTwoBoard = playerTwo.gameBoard;

  function pickNextTarget() {
    if (targetQueue.length > 0) {
      return targetQueue.shift();
    }
    return {
      row: Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
    };
  }

  function computerTurn() {
    if (currentPlayer !== playerTwo) {
      return;
    }
    if (playerOneBoard.areAllShipsSunk()) {
      return;
    }

    let target = pickNextTarget();
    let attackOnPlayer = playerOneBoard.receiveAttack(target.row, target.col);

    while (attackOnPlayer === 'already attacked' || attackOnPlayer === false) {
      target = pickNextTarget();
      attackOnPlayer = playerOneBoard.receiveAttack(target.row, target.col);
    }

    if (attackOnPlayer === 'hit') {
      let queueTargets = getAdjacentCoordinates(target.row, target.col);
      targetQueue.push(...queueTargets);
    }

    updateCell(target.row, target.col, attackOnPlayer, playerOneContainer);
    checkGameOver(playerOneBoard);
  }

  function appendPlayerBoard() {
    const playerOneBoardContainer = document.createElement('div');
    playerOneBoardContainer.classList.add('player-board-container');
    playerOneContainer.classList.add('player-board');
    const playerOneBoardText = document.createElement('h2');
    playerOneBoardText.textContent = 'Player One Board';
    playerOneBoardContainer.append(playerOneBoardText, playerOneContainer);
    gameBoardsContainer.appendChild(playerOneBoardContainer);
  }

  function appendComputerBoard() {
    const playerTwoBoardContainer = document.createElement('div');
    playerTwoBoardContainer.classList.add('computer-board-container');
    const playerTwoBoardText = document.createElement('h2');
    playerTwoBoardText.textContent = 'Computer Board';
    playerTwoContainer.classList.add('computer-board');
    playerTwoBoardContainer.append(playerTwoBoardText, playerTwoContainer);
    gameBoardsContainer.append(playerTwoBoardContainer);
    pageBody.appendChild(gameBoardsContainer);
  }

  function attackComputer() {
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
      if (attackResult === 'already attacked') {
        return;
      }
      updateCell(clickedRow, clickedCol, attackResult, playerTwoContainer);
      checkGameOver(playerTwoBoard);
      pageBody.appendChild(resetButtonHolder);
      resetButtonHolder.style.display = '';
    });
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

  function createAndPlaceComShips() {
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

  return {
    appendPlayerBoard,
    appendComputerBoard,
    createAndPlaceComShips,
    attackComputer,
    playerOneBoard,
    playerTwoBoard,
    playerOneContainer,
    playerTwoContainer,
  };
}

export function clearBoards() {
  const playerBoardContainer = document.querySelector(
    '.player-board-container'
  );
  const comBoardContainer = document.querySelector('.computer-board-container');
  if (playerBoardContainer) playerBoardContainer.remove();
  if (comBoardContainer) comBoardContainer.remove();
}
