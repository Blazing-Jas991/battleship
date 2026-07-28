export function renderGameBoard(rows, cols, board) {
  for (let i = 0; i < rows; i++) {
    let boardRow = document.createElement('div');
    boardRow.classList.add('grid-rows');

    for (let j = 0; j < cols; j++) {
      let boardCols = document.createElement('div');
      boardCols.classList.add('grid-cols');
      boardCols.dataset.row = i;
      boardCols.dataset.col = j;
      boardRow.appendChild(boardCols);
    }
    board.appendChild(boardRow);
  }
}

export function renderShips(gameBoard, container) {
  for (let i = 0; i < gameBoard.playingBoard.length; i++) {
    for (let j = 0; j < gameBoard.playingBoard[i].length; j++) {
      let boardCoordinate = gameBoard.playingBoard[i][j];
      let shipCoordinate = container.querySelector(
        `[data-row="${i}"][data-col="${j}"]`
      );
      if (boardCoordinate !== null) {
        shipCoordinate.classList.add('ship');
      }
    }
  }
}

export function updateCell(row, col, result, container) {
  let shipCoordinate = container.querySelector(
    `[data-row="${row}"][data-col="${col}"]`
  );

  if (result === 'hit') {
    shipCoordinate.classList.add('hit-ships');
  } else if (result === 'miss') {
    shipCoordinate.classList.add('missed-ships');
  } else {
    shipCoordinate.classList.add('already-attacked-ships');
  }
}
