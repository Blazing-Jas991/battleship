import { Ship } from './ship.js';

describe('Ship', () => {
  it('creates a ship with a given length', () => {
    const newShip = new Ship(4);

    expect(newShip.length).toBe(4);
  });

  it('checks if the ship is sunk or not', () => {
    const newShip = new Ship(4);

    expect(newShip.isSunk()).toBe(false);
  });

  it('checks if the ship is fully hit', () => {
    const newShip = new Ship(4);
    newShip.hit();
    newShip.hit();
    newShip.hit();
    newShip.hit();

    expect(newShip.isSunk()).toBe(true);
  });
});
