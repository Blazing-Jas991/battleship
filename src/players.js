// Players.js

import { GameBoard } from './gameBoard.js';

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.gameBoard = new GameBoard();
    this.isComputer = isComputer;
  }
}
