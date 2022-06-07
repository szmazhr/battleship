import eventAggregator from '../modules/event-aggregator';
import Ship from './ship';

function createBoard(x, y) {
  const b = [];
  for (let i = 0; i < y; i++) {
    b.push([]);
    for (let j = 0; j < x; j++) {
      b[i].push(0);
    }
  }
  return b;
}

function GameBoard(x, y) {
  this.board = createBoard(x, y);
  this.trackShot = createBoard(x, y);
  this.ships = [];
}

// Prevent from being placed outside the board
function isValidCell(cordX, cordY) {
  return cordX >= 0 && cordX < 10 && cordY >= 0 && cordY < 10;
}

// Prevent from being placed ontop of another ship
function isCellEmpty(cordX, cordY) {
  return this.board[cordY][cordX] === 0;
}

// prevent from being placed on others neighbors
function isPlacementPossible(cordX, cordY, length, axis) {
  let result = true;
  const start = axis === 'y' ? cordY : cordX;
  const end = axis === 'y' ? cordY + length : cordX + length;
  [-1, 0, 1].forEach((j) => {
    for (let i = start - 1; i < end + 1; i++) {
      const x = axis === 'y' ? cordX + j : i;
      const y = axis === 'y' ? i : cordY + j;
      if (this.isValidCell(x, y) && !this.isCellEmpty(x, y)) {
        result = false;
      }
    }
  });
  return result;
}

function addShip(length, cordX, cordY, axis) {
  // prevent ship from being placed outside the board
  if (!this.isValidCell(cordX, cordY)) return false;

  let cX = cordX;
  let cY = cordY;

  if (axis === 'y') {
    // shift the coordinates if target cell is valid but
    // placement invalid due to length
    if (cY + length > this.board.length) {
      cY = this.board.length - length;
    }
    // check if placement is possible
    if (!this.isPlacementPossible(cX, cY, length, axis)) return false;

    // add ship to board
    for (let i = 0; i < length; i++) {
      this.board[cY + i][cX] = 1;
    }
  } else if (axis === 'x') {
    // shift the coordinates if target cell is valid but
    // placement invalid due to length
    if (cX + length > this.board[cY].length) {
      cX = this.board[cY].length - length;
    }
    // check if placement is possible
    if (!this.isPlacementPossible(cX, cY, length, axis)) return false;

    // add ship to board
    for (let i = 0; i < length; i++) {
      this.board[cY][cX + i] = 1;
    }
  }

  const s = {
    ship: new Ship(length),
    cX,
    cY,
    axis,
    reported: false,
  };

  this.ships.push(s);
  return true;
}

// prevent shots corner neighbors if ship hits
function recordHit(cordX, cordY) {
  if (!this.isValidCell(cordX, cordY)) return false;
  this.trackShot[cordY][cordX] = 2;
  [cordY - 1, cordY + 1].forEach((col) => {
    [cordX - 1, cordX + 1].forEach((row) => {
      if (row >= 0 && row < 10 && col >= 0 && col < 10) {
        if (this.isValidCell(row, col) && this.trackShot[col][row] === 0) {
          this.trackShot[col][row] = -1;
          eventAggregator.publish('miss-auto', { x: row, y: col });
        }
      }
    });
  });
  return true;
}

function receiveAttack(cordX, cordY) {
  if (!this.isValidCell(cordX, cordY)) return false;
  if (this.trackShot[cordY][cordX] !== 0) return false;

  if (this.board[cordY][cordX] === 1) {
    this.board[cordY][cordX] = 2;
    this.recordHit(cordX, cordY);
    this.ships.forEach((ship) => {
      const mainAxis = ship.axis === 'y' ? ship.cY : ship.cX;
      const otherAxis = ship.axis === 'y' ? ship.cX : ship.cY;
      const boardMain = ship.axis === 'y' ? cordY : cordX;
      const boardOther = ship.axis === 'y' ? cordX : cordY;
      const mainEnd = mainAxis + ship.ship.length - 1;

      if (
        mainAxis <= boardMain &&
        boardMain <= mainEnd &&
        otherAxis === boardOther
      ) {
        ship.ship.hit(boardMain - mainAxis);
      }
      eventAggregator.publish('hit', { x: cordX, y: cordY });
    });
  } else {
    this.trackShot[cordY][cordX] = 1;
    eventAggregator.publish('miss', { x: cordX, y: cordY });
  }
  return true;
}

function isGameOver() {
  return this.ships.every((ship) => ship.ship.isSunk());
}

Object.assign(GameBoard.prototype, {
  addShip,
  isCellEmpty,
  receiveAttack,
  isValidCell,
  isPlacementPossible,
  recordHit,
  isGameOver,
});

export default GameBoard;
