// index.js

import { randomBoardPlay } from './gameplay.js';
import { dialog } from './gameplayresources.js';
import './styles.css';
import './appController.js';

dialog.showModal();
randomBoardPlay();
