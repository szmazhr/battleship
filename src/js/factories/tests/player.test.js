import Player from '../player';
import GameBoard from '../game-board';

describe('Player', () => {
  let hPlayer;
  let cPlayer;
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard(10, 10);
    hPlayer = new Player('Human');
    cPlayer = new Player('Computer', true);
  });

  afterEach(() => {});

  test('players should be able to be define', () => {
    expect(hPlayer).toBeDefined();
    expect(cPlayer).toBeDefined();
  });

  test('players should have name', () => {
    expect(hPlayer.name).toEqual('Human');
    expect(cPlayer.name).toEqual('Computer');
  });

  test('players should have correct type', () => {
    expect(hPlayer.isComputer).toEqual(false);
    expect(cPlayer.isComputer).toEqual(true);
  });

  test('players should have their boards', () => {
    expect(hPlayer.board).toEqual(gameBoard);
    expect(cPlayer.board).toEqual(gameBoard);
  });

  test('players should be able to add opponents', () => {
    hPlayer.addOpponent(cPlayer);
    cPlayer.addOpponent(hPlayer);
    expect(hPlayer.opponent).toEqual(cPlayer);
    expect(cPlayer.opponent).toEqual(hPlayer);
  });

  test('hPlayer should be able to attack cPlayers board', () => {
    hPlayer.addOpponent(cPlayer);
    hPlayer.attack(1, 1);
    hPlayer.attack(9, 1);
    expect(cPlayer.board.trackShot[1][1]).toEqual(1);
    expect(cPlayer.board.trackShot[1][9]).toEqual(1);
    expect(cPlayer.board.trackShot[2][9]).toEqual(0);
  });

  test('hPlayer should be able to sunk ship', () => {
    hPlayer.addOpponent(cPlayer);
    hPlayer.attack(1, 1);
    hPlayer.attack(9, 1);
    expect(cPlayer.board.trackShot[1][1]).toEqual(1);
    expect(cPlayer.board.trackShot[1][9]).toEqual(1);
    expect(cPlayer.board.trackShot[2][9]).toEqual(0);
    cPlayer.board.addShip(1, 5, 5, 'x');
    expect(cPlayer.board.ships.length).toEqual(1);
    hPlayer.attack(5, 5);
    expect(cPlayer.board.isGameOver()).toEqual(true);
  });

  test('Ai should be enabled for cPlayer', () => {
    expect(hPlayer.aiMove).not.toBeDefined();
    expect(cPlayer.aiMove).toBeDefined();
  });

  test('cPlayer should be able to make legal random move', () => {
    hPlayer.addOpponent(cPlayer);
    cPlayer.addOpponent(hPlayer);
    const attack = 100;
    for (let i = 0; i < attack; i++) {
      cPlayer.aiMove();
    }
    let length = 0;
    hPlayer.board.trackShot.forEach((row) => {
      length += row.filter((cell) => cell === 1).length;
    });
    expect(length).toEqual(attack);
  });
});
