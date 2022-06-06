import DOM from '../modules/dom-stuff';
import createBoard from './board';

const createAppBody = (() => {
  const playerBoard = createBoard();
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
  const opponentBoard = createBoard();
  const boardWrapperRight = DOM.createElement({
    tagName: 'div',
    className: 'computer board-wrapper',
    children: [opponentBoardTitle, opponentBoard],
  });
  const boardWrapperLeft = DOM.createElement({
    tagName: 'div',
    className: 'player board-wrapper',
    children: [playerBoardTitle, playerBoard],
  });
  const body = DOM.createElement({
    tagName: 'div',
    className: 'main-body',
    children: [boardWrapperLeft, boardWrapperRight],
  });
  const wrapper = DOM.createElement({
    tagName: 'div',
    className: 'main-container',
    children: [body],
  });
  return () => wrapper;
})();

export default createAppBody;
