import DOM from '../modules/dom-stuff';

const createAppHeader = (() => {
  const span = DOM.createElement({
    tagName: 'span',
  });
  const heading = DOM.createElement({
    tagName: 'h1',
    text: 'Battleship',
  });
  const header = DOM.createElement({
    tagName: 'header',
    className: 'main-header',
    children: [heading, span],
  });
  return () => header;
})();

export default createAppHeader;
