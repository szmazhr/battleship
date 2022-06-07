import GameBoard from '../game-board';

describe('GameBoard', () => {
  let gameBoard;
  const testBoard = [];

  beforeEach(() => {
    gameBoard = new GameBoard(10, 10);
    // ship = new Ship(3);
    for (let i = 0; i < 10; i++) {
      testBoard.push([]);
      for (let j = 0; j < 10; j++) {
        testBoard[i].push(0);
      }
    }
  });

  afterEach(() => {
    testBoard.length = 0;
  });

  test('should be able to be define', () => {
    expect(gameBoard).toBeDefined();
  });

  test('should be able to initialize board', () => {
    expect(gameBoard.board).toEqual(testBoard);
    expect(gameBoard.trackShot).toEqual(testBoard);
  });

  test('test for valid cell', () => {
    expect(gameBoard.isValidCell(0, 0)).toEqual(true);
    expect(gameBoard.isValidCell(10, 10)).toEqual(false);
    expect(gameBoard.isValidCell(10, 0)).toEqual(false);
    expect(gameBoard.isValidCell(0, 10)).toEqual(false);
    expect(gameBoard.isValidCell(-1, 0)).toEqual(false);
  });

  test('game board should be able to add items', () => {
    gameBoard.addShip(2, 0, 0, 'x');
    expect(gameBoard.ships.length).toEqual(1);
  });

  test('ships should not overlap each other', () => {
    gameBoard.addShip(2, 0, 0, 'x');
    gameBoard.addShip(4, 1, 1, 'y'); // neighbor
    expect(gameBoard.ships.length).toEqual(1);
  });

  test('should not be able to place outside the board', () => {
    gameBoard.addShip(2, 1, 6, 'x'); // valid
    gameBoard.addShip(3, 9, 0, 'x'); // valid
    gameBoard.addShip(3, 0, 9, 'y'); // valid but neighbor exists
    gameBoard.addShip(2, 0, 9, 'y'); // valid
    gameBoard.addShip(2, 10, 0, 'x'); // invalid
    gameBoard.addShip(2, 0, 10, 'x'); // invalid
    gameBoard.addShip(2, 0, 10, 'x'); // invalid
    gameBoard.addShip(2, 0, 10, 'y'); // invalid
    gameBoard.addShip(2, -1, 0, 'y'); // invalid
    expect(gameBoard.ships.length).toEqual(3);
  });

  test('ship should track the hit', () => {
    gameBoard.addShip(2, 8, 0, 'x'); // valid
    gameBoard.addShip(3, 9, 1, 'x'); // valid but neighbor exists
    gameBoard.addShip(3, 9, 9, 'y'); // valid
    gameBoard.ships[1].ship.hit(2);
    expect(gameBoard.ships[1]).toEqual({
      ship: { hits: [2], length: 3 },
      axis: 'y',
      cX: 9,
      cY: 7,
      reported: false,
    });
  });

  test('should be able to track Hits', () => {
    gameBoard.addShip(2, 8, 0, 'x'); // valid 0 x7-9 y0
    gameBoard.addShip(3, 9, 2, 'x'); // valid 1 x7-9 y2
    gameBoard.addShip(3, 0, 9, 'y'); // valid 2 x0 y7-9
    gameBoard.receiveAttack(7, 2); // hit 1
    gameBoard.receiveAttack(7, 1); // miss
    gameBoard.receiveAttack(0, 9); // hit 2
    gameBoard.receiveAttack(0, 7); // hit 2
    gameBoard.receiveAttack(7, 3); // missed
    expect(gameBoard.board[1][7]).toEqual(0); // miss
    expect(gameBoard.board[2][7]).toEqual(2); // hit
    expect(gameBoard.trackShot[1][7]).toEqual(1); // miss
    expect(gameBoard.trackShot[3][8]).toEqual(-1); // neighbor corner of hit
    expect(gameBoard.trackShot[2][7]).toEqual(2); // missed
    expect(gameBoard.ships[0].ship.hits.length).toEqual(0);
    expect(gameBoard.ships[1].ship.hits.length).toEqual(1);
    expect(gameBoard.ships[1].ship.hits).toEqual([0]);
    expect(gameBoard.ships[2].ship.hits.length).toEqual(2);
    expect(gameBoard.ships[2].ship.hits.sort()).toEqual([0, 2].sort());
  });

  test('should be able to report if all ships sunk', () => {
    gameBoard.addShip(2, 8, 0, 'x'); // valid 0 x7-9 y0
    gameBoard.addShip(2, 9, 2, 'x'); // valid 1 x7-9 y2
    gameBoard.receiveAttack(8, 0); // hit 0
    gameBoard.receiveAttack(9, 0); // hit 0
    gameBoard.receiveAttack(8, 2); // hit 1
    expect(gameBoard.isGameOver()).toEqual(false);
  });

  test('should be able to report if all ships sunk', () => {
    gameBoard.addShip(2, 8, 0, 'x'); // valid 0 x7-9 y0
    gameBoard.addShip(2, 9, 2, 'x'); // valid 1 x7-9 y2
    gameBoard.receiveAttack(8, 0); // hit 0
    gameBoard.receiveAttack(9, 0); // hit 0
    gameBoard.receiveAttack(8, 2); // hit 1
    gameBoard.receiveAttack(9, 2); // hit 1
    expect(gameBoard.isGameOver()).toEqual(true);
  });
});
