import { GameBoard } from './gameBoard.js';
import { Player } from './players.js';

describe('creates a player and a game board for that player', () => {
  it('creates a player', () => {
    const player1 = new Player('John');

    expect(player1.name).toBe('John');
  });

  it('creates a board for the player', () => {
    const playerTwo = new Player('Eddie');

    expect(playerTwo.gameBoard).toBeInstanceOf(GameBoard);
  });
});
