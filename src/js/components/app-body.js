import addClickListener from '../modules/click-listner';
import DOM from '../modules/dom-stuff';

const createAppBody = (() => {
  const playerBoardTitle = DOM.createElement({
    tagName: 'p',
    className: 'board-title',
    text: 'Your Board',
  });
  const opponentBoardTitle = DOM.createElement({
    tagName: 'p',
    className: 'board-title',
    text: "Opponent's Board",
  });
  const boardWrapperRight = DOM.createElement({
    tagName: 'div',
    className: 'computer board-wrapper',
    children: [opponentBoardTitle],
  });
  const boardWrapperLeft = DOM.createElement({
    tagName: 'div',
    className: 'player board-wrapper',
    children: [playerBoardTitle],
  });
  const btnReset = DOM.createElement({
    tagName: 'button',
    className: 'btn reset-btn',
    text: 'Reset',
  });
  addClickListener(btnReset, 'reset-button-clicked');
  const buttonsWrapper = DOM.createElement({
    tagName: 'div',
    className: 'buttons-wrapper',
    children: [btnReset],
  });
  const body = DOM.createElement({
    tagName: 'div',
    className: 'main-body',
    children: [boardWrapperLeft, boardWrapperRight],
  });
  const wrapper = DOM.createElement({
    tagName: 'div',
    className: 'main-container',
    children: [body, buttonsWrapper],
  });
  return () => wrapper;
})();

export default createAppBody;
