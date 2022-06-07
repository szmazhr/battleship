/*
 * Title: event-Aggregator
 * Description: publish, subscribe and unsubscribe events.
 * To subscribe to an event, use: eventHandler.subscribe(eventName, callback);
 * To unsubscribe from an event, use: eventHandler.unsubscribe(eventName, callback);
 * To publish an event, use: eventHandler.publish(eventName, eventArguments);
 */

class Event {
  constructor(name) {
    this._handlers = [];
    this.name = name;
  }

  raise = (eventArgs) => this._handlers.forEach((h) => h(eventArgs));

  addHandler = (handler) => this._handlers.push(handler);

  removeHandler(handler) {
    const { _handlers } = this;
    _handlers.forEach((h) => {
      if (h === handler) _handlers.splice(_handlers.indexOf(h), 1);
    });
  }
}

const eventAggregator = (() => {
  const events = [];

  const getEvent = (name) => {
    let event = events.filter((e) => e.name === name)[0];

    if (!event) {
      event = new Event(name);
      events.push(event);
    }
    return event;
  };

  return {
    subscribe: (eventName, handler) => getEvent(eventName).addHandler(handler),
    publish: (eventName, eventArgs) => getEvent(eventName).raise(eventArgs),
    unsubscribe: (eventName, handler) => {
      getEvent(eventName).removeHandler(handler);
    },
  };
})();

export default eventAggregator;
