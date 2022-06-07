import Player from './factories/player';
import eventAggregator from './modules/event-aggregator';
import { important, random } from './utils';

let player1;
let player2;
const currentGame = {
  turn: 1,
};

function initializePlayers() {
  player1 = new Player('Human');
  player2 = new Player('Computer', true);
  player1.addOpponent(player2);
  player2.addOpponent(player1);
  const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  [player1, player2].forEach((player) => {
    shipLengths.forEach((length) => {
      important(() => {
        return player.board.addShip(
          length,
          random(9),
          random(9),
          random(1) ? 'x' : 'y'
        );
      });
    });
  });
  eventAggregator.publish('player-initialized', { player1, player2 });
}

function playerMove(x, y) {
  player1.attack(x, y);
}

function checkGameStatus() {
  const prePlayer = currentGame.turn === 0 ? player1 : player2;
  const player = currentGame.turn === 1 ? player1 : player2;
  const main = document.querySelector('.main-content');
  main.className =
    currentGame.turn === 1
      ? 'main-content your-turn'
      : 'main-content opponent-turn';
  prePlayer.board.ships.forEach((ship) => {
    if (ship.ship.isSunk() && !ship.reported) {
      eventAggregator.publish('ship-sunk', { ship: ship.ship });
      // eslint-disable-next-line no-param-reassign
      ship.reported = true;
    }
  });
  if (prePlayer.board.isGameOver()) {
    eventAggregator.publish('game-over', { winner: player });
    console.log('game over');
    return;
  }
  if (player.isComputer) {
    setTimeout(() => {
      player.aiMove();
      checkGameStatus();
    }, random(1500, 500));
  }
}

export { initializePlayers, playerMove, currentGame, checkGameStatus };
