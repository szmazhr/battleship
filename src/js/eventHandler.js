import createApp from './main';
import removeStartScreen from './dom-controller';
import eventAggregator from './modules/event-aggregator';
import { initializePlayers, renderBoard } from './game-controller';

eventAggregator.subscribe('startApp', createApp);
eventAggregator.subscribe('start-button-clicked', removeStartScreen);
eventAggregator.subscribe('game-started', initializePlayers);
eventAggregator.subscribe('player-initialized', ({ player1 }) => {
  renderBoard(player1);
});
