import DOM from '../modules/dom-stuff';

const createFooter = (() => {
  const repoLink = DOM.createElement({
    tagName: 'a',
    className: 'repo-link',
    text: 'GitHub Repo',
    attributes: {
      href: 'https://github.com/szmazhr/battleship',
    },
  });

  const footerRight = DOM.createElement({
    tagName: 'div',
    className: 'footer-right',
    children: [repoLink],
  });

  const profileLink = DOM.createElement({
    tagName: 'a',
    className: 'profile-link',
    text: 'Shahzar Mazhar',
    attributes: {
      href: 'https://github.com/szmazhr/',
    },
  });

  const footerText = DOM.createElement({
    tagName: 'span',
    text: 'Made with ♥ by ',
  });
  const footerLeft = DOM.createElement({
    tagName: 'div',
    className: 'footer-left',
    children: [footerText, profileLink],
  });
  const footer = DOM.createElement({
    tagName: 'footer',
    className: 'main-footer',
    children: [footerLeft, footerRight],
  });
  return () => footer;
})();

export default createFooter;
