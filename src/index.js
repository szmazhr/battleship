import './scss/index.scss';
import eventAggregator from './js/modules/event-aggregator';
import './js/even-subcribers';

eventAggregator.publish('startApp');

// temporary
// eventAggregator.publish('start-button-clicked');
