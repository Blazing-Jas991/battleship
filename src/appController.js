// appController.js

import {
  selfPlacementGame,
  selfResetButton,
  selfSwitchButton,
} from './selfplacementplay.js';
import {
  randomBoardPlay,
  randomResetButton,
  randomSwitchButton,
} from './gameplay.js';
import {
  pageBody,
  clearBoards,
  resetButtonHolder,
  dialog,
} from './gameplayresources.js';

const randomPlacementButton = document.querySelector(
  '.random-placement-button'
);
randomPlacementButton.addEventListener('click', () => {
  resetButtonHolder.append(randomResetButton, randomSwitchButton);
  pageBody.appendChild(resetButtonHolder);
  dialog.close();
});

export const selfPlacementButton = document.querySelector(
  '.self-placement-button'
);

selfPlacementButton.addEventListener('click', () => {
  resetButtonHolder.append(selfResetButton, selfSwitchButton);
  pageBody.appendChild(resetButtonHolder);
  selfPlacementGame();
});

randomResetButton.addEventListener('click', () => {
  resetButtonHolder.style.display = 'none';
  clearBoards();
  randomBoardPlay();
});

randomSwitchButton.addEventListener('click', () => {
  resetButtonHolder.style.display = 'none';
  clearBoards();
  resetButtonHolder.replaceChildren();
  resetButtonHolder.append(selfResetButton, selfSwitchButton);
  pageBody.append(resetButtonHolder);
  selfPlacementGame();
});

selfResetButton.addEventListener('click', () => {
  resetButtonHolder.style.display = 'none';
  clearBoards();
  selfPlacementGame();
});

selfSwitchButton.addEventListener('click', () => {
  resetButtonHolder.style.display = 'none';
  clearBoards();
  resetButtonHolder.replaceChildren();
  resetButtonHolder.append(randomResetButton, randomSwitchButton);
  pageBody.append(resetButtonHolder);
  randomBoardPlay();
});
