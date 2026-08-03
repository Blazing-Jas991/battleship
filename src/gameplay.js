// gameplay.js

import { renderGameBoard, renderShips } from './renderGame.js';
import { Ship } from './ship.js';
import {
  playerOneContainer,
  playerTwoContainer,
  createAndPlaceComShips,
  playerOneBoard,
  placeShipRandomly,
  attackComputer,
  appendComputerBoard,
  appendPlayerBoard,
  mainStagingContainer,
} from './gameplayresources.js';

function createAndPlaceHumanShips() {
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
}

export function randomBoardPlay() {
  appendPlayerBoard();
  appendComputerBoard();
  mainStagingContainer.style.display = 'none';
  createAndPlaceHumanShips();
  createAndPlaceComShips();
  attackComputer();
  renderGameBoard(10, 10, playerOneContainer);
  renderGameBoard(10, 10, playerTwoContainer);
  renderShips(playerOneBoard, playerOneContainer);
}

export function randomPlacementPlay() {
  const randomPlacementButton = document.querySelector(
    '.random-placement-button'
  );
  randomPlacementButton.addEventListener('click', () => {
    randomBoardPlay();
  });
}
