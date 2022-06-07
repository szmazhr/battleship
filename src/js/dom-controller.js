import createBoard from './components/board';
import loadStartPage from './components/start-page';
import addClickListener from './modules/click-listner';
import eventAggregator from './modules/event-aggregator';
import { currentGame } from './game-controller';
import loadAliveIndicator from './components/alive-indicator';

function removeStartScreen() {
  const startScreen = document.querySelector('.start-page-container');
  startScreen.classList.remove('shown');
  startScreen.classList.add('showing');
  setTimeout(() => {
    startScreen.classList.remove('showing');
    startScreen.remove();
  }, 300);
  eventAggregator.publish('game-started');
}

function addResultScreen() {
  const container = document.querySelector('#container');
  const startScreen = loadStartPage();
  const heading = startScreen.querySelector('.start-page-header');
  const button = startScreen.querySelector('.start-btn');
  heading.textContent = currentGame.turn === 1 ? 'You won!' : 'You lost!';
  button.textContent = 'Play Again';
  container.append(startScreen);
  startScreen.classList.add('showing');
  setTimeout(() => {
    startScreen.classList.remove('showing');
    startScreen.classList.add('shown');
  }, 0);
  eventAggregator.publish('game-ended');
}

function renderBoard1(player) {
  const player1Place = document.querySelector('.player.board-wrapper');
  const board = player1Place.querySelector('.board');
  const aliveIndicator = player1Place.querySelector('.alive-indicator');
  if (board) board.remove();
  if (aliveIndicator) aliveIndicator.remove();
  const newBoard = createBoard();
  const newAliveIndicator = loadAliveIndicator();
  player1Place.append(newBoard, newAliveIndicator);
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

function renderBoard2() {
  const player2Place = document.querySelector('.computer.board-wrapper');
  const board = player2Place.querySelector('.board');
  const aliveIndicator = player2Place.querySelector('.alive-indicator');
  if (board) board.remove();
  if (aliveIndicator) aliveIndicator.remove();
  const newBoard = createBoard();
  const newAliveIndicator = loadAliveIndicator();
  player2Place.append(newBoard, newAliveIndicator);
  const boxes = newBoard.querySelectorAll('.box');
  boxes.forEach((box) => {
    if (box.dataset.row !== '-1' && box.dataset.col !== '-1') {
      addClickListener(box, 'player-made-move');
    }
  });
}

function shipSunk(ship) {
  const { length } = ship;
  const player = currentGame.turn === 0 ? 'player' : 'computer';
  const shipEl = document.querySelector(
    `.${player}.board-wrapper .ship[data-length="${length}"][data-alive="true"]`
  );
  shipEl.dataset.alive = 'false';
}

export {
  removeStartScreen,
  addResultScreen,
  renderBoard1,
  renderBoard2,
  shipSunk,
};
