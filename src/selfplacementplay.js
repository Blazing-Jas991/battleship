// selfplacementplay.js

import {
  createAndPlaceComShips,
  attackComputer,
  playerOneBoard,
  playerOneContainer,
  playerTwoContainer,
  appendComputerBoard,
  appendPlayerBoard,
  mainStagingContainer,
  resetButton,
} from './gameplayresources.js';
import { renderGameBoard, renderShips } from './renderGame.js';
import { Ship } from './ship.js';

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

const stagingText = document.createElement('h2');
const directionToggleButton = document.createElement('button');
const stagingContainer = document.createElement('div');
let currentDirection = 'vertical';

function stagingHolder() {
  stagingText.textContent = 'Ship Staging Area';
  directionToggleButton.classList.add('toggle-button');
  directionToggleButton.textContent = 'Press To SwitCh Between Ship Directions';
  stagingContainer.classList.add('ships-staging-container');
  mainStagingContainer.append(
    stagingText,
    stagingContainer,
    directionToggleButton
  );
}

directionToggleButton.addEventListener('click', () => {
  stagingContainer.classList.toggle('horizontal-layout');
  currentDirection =
    currentDirection === 'vertical' ? 'horizontal' : 'vertical';
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
      if (stagingContainer.childElementCount === 0) {
        stagingContainer.style.display = 'none';
        stagingText.style.display = 'none';
        directionToggleButton.style.display = 'none';
        attackComputer();
      }
    } else {
      alert("Ship Can't be placed here");
    }
  });
}

export function selfPlacementBoardPlay() {
  appendPlayerBoard();
  appendComputerBoard();
  stagingHolder();
  createAndPlaceComShips();
  renderShipStaging(playerOneShips, stagingContainer);
  renderGameBoard(10, 10, playerOneContainer);
  renderGameBoard(10, 10, playerTwoContainer);
  renderShips(playerOneBoard, playerOneContainer);
}

export function selfPlacementPlay() {
  const selfPlacementButton = document.querySelector('.self-placement-button');
  selfPlacementButton.addEventListener('click', () => {
    selfPlacementBoardPlay();
  });
}

function resetGame() {
  resetButton.addEventListener('click', () => {
    alert('this shit works');
    stagingContainer.style.display = '';
    stagingText.style.display = '';
    directionToggleButton.style.display = '';
    resetButton.style.display = 'none';
  });
}
resetGame();
