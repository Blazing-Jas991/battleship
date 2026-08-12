// selfPlacementPlay.js

import {
  createGameSession,
  dialog,
  mainStagingContainer,
  clearBoards,
  pageBody,
  gameBoardsContainer,
} from './gameplayresources.js';
import { renderGameBoard, renderShips } from './renderGame.js';
import { Ship } from './ship.js';

const stagingText = document.createElement('h2');
const directionToggleButton = document.createElement('button');
const stagingContainer = document.createElement('div');
let currentDirection = 'vertical';

export const selfResetButton = document.createElement('button');
selfResetButton.textContent = 'Reset Game';
selfResetButton.classList.add('-self-reset-button');

export const selfSwitchButton = document.createElement('button');
selfSwitchButton.textContent = 'Switch To Random Placement Mode';
selfSwitchButton.classList.add('random-switch-button');

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
  stagingContainer.style.display = '';
  stagingText.style.display = '';
  directionToggleButton.style.display = '';
  gameBoardsContainer.appendChild(mainStagingContainer);
}

directionToggleButton.addEventListener('click', () => {
  stagingContainer.classList.toggle('horizontal-layout');
  currentDirection =
    currentDirection === 'vertical' ? 'horizontal' : 'vertical';
});

export function createPlayerGameSession() {
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

  function renderShipStaging(ships, container) {
    let draggedShipIndex = null;
    let lastHoveredCell = null;
    let draggedShipElement = null;
    let actualShip = null;

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

      shipContainer.addEventListener('touchstart', () => {
        actualShip = ships[i];
        draggedShipElement = shipContainer;
        draggedShipIndex = i;
        draggedShipElement.style.position = 'fixed';
        draggedShipElement.style.pointerEvents = 'none';
      });
    }

    playerOneContainer.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    pageBody.addEventListener('touchmove', (event) => {
      if (draggedShipIndex === null) {
        return;
      }
      event.preventDefault();

      const touch = event.touches[0];
      const xCoordinate = touch.clientX;
      const yCoordinate = touch.clientY;

      draggedShipElement.style.left = `${xCoordinate - draggedShipElement.offsetWidth / 2}px`;
      draggedShipElement.style.top = `${yCoordinate - draggedShipElement.offsetHeight / 2}px`;

      const combinedCoordinates = document.elementFromPoint(
        xCoordinate,
        yCoordinate
      );
      if (combinedCoordinates === null) {
        return;
      }
      if (lastHoveredCell !== null) {
        lastHoveredCell.classList.remove('hovered-cell');
      }
      if (combinedCoordinates.dataset.row && combinedCoordinates.dataset.col) {
        lastHoveredCell = combinedCoordinates;
        lastHoveredCell.classList.add('hovered-cell');
      } else {
        lastHoveredCell = null;
      }
    });

    function cleanUp() {
      if (draggedShipElement !== null) {
        draggedShipElement.style.position = '';
        draggedShipElement.style.pointerEvents = 'auto';
      }
      if (lastHoveredCell !== null) {
        lastHoveredCell.classList.remove('hovered-cell');
      }
      draggedShipIndex = null;
      draggedShipElement = null;
    }

    pageBody.addEventListener('touchend', (event) => {
      if (draggedShipIndex === null || lastHoveredCell === null) {
        cleanUp();
        return;
      } else {
        let rowForDrop = Number(lastHoveredCell.dataset.row);
        let colForDrop = Number(lastHoveredCell.dataset.col);
        let droppedShip = actualShip;
        let touchPlacement = playerOneBoard.placeShip(
          droppedShip,
          rowForDrop,
          colForDrop,
          currentDirection
        );
        if (touchPlacement) {
          renderShips(playerOneBoard, playerOneContainer);
          let placedShip = container.querySelector(
            `[data-ship-index="${draggedShipIndex}"]`
          );
          placedShip.remove();
          if (stagingContainer.childElementCount === 0) {
            stagingContainer.style.display = 'none';
            stagingText.style.display = 'none';
            directionToggleButton.style.display = 'none';
            attackComputer();
          }
          cleanUp();
        } else {
          alert("Ship Can't be placed here");
          cleanUp();
        }
      }
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

  stagingHolder();
  appendPlayerBoard();
  appendComputerBoard();
  renderGameBoard(10, 10, playerOneContainer);
  renderGameBoard(10, 10, playerTwoContainer);
  renderShipStaging(playerOneShips, stagingContainer);
  renderShips(playerOneBoard, playerOneContainer);
  createAndPlaceComShips();
}

export function selfPlacementGame() {
  clearBoards();
  createPlayerGameSession();
  dialog.close();
}
