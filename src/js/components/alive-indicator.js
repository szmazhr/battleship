import DOM from '../modules/dom-stuff';

function loadAliveIndicator() {
  const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const aliveIndicator = DOM.createElement({
    tagName: 'div',
    className: 'alive-indicator',
  });
  shipLengths.forEach((length) => {
    const ship = DOM.createElement({
      tagName: 'div',
      className: 'ship',
      attributes: {
        'data-length': length,
        'data-alive': true,
      },
    });
    for (let i = 0; i < length; i++) {
      const shipPart = DOM.createElement({
        tagName: 'div',
        className: 'ship-part',
      });
      ship.appendChild(shipPart);
    }
    aliveIndicator.appendChild(ship);
  });
  return aliveIndicator;
}

export default loadAliveIndicator;
