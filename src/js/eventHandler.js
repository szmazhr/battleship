import createApp from './app';
import eventAggregator from './modules/event-aggregator';

eventAggregator.subscribe('startApp', createApp);
