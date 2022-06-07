import createApp from './main';
import {
  addResultScreen,
  removeStartScreen,
  renderBoard1,
  renderBoard2,
  shipSunk,
} from './dom-controller';
import eventAggregator from './modules/event-aggregator';
import {
  initializePlayers,
  playerMove,
  currentGame,
  checkGameStatus,
} from './game-controller';

eventAggregator.subscribe('startApp', createApp);

eventAggregator.subscribe('start-button-clicked', removeStartScreen);

eventAggregator.subscribe('game-started', initializePlayers);

eventAggregator.subscribe('player-initialized', ({ player1 }) => {
  renderBoard1(player1);
  renderBoard2();
  checkGameStatus();
});

eventAggregator.subscribe('reset-button-clicked', initializePlayers); // reinitialize

eventAggregator.subscribe('player-made-move', (event) => {
  const x = +event.target.dataset.row;
  const y = +event.target.dataset.col;
  playerMove(x, y);
  checkGameStatus();
});

eventAggregator.subscribe('opponent-mode-move', () => {});

eventAggregator.subscribe('hit', (cord) => {
  const player = currentGame.turn === 0 ? 'player' : 'computer';
  const { x, y } = cord;
  const element = document.querySelector(
    `.${player} [data-row="${x}"][data-col="${y}"]`
  );
  element.classList.add('hit');
});

eventAggregator.subscribe('miss', (cord) => {
  const player = currentGame.turn === 0 ? 'player' : 'computer';
  const { x, y } = cord;
  const element = document.querySelector(
    `.${player} [data-row="${x}"][data-col="${y}"]`
  );
  element.classList.add('missed');
  currentGame.turn = currentGame.turn === 0 ? 1 : 0;
});

eventAggregator.subscribe('miss-auto', (cord) => {
  const player = currentGame.turn === 0 ? 'player' : 'computer';
  const { x, y } = cord;
  const element = document.querySelector(
    `.${player} [data-row="${x}"][data-col="${y}"]`
  );
  element.classList.add('missed');
  element.classList.add('auto');
});

eventAggregator.subscribe('ship-sunk', ({ ship }) => {
  shipSunk(ship);
});

eventAggregator.subscribe('game-over', addResultScreen);
