import './scss/styles.scss';
import eventAggregator from './js/modules/event-aggregator';
import './js/eventHandler';

eventAggregator.publish('startApp');
