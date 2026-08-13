// gameplay.js

import { renderGameBoard, renderShips } from './renderGame.js';
import { Ship } from './ship.js';
import { placeShipRandomly, createGameSession } from './gameplayresources.js';

export const randomResetButton = document.createElement('button');
randomResetButton.textContent = 'Reset Game';
randomResetButton.classList.add('random-reset-button');

export const randomSwitchButton = document.createElement('button');
randomSwitchButton.textContent = 'Switch To Self Placement Mode';
randomSwitchButton.classList.add('random-switch-button');

export function randomBoardPlay() {
  const gameSession = createGameSession();
  const {
    playerOneBoard,
    playerOneContainer,
    playerTwoContainer,
    appendPlayerBoard,
    appendComputerBoard,
    attackComputer,
    createAndPlaceComShips,
  } = gameSession;

  const playerOneFirstShip = new Ship(4);
  const playerOneSecondShip = new Ship(3);
  const playerOneThirdShip = new Ship(3);
  const playerOneFourthShip = new Ship(2);
  const playerOneFifthShip = new Ship(2);
  const playerOneSixthShip = new Ship(1);
  const playerOneSeventhShip = new Ship(1);
  const playerOneEightShip = new Ship(1);
  const playerOneNinthShip = new Ship(1);
  const playerOneTenthShip = new Ship(2);
  placeShipRandomly(playerOneBoard, playerOneFirstShip);
  placeShipRandomly(playerOneBoard, playerOneSecondShip);
  placeShipRandomly(playerOneBoard, playerOneThirdShip);
  placeShipRandomly(playerOneBoard, playerOneFourthShip);
  placeShipRandomly(playerOneBoard, playerOneFifthShip);
  placeShipRandomly(playerOneBoard, playerOneSixthShip);
  placeShipRandomly(playerOneBoard, playerOneSeventhShip);
  placeShipRandomly(playerOneBoard, playerOneEightShip);
  placeShipRandomly(playerOneBoard, playerOneNinthShip);
  placeShipRandomly(playerOneBoard, playerOneTenthShip);

  appendPlayerBoard();
  appendComputerBoard();
  attackComputer();
  createAndPlaceComShips();
  renderGameBoard(10, 10, playerOneContainer);
  renderGameBoard(10, 10, playerTwoContainer);
  renderShips(playerOneBoard, playerOneContainer);
}
