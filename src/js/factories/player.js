import { important, random } from '../utils';
import GameBoard from './game-board';

function Player(name, isComputer = false) {
  this.name = name;
  this.isComputer = isComputer;
  this.board = new GameBoard(10, 10);
  if (isComputer) {
    this.aiMove = function aiMove() {
      important(() => this.attack(random(10), random(10)));
    };
  }
}

function addOpponent(opponent) {
  this.opponent = opponent;
}

function attack(x, y) {
  return this.opponent.board.receiveAttack(x, y);
}

Object.assign(Player.prototype, { addOpponent, attack });

export default Player;
