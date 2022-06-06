import eventAggregator from './modules/event-aggregator';

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

export default removeStartScreen;
