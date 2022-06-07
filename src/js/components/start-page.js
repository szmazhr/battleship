import addClickListener from '../modules/click-listener';
import DOM from '../modules/dom-stuff';

const loadStartPage = (() => {
  const startBtn = DOM.createElement({
    tagName: 'button',
    className: 'start-btn',
    text: 'Start',
  });
  addClickListener(startBtn, 'start-button-clicked');
  const startPageBody = DOM.createElement({
    tagName: 'div',
    className: 'start-page-body',
    children: [startBtn],
  });
  const startPageHeader = DOM.createElement({
    tagName: 'h1',
    className: 'start-page-header',
    text: 'Welcome to the BattleShip!',
  });
  const startPageContent = DOM.createElement({
    tagName: 'div',
    className: 'start-page-content',
    children: [startPageHeader, startPageBody],
  });
  const startBox = DOM.createElement({
    tagName: 'div',
    className: 'start-page-box',
    children: [startPageContent],
  });
  const startPageContainer = DOM.createElement({
    tagName: 'div',
    className: 'start-page-container shown',
    children: [startBox],
  });
  return () => startPageContainer;
})();

export default loadStartPage;
