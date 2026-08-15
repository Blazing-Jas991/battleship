// gameBoard.js

export class GameBoard {
  constructor() {
    this.rows = 10;
    this.cols = 10;
    this.playingBoard = Array.from({ length: this.rows }, () =>
      new Array(this.cols).fill(null)
    );
    this.attackedCoordinates = [];
    this.missedAttacks = [];
  }

  placeShip(ship, startRow, startCol, direction) {
    if (
      startCol < 0 ||
      startRow < 0 ||
      startCol > this.cols - 1 ||
      startRow > this.rows - 1
    ) {
      return false;
    }

    for (let i = 0; i < ship.length; i++) {
      let currentColumn = startCol;
      let currentRow = startRow + i;

      if (direction === 'vertical') {
        if (currentRow < 0 || currentRow >= this.rows) {
          return false;
        }
      } else {
        currentRow = startRow;
        currentColumn = startCol + i;

        if (currentColumn < 0 || currentColumn >= this.cols) {
          return false;
        }
      }

      for (let r = currentRow - 1; r <= currentRow + 1; r++) {
        for (let c = currentColumn - 1; c <= currentColumn + 1; c++) {
          if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) {
            continue;
          }
          if (this.playingBoard[r][c] !== null) {
            return false;
          }
        }
      }
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction === 'vertical') {
        let currentRow = startRow + i;
        this.playingBoard[currentRow][startCol] = ship;
      } else if (direction === 'horizontal') {
        let currentColumn = startCol + i;
        this.playingBoard[startRow][currentColumn] = ship;
      }
    }
    return true;
  }

  receiveAttack(row, col) {
    if (row < 0 || row > this.rows - 1 || col < 0 || col > this.cols - 1) {
      return false;
    }

    const checkedCoordinates = `${row},${col}`;
    if (this.attackedCoordinates.includes(checkedCoordinates)) {
      return 'already attacked';
    } else {
      this.attackedCoordinates.push(checkedCoordinates);
    }

    if (this.playingBoard[row][col] !== null) {
      this.playingBoard[row][col].hit();
      return 'hit';
    } else {
      this.missedAttacks.push(checkedCoordinates);
      return 'miss';
    }
  }

  areAllShipsSunk() {
    // if (this.playingBoard.every((row) => row.every((cell) => cell === null))) {
    //   return 'empty board';
    // }

    for (let i = 0; i < this.playingBoard.length; i++) {
      for (let j = 0; j < this.playingBoard[i].length; j++) {
        let cellContent = this.playingBoard[i][j];
        if (cellContent !== null && !cellContent.isSunk()) {
          return false;
        }
      }
    }
    return true;
  }
}
