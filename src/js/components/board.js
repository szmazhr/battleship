import DOM from '../modules/dom-stuff';

function createBoard() {
  const length = 11;
  const board = DOM.createElement({
    tagName: 'div',
    className: 'board',
  });
  for (let i = 0; i < length * length; i++) {
    const box = DOM.createElement({
      tagName: 'div',
      className: 'box',
      // prettier-ignore
      text:
        i % length === 0
          ? i / length
          : Math.floor(i / length) === 0
            ? String.fromCharCode(64 + (i % length))
            : '',
      attributes: {
        'data-row': (i % length) - 1,
        'data-col': Math.floor(i / length) - 1,
      },
    });
    board.appendChild(box);
  }
  return board;
}

export default createBoard;
