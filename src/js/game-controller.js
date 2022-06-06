import Player from './factories/player';
import eventAggregator from './modules/event-aggregator';
import { important, random } from './utils';

let player1;
let player2;

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

function renderBoard(player) {
  player.board.ships.forEach((ship) => {
    const { axis, cX, cY } = ship;
    const { length } = ship.ship;
    for (let i = 0; i < length; i++) {
      const row = axis === 'y' ? cX : cX + i;
      const col = axis === 'y' ? cY + i : cY;
      const cell = document.querySelector(
        `.player [data-row="${row}"][data-col="${col}"]`
      );
      if (i === 0) cell.classList.add('ship_start');
      if (axis === 'y') cell.classList.add('ship_v');
      if (axis === 'x') cell.classList.add('ship_h');
      if (i === length - 1) cell.classList.add('ship_end');
    }
  });
}

export { initializePlayers, renderBoard };
