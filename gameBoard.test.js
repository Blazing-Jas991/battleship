import { GameBoard } from './gameBoard.js';
import { Ship } from './ship.js';

describe('check if gameboard exist', () => {
  it('has all the arrays filled with null', () => {
    const grid = new GameBoard();

    let newBoard = [];
    let rows = 10;
    let cols = 10;

    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < cols; j++) {
        newBoard[i][j] = null;
      }
    }

    expect(grid.playingBoard).toEqual(newBoard);
  });
});

describe('places a ship on the Gameboard', () => {
  it('receives a ship, checks the length and build the coordinates form the length, row and column', () => {
    const firstShipBoard = new GameBoard();
    const firstShip = new Ship(1);
    firstShipBoard.placeShip(firstShip, 1, 1, 'vertical');

    expect(firstShipBoard.playingBoard[1][1]).toEqual(firstShip);
  });

  it('places a ship on the board horizontally by its length value', () => {
    const secondShipBoard = new GameBoard();
    const secondShip = new Ship(4);
    secondShipBoard.placeShip(secondShip, 3, 2, 'horizontal');
    const sliceIndex = secondShipBoard.playingBoard[3].slice(2, 6);

    expect(sliceIndex).toEqual([
      secondShip,
      secondShip,
      secondShip,
      secondShip,
    ]);
  });

  it('places a ship on the board vertically by its length value', () => {
    const thirdShipBoard = new GameBoard();
    const thirdShip = new Ship(4);
    thirdShipBoard.placeShip(thirdShip, 3, 2, 'vertical');
    const array = thirdShipBoard.playingBoard.slice(3, 7);
    const mappedArray = array.map((arr) => arr[2]);

    expect(mappedArray).toEqual([thirdShip, thirdShip, thirdShip, thirdShip]);
  });

  it('returns false and do nothing when the ship is placed out of bounds horizontally', () => {
    const fourthShipBoard = new GameBoard();
    const fourthShip = new Ship(4);
    const newPlacement = fourthShipBoard.placeShip(
      fourthShip,
      8,
      8,
      'horizontal'
    );

    expect(newPlacement).toBe(false);
  });

  it('returns false and do nothing when the ship is placed out of bounds vertically', () => {
    const fourthShipBoard = new GameBoard();
    const fourthShip = new Ship(4);
    const newPlacement = fourthShipBoard.placeShip(
      fourthShip,
      8,
      8,
      'vertical'
    );

    expect(newPlacement).toBe(false);
  });
});

describe('check if ship is placed in a valid coordinate or not', () => {
  it('checks if the ship was placed on another ship', () => {
    const board = new GameBoard();
    const fifthShip = new Ship(4);
    const fifthPlacement = board.placeShip(fifthShip, 6, 3, 'horizontal');

    expect(fifthPlacement).toBe(true);
  });

  it('checks if placing ship on another ship returns false', () => {
    const sixthBoard = new GameBoard();
    const sixthShip = new Ship(3);
    const seventhShip = new Ship(4);
    sixthBoard.placeShip(sixthShip, 4, 3, 'horizontal');
    const seventhPlacement = sixthBoard.placeShip(
      seventhShip,
      4,
      2,
      'horizontal'
    );

    expect(seventhPlacement).toBe(false);
  });
});

describe('determine whether a ship was hit on a particular coordinate', () => {
  it('calls an attack on a ship at a new coordinate', () => {
    const eightBoard = new GameBoard();
    const eightShip = new Ship(4);
    eightBoard.placeShip(eightShip, 2, 6, 'vertical');
    const attackShip = eightBoard.receiveAttack(2, 6);

    expect(attackShip).toEqual('hit');
  });

  it('calls an attack on a an empty coordinate resulting to a miss', () => {
    const ninthBoard = new GameBoard();
    const ninthShip = new Ship(4);
    ninthBoard.placeShip(ninthShip, 2, 6, 'vertical');
    const attackShip = ninthBoard.receiveAttack(1, 3);

    expect(attackShip).toEqual('miss');
  });

  it('calls an attack on an already attacked coordinate, so does nothing', () => {
    const eleventhBoard = new GameBoard();
    const eleventhShip = new Ship(4);
    eleventhBoard.placeShip(eleventhShip, 4, 5, 'horizontal');
    eleventhBoard.receiveAttack(4, 5);
    const alreadyOccupied = eleventhBoard.receiveAttack(4, 5);

    expect(alreadyOccupied).toEqual('already attacked');
  });
});

describe('checks if all the ships on the board is sunk or not', () => {
  it(' returns false if a board has only one ship that has hits but is not sunk', () => {
    const twelveBoard = new GameBoard();
    const shipTwelve = new Ship(4);
    twelveBoard.placeShip(shipTwelve, 2, 4, 'vertical');
    twelveBoard.receiveAttack(2, 4);
    twelveBoard.receiveAttack(2, 5);
    twelveBoard.receiveAttack(2, 6);

    expect(twelveBoard.areAllShipsSunk()).toBe(false);
  });

  it(' returns true if a board has a one ship that was hit and sunk', () => {
    const thirteenBoard = new GameBoard();
    const shipThirteen = new Ship(4);
    thirteenBoard.placeShip(shipThirteen, 2, 4, 'vertical');
    thirteenBoard.receiveAttack(2, 4);
    thirteenBoard.receiveAttack(3, 4);
    thirteenBoard.receiveAttack(4, 4);
    thirteenBoard.receiveAttack(5, 4);

    expect(thirteenBoard.areAllShipsSunk()).toBe(true);
  });

  it(' returns false if a board has multiple ships and some are sunk but others not sunk', () => {
    const fourteenBoard = new GameBoard();
    const shipFourteen = new Ship(4);
    const shipFifteen = new Ship(3);
    fourteenBoard.placeShip(shipFourteen, 2, 6, 'vertical');
    fourteenBoard.placeShip(shipFifteen, 4, 2, 'horizontal');

    fourteenBoard.receiveAttack(4, 2);
    fourteenBoard.receiveAttack(4, 3);

    fourteenBoard.receiveAttack(2, 4);
    fourteenBoard.receiveAttack(3, 4);
    fourteenBoard.receiveAttack(4, 4);
    fourteenBoard.receiveAttack(5, 4);

    expect(fourteenBoard.areAllShipsSunk()).toBe(false);
  });

  it(' returns true if a board has multiple ships and all are sunk', () => {
    const fifteenBoard = new GameBoard();
    const shipSixteen = new Ship(4);
    const shipSeventeen = new Ship(3);
    fifteenBoard.placeShip(shipSixteen, 2, 4, 'horizontal');

    fifteenBoard.receiveAttack(2, 4);
    fifteenBoard.receiveAttack(2, 5);
    fifteenBoard.receiveAttack(2, 6);
    fifteenBoard.receiveAttack(2, 7);

    fifteenBoard.placeShip(shipSeventeen, 4, 3, 'vertical');

    fifteenBoard.receiveAttack(4, 3);
    fifteenBoard.receiveAttack(5, 3);
    fifteenBoard.receiveAttack(6, 3);

    expect(fifteenBoard.areAllShipsSunk()).toBe(true);
  });

  // it(' returns "empty board" if a board is empty', () => {
  //   const sixteenBoard = new GameBoard();

  //   expect(sixteenBoard.areAllShipsSunk()).toEqual('empty board');
  // });
});
