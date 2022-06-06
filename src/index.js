import './scss/index.scss';
import eventAggregator from './js/modules/event-aggregator';
import './js/eventHandler';

eventAggregator.publish('startApp');

// temporary
eventAggregator.publish('start-button-clicked');
