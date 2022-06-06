import GameBoard from './game-board';

function Player(name, isComputer = false) {
  this.name = name;
  this.isComputer = isComputer;
  this.board = new GameBoard(10, 10);
  if (isComputer) {
    this.aiMove = function aiMove() {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      let lengthBefore = 0;
      let lengthAfter = 0;
      this.opponent.board.trackShot.forEach((row) => {
        lengthBefore += row.filter((cell) => cell === 1).length;
      });
      this.attack(randomX, randomY);
      this.opponent.board.trackShot.forEach((row) => {
        lengthAfter += row.filter((cell) => cell === 1).length;
      });
      if (lengthAfter === lengthBefore) {
        this.aiMove();
      }
    };
  }
}

function addOpponent(opponent) {
  this.opponent = opponent;
}

function attack(x, y) {
  this.opponent.board.receiveAttack(x, y);
}

Object.assign(Player.prototype, { addOpponent, attack });

export default Player;
