// gameplay.js

import { Player } from './players.js';
import { renderGameBoard, renderShips, updateCell } from './renderGame.js';
import { Ship } from './ship.js';

const playerOne = new Player('Jas');
const playerTwo = new Player('Claude', true);
let currentPlayer = playerOne;

const playerOneBoard = playerOne.gameBoard;
const playerTwoBoard = playerTwo.gameBoard;
const stagingContainer = document.querySelector('.ships-staging-container');

const playerOneContainer = document.querySelector('.player-board');
const playerTwoContainer = document.querySelector('.computer-board');

const playerOneShips = [
  new Ship(4),
  new Ship(3),
  new Ship(3),
  new Ship(2),
  new Ship(2),
  new Ship(2),
  new Ship(1),
  new Ship(1),
  new Ship(1),
  new Ship(1),
];

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

let currentDirection = 'vertical';
let directionToggleButton = document.querySelector('.toggle-button');
directionToggleButton.addEventListener('click', () => {
  stagingContainer.classList.toggle('horizontal-layout');
  currentDirection =
    currentDirection === 'vertical' ? 'horizontal' : 'vertical';
});

function placeShipRandomly(board, ship) {
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

function renderShipStaging(ships, container) {
  for (let i = 0; i < ships.length; i++) {
    let shipContainer = document.createElement('div');
    let shipItem = ships[i];

    shipContainer.classList.add('staging-ships');
    shipContainer.draggable = true;
    shipContainer.setAttribute('data-ship-index', i);
    shipContainer.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('shipIndex', String(i));
    });

    for (let j = 0; j < shipItem.length; j++) {
      let shipCell = document.createElement('div');
      shipCell.classList.add('staging-ship-cell');
      shipContainer.appendChild(shipCell);
    }
    container.appendChild(shipContainer);
  }

  playerOneContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  playerOneContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    if (!event.target.dataset.row || !event.target.dataset.col) {
      return;
    }
    let dropRow = Number(event.target.dataset.row);
    let dropCol = Number(event.target.dataset.col);
    const dropData = Number(event.dataTransfer.getData('shipIndex'));
    let dropShip = ships[dropData];
    let shipPlacement = playerOneBoard.placeShip(
      dropShip,
      dropRow,
      dropCol,
      currentDirection
    );
    if (shipPlacement) {
      renderShips(playerOneBoard, playerOneContainer);
      let placedShip = container.querySelector(
        `[data-ship-index="${dropData}"]`
      );
      placedShip.remove();
    } else {
      alert("Ship Can't be placed here");
    }
  });
}

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

renderGameBoard(10, 10, playerOneContainer);
renderGameBoard(10, 10, playerTwoContainer);
renderShipStaging(playerOneShips, stagingContainer);
renderShips(playerOneBoard, playerOneContainer);

// const playerOneFirstShip = new Ship(4);
// const playerOneSecondShip = new Ship(3);
// const playerOneThirdShip = new Ship(3);
// const playerOneFourthShip = new Ship(2);
// const playerOneFifthShip = new Ship(2);
// const playerOneSixthShip = new Ship(1);
// const playerOneSeventhShip = new Ship(1);
// const playerOneEightShip = new Ship(1);
// const playerOneNinthShip = new Ship(1);
// const playerOneTenthShip = new Ship(2);

// placeShipRandomly(playerOneBoard, playerOneFirstShip);
// placeShipRandomly(playerOneBoard, playerOneSecondShip);
// placeShipRandomly(playerOneBoard, playerOneThirdShip);
// placeShipRandomly(playerOneBoard, playerOneFourthShip);
// placeShipRandomly(playerOneBoard, playerOneFifthShip);
// placeShipRandomly(playerOneBoard, playerOneSixthShip);
// placeShipRandomly(playerOneBoard, playerOneSeventhShip);
// placeShipRandomly(playerOneBoard, playerOneEightShip);
// placeShipRandomly(playerOneBoard, playerOneNinthShip);
// placeShipRandomly(playerOneBoard, playerOneTenthShip);
