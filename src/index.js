// index.js

import { randomBoardPlay } from './gameplay.js';
import { clickSelfPlacement } from './selfplacementplay.js';
import { dialog } from './gameplayresources.js';
import './styles.css';

dialog.showModal();
randomBoardPlay();
clickSelfPlacement();
